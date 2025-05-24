import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import communityVideo from "../assets/community-video.mov";

const Hero = () => {
  // Text animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const letter = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.03, duration: 0.5 }
    })
  };

  const AnimatedText = ({ text, className = "" }) => (
    <motion.span variants={container} initial="hidden" animate="visible" className={className}>
      {text.split(" ").map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          <span className="whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={letter}
                custom={wordIndex * 10 + charIndex}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wordIndex < text.split(" ").length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.span>
  );

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={communityVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-gray-900/20" />
      </div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative z-20 text-center max-w-4xl mx-auto flex flex-col justify-center items-center min-h-screen px-6 font-montserrat"
      >
        {/* Community Name */}
        <motion.div variants={item} className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            <AnimatedText text="THREE LEAF" />
          </h1>
          <p className="text-xl text-white font-bold">
            <AnimatedText text="52-Acre Gated Community" />
          </p>
        </motion.div>

        {/* Property Types */}
        <motion.div variants={item} className="mb-8">
          <p className="text-lg text-white font-bold mb-1">
            <AnimatedText text="Farmhouse Plots • Bungalow Plots" />
          </p>
          <p className="text-white font-bold">
            <AnimatedText text="Premium Plotted Developments" />
          </p>
        </motion.div>

        {/* Description */}
        <motion.div variants={item} className="max-w-2xl mb-8">
          <p className="text-white text-lg leading-relaxed font-bold">
            <AnimatedText text="A serene gated community offering premium plotted developments amidst nature, designed for those who value space, privacy, and quality living." />
          </p>
        </motion.div>

        {/* Location */}
        <motion.div variants={item} className="flex items-center gap-2 text-white text-sm font-bold">
          <FaMapMarkerAlt className="text-white" />
          <span>
            <AnimatedText text="Prime Location • Premium Amenities • Secure Environment" />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;