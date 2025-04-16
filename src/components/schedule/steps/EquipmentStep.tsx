import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Construction, Bus, ArrowRight, X, HelpCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StepProps, containerVariants, errorShake } from '../serviceInfoUtils';

interface EquipmentStepProps extends StepProps {
  serviceType: string;
  pumpType: string;
  setPumpType: (type: string) => void;
  hourlyBooking: string | number;
  setHourlyBooking: (hours: string | number) => void;
  quantity: string;
  setQuantity: (quantity: string) => void;
  formErrors: {[key: string]: string};
  setFormErrors: (errors: {[key: string]: string}) => void;
  errorShakeAnimate: boolean;
  moveToPrevStep: () => void;
  craneSize: string;
  setCraneSize: (size: string) => void;
  vehicleType: string;
  setVehicleType: (type: string) => void;
  generalEquipment: string;
  setGeneralEquipment: (equipment: string) => void;
}

const EquipmentStep: React.FC<EquipmentStepProps> = ({
  serviceType,
  pumpType,
  setPumpType,
  quantity,
  setQuantity,
  formErrors,
  setFormErrors,
  errorShakeAnimate,
  moveToNextStep,
  moveToPrevStep,
  craneSize,
  setCraneSize,
  vehicleType,
  setVehicleType,
  generalEquipment,
  setGeneralEquipment,
  hourlyBooking,
  setHourlyBooking
}) => {
  // Get the appropriate unit of measurement based on service type
  const getQuantityUnit = () => {
    switch (serviceType) {
      case 'concrete-pumping':
        return 'm³';
      case 'cranes':
        return 'hours';
      case 'transportation':
        return 'km';
      default:
        return 'units';
    }
  };

  // Get the appropriate equipment label based on service type
  const getEquipmentLabel = () => {
    switch (serviceType) {
      case 'concrete-pumping':
        return 'Pump Type';
      case 'cranes':
        return 'Crane Size';
      case 'transportation':
        return 'Vehicle Type';
      default:
        return 'Equipment Details';
    }
  };
  
  // Added state for confirming quantity
  const [quantityConfirmed, setQuantityConfirmed] = React.useState(false);
  const [quantityValue, setQuantityValue] = React.useState(quantity);

  React.useEffect(() => {
    // Reset confirmation when quantity changes externally
    if (quantity !== quantityValue) {
      setQuantityValue(quantity);
      setQuantityConfirmed(false);
    }
  }, [quantity]);

  const handleConfirmQuantity = () => {
    setQuantity(quantityValue);
    setQuantityConfirmed(true);
  };

  const renderEquipmentOptions = () => {
    if (serviceType === 'concrete-pumping') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Pump Type</label>
            <Select
              value={pumpType}
              onValueChange={(value) => {
                setPumpType(value);
                setFormErrors({...formErrors, pumpType: ""});
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select pump type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="miko-team-22">Miko Team 22</SelectItem>
                <SelectItem value="pump-up-to-32">Pump Up to 32</SelectItem>
                <SelectItem value="pump-up-to-36">Pump Up to 36</SelectItem>
                <SelectItem value="pump-up-to-42">Pump Up to 42</SelectItem>
                <SelectItem value="pump-up-to-48">Pump Up to 48</SelectItem>
                <SelectItem value="pump-up-to-52">Pump Up to 52</SelectItem>
                <SelectItem value="pump-up-to-56">Pump Up to 56</SelectItem>
                <SelectItem value="pump-up-to-62">Pump Up to 62</SelectItem>
                <SelectItem value="pump-up-to-68">Pump Up to 68</SelectItem>
                <SelectItem value="pump-up-to-72">Pump Up to 72</SelectItem>
                <SelectItem value="pump-up-to-80">Pump Up to 80</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.pumpType && (
              <p className="text-sm text-red-500 mt-1">{formErrors.pumpType}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Quantity ({getQuantityUnit()})</label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  value={quantityValue}
                  onChange={(e) => {
                    setQuantityValue(e.target.value);
                    setQuantityConfirmed(false);
                  }}
                  placeholder={`Enter quantity in ${getQuantityUnit()}`}
                  disabled={quantityConfirmed}
                />
              </div>
              <Button 
                onClick={handleConfirmQuantity}
                size="icon"
                variant={quantityConfirmed ? "flatGreen" : "secondary"}
                disabled={quantityConfirmed}
              >
                <Check className="h-5 w-5" />
              </Button>
            </div>
            {!quantityConfirmed && (
              <p className="text-sm text-amber-600 mt-1 flex items-center">
                <X className="h-3 w-3 mr-1" /> Quantity approval required
              </p>
            )}
            {quantityConfirmed && (
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <Check className="h-3 w-3 mr-1" /> Quantity approved
              </p>
            )}
          </div>
        </>
      );
    } else if (serviceType === 'cranes') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Crane Size</label>
            <Select
              value={craneSize}
              onValueChange={(value) => {
                setCraneSize(value);
                setFormErrors({...formErrors, craneSize: ""});
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select crane size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (Up to 50 tons)</SelectItem>
                <SelectItem value="medium">Medium (50-100 tons)</SelectItem>
                <SelectItem value="large">Large (100-200 tons)</SelectItem>
                <SelectItem value="extra-large">Extra Large (200+ tons)</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.craneSize && (
              <p className="text-sm text-red-500 mt-1">{formErrors.craneSize}</p>
            )}
          </div>
        </>
      );
    } else if (serviceType === 'transportation') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Vehicle Type</label>
            <Select
              value={vehicleType}
              onValueChange={(value) => {
                setVehicleType(value);
                setFormErrors({...formErrors, vehicleType: ""});
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flatbed">Flatbed Truck</SelectItem>
                <SelectItem value="dump-truck">Dump Truck</SelectItem>
                <SelectItem value="concrete-mixer">Concrete Mixer</SelectItem>
                <SelectItem value="heavy-haul">Heavy Haul Trailer</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.vehicleType && (
              <p className="text-sm text-red-500 mt-1">{formErrors.vehicleType}</p>
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Equipment Details</label>
            <Textarea
              value={generalEquipment}
              onChange={(e) => {
                setGeneralEquipment(e.target.value);
                setFormErrors({...formErrors, generalEquipment: ""});
              }}
              placeholder="Please describe the equipment needed"
              className="min-h-[100px]"
            />
            {formErrors.generalEquipment && (
              <p className="text-sm text-red-500 mt-1">{formErrors.generalEquipment}</p>
            )}
          </div>
        </>
      );
    }
  };

  const getEquipmentIcon = () => {
    switch (serviceType) {
      case 'concrete-pumping':
        return <Truck className="h-12 w-12 md:h-16 md:w-16 text-blue-600 mb-4 md:mb-6" />;
      case 'cranes':
        return <Construction className="h-12 w-12 md:h-16 md:w-16 text-blue-600 mb-4 md:mb-6" />;
      case 'transportation':
        return <Bus className="h-12 w-12 md:h-16 md:w-16 text-blue-600 mb-4 md:mb-6" />;
      default:
        return <HelpCircle className="h-12 w-12 md:h-16 md:w-16 text-blue-600 mb-4 md:mb-6" />;
    }
  };

  const getEquipmentTitle = () => {
    switch (serviceType) {
      case 'concrete-pumping':
        return "Concrete Pump Details";
      case 'cranes':
        return "Crane Equipment Details";
      case 'transportation':
        return "Transportation Details";
      default:
        return "Equipment Details";
    }
  };

  const handleContinue = () => {
    if (serviceType === 'concrete-pumping' && !quantityConfirmed) {
      setFormErrors({...formErrors, quantity: "Please approve the quantity before continuing"});
      return;
    }
    moveToNextStep();
  };

  return (
    <motion.div 
      key={`equipment-${serviceType}`}
      variants={containerVariants}
      initial="hidden"
      animate={errorShakeAnimate ? "shake" : "visible"}
      exit="exit"
      className="flex flex-col items-center justify-center min-h-[400px] p-4 md:p-8 bg-white rounded-xl shadow-sm"
    >
      {getEquipmentIcon()}
      <h2 className="text-xl md:text-3xl font-bold mb-2 text-center">{getEquipmentTitle()}</h2>
      <p className="text-gray-500 mb-4 md:mb-6 text-center text-sm md:text-base">Provide equipment details for this service</p>
      
      <div className="w-full max-w-md space-y-4 md:space-y-6">
        {renderEquipmentOptions()}
      </div>
      
      {formErrors.equipment && (
        <motion.p 
          variants={errorShake}
          className="text-red-500 flex items-center mt-4 justify-center"
        >
          <X className="h-4 w-4 mr-1" />
          {formErrors.equipment}
        </motion.p>
      )}
      
      {formErrors.quantity && (
        <motion.p 
          variants={errorShake}
          className="text-red-500 flex items-center mt-4 justify-center"
        >
          <X className="h-4 w-4 mr-1" />
          {formErrors.quantity}
        </motion.p>
      )}
      
      <div className="mt-6 md:mt-8 flex justify-between w-full max-w-md">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className="text-base md:text-lg h-10 px-6 md:h-12 md:px-8"
        >
          Back
        </Button>
        <Button 
          onClick={handleContinue}
          className="text-base md:text-lg h-10 px-6 md:h-12 md:px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default EquipmentStep;
