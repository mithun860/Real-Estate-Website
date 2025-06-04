import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

import image1 from '../assets/three-leaf-1.jpg';
import image2 from '../assets/three-leaf-2.jpg';
import image3 from '../assets/three-leaf-3.jpg';
import image4 from '../assets/three-leaf-4.jpg';
import brochure from '../assets/three-leaf-brochure.pdf';

const ThreeLeafShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const slides = [
    {
      image: image1,
      title: "52 Acres of Serenity",
      description: "Three Leaf offers expansive 52 acres of meticulously planned gated community farmhouse plots, blending modern amenities with natural beauty.",
      features: [
        "Gated community with 24/7 security",
        "Premium farmhouse plots",
        "Lush green surroundings"
      ]
    },
    {
      image: image2,
      title: "Sustainable Living",
      description: "Our eco-friendly design promotes sustainable living with rainwater harvesting, solar energy options, and organic farming spaces.",
      features: [
        "Rainwater harvesting system",
        "Solar energy compatible",
        "Organic farming zones"
      ]
    },
    {
      image: image3,
      title: "Modern Amenities",
      description: "Enjoy premium amenities including clubhouse, swimming pool, walking trails, and community spaces designed for your comfort.",
      features: [
        "Clubhouse with modern facilities",
        "Swimming pool",
        "Jogging and walking trails"
      ]
    },
    {
      image: image4,
      title: "Strategic Location",
      description: "Disconnect to reconnect — Three Leaf invites you to slow down, breathe deeper, and live naturally.",
      features: [
        "Nestled amidst lush greenery",
        "Proximity to major highways",
        "Peaceful natural surroundings"
      ]
    }
  ];

  useEffect(() => {
    const interval = isAutoPlaying ? setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000) : null;
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const downloadBrochure = () => {
    const link = document.createElement('a');
    link.href = brochure;
    link.download = 'Three-Leaf-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-gray-100 font-montserrat">
      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-[#066b70] w-6' : 'bg-white bg-opacity-50'}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-full w-full"
        >
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col h-full">
            <div className="bg-white p-6 flex-1 flex flex-col justify-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-lg mx-auto"
              >
                <h2 className="text-3xl font-bold mb-2 font-oswald" style={{ color: '#066b70' }}>Three Leaf</h2>
                <h3 className="text-xl font-semibold mb-4 font-oswald" style={{ color: '#e3b07b' }}>
                  {slides[currentSlide].title}
                </h3>
                <p className="mb-4 text-base text-gray-600" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {slides[currentSlide].description}
                </p>
                <ul className="mb-6 space-y-2">
                  {slides[currentSlide].features.map((feature, index) => (
                    <li key={index} className="flex items-start text-base text-gray-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      <svg
                        className="h-5 w-5 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#e3b07b"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-6 py-3 bg-[#066b70] text-white font-medium rounded-lg hover:bg-[#055a5f] transition-colors flex items-center justify-center"
                  >
                    Enquire Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadBrochure}
                    className="px-6 py-3 border-2 border-[#066b70] text-[#066b70] font-medium rounded-lg hover:bg-[#066b70]/10 transition-colors flex items-center justify-center"
                  >
                    Download Brochure
                    <Download className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="h-64 w-full relative">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex h-full">
            <div className="w-1/2 h-full relative overflow-hidden">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            </div>

            <div className="w-1/2 h-full bg-white p-12 lg:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-lg mx-auto"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-oswald" style={{ color: '#066b70' }}>Three Leaf</h2>
                <h3 className="text-3xl font-semibold mb-6 font-oswald" style={{ color: '#e3b07b' }}>
                  {slides[currentSlide].title}
                </h3>
                <p className="mb-6 text-lg text-gray-600" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {slides[currentSlide].description}
                </p>
                <ul className="mb-8 space-y-2">
                  {slides[currentSlide].features.map((feature, index) => (
                    <li key={index} className="flex items-start text-base text-gray-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      <svg
                        className="h-5 w-5 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#e3b07b"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-8 py-3 bg-[#066b70] text-white font-medium rounded-lg hover:bg-[#055a5f] transition-colors flex items-center"
                  >
                    Enquire Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadBrochure}
                    className="px-8 py-3 border-2 border-[#066b70] text-[#066b70] font-medium rounded-lg hover:bg-[#066b70]/10 transition-colors flex items-center"
                  >
                    Download Brochure
                    <Download className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};

export default ThreeLeafShowcase;
