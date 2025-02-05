import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [activeMenuDetails, setActiveMenuDetails] = useState({ name: 'MENU', description: 'Select a menu to see its items.' });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menus/getMenus');
      setMenus(response.data);

      if (response.data.length > 0) {
        const firstMenu = response.data[0];
        setActiveMenu(firstMenu._id);
        setActiveMenuDetails({ name: firstMenu.name, description: firstMenu.description });
        fetchMenuItems(firstMenu._id);
      }
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const fetchMenuItems = async (menuId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/menus/getMenuById/${menuId}`);
      setMenuItems(response.data.items);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleMenuClick = (menuId) => {
    const selectedMenu = menus.find(menu => menu._id === menuId);
    setActiveMenu(menuId);
    setActiveMenuDetails({ name: selectedMenu.name, description: selectedMenu.description });
    fetchMenuItems(menuId);
  };

  return (
    <div className="menu-section">
      <h1 className="menu-title">{activeMenuDetails.name}</h1>
      <p className="menu-description">
        {activeMenuDetails.description || "No description available for this menu."}
      </p>

      <div className="menu-buttons">
        {menus.map((menu) => (
          <button
            key={menu._id}
            className={`menu-button ${activeMenu === menu._id ? 'active' : ''}`}
            onClick={() => handleMenuClick(menu._id)}
          >
            {menu.name}
          </button>
        ))}
      </div>

      <div className="menu-items">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item._id} className="menu-item">
              <h3>{item.name}</h3>
              <p className="price">${item.price.toFixed(2)}</p>
              <p className="description">{item.description}</p>
            </div>
          ))
        ) : (
          <p className="no-items">No items available for this menu.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;

