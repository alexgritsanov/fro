
import React from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import { motion } from 'framer-motion';
import { Briefcase, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { containerVariants, errorShake } from '../../serviceInfoUtils';

export const WorkTypeStepRenderer: React.FC<CertificateStepProps> = ({
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
        <Briefcase className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold">Work Type</h2>
      </div>
      
      <div className="mb-6 max-w-md mx-auto">
        <div className="space-y-4">
          <h3 className="font-medium">Select Work Type</h3>
          
          <RadioGroup
            value={formData.workType || "Regular"}
            onValueChange={(value) => updateFormData('workType', value)}
            className="flex flex-wrap gap-3"
          >
            <div className="flex items-center">
              <RadioGroupItem
                value="Regular"
                id="work-type-regular"
                className="peer sr-only"
              />
              <Label
                htmlFor="work-type-regular"
                className="flex h-12 w-28 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-center transition-all peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-600 hover:bg-gray-50"
              >
                Regular
              </Label>
            </div>
            
            <div className="flex items-center">
              <RadioGroupItem
                value="Half Day"
                id="work-type-half-day"
                className="peer sr-only"
              />
              <Label
                htmlFor="work-type-half-day"
                className="flex h-12 w-28 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-center transition-all peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-600 hover:bg-gray-50"
              >
                Half Day
              </Label>
            </div>
            
            <div className="flex items-center">
              <RadioGroupItem
                value="Full Day"
                id="work-type-full-day"
                className="peer sr-only"
              />
              <Label
                htmlFor="work-type-full-day"
                className="flex h-12 w-28 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-center transition-all peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-600 hover:bg-gray-50"
              >
                Full Day
              </Label>
            </div>
          </RadioGroup>
        </div>
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
