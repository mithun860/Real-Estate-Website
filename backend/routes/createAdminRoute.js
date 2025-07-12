// TEMPORARY ONLY — delete after use
import express from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/AdminModel.js';

const router = express.Router();

router.post('/create-admin', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@splr.com',
      password: hashedPassword,
      phone: '9876543210'
    });
    res.status(201).json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;