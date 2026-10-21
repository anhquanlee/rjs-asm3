import { useState } from 'react';

import { useInput } from '../../hooks/useInput';
import { isEmail, isNotEmpty } from '../../utils/validation';
import Button from '../ui/Button';
import Input from '../ui/Input';

function BillingDetails({ currentUser, isEmpty }) {
  const [submitted, setSubmitted] = useState(false);

  const fullName = useInput(currentUser.fullName || '', isNotEmpty);
  const email = useInput(currentUser.email || '', (value) => isEmail(value) && isNotEmpty(value));
  const phone = useInput(currentUser.phone || '', isNotEmpty);
  const address = useInput('', isNotEmpty);

  const fields = [
    {
      name: 'fullName',
      label: 'fullName',
      type: 'text',
      placeholder: 'Enter Your Full Name Here!',
      input: fullName,
      errorMessage: 'Please enter your full name!',
    },
    {
      name: 'email',
      label: 'email',
      type: 'email',
      placeholder: 'Enter Your Email Here!',
      input: email,
      errorMessage: 'Please enter a valid email!',
    },
    {
      name: 'phone',
      label: 'phone',
      type: 'tel',
      placeholder: 'Enter Your Phone Number Here!',
      input: phone,
      errorMessage: 'Please enter your phone number!',
    },
    {
      name: 'address',
      label: 'address',
      type: 'text',
      placeholder: 'Enter Your Address Here!',
      input: address,
      errorMessage: 'Please enter your address!',
    },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);

    fields.forEach(({ input }) => input.handleInputBlur());

    if (fields.some(({ input }) => !input.isValid) || isEmpty) {
      return;
    }

    // Chức năng 11 chưa yêu cầu gửi đơn hàng đến server.
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {fields.map(({ input, errorMessage, ...field }) => (
        <Input
          key={field.name}
          variant="checkout"
          value={input.value}
          onChange={input.handleInputChange}
          onBlur={input.handleInputBlur}
          error={input.hasError && errorMessage}
          {...field}
        />
      ))}

      <Button
        type="submit"
        disabled={isEmpty}
        className="bg-[#333] px-7 py-3 text-[14px] text-white hover:bg-black"
      >
        Place order
      </Button>

      {submitted && isEmpty && (
        <p className="mt-3 text-[12px] text-red-500">Your shopping cart is empty.</p>
      )}
    </form>
  );
}

export default BillingDetails;
