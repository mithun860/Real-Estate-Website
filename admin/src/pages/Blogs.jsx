import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backendurl } from "../App"; // update to your backend URL

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "", content: "", excerpt: "", coverImage: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await axios.get(`${Backendurl}/api/blogs`);
    setBlogs(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${Backendurl}/api/blogs/${editingId}`, form);
    } else {
      await axios.post(`${Backendurl}/api/blogs`, form);
    }
    setForm({ title: "", slug: "", content: "", excerpt: "", coverImage: "" });
    setEditingId(null);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setEditingId(blog._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${Backendurl}/api/blogs/${id}`);
    fetchBlogs();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Blogs</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input className="border p-2 w-full" placeholder="Title"
          value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Slug"
          value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <textarea className="border p-2 w-full" placeholder="Content"
          value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}></textarea>
        <input className="border p-2 w-full" placeholder="Excerpt"
          value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Cover Image URL"
          value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      <ul>
        {blogs.map((blog) => (
          <li key={blog._id} className="flex justify-between items-center border-b py-2">
            <span>{blog.title}</span>
            <div>
              <button onClick={() => handleEdit(blog)} className="mr-2 text-blue-600">Edit</button>
              <button onClick={() => handleDelete(blog._id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;