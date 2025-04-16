
import { Variants } from 'framer-motion';

// Common interface for step components
export interface StepProps {
  moveToNextStep: () => void;
}

// Animation variants for container elements
export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Animation variant for error shake
export const errorShake: Variants = {
  hidden: { opacity: 0, y: 20 },
  shake: { 
    x: [0, -10, 10, -10, 10, 0], 
    transition: { 
      duration: 0.5,
    }
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: {
      duration: 0.3
    }
  }
};

// Animation variants for calendar items
export const calendarItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

// Animation variants for list items
export const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: 10,
    transition: {
      duration: 0.2
    }
  }
};

// Animation for slide in from bottom
export const slideInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3
    }
  }
};

// Simple audio feedback utility
export function playSuccessSound() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 880; // A note
    gainNode.gain.value = 0.1;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    
    // Short duration
    setTimeout(() => {
      oscillator.stop();
      oscillator.frequency.value = 1318.5; // E note, higher pitch
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 100);
    }, 100);
  } catch (e) {
    console.log("Browser doesn't support Web Audio API");
  }
}

// Calendar Event Hover animation
export const calendarEventHover: Variants = {
  initial: { 
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    scale: 1 
  },
  hover: { 
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

// Time gradient for day/week view - using more neutral, consistent colors
export const getTimeSlotBackground = (hour: number): string => {
  // Use a consistent, subtle background for all hours
  return "bg-gray-50";
};

// Function to get time slot height for day view
export const getTimeSlotHeight = (duration: number = 60): string => {
  // Default is 60 minutes = 72px
  const baseHeight = 72;
  const height = (duration / 60) * baseHeight;
  return `${height}px`;
};

// Function to convert time string to height position
export const getEventTopPosition = (timeString: string): number => {
  try {
    const timeMatch = timeString.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (!timeMatch) return 0;
    
    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const ampm = timeMatch[3]?.toUpperCase();
    
    // Adjust hour based on AM/PM
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    
    // Each hour is 72px, starting at 6am (0px)
    const startHour = 6;
    const hourHeight = 72;
    
    // Calculate position
    const hoursFromStart = hours - startHour;
    const minuteHeight = hourHeight / 60;
    const minutesPosition = minutes * minuteHeight;
    
    return (hoursFromStart * hourHeight) + minutesPosition;
  } catch (error) {
    console.error("Error parsing time string:", error);
    return 0;
  }
};

// Function to estimate event duration in minutes
export const estimateEventDuration = (startTime: string): number => {
  // Default to 60 minutes if no end time is provided
  return 60;
};

// Function to calculate overlap for events in the same time slot
export const calculateEventPosition = (
  events: any[],
  currentEvent: any,
  index: number
): { width: string; left: string } => {
  // Check how many events are at the same time
  const overlappingEvents = events.filter((event, idx) => {
    if (idx >= index) return false; // Only check events before current
    if (event.startTime === currentEvent.startTime) return true;
    return false;
  });
  
  const totalOverlapping = overlappingEvents.length;
  const position = totalOverlapping;
  
  // Calculate width and left position based on overlaps
  const width = totalOverlapping > 0 ? `${100 / (totalOverlapping + 1)}%` : '100%';
  const left = `${position * (100 / (totalOverlapping + 1))}%`;
  
  return { width, left };
};
