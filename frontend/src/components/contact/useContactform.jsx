import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Backendurl } from '../../App';

export default function useContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const response = await axios.post(`${Backendurl}/api/forms/submit`, formData);

      console.log("📦 Server Response:", response);

      if (response.data.success) {
        toast.success('Form submitted successfully!');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        toast.error(response.data.message || 'Submission failed.');
      }

    } catch (error) {
      console.error('❌ Error submitting form:', error);
      toast.error('Error submitting form. Please try again.');
    }
  }
};

  return { formData, errors, handleChange, handleSubmit };
}