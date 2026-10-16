import { useState } from 'react';

function Input({
  id,
  label,
  showLabel = false,
  placeholder,
  error,
  validate,
  validationMessage = 'Invalid value.',
  variant = 'auth',
  className = '',
  containerClassName = '',
  value,
  defaultValue,
  onBlur,
  ...props
}) {
  const [touched, setTouched] = useState(false);

  const validationFailed =
    typeof validate === 'function' &&
    touched &&
    !validate(String(value ?? defaultValue ?? ''));

  // If error is provided, external validation takes priority.
  const hasError = error !== undefined ? Boolean(error) : validationFailed;

  const errorText =
    typeof error === 'string' ? error : hasError ? validationMessage : '';

  const isCheckout = variant === 'checkout';

  const inputClassName = isCheckout
    ? `h-12 w-full border px-4 text-[13px] not-italic text-[#666] outline-none placeholder:text-[#bbb] ${
        hasError ? 'border-red-500' : 'border-[#ddd] focus:border-[#999]'
      }`
    : `h-13 w-full border px-5 text-[13px] not-italic outline-none ${
        hasError ? 'border-red-500' : 'border-[#e5e5e5] focus:border-[#999]'
      }`;

  function handleBlur(event) {
    setTouched(true);
    onBlur?.(event);
  }

  return (
    <div className={`w-full ${isCheckout ? 'mb-5' : ''} ${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className={
            showLabel
              ? 'mb-3 block text-[12px] tracking-wide text-[#777]'
              : 'sr-only'
          }
        >
          {label}
        </label>
      )}

      <input
        {...props}
        id={id}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder ?? label}
        onBlur={handleBlur}
        aria-invalid={hasError}
        aria-label={!label ? props['aria-label'] : undefined}
        className={`${inputClassName} ${className}`}
      />

      {hasError && errorText && (
        <p className="mt-1 text-[12px] not-italic text-red-500">{errorText}</p>
      )}
    </div>
  );
}

export default Input;
