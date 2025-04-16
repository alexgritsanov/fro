
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { FileText, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuoteModal from '@/components/customers/QuoteModal';

interface UserData {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  company: string;
  address: string;
  status: string;
  notes: string;
  nickname: string;
  officePhone: string;
  avatar: File | null;
  id: string;
}

interface PriceAgreementProps {
  userData: UserData;
}

const PriceAgreement = ({ userData }: PriceAgreementProps) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleOpenQuoteModal = () => {
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-blue-800">Price Agreement</h2>
        <p className="text-gray-600">
          Set up a personalized price agreement for this customer
        </p>
      </div>
      
      <Card className="p-5 border border-blue-100 bg-card-gradient-blue hover:shadow-md transition-all duration-200">
        <div className="flex items-start space-x-4 mb-5">
          <div className="p-2 bg-blue-100 rounded-full text-blue-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800">Price Agreement Setup</h3>
            <p className="text-sm text-blue-700/80 mt-1">
              Create a detailed price agreement to establish pricing for concrete pumping services. All prices are exclusive of VAT.
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800 text-sm">
          <div className="flex items-start">
            <Clock className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-blue-600" />
            <div>
              <p className="font-medium">Would you like to create a price agreement for this customer now?</p>
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="default" 
                  onClick={handleOpenQuoteModal}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                >
                  Create Price Agreement
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800 text-sm">
        <div className="flex items-start">
          <Clock className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-blue-600" />
          <div>
            <p className="font-medium">What's Next?</p>
            <p className="mt-1">
              The agreement will include options for pumping rates, additional meter pricing, waiting hour rates, and more. You can also create or edit price agreements later from the customer profile.
            </p>
          </div>
        </div>
      </div>

      {isQuoteModalOpen && (
        <QuoteModal 
          isOpen={isQuoteModalOpen} 
          onClose={handleCloseQuoteModal} 
          customerId={userData?.id}
          fromCustomerCreation={true}
        />
      )}
    </div>
  );
};

export default PriceAgreement;
