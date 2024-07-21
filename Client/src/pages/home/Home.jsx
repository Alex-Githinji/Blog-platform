import React from 'react';
import './home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  const posts = [
    {
      id: 1,
      title: "Understanding React Hooks",
      summary: "A deep dive into React hooks and how they can simplify your code.",
      author: "Jane Doe",
      date: "July 18, 2024",
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox",
      summary: "Comparing two powerful CSS layout systems and when to use each.",
      author: "John Smith",
      date: "July 17, 2024",
    },
    {
      id: 3,
      title: "JavaScript ES6 Features",
      summary: "An overview of the new features introduced in ECMAScript 2015.",
      author: "Alice Johnson",
      date: "July 16, 2024",
    },
    {
      id: 4,
      title: "Building Accessible Web Apps",
      summary: "Tips and tricks for making your web applications accessible to all users.",
      author: "Chris Lee",
      date: "July 15, 2024",
    },
    {
      id: 5,
      title: "Mastering Redux for State Management",
      summary: "Learn how to efficiently manage state in your React applications using Redux.",
      author: "Emma Brown",
      date: "July 14, 2024",
    },
    {
      id: 6,
      title: "Deploying React Apps with Netlify",
      summary: "A step-by-step guide to deploying your React applications on Netlify.",
      author: "Michael Green",
      date: "July 13, 2024",
    },
   

  ];

  return (
    <div className="blog-home-container">
      <header className="blog-header">
        <h1>Welcome to My Blog</h1>
        <p>Insights and thoughts on web development, design, and more.</p>
      </header>
      <main className="blog-posts">
        {posts.map(post => (
          <article key={post.id} className="blog-post">
            <h2>{post.title}</h2>
            <p className="blog-summary">{post.summary}</p>
            <p className="blog-meta">
              By {post.author} on {post.date}
            </p>
          </article>
        ))}
      </main>
      </div>
      
 )
}
export default Home;
