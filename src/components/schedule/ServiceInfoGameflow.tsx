
import React, { useState, useEffect } from 'react';
import { FileText, Building2, MapPin, CalendarIcon, Truck, Info, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { playSuccessSound } from './serviceInfoUtils';
import { Progress } from "@/components/ui/progress";

// Import step components
import ServiceTypeStep from './steps/ServiceTypeStep';
import CustomerStep from './steps/CustomerStep';
import LocationStep from './steps/LocationStep';
import ScheduleStep from './steps/ScheduleStep';
import EquipmentStep from './steps/EquipmentStep';
import DetailsStep from './steps/DetailsStep';
import CompleteStep from './steps/CompleteStep';

// Define the props interface
interface ServiceInfoGameflowProps {
  date: Date;
  setDate: (date: Date) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  serviceType: string;
  setServiceType: (type: string) => void;
  customer: string;
  setCustomer: (customer: string) => void;
  projectSite: string;
  setProjectSite: (site: string) => void;
  hourlyBooking: string | number;
  setHourlyBooking: (hours: string | number) => void;
  pumpType: string;
  setPumpType: (type: string) => void;
  quantity: string;
  setQuantity: (quantity: string) => void;
  vehicleNumber: string;
  setVehicleNumber: (number: string) => void;
  operator: string;
  setOperator: (operator: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  customers: any[];
  customSites: string[];
  setCustomSites: (sites: string[]) => void;
  validateServiceInfo: () => boolean;
  onAdvance: () => void;
}

// Reordered steps to put service type first
const steps = [
  { id: "service", title: "Service Type", icon: FileText },
  { id: "customer", title: "Customer", icon: Building2 },
  { id: "location", title: "Location", icon: MapPin },
  { id: "schedule", title: "Schedule", icon: CalendarIcon },
  { id: "equipment", title: "Equipment", icon: Truck },
  { id: "details", title: "Details", icon: Info },
  { id: "complete", title: "Complete", icon: Check }
];

// Service Type sub-steps
const serviceTypeSubSteps = [
  { id: "concrete-pumping", title: "Concrete Pumping" },
  { id: "cranes", title: "Cranes" },
  { id: "transportation", title: "Transportation" },
  { id: "general", title: "General Service" }
];

export const ServiceInfoGameflow: React.FC<ServiceInfoGameflowProps> = ({
  date,
  setDate,
  startTime,
  setStartTime,
  serviceType,
  setServiceType,
  customer,
  setCustomer,
  projectSite,
  setProjectSite,
  hourlyBooking,
  setHourlyBooking,
  pumpType,
  setPumpType,
  quantity,
  setQuantity,
  vehicleNumber,
  setVehicleNumber,
  operator,
  setOperator,
  notes,
  setNotes,
  customers,
  customSites,
  setCustomSites,
  validateServiceInfo,
  onAdvance
}) => {
  const [currentStep, setCurrentStep] = useState<string>("service");
  const [customerSearch, setCustomerSearch] = useState('');
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [errorShakeAnimate, setErrorShakeAnimate] = useState(false);
  const [craneSize, setCraneSize] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [generalEquipment, setGeneralEquipment] = useState("");

  // Calculate progress based on current step
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;
  
  // Calculate sub-progress based on current step selection
  const getSubProgress = () => {
    switch (currentStep) {
      case "service":
        return serviceType ? 100 : 0;
      case "customer":
        return customer ? 100 : 0;
      case "location":
        return projectSite ? 100 : 0;
      case "equipment":
        if (serviceType === 'concrete-pumping') {
          return pumpType ? 100 : 0;
        } else if (serviceType === 'cranes') {
          return craneSize ? 100 : 0;
        } else if (serviceType === 'transportation') {
          return vehicleType ? 100 : 0;
        } else {
          return generalEquipment ? 100 : 0;
        }
      default:
        return 0;
    }
  };

  const moveToNextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    
    // Validation based on the current step
    if (currentStep === "service" && !serviceType) {
      setFormErrors({...formErrors, serviceType: "Please select a service type"});
      setErrorShakeAnimate(true);
      setTimeout(() => setErrorShakeAnimate(false), 500);
      return;
    }
    
    if (currentStep === "customer" && !customer) {
      setFormErrors({...formErrors, customer: "Please select a customer"});
      setErrorShakeAnimate(true);
      setTimeout(() => setErrorShakeAnimate(false), 500);
      return;
    }
    
    if (currentStep === "location" && !projectSite) {
      setFormErrors({...formErrors, projectSite: "Please select a project site"});
      setErrorShakeAnimate(true);
      setTimeout(() => setErrorShakeAnimate(false), 500);
      return;
    }
    
    if (currentStep === "equipment") {
      if (serviceType === 'concrete-pumping' && !pumpType) {
        setFormErrors({...formErrors, pumpType: "Please select a pump type"});
        setErrorShakeAnimate(true);
        setTimeout(() => setErrorShakeAnimate(false), 500);
        return;
      } else if (serviceType === 'cranes' && !craneSize) {
        setFormErrors({...formErrors, craneSize: "Please select a crane size"});
        setErrorShakeAnimate(true);
        setTimeout(() => setErrorShakeAnimate(false), 500);
        return;
      } else if (serviceType === 'transportation' && !vehicleType) {
        setFormErrors({...formErrors, vehicleType: "Please select a vehicle type"});
        setErrorShakeAnimate(true);
        setTimeout(() => setErrorShakeAnimate(false), 500);
        return;
      } else if (serviceType === 'general' && !generalEquipment) {
        setFormErrors({...formErrors, generalEquipment: "Please enter equipment details"});
        setErrorShakeAnimate(true);
        setTimeout(() => setErrorShakeAnimate(false), 500);
        return;
      }
    }

    if (currentStep === "complete") {
      if (validateServiceInfo()) {
        showCelebration();
        setTimeout(() => {
          onAdvance();
        }, 1500);
      }
      return;
    }
    
    const newErrors = {...formErrors};
    delete newErrors[currentStep];
    setFormErrors(newErrors);
    
    playSuccessSound();
    
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const moveToPrevStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const showCelebration = () => {
    toast.success("Service Information Complete!", {
      description: "Successfully completed all service information. Moving to the next step!",
      duration: 3000,
    });
  };

  // Auto-advance when a selection is made on certain steps - removed from service type step
  useEffect(() => {
    if (customer && currentStep === "customer") {
      setTimeout(() => moveToNextStep(), 500);
    }
  }, [customer]);

  useEffect(() => {
    if (projectSite && currentStep === "location") {
      setTimeout(() => moveToNextStep(), 500);
    }
  }, [projectSite]);

  // Render the appropriate step component based on currentStep
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "service":
        return (
          <ServiceTypeStep
            serviceType={serviceType}
            setServiceType={setServiceType}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            errorShakeAnimate={errorShakeAnimate}
            moveToNextStep={moveToNextStep}
          />
        );
      case "customer":
        return (
          <CustomerStep
            customer={customer}
            setCustomer={setCustomer}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            errorShakeAnimate={errorShakeAnimate}
            customers={customers}
            customerSearch={customerSearch}
            setCustomerSearch={setCustomerSearch}
            moveToNextStep={moveToNextStep}
            moveToPrevStep={moveToPrevStep}
          />
        );
      case "location":
        return (
          <LocationStep
            projectSite={projectSite}
            setProjectSite={setProjectSite}
            customSites={customSites}
            setCustomSites={setCustomSites}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            errorShakeAnimate={errorShakeAnimate}
            moveToNextStep={moveToNextStep}
            moveToPrevStep={moveToPrevStep}
          />
        );
      case "schedule":
        return (
          <ScheduleStep
            date={date}
            setDate={setDate}
            startTime={startTime}
            setStartTime={setStartTime}
            moveToNextStep={moveToNextStep}
            moveToPrevStep={moveToPrevStep}
          />
        );
      case "equipment":
        return (
          <EquipmentStep
            serviceType={serviceType}
            pumpType={pumpType}
            setPumpType={setPumpType}
            hourlyBooking={hourlyBooking}
            setHourlyBooking={setHourlyBooking}
            quantity={quantity}
            setQuantity={setQuantity}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            errorShakeAnimate={errorShakeAnimate}
            moveToNextStep={moveToNextStep}
            moveToPrevStep={moveToPrevStep}
            craneSize={craneSize}
            setCraneSize={setCraneSize}
            vehicleType={vehicleType}
            setVehicleType={setVehicleType}
            generalEquipment={generalEquipment}
            setGeneralEquipment={setGeneralEquipment}
          />
        );
      case "details":
        return (
          <DetailsStep
            notes={notes}
            setNotes={setNotes}
            moveToNextStep={moveToNextStep}
            moveToPrevStep={moveToPrevStep}
          />
        );
      case "complete":
        return (
          <CompleteStep
            date={date}
            startTime={startTime}
            serviceType={serviceType}
            customer={customer}
            projectSite={projectSite}
            pumpType={pumpType}
            quantity={quantity}
            hourlyBooking={hourlyBooking}
            notes={notes}
            moveToNextStep={moveToNextStep}
            moveToPrevStep={moveToPrevStep}
            customers={customers}
            craneSize={craneSize}
            vehicleType={vehicleType}
            allowInlineEdit={true}
            setServiceType={setServiceType}
            setCustomer={setCustomer}
            setProjectSite={setProjectSite}
            setPumpType={setPumpType}
            setQuantity={setQuantity}
            setNotes={setNotes}
            setCurrentStep={setCurrentStep}
            generalEquipment={generalEquipment}
          />
        );
      default:
        return null;
    }
  };

  // Render the step progress bar
  const renderStepsProgress = () => {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
        </div>
        <Progress 
          value={progress} 
          className="h-2 bg-gray-100"
          indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500" 
        />
        
        <div className="flex mt-4 mb-2">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
            
            return (
              <div 
                key={step.id} 
                className="flex flex-col items-center flex-1"
              >
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full mb-1
                  ${isActive ? 'bg-blue-600 text-white' : ''}
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-500' : ''}
                `}>
                  <StepIcon className="w-4 h-4" />
                </div>
                <span className={`text-xs text-center hidden md:block ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render sub-steps progress if needed
  const renderSubStepsProgress = () => {
    if (currentStep === 'service' && !serviceType) {
      return (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Select Service Type</span>
            <span className="text-sm font-medium text-gray-700">0%</span>
          </div>
          <Progress 
            value={0} 
            className="h-1.5 bg-gray-100"
            indicatorClassName="bg-gradient-to-r from-amber-400 to-pink-500" 
          />
        </div>
      );
    }
    
    if (currentStep === 'equipment') {
      const subProgress = getSubProgress();
      const label = serviceType === 'concrete-pumping' ? 'Pump Type' : 
                    serviceType === 'cranes' ? 'Crane Size' :
                    serviceType === 'transportation' ? 'Vehicle Type' : 'Equipment Details';
      
      return (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Select {label}</span>
            <span className="text-sm font-medium text-gray-700">{subProgress}%</span>
          </div>
          <Progress 
            value={subProgress} 
            className="h-1.5 bg-gray-100"
            indicatorClassName="bg-gradient-to-r from-amber-400 to-pink-500" 
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <motion.div className="w-full">
      {renderStepsProgress()}
      {renderSubStepsProgress()}
      {renderCurrentStep()}
    </motion.div>
  );
};

export default ServiceInfoGameflow;
