import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { useInput } from '../hooks/useInput';
import { isEmail, isNotEmpty } from '../utils/validation';

function CheckoutPage() {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const listCart = useSelector((state) => state.cart.listCart);

  const [submitted, setSubmitted] = useState(false);

  const {
    value: fullNameValue,
    handleInputChange: handleFullNameChange,
    handleInputBlur: handleFullNameBlur,
    hasError: fullNameHasError,
    isValid: fullNameIsValid,
  } = useInput(currentUser?.fullName || '', isNotEmpty);

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
    isValid: emailIsValid,
  } = useInput(
    currentUser?.email || '',
    (value) => isEmail(value) && isNotEmpty(value)
  );

  const {
    value: phoneValue,
    handleInputChange: handlePhoneChange,
    handleInputBlur: handlePhoneBlur,
    hasError: phoneHasError,
    isValid: phoneIsValid,
  } = useInput(currentUser?.phone || '', isNotEmpty);

  const {
    value: addressValue,
    handleInputChange: handleAddressChange,
    handleInputBlur: handleAddressBlur,
    hasError: addressHasError,
    isValid: addressIsValid,
  } = useInput('', isNotEmpty);

  const total = listCart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }

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
      listCart.length === 0
    ) {
      return;
    }

    // Chức năng 11 chỉ yêu cầu giao diện và thông tin đơn hàng.
    // Chưa xử lý thanh toán hoặc gửi đơn hàng đến server.
  }

  if (!currentUser) {
    return (
      <Navigate to="/auth?mode=login" state={{ from: '/checkout' }} replace />
    );
  }

  return (
    <div className="w-full bg-white px-5 pb-20 italic">
      {/* Checkout banner */}
      <section className="flex min-h-45 items-center justify-between bg-[#f8f9fa] px-8 md:px-14">
        <h1 className="text-[30px] font-normal tracking-wide text-black">
          CHECKOUT
        </h1>

        <div className="flex items-center gap-2 text-[12px] tracking-wide">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="cursor-pointer text-black hover:text-[#e6ad50]"
          >
            HOME
          </button>

          <span className="text-[#aaa]">/</span>

          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="cursor-pointer text-black hover:text-[#e6ad50]"
          >
            CART
          </button>

          <span className="text-[#aaa]">/</span>

          <span className="text-[#aaa]">CHECKOUT</span>
        </div>
      </section>

      {/* Billing details */}
      <section className="mt-14">
        <h2 className="mb-8 text-[20px] font-normal tracking-wide text-black">
          BILLING DETAILS
        </h2>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,1fr)]">
          {/* Checkout form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label
                htmlFor="checkout-fullname"
                className="mb-3 block text-[12px] tracking-wide text-[#777]"
              >
                FULL NAME:
              </label>

              <input
                id="checkout-fullname"
                type="text"
                name="fullName"
                placeholder="Enter Your Full Name Here!"
                value={fullNameValue}
                onChange={handleFullNameChange}
                onBlur={handleFullNameBlur}
                aria-invalid={fullNameHasError}
                className={`h-12 w-full border px-4 text-[13px] not-italic text-[#666] outline-none placeholder:text-[#bbb] ${
                  fullNameHasError
                    ? 'border-red-500'
                    : 'border-[#ddd] focus:border-[#999]'
                }`}
              />

              {fullNameHasError && (
                <p className="mt-1 text-[12px] text-red-500">
                  Please enter your full name!
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="checkout-email"
                className="mb-3 block text-[12px] tracking-wide text-[#777]"
              >
                EMAIL:
              </label>

              <input
                id="checkout-email"
                type="email"
                name="email"
                placeholder="Enter Your Email Here!"
                value={emailValue}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                aria-invalid={emailHasError}
                className={`h-12 w-full border px-4 text-[13px] not-italic text-[#666] outline-none placeholder:text-[#bbb] ${
                  emailHasError
                    ? 'border-red-500'
                    : 'border-[#ddd] focus:border-[#999]'
                }`}
              />

              {emailHasError && (
                <p className="mt-1 text-[12px] text-red-500">
                  Please enter a valid email!
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="checkout-phone"
                className="mb-3 block text-[12px] tracking-wide text-[#777]"
              >
                PHONE NUMBER:
              </label>

              <input
                id="checkout-phone"
                type="tel"
                name="phone"
                placeholder="Enter Your Phone Number Here!"
                value={phoneValue}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                aria-invalid={phoneHasError}
                className={`h-12 w-full border px-4 text-[13px] not-italic text-[#666] outline-none placeholder:text-[#bbb] ${
                  phoneHasError
                    ? 'border-red-500'
                    : 'border-[#ddd] focus:border-[#999]'
                }`}
              />

              {phoneHasError && (
                <p className="mt-1 text-[12px] text-red-500">
                  Please enter your phone number!
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="checkout-address"
                className="mb-3 block text-[12px] tracking-wide text-[#777]"
              >
                ADDRESS:
              </label>

              <input
                id="checkout-address"
                type="text"
                name="address"
                placeholder="Enter Your Address Here!"
                value={addressValue}
                onChange={handleAddressChange}
                onBlur={handleAddressBlur}
                aria-invalid={addressHasError}
                className={`h-12 w-full border px-4 text-[13px] not-italic text-[#666] outline-none placeholder:text-[#bbb] ${
                  addressHasError
                    ? 'border-red-500'
                    : 'border-[#ddd] focus:border-[#999]'
                }`}
              />

              {addressHasError && (
                <p className="mt-1 text-[12px] text-red-500">
                  Please enter your address!
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={listCart.length === 0}
              className="cursor-pointer bg-[#333] px-7 py-3 text-[14px] text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              Place order
            </button>

            {submitted && listCart.length === 0 && (
              <p className="mt-3 text-[12px] text-red-500">
                Your shopping cart is empty.
              </p>
            )}
          </form>

          {/* Your order */}
          <aside className="bg-[#f8f9fa] px-7 py-9">
            <h2 className="mb-7 text-[20px] font-normal tracking-wide text-black">
              YOUR ORDER
            </h2>

            {listCart.length === 0 ? (
              <p className="text-[13px] text-[#999]">
                Your shopping cart is empty.
              </p>
            ) : (
              <div>
                {listCart.map(({ product, quantity }) => (
                  <div
                    key={product._id.$oid}
                    className="flex items-start justify-between gap-3 border-b border-[#ddd] py-3"
                  >
                    <span className="min-w-0 flex-1 text-[12px] leading-5 font-medium text-black">
                      {product.name}
                    </span>

                    <span className="shrink-0 text-right text-[11px] leading-5 text-[#aaa]">
                      {formatPrice(product.price)} VND x {quantity}
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-between gap-3 pt-4">
                  <span className="text-[13px] text-black">TOTAL</span>

                  <span className="text-right text-[15px] text-[#666]">
                    {formatPrice(total)} VND
                  </span>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}

export default CheckoutPage;
