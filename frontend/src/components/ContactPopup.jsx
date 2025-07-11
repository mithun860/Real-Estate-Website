import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact', form);
      alert('Thanks for contacting us!');
      setIsOpen(false);
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Failed to send. Try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>

        <h3
          className="text-2xl font-bold mb-4 text-[#425036]"
          style={{ fontFamily: "'Queensides', serif" }}
        >
          Get in Touch
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            required
            placeholder="Name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />
          <input
            name="phone"
            type="text"
            required
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={3}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />
          <button
            type="submit"
            className="w-full py-2 rounded text-white transition-colors"
            style={{
              backgroundColor: '#425036',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
