// backend/seed/seedAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from '../models/AdminModel.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await Admin.findOneAndUpdate(
      { email: 'admin@splr.com' },
      {
        name: 'Admin',
        email: 'admin@splr.com',
        password: hashedPassword,
        isAdmin: true,
        loginAttempts: 0,
        accountLocked: false,
      },
      { upsert: true, new: true }
    );

    console.log('✅ Admin user created or updated:', admin);
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

seedAdmin();
