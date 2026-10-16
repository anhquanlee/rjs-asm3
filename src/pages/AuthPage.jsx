import { Navigate, useSearchParams } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/SignUp';

function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  if (mode === 'signup') {
    return <Signup />;
  }

  if (mode === 'login') {
    return <Login />;
  }

  return <Navigate to="/auth?mode=login" replace />;
}

export default AuthPage;
