
import React from 'react';
import { companyTypes } from './data';

interface CompanyTypeStepProps {
  companyType: string;
  setCompanyType: (value: string) => void;
}

const CompanyTypeStep: React.FC<CompanyTypeStepProps> = ({ companyType, setCompanyType }) => {
  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold mb-4">Choose Company Type</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
        {companyTypes.map((type) => (
          <div
            key={type.value}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md
              ${companyType === type.value ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300' : 'border-gray-200 hover:border-blue-300'}`}
            onClick={() => setCompanyType(type.value)}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${companyType === type.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {React.cloneElement(type.icon as React.ReactElement, { size: 18 })}
              </div>
              <div>
                <p className="font-medium">{type.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyTypeStep;
