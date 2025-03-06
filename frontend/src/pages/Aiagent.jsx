import { useState, useEffect } from "react";
import SearchForm from "../components/ai/SearchForm"
import PropertyCard from "../components/ai/PropertyCard";
import LocationTrends from "../components/ai/LocationTrends";
import AnalysisDisplay from "../components/ai/AnalysisDisplay";
import { searchProperties, getLocationTrends } from "../services/api";
import { Building, MapPin, TrendingUp, Brain } from "lucide-react";
import PropTypes from "prop-types";

const AIPropertyHub = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(""); // Track loading stages
  const [loadingTime, setLoadingTime] = useState(0); // Track loading time
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState([]);
  const [propertyAnalysis, setPropertyAnalysis] = useState("");
  const [locationAnalysis, setLocationAnalysis] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Timer for loading state
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setLoadingTime(0);
      setLoadingStage("");
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    setSearchError("");
    setSearchPerformed(true);
    setLoadingTime(0);

    try {
      // Fetch property data
      setLoadingStage("properties");
      const propertyResponse = await searchProperties(searchParams);
      setProperties(propertyResponse.properties || []);
      setPropertyAnalysis(propertyResponse.analysis || "");

      // Fetch location trends for the same city
      setLoadingStage("locations");
      const locationResponse = await getLocationTrends(searchParams.city);
      setLocations(locationResponse.locations || []);
      setLocationAnalysis(locationResponse.analysis || "");
    } catch (error) {
      console.error("Error during search:", error);
      setSearchError("Failed to fetch property data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced loading indicator component
  const renderLoadingIndicator = () => {
    const getLoadingMessage = () => {
      if (loadingTime < 5) {
        return "Extracting property data from various sources...";
      } else if (loadingTime < 15) {
        return "Loading AI model for comprehensive analysis...";
      } else if (loadingTime < 30) {
        return "AI is analyzing property details and market conditions...";
      } else {
        return "Finalizing results and generating insights for you...";
      }
    };

    const getProgressWidth = () => {
      // Calculate progress percentage (max 95% so it doesn't look complete)
      const progress = Math.min(95, (loadingTime / 45) * 100);
      return `${progress}%`;
    };

    return (
      <div className="flex flex-col items-center justify-center py-12">
        {/* Loading animation with property icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center relative">
            {loadingStage === "properties" ? (
              <Building className="w-12 h-12 text-white animate-pulse" />
            ) : (
              <Brain className="w-12 h-12 text-white animate-pulse" />
            )}
            
            {/* Orbiting dot */}
            <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2" style={{
              animation: "orbit 2s linear infinite"
            }}></div>
          </div>
          
          {/* Pulse animation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-blue-500 opacity-30 animate-ping"></div>
        </div>

        <style jsx>{`
          @keyframes orbit {
            from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
          }
        `}</style>

        <div className="text-center mb-6 max-w-lg">
          <h3 className="text-2xl font-medium text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {loadingStage === "properties"
              ? "Finding Ideal Properties"
              : "Analyzing Market Trends"}
          </h3>
          <p className="text-gray-600 text-lg">{getLoadingMessage()}</p>
        </div>

        {/* Stylish progress bar */}
        <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
            style={{ width: getProgressWidth() }}
          ></div>
        </div>

        {/* Loading context message */}
        <div className="bg-blue-50 border border-blue-100 p-5 rounded-lg max-w-md">
          <div className="flex items-center mb-3">
            <div className="mr-3">
              {loadingTime < 15 ? (
                <MapPin className="w-5 h-5 text-blue-600" />
              ) : (
                <TrendingUp className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <h4 className="font-medium text-blue-800">AI Processing</h4>
          </div>
          
          <p className="text-blue-700 text-sm">
            {loadingTime < 20 
              ? "Our AI is searching for properties that match your exact requirements and analyzing local market data."
              : "We're using advanced algorithms to evaluate property quality, value for money, and investment potential."}
          </p>
          
          {loadingTime > 15 && (
            <div className="mt-3 pt-3 border-t border-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <p className="text-xs text-blue-600 font-medium">Deep analysis takes time for quality insights</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero section with gradient background */}
        <div className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">AI Property Hub</h1>
            <p className="text-blue-100 text-xl mb-8">
              Discover your perfect property with AI-powered insights and market analysis
            </p>
            
            <div className="bg-white/95 backdrop-blur rounded-xl p-6 shadow-lg">
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {searchError && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8 max-w-4xl mx-auto border border-red-100 shadow-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p>{searchError}</p>
            </div>
          </div>
        )}

        {isLoading && renderLoadingIndicator()}

        {!isLoading && searchPerformed && (
          <div className="space-y-12">
            {/* Property Results Section */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <Building className="mr-2 text-blue-600" />
                Property Results
              </h2>

              {properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.slice(0, 6).map((property, index) => (
                    <PropertyCard key={index} property={property} />
                  ))}
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <p className="text-yellow-700">
                    No properties found matching your criteria. Try adjusting your search parameters.
                  </p>
                </div>
              )}

              {propertyAnalysis && (
                <div className="mt-8">
                  <AnalysisDisplay analysis={propertyAnalysis} />
                </div>
              )}
            </div>

            {/* Location Trends Section */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <TrendingUp className="mr-2 text-blue-600" />
                Location Insights
              </h2>
              <LocationTrends locations={locations} />

              {locationAnalysis && (
                <div className="mt-8">
                  <AnalysisDisplay analysis={locationAnalysis} />
                </div>
              )}
            </div>
          </div>
        )}

        {!isLoading && !searchPerformed && (
          <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to AI Property Hub
              </h2>
              <p className="text-gray-600">
                Our advanced AI analyzes real estate data to help you make better property decisions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <FeatureCard 
                icon={<Building className="w-6 h-6" />}
                title="Property Analysis" 
                description="Discover properties matching your requirements with detailed AI insights"
              />
              <FeatureCard 
                icon={<MapPin className="w-6 h-6" />}
                title="Location Trends" 
                description="Evaluate neighborhood growth, rental yields, and price appreciation"
              />
              <FeatureCard 
                icon={<TrendingUp className="w-6 h-6" />}
                title="Investment Insights" 
                description="Get expert recommendations on property investment potential"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
    <div className="text-blue-600 mb-3">{icon}</div>
    <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default AIPropertyHub;