import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Editmenuitem.css';

const Editmenuitem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuItemData, setMenuItemData] = useState({ name: '', description: '', price: '' });
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMenuItemDetails();
  }, [id]);

  const fetchMenuItemDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/menuitem/getMenuItems`);
      const item = response.data.find(item => item._id === id);
      if (item) {
        setMenuItemData(item);
      }
    } catch (error) {
      console.error('Error fetching menu item details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: formData.name || menuItemData.name,
        description: formData.description || menuItemData.description,
        price: formData.price || menuItemData.price,
      };

      await axios.put(`http://localhost:5000/api/menuitem/updateMenuItem/${id}`, updatedData);
      setMessage('Menu item updated successfully!');
      setTimeout(() => navigate('/list-menuitem'), 1500);
    } catch (error) {
      console.error('Error updating menu item:', error);
      setMessage('Error updating menu item. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title">Edit Menu Item</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder={menuItemData.name || "Item Name"}
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="description"
            placeholder={menuItemData.description || "Item Description"}
            value={formData.description}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="number"
            name="price"
            placeholder={menuItemData.price || "Price"}
            value={formData.price}
            onChange={handleChange}
            required
            className="input-field"
          />
          <button type="submit" className="submit-button">
            Update Menu Item
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Editmenuitem;
