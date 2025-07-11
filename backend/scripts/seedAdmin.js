import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Admin from '../models/adminModel.js';

// Configure environment variables
dotenv.config();

// Fix __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

// Seed admin function
const seedAdmin = async () => {
  try {
    await connectDB();

    const adminData = {
      email: "admin@splr.com",
      password: "admin123", // Will be hashed by the model pre-save hook
      role: "superadmin"
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      
      // Verify the password works
      const isMatch = await existingAdmin.comparePassword(adminData.password);
      console.log('Password verification:', isMatch ? 'SUCCESS' : 'FAILED');
      
      if (!isMatch) {
        // Update password if needed
        existingAdmin.password = adminData.password;
        await existingAdmin.save();
        console.log('Admin password updated');
      }
    } else {
      // Create new admin
      const admin = await Admin.create(adminData);
      console.log('Admin created successfully:', admin.email);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

// Run the seed function
seedAdmin();