import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-[60vh] flex items-center justify-center my-6 mx-6 rounded-2xl overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-500"
          animate={{
            background: [
              'linear-gradient(to bottom right, rgba(5, 150, 105, 1), rgba(20, 184, 166, 0.9), rgba(6, 182, 212, 0.8))',
              'linear-gradient(to bottom right, rgba(20, 184, 166, 0.9), rgba(6, 182, 212, 0.8), rgba(5, 150, 105, 1))',
              'linear-gradient(to bottom right, rgba(6, 182, 212, 0.8), rgba(5, 150, 105, 1), rgba(20, 184, 166, 0.9))'
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Animated shapes - now with plot-like elements */}
        <div className="absolute inset-0 opacity-20">
          {/* Plot boundary animation */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-white/50"
            animate={{ 
              x: [0, 30, 0, -30, 0],
              y: [0, -30, 0, 30, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Plot grid animation */}
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-48 h-48 grid grid-cols-2 grid-rows-2 gap-1"
            animate={{ 
              x: [0, -40, 0, 40, 0],
              y: [0, 40, 0, -40, 0],
              scale: [1, 0.9, 1, 1.1, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="bg-white/30"></div>
            <div className="bg-white/20"></div>
            <div className="bg-white/20"></div>
            <div className="bg-white/30"></div>
          </motion.div>
          
          {/* Plot marker pin */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-8 h-8 bg-red-500 rounded-full shadow-lg"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Blueprint pattern overlay */}
        <div className="absolute inset-0 opacity-15 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zMCAxMGMtMTEuMDQ2IDAtMjAgOC45NTQtMjAgMjBzOC45NTQgMjAgMjAgMjAgMjAtOC45NTQgMjAtMjAtOC45NTQtMjAtMjAtMjB6bTAgMTBjNS41MjMgMCAxMCA0LjQ3NyAxMCAxMHMtNC40NzcgMTAtMTAgMTAtMTAtNC40NzctMTAtMTAgNC40NzctMTAgMTAtMTB6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative text-center text-white px-4 max-w-4xl mx-auto z-10"
      >
        <motion.h1
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg"
        >
          Discover Your <span className="text-yellow-300">Perfect Plot</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto backdrop-blur-sm bg-white/10 rounded-lg p-4"
        >
          Ready to invest in premium land? Our expert team specializes in helping you find the ideal plot for your dream project. Get personalized guidance today.
        </motion.p>
        
        {/* Animated CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Explore Available Plots
          </motion.button>
        </motion.div>
        
        {/* Decorative plot boundary line */}
        <motion.div 
          className="w-32 h-2 border-t-2 border-b-2 border-white/50 mx-auto mt-12"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </motion.div>
      
      {/* Floating plot indicators */}
      <motion.div 
        className="absolute bottom-8 left-8 text-white/70 text-sm flex items-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
        Premium Residential Plots
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 right-8 text-white/70 text-sm flex items-center"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
      >
        <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
        Commercial Plot Opportunities
      </motion.div>
    </div>
  );
}