import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './blog.css';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('http://localhost:3001/blogs');
        const data = await response.json();
        if (data.success) {
          setBlogs(data.blogs); // Ensure this matches the structure of your API response
        } else {
          setError(data.message || 'Failed to fetch blogs');
        }
      } catch (error) {
        console.log('Fetch Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="blogs">
      {blogs.map(blog => (
        <article key={blog.id} className="post">
          <h2>{blog.title}</h2>
          <p className="summary">{blog.summary}</p>
          <p className="meta">
            By {blog.Author} on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <Link to={`/blogs/${blog.id}`} className="read-more">
            Read more
          </Link>
        </article>
      ))}
    </main>
  );
}

export default Blog;
