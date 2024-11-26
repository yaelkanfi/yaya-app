import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { CartContext } from '../../CartContext';
import './Header.css';

const Header = () => {

  const { getCartCount } = useContext(CartContext);
  const cartCount = getCartCount();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'Furniture', subcategories: ['Sofas', 'Chairs', 'Tables', 'Shelves'] },
    { name: 'Bedding', subcategories: ['Mattresses', 'Pillows', 'Blankets'] },
    { name: 'Lighting', subcategories: ['Ceiling', 'Table Lamps', 'Outdoor'] },
    { name: 'Bathroom', subcategories: ['Towles', 'Hooks', 'Dispansers'] },
    { name: 'Glasses', subcategories: ['Wine', 'Coffee', 'Servings'] },
  ];

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="header-title no-link-style">KBN</Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-bar">
          <input type="text" placeholder="I'M LOOKING FOR..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
          <button><FaSearch /></button>
        </form>

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
