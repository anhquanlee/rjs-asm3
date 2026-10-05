import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import RootLayout from './components/RootLayout';
import ErrorPage from './pages/ErrorPage';
import AuthPage, { loader as requireAuth } from './pages/AuthPage';

// Hàm check auth dùng chung
function requireAuth() {
  const isLoggedIn = Boolean(localStorage.getItem('token')); // hoặc lấy từ context/store
  if (!isLoggedIn) {
    throw redirect('/login');
  }
  return null;
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      loader: requireAuth,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'auth',
          element: <AuthPage />,
          action: loginAction,
        },
        { path: 'shop', element: <ShopPage /> },
        { path: 'detail/:productId', element: <DetailPage /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'checkout', element: <CheckoutPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
