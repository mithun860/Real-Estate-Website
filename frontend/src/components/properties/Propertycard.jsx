import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  IndianRupee,
  Maximize,
  Share2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import PropTypes from 'prop-types';

const PropertyCard = ({ property, viewType }) => {
  const isGrid = viewType === 'grid';
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleNavigateToDetails = () => {
    navigate(`/properties/single/${property._id}`);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareURL = `${window.location.origin}/properties/single/${property._id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: shareURL,
        });
      } else {
        await navigator.clipboard.writeText(shareURL);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const images = property?.images?.length > 0 ? property.images : ['/fallback.jpg'];

  const handleImageNavigation = (e, dir) => {
    e.stopPropagation();
    const total = images.length;
    setCurrentImageIndex(prev =>
      dir === 'next' ? (prev + 1) % total : (prev - 1 + total) % total
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 ${
        isGrid ? 'flex flex-col' : 'flex flex-row gap-6'
      }`}
      onClick={handleNavigateToDetails}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* 🖼 Image Section */}
      <div className={`relative ${isGrid ? 'h-64' : 'w-96'}`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={property.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover rounded-t-xl rounded-b-none"
          />
        </AnimatePresence>

        {showControls && images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={(e) => handleImageNavigation(e, 'prev')}
              className="p-1 bg-white/80 rounded-full backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={(e) => handleImageNavigation(e, 'next')}
              className="p-1 bg-white/80 rounded-full backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </motion.button>
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === currentImageIndex ? 'bg-white w-3' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-[#425036] text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.type}
          </span>
          <span className="bg-[#e3b07b] text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.availability}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleShare}
            className="p-2 bg-white/90 rounded-full shadow hover:bg-[#f0fdf4]"
          >
            <Share2 className="w-4 h-4 text-gray-800" />
          </motion.button>
        </div>
      </div>

      {/* 🏡 Content Section */}
      <div className={`flex-1 p-6 ${isGrid ? '' : 'flex flex-col justify-between'}`}>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-[#425036]" />
              {property.location}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{Math.floor(Math.random() * 100) + 20}</span>
            </div>
          </div>

          <h3
            className="text-xl font-semibold text-gray-900 line-clamp-2 transition-colors group-hover:text-[#425036]"
            style={{ fontFamily: "'Queensides', serif" }}
          >
            {property.title}
          </h3>

          <div>
            <p className="text-sm text-gray-500 mb-1">Price</p>
            <div className="flex items-center gap-1">
              <IndianRupee className="w-5 h-5 text-[#e3b07b]" />
              <span className="text-2xl font-bold text-[#425036]">
                {Number(property.price).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* 📐 Area Section Only */}
        <div className="mt-6">
          <div className="flex flex-col items-center bg-[#f0fdfa] p-3 rounded-md">
            <Maximize className="w-5 h-5 text-[#425036]" />
            <span className="text-sm font-medium text-gray-600">{property.sqft} sqft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
  viewType: PropTypes.string.isRequired,
};

export default PropertyCard;
