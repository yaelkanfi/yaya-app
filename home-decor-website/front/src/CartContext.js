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

     // Get the number of items in the cart
     const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
    };

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
            setCart([...cart, { productId: product._id, name: product.name, price: product.price, imageBase64: product.imageBase64, quantity }]);
        }
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId));
    };

    //update quantity of existing product
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
        <CartContext.Provider value={{ cart, getCartCount, addToCart, removeFromCart, updateQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};
