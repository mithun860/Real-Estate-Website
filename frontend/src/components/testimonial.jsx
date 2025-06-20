import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../assets/testimonialdata';

const TestimonialCard = ({ testimonial, index, activeIndex, direction }) => {
  return (
    <motion.div
      key={testimonial.id}
      initial={{ opacity: 0, x: direction === 'right' ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 'right' ? -50 : 50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="w-12 h-12" style={{ color: '#425036' }} />
      </div>
      <p className="italic mb-6 text-lg leading-relaxed relative z-10" style={{ color: '#374151' }}>
        "{testimonial.text}"
      </p>
      <div className="mt-8 flex items-center">
        <div>
          <h3 className="font-bold text-lg" style={{ fontFamily: "'Queensides', serif", color: '#425036' }}>
            {testimonial.name}
          </h3>
          <p className="text-sm flex items-center" style={{ color: '#4b5563' }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 bg-[#425036]" />
            {testimonial.location}
          </p>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4"
                style={{ color: i < testimonial.rating ? '#e3b070' : '#d1d5db' }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`rounded-full ${i === index ? 'w-6 transition-all duration-300' : 'w-2'}`}
            style={{ backgroundColor: i === index ? '#425036' : '#d1d5db', height: '0.5rem' }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setDirection('right');
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrev = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setAutoplay(false);
  };

  const handleNext = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
  };

  return (
    <section className="py-24" style={{ background: 'linear-gradient(to bottom, #f9fafb, #ffffff)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-semibold tracking-wider text-sm uppercase" style={{ fontFamily: "'Montserrat', sans-serif", color: '#425036' }}>
            Testimonials
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4" style={{ fontFamily: "'Queensides', serif", color: '#1f2937' }}>
            What Our Clients Say
          </h2>
          <div className="mx-auto mb-6 rounded-full" style={{ width: '6rem', height: '0.25rem', backgroundColor: '#425036' }} />
          <p className="text-xl max-w-3xl mx-auto" style={{ fontFamily: "'Montserrat', sans-serif", color: '#4B5563' }}>
            Discover why homeowners trust SPLR to find their perfect property
          </p>
        </motion.div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: testimonial.id * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative"
              >
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-12 h-12" style={{ color: '#425036' }} />
                </div>
                <p className="italic mb-6 text-lg leading-relaxed relative z-10" style={{ color: '#374151' }}>
                  "{testimonial.text}"
                </p>
                <div className="mt-8 flex items-center">
                  <div>
                    <h3 className="font-bold text-lg" style={{ fontFamily: "'Queensides', serif", color: '#425036' }}>
                      {testimonial.name}
                    </h3>
                    <p className="text-sm flex items-center" style={{ fontFamily: "'Montserrat', sans-serif", color: '#4b5563' }}>
                      <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 bg-[#425036]" />
                      {testimonial.location}
                    </p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          style={{ color: i < testimonial.rating ? '#e3b070' : '#d1d5db' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden px-4">
            <AnimatePresence mode="wait" initial={false}>
              <TestimonialCard
                testimonial={testimonials[activeIndex]}
                index={activeIndex}
                activeIndex={activeIndex}
                direction={direction}
                key={activeIndex}
              />
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white shadow-md border border-gray-200 text-gray-700 hover:bg-[#425036] hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white shadow-md border border-gray-200 text-gray-700 hover:bg-[#425036] hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center py-3 px-6 rounded-lg font-medium shadow-lg transition-colors"
            style={{
              backgroundColor: '#425036',
              color: '#fff',
              fontFamily: "'Montserrat', sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2c3626')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#425036')}
          >
            Share Your Experience
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
