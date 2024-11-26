import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <div className="product-list">
                {products.map(product => (
                    <Link to={`/products/${product._id}`} key={product._id} className="product-card">
                        <img src={`http://localhost:5000${product.imageBase64}`} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Products;
