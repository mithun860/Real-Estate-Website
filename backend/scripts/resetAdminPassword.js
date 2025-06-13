import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/Usermodel.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env from correct path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function resetAdminPassword() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("MONGO_URI is missing in .env");

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    const email = process.env.ADMIN_EMAIL;
    const newPassword = process.env.ADMIN_PASSWORD;

    if (!email || !newPassword) throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD missing in .env");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await User.findOneAndUpdate(
      { email, isAdmin: true },
      { password: hashedPassword },
      { new: true }
    );

    if (!result) {
      console.log("❌ Admin user not found.");
    } else {
      console.log("✅ Admin password reset successfully.");
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error resetting admin password:", err);
    process.exit(1);
  }
}

resetAdminPassword();
