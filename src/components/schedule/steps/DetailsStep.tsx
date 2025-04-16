
import React from 'react';
import { motion } from 'framer-motion';
import { Info, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StepProps, containerVariants } from '../serviceInfoUtils';
import { useIsMobile } from '@/hooks/use-mobile';

interface DetailsStepProps extends StepProps {
  notes: string;
  setNotes: (notes: string) => void;
  moveToPrevStep: () => void;
}

const DetailsStep: React.FC<DetailsStepProps> = ({
  notes,
  setNotes,
  moveToNextStep,
  moveToPrevStep
}) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      key="details"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col min-h-[450px] md:min-h-[500px] p-4 md:p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-4 md:mb-6">
        <Info className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mr-2 md:mr-3" />
        <h2 className="text-xl md:text-2xl font-bold">Additional Details</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:gap-6 flex-1">
        <div>
          <label className="block text-sm font-medium mb-2">Notes</label>
          <Textarea
            placeholder="Enter any additional notes or instructions for this service..."
            className="h-28 md:h-32"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4">
          <h3 className="font-medium text-blue-800 mb-1 md:mb-2 text-sm md:text-base">Service Summary</h3>
          <p className="text-xs md:text-sm text-blue-700">
            You can review all details in the final step before confirming. Notes and special instructions help ensure the service is performed correctly.
          </p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 flex justify-between">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className={`${isMobile ? 'text-base h-10 px-4' : 'text-lg h-12 px-8'}`}
        >
          Back
        </Button>
        <Button 
          onClick={moveToNextStep} 
          className={`${isMobile ? 'text-base h-10 px-4' : 'text-lg h-12 px-8'}`}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default DetailsStep;
