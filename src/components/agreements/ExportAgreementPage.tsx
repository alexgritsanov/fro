
import React, { useEffect } from 'react';
import AgreementPreview from './AgreementPreview';

interface ExportAgreementPageProps {
  formData: any;
}

const ExportAgreementPage: React.FC<ExportAgreementPageProps> = ({ formData }) => {
  useEffect(() => {
    // Auto-trigger print when the component mounts
    setTimeout(() => {
      window.print();
      // Close the window after printing (but give user a chance to cancel)
      setTimeout(() => {
        window.close();
      }, 500);
    }, 500);
  }, []);

  return (
    <div className="export-page">
      <AgreementPreview formData={formData} isPrintMode={true} />
    </div>
  );
};

export default ExportAgreementPage;
