import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Home } from "lucide-react";
import PropertyCard from "./PropertyCard.jsx";
import { Backendurl } from "../../App";

const PropertiesPage = () => {
  const [propertyState, setPropertyState] = useState({
    properties: [],
    loading: true,
    error: null,
  });

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${Backendurl}/api/properties`);
      setPropertyState({
        properties: response.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error("API Error:", err.message);
      setPropertyState({
        properties: [],
        loading: false,
        error: "Could not fetch properties. Please try again.",
      });
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return propertyState.properties;
  }, [propertyState.properties]);

  if (propertyState.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9f8]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex flex-col items-center"
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-[#425036] to-[#e3b07b] rounded-2xl flex items-center justify-center shadow-xl mb-6"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              borderRadius: ["20%", "50%", "20%"],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Home className="w-12 h-12 text-white" />
          </motion.div>
          <h3
            className="text-2xl font-semibold mb-2"
            style={{ fontFamily: "'Queensides', serif", color: "#425036" }}
          >
            Loading Properties
          </h3>
          <p
            className="text-gray-500"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Curating the perfect farm plots for you...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f7f9f8] pt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Queensides', serif", color: "#425036" }}
          >
            Explore Farm Plots at SPLR
          </h1>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Scenic, secure, and investment-ready plots.
          </p>
          {propertyState.error && (
            <p
              className="mt-4 text-sm text-red-500"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {propertyState.error}
            </p>
          )}
        </motion.header>

        <motion.div layout className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <AnimatePresence>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  viewType="grid"
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-12 bg-white rounded-lg shadow"
              >
                <MapPin className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                <h3
                  className="text-lg font-medium text-gray-800"
                  style={{ fontFamily: "'Queensides', serif" }}
                >
                  No properties found
                </h3>
                <p
                  className="text-gray-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Try changing your search or filters.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PropertiesPage;