import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import brochure from '../assets/three-leaf-brochure.pdf';

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
      bgGradient: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3), rgba(0,0,0,0))"
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
      bgGradient: "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2), rgba(0,0,0,0))"
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
      bgGradient: "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.1), rgba(0,0,0,0))"
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
      bgGradient: "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0))"
    }
  ];

  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [slide.image]: true }));
      };
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

  const downloadBrochure = () => {
    const link = document.createElement('a');
    link.href = brochure;
    link.download = 'Three-Leaf-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative h-screen overflow-hidden font-[Montserrat]">
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-[#425036] w-6' : 'bg-white bg-opacity-50'
            }`}
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
          <div className="flex flex-col md:hidden h-full">
            <div className="flex-grow overflow-auto bg-white px-4 py-6">
              <h2 className="text-xl font-[Queensides] font-bold text-[#425036] uppercase">Three Leaf</h2>
              <h3 className="text-base font-[Queensides] font-semibold uppercase mt-1 text-[#F9B113]">
                {slides[currentSlide].title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{slides[currentSlide].description}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {slides[currentSlide].features.map((f, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#F9B113] mr-2">✓</span>{f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-4 py-2 text-sm bg-[#425036] text-white rounded-md flex items-center justify-center"
                >
                  Enquire Now <ArrowRight className="ml-2 w-4 h-4" />
                </button>
                <button
                  onClick={downloadBrochure}
                  className="px-4 py-2 text-sm border border-[#425036] text-[#425036] rounded-md flex items-center justify-center"
                >
                  Download Brochure <Download className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="w-full h-[45%] relative">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex h-full">
            <div className="w-[70%] h-full relative overflow-hidden">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: slides[currentSlide].bgGradient }} />
            </div>
            <div className="w-[30%] h-full bg-white flex flex-col justify-between px-4">
              <div ref={textContainerRef} className="overflow-auto pt-10 pr-2">
                <h2 className="text-2xl font-[Queensides] font-bold text-[#425036] uppercase">Three Leaf</h2>
                <h3 className="text-lg font-[Queensides] font-semibold uppercase mt-2 text-[#F9B113]">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-gray-600 text-sm mt-3">{slides[currentSlide].description}</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {slides[currentSlide].features.map((f, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#F9B113] mr-2">✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border-t border-gray-100 flex flex-col gap-3">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-4 py-2 bg-[#425036] text-white rounded-md flex items-center justify-center text-sm"
                >
                  Enquire Now <ArrowRight className="ml-2 w-4 h-4" />
                </button>
                <button
                  onClick={downloadBrochure}
                  className="px-4 py-2 border border-[#425036] text-[#425036] rounded-md flex items-center justify-center text-sm"
                >
                  Download Brochure <Download className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full">
        ◀
      </button>
      <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full">
        ▶
      </button>
    </section>
  );
};

export default ThreeLeafShowcase;
