
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header = ({ title, subtitle, className }: HeaderProps) => {
  return (
    <header className={cn('mb-4', className)}>
      {title && (
        <h1 className="text-2xl font-bold text-unidoc-dark">{title}</h1>
      )}
      {subtitle && (
        <p className={cn("text-unidoc-medium", title ? "mt-1" : "")}>
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default Header;
