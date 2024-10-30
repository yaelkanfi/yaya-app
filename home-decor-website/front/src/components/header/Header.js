import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaChair, FaBed, FaLightbulb } from 'react-icons/fa';
import { CartContext } from '../../CartContext';
import './Header.css';

const Header = () => {
  const { getCartCount } = useContext(CartContext);
  const cartCount = getCartCount();

  const categories = [
    { name: 'Furniture', icon: <FaChair />, subcategories: ['Sofas', 'Chairs', 'Tables'] },
    { name: 'Bedding', icon: <FaBed />, subcategories: ['Mattresses', 'Pillows', 'Blankets'] },
    { name: 'Lighting', icon: <FaLightbulb />, subcategories: ['Ceiling', 'Table Lamps', 'Outdoor'] },
  ];

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="header-title no-link-style">KBN</Link>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="I'M LOOKING FOR..." />
          <button><FaSearch /></button>
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="cart-icon-container">
          <FaShoppingCart className="cart-icon" size={24} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>

      {/* Categories */}
      <nav className="category-nav">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            <div className="subcategory-dropdown">
              {category.subcategories.map((sub, idx) => (
                <Link key={idx} to={`/products/${category.name}/${sub}`}>{sub}</Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Header;
