import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../products/Products.css';

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
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      <div className="product-list">
        {results.length > 0 ? (
          results.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
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
