
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  cornerPosition?: boolean;
  count?: number;
}

const StatusBadge = ({ 
  status, 
  label, 
  size = 'sm', 
  className,
  cornerPosition = false,
  count
}: StatusBadgeProps) => {
  const getStatusClass = (status: StatusType) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'warning':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'error':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'info':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'neutral':
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  const getSizeClass = (size: 'xs' | 'sm' | 'md') => {
    switch (size) {
      case 'xs':
        return 'text-xs py-0 px-1.5 font-normal';
      case 'sm':
        return 'text-xs py-0.5 px-2';
      case 'md':
      default:
        return 'text-sm py-1 px-2.5';
    }
  };
  
  // Special styling for corner badges that sit on card edges
  if (cornerPosition) {
    return (
      <div className={cn(
        "px-3 py-1 text-xs font-semibold",
        "rounded-bl-md shadow-sm",
        getStatusClass(status),
        className
      )}>
        {label}
      </div>
    );
  }
  
  // If there's a count, use a special layout with more space and enhanced gradient styling
  if (count !== undefined) {
    return (
      <div className={cn(
        "inline-flex items-center rounded-full",
        getStatusClass(status),
        getSizeClass(size),
        "pr-3", // Increase right padding to ensure space for count bubble
        className
      )}>
        <span className="mr-2">{label}</span>
        {count !== undefined && (
          <span className={cn(
            "flex items-center justify-center rounded-full w-5 h-5 text-xs font-semibold",
            status === 'neutral' ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-white' : 
            status === 'success' ? 'bg-gradient-to-r from-green-600 to-green-500 text-white' : 
            status === 'warning' ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white' : 
            status === 'error' ? 'bg-gradient-to-r from-red-600 to-red-500 text-white' : 
            'bg-gradient-to-r from-blue-600 to-blue-500 text-white',
            "shadow-sm"
          )}>
            {count}
          </span>
        )}
      </div>
    );
  }
  
  // Standard badge styling
  return (
    <Badge 
      variant="outline" 
      className={cn(
        getStatusClass(status),
        getSizeClass(size),
        className
      )}
    >
      {label}
    </Badge>
  );
};

export default StatusBadge;
