import express from 'express';
import BlogPost from '../models/BlogPost.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;
        
        let query = {};
        if (req.query.category && req.query.category !== 'all') {
            query.categories = req.query.category;
        }
        
        const posts = await BlogPost.find(query)
            .sort({ publishedAt: -1 })
            .skip(skip)
            .limit(limit);
            
        const totalPosts = await BlogPost.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / limit);
        
        const allCategories = await BlogPost.distinct('categories');
        
        res.json({
            posts,
            totalPages,
            allCategories
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get related posts
router.get('/related', async (req, res) => {
    try {
        const posts = await BlogPost.find({
            categories: req.query.category,
            _id: { $ne: req.query.exclude }
        })
        .limit(3)
        .sort({ publishedAt: -1 });
        
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single blog post
router.get('/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new blog post (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
    const { title, content, excerpt, featuredImage, categories } = req.body;
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const post = new BlogPost({
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        categories,
        author: req.user.id,
        publishedAt: new Date()
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update blog post (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete blog post (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
    try {
        await BlogPost.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;