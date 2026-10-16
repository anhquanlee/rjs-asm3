import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import { useInput } from '../hooks/useInput';
import { ON_LOGIN } from '../store/authSlice';
import { loadUserCart, SET_CART } from '../store/cartSlice';
import { isEmail, isNotEmpty } from '../utils/validation';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [error, setError] = useState('');

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
    isValid: emailIsValid,
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    reset: resetPassword,
  } = useInput('', isNotEmpty);

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    handleEmailBlur();
    handlePasswordBlur();

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    const userArr = JSON.parse(localStorage.getItem('userArr') || '[]');

    const matchedUser = userArr.find(
      (user) =>
        user.email.toLowerCase() === emailValue.trim().toLowerCase() &&
        user.password === passwordValue
    );

    if (!matchedUser) {
      setError('Invalid email or password.');
      resetPassword();
      return;
    }

    const currentUser = {
      fullName: matchedUser.fullName,
      email: matchedUser.email,
      phone: matchedUser.phone,
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    dispatch(ON_LOGIN(currentUser));
    dispatch(SET_CART(loadUserCart(currentUser.email)));

    const from = location.state?.from;

    const redirectPath =
      typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')
        ? from
        : '/';

    navigate(redirectPath, { replace: true });
  }

  return (
    <div className="flex min-h-135 w-full items-center justify-center bg-[#f3f4f7] px-4 py-8 italic">
      <div className="w-full max-w-100 rounded-xl bg-white px-8 py-10 shadow-lg md:px-10">
        <h1 className="mb-10 text-center text-[27px] font-light text-[#666]">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <Input
              label="Email"
              id="login-email"
              type="email"
              name="email"
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              error={emailHasError && 'Please enter a valid email!'}
            />

            <Input
              label="Password"
              id="login-password"
              type="password"
              name="password"
              value={passwordValue}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={passwordHasError && 'Please enter your password!'}
            />
          </div>

          {error && (
            <p className="mb-4 text-[13px] not-italic text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="h-12 w-full cursor-pointer bg-[#444] text-[13px] not-italic text-white hover:bg-[#333]"
          >
            SIGN IN
          </button>
        </form>

        <p className="mt-8 text-center text-[13px] text-[#aaa]">
          Create an account?{' '}
          <button
            type="button"
            onClick={() =>
              navigate('/auth?mode=signup', {
                state: location.state,
              })
            }
            className="cursor-pointer text-[#7699f5]"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
