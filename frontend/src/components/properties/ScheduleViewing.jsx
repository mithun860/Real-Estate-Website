import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Loader, X, CheckCircle, Users, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Backendurl } from '../../App';

const ScheduleViewing = ({ propertyId, propertyTitle, propertyLocation, propertyImage, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',     // ✅ name added
    date: '',
    time: '',
    notes: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  const dateRestrictions = useMemo(() => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    today.setHours(0, 0, 0, 0);
    return {
      min: today.toISOString().split('T')[0],
      max: maxDate.toISOString().split('T')[0]
    };
  }, []);

  const isWeekend = (date) => {
    const d = new Date(date);
    return d.getDay() === 0 || d.getDay() === 6;
  };

  const isPastTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const selected = new Date(formData.date);
    selected.setHours(hours, minutes);
    return selected < now;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (isWeekend(selectedDate)) {
      toast.error('Viewings are not available on weekends');
      return;
    }
    setFormData(prev => ({ ...prev, date: selectedDate, time: '' }));
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    if (formData.date === dateRestrictions.min && isPastTime(selectedTime)) {
      toast.error('Please select a future time slot');
      return;
    }
    setFormData(prev => ({ ...prev, time: selectedTime }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 8) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${Backendurl}/api/appointments/schedule`, {
        propertyId,
        ...formData
      });

      if (response.data.success) {
        setIsSuccess(true);
        setTimeout(() => onClose(), 3000);
      }
    } catch (error) {
      console.error('Scheduling error:', error);
      toast.error(error?.response?.data?.message || "Failed to schedule viewing.");
    } finally {
      setLoading(false);
    }
  };

  const canProceedToStep2 = formData.date && formData.time;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative overflow-hidden">

          <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 bg-white rounded-full p-1 hover:bg-gray-100">
            <X size={20} />
          </button>

          {!isSuccess ? (
            <>
              <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
                {propertyImage && (
                  <div className="mr-4 flex-shrink-0">
                    <img src={propertyImage} alt={propertyTitle} className="w-16 h-16 object-cover rounded-lg" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-gray-900 truncate">Schedule a Viewing</h2>
                  {propertyTitle && <p className="text-gray-700 font-medium truncate">{propertyTitle}</p>}
                  {propertyLocation && (
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="truncate">{propertyLocation}</span>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                      <input type="date" value={formData.date} onChange={handleDateChange}
                        min={dateRestrictions.min} max={dateRestrictions.max}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                        required disabled={loading} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Time Slot</label>
                      <select value={formData.time} onChange={handleTimeChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                        required disabled={!formData.date || loading}>
                        <option value="">Choose a time slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}
                            disabled={formData.date === dateRestrictions.min && isPastTime(slot)}>{slot}</option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-4">
                      <button type="button" onClick={() => canProceedToStep2 && setStep(2)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={!canProceedToStep2 || loading}>
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" required value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Enter your full name" disabled={loading} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                      <input type="tel" required value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Enter phone number" disabled={loading} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                      <input type="email" value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Enter email (optional)" disabled={loading} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                      <textarea value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg" rows={3}
                        placeholder="Any requirements..." disabled={loading}></textarea>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-3 pt-3">
                      <button type="button" onClick={() => setStep(1)}
                        className="lg:w-1/2 bg-gray-100 text-gray-700 py-3 rounded-lg">Back</button>
                      <button type="submit"
                        className="lg:w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                        {loading ? (<><Loader className="w-4 h-4 animate-spin" /> Scheduling...</>) : 'Schedule Viewing'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Viewing Scheduled!</h3>
              <p className="text-gray-600">You'll receive a confirmation SMS shortly.</p>
            </div>
          )}

          {!isSuccess && (
            <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-600">
              <Users className="w-4 h-4 text-blue-600 mr-2 inline" />
              A qualified agent will reach out to you.
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScheduleViewing;
