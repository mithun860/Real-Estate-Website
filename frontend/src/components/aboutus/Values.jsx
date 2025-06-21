import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, CheckCircle } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Trust',
    description:
      'Every client interaction is built on verified data, ethical dealings, and a commitment to secure experiences across all transactions.',
  },
  {
    icon: CheckCircle,
    title: 'Transparency',
    description:
      'We believe in clarity and openness—no hidden terms, no misinformation—just honest property listings and trusted communication.',
  },
  {
    icon: Clock,
    title: 'Efficiency',
    description:
      'From search to settlement, our streamlined processes are designed to maximize your time and deliver seamless experiences.',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Values() {
  return (
    <section className="py-24 bg-[#e3b070] relative overflow-hidden font-[Montserrat]">
      {/* Decorative Blur Elements */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#425036]/20 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl font-extrabold mb-4"
            style={{ color: '#425036', fontFamily: "'Queensides', serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What Drives Us at SPLR
          </motion.h2>
          <motion.div
            className="w-24 h-1 mx-auto mb-6 rounded-full"
            style={{ backgroundColor: '#425036' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.p
            className="text-white max-w-2xl mx-auto text-lg leading-relaxed font-[Montserrat]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Our values are the foundation of every property we list, every promise we make, and every relationship we build.
          </motion.p>
        </motion.div>

        {/* Value Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {values.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              className="bg-white p-8 rounded-2xl shadow-md border border-[#425036]/20 hover:shadow-xl transition-all duration-300"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-[#425036]/10 rounded-xl flex items-center justify-center mb-6 hover:rotate-6 transition-transform duration-300">
                <Icon className="w-8 h-8 text-[#425036]" />
              </div>
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ color: '#425036', fontFamily: "'Queensides', serif" }}
              >
                {title}
              </h3>
              <p
                className="text-gray-700 text-base leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
