
import React from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import MaterialsStep from '../MaterialsStep';

export const MaterialsStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  moveToNextStep,
  moveToPrevStep,
  serviceCall
}) => {
  return (
    <MaterialsStep
      concreteType={formData.concreteType}
      setConcreteType={(value) => updateFormData('concreteType', value)}
      quantity={formData.quantity}
      setQuantity={(value) => updateFormData('quantity', value)}
      companyProvides={formData.companyProvides}
      setCompanyProvides={(value) => updateFormData('companyProvides', value)}
      elementType={formData.elementType}
      setElementType={(value) => updateFormData('elementType', value)}
      moveToNextStep={moveToNextStep}
      moveToPrevStep={moveToPrevStep}
      serviceCall={serviceCall}
    />
  );
};
