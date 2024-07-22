import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
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
          setBlogs(data.blogs); 
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

  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/blogs/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setBlogs(blogs.filter(blog => blog.id !== id));
      } else {
        setError(data.message || 'Failed to delete blog');
      }
    } catch (error) {
      console.log('Delete Error:', error);
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="container">
      <header className="blog-header">
        <h1>View blogs Available you can also create your Own</h1>
        <p>Insights and thoughts on web development, design, and more.</p>
      </header>
      <main className="blogs">
        {blogs.map(blog => (
          <article key={blog.id} className="post">
            <h2>{blog.title}</h2>
            <p className="summary">{blog.summary}</p>
            <p className="meta">
              By {blog.Author} on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <Link to={`${blog.id}`} className="read-more">
              Read more
            </Link>
            <button className="delete" onClick={() => deleteBlog(blog.id)}>Delete</button>
          </article>
        ))}
      </main>
    </section>
  );
}

export default Blog;
