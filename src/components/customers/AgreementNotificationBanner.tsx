
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { mockCustomers } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface AgreementNotificationBannerProps {
  onCreateAgreement: (customerId: string, customerName: string) => void;
}

const AgreementNotificationBanner = ({ onCreateAgreement }: AgreementNotificationBannerProps) => {
  const navigate = useNavigate();
  
  // Filter customers who need an agreement
  const customersNeedingAgreement = mockCustomers.filter(customer => customer.needs_quote);
  
  if (customersNeedingAgreement.length === 0) {
    return null;
  }
  
  const handleViewAll = () => {
    // Navigate to customers page with filter parameter
    navigate('/customers?filter=needs_agreement');
  };
  
  const handleCreateForCustomer = (customerId: string, customerName: string) => {
    onCreateAgreement(customerId, customerName);
  };
  
  return (
    <Alert className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800 flex items-center justify-between">
        <div>
          <span className="font-medium">{customersNeedingAgreement.length} customer{customersNeedingAgreement.length !== 1 ? 's' : ''} need{customersNeedingAgreement.length === 1 ? 's' : ''} a price agreement.</span>
          <div className="mt-1 text-sm">
            {customersNeedingAgreement.slice(0, 3).map((customer, index) => (
              <span 
                key={customer.id} 
                className="underline cursor-pointer mr-3 hover:text-amber-900 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateForCustomer(customer.id, customer.name);
                }}
              >
                {customer.name}
              </span>
            ))}
            {customersNeedingAgreement.length > 3 && (
              <span className="text-amber-700">and {customersNeedingAgreement.length - 3} more</span>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white border-amber-200 text-amber-800 hover:bg-amber-100 shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleViewAll();
            }}
          >
            View All
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default AgreementNotificationBanner;
