import { render, screen } from '@testing-library/react';
import App from './App';
import ShopContextProvider from './Context/ShopContext';

test('renders the e-commerce application', () => {
  render(
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  );

  expect(screen.getByText(/shop/i)).toBeInTheDocument();
});
