import React, { useContext } from 'react';
import { CartContext } from '../../CartContext';

function CartPage() {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);

    return (
        <div>
            <h1>Cart</h1>
            <button onClick={clearCart}>Clear Cart</button>
            {cart.map(item => (
                <div key={item.productId}>
                    <img src={item.imageUrl} alt={item.name} />
                    <h2>{item.name}</h2>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                </div>
            ))}
            <h2>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h2>
        </div>
    );
}

export default CartPage;
