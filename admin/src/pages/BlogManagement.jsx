// admin/src/pages/BlogManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backendurl } from "../../App"; // ✅ Adjust if your admin has different config

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  // ✅ Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Backendurl}/api/blogs`);
      setBlogs(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load blogs");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle create or update blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        // update
        await axios.put(`${Backendurl}/api/blogs/${editingBlog._id}`, formData);
      } else {
        // create
        await axios.post(`${Backendurl}/api/blogs`, formData);
      }
      setFormData({ title: "", content: "", image: "" });
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to save blog");
    }
  };

  // ✅ Edit blog
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      image: blog.image,
    });
  };

  // ✅ Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${Backendurl}/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingBlog ? "Edit Blog" : "Add New Blog"}
      </h2>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className="w-full border p-2 rounded h-32"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingBlog ? "Update Blog" : "Create Blog"}
        </button>
      </form>

      {/* Blog List */}
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      {loading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-sm text-gray-600">
                  {blog.content.substring(0, 100)}...
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManagement;