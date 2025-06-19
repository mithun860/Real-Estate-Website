import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, List, SlidersHorizontal, MapPin, Home } from "lucide-react";
import SearchBar from "./Searchbar.jsx";
import FilterSection from "./Filtersection.jsx";
import PropertyCard from "./Propertycard.jsx";
import { Backendurl } from "../../App.jsx";

const PropertiesPage = () => {
  const [viewState, setViewState] = useState({
    isGridView: true,
    showFilters: false,
  });

  const [propertyState, setPropertyState] = useState({
    properties: [],
    loading: true,
    error: null,
  });

  const [filters, setFilters] = useState({
    propertyType: "",
    priceRange: [0, Number.MAX_SAFE_INTEGER],
    bedrooms: "0",
    bathrooms: "0",
    availability: "",
    searchQuery: "",
    sortBy: "",
  });

  const fetchProperties = async () => {
    try {
      setPropertyState((prev) => ({ ...prev, loading: true }));
      const response = await axios.get(`${Backendurl}/api/properties`);
      setPropertyState({ properties: response.data, loading: false, error: null });
    } catch (err) {
      setPropertyState({
        properties: [],
        loading: false,
        error: "Failed to fetch properties. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return propertyState.properties
      .filter((property) => {
        const searchMatch = !filters.searchQuery ||
          [property.title, property.description, property.location].some((field) =>
            field?.toLowerCase().includes(filters.searchQuery.toLowerCase())
          );

        const typeMatch = !filters.propertyType ||
          property.type?.toLowerCase() === filters.propertyType.toLowerCase();

        const priceMatch = property.price >= filters.priceRange[0] &&
          property.price <= filters.priceRange[1];

        const bedroomsMatch = filters.bedrooms === "0" ||
          property.beds >= parseInt(filters.bedrooms);

        const bathroomsMatch = filters.bathrooms === "0" ||
          property.baths >= parseInt(filters.bathrooms);

        const availabilityMatch = !filters.availability ||
          property.availability?.toLowerCase() === filters.availability.toLowerCase();

        return searchMatch && typeMatch && priceMatch && bedroomsMatch && bathroomsMatch && availabilityMatch;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          default:
            return 0;
        }
      });
  }, [propertyState.properties, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (propertyState.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9f8]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex flex-col items-center"
        >
          <div className="relative mb-6">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-[#066b70] to-[#e3b07b] rounded-2xl flex items-center justify-center relative shadow-xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                borderRadius: ["20%", "50%", "20%"],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Home className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          <h3 className="text-2xl font-semibold text-[#066b70] mb-2">Loading Properties</h3>
          <p className="text-gray-500">Curating the perfect farm plots for you...</p>
        </motion.div>
      </div>
    );
  }

  if (propertyState.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9f8]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-6 rounded-lg bg-red-50 max-w-md"
        >
          <p className="text-red-600 font-medium mb-4">{propertyState.error}</p>
          <button
            onClick={fetchProperties}
            className="px-6 py-2 bg-[#066b70] text-white rounded-lg hover:bg-[#055f65] transition"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#f7f9f8] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-[#066b70] mb-4">
            Explore Farm Plots at SPLR
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Scenic, secure, and investment-ready plots.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="wait">
            {viewState.showFilters && (
              <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="lg:col-span-1"
              >
                <FilterSection filters={filters} setFilters={setFilters} onApplyFilters={handleFilterChange} />
              </motion.aside>
            )}
          </AnimatePresence>

          <div className={`${viewState.showFilters ? "lg:col-span-3" : "lg:col-span-4"}`}>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <SearchBar
                  onSearch={(query) => setFilters((prev) => ({ ...prev, searchQuery: query }))}
                  className="flex-1"
                />
                <div className="flex items-center gap-3">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700"
                  >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>

                  <button
                    onClick={() => setViewState((prev) => ({ ...prev, showFilters: !prev.showFilters }))}
                    className="p-2 rounded-lg hover:bg-gray-100"
                    title="Toggle Filters"
                  >
                    <SlidersHorizontal className="w-5 h-5 text-[#066b70]" />
                  </button>
                  <button
                    onClick={() => setViewState((prev) => ({ ...prev, isGridView: true }))}
                    className={`p-2 rounded-lg ${viewState.isGridView ? "bg-[#066b70]/10 text-[#066b70]" : "hover:bg-gray-100"}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewState((prev) => ({ ...prev, isGridView: false }))}
                    className={`p-2 rounded-lg ${!viewState.isGridView ? "bg-[#066b70]/10 text-[#066b70]" : "hover:bg-gray-100"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <motion.div
              layout
              className={`grid gap-6 ${
                viewState.isGridView ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              }`}
            >
              <AnimatePresence>
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      viewType={viewState.isGridView ? "grid" : "list"}
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
                    <h3 className="text-lg font-medium text-gray-800">No properties found</h3>
                    <p className="text-gray-500">Try changing your search or filters.</p>
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