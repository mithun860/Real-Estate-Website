import React from "react";
import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-emerald-50">
      {/* Soft overlay for elegant glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(209,250,229,0.4),_transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-emerald-800 mb-4">
            Our Mission at SPLR
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6 rounded-full" />
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            At <span className="text-emerald-700 font-semibold"> SPLR</span>, we don’t just build homes—we cultivate trust, lifestyle, and luxury. 
            Our mission is to craft premium living experiences that blend architectural excellence with human values.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Quality & Craftsmanship",
              description:
                "Every home reflects our commitment to detail, elegance, and long-lasting value.",
              icon: "🏡",
            },
            {
              title: "Client-Centered Approach",
              description:
                "We prioritize your vision—ensuring every journey is personal, seamless, and rewarding.",
              icon: "🤝",
            },
            {
              title: "Sustainable Growth",
              description:
                "With a deep respect for nature and community, we build with purpose and responsibility.",
              icon: "🌱",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}