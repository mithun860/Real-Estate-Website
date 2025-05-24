// routes/contact.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

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

module.exports = router;