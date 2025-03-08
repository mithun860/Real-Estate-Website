import { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDown, ChevronUp, MoveRight, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AnalysisDisplay = ({ analysis }) => {
  const [expanded, setExpanded] = useState(true);
  
  if (!analysis) {
    return null;
  }

  // Helper function to convert markdown-style text to styled elements
  const formatAnalysisText = (text) => {
    // Split the text by new lines to process each line
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Process headings (lines starting with # or ##)
      if (line.startsWith('## ')) {
        return (
          <motion.h3 
            key={index} 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="text-lg sm:text-lg font-semibold text-gray-800 mt-4 sm:mt-5 mb-2 sm:mb-3 flex flex-wrap items-center"
          >
            <MoveRight className="w-4 h-4 mr-1 sm:mr-2 flex-shrink-0 text-blue-600" />
            <span className="break-words">{line.replace('## ', '')}</span>
          </motion.h3>
        );
      } else if (line.startsWith('# ')) {
        return (
          <motion.h2 
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }} 
            className="text-xl font-bold text-gray-800 mt-5 sm:mt-6 mb-2 sm:mb-3 pb-2 border-b border-gray-100 break-words"
          >
            {line.replace('# ', '')}
          </motion.h2>
        );
      // Process list items (lines starting with - or *)
      } else if (line.match(/^[*-] /)) {
        return (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="ml-3 sm:ml-5 mt-1.5 text-gray-700 flex flex-start"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
            <span className="break-words">{line.replace(/^[*-] /, '')}</span>
          </motion.li>
        );
      // Process bold text (text within **)
      } else if (line.includes('**')) {
        // Bold formatting
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <motion.p 
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="my-2.5 text-gray-700 leading-relaxed break-words"
          >
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-gray-900">{part.replace(/\*\*/g, '')}</strong>;
              }
              return part;
            })}
          </motion.p>
        );
      } else if (line.trim() === '') {
        // Handle empty lines
        return <div key={index} className="h-2.5"></div>;
      } else {
        // Regular paragraph text
        return (
          <motion.p 
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="my-2.5 text-gray-700 leading-relaxed break-words"
          >
            {line}
          </motion.p>
        );
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-100 w-full overflow-hidden"
    >
      <div className="flex justify-between items-center mb-3 sm:mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0 text-blue-600" />
          <span className="truncate">Expert Analysis</span>
        </h2>
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="text-gray-500 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-gray-100 flex-shrink-0"
          aria-label={expanded ? "Collapse analysis" : "Expand analysis"}
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="prose prose-sm max-w-none text-gray-700 overflow-hidden text-sm sm:text-base"
          >
            <div className="overflow-x-auto">
              {formatAnalysisText(analysis)}
            </div>
            
            <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 flex items-center text-xs text-gray-500 italic">
              <Info className="w-3 h-3 mr-1.5 flex-shrink-0" />
              <span>Analysis generated by AI based on available data. For informational purposes only.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

AnalysisDisplay.propTypes = {
  analysis: PropTypes.string,
};

export default AnalysisDisplay;