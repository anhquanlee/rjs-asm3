function Button({
  children,
  type = 'button',
  variant = 'unstyled',
  fullWidth = false,
  disabled = false,
  loading = false,
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-[#333] px-7 py-3 text-[14px] text-white hover:bg-black',
    outline:
      'border border-[#555] px-4 py-2 text-[12px] text-[#666] hover:bg-[#333] hover:text-white',
    text: 'text-[12px] text-[#777] hover:text-black',
    unstyled: '',
  };

  const variantClassName = variants[variant] ?? variants.unstyled;

  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[
        'cursor-pointer',
        'disabled:cursor-not-allowed disabled:opacity-40',
        variantClassName,
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
}

export default Button;
