import React from 'react';
import './Footer.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        
        <div className="footer-section">
          <h4>EAT WITH US</h4>
          <p><FaPhone className="icon" /> 9874633217</p>
          <p><FaEnvelope className="icon" />resto353@gmail.com</p>
        </div>

       
        <div className="footer-logo">
          <div className="logo-icon">R</div>
          <h2><span>DINE</span> WITH<span> US</span></h2>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        
        <div className="footer-section">
          <h4>FIND US</h4>
          <p><FaMapMarkerAlt className="icon" /> crown palza,Malappuram</p>
          <p>Opp to information center</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

