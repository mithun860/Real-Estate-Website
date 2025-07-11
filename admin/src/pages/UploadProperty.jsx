import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UploadProperty = () => {
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    amenities: '',
  });

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 4); // limit to 4 images
    setImages(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error('Please upload at least 1 image');
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    images.forEach((img) => formData.append('images', img));

    try {
      setUploading(true);
      const res = await axios.post(`${backendUrl}/api/properties/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Property uploaded successfully!');
      setForm({ title: '', location: '', price: '', description: '', amenities: '' });
      setImages([]);
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#066b70]">Upload Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full border p-3 rounded" required />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full border p-3 rounded" required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full border p-3 rounded" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border p-3 rounded" rows={4} required />
        <input type="text" name="amenities" placeholder="Amenities (comma-separated)" value={form.amenities} onChange={handleChange} className="w-full border p-3 rounded" />
        
        <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full" />
        <p className="text-sm text-gray-500">You can upload up to 4 images</p>

        <button type="submit" disabled={uploading} className="w-full bg-[#066b70] text-white py-3 rounded hover:bg-[#055e64]">
          {uploading ? 'Uploading...' : 'Submit Property'}
        </button>
      </form>
    </div>
  );
};

export default UploadProperty;
