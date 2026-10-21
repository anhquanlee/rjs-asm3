import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInput } from '../../hooks/useInput';
import { hasMinLength, isEmail, isNotEmpty } from '../../utils/validation';
import Button from '../ui/Button';
import Input from '../ui/Input';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const fullName = useInput('', isNotEmpty);
  const email = useInput('', (value) => isEmail(value) && isNotEmpty(value));
  const password = useInput('', (value) => hasMinLength(value, 9));
  const phone = useInput('', isNotEmpty);

  const fields = [
    {
      name: 'fullName',
      type: 'text',
      placeholder: 'Full Name',
      input: fullName,
      errorMessage: 'Please enter your full name!',
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      input: email,
      errorMessage: 'Please enter a valid email!',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      input: password,
      errorMessage: 'Password must contain more than 8 characters!',
    },
    {
      name: 'phone',
      type: 'tel',
      placeholder: 'Phone',
      input: phone,
      errorMessage: 'Please enter your phone number!',
    },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    fields.forEach(({ input }) => input.handleInputBlur());

    if (fields.some(({ input }) => !input.isValid)) {
      return;
    }

    const userArr = JSON.parse(localStorage.getItem('userArr') || '[]');
    const normalizedEmail = email.value.trim().toLowerCase();

    const emailExists = userArr.some((user) => user.email.toLowerCase() === normalizedEmail);

    if (emailExists) {
      setError('This email is already registered.');
      return;
    }

    const newUser = {
      fullName: fullName.value.trim(),
      email: normalizedEmail,
      password: password.value,
      phone: phone.value.trim(),
    };

    localStorage.setItem('userArr', JSON.stringify([...userArr, newUser]));

    navigate('/auth?mode=login');
  }

  return (
    <div className="flex min-h-135 w-full items-center justify-center bg-[#f3f4f7] px-4 py-8 italic">
      <div className="w-full max-w-100 rounded-xl bg-white px-8 py-10 shadow-lg md:px-10">
        <h1 className="mb-10 text-center text-[27px] font-light text-[#666]">Sign Up</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            {fields.map(({ input, errorMessage, ...field }) => (
              <Input
                key={field.name}
                {...field}
                aria-label={field.placeholder}
                value={input.value}
                onChange={input.handleInputChange}
                onBlur={input.handleInputBlur}
                error={input.hasError && errorMessage}
              />
            ))}
          </div>

          {error && <p className="mb-4 text-[13px] not-italic text-red-500">{error}</p>}

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
          <Button onClick={() => navigate('/auth?mode=login')} className="text-[#7699f5]">
            Click
          </Button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
