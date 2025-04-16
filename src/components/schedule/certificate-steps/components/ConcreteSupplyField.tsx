
import React, { useState } from 'react';
import { Truck, Check, Edit2 } from 'lucide-react';
import YesNoSelectionWithApproval from './YesNoSelectionWithApproval';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ConcreteSupplyFieldProps {
  includeConcreteSupply: string;
  setIncludeConcreteSupply: (include: string) => void;
  quantity: string;
  setQuantity: (quantity: string) => void;
  onQuantityApprove?: () => void;
}

const ConcreteSupplyField: React.FC<ConcreteSupplyFieldProps> = ({
  includeConcreteSupply,
  setIncludeConcreteSupply,
  quantity,
  setQuantity,
  onQuantityApprove
}) => {
  const [isEditing, setIsEditing] = useState(!quantity);
  const [quantityApproved, setQuantityApproved] = useState(!!quantity);
  
  const handleApproveQuantity = () => {
    setQuantityApproved(true);
    setIsEditing(false);
    if (onQuantityApprove) {
      onQuantityApprove();
    }
  };
  
  const handleEditQuantity = () => {
    setIsEditing(true);
    setQuantityApproved(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center">
          <Truck className="h-4 w-4 mr-1.5 text-blue-600" />
          Include Concrete Supply
        </label>
        
        <YesNoSelectionWithApproval 
          value={includeConcreteSupply}
          setValue={setIncludeConcreteSupply}
          label=""
          reverseOrder={true} // This makes "NO" appear before "YES"
          hideConfirmation={true} // Hide the confirmation message
        />
      </div>

      {includeConcreteSupply === 'yes' && (
        <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
          <label className="text-sm font-medium">Concrete Supply Quantity</label>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Input 
                type="number" 
                min="0"
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)}
                className={`rounded-r-none ${isEditing ? 'border-blue-300 ring-2 ring-blue-100' : ''}`}
                placeholder="Enter quantity in m³"
                disabled={!isEditing && quantityApproved}
              />
            </div>
            <div className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-md">
              m³
            </div>
            
            {isEditing ? (
              <Button 
                type="button"
                onClick={handleApproveQuantity}
                variant="success"
                size="icon"
                className={`h-10 w-10 ${quantity ? 'animate-pulse bg-green-500 hover:bg-green-600' : 'bg-gray-400'}`}
                disabled={!quantity}
              >
                <Check className="h-5 w-5" />
              </Button>
            ) : (
              <Button 
                type="button"
                onClick={handleEditQuantity}
                variant="outline"
                size="icon"
                className="h-10 w-10"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {quantityApproved && (
            <div className="p-2 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
              <Check className="h-4 w-4 mr-1 flex-shrink-0" /> 
              <p className="text-sm">Quantity approved: {quantity} m³</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConcreteSupplyField;
