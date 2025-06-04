import express from 'express';
import {
  adminLogin,
  getAdminStats,
  getAllAppointments,
  updateAppointmentStatus
} from '../controller/adminController.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

console.log("Admin router loaded");  // <---- Add this log here

// Public route - Admin login
router.post('/login', (req, res) => {
  console.log("Admin login route hit"); // <---- Add this here
  adminLogin(req, res);
});

// Protected routes (require admin authentication)
router.use(isAdmin);

// Dashboard stats
router.get('/stats', getAdminStats);

// Appointments management
router.get('/appointments', getAllAppointments);
router.put('/appointments/status', updateAppointmentStatus);

export default router;