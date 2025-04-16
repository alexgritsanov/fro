
import { useState, useEffect, useRef } from 'react';
import { CertificateStepId, CertificateSubStepId, certificateSteps, certificateSubSteps } from './stepsConfig';
import { toast } from 'sonner';

interface ValidationHookProps {
  serviceType: string;
  customer: string;
  projectSite: string;
  operator: string;
  validateCertificateInfo: () => boolean;
  onAdvance: () => void;
  initialStep?: CertificateStepId;
}

export function useCertificateValidation({
  serviceType,
  customer,
  projectSite,
  operator,
  validateCertificateInfo,
  onAdvance,
  initialStep = 'basic'
}: ValidationHookProps) {
  const [currentStep, setCurrentStep] = useState<CertificateStepId>(initialStep);
  const [currentSubStep, setCurrentSubStep] = useState<CertificateSubStepId>(
    initialStep === 'additional' ? 'concreteType' :
    initialStep === 'additions' ? 'waitingTime' :
    initialStep === 'preview' ? 'complete' :
    "type"
  );
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [errorShakeAnimate, setErrorShakeAnimate] = useState(false);
  
  // Track if the initial step has been applied
  const initialStepApplied = useRef(false);
  
  // Set the initial step and substep whenever initialStep changes
  useEffect(() => {
    console.log("useCertificateValidation: Updating steps based on initialStep:", initialStep);
    
    if (!initialStepApplied.current) {
      setCurrentStep(initialStep);
      
      // Set the appropriate first sub-step for the given main step
      if (initialStep === 'additional') {
        setCurrentSubStep('concreteType');
        console.log("Setting to concreteType substep for additional info step");
      } else if (initialStep === 'additions') {
        setCurrentSubStep('waitingTime');
        console.log("Setting to waitingTime substep for additions step");
      } else if (initialStep === 'preview') {
        setCurrentSubStep('complete');
        console.log("Setting to complete substep for preview step");
      } else {
        setCurrentSubStep('type');
        console.log("Setting to type substep for basic step");
      }
      
      initialStepApplied.current = true;
    }
  }, [initialStep]);
  
  // Additional effect to enforce the correct step when the component is mounted
  useEffect(() => {
    if (initialStep !== 'basic') {
      console.log("Forcing initial step to:", initialStep);
      setCurrentStep(initialStep);
      
      if (initialStep === 'additional') {
        setCurrentSubStep('concreteType');
      } else if (initialStep === 'additions') {
        setCurrentSubStep('waitingTime');
      } else if (initialStep === 'preview') {
        setCurrentSubStep('complete');
      }
    }
  }, []);
  
  useEffect(() => {
    console.log("useCertificateValidation: Current step:", currentStep, "Current substep:", currentSubStep);
  }, [currentStep, currentSubStep]);
  
  const showError = (message: string) => {
    setErrorShakeAnimate(true);
    toast.error(message);
    setTimeout(() => setErrorShakeAnimate(false), 500);
  };

  // Find the next sub-step within the current main step
  const findNextSubStep = () => {
    const currentSubSteps = certificateSubSteps[currentStep];
    const currentSubIndex = currentSubSteps.findIndex(step => step.id === currentSubStep);
    
    if (currentSubIndex < currentSubSteps.length - 1) {
      return currentSubSteps[currentSubIndex + 1].id as CertificateSubStepId;
    }
    return null;
  };

  // Find the previous sub-step within the current main step
  const findPrevSubStep = () => {
    const currentSubSteps = certificateSubSteps[currentStep];
    const currentSubIndex = currentSubSteps.findIndex(step => step.id === currentSubStep);
    
    if (currentSubIndex > 0) {
      return currentSubSteps[currentSubIndex - 1].id as CertificateSubStepId;
    }
    return null;
  };

  const moveToNextStep = () => {
    // For converted service calls that start at additional step, 
    // we'll skip validation of basic step fields
    if (initialStep !== 'basic') {
      // Just do minimal validation on required fields, but don't block progression
      // as we're assuming this data came from a validated service call
      if (!serviceType || !customer || !operator) {
        console.log("Missing required fields, but continuing as this is a converted service call");
        const newErrors = {...formErrors};
        if (!serviceType) {
          newErrors.serviceType = "Service type is required";
        }
        if (!customer) {
          newErrors.customer = "Customer is required";
        }
        if (!operator) {
          newErrors.operator = "Operator is required";
        }
        setFormErrors(newErrors);
      }
    } else {
      // Standard validation based on the current sub-step
      if (currentSubStep === "type" && !serviceType) {
        setFormErrors({...formErrors, serviceType: "Please select a service type"});
        showError("Please select a service type");
        return;
      }
      
      if (currentSubStep === "customer" && !customer) {
        setFormErrors({...formErrors, customer: "Please select a customer"});
        showError("Please select a customer");
        return;
      }
      
      if (currentSubStep === "site" && !projectSite) {
        setFormErrors({...formErrors, projectSite: "Please select a project site"});
        showError("Please select a project site");
        return;
      }
      
      if (currentSubStep === "operator" && !operator) {
        setFormErrors({...formErrors, operator: "Please select an operator"});
        showError("Please select an operator");
        return;
      }
    }
    
    if (currentSubStep === "complete") {
      if (validateCertificateInfo()) {
        showCelebration();
        setTimeout(() => {
          onAdvance();
        }, 1500);
      }
      return;
    }
    
    const newErrors = {...formErrors};
    delete newErrors[currentSubStep];
    setFormErrors(newErrors);
    
    // Check if there's a next sub-step within the current main step
    const nextSubStep = findNextSubStep();
    
    if (nextSubStep) {
      setCurrentSubStep(nextSubStep);
    } else {
      // Move to the next main step
      const currentMainIndex = certificateSteps.findIndex(step => step.id === currentStep);
      if (currentMainIndex < certificateSteps.length - 1) {
        const nextMainStep = certificateSteps[currentMainIndex + 1].id as CertificateStepId;
        setCurrentStep(nextMainStep);
        setCurrentSubStep(certificateSubSteps[nextMainStep][0].id as CertificateSubStepId);
      }
    }
  };

  const moveToPrevStep = () => {
    // Check if there's a previous sub-step within the current main step
    const prevSubStep = findPrevSubStep();
    
    if (prevSubStep) {
      setCurrentSubStep(prevSubStep);
    } else {
      // Move to the previous main step
      const currentMainIndex = certificateSteps.findIndex(step => step.id === currentStep);
      if (currentMainIndex > 0) {
        const prevMainStep = certificateSteps[currentMainIndex - 1].id as CertificateStepId;
        setCurrentStep(prevMainStep);
        // Set to the last sub-step of the previous main step
        const prevMainSubSteps = certificateSubSteps[prevMainStep];
        setCurrentSubStep(prevMainSubSteps[prevMainSubSteps.length - 1].id as CertificateSubStepId);
      }
    }
  };

  const showCelebration = () => {
    toast.success("Certificate Information Complete!", {
      description: "Successfully completed all certificate information. Moving to the next step!",
      duration: 3000,
    });
  };

  return {
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
  };
}
