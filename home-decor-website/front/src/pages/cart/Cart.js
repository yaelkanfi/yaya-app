import React, { useContext } from 'react';
import { CartContext } from '../../CartContext';
import './Cart.css';

function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

    const handleIncrease = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity + 1);
    };

    const handleDecrease = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity - 1);
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cart.map(product => (
                    <div key={product._id} className="cart-item">
                        <img src={product.imageUrl} alt={product.name} />
                        <div>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <div className="quantity-control">
                                <button onClick={() => handleDecrease(product._id, product.quantity)}>-</button>
                                <span>{product.quantity}</span>
                                <button onClick={() => handleIncrease(product._id, product.quantity)}>+</button>
                            </div>
                            <div>
                                <button onClick={() => removeFromCart(product._id)}>Remove</button>
                                <button onClick={() => clearCart(product._id)}>Clear Cart</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <h2>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h2>
        </div>
    );
}

export default Cart;