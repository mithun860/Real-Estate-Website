import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./Searchbar.jsx";
import FilterSection from "./Filtersection.jsx";
import PropertyCard from "./Propertycard.jsx";
import { Grid, List } from "lucide-react";
import { Backendurl } from "../../App.jsx";

const PropertiesPage = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    propertyType: "",
    priceRange: 0,
    bedrooms: "0", // Default to 0 for bedrooms
    bathrooms: "0", // Default to 0 for bathrooms
    selectedAmenities: [],
    availability: "",
    searchQuery: "",
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Backendurl}/api/products/list`);
      console.log("Fetched properties:", response.data.property); // Debugging log
      setProperties(response.data.property);
      setError(null);
    } catch (err) {
      setError("Failed to fetch properties. Please try again later.");
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const filteredProperties = properties.filter((property) => {
    const searchMatch =
      !filters.searchQuery ||
      property.title
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      property.description
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      property.location
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());

    // Debugging: Print out the property and whether it matches search criteria

    const typeMatch = filters.propertyType
      ? property.type.toLowerCase() === filters.propertyType
      : true;
    const priceMatch = filters.priceRange
      ? property.price <= filters.priceRange
      : true;
    const bedroomsMatch = filters.bedrooms
      ? property.beds >= parseInt(filters.bedrooms)
      : true;
    const bathroomsMatch = filters.bathrooms
      ? property.baths >= parseInt(filters.bathrooms)
      : true;
    const availabilityMatch = filters.availability
      ? property.availability.toLowerCase() === filters.availability
      : true;
    const amenitiesMatch =
      filters.selectedAmenities.length > 0
        ? filters.selectedAmenities.every((amenity) =>
            property.amenities.includes(amenity)
          )
        : true;

    const isFiltered =
      searchMatch &&
      typeMatch &&
      priceMatch &&
      bedroomsMatch &&
      bathroomsMatch &&
      availabilityMatch &&
      amenitiesMatch;

    // Debugging: Check if the property passes all filter criteria

    return isFiltered;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600 p-4 rounded-lg bg-red-50 max-w-md">
          <p className="font-medium mb-2">Error</p>
          <p>{error}</p>
          <button
            onClick={fetchProperties}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Discover Your Dream Property
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of exclusive properties.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence mode="wait">
            {showFilters && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="lg:col-span-1"
              >
                <FilterSection
                  filters={filters}
                  setFilters={setFilters}
                  onApplyFilters={handleApplyFilters}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`${showFilters ? "lg:col-span-3" : "lg:col-span-4"}`}>
            <div className="mb-6 space-y-4">
              <SearchBar onSearch={handleSearch} />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </motion.button>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">View:</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsGridView(true)}
                    className={`p-2 rounded-md ${
                      isGridView
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsGridView(false)}
                    className={`p-2 rounded-md ${
                      !isGridView
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            <motion.div
              layout
              className={`grid gap-4 md:gap-6 ${
                isGridView ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              }`}
            >
              <AnimatePresence>
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      onViewDetails={handleViewDetails}
                      viewType={isGridView ? "grid" : "list"}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-gray-600 col-span-full py-8"
                  >
                    No properties found matching your criteria.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertiesPage;
