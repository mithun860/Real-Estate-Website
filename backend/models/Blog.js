import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // for SEO URLs
    content: { type: String, required: true },
    excerpt: { type: String },
    author: { type: String, default: "Admin" },
    coverImage: { type: String }, // Cloudinary/ImageKit URL
    tags: [String],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);