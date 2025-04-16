
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Avatar from '@/components/Avatar';
import { StepProps, containerVariants, errorShake } from '../serviceInfoUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useBreakpoint } from '@/hooks/use-breakpoint';

interface CustomerStepProps extends StepProps {
  customer: string;
  setCustomer: (customer: string) => void;
  formErrors: {[key: string]: string};
  setFormErrors: (errors: {[key: string]: string}) => void;
  errorShakeAnimate: boolean;
  customers: any[];
  customerSearch: string;
  setCustomerSearch: (search: string) => void;
  moveToPrevStep: () => void;
}

const CustomerStep: React.FC<CustomerStepProps> = ({
  customer,
  setCustomer,
  formErrors,
  setFormErrors,
  errorShakeAnimate,
  customers,
  customerSearch,
  setCustomerSearch,
  moveToNextStep,
  moveToPrevStep
}) => {
  const isMobile = useIsMobile();
  const isTablet = useBreakpoint('md');
  
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
      key="customer"
      variants={containerVariants}
      initial="hidden"
      animate={errorShakeAnimate ? "shake" : "visible"}
      exit="exit"
      className="flex flex-col min-h-[450px] md:min-h-[500px] p-4 md:p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-4 md:mb-6">
        <div className="flex items-center">
          <Building2 className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mr-2 md:mr-3" />
          <h2 className="text-xl md:text-2xl font-bold">Select a Customer</h2>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers..."
            value={customerSearch}
            onChange={e => setCustomerSearch(e.target.value)}
            className="pl-10 w-full md:w-[250px] h-9 md:h-10"
          />
        </div>
      </div>
      
      <div className={cn(
        "grid gap-3 md:gap-4 overflow-y-auto max-h-[350px] md:max-h-[400px] p-1 md:p-2",
        isTablet ? (isMobile ? "grid-cols-2" : "grid-cols-3") : "grid-cols-4" 
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
            <div className="relative">
              <Avatar 
                name={cust.name}
                size={isMobile ? "md" : "lg"} 
                className="mb-2 md:mb-3" 
              />
              {customer === cust.id && (
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-blue-600 text-white rounded-full p-0.5 md:p-1 shadow-md">
                  <Check className="h-3 w-3 md:h-4 md:w-4" />
                </div>
              )}
            </div>
            <span className="font-medium text-center line-clamp-2 text-sm md:text-base">{cust.name}</span>
          </motion.div>
        ))}
      </div>
      
      {filteredCustomers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 md:py-8 text-gray-500">
          <p className="text-sm md:text-base">No customers match your search.</p>
        </div>
      )}
      
      {formErrors.customer && (
        <motion.p
          variants={errorShake}
          className="text-red-500 flex items-center mt-3 md:mt-4 justify-center text-sm md:text-base"
        >
          <X className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          {formErrors.customer}
        </motion.p>
      )}
      
      <div className="mt-auto pt-4 flex justify-between">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className={`${isMobile ? 'text-base h-10 px-4' : 'text-lg h-12 px-8'}`}
        >
          Back
        </Button>
        <Button 
          onClick={moveToNextStep} 
          className={`${isMobile ? 'text-base h-10 px-4' : 'text-lg h-12 px-8'}`}
          disabled={!customer}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CustomerStep;
