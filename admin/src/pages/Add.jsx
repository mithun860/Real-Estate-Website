import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    amenities: "",
  });

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files].slice(0, 4));
  };

  const uploadImagesToCloudinary = async () => {
    const urls = [];
    for (let file of images) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", uploadPreset);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data
      );
      urls.push(res.data.secure_url);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please upload at least 1 image");
      return;
    }

    try {
      setUploading(true);
      const uploadedImageUrls = await uploadImagesToCloudinary();

      const payload = {
        ...formData,
        amenities: formData.amenities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        images: uploadedImageUrls,
      };

      const res = await axios.post(`${backendUrl}/api/properties/add`, payload);
      toast.success("Property added successfully!");

      setFormData({
        title: "",
        location: "",
        price: "",
        description: "",
        amenities: "",
      });
      setImages([]);
    } catch (err) {
      toast.error("Failed to add property");
      console.error("Upload error:", err.response?.data || err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-[#066b70] text-center">Add Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border p-3 rounded" required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full border p-3 rounded" required />
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-3 rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows={4} className="w-full border p-3 rounded" required />
        <input name="amenities" placeholder="Amenities (comma separated)" value={formData.amenities} onChange={handleChange} className="w-full border p-3 rounded" />

        <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full" />
        <p className="text-sm text-gray-500">Upload up to 4 images</p>

        <button type="submit" disabled={uploading} className="w-full bg-[#066b70] text-white py-3 rounded hover:bg-[#055e64]">
          {uploading ? "Uploading..." : "Submit Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
