import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

// ✅ FIXED SMTP CONFIG WITH SELF-SIGNED CERT SUPPORT
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // STARTTLS (do not set secure:true on port 587)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // ✅ Accept self-signed certs (PRODUCTION FIX)
  }
});

// ✅ OPTIONAL: VERIFY SMTP CONNECTION
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Brevo SMTP verification failed:", err);
  } else {
    console.log("✅ Brevo SMTP is ready (verified)");
  }
});

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const submitForm = async (req, res) => {
  try {
    const { name, email = "", phone, message = "" } = req.body;

    // ✅ Save to MongoDB
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    // ✅ Send email to admin
    await transporter.sendMail({
      from: '"Website Contact" <no-reply@splr.com>',
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Contact Submission",
      html: `
        <h3>New Contact Form Submitted</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Message:</strong><br>${message || 'No message provided'}</p>
        <p>📬 Timestamp: ${new Date().toLocaleString()}</p>
      `
    });

    // ✅ Send SMS via Twilio (optional)
    if (process.env.ADMIN_PHONE) {
      await twilioClient.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.ADMIN_PHONE,
        body: `📩 New contact from ${name} (${phone}) on SPLR. Check email for full message.`
      });
    }

    res.status(200).json({ success: true, message: "Message received!" });

  } catch (error) {
    console.error("❌ Error saving contact form:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
