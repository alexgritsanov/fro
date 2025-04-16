
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { containerVariants, errorShake } from '../serviceInfoUtils';
import { Button } from '@/components/ui/button';

// Import refactored components
import DateSelection from './components/DateSelection';
import OperatorSelection from './components/OperatorSelection';
import TimeSelection from './components/TimeSelection';
import VehicleInformation from './components/VehicleInformation';
import ServiceCallInfo from './components/ServiceCallInfo';

interface ServiceDetailsStepProps {
  serviceType: string;
  date: Date;
  setDate: (date: Date) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  hourlyBooking: string;
  setHourlyBooking: (hour: string | number) => void;
  operator: string;
  setOperator: (operator: string) => void;
  vehicleNumber: string;
  setVehicleNumber: (number: string) => void;
  pumpType?: string;
  setPumpType?: (type: string) => void;
  formErrors: {[key: string]: string};
  setFormErrors: (errors: {[key: string]: string}) => void;
  errorShakeAnimate: boolean;
  moveToNextStep: () => void;
  moveToPrevStep: () => void;
  serviceCall?: any;
}

const ServiceDetailsStep: React.FC<ServiceDetailsStepProps> = ({
  serviceType,
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  hourlyBooking,
  setHourlyBooking,
  operator,
  setOperator,
  vehicleNumber,
  setVehicleNumber,
  formErrors,
  errorShakeAnimate,
  moveToNextStep,
  moveToPrevStep,
  serviceCall
}) => {
  
  // Pre-select values from service call if available
  React.useEffect(() => {
    if (serviceCall) {
      if (serviceCall.date && date.toString() === new Date().toString()) {
        setDate(new Date(serviceCall.date));
      }
      
      if (serviceCall.startTime && !startTime) {
        setStartTime(serviceCall.startTime);
      }
      
      if (serviceCall.hourlyBooking !== undefined && hourlyBooking === '0') {
        setHourlyBooking(serviceCall.hourlyBooking.toString());
      }
      
      if (serviceCall.vehicleNumber && !vehicleNumber) {
        setVehicleNumber(serviceCall.vehicleNumber);
      }
      
      if (serviceCall.operator && !operator) {
        setOperator(serviceCall.operator);
      }
    }
  }, [serviceCall]);

  return (
    <motion.div 
      variants={errorShakeAnimate ? errorShake : containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-4 md:p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-6">
        <Clock className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-xl md:text-2xl font-bold">Service Details</h2>
      </div>
      
      <ServiceCallInfo serviceCall={serviceCall} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Date Selection */}
        <DateSelection date={date} setDate={setDate} />
      
        {/* Operator Selection */}
        <OperatorSelection 
          operator={operator} 
          setOperator={setOperator}
          error={formErrors.operator}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Time Selection */}
        <TimeSelection 
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
      </div>
      
      {serviceType === 'concrete-pumping' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Vehicle Information for concrete pumping */}
          <VehicleInformation
            vehicleNumber={vehicleNumber}
            setVehicleNumber={setVehicleNumber}
          />
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className="border-gray-300 bg-white hover:bg-gray-50 flex items-center rounded-full px-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Button 
          onClick={moveToNextStep}
          disabled={!operator}
          className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-6 shadow-md hover:shadow-lg transition-all"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceDetailsStep;
