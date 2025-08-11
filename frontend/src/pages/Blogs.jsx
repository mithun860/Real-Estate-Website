import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`).then((res) => setBlogs(res.data));
  }, []);

  return (
    <div>
      <h1>Our Blog</h1>
      {blogs.map((b) => (
        <div key={b._id}>
          <img src={b.image} alt={b.title} width="200" />
          <h2>{b.title}</h2>
          <p>{b.content.substring(0, 150)}...</p>
          <Link to={`/blog/${b._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}