import express from 'express';
import multer from 'multer';
import Property from '../models/propertyModel.js';
import { storage } from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage }); // Cloudinary storage

// @route   POST /api/properties/add
// @desc    Add new property with image uploads
router.post('/properties/add', upload.array('images', 5), async (req, res) => {
  try {
    const imageUrls = req.files.map(file => file.path); // Cloudinary returns `path` as the URL

    const newProperty = new Property({
      ...req.body,
      images: imageUrls,
    });

    await newProperty.save();
    res.status(201).json({ message: 'Property added successfully', property: newProperty });
  } catch (err) {
    console.error('Error uploading property:', err);
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/properties
// @desc    Fetch all properties
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/properties/:id
// @desc    Get single property by ID
router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;