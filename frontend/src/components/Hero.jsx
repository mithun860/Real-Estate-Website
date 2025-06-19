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
      <div className="relative z-10 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-wide mb-2"
          style={{
            fontFamily: "'Oswald', sans-serif",
            color: "#0284c7",
          }}
        >
          THREE LEAF
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-2xl sm:text-4xl font-semibold uppercase tracking-wide"
          style={{
            fontFamily: "'Oswald', sans-serif",
            color: "#0284c7",
          }}
        >
          GREEN SPACE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif", color: "#f1f5f9" }}
        >
          A villa that makes every day<br />
          <span className="text-[#e3b07b]">A picnic in nature</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-14 flex flex-wrap justify-center gap-6 text-sm sm:text-base"
          style={{ fontFamily: "'Montserrat', sans-serif", color: "#f1f5f9" }}
        >
          {[
            "52 Acres Gated Community",
            "Premium Farm Plots",
            "Luxury Amenities",
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#030925]/60 rounded-full"></div>
              <span>{feature}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
