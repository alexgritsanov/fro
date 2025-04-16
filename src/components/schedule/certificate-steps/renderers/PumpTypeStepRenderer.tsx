
import React, { useState, useEffect } from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import { motion } from 'framer-motion';
import { Truck, ArrowLeft, ArrowRight, Check, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { containerVariants, errorShake } from '../../serviceInfoUtils';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export const PumpTypeStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  moveToNextStep,
  moveToPrevStep,
  errorShakeAnimate
}) => {
  const [quantityValue, setQuantityValue] = useState(formData.quantity);
  const [quantityConfirmed, setQuantityConfirmed] = useState(false);
  
  // Reset confirmation when quantity changes externally
  useEffect(() => {
    if (formData.quantity !== quantityValue) {
      setQuantityValue(formData.quantity);
      setQuantityConfirmed(false);
    }
  }, [formData.quantity]);
  
  const handleConfirmQuantity = () => {
    updateFormData('quantity', quantityValue);
    setQuantityConfirmed(true);
    toast.success("Quantity approved", {
      description: `${quantityValue} m³ has been confirmed.`,
    });
  };
  
  const subProgress = formData.pumpType ? 100 : 0;
  
  return (
    <motion.div 
      variants={errorShakeAnimate ? errorShake : containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-base font-medium text-gray-700">Select Pump Type</span>
          <span className="text-base font-medium text-gray-700">{subProgress}%</span>
        </div>
        <Progress 
          value={subProgress} 
          className="h-1.5 bg-gray-100"
          indicatorClassName="bg-gradient-to-r from-amber-400 to-pink-500" 
        />
      </div>
      
      <div className="flex flex-col items-center mt-10 mb-6">
        <Truck className="h-16 w-16 text-blue-600 mb-6" />
        <h2 className="text-3xl font-bold mb-2 text-center">Concrete Pump Details</h2>
        <p className="text-gray-500 mb-8 text-center text-base">Provide equipment details for this service</p>
      </div>
      
      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-base font-medium mb-2">Pump Type</label>
          <Select
            value={formData.pumpType}
            onValueChange={(value) => updateFormData('pumpType', value)}
          >
            <SelectTrigger className="w-full h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
              <SelectValue placeholder="Select pump type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="miko-22">Miko 22</SelectItem>
              <SelectItem value="up-to-32">Up To 32</SelectItem>
              <SelectItem value="up-to-36">Up To 36</SelectItem>
              <SelectItem value="up-to-42">Up To 42</SelectItem>
              <SelectItem value="up-to-48">Up To 48</SelectItem>
              <SelectItem value="up-to-52">Up To 52</SelectItem>
              <SelectItem value="up-to-56">Up To 56</SelectItem>
              <SelectItem value="up-to-62">Up To 62</SelectItem>
              <SelectItem value="up-to-65">Up To 65</SelectItem>
              <SelectItem value="up-to-72">Up To 72</SelectItem>
              <SelectItem value="up-to-80">Up To 80</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-base font-medium mb-2">Quantity (m³)</label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                value={quantityValue}
                onChange={(e) => {
                  setQuantityValue(e.target.value);
                  setQuantityConfirmed(false);
                }}
                placeholder="Enter quantity in m³"
                className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                disabled={quantityConfirmed}
              />
            </div>
            <Button 
              onClick={handleConfirmQuantity}
              size="icon"
              className={`h-12 w-16 rounded-lg transition-all ${
                quantityConfirmed 
                  ? 'bg-green-500 hover:bg-green-600 shadow-md' 
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white shadow-md hover:shadow-lg'
              }`}
              disabled={quantityConfirmed || !quantityValue}
            >
              <Check className="h-6 w-6" />
            </Button>
          </div>
          
          {!quantityConfirmed && quantityValue && (
            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center text-amber-800">
              <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" /> 
              <p className="text-sm">Please approve the quantity before continuing</p>
            </div>
          )}
          
          {quantityConfirmed && (
            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
              <Check className="h-4 w-4 mr-1 flex-shrink-0" /> 
              <p className="text-sm">Quantity approved</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between mt-12">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className="text-lg h-12 px-8 rounded-full border-gray-300 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        
        <Button 
          onClick={moveToNextStep}
          disabled={!formData.pumpType || !quantityConfirmed}
          className="text-lg h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center shadow-md hover:shadow-lg transition-all"
        >
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};
