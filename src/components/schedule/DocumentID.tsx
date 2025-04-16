
import React from 'react';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isValid, parseISO } from 'date-fns';

interface DocumentIDProps {
  type: 'service-call' | 'delivery-certificate';
  date: Date | string;
  id: string | number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const DocumentID = ({ 
  type, 
  date, 
  id, 
  className, 
  size = 'md', 
  showIcon = true 
}: DocumentIDProps) => {
  // Safely parse the date
  let parsedDate: Date;
  let formattedDate: string;
  
  try {
    if (date instanceof Date) {
      parsedDate = date;
    } else {
      // Try to parse as ISO string first
      parsedDate = parseISO(date);
      // If result is invalid, create a new date object
      if (!isValid(parsedDate)) {
        parsedDate = new Date(date);
      }
    }
    
    // Use a fallback date format if the date is still invalid
    formattedDate = isValid(parsedDate) 
      ? format(parsedDate, 'yyyyMMdd')
      : 'YYYYMMDD';
  } catch (error) {
    console.error('Invalid date provided to DocumentID:', date);
    formattedDate = 'YYYYMMDD';
  }
  
  // Generate a formatted document ID based on type, date and sequential ID
  const idString = String(id).replace(/\D/g, ''); // Remove non-numeric characters
  const paddedId = idString.padStart(4, '0'); // Ensure at least 4 digits
  const documentId = `${type === 'service-call' ? 'SC' : 'DC'}-${formattedDate}-${paddedId}`;
  
  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-1.5 px-3',
    lg: 'text-base py-2 px-4',
  };

  const iconClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };
  
  const getIconColor = () => {
    return type === 'service-call' ? 'text-blue-600' : 'text-green-600';
  };
  
  const getBgColor = () => {
    return type === 'service-call' ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200';
  };
  
  return (
    <div className={cn(
      "flex items-center gap-1.5 font-mono border rounded-md w-fit",
      getBgColor(),
      sizeClasses[size],
      className
    )}>
      {showIcon && (
        <FileText className={cn(getIconColor(), iconClasses[size])} />
      )}
      <span className={cn("font-medium", type === 'service-call' ? 'text-blue-800' : 'text-green-800')}>{documentId}</span>
    </div>
  );
};

export default DocumentID;
