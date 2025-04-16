
import React from 'react';
import { Building2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCustomerName } from '../../utils/certificateHelpers';

interface CustomerLocationSectionProps {
  customer: string;
  projectSite: string;
  customers: any[];
  onEditCustomer: () => void;
}

const CustomerLocationSection: React.FC<CustomerLocationSectionProps> = ({
  customer,
  projectSite,
  customers,
  onEditCustomer
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg flex items-center">
        <Building2 className="h-5 w-5 mr-2 text-blue-600" />
        Customer & Location
      </h3>
      
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex items-start">
          <Building2 className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium">{getCustomerName(customer, customers)}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Project Site</p>
            <p className="font-medium">{projectSite}</p>
            <div className="flex items-center gap-1 mt-1">
              <Button 
                variant="outline" 
                size="xs" 
                className="h-7 px-2 py-1 text-xs"
                onClick={onEditCustomer}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLocationSection;
