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

  const handleExploreClick = () => {
    navigate("/"); // Navigate to homepage
  };

  const handleContactClick = () => {
    navigate("/contact"); // Navigate to contact page
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 py-24 text-center overflow-hidden bg-slate-950">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out"
        style={{
          background: `linear-gradient(${bgAngle}deg, #0f172a, #1e293b, #1e3a8a)`,
        }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      />
      
      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-300/20 via-sky-400/10 to-purple-400/5 blur-sm z-0" />

      {/* Particle Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 5 + 1 + 'px',
              height: Math.random() * 5 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
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
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-white"
        >
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Where Luxury Meets Lifestyle
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto"
        >
          At <span className="text-emerald-400 font-semibold">SPLR Developers</span>, we craft exceptional living spaces that embody sophistication and comfort. 
          Our curated portfolio showcases premium properties with cutting-edge design, premium amenities, 
          and prime locations that redefine urban living.
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
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-all"
          >
            Explore Properties
          </motion.button>
          <motion.button
            onClick={handleContactClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-transparent border-2 border-emerald-400 text-emerald-400 font-medium rounded-lg hover:bg-emerald-400/10 transition-all"
          >
            Contact Our Team
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-slate-400 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span>Premium Locations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span>Smart Home Technology</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span>Sustainable Design</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;