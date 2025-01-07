import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import styles from  './Cart.module.css';
import productStyles from '../Products/ProductDetail'

function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

    const handleIncrease = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity + 1);
    };

    const handleDecrease = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity - 1);
    };

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

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
                                className={productStyles['product-image']} 
                                src={`http://localhost:5000${product.imagePath}`} 
                                alt={product.name} 
                            />
                        </Link>
                        <div>
                            <Link 
                                to={`/products/${product._id}`} 
                                className={styles['product-name-link']}
                                style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h3>{product.name}</h3>
                            </Link>
                            <p>Price: ${product.price}</p>
                            <div className={styles['quantity-control']}>
                                <button onClick={() => handleDecrease(product._id, product.quantity)}>-</button>
                                <span>{product.quantity}</span>
                                <button onClick={() => handleIncrease(product._id, product.quantity)}>+</button>
                            </div>
                            <div>
                                <button onClick={() => removeFromCart(product._id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <div><button onClick={() => clearCart()}>Clear Cart</button></div>
            <h2>Total: ${total.toFixed(2)}</h2>
        </div>
    );
}

export default Cart;
