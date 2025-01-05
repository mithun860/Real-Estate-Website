import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-[60vh] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative text-center text-white px-4 max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-6">About BuildEstate</h1>
        <p className="text-xl leading-relaxed">
          At BuildEstate, we believe in simplifying the property rental and buying process. 
          Our mission is to connect people with their dream homes effortlessly.
        </p>
      </motion.div>
    </div>
  );
}