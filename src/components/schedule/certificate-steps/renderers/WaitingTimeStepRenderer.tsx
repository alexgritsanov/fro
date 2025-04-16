
import React from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { containerVariants, errorShake } from '../../serviceInfoUtils';
import QuickHourSelection from '../components/QuickHourSelection';

export const WaitingTimeStepRenderer: React.FC<CertificateStepProps> = ({
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
      className="p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-6">
        <Clock className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold">Waiting Time</h2>
      </div>
      
      <div className="mb-6">
        <QuickHourSelection
          value={formData.waitingTime}
          setValue={(value) => updateFormData('waitingTime', value)}
          label="Waiting Time"
          icon={<Clock className="h-5 w-5 text-blue-600" />}
          unit="Hours"
        />
      </div>
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className="text-lg h-12 px-8 rounded-full border-gray-300 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        
        <Button 
          onClick={moveToNextStep}
          className="text-lg h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center shadow-md hover:shadow-lg transition-all"
        >
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};
