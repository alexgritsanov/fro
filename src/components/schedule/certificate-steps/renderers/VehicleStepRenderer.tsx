
import React from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import VehicleInformation from '../components/VehicleInformation';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { containerVariants, errorShake } from '../../serviceInfoUtils';

export const VehicleStepRenderer: React.FC<CertificateStepProps> = ({
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
        <Truck className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-xl md:text-2xl font-bold">Select Vehicle</h2>
      </div>
      
      <div className="mb-6">
        <VehicleInformation 
          vehicleNumber={formData.vehicleNumber} 
          setVehicleNumber={(value) => updateFormData('vehicleNumber', value)} 
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
        
        <Button onClick={moveToNextStep} disabled={!formData.vehicleNumber}>
          Next
        </Button>
      </div>
    </motion.div>
  );
};
