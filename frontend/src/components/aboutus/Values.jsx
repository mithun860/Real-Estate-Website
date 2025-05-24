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
    <section className="py-24 bg-gradient-to-br from-white via-slate-50 to-emerald-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(209,250,229,0.3),_transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl font-extrabold mb-4 text-emerald-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What Drives Us at SPLR
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-emerald-600 mx-auto mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Our values are the foundation of every property we list, every promise we make, and every relationship we build.
          </motion.p>
        </motion.div>

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
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md border border-emerald-100 hover:shadow-xl transition-all duration-300"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 transform transition-transform duration-300 hover:rotate-6">
                <Icon className="w-8 h-8 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-emerald-800">{title}</h3>
              <p className="text-gray-700 text-base leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}