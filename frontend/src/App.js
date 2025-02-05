import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Nav/Navbar';
import Menu from './Components/Menu/Menu';
import Footer from './Components/Footer/Footer';
import AddMenu from './Pages/Addmenu/Addmenu';
import ListMenu from './Pages/Listmenu/Listmenu';
import Editmenu from './Pages/Editmenu/Editmenu';
import Addmenuitem from './Pages/Addmenuitem/Addmenuitem';
import Listmenuitem from './Pages/Listmenuitem/Listmenuitem';
import Editmenuitem from './Pages/Editmenuitems/Editmenuitem';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/add-menu" element={<AddMenu />} />
        <Route path="/list-menu" element={<ListMenu />} />
        <Route path="/edit-menu/:id" element={<Editmenu />} />
        <Route path="/add-menu-item" element={<Addmenuitem />} />
        <Route path="/list-menu-item" element={<Listmenuitem />} />
        <Route path="/edit-menuitem/:id" element={<Editmenuitem/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;



