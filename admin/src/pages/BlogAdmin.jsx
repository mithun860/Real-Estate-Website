import { useState, useEffect } from "react";
import axios from "axios";

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", image: "", category: "" });

  const fetchBlogs = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`);
    setBlogs(data);
  };

  const createBlog = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`, form);
    setForm({ title: "", content: "", image: "", category: "" });
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Manage Blogs</h2>
      <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
      <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
      <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <button onClick={createBlog}>Add Blog</button>

      <ul>
        {blogs.map((b) => (
          <li key={b._id}>
            {b.title} <button onClick={() => deleteBlog(b._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}