import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { features } from "../assets/featuredata";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 12
    }
  },
};

const Features = () => {
  return (
    <section
      className="py-24 overflow-hidden"
      style={{ backgroundColor: "#066b70" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Our Strengths
          </span>
          <h2
            className="text-4xl font-bold text-white mt-4 mb-4"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Why Choose Us
          </h2>
          <div className="w-24 h-1 mx-auto mb-6 rounded-full" style={{ backgroundColor: "#e3b070" }}></div>
          <p
            className="text-xl text-green-200 max-w-2xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            We're committed to providing exceptional service and finding the
            perfect home for you with our innovative approach
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-50 transition-all duration-300"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-orange-50 rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:rotate-6">
                <feature.icon className="h-8 w-8 text-green-600" />
              </div>
              
              <h3
                className="text-xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {feature.title}
              </h3>
              
              <p
                className="text-gray-600 leading-relaxed mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {feature.description}
              </p>
              
              <motion.a 
                href="#" 
                className="inline-flex items-center text-green-600 text-sm font-medium hover:text-green-800 transition-colors"
                whileHover={{ x: 5 }}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;