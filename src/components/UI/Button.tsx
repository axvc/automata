import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}

const variantStyles = {
  primary: 'bg-accent-primary text-text-primary hover:bg-accent-primary/90 active:bg-accent-primary/80',
  secondary: 'bg-bg-tertiary text-text-primary hover:bg-bg-tertiary/80 active:bg-bg-tertiary/70 border border-bg-tertiary',
  ghost: 'bg-transparent text-text-secondary hover:bg-bg-tertiary/50 active:bg-bg-tertiary/70',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
};

export function Button({
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-mono font-medium rounded-md
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
