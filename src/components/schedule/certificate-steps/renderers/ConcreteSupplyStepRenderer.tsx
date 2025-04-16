
import React, { useState, useEffect } from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import { motion } from 'framer-motion';
import { Truck, ArrowLeft, ArrowRight, Check, Edit2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { containerVariants, errorShake } from '../../serviceInfoUtils';
import { Input } from '@/components/ui/input';
import YesNoSelectionWithApproval from '../components/YesNoSelectionWithApproval';
import { toast } from 'sonner';

export const ConcreteSupplyStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  moveToNextStep,
  moveToPrevStep,
  errorShakeAnimate
}) => {
  // State for the concrete supply selection
  const [includeConcreteSupply, setIncludeConcreteSupply] = useState(formData.includeConcreteSupply || '');
  
  // State for the quantity
  const [quantity, setQuantity] = useState(formData.quantity || '');
  const [isEditing, setIsEditing] = useState(!formData.quantity);
  const [quantityApproved, setQuantityApproved] = useState(!!formData.quantity);
  
  // Update local state when form data changes
  useEffect(() => {
    if (formData.includeConcreteSupply !== includeConcreteSupply && formData.includeConcreteSupply) {
      setIncludeConcreteSupply(formData.includeConcreteSupply);
    }
    
    if (formData.quantity !== quantity && formData.quantity) {
      setQuantity(formData.quantity);
      setQuantityApproved(true);
      setIsEditing(false);
    }
  }, [formData.includeConcreteSupply, formData.quantity]);
  
  const handleSetIncludeConcreteSupply = (value: string) => {
    setIncludeConcreteSupply(value);
    updateFormData('includeConcreteSupply', value);
    
    // If 'no' is selected, we don't need to ask for quantity
    if (value === 'no') {
      setQuantityApproved(true);
      if (quantity) {
        // Clear quantity if changing from yes to no
        setQuantity('');
        updateFormData('quantity', '');
      }
    } else {
      // If 'yes' is selected, set editing mode
      setIsEditing(true);
      setQuantityApproved(false);
    }
    
    toast.success(`Concrete Supply selection confirmed`, {
      description: `${value.toUpperCase()} has been selected.`,
    });
  };
  
  const handleApproveQuantity = () => {
    if (!quantity) return;
    
    updateFormData('quantity', quantity);
    setQuantityApproved(true);
    setIsEditing(false);
    
    toast.success(`Quantity approved`, {
      description: `${quantity} m³ has been confirmed.`,
    });
  };
  
  const handleEditQuantity = () => {
    setIsEditing(true);
    setQuantityApproved(false);
  };
  
  // Determine if the user can continue
  const canContinue = 
    !!includeConcreteSupply && 
    (includeConcreteSupply === 'no' || (includeConcreteSupply === 'yes' && quantityApproved && quantity));

  return (
    <motion.div 
      variants={errorShakeAnimate ? errorShake : containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-6">
        <Truck className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold">Concrete Supply</h2>
      </div>
      
      <div className="mb-6 max-w-md mx-auto space-y-6">
        <YesNoSelectionWithApproval 
          value={includeConcreteSupply}
          setValue={handleSetIncludeConcreteSupply}
          label="Include Concrete Supply"
          reverseOrder={true} // This makes "NO" appear before "YES"
          hideConfirmation={true} // Hide the confirmation message
        />
        
        {includeConcreteSupply === 'yes' && (
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <label className="text-base font-medium">Concrete Supply Quantity</label>
            
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <div className="flex items-center">
                  <Input 
                    type="number" 
                    min="0"
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)}
                    className={`rounded-r-none border-gray-200 bg-white h-12 ${isEditing ? 'border-blue-300 ring-2 ring-blue-100' : ''}`}
                    placeholder="Enter quantity in m³"
                    disabled={!isEditing && quantityApproved}
                  />
                  <div className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-200 rounded-r-md h-12 flex items-center">
                    m³
                  </div>
                </div>
              </div>
              
              {isEditing ? (
                <Button 
                  type="button"
                  onClick={handleApproveQuantity}
                  variant="success"
                  size="icon"
                  className={`h-12 w-12 rounded-lg transition-all ${
                    quantity ? 'animate-pulse bg-green-500 hover:bg-green-600' : 'bg-gray-400'
                  }`}
                  disabled={!quantity}
                >
                  <Check className="h-6 w-6" />
                </Button>
              ) : (
                <Button 
                  type="button"
                  onClick={handleEditQuantity}
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-lg"
                >
                  <Edit2 className="h-5 w-5" />
                </Button>
              )}
            </div>
            
            {isEditing && quantity && !quantityApproved && (
              <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center text-amber-800">
                <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" /> 
                <p className="text-sm">Please approve the quantity to continue</p>
              </div>
            )}
            
            {quantityApproved && quantity && (
              <div className="p-2 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
                <Check className="h-4 w-4 mr-1 flex-shrink-0" /> 
                <p className="text-sm">Quantity approved: {quantity} m³</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-8">
        <Button 
          type="button"
          variant="outline" 
          onClick={moveToPrevStep} 
          className="text-lg h-12 px-8 rounded-full border-gray-300 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        
        <Button 
          type="button"
          onClick={moveToNextStep}
          className="text-lg h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center shadow-md hover:shadow-lg transition-all"
          disabled={!canContinue}
        >
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};
