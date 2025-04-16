
import React, { useState, useEffect, useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { certificateSteps, certificateSubSteps, CertificateStepId, CertificateSubStepId } from './certificate-steps/stepsConfig';
import StepsProgress from './certificate-steps/StepsProgress';
import StepRenderer from './certificate-steps/StepRenderer';
import { useCertificateValidation } from './certificate-steps/useCertificateValidation';

// Define the props interface
interface ConvertToCertificateFlowProps {
  isOpen: boolean;
  onClose: () => void;
  serviceCall: any;
  onSave?: (data: any) => void;
}

const ConvertToCertificateFlow: React.FC<ConvertToCertificateFlowProps> = ({ 
  isOpen, 
  onClose,
  serviceCall,
  onSave
}) => {
  // Basic info (pre-filled from service call)
  const [date, setDate] = useState<Date>(new Date());
  const [serviceType, setServiceType] = useState('');
  const [customer, setCustomer] = useState('');
  const [projectSite, setProjectSite] = useState('');
  const [hourlyBooking, setHourlyBooking] = useState('0');
  const [pumpType, setPumpType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [notes, setNotes] = useState('');
  
  // Additional info
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [concreteType, setConcreteType] = useState('');
  const [companyProvides, setCompanyProvides] = useState('');
  const [elementType, setElementType] = useState('');
  const [waitingTime, setWaitingTime] = useState('');
  const [workType, setWorkType] = useState('');
  
  // Service additions
  const [transfers, setTransfers] = useState('0');
  const [additionalPipe, setAdditionalPipe] = useState('0');
  const [malkoTeam, setMalkoTeam] = useState('no');
  const [includeConcreteSupply, setIncludeConcreteSupply] = useState('no');
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  // Loading state
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const initialRender = useRef(true);
  
  // Use the certificate validation hook with initialStep explicitly set to 'additional'
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
    validateCertificateInfo: () => validateCertificateInfo(),
    onAdvance: () => handleAdvance(),
    initialStep: 'additional'
  });
  
  // Pre-populate data from service call when component mounts
  useEffect(() => {
    if (serviceCall && isOpen) {
      console.log("ConvertToCertificateFlow: Initializing with service call:", serviceCall);
      
      if (serviceCall.date) {
        setDate(new Date(serviceCall.date));
      }
      
      if (serviceCall.serviceType) {
        setServiceType(serviceCall.serviceType);
      }
      
      if (serviceCall.customer) {
        setCustomer(serviceCall.customer);
      }
      
      if (serviceCall.projectSite) {
        setProjectSite(serviceCall.projectSite);
      }
      
      if (serviceCall.hourlyBooking !== undefined) {
        setHourlyBooking(serviceCall.hourlyBooking.toString());
      }
      
      if (serviceCall.pumpType) {
        setPumpType(serviceCall.pumpType);
      }
      
      if (serviceCall.quantity) {
        setQuantity(serviceCall.quantity);
      }
      
      if (serviceCall.vehicleNumber) {
        setVehicleNumber(serviceCall.vehicleNumber);
      }
      
      if (serviceCall.operator) {
        setOperator(serviceCall.operator);
      }
      
      if (serviceCall.startTime) {
        setStartTime(serviceCall.startTime);
      }
      
      if (serviceCall.notes) {
        setNotes(serviceCall.notes);
      }
      
      // Set the flag that data has been loaded
      setDataLoaded(true);
      
      console.log("ConvertToCertificateFlow: Data populated from service call");
    }
  }, [serviceCall, isOpen]);
  
  // Force the step to be 'additional' after the data is loaded
  useEffect(() => {
    if (dataLoaded && isOpen) {
      console.log("ConvertToCertificateFlow: Data loaded, forcing step to 'additional'");
      
      // Force correct step and substep
      setCurrentStep('additional');
      setCurrentSubStep('concreteType');
      
      console.log("ConvertToCertificateFlow: Current step:", currentStep, "Current substep:", currentSubStep);
    }
  }, [dataLoaded, isOpen, setCurrentStep, setCurrentSubStep]);
  
  // Ensure we're on the correct step when the dialog opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setCurrentStep('additional');
        setCurrentSubStep('concreteType');
        console.log("ConvertToCertificateFlow: Forced step on open:", 'additional', "Substep:", 'concreteType');
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, setCurrentStep, setCurrentSubStep]);
  
  // Monitor current step and substep for debugging
  useEffect(() => {
    console.log("ConvertToCertificateFlow: Step changed to:", currentStep, "Substep:", currentSubStep);
  }, [currentStep, currentSubStep]);
  
  const showError = (message: string) => {
    setErrorShakeAnimate(true);
    toast.error(message);
    setTimeout(() => setErrorShakeAnimate(false), 500);
  };
  
  const validateCertificateInfo = () => {
    // Basic validation - service type, customer, and operator should already be set
    if (!serviceType || !customer || !operator) {
      if (!serviceType) {
        showError("Service type is required");
        return false;
      }
      
      if (!customer) {
        showError("Customer is required");
        return false;
      }
      
      if (!operator) {
        showError("Operator is required");
        return false;
      }
    }
    
    return true;
  };
  
  const showCelebration = () => {
    toast.success("Certificate Information Complete!", {
      description: "Successfully completed all certificate information. Moving to the next step!",
      duration: 3000,
    });
  };
  
  const handleAdvance = () => {
    setLoading(true);
    
    setTimeout(() => {
      if (!onSave) {
        toast.success('Delivery certificate created', {
          description: 'The certificate has been saved successfully.',
        });
      } else {
        const certificateData = {
          date,
          serviceType,
          customer,
          projectSite,
          hourlyBooking,
          pumpType,
          quantity,
          vehicleNumber,
          operator,
          notes,
          
          // Additional info
          startTime,
          endTime,
          concreteType,
          companyProvides,
          elementType,
          waitingTime,
          workType,
          
          // Service additions
          transfers,
          additionalPipe,
          malkoTeam,
          includeConcreteSupply,
          additionalNotes,
        };
        
        onSave(certificateData);
      }
      
      setLoading(false);
      onClose();
    }, 1000);
  };
  
  // Mock customers for demo
  const customers = [
    { id: 'ABC Construction', name: 'ABC Construction' },
    { id: 'XYZ Builders', name: 'XYZ Builders' },
    { id: 'FastBuild Inc.', name: 'FastBuild Inc.' },
    { id: 'Premium Construction', name: 'Premium Construction' },
    { id: 'City Developers', name: 'City Developers' },
    { id: 'Metropolitan Projects', name: 'Metropolitan Projects' },
    { id: 'Urban Construction', name: 'Urban Construction' },
    { id: 'Elite Builders', name: 'Elite Builders' }
  ];
  
  // Ensure the flow is locked to the additional step
  const forceAdditionalStep = () => {
    if (currentStep !== 'additional') {
      console.log("Forcing back to additional step from:", currentStep);
      setCurrentStep('additional');
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <DialogTitle>
            Additional Information for Delivery Certificate
          </DialogTitle>
          <div className="text-sm text-blue-600 font-medium">
            Service call information has been transferred. Please complete the additional details below.
          </div>
        </DialogHeader>
        
        <div className="py-2">
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
        </div>
        
        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConvertToCertificateFlow;
