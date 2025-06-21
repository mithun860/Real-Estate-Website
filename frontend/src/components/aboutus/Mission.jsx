import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

export default function Mission() {
  const { scrollY } = useViewportScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f9faf8 0%, #d6e9e6 60%, #e3b070 100%)",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Soft blur radial highlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(66,80,54,0.3), transparent 60%)",
          filter: "blur(100px)",
          zIndex: 0,
          y: yParallax,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 text-gray-800">
        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Queensides', serif", color: "#425036" }}
          >
            Our Mission at SPLR
          </h2>
          <div
            className="w-24 h-1 mx-auto mb-6 rounded-full"
            style={{ backgroundColor: "#e3b070", opacity: 0.9 }}
          />
          <p
            className="max-w-3xl mx-auto text-lg leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif", color: "#333" }}
          >
            At <span className="font-semibold" style={{ color: "#425036" }}>SPLR</span>, we don’t just build homes—we cultivate trust, lifestyle, and luxury.
            Our mission is to craft premium living experiences that blend architectural excellence with human values.
          </p>
        </motion.div>

        {/* Mission Cards */}
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
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: "#333",
              }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{
                  fontFamily: "'Queensides', serif",
                  color: "#425036",
                }}
              >
                {item.title}
              </h3>
              <p className="text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
