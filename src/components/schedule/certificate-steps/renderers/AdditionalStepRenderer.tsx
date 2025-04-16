
import React from 'react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import AdditionalInfoStep from '../AdditionalInfoStep';

export const AdditionalStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  moveToNextStep,
  moveToPrevStep
}) => {
  return (
    <AdditionalInfoStep
      waitingTime={formData.waitingTime}
      setWaitingTime={(value) => updateFormData('waitingTime', value)}
      workType={formData.workType}
      setWorkType={(value) => updateFormData('workType', value)}
      transfers={formData.transfers}
      setTransfers={(value) => updateFormData('transfers', value)}
      additionalPipe={formData.additionalPipe}
      setAdditionalPipe={(value) => updateFormData('additionalPipe', value)}
      malkoTeam={formData.malkoTeam}
      setMalkoTeam={(value) => updateFormData('malkoTeam', value)}
      includeConcreteSupply={formData.includeConcreteSupply}
      setIncludeConcreteSupply={(value) => updateFormData('includeConcreteSupply', value)}
      notes={formData.notes}
      setNotes={(value) => updateFormData('notes', value)}
      additionalNotes={formData.additionalNotes}
      setAdditionalNotes={(value) => updateFormData('additionalNotes', value)}
      moveToNextStep={moveToNextStep}
      moveToPrevStep={moveToPrevStep}
    />
  );
};
