import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant: 'low' | 'medium' | 'high';
  children: ReactNode;
  className?: string;
}

export const Badge = ({ variant, children, className }: BadgeProps) => {
  const variants = {
    low: 'bg-green-900 text-green-300 border-green-700',
    medium: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    high: 'bg-red-900 text-red-300 border-red-700'
  };
  
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-1 text-xs font-medium border rounded-full',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};