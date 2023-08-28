import { FC } from 'react';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  className,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer   ${className} ${
        disabled && 'opacity-50 cursor-not-allowed'
      } `}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
