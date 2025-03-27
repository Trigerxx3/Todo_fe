import React, { useState } from 'react';
import './Navbar.css'; // Importing the CSS for Navbar

const Navbar = ({ toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <h2>To-Do List App</h2>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </nav>
  );
};

export default Navbar;
