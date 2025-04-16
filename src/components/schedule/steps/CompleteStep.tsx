
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  Check, 
  FileText, 
  Calendar, 
  MapPin, 
  Truck, 
  Clipboard, 
  Building, 
  ArrowRight,
  Edit2,
  Construction,
  Bus,
  HelpCircle,
  Clock,
  Maximize
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StepProps, containerVariants } from '../serviceInfoUtils';
import FullPreviewModal from '../FullPreviewModal';

interface CompleteStepProps extends StepProps {
  date: Date;
  startTime: string;
  serviceType: string;
  customer: string;
  projectSite: string;
  pumpType: string;
  quantity: string;
  hourlyBooking: string | number;
  notes: string;
  customers: any[];
  craneSize: string;
  vehicleType: string;
  moveToPrevStep: () => void;
  generalEquipment: string;
  allowInlineEdit?: boolean;
  setServiceType?: (type: string) => void;
  setCustomer?: (customer: string) => void;
  setProjectSite?: (site: string) => void;
  setPumpType?: (type: string) => void;
  setQuantity?: (quantity: string) => void;
  setNotes?: (notes: string) => void;
  setCurrentStep?: (step: string) => void;
}

const CompleteStep: React.FC<CompleteStepProps> = ({
  date,
  startTime,
  serviceType,
  customer,
  projectSite,
  pumpType,
  quantity,
  hourlyBooking,
  notes,
  moveToNextStep,
  moveToPrevStep,
  customers,
  craneSize,
  vehicleType,
  generalEquipment,
  allowInlineEdit = false,
  setServiceType,
  setCustomer,
  setProjectSite,
  setPumpType,
  setQuantity,
  setNotes,
  setCurrentStep
}) => {
  const fieldToStepMap = {
    serviceType: "service",
    customer: "customer",
    projectSite: "location",
    date: "schedule",
    time: "schedule",
    pumpType: "equipment",
    quantity: "equipment",
    craneSize: "equipment",
    vehicleType: "equipment",
    generalEquipment: "equipment",
    notes: "details"
  };
  
  const [isFullPreviewOpen, setIsFullPreviewOpen] = useState(false);
  
  const navigateToStep = (field: string) => {
    const stepToNavigate = fieldToStepMap[field as keyof typeof fieldToStepMap];
    if (stepToNavigate && setCurrentStep) {
      setCurrentStep(stepToNavigate);
    }
  };
  
  const getServiceTypeIcon = () => {
    switch (serviceType) {
      case 'concrete-pumping':
        return Truck;
      case 'cranes':
        return Construction;
      case 'transportation':
        return Bus;
      default:
        return HelpCircle;
    }
  };
  
  const ServiceIcon = getServiceTypeIcon();
  
  const getServiceName = () => {
    switch (serviceType) {
      case 'concrete-pumping':
        return 'Concrete Pumping';
      case 'cranes':
        return 'Crane Service';
      case 'transportation':
        return 'Transportation';
      default:
        return 'General Service';
    }
  };
  
  const getEquipmentDetails = () => {
    switch (serviceType) {
      case 'concrete-pumping':
        return `${pumpType ? pumpType.replace(/-/g, ' ') : 'Not specified'} ${quantity ? `- ${quantity} m³` : ''}`;
      case 'cranes':
        return craneSize ? craneSize.replace(/-/g, ' ') : 'Not specified';
      case 'transportation':
        return vehicleType ? vehicleType.replace(/-/g, ' ') : 'Not specified';
      default:
        return generalEquipment || 'Not specified';
    }
  };
  
  const renderFieldWithEdit = (
    label: string, 
    value: string, 
    field: string, 
    icon: React.ReactNode
  ) => {
    return (
      <div className="flex items-start justify-between p-3 md:p-4 border-b border-gray-100">
        <div className="flex items-start">
          <div className="mt-0.5">{icon}</div>
          <div className="ml-3">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium">{value}</p>
          </div>
        </div>
        
        {allowInlineEdit && (
          <div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => navigateToStep(field)}
            >
              <Edit2 className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  const formattedDate = date ? format(date, 'MMMM d, yyyy') : 'Not specified';
  
  const serviceCallData = {
    id: Math.floor(Math.random() * 10000).toString(),
    date: date,
    startTime: startTime,
    serviceType: serviceType,
    customer: customer,
    customerName: customer,
    projectSite: projectSite,
    pumpType: pumpType,
    quantity: quantity,
    hourlyBooking: hourlyBooking,
    notes: notes,
    craneSize: craneSize,
    vehicleType: vehicleType,
    generalEquipment: generalEquipment,
    status: 'pending',
  };
  
  const documentNumber = `SC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  const openFullPreview = () => {
    setIsFullPreviewOpen(true);
  };

  const closeFullPreview = () => {
    setIsFullPreviewOpen(false);
  };

  return (
    <motion.div 
      key="complete"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col min-h-[450px] md:min-h-[500px] p-4 md:p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-4 md:mb-6">
        <Check className="h-5 w-5 md:h-6 md:w-6 text-green-500 mr-2 md:mr-3" />
        <h2 className="text-xl md:text-2xl font-bold">Review & Complete</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto max-h-[400px] border border-gray-200 rounded-lg">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 md:p-6 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <ServiceIcon className="h-6 w-6 md:h-8 md:w-8" />
                <h3 className="text-lg md:text-xl font-bold ml-2 md:ml-3">
                  {getServiceName()}
                </h3>
              </div>
              <div className="mt-2 md:mt-3 flex items-center text-sm md:text-base opacity-90">
                <Clock className="h-4 w-4 md:h-5 md:w-5 mr-1.5 md:mr-2" />
                {formattedDate} at {startTime}
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={openFullPreview}
              className="bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Maximize className="h-4 w-4 mr-2" />
              Full Preview
            </Button>
          </div>
        </div>
        
        <div className="p-1">
          {renderFieldWithEdit(
            "Customer", 
            customer || "Not specified", 
            "customer", 
            <Building className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
          )}
          
          {renderFieldWithEdit(
            "Project Site", 
            projectSite || "Not specified", 
            "projectSite", 
            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
          )}
          
          {renderFieldWithEdit(
            "Service Date", 
            formattedDate, 
            "date", 
            <Calendar className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
          )}
          
          {serviceType === 'concrete-pumping' && (
            <>
              {renderFieldWithEdit(
                "Pump Type", 
                pumpType ? pumpType.replace(/-/g, ' ') : "Not specified", 
                "pumpType", 
                <Truck className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
              )}
              
              {renderFieldWithEdit(
                "Quantity", 
                quantity ? `${quantity} m³` : "Not specified", 
                "quantity", 
                <Clipboard className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
              )}
            </>
          )}
          
          {serviceType !== 'concrete-pumping' && (
            renderFieldWithEdit(
              "Equipment Details", 
              getEquipmentDetails(), 
              "equipment", 
              <Truck className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
            )
          )}
          
          {renderFieldWithEdit(
            "Notes", 
            notes || "No additional notes", 
            "notes", 
            <FileText className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className="text-base md:text-lg h-10 px-6 md:h-12 md:px-8"
        >
          Back
        </Button>
        <Button 
          onClick={moveToNextStep} 
          className={cn(
            "text-base md:text-lg h-10 px-6 md:h-12 md:px-8",
            "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all shadow-md"
          )}
        >
          Confirm & Create
          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
      
      {isFullPreviewOpen && (
        <FullPreviewModal
          isOpen={isFullPreviewOpen}
          onClose={closeFullPreview}
          serviceCallData={serviceCallData}
          documentNumber={documentNumber}
        />
      )}
    </motion.div>
  );
};

export default CompleteStep;
