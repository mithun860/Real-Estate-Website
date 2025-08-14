import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';

const BlogManagement = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get('/api/blog');
            setPosts(data.posts || data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            title,
            content,
            excerpt,
            featuredImage,
            categories
        };

        try {
            if (editingId) {
                await axios.put(`/api/blog/${editingId}`, postData);
            } else {
                await axios.post('/api/blog', postData);
            }
            resetForm();
            fetchPosts();
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    const handleEdit = (post) => {
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setFeaturedImage(post.featuredImage);
        setCategories(post.categories);
        setEditingId(post._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/blog/${id}`);
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setExcerpt('');
        setFeaturedImage('');
        setCategories([]);
        setEditingId(null);
    };

    const addCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory('');
        }
    };

    const removeCategory = (categoryToRemove) => {
        setCategories(categories.filter(cat => cat !== categoryToRemove));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Blog Management
            </Typography>
            
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                
                                <TextField
                                    label="Excerpt"
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={3}
                                    required
                                />
                                
                                <Box sx={{ my: 2 }}>
                                    <Typography variant="subtitle1">Content</Typography>
                                    <Editor
                                        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                                        value={content}
                                        init={{
                                            height: 300,
                                            menubar: true,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar:
                                                'undo redo | formatselect | bold italic backcolor | \
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | removeformat | help'
                                        }}
                                        onEditorChange={(newContent) => setContent(newContent)}
                                    />
                                </Box>
                                
                                <TextField
                                    label="Featured Image URL"
                                    value={featuredImage}
                                    onChange={(e) => setFeaturedImage(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                
                                <Box sx={{ my: 2 }}>
                                    <Typography variant="subtitle1">Categories</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <TextField
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            size="small"
                                        />
                                        <Button variant="outlined" onClick={addCategory}>
                                            Add
                                        </Button>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {categories.map((category) => (
                                            <Chip
                                                key={category}
                                                label={category}
                                                onDelete={() => removeCategory(category)}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                                
                                <Box sx={{ mt: 2 }}>
                                    <Button type="submit" variant="contained" color="primary">
                                        {editingId ? 'Update Post' : 'Create Post'}
                                    </Button>
                                    {editingId && (
                                        <Button variant="outlined" onClick={resetForm} sx={{ ml: 2 }}>
                                            Cancel
                                        </Button>
                                    )}
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Existing Blog Posts
                            </Typography>
                            {posts.length === 0 ? (
                                <Typography>No posts yet</Typography>
                            ) : (
                                <Box>
                                    {posts.map((post) => (
                                        <Box key={post._id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                                            <Typography variant="subtitle1">{post.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {new Date(post.publishedAt).toLocaleDateString()}
                                            </Typography>
                                            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => handleEdit(post)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleDelete(post._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BlogManagement;