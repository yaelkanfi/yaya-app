import React, { useEffect, useState } from 'react';
import {Link,  useParams } from 'react-router-dom';
import './Products.css';

function SubcategoryPage() {
    const { category, subcategory } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${category}/${subcategory}`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, [subcategory]);  

    return (
        <div>
            <h1>{subcategory}</h1>
            <div className="product-list">
                {products.map(product => (
                    <Link to={`/products/${product._id}`} key={product._id} className="product-card">
                        <img src={`data:image/png;base64, ${product.imageBase64}`} 
                            alt={product.name} 
                            style={{ maxWidth: '100%', maxHeight: '200px' }} // Ensure image fits 
                            />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SubcategoryPage;
