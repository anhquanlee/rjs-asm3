function BillingInput({ id, label, error, errorMessage, ...props }) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-3 block text-[12px] tracking-wide text-[#777]"
      >
        {label}
      </label>

      <input
        id={id}
        {...props}
        aria-invalid={Boolean(error)}
        className={`h-12 w-full border px-4 text-[13px] not-italic text-[#666] outline-none placeholder:text-[#bbb] ${
          error ? 'border-red-500' : 'border-[#ddd] focus:border-[#999]'
        }`}
      />

      {error && <p className="mt-1 text-[12px] text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default BillingInput;
