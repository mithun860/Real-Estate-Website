import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-[40vh] flex flex-col items-center justify-center mt-24 mx-6 rounded-xl overflow-hidden font-[Montserrat]">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#066b70] via-teal-600 to-[#e3b070]"
        animate={{
          background: [
            'linear-gradient(to bottom right, #066b70, #14b8a6, #e3b070)',
            'linear-gradient(to bottom right, #14b8a6, #e3b070, #066b70)',
            'linear-gradient(to bottom right, #e3b070, #066b70, #14b8a6)',
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content */}
      <motion.div className="relative text-center text-white px-4 max-w-xl z-10">
        <motion.h1
          className="text-2xl sm:text-3xl font-bold font-[Oswald]"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Find Your <span className="text-yellow-300">Ideal Plot</span>
        </motion.h1>
      </motion.div>
    </div>
  );
}
