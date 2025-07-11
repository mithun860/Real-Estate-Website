import express from 'express';
import {
  adminLogin,
  getAdminStats,
  getAllAppointments,
  updateAppointmentStatus
} from '../controller/adminController.js';
import { isAdmin } from '../middleware/authMiddleware.js';
import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';

const router = express.Router();

console.log("Admin router loaded");

// Verification endpoint (temporary - remove after debugging)
router.get('/verify-credentials', async (req, res) => {
  try {
    console.log("Verifying admin credentials in database...");
    
    const admin = await Admin.findOne({ email: "admin@splr.com" });
    const exists = !!admin;
    let passwordMatch = false;
    
    if (admin) {
      passwordMatch = await bcrypt.compare("admin123", admin.password);
    }
    
    res.json({
      adminExists: exists,
      passwordMatch,
      databaseConnected: true,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Enhanced login route with detailed logging
router.post('/login', async (req, res) => {
  console.log("Admin login request received:", {
    timestamp: new Date().toISOString(),
    body: req.body,
    headers: req.headers
  });

  try {
    console.log("Environment variables:", {
      NODE_ENV: process.env.NODE_ENV,
      JWT_SECRET: process.env.JWT_SECRET ? "exists" : "missing"
    });

    await adminLogin(req, res);
    
    console.log("Login attempt processed");
  } catch (error) {
    console.error("Error in login route:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ 
      success: false,
      message: "Internal server error during login"
    });
  }
});

// Protected routes (require admin authentication)
router.use(isAdmin);

// Dashboard stats
router.get('/stats', getAdminStats);

// Appointments management
router.get('/appointments', getAllAppointments);
router.put('/appointments/status', updateAppointmentStatus);

export default router;