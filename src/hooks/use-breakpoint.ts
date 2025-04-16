
import { useState, useEffect } from 'react';

/**
 * Custom hook to check if the viewport is below a certain breakpoint
 * @param breakpoint The breakpoint to check (sm, md, lg, xl, 2xl)
 * @returns boolean indicating if viewport is below the breakpoint
 */
export function useBreakpoint(breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'): boolean {
  const breakpoints = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
  };
  
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false);
  
  useEffect(() => {
    const checkSize = () => {
      setIsBelowBreakpoint(window.innerWidth < breakpoints[breakpoint]);
    };
    
    // Check on initial load
    checkSize();
    
    // Add event listener
    window.addEventListener('resize', checkSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkSize);
  }, [breakpoint]);
  
  return isBelowBreakpoint;
}
