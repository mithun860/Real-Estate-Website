import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  images: [{ type: String }], // URLs
  amenities: [{ type: String }],
  location: { type: String },
  price: { type: String },
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      user: String,
      message: String,
      rating: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

const Property = mongoose.model('Property', PropertySchema);
export default Property;