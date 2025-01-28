import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import styles from './Cart.module.css';

function Cart() {
    const { cart, setCart, removeFromCart, updateQuantity } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(true);
    const [hasOutOfStock, setHasOutOfStock] = useState(false);

    useEffect(() => {
        const fetchUpdatedCart = async () => {
            try {
                const updatedCart = await Promise.all(
                    cart.map(async (item) => {
                        const response = await fetch(`http://localhost:5000/api/products/${item._id}`);
                        const updatedProduct = await response.json();
                        return { ...item, stock: updatedProduct.stock };
                    })
                );
                setCart(updatedCart);
                setHasOutOfStock(updatedCart.some(product => product.stock === 0));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching updated cart products:', error);
                setIsLoading(false);
            }
        };

        fetchUpdatedCart();
    }, [cart, setCart]);

    const handleIncrease = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity + 1);
    };

    const handleDecrease = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity - 1);
    };

    const checkout = () => {
        {/* to implement */ }
    }

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const count = cart.reduce((count, item) => count + item.quantity, 0);

    if (isLoading) return <p>Loading cart...</p>;

    return (
        <div className={styles.cart}>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cart.map(product => (
                    <div key={product._id} className={styles['cart-item']}>
                        <div className={styles['image-container']}>
                            <Link to={`/products/${product._id}`}>
                                <img
                                    src={`http://localhost:5000${product.imagePath}`}
                                    alt={product.name}
                                />
                                {product.stock === 0 && (
                                    <div className={styles['out-of-stock-badge']}>
                                        Out of Stock
                                    </div>
                                )}
                            </Link>
                        </div>

                        <div className={styles['name-quantity']}>
                            <Link to={`/products/${product._id}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h3>{product.name}</h3>
                            </Link>

                            <div className={styles['quantity-control']}>
                                <button className={styles['quantity-button']} disabled={product.stock === 0} onClick={() => handleDecrease(product._id, product.quantity)}>-</button>
                                <span>{product.quantity}</span>
                                <button className={styles['quantity-button']} disabled={product.stock === 0} onClick={() => handleIncrease(product._id, product.quantity)}>+</button>
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
            <button
                className={styles['checkout-button']}
                onClick={checkout}
                disabled={hasOutOfStock || count === 0}
                style={hasOutOfStock ? { backgroundColor: '#ccc', cursor: 'not-allowed' } : {}}
            >
                {hasOutOfStock ? 'Some Items Are Out of Stock' : 'CHECKOUT'}
            </button>
        </div>
    );
}

export default Cart;
