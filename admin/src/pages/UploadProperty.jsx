import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { backendurl } from '../App';

const UploadProperty = () => {
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    amenities: '',
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 5);
    setImages(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      return toast.error("Please upload at least one image.");
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val);
    });
    images.forEach((img) => formData.append('images', img));

    try {
      const res = await axios.post(`${backendurl}/api/properties/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Property uploaded successfully!');
      setForm({ title: '', location: '', price: '', description: '', amenities: '' });
      setImages([]);
    } catch (error) {
      console.error(error);
      toast.error('Upload failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-[#066b70]">Upload Property</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          rows={4}
          required
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma-separated)"
          value={form.amenities}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full"
        />
        <p className="text-sm text-gray-500">You can upload up to 5 images</p>

        <button
          type="submit"
          className="w-full bg-[#066b70] text-white py-3 rounded hover:bg-[#055e64]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadProperty;