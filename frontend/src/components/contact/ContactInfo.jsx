import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactInfoItem from './InfoItem';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '8600315351',
    link: 'tel:+918600315351',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'splrdevelopers02@gmail.com',
    link: 'mailto:splrdevelopers02@gmail.com',
  },
  {
    icon: MapPin,
    title: 'Address',
    content: 'FLAT NO 15 SHIVOM APT, NEAR MADHU ELECTRONICS, MAHATMA NAGAR NASHIK',
    link: '#Map',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'All Day: 24/7',
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="bg-[#f0faf9] p-8 rounded-2xl shadow-sm font-montserrat"
    >
      <h2 className="text-2xl font-oswald font-bold mb-8 text-[#066b70]">Our Office</h2>
      <div className="space-y-6">
        {contactInfo.map((info, index) => (
          <ContactInfoItem key={index} {...info} />
        ))}
      </div>
    </motion.div>
  );
}