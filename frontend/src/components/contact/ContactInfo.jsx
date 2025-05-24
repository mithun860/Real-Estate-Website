import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactInfoItem from './InfoItem';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '+918600315351',
    link: 'tel:+918600315351',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'splr@gmail.com',
    link: 'mailto:splr@gmail.com',
  },
  {
    icon: MapPin,
    title: 'Address',
    content: 'Flat no 15 Shivom apt, Near Madhuel Electronics, Mahatma nagar Nashik',
    link: '#Map',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'Mon-Fri: 9 AM - 6 PM',
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-2xl shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-8">Our Office</h2>
      <div className="space-y-6">
        {contactInfo.map((info, index) => (
          <ContactInfoItem key={index} {...info} />
        ))}
      </div>
    </motion.div>
  );
}