
export default function ButtonComponent({className, children, onClick, disabled}) {
  return (
    <button
      className={`
        ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        text-base font-medium rounded-md px-3 py-2 shadow-sm
        `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
