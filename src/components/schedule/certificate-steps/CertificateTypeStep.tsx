
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Truck, Building, Package, PenSquare } from 'lucide-react';
import { containerVariants, errorShake } from '../serviceInfoUtils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface CertificateTypeStepProps {
  serviceType: string;
  setServiceType: (type: string) => void;
  formErrors: {[key: string]: string};
  setFormErrors: (errors: {[key: string]: string}) => void;
  errorShakeAnimate: boolean;
  moveToNextStep: () => void;
  serviceCall?: any;
}

const serviceTypes = [
  { id: "concrete-pumping", title: "Concrete Pumping", icon: Truck, description: "Concrete pumping services" },
  { id: "line-pumping", title: "Line Pumping", icon: Package, description: "Line pumping services" },
  { id: "boom-lift", title: "Boom Lift", icon: Building, description: "Boom lift services" },
  { id: "material-delivery", title: "Material Delivery", icon: FileText, description: "Material delivery services" }
];

const CertificateTypeStep: React.FC<CertificateTypeStepProps> = ({
  serviceType,
  setServiceType,
  formErrors,
  setFormErrors,
  errorShakeAnimate,
  moveToNextStep,
  serviceCall
}) => {
  const isMobile = useIsMobile();
  
  const handleSelect = (type: string) => {
    setServiceType(type);
    setFormErrors({...formErrors, serviceType: ""});
  };
  
  // Pre-select service type from service call if available
  React.useEffect(() => {
    if (serviceCall && serviceCall.serviceType && !serviceType) {
      setServiceType(serviceCall.serviceType);
    }
  }, [serviceCall]);

  return (
    <motion.div 
      variants={errorShakeAnimate ? errorShake : containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-4 md:p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-6">
        <PenSquare className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-xl md:text-2xl font-bold">Select Certificate Type</h2>
      </div>
      
      {serviceCall && serviceCall.serviceType && (
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-sm">
            <span className="font-medium">Auto-selected from service call:</span> {serviceCall.serviceType.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {serviceTypes.map((type) => {
          const TypeIcon = type.icon;
          const isSelected = serviceType === type.id;
          
          return (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(type.id)}
              className={cn(
                "p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center",
                isSelected 
                  ? "bg-blue-50 border-blue-500 shadow-sm" 
                  : "bg-white border-gray-200 hover:border-blue-300"
              )}
            >
              <div className={cn(
                "p-3 rounded-full mr-4",
                isSelected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
              )}>
                <TypeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg">{type.title}</h3>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {formErrors.serviceType && (
        <p className="text-sm text-red-500 mb-4">{formErrors.serviceType}</p>
      )}
      
      <div className="flex justify-end">
        <Button 
          onClick={moveToNextStep}
          disabled={!serviceType}
          className="gap-2"
        >
          Next Step
        </Button>
      </div>
    </motion.div>
  );
};

export default CertificateTypeStep;
