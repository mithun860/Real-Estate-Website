import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign,IndianRupee, BedDouble, Bath, Maximize } from 'lucide-react';

const PropertyCard = ({ property, onViewDetails, viewType }) => {
  const isGrid = viewType === 'grid';
  const navigate = useNavigate();


  const handleViewDetails = () => {
    navigate(`/properties/single/${property._id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer ${
        isGrid ? '' : 'flex'
      }`}
      onClick={handleViewDetails}
    >
      <motion.div 
        className={`relative ${isGrid ? 'h-64' : 'w-96'}`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 left-4"
        >
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {property.type}
          </span>
        </motion.div>
      </motion.div>
      
      <div className={`p-6 ${isGrid ? '' : 'flex-1'}`}>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {property.location}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{property.title}</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-blue-600 font-semibold text-xl">
            <IndianRupee className="h-5 w-5 mr-1" />
            {property.price}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center">
            <BedDouble className="w-4 h-4 mr-1" />
            {property.beds} Beds
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {property.baths} Baths
          </div>
          <div className="flex items-center">
            <Maximize className="w-4 h-4 mr-1" />
            {property.sqft} sqft
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;