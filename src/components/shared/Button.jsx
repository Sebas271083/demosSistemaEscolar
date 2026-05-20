const Button = ({ children, type = 'button', variant = 'primary', disabled = false, onClick, className = '', ...props }) => {
  const variants = {
    primary: 'bg-slate-950 text-white hover:bg-slate-800',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700',
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-2xl px-5 py-3 font-semibold transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
