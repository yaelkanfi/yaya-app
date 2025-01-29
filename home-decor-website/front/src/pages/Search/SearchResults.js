import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../Products/Products.module.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      fetch(`http://localhost:5000/api/products/search?query=${encodeURIComponent(query)}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch search results');
          return response.json();
        })
        .then(data => {
          setResults(data);
        })
        .catch(error => console.error('Error fetching search results:', error));
    }
  }, [query]);

  return (
    <div className={styles['search-results']}>
      <h2>Search Results for "{query}"</h2>
      <div className={styles['product-list']}>
        {results.length > 0 ? (
          results.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id} className={styles['product-card']}>
              <div className={styles['image-container']}>
                <img
                  src={`http://localhost:5000${product.imagePath}`}
                  alt={product.name}
                  className={styles['product-image']}
                />
                {product.stock === 0 && (
                  <div className={styles['out-of-stock-overlay']}>
                    <span className={styles['out-of-stock-text']}>Out of Stock</span>
                  </div>
                )}
              </div>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </Link>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
