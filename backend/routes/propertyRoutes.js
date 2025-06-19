import express from 'express';
import Property from '../models/propertyModel.js';

const router = express.Router();

// POST /api/properties/add - Add property
router.post('/properties/add', async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json({ message: "Property added", property: newProperty });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/properties - Get all properties
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/properties/:id - Get single property
router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;