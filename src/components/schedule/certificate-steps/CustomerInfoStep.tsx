
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, ArrowLeft, ArrowRight } from 'lucide-react';
import { containerVariants, errorShake } from '../serviceInfoUtils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import Avatar from '@/components/Avatar';

interface CustomerInfoStepProps {
  customer: string;
  setCustomer: (customer: string) => void;
  projectSite: string;
  setProjectSite: (site: string) => void;
  formErrors: {[key: string]: string};
  setFormErrors: (errors: {[key: string]: string}) => void;
  errorShakeAnimate: boolean;
  moveToNextStep: () => void;
  moveToPrevStep: () => void;
  customers: any[];
  serviceCall?: any;
}

const CustomerInfoStep: React.FC<CustomerInfoStepProps> = ({
  customer,
  setCustomer,
  formErrors,
  setFormErrors,
  errorShakeAnimate,
  moveToNextStep,
  moveToPrevStep,
  customers,
  serviceCall
}) => {
  const isMobile = useIsMobile();
  const [customerSearch, setCustomerSearch] = useState('');
  
  // Pre-select customer from service call if available
  React.useEffect(() => {
    if (serviceCall) {
      if (serviceCall.customer && !customer) {
        setCustomer(serviceCall.customer);
      }
    }
  }, [serviceCall]);

  // Filtered customers based on search
  const filteredCustomers = customers.length > 0 
    ? customers.filter(cust => 
        cust.name.toLowerCase().includes(customerSearch.toLowerCase()))
    : [
        { id: "Acme Corp", name: "Acme Corp" },
        { id: "Tech Solutions", name: "Tech Solutions" },
        { id: "Global Enterprises", name: "Global Enterprises" }
      ].filter(cust => 
        cust.name.toLowerCase().includes(customerSearch.toLowerCase()));

  return (
    <motion.div 
      variants={errorShakeAnimate ? errorShake : containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-4 md:p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex flex-col">
        {/* Customer Selection Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-4">
            <div className="flex items-center">
              <Building2 className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl md:text-2xl font-bold">Select Customer</h2>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="pl-10 w-full md:w-[250px] h-10"
              />
            </div>
          </div>
          
          {serviceCall && serviceCall.customer && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                <span className="font-medium">Auto-selected from service call:</span> Customer
              </p>
            </div>
          )}
          
          <div className={cn(
            "grid gap-3 md:gap-4 mb-4",
            isMobile ? "grid-cols-2" : "grid-cols-3"
          )}>
            {filteredCustomers.map((cust) => (
              <motion.div
                key={cust.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCustomer(cust.id);
                  setFormErrors({...formErrors, customer: ""});
                }}
                className={cn(
                  "flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all",
                  customer === cust.id 
                    ? "bg-blue-50 border-blue-600" 
                    : "bg-white border-gray-200 hover:border-blue-300"
                )}
              >
                <Avatar 
                  name={cust.name}
                  size={isMobile ? "md" : "lg"} 
                  className="mb-2 md:mb-3" 
                />
                <span className="font-medium text-center line-clamp-2 text-sm md:text-base">{cust.name}</span>
              </motion.div>
            ))}
          </div>
          
          {formErrors.customer && (
            <p className="text-sm text-red-500 mb-4">{formErrors.customer}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className="border-gray-200 bg-white flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Button 
          onClick={moveToNextStep}
          disabled={!customer}
          className="flex items-center"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CustomerInfoStep;
