import express from 'express';
import Blog from '../models/Blog.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all blog posts (paginated)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const posts = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Blog.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    res.json({ posts, totalPages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new blog post (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  const { title, slug, content, excerpt, coverImage, tags, published } = req.body;

  try {
    const newBlog = new Blog({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content,
      excerpt,
      coverImage,
      tags,
      published
    });

    const saved = await newBlog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update blog post (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Post not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete blog post (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;