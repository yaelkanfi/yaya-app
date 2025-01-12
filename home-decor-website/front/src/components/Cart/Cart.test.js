import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../../context/CartContext';
import Cart from './Cart';

test('renders cart with items and updates quantities', () => {
  const mockCart = [
    { _id: '1', name: 'Sofa', price: 100, quantity: 2, imagePath: '/sofa.jpg' },
  ];

  render(
    <CartProvider value={{ cart: mockCart }}>
      <Cart />
    </CartProvider>
  );

  // Check if item is rendered
  expect(screen.getByText('Sofa')).toBeInTheDocument();

  // Increase quantity
  const increaseButton = screen.getByText('+');
  fireEvent.click(increaseButton);

  // Check if quantity is updated
  expect(screen.getByText('3')).toBeInTheDocument();
});
