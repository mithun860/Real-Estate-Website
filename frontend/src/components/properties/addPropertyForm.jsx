import { useState } from 'react';
import axios from 'axios';

const AddPropertyForm = () => {
  const [propertyData, setPropertyData] = useState({
    title: '',
    location: '',
    price: '',
    image: [],
    beds: '',
    baths: '',
    sqft: '',
    type: '',
    availability: '',
    description: '',
    amenities: [],
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setPropertyData({
      ...propertyData,
      image: [...propertyData.image, ...e.target.files]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(propertyData).forEach(key => {
        if (key === 'image') {
          propertyData.image.forEach(image => {
            formData.append('image', image);
          });
        } else {
          formData.append(key, propertyData[key]);
        }
      });

      const response = await axios.post('/api/properties/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        alert('Property added successfully');
      }
    } catch (error) {
      console.error('Error adding property:', error);
      alert('Failed to add property');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={propertyData.title} onChange={handleChange} placeholder="Title" required />
      <input type="text" name="location" value={propertyData.location} onChange={handleChange} placeholder="Location" required />
      <input type="number" name="price" value={propertyData.price} onChange={handleChange} placeholder="Price" required />
      <input type="file" name="image" onChange={handleImageChange} multiple />
      <input type="number" name="beds" value={propertyData.beds} onChange={handleChange} placeholder="Beds" required />
      <input type="number" name="baths" value={propertyData.baths} onChange={handleChange} placeholder="Baths" required />
      <input type="number" name="sqft" value={propertyData.sqft} onChange={handleChange} placeholder="Square Footage" required />
      <input type="text" name="type" value={propertyData.type} onChange={handleChange} placeholder="Type" required />
      <input type="text" name="availability" value={propertyData.availability} onChange={handleChange} placeholder="Availability" required />
      <textarea name="description" value={propertyData.description} onChange={handleChange} placeholder="Description" required />
      <input type="text" name="amenities" value={propertyData.amenities} onChange={handleChange} placeholder="Amenities" required />
      <input type="text" name="phone" value={propertyData.phone} onChange={handleChange} placeholder="Phone" required />
      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddPropertyForm;