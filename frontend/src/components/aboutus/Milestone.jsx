import React from 'react';
import { motion } from 'framer-motion';
import { Home, Target } from 'lucide-react';
import CountUp from './Contup';

const milestones = [
  {
    icon: Home,
    title: 'Properties Listed',
    value: 500,
    description: 'Curated with care across regions',
  },
  {
    icon: Target,
    title: 'Happy Clients',
    value: 1000,
    description: 'Turning dreams into addresses',
  },
];

export default function Milestones() {
  return (
    <section className="py-24 bg-gradient-to-r from-green-50 via-white to-emerald-100 relative overflow-hidden">
      {/* Floating decorative blobs or subtle animation (optional) */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-200 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100 opacity-20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-emerald-700 mb-4 drop-shadow">
            Our Journey So Far
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            Every number tells a story of trust, growth, and transformation.
          </p>
        </motion.div>

        {/* Milestone Cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-5xl font-bold text-emerald-700 mb-2">
                  <CountUp from={0} to={milestone.value} duration={2} separator="," />
                </h3>
                <p className="text-xl font-semibold text-gray-800 mb-2">{milestone.title}</p>
                <p className="text-gray-600 text-md">{milestone.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}