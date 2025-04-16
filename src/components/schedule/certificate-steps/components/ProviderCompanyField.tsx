
import React from 'react';
import { Building } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProviderCompanyFieldProps {
  companyProvides: string;
  setCompanyProvides: (company: string) => void;
}

const ProviderCompanyField: React.FC<ProviderCompanyFieldProps> = ({
  companyProvides,
  setCompanyProvides
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <Building className="h-4 w-4 mr-1.5 text-blue-600" />
        Provider Company
      </label>
      <Select value={companyProvides} onValueChange={setCompanyProvides}>
        <SelectTrigger className="border-gray-200 bg-white">
          <SelectValue placeholder="Select provider company" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Company A">Company A</SelectItem>
          <SelectItem value="Company B">Company B</SelectItem>
          <SelectItem value="Company C">Company C</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProviderCompanyField;
