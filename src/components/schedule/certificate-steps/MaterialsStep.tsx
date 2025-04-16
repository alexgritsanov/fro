
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Building2, Droplet, ArrowLeft, ArrowRight } from 'lucide-react';
import { containerVariants } from '../serviceInfoUtils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MaterialsStepProps {
  concreteType: string;
  setConcreteType: (type: string) => void;
  quantity: string;
  setQuantity: (quantity: string) => void;
  companyProvides: string;
  setCompanyProvides: (company: string) => void;
  elementType: string;
  setElementType: (type: string) => void;
  moveToNextStep: () => void;
  moveToPrevStep: () => void;
  serviceCall?: any;
}

const MaterialsStep: React.FC<MaterialsStepProps> = ({
  concreteType,
  setConcreteType,
  quantity,
  setQuantity,
  companyProvides,
  setCompanyProvides,
  elementType,
  setElementType,
  moveToNextStep,
  moveToPrevStep,
  serviceCall
}) => {
  
  // Pre-select values from service call if available
  React.useEffect(() => {
    if (serviceCall && serviceCall.quantity && !quantity) {
      setQuantity(serviceCall.quantity);
    }
  }, [serviceCall]);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-4 md:p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-6">
        <Package className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-xl md:text-2xl font-bold">Material Details</h2>
      </div>
      
      {serviceCall && serviceCall.quantity && (
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-sm">
            <span className="font-medium">Auto-filled from service call:</span> Quantity ({serviceCall.quantity})
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Concrete Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Package className="h-4 w-4 mr-1.5 text-blue-600" />
            Concrete Type
          </label>
          <Select value={concreteType} onValueChange={setConcreteType}>
            <SelectTrigger className="border-gray-200 bg-white">
              <SelectValue placeholder="Select concrete type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="B30">B30</SelectItem>
              <SelectItem value="B35">B35</SelectItem>
              <SelectItem value="B40">B40</SelectItem>
              <SelectItem value="B45">B45</SelectItem>
            </SelectContent>
          </Select>
        </div>
      
        {/* Quantity */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Droplet className="h-4 w-4 mr-1.5 text-blue-600" />
            Quantity (m³)
          </label>
          <Select value={quantity} onValueChange={setQuantity}>
            <SelectTrigger className="border-gray-200 bg-white">
              <SelectValue placeholder="Select quantity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="105">105 m³</SelectItem>
              <SelectItem value="75">75 m³</SelectItem>
              <SelectItem value="50">50 m³</SelectItem>
              <SelectItem value="25">25 m³</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Company Provides */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Building2 className="h-4 w-4 mr-1.5 text-blue-600" />
            Company Provides
          </label>
          <Select value={companyProvides} onValueChange={setCompanyProvides}>
            <SelectTrigger className="border-gray-200 bg-white">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Henson">Henson</SelectItem>
              <SelectItem value="Ready Mix">Ready Mix</SelectItem>
              <SelectItem value="Concrete Supply Co.">Concrete Supply Co.</SelectItem>
            </SelectContent>
          </Select>
        </div>
      
        {/* Element Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Package className="h-4 w-4 mr-1.5 text-blue-600" />
            Element Type
          </label>
          <Select value={elementType} onValueChange={setElementType}>
            <SelectTrigger className="border-gray-200 bg-white">
              <SelectValue placeholder="Select element type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Wall">Wall</SelectItem>
              <SelectItem value="Column">Column</SelectItem>
              <SelectItem value="Slab">Slab</SelectItem>
              <SelectItem value="Foundation">Foundation</SelectItem>
            </SelectContent>
          </Select>
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
        
        <Button 
          onClick={moveToNextStep}
          className="flex items-center"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default MaterialsStep;
