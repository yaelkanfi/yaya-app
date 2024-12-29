import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Products.module.css';

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
            <div className={styles['product-list']}>
                {products.map(product => (
                    <Link to={`/products/${product._id}`} key={product._id} className={styles['product-card']}>
                        <img src={`http://localhost:5000${product.imagePath}`} alt={product.name} />
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
