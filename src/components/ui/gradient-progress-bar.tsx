
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientProgressBarProps {
  value: number;
  max: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  gradientFrom?: string;
  gradientTo?: string;
}

export const GradientProgressBar: React.FC<GradientProgressBarProps> = ({
  value,
  max,
  className,
  barClassName,
  showLabel = false,
  size = 'md',
  gradientFrom = 'from-blue-500',
  gradientTo = 'to-purple-600'
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  
  const trackHeight = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-700">Progress</span>
          <span className="text-xs font-medium text-gray-700">{Math.round(percent)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-gray-100 rounded-full overflow-hidden', trackHeight[size])}>
        <div 
          className={cn(
            `bg-gradient-to-r ${gradientFrom} ${gradientTo} transition-all duration-500 ease-out rounded-full`,
            trackHeight[size],
            barClassName
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
