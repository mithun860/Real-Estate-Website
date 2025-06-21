import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: "A house is made of walls and beams; a home is built with love and dreams.",
    author: "Ralph Waldo Emerson",
  },
  {
    text: "The ache for home lives in all of us, the safe place where we can go as we are.",
    author: "Maya Angelou",
  },
  {
    text: "Home is not a place... it's a feeling.",
    author: "Cecelia Ahern",
  },
];

const MinimalQuoteSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#f5f5f4]/60 py-10 px-6 rounded-2xl shadow-sm">
      <div className="max-w-2xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex items-start"
          >
            <Quote className="w-6 h-6 mt-1 mr-4 flex-shrink-0 text-[#066b70]" />
            <div>
              <p
                className="text-lg leading-relaxed mb-2"
                style={{
                  fontFamily: "'Queensides', serif",
                  color: '#1f2937',
                }}
              >
                “{quotes[index].text}”
              </p>
              <p
                className="text-sm"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: '#6b7280',
                }}
              >
                — {quotes[index].author}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MinimalQuoteSlider;
