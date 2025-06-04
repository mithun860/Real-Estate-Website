import React from 'react';
import { motion } from 'framer-motion';
import { Home, Globe, Headphones, List } from 'lucide-react';

const benefits = [
  {
    icon: Home,
    title: 'Verified Properties',
    description: 'Every property is thoroughly verified for quality and security.',
  },
  {
    icon: Globe,
    title: 'User-Friendly Platform',
    description: 'Intuitive navigation and seamless property management.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock assistance for all your queries.',
  },
  {
    icon: List,
    title: 'Comprehensive Listings',
    description: 'Wide range of properties to match every need and budget.',
  },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-[#e3b070] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-[#066b70] font-[Oswald] mb-4">
            Why Choose SPLR?
          </h2>
          <div className="w-24 h-1 bg-[#066b70] mx-auto mb-6 rounded-full" />
          <p className="text-white text-lg font-[Montserrat] max-w-2xl mx-auto">
            Experience the advantage of modern, transparent, and efficient real estate solutions.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-[#066b70]/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-8 h-8 text-[#066b70]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 font-[Oswald] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-md font-[Montserrat]">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Optional Soft Gradient Overlay or Decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#066b70]/20 rounded-full blur-3xl opacity-30"></div>
    </section>
  );
}
