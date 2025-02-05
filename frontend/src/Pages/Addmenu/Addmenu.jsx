import React, { useState } from 'react';
import axios from 'axios';
import './Addmenu.css';
import Navbar from '../../Components/Nav/Navbar';

const AddMenu = () => {
  const [menuData, setMenuData] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://machine-test-backend-yd4v.onrender.com/api/menus/createMenu', menuData);
      setMessage('Menu created successfully!');
      setMenuData({ name: '', description: '' });
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    
    <div className="container">
      <div className="form-container">
        <h2 className="title">Add New Menu</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder="Menu Name"
            value={menuData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="description"
            placeholder="Menu Description"
            value={menuData.description}
            onChange={handleChange}
            className="input-field"
          />
          <button
            type="submit"
            className="submit-button"
          >
            Add Menu
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default AddMenu;
