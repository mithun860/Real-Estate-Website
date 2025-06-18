import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

import brochure from '../assets/three-leaf-brochure.pdf';

// Preload images
const preloadImages = () => {
  const images = [
    'images/three-leaf-1.jpg',
    'images/three-leaf-2.jpg',
    'images/three-leaf-3.jpg',
    'images/three-leaf-4.jpg'
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

preloadImages();

const ThreeLeafShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const textContainerRef = useRef(null);
  const navigate = useNavigate();

  const slides = [
    {
      image: 'images/three-leaf-1.jpg',
      title: "PROJECT AMENITIES",
      description: "Three Leaf offers a unique blend of natural beauty and thoughtfully designed amenities that enhance your living experience.",
      features: [
        "Surrounded by Green Hillocks and Forts",
        "River Front",
        "Forest and Lake View Plots"
      ],
      bgGradient: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)"
    },
    {
      image: 'images/three-leaf-2.jpg',
      title: "SUSTAINABLE LIVING",
      description: "Our eco-friendly design promotes harmony with nature while providing all the comforts of modern living.",
      features: [
        "Indigenous Tree Plantation",
        "Drip Irrigation System",
        "Natural Water Pool"
      ],
      bgGradient: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)"
    },
    {
      image: 'images/three-leaf-3.jpg',
      title: "LUXURY AMENITIES",
      description: "Enjoy premium amenities designed for your comfort and recreation in the heart of nature.",
      features: [
        "Club House & Resort",
        "Swimming Pool & Boating",
        "Riverside Walkway & Gazebo"
      ],
      bgGradient: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)"
    },
    {
      image: 'images/three-leaf-4.jpg',
      title: "STRATEGIC LOCATION",
      description: "Perfectly positioned to enjoy both tranquility and convenience with easy access to key destinations.",
      features: [
        "Trimbak Mandir - 10 Minutes",
        "Nashik - 40 Minutes",
        "Pahine Waterfall - 10 Minutes"
      ],
      bgGradient: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)"
    }
  ];

  useEffect(() => {
    const handleImageLoad = (src) => {
      setLoadedImages(prev => ({ ...prev, [src]: true }));
    };

    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => handleImageLoad(slide.image);
    });
  }, []);

  useEffect(() => {
    const interval = isAutoPlaying ? setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000) : null;
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSlide]);

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
      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-[#066b70] w-6' : 'bg-white bg-opacity-50 hover:bg-opacity-80'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-full w-full"
        >
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col h-full">
            <div className="bg-white px-5 pt-6 pb-5 flex flex-col h-[55%]">
              <div className="mb-4">
                <h2 className="text-2xl font-bold font-oswald" style={{ color: '#066b70' }}>THREE LEAF</h2>
                <h3 className="text-lg font-semibold font-oswald uppercase mt-1" style={{ color: '#e3b07b' }}>
                  {slides[currentSlide].title}
                </h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {slides[currentSlide].description}
              </p>
              
              <ul className="space-y-2.5 flex-1">
                {slides[currentSlide].features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start text-sm text-gray-700"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <svg
                      className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0"
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
                  </motion.li>
                ))}
              </ul>
              
              <div className="flex flex-col gap-2.5 mt-4">
                <motion.button
                  onClick={() => navigate('/contact')}
                  className="px-5 py-2.5 bg-[#066b70] text-white font-medium rounded-lg hover:bg-[#055a5f] transition-colors flex items-center justify-center text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enquire Now
                  <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </motion.button>
                <motion.button
                  onClick={downloadBrochure}
                  className="px-5 py-2.5 border border-[#066b70] text-[#066b70] font-medium rounded-lg hover:bg-[#066b70]/10 transition-colors flex items-center justify-center text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download Brochure
                  <Download className="ml-2 w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>

            <div className="h-[45%] w-full relative">
              {loadedImages[slides[currentSlide].image] ? (
                <motion.img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex h-full">
            <div className="w-[70%] h-full relative overflow-hidden">
              {loadedImages[slides[currentSlide].image] ? (
                <motion.img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              )}
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: slides[currentSlide].bgGradient,
                  transition: 'background 0.8s ease'
                }}
              />
            </div>

            <div className="w-[30%] h-full bg-white flex flex-col">
              <div className="flex-1 overflow-y-auto py-7 px-8" ref={textContainerRef}>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="h-full flex flex-col"
                >
                  <div className="mb-5">
                    <motion.h2 
                      className="text-3xl font-bold font-oswald uppercase" 
                      style={{ color: '#066b70' }}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      THREE LEAF
                    </motion.h2>
                    <motion.h3 
                      className="text-xl font-semibold font-oswald uppercase mt-2" 
                      style={{ color: '#e3b07b' }}
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      {slides[currentSlide].title}
                    </motion.h3>
                  </div>
                  
                  <motion.p 
                    className="text-gray-600 mb-6 text-[15px] leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                  
                  <motion.ul 
                    className="space-y-3 flex-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {slides[currentSlide].features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start text-gray-700 text-[15px]"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 + index * 0.1, type: 'spring', stiffness: 100 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1, type: 'spring', stiffness: 300 }}
                        >
                          <svg
                            className="h-4 w-4 mr-2.5 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#e3b07b"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </div>
              
              <div className="py-5 px-8 border-t border-gray-100">
                <motion.div
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <motion.button
                    onClick={() => navigate('/contact')}
                    className="px-5 py-2.5 bg-[#066b70] text-white font-medium rounded-lg hover:bg-[#055a5f] transition-colors flex items-center justify-center text-sm"
                    whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(6, 107, 112, 0.2)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enquire Now
                    <ArrowRight className="ml-2 w-3.5 h-3.5" />
                  </motion.button>
                  <motion.button
                    onClick={downloadBrochure}
                    className="px-5 py-2.5 border border-[#066b70] text-[#066b70] font-medium rounded-lg hover:bg-[#066b70]/10 transition-colors flex items-center justify-center text-sm"
                    whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(6, 107, 112, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Brochure
                    <Download className="ml-2 w-3.5 h-3.5" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows Navigation */}
      <motion.button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      <motion.button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </section>
  );
};

export default ThreeLeafShowcase;