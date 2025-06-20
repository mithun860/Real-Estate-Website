import React from 'react';
import useContactForm from './useContactform';

const ContactForm = () => {
  const { formData, errors, handleChange, handleSubmit } = useContactForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-8 rounded-xl bg-[#f0faf9] shadow-sm font-[Montserrat]"
    >
      <h2
        className="text-2xl font-bold text-[#425036] mb-4"
        style={{ fontFamily: "'Queensides', serif" }}
      >
        Send Us a Message
      </h2>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-[#425036] mb-1"
          style={{ fontFamily: "'Queensides', serif" }}
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#425036]`}
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-[#425036] mb-1"
          style={{ fontFamily: "'Queensides', serif" }}
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#425036]`}
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-[#425036] mb-1"
          style={{ fontFamily: "'Queensides', serif" }}
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#425036]"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-[#425036] mb-1"
          style={{ fontFamily: "'Queensides', serif" }}
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-2 border ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#425036]`}
        />
        {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-[#425036] text-white py-3 rounded-lg hover:bg-[#36412c] transition-colors font-medium"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;