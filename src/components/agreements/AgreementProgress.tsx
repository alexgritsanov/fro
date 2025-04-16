
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, FileText, FilePlus, FileOutput, FileCheck2, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AgreementProgressProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
  isInteractive?: boolean;
}

const AgreementProgress: React.FC<AgreementProgressProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
  isInteractive = true
}) => {
  // Define step icons
  const stepIcons = [FileText, FilePlus, FileOutput, FileCheck2, Share2];

  return (
    <div className={cn("w-full py-6 bg-gradient-to-r from-blue-50 to-blue-100/50", className)}>
      <div className="flex items-center justify-between w-full max-w-5xl mx-auto px-4 overflow-x-auto py-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && (isCompleted || index <= currentStep + 1);
          const StepIcon = stepIcons[index] || FileText;
          
          return (
            <React.Fragment key={index}>
              {/* Step indicator */}
              <div className="flex flex-col items-center relative">
                <button
                  onClick={() => isClickable && onStepClick && onStepClick(index)}
                  className={cn(
                    "flex items-center justify-center rounded-full w-12 h-12 text-white transition-all duration-300",
                    isCompleted 
                      ? "bg-green-600 hover:bg-green-700 shadow-md"
                      : isCurrent
                        ? "bg-blue-600 hover:bg-blue-700 shadow-md" 
                        : "bg-white border-2 border-gray-300 text-gray-400",
                    isClickable && !isCompleted && !isCurrent && isInteractive
                      ? "hover:border-blue-400 hover:text-blue-400 cursor-pointer"
                      : isInteractive && (isCompleted || isCurrent)
                      ? "cursor-pointer"
                      : "cursor-default",
                    "transition-transform hover:scale-110"
                  )}
                  disabled={!isClickable}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <StepIcon className="h-5 w-5" />
                  )}
                </button>
                
                {/* Pulse animation for current step */}
                {isCurrent && (
                  <motion.span 
                    className="absolute inset-0 rounded-full bg-blue-400 opacity-30 w-12 h-12"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.2, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                )}
                
                <span className={cn(
                  "text-sm mt-3 font-medium text-center whitespace-nowrap",
                  isCurrent ? "text-blue-700" : isCompleted ? "text-green-700" : "text-gray-500"
                )}>
                  {step}
                </span>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="relative flex-1 mx-2 h-1 bg-gray-200 min-w-[2rem]">
                  {/* Progress overlay */}
                  <div 
                    className={cn(
                      "absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500",
                      index < currentStep ? "w-full" : index === currentStep ? "w-1/2" : "w-0"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AgreementProgress;
