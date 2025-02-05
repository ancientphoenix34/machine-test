import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Listmenuitem.css';

const Listmenuitem = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menuitem/getMenuItems');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menuitem/deleteMenuItem/${id}`);
      fetchMenuItems(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-menuitem/${id}`); // Navigate to Edit Menu Item page with the item ID
  };

  return (
    <div className="container">
      <div className="table-container">
        <h2 className="title">List of Menu Items</h2>
        <table className="menu-item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(item._id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listmenuitem;
