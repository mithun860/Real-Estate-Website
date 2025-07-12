import jwt from "jsonwebtoken";
import userModel from "../models/Usermodel.js";
import Admin from "../models/adminModel.js";
import Appointment from "../models/appointmentModel.js";

// Middleware to protect user routes
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Please login to continue" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};

// ✅ Middleware to protect admin routes (uses Admin model)
export const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Please login to continue" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin user not found" });
    }

    if (!admin.isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    req.user = admin;
    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    return res.status(401).json({ success: false, message: "Not authorized as admin" });
  }
};

// Appointment ownership check for user actions
export const checkAppointmentOwnership = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to access this appointment" });
    }

    req.appointment = appointment;
    next();
  } catch (error) {
    console.error("Ownership check error:", error);
    return res.status(500).json({ success: false, message: "Error checking appointment ownership" });
  }
};
