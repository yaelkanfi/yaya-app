import { renderHook, act } from '@testing-library/react-hooks';
import { CartProvider, CartContext } from './CartContext';

test('addToCart adds an item to the cart', () => {
  const { result } = renderHook(() => React.useContext(CartContext), { wrapper: CartProvider });

  act(() => {
    result.current.addToCart({ _id: '1', name: 'Table', price: 200 });
  });

  expect(result.current.cart).toEqual([
    { productId: '1', name: 'Table', price: 200, quantity: 1 },
  ]);
});
