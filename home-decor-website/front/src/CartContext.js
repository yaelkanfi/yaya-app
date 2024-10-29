import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Check if there's a cart in localStorage, otherwise start with an empty array
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Sync cart state with localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Add item to cart
    const addToCart = (product, quantity = 1) => {
        const existingItem = cart.find(item => item.productId === product._id);
        if (existingItem) {
            // If item exists, update the quantity
            setCart(cart.map(item =>
                item.productId === product._id ? { ...item, quantity: item.quantity + quantity } : item
            ));
        } else {
            // If item doesn't exist, add a new one
            setCart([...cart, { productId: product._id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity }]);
        }
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.productId !== productId));
    };

    // Clear cart
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
