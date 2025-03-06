import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const Header = ({ title = "AI Property Assistant" }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/ai-property-hub" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Brain className="w-7 h-7" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              {title}
            </h1>
          </motion.div>
        </Link>
        
        
      </div>
    </motion.header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;