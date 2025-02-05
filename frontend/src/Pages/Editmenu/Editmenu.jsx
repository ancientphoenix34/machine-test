import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Editmenu.css';

const Editmenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState({ name: '', description: '' });
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMenuDetails();
  }, [id]);

  const fetchMenuDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/menus/getMenuById/${id}`);
      setMenuData({
        name: response.data.name || '',
        description: response.data.description || '',
      });
    } catch (error) {
      console.error('Error fetching menu details:', error);
      setMessage('Error fetching menu details.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only send updated fields, fallback to old values if not edited
      const updatedData = {
        name: formData.name || menuData.name,
        description: formData.description || menuData.description,
      };

      await axios.put(`http://localhost:5000/api/menus/updateMenu/${id}`, updatedData);
      setMessage('Menu updated successfully!');
      setTimeout(() => navigate('/list-menu'), 1500);
    } catch (error) {
      console.error('Error updating menu:', error);
      setMessage('Error updating menu. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title">Edit Menu</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder={menuData.name || "Menu Name"} // Placeholder shows the current value
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="description"
            placeholder={menuData.description || "Menu Description"} // Placeholder shows the current value
            value={formData.description}
            onChange={handleChange}
            className="input-field"
          />
          <button type="submit" className="submit-button">
            Update Menu
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Editmenu;