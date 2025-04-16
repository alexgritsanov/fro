
import React from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import CustomerInfoStep from '../CustomerInfoStep';

export const CustomerStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  formErrors,
  setFormErrors,
  errorShakeAnimate,
  moveToNextStep,
  moveToPrevStep,
  customers,
  serviceCall
}) => {
  return (
    <CustomerInfoStep
      customer={formData.customer}
      setCustomer={(value) => updateFormData('customer', value)}
      projectSite={formData.projectSite}
      setProjectSite={(value) => updateFormData('projectSite', value)}
      formErrors={formErrors}
      setFormErrors={setFormErrors}
      errorShakeAnimate={errorShakeAnimate}
      moveToNextStep={moveToNextStep}
      moveToPrevStep={moveToPrevStep}
      customers={customers}
      serviceCall={serviceCall}
    />
  );
};
