import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/Usermodel.js';

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB:', process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    console.log('Existing admin found?', existingAdmin);

    if (existingAdmin) {
      console.log('Admin user already exists');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    console.log('Hashed password:', hashedPassword);

    const adminUser = new User({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true,
      phone: '1234567890'
    });

    const result = await adminUser.save();
    console.log('✅ Admin user created:', result);
    process.exit(0);

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();