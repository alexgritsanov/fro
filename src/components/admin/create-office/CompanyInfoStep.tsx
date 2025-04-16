
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail } from 'lucide-react';

interface CompanyInfoStepProps {
  companyName: string;
  setCompanyName: (value: string) => void;
  companyId: string;
  setCompanyId: (value: string) => void;
  officeAddress: string;
  setOfficeAddress: (value: string) => void;
  officePhone: string;
  setOfficePhone: (value: string) => void;
  officeEmail: string;
  setOfficeEmail: (value: string) => void;
}

const CompanyInfoStep: React.FC<CompanyInfoStepProps> = ({
  companyName,
  setCompanyName,
  companyId,
  setCompanyId,
  officeAddress,
  setOfficeAddress,
  officePhone,
  setOfficePhone,
  officeEmail,
  setOfficeEmail
}) => {
  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold mb-4">Company Information</h2>
      <div className="space-y-5">
        <div className="relative">
          <Label htmlFor="companyName" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
            Company Full Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="companyName" 
            value={companyName} 
            onChange={(e) => setCompanyName(e.target.value)} 
            className="pt-3"
            placeholder="Enter legal company name"
          />
        </div>
        
        <div className="relative">
          <Label htmlFor="companyId" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
            Company ID <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="companyId" 
            value={companyId} 
            onChange={(e) => setCompanyId(e.target.value)} 
            className="pt-3"
            placeholder="Enter company registration ID" 
          />
        </div>
        
        <div className="relative">
          <Label htmlFor="officeAddress" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
            Office Address <span className="text-red-500">*</span>
          </Label>
          <div className="flex">
            <div className="flex-shrink-0 inline-flex items-center justify-center mr-2">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <Input 
              id="officeAddress" 
              value={officeAddress} 
              onChange={(e) => setOfficeAddress(e.target.value)} 
              className="pt-3"
              placeholder="Enter physical office address" 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Label htmlFor="officePhone" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
              Office Phone <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <div className="flex-shrink-0 inline-flex items-center justify-center mr-2">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                id="officePhone" 
                type="tel"
                value={officePhone} 
                onChange={(e) => setOfficePhone(e.target.value)} 
                className="pt-3"
                placeholder="Enter office phone number" 
              />
            </div>
          </div>
          
          <div className="relative">
            <Label htmlFor="officeEmail" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
              Office Email <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <div className="flex-shrink-0 inline-flex items-center justify-center mr-2">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                id="officeEmail" 
                type="email"
                value={officeEmail} 
                onChange={(e) => setOfficeEmail(e.target.value)} 
                className="pt-3"
                placeholder="Enter office email address" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoStep;
