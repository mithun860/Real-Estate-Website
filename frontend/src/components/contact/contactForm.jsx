import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import useContactForm from './useContactform';

function ContactForm() {
  const { formData, errors, handleChange, handleSubmit } = useContactForm();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="bg-[#f0faf9] p-8 rounded-2xl shadow-sm font-montserrat"
    >
      <h2 className="text-2xl font-oswald font-bold mb-6 text-[#066b70]">
        Send Us a Message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-oswald font-semibold mb-1 text-[#066b70]"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#066b70] ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-oswald font-semibold mb-1 text-[#066b70]"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#066b70] ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-oswald font-semibold mb-1 text-[#066b70]"
          >
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#066b70]"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-oswald font-semibold mb-1 text-[#066b70]"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#066b70] ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#066b70] text-white py-3 rounded-lg hover:bg-[#05594f] transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Message
        </button>
      </form>
    </motion.div>
  );
}

export default ContactForm;
