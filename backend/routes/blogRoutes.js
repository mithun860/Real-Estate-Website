import express from 'express';
import Blog from '../models/Blog.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all blog posts (paginated)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const posts = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Blog.countDocuments({ published: true });
    const totalPages = Math.ceil(totalPosts / limit);

    res.json({ posts, totalPages, currentPage: page, totalPosts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all blogs for admin (including drafts)
router.get('/admin', isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const posts = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Blog.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    res.json({ posts, totalPages, currentPage: page, totalPosts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new blog post (admin only)
router.post('/', isAdmin, async (req, res) => {
  const { title, slug, content, excerpt, coverImage, tags, published } = req.body;

  try {
    // Generate slug if not provided
    const finalSlug = slug || title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug: finalSlug });
    if (existingBlog) {
      return res.status(400).json({ message: 'A blog with this slug already exists' });
    }

    const newBlog = new Blog({
      title,
      slug: finalSlug,
      content,
      excerpt,
      coverImage,
      tags: Array.isArray(tags) ? tags : [],
      published: published !== undefined ? published : true
    });

    const saved = await newBlog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update blog post (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { slug } = req.body;
    
    // Check if slug is being changed and already exists
    if (slug) {
      const existingBlog = await Blog.findOne({ 
        slug: slug, 
        _id: { $ne: req.params.id } 
      });
      if (existingBlog) {
        return res.status(400).json({ message: 'A blog with this slug already exists' });
      }
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Post not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete blog post (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;