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

    const getCartCount = () => {
        return cart.length > 0 ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
    };

    // Add item to cart
    const addToCart = (product, quantity = 1) => {
        const existingItem = cart.find(item => item._id === product._id);
        if (existingItem) {
            // If item exists, update the quantity
            setCart(cart.map(item =>
                item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
            ));
        } else {
            // If item doesn't exist, add a new one
            setCart([...cart, { _id: product._id, name: product.name, price: product.price, imagePath: product.imagePath, quantity , stock: product.stock}]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId));
    };
    
    const updateQuantity = (productId, quantity) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    // Clear cart
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, setCart, getCartCount, addToCart, removeFromCart, updateQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};
