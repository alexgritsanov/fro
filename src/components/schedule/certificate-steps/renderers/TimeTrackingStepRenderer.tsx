
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import { Button } from '@/components/ui/button';
import { containerVariants, errorShake } from '../../serviceInfoUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TimeSelection from '../components/TimeSelection';

export const TimeTrackingStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  errorShakeAnimate,
  moveToNextStep,
  moveToPrevStep
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
        <h2 className="text-xl md:text-2xl font-bold">Time Tracking</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TimeSelection
          startTime={formData.startTime}
          setStartTime={(time) => updateFormData('startTime', time)}
          endTime={formData.endTime}
          setEndTime={(time) => updateFormData('endTime', time)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <Label htmlFor="waitingTime">Waiting Time (hours)</Label>
          <Input
            id="waitingTime"
            type="number"
            min="0"
            step="0.5"
            value={formData.waitingTime}
            onChange={(e) => updateFormData('waitingTime', e.target.value)}
            placeholder="Enter waiting time"
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className="border-gray-200 bg-white flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Button onClick={moveToNextStep} className="flex items-center">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};
