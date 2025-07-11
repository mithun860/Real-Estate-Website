import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { backendurl } from '../App';

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/properties`);
      setProperties(res.data);
    } catch (err) {
      toast.error('Failed to fetch properties');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      await axios.delete(`${backendurl}/api/properties/${id}`);
      toast.success('Property deleted!');
      setProperties(properties.filter(p => p._id !== id));
    } catch (err) {
      toast.error('Failed to delete property');
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>
      <div className="space-y-4">
        {properties.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow bg-white">
            <h3 className="text-xl font-semibold text-[#066b70]">{p.title}</h3>
            <p>{p.location}</p>
            <p>₹ {p.price}</p>
            {p.images[0] && <img src={p.images[0]} alt="" className="w-32 h-20 object-cover mt-2" />}
            <div className="flex gap-3 mt-3">
              <Link to={`/edit-property/${p._id}`} className="text-blue-600 underline">Edit</Link>
              <button onClick={() => handleDelete(p._id)} className="text-red-600 underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProperties;