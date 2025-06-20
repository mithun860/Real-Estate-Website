import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Share2,
  BedDouble,
  Bath,
  Maximize,
  Calendar,
  Phone,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Copy,
  Compass,
  Building,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ScheduleViewing from "./ScheduleViewing";
import { Backendurl } from "../../App";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`${Backendurl}/api/properties/${id}`);
      setProperty(res.data);
    } catch (err) {
      console.error("Error loading property:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const handleShare = async () => {
    try {
      const url = window.location.href;
      if (navigator.share) {
        await navigator.share({ url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (err) {
      console.error("Share failed", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600 text-lg">Loading property...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-lg">Property not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-20"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/properties" className="text-[#425036] inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Listings
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
          >
            {copySuccess ? (
              <span className="text-green-600 flex items-center gap-1">
                <Copy className="w-4 h-4" />
                Copied!
              </span>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#425036]" />
                <span className="text-[#425036]">Share</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image Carousel */}
          <div className="relative h-[500px] bg-gray-100 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={property.image[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {property.image.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImage((prev) => (prev === 0 ? property.image.length - 1 : prev - 1))
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full"
                >
                  <ChevronLeft className="text-[#425036]" />
                </button>
                <button
                  onClick={() =>
                    setActiveImage((prev) => (prev === property.image.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full"
                >
                  <ChevronRight className="text-[#425036]" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-1 rounded-full">
              {activeImage + 1} / {property.image.length}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{ fontFamily: "'Queensides', serif", color: '#425036' }}
                >
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {property.location}
                </div>
              </div>
              <div className="text-right">
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Queensides', serif", color: '#425036' }}
                >
                  ₹{Number(property.price).toLocaleString("en-IN")}
                </p>
                <p className="text-gray-500 text-sm">
                  {property.availability === "buy" ? "For Sale" : "For Rent"}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
                <BedDouble className="text-[#425036]" />
                <span className="text-sm text-gray-600">{property.beds} Beds</span>
              </div>
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
                <Bath className="text-[#425036]" />
                <span className="text-sm text-gray-600">{property.baths} Baths</span>
              </div>
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
                <Maximize className="text-[#425036]" />
                <span className="text-sm text-gray-600">{property.sqft} sqft</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "'Queensides', serif" }}
              >
                Description
              </h2>
              <p className="text-gray-700">{property.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "'Queensides', serif" }}
              >
                Amenities
              </h2>
              <ul className="grid grid-cols-2 gap-2 text-gray-700">
                {property.amenities.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#425036]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + View Button */}
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
              <div className="text-gray-700 flex items-center gap-2">
                <Phone className="text-[#425036]" />
                <span>{property.phone}</span>
              </div>
              <button
                onClick={() => setShowSchedule(true)}
                className="bg-[#425036] text-white px-6 py-3 rounded-lg hover:bg-[#36412e] transition"
              >
                <Calendar className="w-4 h-4 inline-block mr-2" />
                Schedule Viewing
              </button>
            </div>

            {/* Location */}
            <div className="pt-6 border-t mt-6">
              <h2
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "'Queensides', serif" }}
              >
                Location
              </h2>
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Compass className="w-5 h-5 text-[#425036]" />
                <span>{property.location}</span>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(property.location)}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#425036] underline hover:text-[#2f3a28]"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showSchedule && (
            <ScheduleViewing propertyId={property._id} onClose={() => setShowSchedule(false)} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;