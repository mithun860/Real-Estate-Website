import React from 'react';
import { steps } from '../assets/stepsdata';
import { ArrowRight, ChevronRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import brochure from '../assets/three-leaf-brochure.pdf';
import howItWorksBg from '../assets/how-it-works-bg.JPG'; // Background image import

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15
    }
  }
};

function Step({ icon: Icon, title, description }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="relative flex flex-col items-center"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-orange-50 rounded-2xl flex items-center justify-center mb-5 shadow-md relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Icon className="h-10 w-10 text-green-600 group-hover:text-white relative z-10 transition-colors duration-300" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 max-w-xs text-center leading-relaxed">{description}</p>
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="mt-4 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors cursor-pointer"
      >
        <ChevronRight className="h-5 w-5 text-green-600" />
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
    <section
      className="relative overflow-hidden py-28 bg-fixed bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${howItWorksBg})` }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide uppercase">Simple Process</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-4">How It Works</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-orange-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Finding your perfect property is easy with our simple three-step process
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16 relative"
        >
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-gray-100">
            <div className="absolute left-0 right-0 top-0 h-full">
              <div className="h-full w-full bg-gradient-to-r from-green-500 via-orange-500 to-green-500 bg-size-200 animate-bg-pos-x"></div>
            </div>
          </div>

          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <Step
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute" 
                  style={{ left: `${(index + 0.7) * (100 / 3) + 8}%`, top: '9%' }}>
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <ArrowRight className="h-8 w-8 text-green-500" />
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
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-orange-600 
              text-white font-medium rounded-lg hover:shadow-lg transition-all shadow-green-500/30"
          >
            Download Brochure
            <Download className="ml-2 h-5 w-5" />
          </motion.button>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 border-2 border-green-600
              text-green-600 font-medium rounded-lg hover:bg-green-50 transition-all"
          >
            Schedule a Visit
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
