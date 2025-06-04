import React from 'react';
import { motion } from 'framer-motion';
import { Home, TreePalm, Umbrella, Shield, Sparkles, Infinity, Download } from 'lucide-react';
import ThreeLeafBrochure from '../assets/Three_Leaf_Brochure.pdf';
import backgroundImage from '../assets/how-it-works-bg.JPG';

const customGreen = "#066b70";

const LifestyleShowcase = () => {
  const features = [
    {
      icon: <Home className="w-6 h-6" style={{ color: customGreen }} />,
      title: "Premium Residences",
      description: "Thoughtfully designed homes with luxury finishes and smart technology"
    },
    {
      icon: <TreePalm className="w-6 h-6" style={{ color: customGreen }} />,
      title: "Lush Green Spaces",
      description: "52 acres of beautifully landscaped gardens and walking trails"
    },
    {
      icon: <Umbrella className="w-6 h-6" style={{ color: customGreen }} />,
      title: "Resort-Style Amenities",
      description: "Clubhouse, pools, and recreational facilities for all ages"
    },
    {
      icon: <Shield className="w-6 h-6" style={{ color: customGreen }} />,
      title: "24/7 Security",
      description: "Gated community with advanced surveillance and patrols"
    },
    {
      icon: <Sparkles className="w-6 h-6" style={{ color: customGreen }} />,
      title: "Exclusive Lifestyle",
      description: "Curated events and community activities year-round"
    },
    {
      icon: <Infinity className="w-6 h-6" style={{ color: customGreen }} />,
      title: "Sustainable Living",
      description: "Eco-friendly design with renewable energy solutions"
    }
  ];

  const handleDownloadBrochure = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = ThreeLeafBrochure;
    link.download = 'Three_Leaf_Developers_Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative py-16 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />

      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

      <div className="relative max-w-4xl mx-auto px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Experience Elevated Community Living
          </motion.h2>
          
          <motion.p
            className="text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Discover a harmonious blend of luxury, nature, and community in our meticulously planned 52-acre sanctuary
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4 group bg-white bg-opacity-90 p-4 rounded-lg backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100
                  }
                }
              }}
              whileHover={{ x: 5 }}
            >
              <div className="flex-shrink-0 mt-1">
                {feature.icon}
              </div>
              <div>
                <h3 
                  className="text-lg font-medium text-gray-900 group-hover:text-[${customGreen}] transition-colors"
                  style={{ fontFamily: "'Oswald', sans-serif", color: undefined /* keep default */ }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-gray-700"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <motion.button
            onClick={handleDownloadBrochure}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition-colors duration-200 shadow-sm"
            style={{ backgroundColor: customGreen }}
            whileHover={{ scale: 1.05, backgroundColor: '#055658' }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Brochure
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default LifestyleShowcase;
