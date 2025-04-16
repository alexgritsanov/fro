
import React from 'react';
import { motion } from 'framer-motion';
import { Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import { Button } from '@/components/ui/button';
import { containerVariants, errorShake } from '../../serviceInfoUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const WorkDetailsStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  errorShakeAnimate,
  moveToNextStep,
  moveToPrevStep
}) => {
  const workTypeOptions = ["Full Day", "Half Day", "Hourly", "Custom"];
  
  return (
    <motion.div 
      variants={errorShakeAnimate ? errorShake : containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-4 md:p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-6">
        <Info className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-xl md:text-2xl font-bold">Work Details</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <Label htmlFor="workType">Work Type</Label>
          <Select
            value={formData.workType}
            onValueChange={(value) => updateFormData('workType', value)}
          >
            <SelectTrigger id="workType">
              <SelectValue placeholder="Select work type" />
            </SelectTrigger>
            <SelectContent>
              {workTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="concreteType">Concrete Type</Label>
          <Input
            id="concreteType"
            value={formData.concreteType}
            onChange={(e) => updateFormData('concreteType', e.target.value)}
            placeholder="Enter concrete type"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <Label htmlFor="companyProvides">Provider Company</Label>
          <Input
            id="companyProvides"
            value={formData.companyProvides}
            onChange={(e) => updateFormData('companyProvides', e.target.value)}
            placeholder="Enter provider company"
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="elementType">Element Type</Label>
          <Input
            id="elementType"
            value={formData.elementType}
            onChange={(e) => updateFormData('elementType', e.target.value)}
            placeholder="Enter element type"
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
