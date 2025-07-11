import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import twilio from "twilio";
import Contact from "../models/Contact.js";

dotenv.config();

const router = express.Router();

// Mailer setup
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

// Twilio setup
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// POST: Submit contact form
router.post("/submit", async (req, res) => {
  try {
    const { name, email = "", phone, message = "" } = req.body;

    const newContact = new Contact({ name, email, phone, message, status: "pending" });
    await newContact.save();

    await transporter.sendMail({
      from: '"Website Contact" <no-reply@buildestate.com>',
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Contact Submission",
      html: `
        <h3>New Contact Form Submitted</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Message:</strong> ${message || 'No message'}</p>
      `,
    });

    if (process.env.ADMIN_PHONE) {
      await twilioClient.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.ADMIN_PHONE,
        body: `📩 New contact from ${name} (${phone})`,
      });
    }

    res.status(200).json({ success: true, message: "Message received!" });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET: Fetch all contacts
router.get("/all", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, contacts });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT: Update status
router.put("/status", async (req, res) => {
  try {
    const { contactId, status } = req.body;
    const updated = await Contact.findByIdAndUpdate(contactId, { status }, { new: true });

    if (!updated) return res.status(404).json({ success: false, message: "Contact not found" });

    res.status(200).json({ success: true, message: "Status updated", contact: updated });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
