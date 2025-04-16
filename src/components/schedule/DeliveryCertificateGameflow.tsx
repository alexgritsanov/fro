
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CertificateStepId, CertificateSubStepId } from './certificate-steps/stepsConfig';
import StepsProgress from './certificate-steps/StepsProgress';
import StepRenderer from './certificate-steps/StepRenderer';
import { useCertificateValidation } from './certificate-steps/useCertificateValidation';

// Define the props interface
interface DeliveryCertificateGameflowProps {
  // Basic info
  date: Date;
  setDate: (date: Date) => void;
  serviceType: string;
  setServiceType: (type: string) => void;
  customer: string;
  setCustomer: (customer: string) => void;
  projectSite: string;
  setProjectSite: (site: string) => void;
  hourlyBooking: string;
  setHourlyBooking: React.Dispatch<React.SetStateAction<string>>;
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
  
  // Additional info
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  concreteType: string;
  setConcreteType: (type: string) => void;
  companyProvides: string;
  setCompanyProvides: (company: string) => void;
  elementType: string;
  setElementType: (type: string) => void;
  waitingTime: string;
  setWaitingTime: (time: string) => void;
  workType: string;
  setWorkType: (type: string) => void;
  
  // Service additions
  transfers: string;
  setTransfers: (transfers: string) => void;
  additionalPipe: string;
  setAdditionalPipe: (pipe: string) => void;
  malkoTeam: string;
  setMalkoTeam: (team: string) => void;
  includeConcreteSupply: string;
  setIncludeConcreteSupply: (include: string) => void;
  additionalNotes: string;
  setAdditionalNotes: (notes: string) => void;
  
  // Form validation
  validateCertificateInfo: () => boolean;
  onAdvance: () => void;
  
  // Data helpers
  customers: any[];
  serviceCall?: any;
  initialStep?: CertificateStepId;
}

export const DeliveryCertificateGameflow: React.FC<DeliveryCertificateGameflowProps> = ({
  // Basic info
  date,
  setDate,
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
  
  // Additional info
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  concreteType,
  setConcreteType,
  companyProvides,
  setCompanyProvides,
  elementType,
  setElementType,
  waitingTime,
  setWaitingTime,
  workType,
  setWorkType,
  
  // Service additions
  transfers,
  setTransfers,
  additionalPipe,
  setAdditionalPipe,
  malkoTeam,
  setMalkoTeam,
  includeConcreteSupply,
  setIncludeConcreteSupply,
  additionalNotes,
  setAdditionalNotes,
  
  // Form validation
  validateCertificateInfo,
  onAdvance,
  
  // Data helpers
  customers,
  serviceCall,
  initialStep = 'basic'
}) => {
  // Track if this is the first render
  const firstRender = useRef(true);

  // Use our custom validation hook
  const {
    currentStep,
    setCurrentStep,
    currentSubStep,
    setCurrentSubStep,
    formErrors,
    setFormErrors,
    errorShakeAnimate,
    setErrorShakeAnimate,
    moveToNextStep,
    moveToPrevStep
  } = useCertificateValidation({
    serviceType,
    customer,
    projectSite,
    operator,
    validateCertificateInfo,
    onAdvance,
    initialStep
  });

  // Make sure we're starting at the correct step
  useEffect(() => {
    console.log("DeliveryCertificateGameflow: initialStep is set to:", initialStep);
    
    if (firstRender.current) {
      // Force the correct initial step on first render
      setCurrentStep(initialStep);
      
      if (initialStep === 'additional') {
        setCurrentSubStep('concreteType');
        console.log("DeliveryCertificateGameflow: Forcing step to concreteType");
      } else if (initialStep === 'additions') {
        setCurrentSubStep('waitingTime');
        console.log("DeliveryCertificateGameflow: Forcing step to waitingTime");
      } else if (initialStep === 'preview') {
        setCurrentSubStep('complete');
        console.log("DeliveryCertificateGameflow: Forcing step to complete");
      } else {
        setCurrentSubStep('type');
        console.log("DeliveryCertificateGameflow: Forcing step to type");
      }
      
      firstRender.current = false;
    }
  }, [initialStep, setCurrentStep, setCurrentSubStep]);

  return (
    <motion.div className="w-full">
      <StepsProgress currentStep={currentStep} currentSubStep={currentSubStep} />
      
      <StepRenderer
        currentStep={currentStep}
        currentSubStep={currentSubStep}
        setCurrentSubStep={setCurrentSubStep}
        // Basic info
        date={date}
        setDate={setDate}
        serviceType={serviceType}
        setServiceType={setServiceType}
        customer={customer}
        setCustomer={setCustomer}
        projectSite={projectSite}
        setProjectSite={setProjectSite}
        hourlyBooking={hourlyBooking}
        setHourlyBooking={(value) => setHourlyBooking(value)}
        pumpType={pumpType}
        setPumpType={setPumpType}
        quantity={quantity}
        setQuantity={setQuantity}
        vehicleNumber={vehicleNumber}
        setVehicleNumber={setVehicleNumber}
        operator={operator}
        setOperator={setOperator}
        notes={notes}
        setNotes={setNotes}
        
        // Additional info
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        concreteType={concreteType}
        setConcreteType={setConcreteType}
        companyProvides={companyProvides}
        setCompanyProvides={setCompanyProvides}
        elementType={elementType}
        setElementType={setElementType}
        waitingTime={waitingTime}
        setWaitingTime={setWaitingTime}
        workType={workType}
        setWorkType={setWorkType}
        
        // Service additions
        transfers={transfers}
        setTransfers={setTransfers}
        additionalPipe={additionalPipe}
        setAdditionalPipe={setAdditionalPipe}
        malkoTeam={malkoTeam}
        setMalkoTeam={setMalkoTeam}
        includeConcreteSupply={includeConcreteSupply}
        setIncludeConcreteSupply={setIncludeConcreteSupply}
        additionalNotes={additionalNotes}
        setAdditionalNotes={setAdditionalNotes}
        
        // Navigation and validation
        moveToNextStep={moveToNextStep}
        moveToPrevStep={moveToPrevStep}
        setCurrentStep={setCurrentStep}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        errorShakeAnimate={errorShakeAnimate}
        
        // Data helpers
        customers={customers}
        serviceCall={serviceCall}
      />
    </motion.div>
  );
};

export default DeliveryCertificateGameflow;
