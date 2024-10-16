import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
        <h1>Home Decor</h1>
        <nav>
            <Link to="/">Home</Link> {/* Use Link instead of a */}
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>
            {/* Add more navigation links as needed */}
        </nav>
    </header>
  );
};

export default Header;
