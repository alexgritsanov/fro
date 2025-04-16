
import React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy' | string;
  className?: string;
}

const Avatar = ({ src, alt = '', name, size = 'md', status, className }: AvatarProps) => {
  // Size classes for the avatar
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };
  
  // Icon size based on avatar size
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };
  
  // Status indicator classes
  const getStatusClass = (status?: string) => {
    if (!status) return '';
    
    return status === 'online' ? 'bg-green-500' :
           status === 'away' ? 'bg-amber-500' :
           status === 'busy' ? 'bg-red-500' :
           status === 'offline' ? 'bg-gray-400' :
           'bg-gray-400';
  };
  
  // Generate initials from name
  const getInitials = () => {
    if (!name) return '';
    
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };
  
  // Get color based on name (consistent color for the same name)
  const getColorClass = () => {
    if (!name) return 'bg-gray-200 text-gray-600';
    
    // Simple hash function for name to generate consistent color
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorIndex = hash % colorClasses.length;
    return colorClasses[colorIndex];
  };
  
  // Array of color classes for different avatars
  const colorClasses = [
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700',
    'bg-amber-100 text-amber-700',
    'bg-red-100 text-red-700',
    'bg-purple-100 text-purple-700',
    'bg-indigo-100 text-indigo-700',
    'bg-pink-100 text-pink-700',
    'bg-cyan-100 text-cyan-700',
  ];
  
  // If src is provided, return an image
  if (src) {
    return (
      <div className={cn(
        'rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 relative',
        sizeClasses[size],
        className
      )}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        {status && (
          <span className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            getStatusClass(status),
            size === 'xs' ? 'w-2 h-2' : 
            size === 'sm' ? 'w-2.5 h-2.5' : 
            size === 'md' ? 'w-3 h-3' : 
            size === 'lg' ? 'w-3.5 h-3.5' : 
            'w-4 h-4'
          )} />
        )}
      </div>
    );
  }
  
  // If name is provided, return initials
  if (name) {
    return (
      <div className={cn(
        'rounded-full flex items-center justify-center flex-shrink-0 font-medium border-2 border-gray-100 relative',
        sizeClasses[size],
        getColorClass(),
        className
      )}>
        {getInitials()}
        {status && (
          <span className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            getStatusClass(status),
            size === 'xs' ? 'w-2 h-2' : 
            size === 'sm' ? 'w-2.5 h-2.5' : 
            size === 'md' ? 'w-3 h-3' : 
            size === 'lg' ? 'w-3.5 h-3.5' : 
            'w-4 h-4'
          )} />
        )}
      </div>
    );
  }
  
  // Default fallback with user icon
  return (
    <div className={cn(
      'rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200 text-gray-500 border-2 border-gray-100 relative',
      sizeClasses[size],
      className
    )}>
      <User className={iconSizes[size]} />
      {status && (
        <span className={cn(
          'absolute bottom-0 right-0 rounded-full border-2 border-white',
          getStatusClass(status),
          size === 'xs' ? 'w-2 h-2' : 
          size === 'sm' ? 'w-2.5 h-2.5' : 
          size === 'md' ? 'w-3 h-3' : 
          size === 'lg' ? 'w-3.5 h-3.5' : 
          'w-4 h-4'
        )} />
      )}
    </div>
  );
};

export default Avatar;
