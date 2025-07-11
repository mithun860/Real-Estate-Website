import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: String,
  shortDesc: String,
  fullDesc: String,
  location: String,
  price: String,
  amenities: [String],
  images: [String],
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);
export default Property;
