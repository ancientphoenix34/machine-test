import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Listmenu.css';

const Listmenu = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menus/deleteMenu/${id}`);
      fetchMenus(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-menu/${id}`); // Redirect to Edit Menu page with the menu ID
  };

  return (
    <div className="container">
      <div className="table-container">
        <h2 className="title">List of Menus</h2>
        <table className="menu-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu._id}>
                <td>{menu.name}</td>
                <td>{menu.description}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(menu._id)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(menu._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listmenu;
