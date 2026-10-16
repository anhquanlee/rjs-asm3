function Input({ label, id, error, ...props }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <input
        id={id}
        placeholder={label}
        {...props}
        aria-invalid={Boolean(error)}
        className={`h-13 w-full border px-5 text-[13px] not-italic outline-none ${
          error ? 'border-red-500' : 'border-[#e5e5e5] focus:border-[#999]'
        }`}
      />

      {error && (
        <p className="mt-1 text-[12px] not-italic text-red-500">{error}</p>
      )}
    </div>
  );
}

export default Input;
