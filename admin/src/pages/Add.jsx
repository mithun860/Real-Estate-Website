import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    type: "Residential",
    description: "",
    amenities: "",
  });
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    if (files.some(file => file.size > 5 * 1024 * 1024)) {
      toast.error("One or more images exceed 5MB limit");
      return;
    }
    setImages(files);
  };

  const uploadImages = async () => {
    const formData = new FormData();
    images.forEach(file => {
      formData.append("files", file);
    });
    
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    return response.data.urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsUploading(true);
    try {
      const imageUrls = await uploadImages();
      
      const payload = {
        ...formData,
        price: Number(formData.price),
        beds: Number(formData.beds),
        baths: Number(formData.baths),
        sqft: Number(formData.sqft),
        images: imageUrls,
        amenities: formData.amenities.split(",").map(a => a.trim()).filter(Boolean),
        status: "active"
      };

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      );

      toast.success("Property added successfully!");
      setFormData({
        title: "", location: "", price: "", beds: "", baths: "", sqft: "",
        type: "Residential", description: "", amenities: ""
      });
      setImages([]);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to add property");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Portal</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-200 rounded">Download</button>
          <button className="px-4 py-2 bg-gray-200 rounded">Contacts</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Upload Property</button>
          <button className="px-4 py-2 bg-gray-200 rounded">Manage Properties</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#066b70]">
          Submit Property
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#066b70] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#066b70] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#066b70] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#066b70] focus:border-transparent"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Beds*</label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#066b70] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Baths*</label>
              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#066b70] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Square Feet*</label>
              <input
                type="number"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#066b70] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma separated)</label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#066b70] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#066b70] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Images* (Max 4)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-[#066b70] text-white py-3 rounded-md hover:bg-[#055e64] transition-colors"
          >
            {isUploading ? "Uploading..." : "Submit Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;