const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST route – Save contact form data
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(200).json({ success: true, message: "Message received!" });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ NEW: GET route – Fetch all contact form submissions
router.get("/all", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;