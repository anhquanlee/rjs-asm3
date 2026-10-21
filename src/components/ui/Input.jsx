function Input({ label, error, variant = 'auth', className = '', ...props }) {
  const hasError = Boolean(error);
  const isCheckout = variant === 'checkout';

  const inputClassName = isCheckout
    ? `h-12 w-full border px-4 text-[13px] not-italic text-[#666] outline-none placeholder:text-[#bbb] ${
        hasError ? 'border-red-500' : 'border-[#ddd] focus:border-[#999]'
      }`
    : `h-13 w-full border px-5 text-[13px] not-italic outline-none ${
        hasError ? 'border-red-500' : 'border-[#e5e5e5] focus:border-[#999]'
      }`;

  return (
    <div className={`w-full ${isCheckout ? 'mb-5' : ''}`}>
      {label && (
        <label htmlFor={props.id} className="mb-3 block text-[12px] tracking-wide text-[#777]">
          {label}
        </label>
      )}

      <input {...props} aria-invalid={hasError} className={`${inputClassName} ${className}`} />

      {hasError && typeof error === 'string' && (
        <p className="mt-1 text-[12px] not-italic text-red-500">{error}</p>
      )}
    </div>
  );
}

export default Input;
