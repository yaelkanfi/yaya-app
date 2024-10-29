import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../../CartContext';
import './Header.css';

const Header = () => {

  const { getCartCount} = useContext(CartContext);
  const cartCount = getCartCount();

  return (
    <header className="header">
      <h1>Home Decor</h1>
      <nav>
        <Link to="/">Home</Link> {/* Use Link instead of a */}
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className="cart-icon-container">
          <FaShoppingCart className="cart-icon" size={24} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
        {/* Add more navigation links as needed */}
      </nav>
    </header>
  );
};

export default Header;
