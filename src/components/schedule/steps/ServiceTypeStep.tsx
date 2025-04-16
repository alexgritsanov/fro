
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Truck, ArrowRight, Check, X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Construction, Bus } from 'lucide-react';
import { StepProps, containerVariants, errorShake } from '../serviceInfoUtils';

export interface ServiceTypeStepProps extends StepProps {
  serviceType: string;
  setServiceType: (type: string) => void;
  formErrors: {[key: string]: string};
  setFormErrors: (errors: {[key: string]: string}) => void;
  errorShakeAnimate: boolean;
  moveToPrevStep?: () => void; // Make this optional since not all usages will need it
}

const ServiceTypeStep: React.FC<ServiceTypeStepProps> = ({
  serviceType,
  setServiceType,
  formErrors,
  setFormErrors,
  errorShakeAnimate,
  moveToNextStep,
  moveToPrevStep
}) => {
  const handleSelectService = (type: string) => {
    setServiceType(type);
    setFormErrors({...formErrors, serviceType: ""});
  };
  
  return (
    <motion.div 
      key="service"
      variants={containerVariants}
      initial="hidden"
      animate={errorShakeAnimate ? "shake" : "visible"}
      exit="exit"
      className="flex flex-col items-center justify-center min-h-[400px] p-4 md:p-8 bg-white rounded-xl shadow-sm"
    >
      <FileText className="h-12 w-12 md:h-16 md:w-16 text-blue-600 mb-4 md:mb-6" />
      <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-center">What type of service?</h2>
      
      <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-xl">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelectService('concrete-pumping')}
          className={cn(
            "flex flex-col items-center justify-center p-3 md:p-6 rounded-xl transition-all border-2 relative",
            serviceType === 'concrete-pumping' 
              ? "bg-blue-50 border-blue-600 text-blue-700" 
              : "bg-white border-gray-200 hover:border-blue-300"
          )}
        >
          <Truck className="h-8 w-8 md:h-12 md:w-12 mb-2 md:mb-4" />
          <span className="font-medium text-sm md:text-lg">Concrete Pumping</span>
          {serviceType === 'concrete-pumping' && (
            <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1">
              <Check className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          )}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelectService('cranes')}
          className={cn(
            "flex flex-col items-center justify-center p-3 md:p-6 rounded-xl transition-all border-2 relative",
            serviceType === 'cranes' 
              ? "bg-blue-50 border-blue-600 text-blue-700" 
              : "bg-white border-gray-200 hover:border-blue-300"
          )}
        >
          <Construction className="h-8 w-8 md:h-12 md:w-12 mb-2 md:mb-4" />
          <span className="font-medium text-sm md:text-lg">Cranes</span>
          {serviceType === 'cranes' && (
            <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1">
              <Check className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          )}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelectService('transportation')}
          className={cn(
            "flex flex-col items-center justify-center p-3 md:p-6 rounded-xl transition-all border-2 relative",
            serviceType === 'transportation' 
              ? "bg-blue-50 border-blue-600 text-blue-700" 
              : "bg-white border-gray-200 hover:border-blue-300"
          )}
        >
          <Bus className="h-8 w-8 md:h-12 md:w-12 mb-2 md:mb-4" />
          <span className="font-medium text-sm md:text-lg">Transportation</span>
          {serviceType === 'transportation' && (
            <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1">
              <Check className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          )}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelectService('general')}
          className={cn(
            "flex flex-col items-center justify-center p-3 md:p-6 rounded-xl transition-all border-2 relative",
            serviceType === 'general' 
              ? "bg-blue-50 border-blue-600 text-blue-700" 
              : "bg-white border-gray-200 hover:border-blue-300"
          )}
        >
          <HelpCircle className="h-8 w-8 md:h-12 md:w-12 mb-2 md:mb-4" />
          <span className="font-medium text-sm md:text-lg">General Service</span>
          {serviceType === 'general' && (
            <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1">
              <Check className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          )}
        </motion.button>
      </div>
      
      {formErrors.serviceType && (
        <motion.p 
          variants={errorShake}
          className="text-red-500 flex items-center mt-4 justify-center"
        >
          <X className="h-4 w-4 mr-1" />
          {formErrors.serviceType}
        </motion.p>
      )}
      
      <div className="flex gap-4 mt-6 md:mt-8">
        {/* Show back button only when moveToPrevStep is provided */}
        {moveToPrevStep && (
          <Button 
            variant="outline"
            onClick={moveToPrevStep}
            className="text-base md:text-lg h-10 px-6 md:h-12 md:px-8"
          >
            Back
          </Button>
        )}
        <Button 
          onClick={moveToNextStep} 
          className="text-base md:text-lg h-10 px-6 md:h-12 md:px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md"
          disabled={!serviceType}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceTypeStep;
