
import { useState } from 'react';
import { CertificateStepId, CertificateSubStepId } from '../stepsConfig';

export interface CertificateFormData {
  // Basic info
  date: Date;
  serviceType: string;
  customer: string;
  projectSite: string;
  pumpType: string;
  quantity: string;
  vehicleNumber: string;
  operator: string;
  notes: string;
  hourlyBooking: string; // Keep this field for compatibility
  
  // Additional info
  startTime: string;
  endTime: string;
  concreteType: string;
  companyProvides: string;
  elementType: string;
  waitingTime: string;
  workType: string;
  
  // Service additions
  transfers: string;
  additionalPipe: string;
  malkoTeam: string;
  includeConcreteSupply: string;
  additionalNotes: string;
}

export interface CertificateStepProps {
  formData: CertificateFormData;
  updateFormData: (field: keyof CertificateFormData, value: string | Date) => void;
  serviceCall?: any;
  customers: any[];
  formErrors: {[key: string]: string};
  setFormErrors: (errors: {[key: string]: string}) => void;
  errorShakeAnimate: boolean;
  moveToNextStep: () => void;
  moveToPrevStep: () => void;
  setCurrentStep: (step: CertificateStepId) => void;
  currentSubStep: CertificateSubStepId;
  setCurrentSubStep: (subStep: CertificateSubStepId) => void;
}

export const useCertificateStepProps = (
  initialData: Partial<CertificateFormData> = {},
  serviceCall?: any,
  customers: any[] = []
) => {
  const [formData, setFormData] = useState<CertificateFormData>({
    date: new Date(),
    serviceType: '',
    customer: '',
    projectSite: '',
    pumpType: '',
    quantity: '',
    vehicleNumber: '',
    operator: '',
    notes: '',
    hourlyBooking: '',
    startTime: '',
    endTime: '',
    concreteType: '',
    companyProvides: '',
    elementType: '',
    waitingTime: '',
    workType: '',
    transfers: '',
    additionalPipe: '',
    malkoTeam: '',
    includeConcreteSupply: '',
    additionalNotes: '',
    ...initialData
  });
  
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [errorShakeAnimate, setErrorShakeAnimate] = useState(false);
  const [currentStep, setCurrentStep] = useState<CertificateStepId>("basic");
  const [currentSubStep, setCurrentSubStep] = useState<CertificateSubStepId>("type");
  
  const updateFormData = (field: keyof CertificateFormData, value: string | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const moveToNextStep = () => {
    // This would be implemented by the parent component
  };
  
  const moveToPrevStep = () => {
    // This would be implemented by the parent component
  };
  
  return {
    formData,
    updateFormData,
    formErrors,
    setFormErrors,
    errorShakeAnimate,
    setErrorShakeAnimate,
    currentStep,
    setCurrentStep,
    currentSubStep,
    setCurrentSubStep,
    moveToNextStep,
    moveToPrevStep,
    serviceCall,
    customers
  };
};
