
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  HelpCircle, 
  XCircle, 
  FileCheck,
  FileWarning,
  ShieldCheck,
  BadgeCheck,
  AlertTriangle
} from 'lucide-react';

export type StatusType = 
  'completed' | 
  'active' | 
  'pending' | 
  'warning' | 
  'cancelled' | 
  'error' | 
  'success' | 
  'info' | 
  'neutral' | 
  'approved' | 
  'rejected' | 
  'expired' | 
  'draft' | 
  'review' | 
  'processing';

interface StatusIndicatorProps {
  status: StatusType;
  withDot?: boolean;
  withIcon?: boolean;
  withBadge?: boolean;
  withPill?: boolean;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  label?: string;
  iconOnly?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  withDot = false,
  withIcon = true, 
  withBadge = false,
  withPill = false,
  className,
  size = 'md',
  label,
  iconOnly = false,
}) => {
  // Use the provided label, or default to a capitalized version of the status
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);
  
  // Define styles based on status
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
      case 'success':
      case 'approved':
      case 'active':
        return {
          color: 'text-green-700',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          gradientClass: 'bg-gradient-to-r from-green-50 to-green-100',
          dotColor: 'bg-green-500',
          icon: CheckCircle2,
        };
      case 'info':
        return {
          color: 'text-blue-700',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          gradientClass: 'bg-gradient-to-r from-blue-50 to-blue-100',
          dotColor: 'bg-blue-500',
          icon: FileCheck,
        };
      case 'pending':
      case 'processing':
      case 'review':
        return {
          color: 'text-amber-700',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          gradientClass: 'bg-gradient-to-r from-amber-50 to-amber-100',
          dotColor: 'bg-amber-500',
          icon: Clock,
        };
      case 'warning':
      case 'expired':
        return {
          color: 'text-orange-700',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          gradientClass: 'bg-gradient-to-r from-orange-50 to-orange-100',
          dotColor: 'bg-orange-500',
          icon: AlertTriangle,
        };
      case 'cancelled':
      case 'error':
      case 'rejected':
        return {
          color: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          gradientClass: 'bg-gradient-to-r from-red-50 to-red-100',
          dotColor: 'bg-red-500',
          icon: XCircle,
        };
      case 'draft':
        return {
          color: 'text-gray-700',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          gradientClass: 'bg-gradient-to-r from-gray-50 to-gray-100',
          dotColor: 'bg-gray-500',
          icon: FileWarning,
        };
      default:
        return {
          color: 'text-gray-700',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          gradientClass: 'bg-gradient-to-r from-gray-50 to-gray-100',
          dotColor: 'bg-gray-500',
          icon: HelpCircle,
        };
    }
  };
  
  // Get styles based on status
  const styles = getStatusStyles();
  const Icon = styles.icon;
  
  // Size classes
  const sizeClasses = {
    xs: 'text-xs py-0 px-1.5',
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-2.5',
    lg: 'text-base py-1.5 px-3',
  };
  
  const iconSizes = {
    xs: 'h-3 w-3',
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };
  
  const dotSizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
  };
  
  // Render different variants based on props
  if (withBadge) {
    return (
      <span 
        className={cn(
          'inline-flex items-center gap-1 font-medium rounded-full',
          styles.bgColor,
          styles.color,
          styles.borderColor,
          'border',
          sizeClasses[size],
          className
        )}
      >
        {withIcon && <Icon className={iconSizes[size]} />}
        {!iconOnly && displayLabel}
      </span>
    );
  }
  
  if (withPill) {
    return (
      <span 
        className={cn(
          'inline-flex items-center gap-1.5 font-medium rounded-full',
          styles.gradientClass,
          styles.color,
          styles.borderColor,
          'border shadow-sm',
          sizeClasses[size],
          className
        )}
      >
        {withIcon && <Icon className={iconSizes[size]} />}
        {!iconOnly && displayLabel}
      </span>
    );
  }
  
  if (withDot) {
    return (
      <div className={cn('flex items-center gap-1.5', className)}>
        <span className={cn('rounded-full', styles.dotColor, dotSizes[size])} />
        <span className={cn(styles.color, sizeClasses[size], 'py-0')}>{displayLabel}</span>
      </div>
    );
  }
  
  // Default display (just text with proper color)
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {withIcon && <Icon className={cn(iconSizes[size], styles.color)} />}
      {!iconOnly && <span className={cn(styles.color)}>{displayLabel}</span>}
    </div>
  );
};

export default StatusIndicator;
