import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInput } from '../../hooks/useInput';
import { hasMinLength, isEmail, isNotEmpty } from '../../utils/validation';
import Button from '../ui/Button';
import Input from '../ui/Input';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    value: fullNameValue,
    handleInputChange: handleFullNameChange,
    handleInputBlur: handleFullNameBlur,
    hasError: fullNameHasError,
    isValid: fullNameIsValid,
  } = useInput('', isNotEmpty);

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
  } = useInput('', (value) => hasMinLength(value, 9));

  const {
    value: phoneValue,
    handleInputChange: handlePhoneChange,
    handleInputBlur: handlePhoneBlur,
    hasError: phoneHasError,
    isValid: phoneIsValid,
  } = useInput('', isNotEmpty);

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    handleFullNameBlur();
    handleEmailBlur();
    handlePasswordBlur();
    handlePhoneBlur();

    if (
      !fullNameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !phoneIsValid
    ) {
      return;
    }

    const userArr = JSON.parse(localStorage.getItem('userArr') || '[]');
    const email = emailValue.trim().toLowerCase();

    const emailExists = userArr.some(
      (user) => user.email.toLowerCase() === email
    );

    if (emailExists) {
      setError('This email is already registered.');
      return;
    }

    const newUser = {
      fullName: fullNameValue.trim(),
      email,
      password: passwordValue,
      phone: phoneValue.trim(),
    };

    userArr.push(newUser);

    localStorage.setItem('userArr', JSON.stringify(userArr));

    navigate('/auth?mode=login');
  }

  return (
    <div className="flex min-h-135 w-full items-center justify-center bg-[#f3f4f7] px-4 py-8 italic">
      <div className="w-full max-w-100 rounded-xl bg-white px-8 py-10 shadow-lg md:px-10">
        <h1 className="mb-10 text-center text-[27px] font-light text-[#666]">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <Input
              id="signup-fullname"
              label="Full Name"
              type="text"
              name="fullName"
              value={fullNameValue}
              onChange={handleFullNameChange}
              onBlur={handleFullNameBlur}
              error={fullNameHasError && 'Please enter your full name!'}
            />

            <Input
              id="signup-email"
              label="Email"
              type="email"
              name="email"
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              error={emailHasError && 'Please enter a valid email!'}
            />

            <Input
              id="signup-password"
              label="Password"
              type="password"
              name="password"
              value={passwordValue}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={
                passwordHasError &&
                'Password must contain more than 8 characters!'
              }
            />

            <Input
              id="signup-phone"
              label="Phone"
              type="tel"
              name="phone"
              value={phoneValue}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              error={phoneHasError && 'Please enter your phone number!'}
            />
          </div>

          {error && (
            <p className="mb-4 text-[13px] not-italic text-red-500">{error}</p>
          )}

          <Button
            type="submit"
            fullWidth
            className="h-12 bg-[#444] text-[13px] not-italic text-white hover:bg-[#333]"
          >
            SIGN UP
          </Button>
        </form>

        <p className="mt-8 text-center text-[13px] text-[#aaa]">
          Login?{' '}
          <Button
            onClick={() => navigate('/auth?mode=login')}
            className="text-[#7699f5]"
          >
            Click
          </Button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
