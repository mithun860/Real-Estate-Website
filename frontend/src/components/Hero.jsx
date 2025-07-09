import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 py-24 text-center overflow-hidden bg-transparent font-montserrat">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/three-leaf-video.mp4"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
        {/* "Three Leaf" */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[2.75rem] sm:text-[4rem] md:text-[4.5rem] uppercase mb-2 tracking-[0.1em] leading-tight"
          style={{
            fontFamily: "'Marigold Magic Bold', cursive",
            color: "#f5c141",
            textShadow: "3px 3px 10px rgba(0,0,0,0.5)",
            letterSpacing: "0.12em",
          }}
        >
          THREE LEAF
        </motion.h1>

        {/* "Green Space" */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[1.5rem] sm:text-[2rem] md:text-[2.25rem] uppercase mb-8 tracking-[0.1em]"
          style={{
            fontFamily: "'Marigold Magic Bold', cursive",
            color: "#ffffff",
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)",
            letterSpacing: "0.1em",
          }}
        >
          GREEN SPACE
        </motion.h2>

        {/* Description / Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-2 text-lg sm:text-2xl md:text-3xl text-white font-medium max-w-3xl mx-auto"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.85)",
          }}
        >
          A villa that makes every day
          <br />
          <span
            className="text-[#e3b07b]"
            style={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            A picnic in nature
          </span>
        </motion.p>

        {/* Feature Bullets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-14 flex flex-wrap justify-center gap-8 text-base sm:text-xl md:text-2xl"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: "#f1f5f9",
            textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
          }}
        >
          {[
            "52 Acres Gated Community",
            "Premium Farm Plots",
            "Luxury Amenities",
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#e3b07b] rounded-full"></div>
              <span>{feature}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
