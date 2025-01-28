import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { FaArrowLeft } from 'react-icons/fa';
import CartModal from '../../components/CartModal/CartModal';
import styles from './ProductDetail.module.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { addToCart, cart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setIsModalVisible(true);

        // Automatically close modal after a few seconds
        setTimeout(() => {
            setIsModalVisible(false);
        }, 3000); // 3 seconds
    };

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <div className={styles['back-icon']} onClick={() => navigate(-1)}>
                <FaArrowLeft size={24} />
            </div>

            <div className={styles['product-detail']}>
                <img className={styles['product-image']} src={`http://localhost:5000${product.imagePath}`} alt={product.name} />
                <div className={styles['product-info']}>
                    <p className={styles['product-description']}>{product.description}</p>
                    <p className={styles['product-price']}>${product.price}</p>

                    <p className={styles['quantity-name']}>Quantity</p>
                    <div className={styles['quantity-picker']}>
                        <button className={styles['quantity-button']} onClick={decreaseQuantity}>-</button>
                        <span className={styles['quantity-display']}>{quantity}</span>
                        <button className={styles['quantity-button']} onClick={increaseQuantity}>+</button>
                    </div>

                    {product.stock > 0 ? (
                        <>
                            <button 
                                className={styles['add-to-cart-button']} 
                                onClick={handleAddToCart}
                            >
                                ADD TO CART
                            </button>
                        </>
                    ) : (
                        <button 
                            className={styles['add-to-cart-button']} 
                            disabled 
                            style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}
                        >
                            Out of Stock
                        </button>
                    )}
                </div>

                {isModalVisible && <CartModal cart={cart} onClose={() => setIsModalVisible(false)} />}
            </div>
        </div>
    );
}

export default ProductDetail;
