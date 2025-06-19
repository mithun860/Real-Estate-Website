import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    fullDesc: "",
    location: "",
    price: "",
    images: [],
    amenities: [],
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert image files to base64 or upload them and store URLs instead
      const imageURLs = imageFiles.map((file) => URL.createObjectURL(file));

      const dataToSend = {
        ...formData,
        images: imageURLs, // Replace this with real upload URLs in production
      };

      const res = await axios.post("http://localhost:4000/api/properties/add", dataToSend);
      toast.success("Property added successfully!");
      setFormData({ title: "", shortDesc: "", fullDesc: "", location: "", price: "", images: [], amenities: [] });
      setImageFiles([]);
    } catch (error) {
      toast.error("Failed to add property");
      console.error(error);
    }
  };

  const amenityOptions = ["Lake View", "Power Backup", "Fencing", "Clubhouse", "Road Access"];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border p-2" required />
        <input name="shortDesc" placeholder="Short Description" value={formData.shortDesc} onChange={handleChange} className="w-full border p-2" required />
        <textarea name="fullDesc" placeholder="Full Description" value={formData.fullDesc} onChange={handleChange} className="w-full border p-2" rows={4} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full border p-2" required />
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-2" required />
        
        <label className="block mt-4 font-semibold">Upload Images:</label>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        <div className="mt-4">
          <label className="block font-semibold mb-2">Select Amenities:</label>
          <div className="flex flex-wrap gap-3">
            {amenityOptions.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-[#066b70] text-white px-6 py-2 rounded mt-4">
          Submit Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;