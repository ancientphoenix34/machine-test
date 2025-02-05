import React, { useState } from "react";
import { Link } from "react-router-dom";  
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Resto</Link>
        </div>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-menu">Add Menu</Link></li> 
          <li><Link to="/list-menu">List Menu</Link></li>
          <li><Link to="/add-menu-item">Add Menu Item</Link></li>
          <li><Link to="/list-menu-item">List Menu Item</Link></li>
        </ul>
        <div className="menu-icon" onClick={handleMenuToggle}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
