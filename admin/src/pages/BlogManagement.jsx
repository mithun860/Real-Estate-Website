import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    tags: "",
    published: true
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const getAuthConfig = () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const config = getAuthConfig();
      const res = await axios.get(`${BACKEND_URL}/api/blogs/admin?page=1&limit=100`, config);
      setBlogs(res.data.posts || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (name === 'title' && !editingBlog) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      coverImage: "",
      tags: "",
      published: true
    });
    setEditingBlog(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const config = getAuthConfig();

      if (editingBlog) {
        await axios.put(`${BACKEND_URL}/api/blogs/${editingBlog._id}`, blogData, config);
        setSuccess("Blog updated successfully!");
      } else {
        await axios.post(`${BACKEND_URL}/api/blogs`, blogData, config);
        setSuccess("Blog created successfully!");
      }

      resetForm();
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
      
      if (err.response?.status === 401) {
        setError("Unauthorized. Please check your admin credentials.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to save blog");
      }
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      content: blog.content || "",
      excerpt: blog.excerpt || "",
      coverImage: blog.coverImage || "",
      tags: blog.tags ? blog.tags.join(', ') : "",
      published: blog.published !== undefined ? blog.published : true
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    
    try {
      const config = getAuthConfig();
      await axios.delete(`${BACKEND_URL}/api/blogs/${id}`, config);
      setSuccess("Blog deleted successfully!");
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
      
      if (err.response?.status === 401) {
        setError("Unauthorized. Please check your admin credentials.");
      } else {
        setError("Failed to delete blog");
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Add New Blog
        </button>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingBlog ? "Edit Blog" : "Add New Blog"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter blog title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    placeholder="url-slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <textarea
                  name="excerpt"
                  placeholder="Brief description of the blog post..."
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full border p-3 rounded h-24 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                <input
                  type="url"
                  name="coverImage"
                  placeholder="https://example.com/image.jpg"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <input
                  type="text"
                  name="tags"
                  placeholder="technology, web development, programming"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <small className="text-gray-500">Separate multiple tags with commas</small>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content *</label>
                <textarea
                  name="content"
                  placeholder="Write your blog content here... (HTML supported)"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full border p-3 rounded h-64 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <small className="text-gray-500">HTML formatting is supported</small>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-green-600"
                />
                <label className="text-sm font-medium">Publish immediately</label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors"
                >
                  {editingBlog ? "Update Blog" : "Create Blog"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">All Blogs ({blogs.length})</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">Loading blogs...</div>
        ) : error && blogs.length === 0 ? (
          <div className="p-8 text-center text-red-600">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No blogs found. Create your first blog post!
          </div>
        ) : (
          <div className="divide-y">
            {blogs.map((blog) => (
              <div key={blog._id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {blog.coverImage && (
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold">{blog.title}</h3>
                        <p className="text-sm text-gray-500">/{blog.slug}</p>
                      </div>
                    </div>
                    
                    {blog.excerpt && (
                      <p className="text-gray-600 mb-2">{blog.excerpt}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded ${
                        blog.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      {blog.tags && blog.tags.length > 0 && (
                        <span>Tags: {blog.tags.join(', ')}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                    <a
                      href={`https://www.threeleafworld.com/blog/${blog.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;