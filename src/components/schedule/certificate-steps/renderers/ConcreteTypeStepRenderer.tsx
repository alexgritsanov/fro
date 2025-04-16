
import React, { useState } from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import { motion } from 'framer-motion';
import { Package, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { containerVariants, errorShake } from '../../serviceInfoUtils';
import SelectableFieldWithOptions from '../components/SelectableFieldWithOptions';

export const ConcreteTypeStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  moveToNextStep,
  moveToPrevStep,
  errorShakeAnimate
}) => {
  const [concreteTypes, setConcreteTypes] = useState([
    'B20', 'B25', 'B30', 'B35', 'B40', 'B45', 'B50', 'B55', 'B60'
  ]);

  return (
    <motion.div 
      variants={errorShakeAnimate ? errorShake : containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-6">
        <Package className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold">Concrete Type</h2>
      </div>
      
      <div className="mb-6">
        <SelectableFieldWithOptions
          value={formData.concreteType}
          setValue={(value) => updateFormData('concreteType', value)}
          options={concreteTypes}
          setOptions={setConcreteTypes}
          label="Concrete Type"
          icon={<Package className="h-5 w-5 text-blue-600" />}
          placeholder="Search concrete types..."
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
          disabled={!formData.concreteType}
          className="text-lg h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center shadow-md hover:shadow-lg transition-all"
        >
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};
