
import React from 'react';
import PageHeader from '@/components/PageHeader';
import DocumentGenerator from '@/components/documents/DocumentGenerator';

const DocumentGeneratorPage = () => {
  return (
    <div className="flex-1 space-y-4 p-8 print:block print:bg-white">
      <div className="print:hidden">
        <PageHeader 
          title="Document Generator" 
          subtitle="Create, view, and manage your service documents and certificates."
          contentClassName="px-0"
        />
      </div>
      
      <DocumentGenerator />
      
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          @page {
            size: A4;
            margin: 0;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DocumentGeneratorPage;
