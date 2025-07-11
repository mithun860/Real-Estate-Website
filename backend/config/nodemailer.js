import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // Port 587 uses STARTTLS, so keep secure: false
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // 👇 THIS FIXES the "self-signed certificate" issue
    rejectUnauthorized: false
  }
});

// Optional: test connection
transporter.verify()
  .then(() => console.log('✅ Brevo SMTP is ready (verified)'))
  .catch((err) => console.error('❌ Brevo SMTP connection error:', err));

export default transporter;
