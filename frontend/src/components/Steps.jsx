import React from 'react';
import { steps } from '../assets/stepsdata';
import { ArrowRight, ChevronRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import brochure from '../assets/three-leaf-brochure.pdf';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 15,
    },
  },
};

function Step({ icon: Icon, title, description }) {
  return (
    <motion.div variants={itemVariants} className="relative flex flex-col items-center">
      <div className="w-20 h-20 bg-gradient-to-br from-[#f4f7f5] to-[#f7f3f3] rounded-2xl flex items-center justify-center mb-5 shadow-md relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#066b70] to-[#066b70] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Icon className="h-10 w-10 text-[#066b70] group-hover:text-[#F9B113] relative z-10 transition-colors duration-300" />
      </div>
      <h3
        className="text-xl font-bold mb-3"
        style={{ fontFamily: "'Queensides', serif", color: '#1f2937' }}
      >
        {title}
      </h3>
      <p
        className="max-w-xs text-center leading-relaxed"
        style={{ fontFamily: "'Montserrat', sans-serif", color: '#374151' }}
      >
        {description}
      </p>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="mt-4 p-2 rounded-full cursor-pointer transition-colors"
        style={{ backgroundColor: '#ecf1ea' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d3dfd2')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ecf1ea')}
      >
        <ChevronRight className="h-5 w-5" style={{ color: '#066b70' }} />
      </motion.div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const downloadBrochure = () => {
    const link = document.createElement('a');
    link.href = brochure;
    link.download = 'Three-Leaf-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative overflow-hidden py-28" style={{ backgroundColor: '#e3b070' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span
            className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide uppercase"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              backgroundColor: '#ecf1ea',
              color: '#066b70',
              display: 'inline-block',
            }}
          >
            Simple Process
          </span>
          <h2
            className="text-4xl font-bold mt-4 mb-4"
            style={{ fontFamily: "'Queensides', serif", color: '#1f2937' }}
          >
            How It Works
          </h2>
          <div
            className="w-24 h-1 mx-auto mb-6 rounded-full"
            style={{ backgroundColor: '#066b70' }}
          />
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif", color: '#374151' }}
          >
            Finding your perfect property is easy with our simple three-step process
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16 relative"
        >
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-[#066b70]" />
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <Step {...step} />
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute"
                  style={{
                    left: `${(index + 0.7) * (100 / 3) + 8}%`,
                    top: '9%',
                  }}
                >
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{
                      duration: 1.5,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  >
                    <ArrowRight className="h-8 w-8" style={{ color: '#066b70' }} />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4 mt-16"
        >
          <motion.button
            onClick={downloadBrochure}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg hover:shadow-lg transition-all"
            style={{
              backgroundColor: '#066b70',
              boxShadow: '0 10px 20px rgba(6, 107, 112, 0.3)',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Download Brochure
            <Download className="ml-2 h-5 w-5" />
          </motion.button>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 border-2 font-medium rounded-lg hover:bg-green-50 transition-all"
            style={{
              borderColor: '#066b70',
              color: '#066b70',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Schedule a Visit
            <ArrowRight className="ml-2 h-5 w-5" style={{ color: '#066b70' }} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
