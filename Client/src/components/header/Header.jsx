import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../Auth/AuthContext.jsx';
import "./header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(() => navigate('/login'));
  };

  return (
    <section className="header">
      <div className="header-container">
        <nav className="header-nav">
          <ol className={`header-nav-list ${menuOpen ? "open" : ""}`}>
            <div className="logo">My Blogs</div>
            <li className="header-nav-item">
              <Link to="/">Blog</Link>
            </li>
            {user ? (
              <>
                <li className="header-nav-item">
                  <Link to="/CreateBlog">Create Blog</Link>
                </li>
                <li className="header-nav-item">Welcome, {user.name}</li>
                <li className="header-nav-item">
                  <button className="logout" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="header-nav-item">
                  <Link to="/login">Login</Link>
                </li>
                <li className="header-nav-item">
                  <Link to="/signUp">Signup</Link>
                </li>
              </>
            )}
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
