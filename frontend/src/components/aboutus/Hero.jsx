import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [bgAngle, setBgAngle] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setBgAngle((prev) => (prev + 30) % 360);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = () => navigate("/");
  const handleContactClick = () => navigate("/contact");

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 py-24 text-center overflow-hidden font-montserrat">
      {/* Soft Morning Background */}
      <motion.div
        className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out"
        style={{
          background: `linear-gradient(${bgAngle}deg, #fdf6ec, #dbeafe, #f0f9ff)`,
        }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      />

      {/* Floating Light Particles */}
      <div className="absolute inset-0 z-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-slate-800"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <span className="bg-gradient-to-r from-[#2563eb] to-[#38bdf8] bg-clip-text text-transparent">
            Where Luxury Meets Lifestyle
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto"
        >
          At{" "}
          <span className="text-[#2563eb] font-semibold">SPLR Developers</span>,
          we craft exceptional living spaces that embody sophistication and
          comfort. Our curated portfolio showcases premium properties with
          cutting-edge design, luxury amenities, and prime locations that
          redefine urban living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={handleExploreClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#2563eb] text-white font-medium rounded-lg shadow-lg hover:shadow-blue-300 transition-all"
          >
            Explore Properties
          </motion.button>
          <motion.button
            onClick={handleContactClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-[#2563eb] text-[#2563eb] font-medium rounded-lg hover:bg-blue-100 transition-all"
          >
            Contact Our Team
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-slate-700 text-sm"
        >
          {[
            "Premium Locations",
            "Smart Home Technology",
            "Sustainable Design",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2563eb]"></div>
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
