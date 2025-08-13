
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  colorClass: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, colorClass, className }) => {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
};
