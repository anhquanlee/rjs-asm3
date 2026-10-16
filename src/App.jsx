import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './components/RootLayout';
import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import DetailPage from './pages/DetailPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';

const API_URL =
  'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74';

async function productsLoader() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Response('Failed to fetch products.', {
      status: response.status,
    });
  }

  return response.json();
}

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: productsLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: 'shop',
        element: <ShopPage />,
      },
      {
        path: 'detail/:productId',
        element: <DetailPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
