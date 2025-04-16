
import React from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import CertificateTypeStep from '../CertificateTypeStep';

export const TypeStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  formErrors,
  setFormErrors,
  errorShakeAnimate,
  moveToNextStep,
  serviceCall
}) => {
  return (
    <CertificateTypeStep
      serviceType={formData.serviceType}
      setServiceType={(value) => updateFormData('serviceType', value)}
      formErrors={formErrors}
      setFormErrors={setFormErrors}
      errorShakeAnimate={errorShakeAnimate}
      moveToNextStep={moveToNextStep}
      serviceCall={serviceCall}
    />
  );
};
