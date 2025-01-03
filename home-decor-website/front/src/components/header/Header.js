import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { CartContext } from '../../CartContext';
import styles from './Header.module.css';

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
    <header className={styles.header}>
      <div className={styles['header-top']}>
        <Link to="/" className={`${styles['header-title']} ${styles['no-link-style']}`}>KBN</Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className={styles['search-bar']}>
          <input type="text" placeholder="I'M LOOKING FOR..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
          <button><FaSearch /></button>
        </form>

        {/* Cart Icon */}
        <Link to="/cart" className={styles['cart-icon-container']}>
          <FaShoppingCart className={styles['cart-icon']} size={24} />
          {cartCount > 0 && <span className={styles['cart-count']}>{cartCount}</span>}
        </Link>
      </div>

      {/* Categories */}
      <nav className={styles['category-nav']}>
        {categories.map((category, index) => (
          <div key={index} className={styles['category-item']}>
            <span className={styles['category-name']}>{category.name}</span>
            <div className={styles['subcategory-dropdown']}>
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
