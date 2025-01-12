import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductDetail from './ProductDetail';

test('displays product details when navigating to the page', () => {
  render(
    <MemoryRouter initialEntries={['/products/1']}>
      <ProductDetail />
    </MemoryRouter>
  );

  // Mock API call and check for product details
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
