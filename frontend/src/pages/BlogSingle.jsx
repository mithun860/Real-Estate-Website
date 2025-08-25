// frontend/src/pages/BlogSingle.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Backendurl } from "../App";

const BlogSingle = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    fetchBlog();
    fetchRelatedBlogs();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Backendurl}/api/blogs/${slug}`);
      setBlog(response.data);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Blog post not found.");
      } else {
        setError("Failed to load blog post. Please try again later.");
      }
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const response = await axios.get(`${Backendurl}/api/blogs?page=1&limit=3`);
      setRelatedBlogs(response.data.posts || []);
    } catch (err) {
      console.error("Error fetching related blogs:", err);
    }
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading... - Three Leaf World Blog</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-32">
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Blog Not Found - Three Leaf World</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-32">
          <div className="max-w-4xl mx-auto p-6 py-20">
            <div className="text-center">
              <div className="text-6xl mb-4">😕</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Oops! Blog Not Found</h1>
              <p className="text-gray-600 mb-8 text-lg">{error}</p>
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Helmet>
          <title>Blog Not Found - Three Leaf World</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-32">
          <div className="max-w-4xl mx-auto p-6 py-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
              <Link 
                to="/blog" 
                className="text-green-700 font-medium hover:text-green-800"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} - Three Leaf World Blog</title>
        <meta name="description" content={blog.excerpt || `Read ${blog.title} on Three Leaf World blog`} />
        <meta name="keywords" content={blog.tags ? blog.tags.join(', ') : 'real estate, property, blog'} />
        <link rel="canonical" href={`https://www.threeleafworld.com/blog/${blog.slug}`} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || `Read ${blog.title} on Three Leaf World blog`} />
        <meta property="og:image" content={blog.coverImage || 'https://www.threeleafworld.com/default-blog-image.jpg'} />
        <meta property="og:url" content={`https://www.threeleafworld.com/blog/${blog.slug}`} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt || `Read ${blog.title} on Three Leaf World blog`} />
        <meta name="twitter:image" content={blog.coverImage || 'https://www.threeleafworld.com/default-blog-image.jpg'} />
        
        {/* Article specific meta tags */}
        <meta property="article:author" content={blog.author} />
        <meta property="article:published_time" content={blog.createdAt} />
        {blog.tags && blog.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-32">
        {/* Article Content */}
        <article className="max-w-4xl mx-auto p-6 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Cover Image */}
            {blog.coverImage && (
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            )}

            <div className="p-6 md:p-10">
              {/* Article Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {blog.title}
                </h1>
                
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">By {blog.author}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                {blog.excerpt && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mt-6">
                    <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                )}
              </header>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none 
                          prose-headings:text-gray-900 prose-headings:font-bold
                          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                          prose-a:text-green-700 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                          prose-img:rounded-lg prose-img:shadow-lg
                          prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:pl-6 prose-blockquote:italic
                          prose-ul:text-gray-700 prose-ol:text-gray-700
                          prose-li:mb-2" 
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-sm text-gray-500">
                    Published on {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} by {blog.author}
                  </div>
                  
                  <Link 
                    to="/blog" 
                    className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to All Posts
                  </Link>
                </div>
              </footer>
            </div>
          </div>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <section className="mt-16">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">More Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedBlogs.filter(relatedBlog => relatedBlog._id !== blog._id).slice(0, 3).map((relatedBlog) => (
                    <Link 
                      key={relatedBlog._id}
                      to={`/blog/${relatedBlog.slug}`}
                      className="group block"
                    >
                      <article className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                        {relatedBlog.coverImage && (
                          <div className="h-32 overflow-hidden">
                            <img 
                              src={relatedBlog.coverImage} 
                              alt={relatedBlog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                            {relatedBlog.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {new Date(relatedBlog.createdAt).toLocaleDateString()}
                          </p>
                          {relatedBlog.excerpt && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {relatedBlog.excerpt}
                            </p>
                          )}
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
};

export default BlogSingle;