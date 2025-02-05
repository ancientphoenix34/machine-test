import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Addmenuitem.css';

const Addmenuitem = () => {
  const [menuItemData, setMenuItemData] = useState({ name: '', description: '', price: '', menuId: '' });
  const [menus, setMenus] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menus/getMenus');
      setMenus(response.data);
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItemData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/menuitem/createMenuItem', menuItemData);
      setMessage('Menu item added successfully!');
      setMenuItemData({ name: '', description: '', price: '', menuId: '' });
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title">Add Menu Item</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={menuItemData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="description"
            placeholder="Item Description"
            value={menuItemData.description}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={menuItemData.price}
            onChange={handleChange}
            required
            className="input-field"
          />
          <select
            name="menuId"
            value={menuItemData.menuId}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select Menu</option>
            {menus.map((menu) => (
              <option key={menu._id} value={menu._id}>
                {menu.name}
              </option>
            ))}
          </select>
          <button type="submit" className="submit-button">
            Add Menu Item
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Addmenuitem;