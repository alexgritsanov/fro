
import React, { useState, useEffect } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface QuantityInputWithApprovalProps {
  quantity: string;
  setQuantity: (quantity: string) => void;
  label: string;
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
}

const QuantityInputWithApproval: React.FC<QuantityInputWithApprovalProps> = ({
  quantity,
  setQuantity,
  label,
  placeholder = 'Enter quantity',
  unit = '',
  min = 0,
  max
}) => {
  const [inputValue, setInputValue] = useState(quantity);
  const [isApproved, setIsApproved] = useState(false);
  
  // Reset approval when quantity changes externally
  useEffect(() => {
    if (quantity !== inputValue) {
      setInputValue(quantity);
      setIsApproved(false);
    }
  }, [quantity]);
  
  const handleApprove = () => {
    setQuantity(inputValue);
    setIsApproved(true);
    toast.success(`${label} approved`, {
      description: `${inputValue}${unit ? ` ${unit}` : ''} has been confirmed.`,
    });
  };

  return (
    <div className="space-y-3">
      <label className="text-base font-medium">{label}</label>
      
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsApproved(false);
            }}
            placeholder={placeholder}
            type="number"
            min={min}
            max={max}
            className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
            disabled={isApproved}
          />
        </div>
        <Button 
          onClick={handleApprove}
          size="icon"
          className={`h-12 w-16 rounded-lg transition-all ${
            isApproved 
              ? 'bg-green-500 hover:bg-green-600 shadow-md' 
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg'
          }`}
          disabled={isApproved || !inputValue}
        >
          <Check className="h-6 w-6" />
        </Button>
      </div>
      
      {!isApproved && inputValue && (
        <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center text-amber-800">
          <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" /> 
          <p className="text-sm">Please approve the {label.toLowerCase()} before continuing</p>
        </div>
      )}
      
      {isApproved && (
        <div className="p-2 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
          <Check className="h-4 w-4 mr-1 flex-shrink-0" /> 
          <p className="text-sm">{label} approved</p>
        </div>
      )}
    </div>
  );
};

export default QuantityInputWithApproval;
