// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Vamos criar este CSS

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">CryptoFollow</Link>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Navbar;