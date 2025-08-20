import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Backendurl } from "../App";

const BlogSingle = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`${Backendurl}/api/blogs/${slug}`).then((res) => setBlog(res.data));
  }, [slug]);

  if (!blog) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={blog.coverImage} alt={blog.title} className="w-full rounded-lg mb-6" />
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-6">By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()}</p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    </div>
  );
};

export default BlogSingle;