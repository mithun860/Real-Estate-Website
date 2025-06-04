import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 py-24 text-center overflow-hidden bg-[#f0fdfa] font-montserrat">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
          src="/three-leaf-video.mov" // ✅ Now coming from public folder
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[#e3b07b] text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-wide"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Three Leaf Farm Plots
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          A 52-acre gated community farmhouse plots project by{" "}
          <span className="text-[#e3b07b] font-semibold">
            SPLR Developers
          </span>
          .
          <br className="hidden sm:block" />
          Experience the perfect blend of nature and luxury starting at just{" "}
          <span className="font-semibold">
            35 Lacs
          </span>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-14 flex flex-wrap justify-center gap-6 text-slate-200 text-sm sm:text-base"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {[
            "52 Acres Gated Community",
            "Premium Farm Plots",
            "Luxury Amenities",
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#066b70] rounded-full"></div>
              <span>{feature}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;