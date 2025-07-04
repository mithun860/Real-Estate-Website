import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactInfoItem from './InfoItem';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: (
      <div className="flex flex-wrap gap-x-4">
        <a href="tel:+918600315351" className="hover:text-[#066b70] transition">
          8600315351
        </a>
        /
        <a href="tel:+919850582219" className="hover:text-[#066b70] transition">
          9850582219
        </a>
        /
        <a href="tel:+919545453288" className="hover:text-[#066b70] transition">
          9545453288
        </a>
      </div>
    ),
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
    content:
      'FLAT NO 15 SHIVOM APT, NEAR MADHU ELECTRONICS, MAHATMA NAGAR NASHIK',
    link: '#Map',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'All Day: 9 a.m to 7 p.m',
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="bg-[#f0faf9] p-8 rounded-2xl shadow-sm font-[Montserrat]"
    >
      <h2
        className="text-2xl font-bold mb-8 text-[#066b70]"
        style={{ fontFamily: "'Queensides', serif" }}
      >
        Our Office
      </h2>

      <div className="space-y-6">
        {contactInfo.map((info, index) => (
          <ContactInfoItem key={index} {...info} />
        ))}
      </div>
    </motion.div>
  );
}
