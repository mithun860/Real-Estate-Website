import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Stats from "../models/statsModel.js";
import Property from "../models/propertyModel.js";
import Appointment from "../models/appointmentModel.js";
import User from "../models/Usermodel.js";
import transporter from "../config/nodemailer.js";
import { getEmailTemplate } from "../email.js";
import Admin from '../models/adminModel.js'; // ✅ Using correct Admin model

// ======================
//  ADMIN AUTHENTICATION
// ======================
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt for:', email);

    const admin = await Admin.findOne({ email });

    if (!admin || !admin.isAdmin) {
      console.log('Admin not found or not an admin');
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials"
      });
    }

    // Use bcrypt.compare directly
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log('Password match:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Password mismatch');
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials"
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        isAdmin: true
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('Login successful for:', admin.email);
    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// ======================
//  DASHBOARD STATISTICS
// ======================
const formatRecentProperties = (properties) => {
  return properties.map((property) => ({
    type: "property",
    description: `New listing: ${property.title}`,
    timestamp: property.createdAt,
    data: property
  }));
};

const formatRecentAppointments = (appointments) => {
  return appointments.map((appointment) => ({
    type: "appointment",
    description: appointment.userId && appointment.propertyId 
      ? `${appointment.userId.name} booked ${appointment.propertyId.title}`
      : "New appointment",
    timestamp: appointment.createdAt,
    data: appointment
  }));
};

const getRecentActivity = async () => {
  try {
    const [properties, appointments] = await Promise.all([
      Property.find().sort({ createdAt: -1 }).limit(5),
      Appointment.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("userId", "name email")
        .populate("propertyId", "title images")
    ]);

    return [
      ...formatRecentProperties(properties),
      ...formatRecentAppointments(appointments)
    ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);

  } catch (error) {
    console.error("Recent activity error:", error);
    return [];
  }
};

const getViewsData = async (days = 30) => {
  try {
    const date = new Date();
    date.setDate(date.getDate() - days);

    const stats = await Stats.aggregate([
      { 
        $match: { 
          endpoint: /^\/api\/properties\//,
          timestamp: { $gte: date } 
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const result = [];
    for (let i = 0; i < days; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - (days - i - 1));
      const dateString = currentDate.toISOString().split('T')[0];
      
      const stat = stats.find(s => s._id === dateString);
      result.push(stat ? stat.count : 0);
    }

    return {
      labels: Array.from({ length: days }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (days - i - 1));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      data: result
    };

  } catch (error) {
    console.error("Views data error:", error);
    return {
      labels: [],
      data: []
    };
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const [
      totalProperties,
      activeProperties,
      totalUsers,
      pendingAppointments,
      recentActivity,
      viewsData,
      totalVisitors
    ] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ status: "active" }),
      User.countDocuments(),
      Appointment.countDocuments({ status: "pending" }),
      getRecentActivity(),
      getViewsData(),
      Stats.countDocuments({ endpoint: /^\/api\/properties\// })
    ]);

    res.status(200).json({
      success: true,
      stats: {
        properties: { total: totalProperties, active: activeProperties },
        users: totalUsers,
        appointments: { pending: pendingAppointments },
        activity: recentActivity,
        analytics: {
          views: viewsData,
          visitors: totalVisitors
        }
      }
    });

  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics"
    });
  }
};

// ======================
//  APPOINTMENT MANAGEMENT
// ======================
export const getAllAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate("userId", "name email phone")
      .populate("propertyId", "title price images")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Appointment.countDocuments(query);

    res.status(200).json({
      success: true,
      appointments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Get appointments error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments"
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status, adminNotes } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status, adminNotes },
      { new: true }
    )
    .populate("userId", "name email")
    .populate("propertyId", "title");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: appointment.userId.email,
      subject: `Appointment Update: ${appointment.propertyId.title}`,
      html: getEmailTemplate(appointment, status)
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: `Appointment ${status}`,
      appointment
    });

  } catch (error) {
    console.error("Update appointment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update appointment"
    });
  }
};

// ======================
//  PROPERTY MANAGEMENT
// ======================
export const approveProperty = async (req, res) => {
  try {
    const { propertyId } = req.body;

    const property = await Property.findByIdAndUpdate(
      propertyId,
      { status: "active", approvedAt: new Date() },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Property approved",
      property
    });

  } catch (error) {
    console.error("Approve property error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to approve property"
    });
  }
};
