import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import splrLogo from "../../assets/splr-logo.png";
import ltLogo from "../../assets/lt-logo.png";

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
    navigate("/properties");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-24 text-center overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out"
        style={{
          background: `linear-gradient(${bgAngle}deg, #ff6b6b, #f7b267, #fef9ef)`,
        }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      />

      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#425036]/20 via-[#F9B113]/10 to-[#F9B113]/5 blur-sm z-0" />

      {/* Particle Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 5 + 1 + "px",
              height: Math.random() * 5 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full">
        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center items-center space-x-4 mb-6"
        >
          <img
            src={splrLogo}
            alt="SPLR Developers"
            className="h-14 sm:h-20 w-auto max-w-[150px] object-contain"
          />
          <span className="text-white text-2xl font-bold">×</span>
          <img
            src={ltLogo}
            alt="LT Buildcon"
            className="h-14 sm:h-20 w-auto max-w-[150px] object-contain"
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-white"
          style={{ fontFamily: "'Queensides', serif" }}
        >
          <span className="bg-gradient-to-r from-[#425036] to-[#425036] bg-clip-text text-transparent">
            Where Luxury Meets Lifestyle
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-6 text-lg sm:text-xl text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-3xl mx-auto"
        >
          We craft exceptional living spaces that embody sophistication and
          comfort. Our curated portfolio showcases premium properties with
          cutting-edge design, premium amenities, and prime locations that
          redefine urban living.
        </motion.p>

        {/* CTA Buttons */}
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
            className="px-8 py-3 bg-gradient-to-r from-[#425036] to-[#425036] text-white font-medium rounded-lg shadow-lg hover:shadow-[#425036]/20 transition-all"
          >
            Explore Properties
          </motion.button>
          <motion.button
            onClick={handleContactClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-transparent border-2 border-[#425036] text-[#425036] font-medium rounded-lg hover:bg-[#425036]/10 transition-all"
          >
            Contact Our Team
          </motion.button>
        </motion.div>

        {/* Feature Bullets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-white text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#425036]"></div>
            <span>Premium Locations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#425036]"></div>
            <span>Smart Home Technology</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#425036]"></div>
            <span>Sustainable Design</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
