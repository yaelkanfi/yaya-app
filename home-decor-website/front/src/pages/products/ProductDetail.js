import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { FaArrowLeft } from 'react-icons/fa';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setConfirmationMessage("Product added to cart successfully!");

        // Clear the message after a few seconds
        setTimeout(() => {
            setConfirmationMessage('');
        }, 1000); // 3 seconds
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-detail">
            {/* Back Button */}
            <div className="back-icon" onClick={() => navigate(-1)}>
                <FaArrowLeft size={24} /> {/* Icon */}
            </div>

            <img className="product-image" src={product.imageUrl} alt={product.name} />
            <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
            </div>
        </div>
    );
}

export default ProductDetail;
