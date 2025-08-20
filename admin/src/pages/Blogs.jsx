import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backendurl } from "../App";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "", content: "", excerpt: "", coverImage: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await axios.get(`${Backendurl}/api/blogs`);
    setBlogs(res.data.posts || []); // ✅ backend now returns {posts, totalPages}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // ✅ ensure admin token is sent

    if (editingId) {
      await axios.put(`${Backendurl}/api/blogs/${editingId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(`${Backendurl}/api/blogs`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    setForm({ title: "", slug: "", content: "", excerpt: "", coverImage: "" });
    setEditingId(null);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt,
      coverImage: blog.coverImage,
    });
    setEditingId(blog._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${Backendurl}/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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