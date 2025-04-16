
import React from 'react';
import { CertificateStepId, CertificateSubStepId } from './stepsConfig';
import { CertificateFormData } from './hooks/useCertificateStepProps';
import { TypeStepRenderer } from './renderers/TypeStepRenderer';
import { CustomerStepRenderer } from './renderers/CustomerStepRenderer';
import { ProjectSiteStepRenderer } from './renderers/ProjectSiteStepRenderer';
import { DateStepRenderer } from './renderers/DateStepRenderer';
import { OperatorStepRenderer } from './renderers/OperatorStepRenderer';
import { TimeStepRenderer } from './renderers/TimeStepRenderer';
import { VehicleStepRenderer } from './renderers/VehicleStepRenderer';
import { PumpTypeStepRenderer } from './renderers/PumpTypeStepRenderer';
import { ConcreteTypeStepRenderer } from './renderers/ConcreteTypeStepRenderer';
import { ElementTypeStepRenderer } from './renderers/ElementTypeStepRenderer';
import { ProviderCompanyStepRenderer } from './renderers/ProviderCompanyStepRenderer';
import { WaitingTimeStepRenderer } from './renderers/WaitingTimeStepRenderer';
import { TransfersStepRenderer } from './renderers/TransfersStepRenderer';
import { AdditionalPipeStepRenderer } from './renderers/AdditionalPipeStepRenderer';
import { MalkoTeamStepRenderer } from './renderers/MalkoTeamStepRenderer';
import { ConcreteSupplyStepRenderer } from './renderers/ConcreteSupplyStepRenderer';
import { NotesStepRenderer } from './renderers/NotesStepRenderer';
import { WorkTypeStepRenderer } from './renderers/WorkTypeStepRenderer';
import { CompleteStepRenderer } from './renderers/CompleteStepRenderer';
import { updateFormData } from './utils/formUtils';

interface StepRendererProps {
  currentStep: CertificateStepId;
  currentSubStep: CertificateSubStepId;
  setCurrentSubStep: (subStep: CertificateSubStepId) => void;
  // Basic info
  date: Date;
  setDate: (date: Date) => void;
  serviceType: string;
  setServiceType: (type: string) => void;
  customer: string;
  setCustomer: (customer: string) => void;
  projectSite: string;
  setProjectSite: (site: string) => void;
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
  hourlyBooking: string;
  setHourlyBooking: (hour: string) => void;
  
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

  // Navigation
  moveToNextStep: () => void;
  moveToPrevStep: () => void;
  setCurrentStep: (step: CertificateStepId) => void;

  // Form validation
  formErrors: {[key: string]: string};
  setFormErrors: (errors: {[key: string]: string}) => void;
  errorShakeAnimate: boolean;
  
  // Data helpers
  customers: any[];
  serviceCall?: any;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  currentStep,
  currentSubStep,
  setCurrentSubStep,
  moveToNextStep,
  moveToPrevStep,
  setCurrentStep,
  formErrors,
  setFormErrors,
  errorShakeAnimate,
  customers,
  serviceCall,
  date,
  setDate,
  serviceType,
  setServiceType,
  customer,
  setCustomer,
  projectSite,
  setProjectSite,
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
  hourlyBooking,
  setHourlyBooking,
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
  transfers,
  setTransfers,
  additionalPipe,
  setAdditionalPipe,
  malkoTeam,
  setMalkoTeam,
  includeConcreteSupply,
  setIncludeConcreteSupply,
  additionalNotes,
  setAdditionalNotes
}) => {
  const formData: CertificateFormData = {
    date,
    serviceType,
    customer,
    projectSite,
    pumpType,
    quantity,
    vehicleNumber,
    operator,
    notes,
    hourlyBooking,
    startTime,
    endTime,
    concreteType,
    companyProvides,
    elementType,
    waitingTime,
    workType,
    transfers,
    additionalPipe,
    malkoTeam,
    includeConcreteSupply,
    additionalNotes
  };

  const setters = {
    setDate,
    setServiceType,
    setCustomer,
    setProjectSite,
    setPumpType,
    setQuantity,
    setVehicleNumber,
    setOperator,
    setNotes,
    setStartTime,
    setEndTime,
    setConcreteType,
    setCompanyProvides,
    setElementType,
    setWaitingTime,
    setWorkType,
    setTransfers,
    setAdditionalPipe,
    setMalkoTeam,
    setIncludeConcreteSupply,
    setAdditionalNotes,
    setHourlyBooking
  };

  const handleUpdateFormData = (field: keyof CertificateFormData, value: string | Date) => {
    updateFormData(field, value, setters);
  };

  const stepProps = {
    formData,
    updateFormData: handleUpdateFormData,
    formErrors,
    setFormErrors,
    errorShakeAnimate,
    moveToNextStep,
    moveToPrevStep,
    setCurrentStep,
    currentSubStep,
    setCurrentSubStep,
    customers,
    serviceCall
  };

  if (currentStep === "basic") {
    switch (currentSubStep) {
      case "type":
        return <TypeStepRenderer {...stepProps} />;
      case "customer":
        return <CustomerStepRenderer {...stepProps} />;
      case "site":
        return <ProjectSiteStepRenderer {...stepProps} />;
      case "date":
        return <DateStepRenderer {...stepProps} />;
      case "operator":
        return <OperatorStepRenderer {...stepProps} />;
      case "time":
        return <TimeStepRenderer {...stepProps} />;
      case "pumpType":
        return <PumpTypeStepRenderer {...stepProps} />;
      case "vehicle":
        return <VehicleStepRenderer {...stepProps} />;
      default:
        return null;
    }
  } else if (currentStep === "additional") {
    switch (currentSubStep) {
      case "concreteType":
        return <ConcreteTypeStepRenderer {...stepProps} />;
      case "elementType":
        return <ElementTypeStepRenderer {...stepProps} />;
      case "provider":
        return <ProviderCompanyStepRenderer {...stepProps} />;
      default:
        return null;
    }
  } else if (currentStep === "additions") {
    switch (currentSubStep) {
      case "waitingTime":
        return <WaitingTimeStepRenderer {...stepProps} />;
      case "transfers":
        return <TransfersStepRenderer {...stepProps} />;
      case "pipe":
        return <AdditionalPipeStepRenderer {...stepProps} />;
      case "malkoTeam":
        return <MalkoTeamStepRenderer {...stepProps} />;
      case "concreteSupply":
        return <ConcreteSupplyStepRenderer {...stepProps} />;
      case "notes":
        return <NotesStepRenderer {...stepProps} />;
      case "workType":
        return <WorkTypeStepRenderer {...stepProps} />;
      default:
        return null;
    }
  } else if (currentStep === "preview") {
    return <CompleteStepRenderer {...stepProps} />;
  } else if (currentStep === "signature") {
    return <CompleteStepRenderer {...stepProps} />;
  }

  return null;
};

export default StepRenderer;
