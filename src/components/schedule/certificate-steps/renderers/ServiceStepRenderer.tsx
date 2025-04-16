
import React from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import ServiceDetailsStep from '../ServiceDetailsStep';

export const ServiceStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  formErrors,
  setFormErrors,
  errorShakeAnimate,
  moveToNextStep,
  moveToPrevStep,
  serviceCall
}) => {
  return (
    <ServiceDetailsStep
      serviceType={formData.serviceType}
      date={formData.date}
      setDate={(value) => updateFormData('date', value)}
      startTime={formData.startTime}
      setStartTime={(value) => updateFormData('startTime', value)}
      endTime={formData.endTime}
      setEndTime={(value) => updateFormData('endTime', value)}
      hourlyBooking={formData.hourlyBooking}
      setHourlyBooking={(value: string | number) => updateFormData('hourlyBooking', value.toString())}
      operator={formData.operator}
      setOperator={(value) => updateFormData('operator', value)}
      vehicleNumber={formData.vehicleNumber}
      setVehicleNumber={(value) => updateFormData('vehicleNumber', value)}
      formErrors={formErrors}
      setFormErrors={setFormErrors}
      errorShakeAnimate={errorShakeAnimate}
      moveToNextStep={moveToNextStep}
      moveToPrevStep={moveToPrevStep}
      serviceCall={serviceCall}
    />
  );
};
