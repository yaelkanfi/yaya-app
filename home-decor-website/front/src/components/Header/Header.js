import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import styles from './Header.module.css';

const Header = () => {

  const { getCartCount } = useContext(CartContext);
  const cartCount = getCartCount();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = useState(null);

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
          <FaShoppingBag size={24} />
          {cartCount > 0 && <span className={styles['cart-count']}>{cartCount}</span>}
        </Link>
      </div>

      {/* Categories */}
      <nav className={styles['category-nav']}>
        {categories.map((category, index) => {
          const isOpen = openCategory === category.name;

          return (
            <div
              key={index}
              className={styles['category-item']}
              onMouseEnter={() => setOpenCategory(category.name)}
              onMouseLeave={() => setOpenCategory(null)}
            >
              <span className={styles['category-name']}>
                {category.name}
                {isOpen ? (
                  <FaChevronUp className={styles['chevron-icon']} />
                ) : (
                  <FaChevronDown className={styles['chevron-icon']} />
                )}
              </span>

              {isOpen && (
                <div className={styles['subcategory-dropdown']}>
                  {category.subcategories.map((sub, idx) => (
                    <Link key={idx} to={`/products/${category.name}/${sub}`} className={styles['subcategory-item']}>
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

    </header>
  );
};

export default Header;
