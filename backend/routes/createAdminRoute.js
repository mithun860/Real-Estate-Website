import express from 'express';
import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// ✅ Allow public access — no middleware here
router.post('/create', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      name,
      isAdmin: true
    });

    await newAdmin.save();

    res.status(201).json({ success: true, message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
