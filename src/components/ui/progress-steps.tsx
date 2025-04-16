
import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: string;
  onStepClick?: (stepId: string) => void;
  isInteractive?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
}

export function ProgressSteps({
  steps,
  currentStep,
  onStepClick,
  isInteractive = true,
  className,
  size = 'md',
  variant = 'default'
}: ProgressStepsProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between relative">
        {/* Horizontal line connecting all steps */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10" />
        
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = step.id === currentStep;
          const StepIcon = step.icon;
          
          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative"
              style={{ 
                width: `${100 / steps.length}%`
              }}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center justify-center rounded-full transition-all relative z-10",
                  size === 'sm' && "w-6 h-6",
                  size === 'md' && "w-8 h-8",
                  size === 'lg' && "w-10 h-10",
                  variant === 'default' && [
                    isCompleted 
                      ? "bg-green-500 text-white" 
                      : isActive 
                        ? "bg-blue-600 text-white"
                        : "bg-white border-2 border-gray-300 text-gray-400"
                  ],
                  variant === 'outline' && [
                    isCompleted 
                      ? "bg-white text-green-600 border-2 border-green-600" 
                      : isActive 
                        ? "bg-white text-blue-600 border-2 border-blue-600"
                        : "bg-white border-2 border-gray-300 text-gray-400"
                  ],
                  isInteractive && !isCompleted && !isActive
                    ? "hover:border-blue-400 hover:text-blue-400 cursor-pointer"
                    : isInteractive && (isCompleted || isActive)
                    ? "cursor-pointer"
                    : "cursor-default",
                  "transition-transform hover:scale-110"
                )}
                disabled={!isInteractive}
                onClick={() => isInteractive && onStepClick?.(step.id)}
                aria-current={isActive ? "step" : undefined}
              >
                {isCompleted ? (
                  <Check className={cn(
                    size === 'sm' && "h-3 w-3",
                    size === 'md' && "h-4 w-4",
                    size === 'lg' && "h-5 w-5"
                  )} />
                ) : StepIcon ? (
                  <StepIcon className={cn(
                    size === 'sm' && "h-3 w-3",
                    size === 'md' && "h-4 w-4",
                    size === 'lg' && "h-5 w-5"
                  )} />
                ) : (
                  <span className={cn(
                    size === 'sm' && "text-xs",
                    size === 'md' && "text-sm",
                    size === 'lg' && "text-base"
                  )}>{index + 1}</span>
                )}
              </button>
              
              {/* Pulse animation for active step */}
              {isActive && (
                <span 
                  className={cn(
                    "absolute inset-0 rounded-full animate-pulse opacity-30",
                    variant === 'default' ? "bg-blue-400" : "bg-blue-200 border-2 border-blue-400"
                  )}
                  style={{
                    width: size === 'sm' ? '24px' : size === 'md' ? '32px' : '40px',
                    height: size === 'sm' ? '24px' : size === 'md' ? '32px' : '40px',
                    top: '0px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                />
              )}
              
              <span 
                className={cn(
                  "mt-2 font-medium text-center",
                  size === 'sm' && "text-xs",
                  size === 'md' && "text-sm",
                  size === 'lg' && "text-sm",
                  isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"
                )}
              >
                {step.title}
              </span>
              
              {step.description && (
                <span className="text-xs text-gray-500 text-center mt-0.5">{step.description}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
