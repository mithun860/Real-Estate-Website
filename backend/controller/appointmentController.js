import dotenv from 'dotenv';
import twilio from 'twilio';
import Stats from '../models/statsModel.js';
import Property from '../models/propertyModel.js';
import Appointment from '../models/appointmentModel.js';
import User from '../models/Usermodel.js';
import transporter from "../config/nodemailer.js";
import { getSchedulingEmailTemplate, getEmailTemplate } from '../email.js';

dotenv.config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// ✅ Format Indian phone number to E.164
const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) return `+91${cleaned.slice(1)}`;
  if (cleaned.startsWith('91')) return `+${cleaned}`;
  if (!cleaned.startsWith('+')) return `+91${cleaned}`;
  return cleaned;
};

const formatRecentProperties = (properties) => {
  return properties.map(property => ({
    type: 'property',
    description: `New property listed: ${property.title}`,
    timestamp: property.createdAt
  }));
};

const formatRecentAppointments = (appointments) => {
  return appointments.map(appointment => ({
    type: 'appointment',
    description: `${appointment.userId.name} scheduled viewing for ${appointment.propertyId.title}`,
    timestamp: appointment.createdAt
  }));
};

export const getAdminStats = async (req, res) => {
  try {
    const [
      totalProperties,
      activeListings,
      totalUsers,
      pendingAppointments,
      recentActivity,
      viewsData,
      revenue
    ] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ status: 'active' }),
      User.countDocuments(),
      Appointment.countDocuments({ status: 'pending' }),
      getRecentActivity(),
      getViewsData(),
      calculateRevenue()
    ]);

    res.json({
      success: true,
      stats: {
        totalProperties,
        activeListings,
        totalUsers,
        pendingAppointments,
        recentActivity,
        viewsData,
        revenue
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ success: false, message: 'Error fetching admin statistics' });
  }
};

const getRecentActivity = async () => {
  try {
    const [recentProperties, recentAppointments] = await Promise.all([
      Property.find().sort({ createdAt: -1 }).limit(5).select('title createdAt'),
      Appointment.find().sort({ createdAt: -1 }).limit(5).populate('propertyId', 'title').populate('userId', 'name')
    ]);
    return [...formatRecentProperties(recentProperties), ...formatRecentAppointments(recentAppointments)]
      .sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error getting recent activity:', error);
    return [];
  }
};

const getViewsData = async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const stats = await Stats.aggregate([
      {
        $match: {
          endpoint: /^\/api\/products\/single\//,
          method: 'GET',
          timestamp: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const labels = [];
    const data = [];

    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      labels.push(dateString);
      const stat = stats.find(s => s._id === dateString);
      data.push(stat ? stat.count : 0);
    }

    return {
      labels,
      datasets: [{
        label: 'Property Views',
        data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true
      }]
    };
  } catch (error) {
    console.error('Error generating chart data:', error);
    return {
      labels: [],
      datasets: [{
        label: 'Property Views',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true
      }]
    };
  }
};

const calculateRevenue = async () => {
  try {
    const properties = await Property.find();
    return properties.reduce((total, property) => total + Number(property.price), 0);
  } catch (error) {
    console.error('Error calculating revenue:', error);
    return 0;
  }
};

export const scheduleViewing = async (req, res) => {
  try {
    const { propertyId, name, email, date, time, notes, phone } = req.body;

    if (!name || !email || !propertyId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, property, date, and time'
      });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const existingAppointment = await Appointment.findOne({
      propertyId,
      date,
      time,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: Math.random().toString(36).slice(-8)
      });
    }

    const appointment = new Appointment({
      propertyId,
      userId: user._id,
      date,
      time,
      notes,
      status: 'pending'
    });

    await appointment.save();
    await appointment.populate(['propertyId', 'userId']);

    const mailOptions = {
      from: '"SPLR Developers" <91cd8a001@smtp-brevo.com>',
      to: email,
      subject: 'Viewing Scheduled - BuildEstate',
      html: getSchedulingEmailTemplate(appointment, date, time, notes)
    };
    await transporter.sendMail(mailOptions);

    if (phone) {
      const formattedPhone = formatPhoneNumber(phone);
      const smsMessage = `Hi ${name}, your site visit for "${property.title}" is scheduled on ${date} at ${time}. - SPLR Developers`;

      await twilioClient.messages.create({
        body: smsMessage,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formattedPhone
      });

      await twilioClient.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:${formattedPhone}`,
        body: `👋 Hello ${name},\n\n✅ Your visit to *${property.title}* is scheduled for ${date} at ${time}.\n\nThank you,\nSPLR Developers`
      });
    }

    res.status(201).json({
      success: true,
      message: 'Viewing scheduled successfully',
      appointment
    });

  } catch (error) {
    console.error('❌ Error scheduling viewing:', error);
    res.status(500).json({
      success: false,
      message: 'Error scheduling viewing'
    });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('propertyId', 'title location')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Error fetching appointments' });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    ).populate('propertyId userId');

    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

    const mailOptions = {
      from: '"SPLR Developers" <91cd8a001@smtp-brevo.com>',
      to: appointment.userId.email,
      subject: `Viewing Appointment ${status} - BuildEstate`,
      html: getEmailTemplate(appointment, status)
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: `Appointment ${status} successfully`, appointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ success: false, message: 'Error updating appointment' });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId)
      .populate('propertyId', 'title')
      .populate('userId', 'email');

    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

    appointment.status = 'cancelled';
    appointment.cancelReason = req.body.reason || 'Cancelled by user';
    await appointment.save();

    const mailOptions = {
      from: '"SPLR Developers" <91cd8a001@smtp-brevo.com>',
      to: appointment.userId.email,
      subject: 'Appointment Cancelled - BuildEstate',
      html: `<p>Your viewing for <b>${appointment.propertyId.title}</b> has been cancelled.</p>`
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ success: false, message: 'Error cancelling appointment' });
  }
};

export const getAppointmentsByUser = async (req, res) => {
  return res.status(403).json({ success: false, message: 'User-based appointment view is disabled' });
};

export const updateAppointmentMeetingLink = async (req, res) => {
  try {
    const { appointmentId, meetingLink } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { meetingLink },
      { new: true }
    ).populate('propertyId userId');

    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

    const mailOptions = {
      from: '"SPLR Developers" <91cd8a001@smtp-brevo.com>',
      to: appointment.userId.email,
      subject: "Meeting Link Updated - BuildEstate",
      html: `<p>Your meeting link for <b>${appointment.propertyId.title}</b> has been updated:</p><a href="${meetingLink}">Join Now</a>`
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Meeting link updated successfully', appointment });
  } catch (error) {
    console.error('Error updating meeting link:', error);
    res.status(500).json({ success: false, message: 'Error updating meeting link' });
  }
};

export const getAppointmentStats = async (req, res) => {
  try {
    const [pending, confirmed, cancelled, completed] = await Promise.all([
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments({ status: 'confirmed' }),
      Appointment.countDocuments({ status: 'cancelled' }),
      Appointment.countDocuments({ status: 'completed' })
    ]);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyStats = await Appointment.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      success: true,
      stats: {
        total: pending + confirmed + cancelled + completed,
        pending,
        confirmed,
        cancelled,
        completed,
        dailyStats
      }
    });
  } catch (error) {
    console.error('Error fetching appointment stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching appointment statistics' });
  }
};

export const submitAppointmentFeedback = async (req, res) => {
  return res.status(403).json({ success: false, message: 'Feedback system is disabled for guests' });
};

export const getUpcomingAppointments = async (req, res) => {
  return res.status(403).json({ success: false, message: 'User-based appointment view is disabled' });
};
