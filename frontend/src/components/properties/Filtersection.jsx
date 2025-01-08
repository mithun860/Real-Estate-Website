import React, { useState } from 'react';
import { Home, DollarSign, BedDouble, Bath } from 'lucide-react';

const propertyTypes = ['House', 'Apartment', 'Villa', 'Office'];
const availabilityTypes = ['Rent', 'Buy', 'Lease'];
const amenities = ['Pool', 'Garden', 'Parking', 'Balcony'];

const FilterSection = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: 0,
    bedrooms: '0',  // Default to 0 for bedrooms
    bathrooms: '0',  // Default to 0 for bathrooms
    selectedAmenities: [],
    availability: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFilters((prev) => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter((item) => item !== amenity)
        : [...prev.selectedAmenities, amenity]
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      {/* Property Type */}
      <div>
        <label className="flex items-center text-gray-700 font-medium mb-2">
          <Home className="w-4 h-4 mr-2" />
          Property Type
        </label>
        <select
          name="propertyType"
          value={filters.propertyType}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="">Select type</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type.toLowerCase()}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="flex items-center text-gray-700 font-medium mb-2">
          <DollarSign className="w-4 h-4 mr-2" />
          Price Range
        </label>
        <div className="space-y-2">
          <input
            type="range"
            name="priceRange"
            min="0"
            max="1000000"
            step="10000"
            value={filters.priceRange}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>${Number(filters.priceRange).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <BedDouble className="w-4 h-4 mr-2" />
            Bedrooms
          </label>
          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i}>
                {i} {i === 4 ? '+' : ''}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <Bath className="w-4 h-4 mr-2" />
            Bathrooms
          </label>
          <select
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i}>
                {i} {i === 4 ? '+' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="text-gray-700 font-medium mb-2 block">Amenities</label>
        <div className="grid grid-cols-2 gap-2">
          {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-600">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="text-gray-700 font-medium mb-2 block">Availability</label>
        <div className="flex space-x-4">
          {availabilityTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="availability"
                value={type.toLowerCase()}
                checked={filters.availability === type.toLowerCase()}
                onChange={handleChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-600">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSection;
