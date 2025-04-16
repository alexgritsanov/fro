
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { certificateSteps, certificateSubSteps, CertificateStepId, CertificateSubStepId } from './stepsConfig';
import { ProgressSteps } from '@/components/ui/progress-steps';

interface StepsProgressProps {
  currentStep: CertificateStepId;
  currentSubStep?: CertificateSubStepId;
}

const StepsProgress: React.FC<StepsProgressProps> = ({ currentStep, currentSubStep }) => {
  // Calculate progress based on current step
  const currentStepIndex = certificateSteps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / certificateSteps.length) * 100;
  
  // Calculate sub-progress if applicable
  const getSubProgress = () => {
    if (!currentSubStep) return 0;
    
    const subSteps = certificateSubSteps[currentStep];
    if (!subSteps) return 0;
    
    const currentSubStepIndex = subSteps.findIndex(step => step.id === currentSubStep);
    return ((currentSubStepIndex + 1) / subSteps.length) * 100;
  };

  return (
    <div className="mb-6">
      {/* Main step progress - numbers with line (1-5) */}
      <div className="relative mb-8">
        {/* Horizontal connecting line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
        
        {/* Step circles */}
        <div className="flex justify-between relative z-10">
          {certificateSteps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = certificateSteps.findIndex(s => s.id === currentStep) > index;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`
                    flex items-center justify-center w-12 h-12 rounded-full text-lg font-medium
                    ${isActive ? 'bg-blue-600 text-white' : ''}
                    ${isCompleted ? 'bg-blue-600 text-white' : ''}
                    ${!isActive && !isCompleted ? 'bg-white border-2 border-gray-300 text-gray-500' : ''}
                  `}
                >
                  {index + 1}
                </div>
                <span className={`
                  mt-2 text-sm font-medium text-center
                  ${isActive || isCompleted ? 'text-blue-600' : 'text-gray-500'}
                `}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Main step progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
        </div>
        <Progress 
          value={progress} 
          className="h-2 bg-gray-100"
          indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-600" 
        />
      </div>

      {/* Sub-steps with icons */}
      {certificateSubSteps[currentStep] && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="flex space-x-2 md:space-x-4">
              {certificateSubSteps[currentStep].map((subStep, idx) => {
                const SubStepIcon = subStep.icon;
                const isActive = currentSubStep === subStep.id;
                const isCompleted = certificateSubSteps[currentStep].findIndex(
                  s => s.id === currentSubStep
                ) > idx;
                
                return (
                  <div key={subStep.id} className="flex flex-col items-center">
                    <div 
                      className={`
                        flex items-center justify-center w-10 h-10 rounded-full 
                        ${isActive ? 'bg-blue-600 text-white' : ''}
                        ${isCompleted ? 'bg-green-500 text-white' : ''}
                        ${!isActive && !isCompleted ? 'bg-gray-100 text-gray-400' : ''}
                      `}
                    >
                      <SubStepIcon className="w-5 h-5" />
                    </div>
                    <span className={`
                      mt-1 text-xs text-center hidden md:block
                      ${isActive ? 'text-blue-600' : ''}
                      ${isCompleted ? 'text-green-600' : ''}
                      ${!isActive && !isCompleted ? 'text-gray-400' : ''}
                    `}>
                      {subStep.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex-1 h-1 bg-gray-200"></div>
          </div>
          
          {/* Sub-step progress bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                {currentSubStep && certificateSubSteps[currentStep].find(s => s.id === currentSubStep)?.title}
              </span>
              <span className="text-sm font-medium text-gray-700">{Math.round(getSubProgress())}%</span>
            </div>
            <Progress 
              value={getSubProgress()} 
              className="h-1.5 bg-gray-100"
              indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-500" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StepsProgress;
