import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Building, MapPin, Maximize, Tag, Plus } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 flex flex-col h-full"
    >
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-0 right-0 mt-4 mr-4"
        >
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-700 text-xs font-medium rounded-full shadow-sm">
            {property.property_type}
          </span>
        </motion.div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-white mb-1 truncate" title={property.building_name}>
            {property.building_name}
          </h3>
          <div className="flex items-center text-blue-100">
            <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <p className="text-sm truncate" title={property.location_address}>
              {property.location_address}
            </p>
          </div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Price and area information */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Price</p>
            <p className="text-xl font-bold text-gray-900">{property.price}</p>
          </div>
          
          {property.area_sqft && (
            <div className="flex flex-col items-end">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Area</p>
              <div className="flex items-center">
                <Maximize className="w-3.5 h-3.5 text-gray-500 mr-1" />
                <p className="font-medium text-gray-800">{property.area_sqft}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Property description */}
        <div className="mb-5 flex-1">
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Building className="w-4 h-4 text-blue-500 mr-1.5" />
            Overview
          </h4>
          <p className="text-gray-600 text-sm line-clamp-3">
            {property.description}
          </p>
        </div>
        
        {/* Amenities section */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Tag className="w-4 h-4 text-blue-500 mr-1.5" />
              Amenities
            </h4>
            <div className="flex flex-wrap gap-2">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <motion.span 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full border border-blue-100"
                >
                  {amenity}
                </motion.span>
              ))}
              {property.amenities.length > 3 && (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded-full flex items-center border border-gray-100"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {property.amenities.length - 3} more
                </motion.span>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer / call to action */}
      <div className="px-5 pb-5">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg 
                    hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm mt-3
                    flex items-center justify-center"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    building_name: PropTypes.string,
    location_address: PropTypes.string,
    price: PropTypes.string,
    property_type: PropTypes.string,
    area_sqft: PropTypes.string,
    description: PropTypes.string,
    amenities: PropTypes.arrayOf(PropTypes.string)
  })
};

export default PropertyCard;