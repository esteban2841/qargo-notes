
interface ButtonProps {
    children: ReactNode,
    variant: 'primary' | 'secondary' | 'ghost',
}

export const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600',
    ghost: 'bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white',
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};