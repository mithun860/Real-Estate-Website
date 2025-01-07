import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BedDouble, Bath, Maximize, ArrowLeft, Phone } from 'lucide-react';
import { Backendurl } from '../../App.jsx';

const PropertyDetails = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${Backendurl}/api/products/single/${id}`);

        if (response.data.success) {
          const property = response.data.property;

          // Handle `amenities` parsing if it's in the incorrect format
          if (
            property.amenities &&
            Array.isArray(property.amenities) &&
            property.amenities.length > 0 &&
            typeof property.amenities[0] === 'string'
          ) {
            try {
              property.amenities = JSON.parse(property.amenities[0].replace(/'/g, '"'));
            } catch (error) {
              console.error("Error parsing amenities:", error);
              property.amenities = [];
            }
          }

          setProperty(property);
          setError(null);
        } else {
          setError(response.data.message || 'Failed to load property details.');
        }
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError('Failed to load property details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500">{error}</p>
        <Link to="/properties" className="mt-4 text-blue-600 hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/properties" className="text-blue-600 hover:underline flex items-center mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Properties
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-center items-center h-96">
            <img
              src={property.image}
              alt={property.title}
              className="w-auto h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h2>
            <p className="text-gray-600 mb-4">{property.location}</p>
            <p className="text-blue-600 text-2xl font-semibold mb-6">${property.price}</p>
            <p className="text-gray-700 mb-6">{property.description}</p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center text-gray-500">
                <BedDouble className="w-5 h-5 mr-1" />
                {property.beds} Beds
              </div>
              <div className="flex items-center text-gray-500">
                <Bath className="w-5 h-5 mr-1" />
                {property.baths} Baths
              </div>
              <div className="flex items-center text-gray-500">
                <Maximize className="w-5 h-5 mr-1" />
                {property.sqft} sqft
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Amenities</h3>
              <ul className="list-disc list-inside text-gray-600">
                {Array.isArray(property.amenities) && property.amenities.length > 0 ? (
                  property.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))
                ) : (
                  <p className="text-gray-500">No amenities available</p>
                )}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Availability</h3>
              <p className="text-gray-600 capitalize">{property.availability}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Details</h3>
              <div className="flex items-center text-gray-500">
                <Phone className="w-5 h-5 mr-3" />
                {property.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;