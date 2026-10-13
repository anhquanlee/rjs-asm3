import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import RootLayout from './components/RootLayout';
import ErrorPage from './pages/ErrorPage';
import AuthPage from './pages/AuthPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
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

  return <RouterProvider router={router} />;
}

export default App;
