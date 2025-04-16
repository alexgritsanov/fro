
import React from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import TimeSelection from '../components/TimeSelection';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { containerVariants, errorShake } from '../../serviceInfoUtils';

export const TimeStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  moveToNextStep,
  moveToPrevStep,
  errorShakeAnimate
}) => {
  return (
    <motion.div 
      variants={errorShakeAnimate ? errorShake : containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-4 md:p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-6">
        <Clock className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-xl md:text-2xl font-bold">Select Time</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TimeSelection 
          startTime={formData.startTime}
          setStartTime={(value) => updateFormData('startTime', value)}
          endTime={formData.endTime}
          setEndTime={(value) => updateFormData('endTime', value)}
        />
      </div>
      
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className="border-gray-200 bg-white"
        >
          Previous
        </Button>
        
        <Button onClick={moveToNextStep}>
          Next
        </Button>
      </div>
    </motion.div>
  );
};
