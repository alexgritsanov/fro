
import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onBack: () => void;
  onSubmit: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onBack, onSubmit }) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-between mt-6">
      <Button 
        variant="outline" 
        onClick={onBack} 
        className="border-gray-200 bg-white w-full sm:w-auto order-2 sm:order-1"
        size="sm"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <Button 
        onClick={onSubmit}
        className="gap-2 bg-green-600 hover:bg-green-700 w-full sm:w-auto order-1 sm:order-2"
        size="sm"
      >
        <CheckCircle className="h-4 w-4" /> 
        Create Delivery Certificate
      </Button>
    </div>
  );
};

export default ActionButtons;
