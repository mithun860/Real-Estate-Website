import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { backendurl } from "../App";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    fullDesc: "",
    location: "",
    price: "",
    amenities: [],
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${backendurl}/api/properties/${id}`);
        setFormData(res.data);
      } catch (err) {
        toast.error("Failed to fetch property");
      }
    };
    fetchProperty();
  }, [id]);

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

  const uploadImagesToCloudinary = async () => {
    const uploadedUrls = [];
    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      uploadedUrls.push(res.data.secure_url);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newImageUrls = imageFiles.length > 0 ? await uploadImagesToCloudinary() : [];
      const updatedData = {
        ...formData,
        images: newImageUrls.length > 0 ? newImageUrls : formData.images,
      };
      await axios.put(`${backendurl}/api/properties/${id}`, updatedData);
      toast.success("Property updated");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  const amenityOptions = ["Lake View", "Power Backup", "Fencing", "Clubhouse", "Road Access"];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#066b70]">Edit Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} className="w-full border p-2" placeholder="Title" />
        <input name="shortDesc" value={formData.shortDesc} onChange={handleChange} className="w-full border p-2" placeholder="Short Description" />
        <textarea name="fullDesc" value={formData.fullDesc} onChange={handleChange} className="w-full border p-2" rows={4} placeholder="Full Description" />
        <input name="location" value={formData.location} onChange={handleChange} className="w-full border p-2" placeholder="Location" />
        <input name="price" value={formData.price} onChange={handleChange} className="w-full border p-2" placeholder="Price" />

        <label className="block font-semibold">Amenities:</label>
        <div className="flex flex-wrap gap-3">
          {amenityOptions.map((a) => (
            <label key={a} className="flex items-center gap-2">
              <input type="checkbox" checked={formData.amenities.includes(a)} onChange={() => handleAmenityToggle(a)} />
              <span>{a}</span>
            </label>
          ))}
        </div>

        <label className="block font-semibold mt-4">Upload New Images (optional):</label>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        <button type="submit" disabled={loading} className="mt-4 bg-[#066b70] text-white px-6 py-2 rounded">
          {loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default EditProperty;