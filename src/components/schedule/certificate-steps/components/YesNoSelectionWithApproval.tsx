
import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface YesNoSelectionWithApprovalProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  onYesSelect?: () => void;
  reverseOrder?: boolean;
  requireApprovalForYes?: boolean;
  defaultValue?: 'yes' | 'no' | '';
  hideConfirmation?: boolean;
}

const YesNoSelectionWithApproval: React.FC<YesNoSelectionWithApprovalProps> = ({
  value,
  setValue,
  label,
  onYesSelect,
  reverseOrder = false,
  requireApprovalForYes = false,
  defaultValue = '',
  hideConfirmation = false
}) => {
  const options = reverseOrder ? ['no', 'yes'] : ['yes', 'no'];
  const [pendingApproval, setPendingApproval] = useState(false);
  
  // Set default value if provided and no value is set yet
  React.useEffect(() => {
    if (defaultValue && !value) {
      setValue(defaultValue);
    }
  }, [defaultValue, value, setValue]);

  const handleSelect = (selection: 'yes' | 'no') => {
    if (selection === 'yes' && requireApprovalForYes) {
      setPendingApproval(true);
      // Don't set the value yet, pending approval
    } else {
      // For "no" or when no approval needed, set value directly
      setValue(selection);
      
      // Call onYesSelect callback if provided and yes is selected
      if (selection === 'yes' && onYesSelect) {
        onYesSelect();
      }
    }
  };
  
  const handleApproveYes = () => {
    setValue('yes');
    setPendingApproval(false);
    
    if (onYesSelect) {
      onYesSelect();
    }
  };

  return (
    <div className="space-y-3">
      {label && <label className="text-base font-medium">{label}</label>}
      
      <div className="flex space-x-3">
        {options.map((option) => (
          <Button
            key={option}
            type="button"
            variant={(value === option || (pendingApproval && option === 'yes')) ? 'default' : 'outline'}
            className={`flex-1 h-12 ${(value === option || (pendingApproval && option === 'yes')) ? 'bg-blue-600' : ''}`}
            onClick={() => handleSelect(option as 'yes' | 'no')}
          >
            {option.toUpperCase()}
          </Button>
        ))}
        
        {pendingApproval && (
          <Button
            type="button"
            variant="success"
            className="h-12 w-16 bg-green-500 hover:bg-green-600 animate-pulse"
            onClick={handleApproveYes}
          >
            <Check className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {value && !hideConfirmation && (
        <div className="p-2 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
          <Check className="h-4 w-4 mr-1 flex-shrink-0" /> 
          <p className="text-sm">Selection confirmed</p>
        </div>
      )}
    </div>
  );
};

export default YesNoSelectionWithApproval;
