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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-[#066b70] text-center">
        Add Property
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields remain the same */}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-[#066b70] text-white py-3 rounded hover:bg-[#055e64]"
        >
          {isUploading ? "Uploading..." : "Submit Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;