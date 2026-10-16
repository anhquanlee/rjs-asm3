import { useState } from 'react';

import { useInput } from '../../hooks/useInput';
import { isEmail, isNotEmpty } from '../../utils/validation';
import Button from '../ui/Button';
import Input from '../ui/Input';

function BillingDetails({ currentUser, isEmpty }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    value: fullNameValue,
    handleInputChange: handleFullNameChange,
    handleInputBlur: handleFullNameBlur,
    hasError: fullNameHasError,
    isValid: fullNameIsValid,
  } = useInput(currentUser.fullName || '', isNotEmpty);

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
    isValid: emailIsValid,
  } = useInput(
    currentUser.email || '',
    (value) => isEmail(value) && isNotEmpty(value)
  );

  const {
    value: phoneValue,
    handleInputChange: handlePhoneChange,
    handleInputBlur: handlePhoneBlur,
    hasError: phoneHasError,
    isValid: phoneIsValid,
  } = useInput(currentUser.phone || '', isNotEmpty);

  const {
    value: addressValue,
    handleInputChange: handleAddressChange,
    handleInputBlur: handleAddressBlur,
    hasError: addressHasError,
    isValid: addressIsValid,
  } = useInput('', isNotEmpty);

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);

    handleFullNameBlur();
    handleEmailBlur();
    handlePhoneBlur();
    handleAddressBlur();

    if (
      !fullNameIsValid ||
      !emailIsValid ||
      !phoneIsValid ||
      !addressIsValid ||
      isEmpty
    ) {
      return;
    }

    // Chức năng 11 chưa yêu cầu gửi đơn hàng đến server.
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        variant="checkout"
        showLabel
        id="checkout-fullname"
        label="FULL NAME:"
        type="text"
        name="fullName"
        placeholder="Enter Your Full Name Here!"
        value={fullNameValue}
        onChange={handleFullNameChange}
        onBlur={handleFullNameBlur}
        error={fullNameHasError && 'Please enter your full name!'}
      />

      <Input
        variant="checkout"
        showLabel
        id="checkout-email"
        label="EMAIL:"
        type="email"
        name="email"
        placeholder="Enter Your Email Here!"
        value={emailValue}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        error={emailHasError && 'Please enter a valid email!'}
      />

      <Input
        variant="checkout"
        showLabel
        id="checkout-phone"
        label="PHONE NUMBER:"
        type="tel"
        name="phone"
        placeholder="Enter Your Phone Number Here!"
        value={phoneValue}
        onChange={handlePhoneChange}
        onBlur={handlePhoneBlur}
        error={phoneHasError && 'Please enter your phone number!'}
      />

      <Input
        variant="checkout"
        showLabel
        id="checkout-address"
        label="ADDRESS:"
        type="text"
        name="address"
        placeholder="Enter Your Address Here!"
        value={addressValue}
        onChange={handleAddressChange}
        onBlur={handleAddressBlur}
        error={addressHasError && 'Please enter your address!'}
      />

      <Button
        type="submit"
        disabled={isEmpty}
        className="bg-[#333] px-7 py-3 text-[14px] text-white hover:bg-black"
      >
        Place order
      </Button>

      {submitted && isEmpty && (
        <p className="mt-3 text-[12px] text-red-500">
          Your shopping cart is empty.
        </p>
      )}
    </form>
  );
}

export default BillingDetails;
