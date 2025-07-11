import express from 'express';
import Property from '../models/propertyModel.js';

const router = express.Router();

// ✅ Add Property (image URLs from frontend)
router.post('/properties/add', async (req, res) => {
  try {
    const {
      title,
      shortDesc,
      fullDesc,
      location,
      price,
      amenities,
      images
    } = req.body;

    if (!title || !location || !price || !images?.length) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProperty = new Property({
      title,
      shortDesc,
      fullDesc,
      location,
      price,
      amenities,
      images,
    });

    await newProperty.save();
    res.status(201).json({ message: 'Property added successfully', property: newProperty });
  } catch (err) {
    console.error('Backend upload error:', err.message);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// ✅ Get all properties
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get single property by ID
router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

// ✅ Update property by ID
router.put('/properties/:id', async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Property updated', property: updated });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// ✅ Delete property by ID
router.delete('/properties/:id', async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;