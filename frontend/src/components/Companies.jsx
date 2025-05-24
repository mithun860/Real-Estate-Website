import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const quotes = [
  { text: "A house is made of walls and beams; a home is built with love and dreams.", author: "Ralph Waldo Emerson" },
  { text: "The ache for home lives in all of us, the safe place where we can go as we are.", author: "Maya Angelou" },
  { text: "Home is not a place... it's a feeling.", author: "Cecelia Ahern" },
];

const MinimalQuoteSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-green-50/30 py-8 px-4 rounded-lg">
      <div className="max-w-2xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="flex items-start"
          >
            <Quote className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-gray-800 font-medium leading-snug">"{quotes[index].text}"</p>
              <p className="text-gray-600 text-sm mt-1">— {quotes[index].author}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MinimalQuoteSlider;