import { ReactNode } from 'react';

interface LoadingButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isProcessing?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const LoadingButton = ({ 
  children, 
  onClick, 
  className = '', 
  isProcessing = false,
  type = 'button',
  disabled = false
}: LoadingButtonProps) => {
  return (
    <button 
      type={type}
      onClick={onClick} 
      className={className} 
      disabled={isProcessing || disabled}
    >
      {isProcessing ? (
        <div className="inline-block w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
