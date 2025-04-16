
import React from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import CertificateCompleteStep from '../CertificateCompleteStep';

export const CompleteStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  moveToNextStep,
  moveToPrevStep,
  setCurrentStep,
  customers
}) => {
  return (
    <CertificateCompleteStep
      date={formData.date}
      serviceType={formData.serviceType}
      customer={formData.customer}
      projectSite={formData.projectSite}
      operator={formData.operator}
      pumpType={formData.pumpType}
      quantity={formData.quantity}
      hourlyBooking={formData.hourlyBooking}
      concreteType={formData.concreteType}
      notes={formData.notes}
      additionalNotes={formData.additionalNotes}
      startTime={formData.startTime}
      endTime={formData.endTime}
      moveToNextStep={moveToNextStep}
      moveToPrevStep={moveToPrevStep}
      setCurrentStep={setCurrentStep}
      customers={customers}
    />
  );
};
