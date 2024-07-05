import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

// ---------------------IBRAHIM BADSHAH---------------------------------

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="homepage-header">
      <div className="homepage-logo">
        <h1>Library Management</h1>
      </div>
      <nav className="homepage-nav">
        <Link to="/signup" className="link-decor signup-link">
          Sign Up
        </Link>
        <div className="homepage-login-dropdown link-decor">
          <button className="homepage-link link-decor" onClick={toggleDropdown}>
            Log In
          </button>
          {isDropdownOpen && (
            <div className="homepage-dropdown-content">
              <Link to="/login" className="homepage-dropdown-link link-decor">
                User Login
              </Link>
              <Link
                to="/admin-login"
                className="homepage-dropdown-link link-decor"
              >
                Admin Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
