import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import styles from  './Cart.module.css';

function Cart() {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

    const handleIncrease = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity + 1);
    };

    const handleDecrease = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity - 1);
    };

    const checkout = () => {
        
    }

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const count = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <div className={styles.cart}>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cart.map(product => (
                    <div key={product._id} className={styles['cart-item']}>
                        <Link to={`/products/${product._id}`}>
                            <img 
                                src={`http://localhost:5000${product.imagePath}`} 
                                alt={product.name} 
                            />
                        </Link>

                        <div className={styles['name-quantity']}>
                            <Link to={`/products/${product._id}`} 
                                style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h3>{product.name}</h3>
                            </Link>

                            <div className={styles['quantity-control']}>
                                <button className={styles['quantity-button']} onClick={() => handleDecrease(product._id, product.quantity)}>-</button>
                                <span>{product.quantity}</span>
                                <button className={styles['quantity-button']} onClick={() => handleIncrease(product._id, product.quantity)}>+</button>
                            </div>

                        </div>

                        <div className={styles['price-remove']}>
                            <p>${product.price}</p>
                            <button className={styles['remove-button']} onClick={() => removeFromCart(product._id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))
            )}
            <div className={styles['clear-total']}>
                <div className={styles['total']}><p>Subtotal({count} items): ${total.toFixed(2)}</p></div>
            </div>
            <button className={styles['checkout-button']} onClick={() => checkout()}>CHECKOUT</button>
        </div>
    );
}

export default Cart;
