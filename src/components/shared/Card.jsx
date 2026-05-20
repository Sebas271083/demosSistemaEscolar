const Card = ({ children, className = '', onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </div>
);
export default Card;
