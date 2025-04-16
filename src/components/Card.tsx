
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'glass' | 'gradient' | 'success' | 'warning' | 'error' | 'info';
  interactive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  badge?: React.ReactNode;
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const Card = ({
  variant = 'default',
  interactive = false,
  disabled = false,
  className,
  children,
  badge,
  badgePosition = 'top-right',
  ...props
}: CardProps) => {
  const baseStyles = 'rounded-xl transition-all duration-300 relative shadow-sm'; // Added 'relative' for badge positioning and consistent shadow
  
  const variantStyles = {
    default: 'bg-white text-card-foreground border border-unidoc-light-gray',
    outline: 'bg-transparent border border-unidoc-light-gray',
    glass: 'glass-effect',
    gradient: 'bg-card-gradient-blue border border-blue-200',
    success: 'bg-card-gradient-success border border-green-200',
    warning: 'bg-card-gradient-warning border border-amber-200',
    error: 'bg-card-gradient-error border border-red-200',
    info: 'bg-card-gradient-info border border-blue-200'
  };
  
  const interactiveStyles = interactive 
    ? 'hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer' 
    : '';
  
  const disabledStyles = disabled 
    ? 'opacity-60 pointer-events-none' 
    : '';

  const badgePositionStyles = {
    'top-right': 'top-2 right-2',
    'top-left': 'top-2 left-2',
    'bottom-right': 'bottom-2 right-2',
    'bottom-left': 'bottom-2 left-2'
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        interactiveStyles,
        disabledStyles,
        className
      )}
      {...props}
    >
      {children}
      {badge && (
        <div className={cn('absolute z-10', badgePositionStyles[badgePosition])}>
          {badge}
        </div>
      )}
    </div>
  );
};

export default Card;
