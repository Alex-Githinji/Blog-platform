import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="header">
      <div className="header-container">
        <nav className="header-nav">
          <ol className={`header-nav-list ${menuOpen ? "open" : ""}`}>
          <div className="logo">My Blogs</div>
            <li className="header-nav-item">
              <Link to="/"></Link>
            </li>
            <li className="header-nav-item">
              <Link to="/Blog">Blog</Link>
            </li>
            <li className="header-nav-item">
              <Link to="/CreateBlog">create Blog</Link>
            </li>
            <li className="header-nav-item">
              <Link to="/SignUp">Signup</Link>
            </li>
          </ol>
          <button
            className="header-nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="header-nav-toggle-icon"></span>
          </button>
        </nav>
      </div>
    </section>
  );
}

export default Header;