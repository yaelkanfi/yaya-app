import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Products.css';

function SubcategoryPage() {
    const { subcategory } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/subcategory/${subcategory}`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, [subcategory]);

    return (
        <div>
            <h1>{subcategory}</h1>
            <div className="product-list">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubcategoryPage;
