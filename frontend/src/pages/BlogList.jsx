import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Backendurl } from "../App";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${Backendurl}/api/blogs`).then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg">
            <img src={blog.coverImage} alt={blog.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600">{blog.excerpt}</p>
              <Link to={`/blog/${blog.slug}`} className="text-green-700 font-medium">Read More →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;