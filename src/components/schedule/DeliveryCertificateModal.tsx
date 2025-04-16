
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScheduleCall } from '@/pages/Schedule';
import { toast } from 'sonner';
import DeliveryCertificateGameflow from './DeliveryCertificateGameflow';

interface DeliveryCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceCall: ScheduleCall | null;
  onSave?: (data: any) => void;
  createOnly?: boolean;
  convertFromServiceCall?: boolean;
  initialStep?: 'basic' | 'additional' | 'additions';
}

const DeliveryCertificateModal: React.FC<DeliveryCertificateModalProps> = ({ 
  isOpen, 
  onClose,
  serviceCall,
  onSave,
  createOnly = false,
  convertFromServiceCall = false,
  initialStep = 'basic'
}) => {
  // Basic info
  const [date, setDate] = useState<Date>(new Date());
  const [serviceType, setServiceType] = useState('');
  const [customer, setCustomer] = useState('');
  const [projectSite, setProjectSite] = useState('');
  const [hourlyBooking, setHourlyBooking] = useState('0');
  const [pumpType, setPumpType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [notes, setNotes] = useState('');
  
  // Additional info
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [concreteType, setConcreteType] = useState('');
  const [companyProvides, setCompanyProvides] = useState('');
  const [elementType, setElementType] = useState('');
  const [waitingTime, setWaitingTime] = useState('');
  const [workType, setWorkType] = useState('');
  
  // Service additions
  const [transfers, setTransfers] = useState('0');
  const [additionalPipe, setAdditionalPipe] = useState('0');
  const [malkoTeam, setMalkoTeam] = useState('no');
  const [includeConcreteSupply, setIncludeConcreteSupply] = useState('no');
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  // Form validation
  const [loading, setLoading] = useState(false);
  const [actualInitialStep, setActualInitialStep] = useState<'basic' | 'additional' | 'additions'>(initialStep);
  
  // Pre-populate data from service call if available
  useEffect(() => {
    if (serviceCall) {
      console.log("Service call data for certificate:", serviceCall);
      
      if (serviceCall.date) {
        setDate(new Date(serviceCall.date));
      }
      
      if (serviceCall.serviceType) {
        setServiceType(serviceCall.serviceType);
      }
      
      if (serviceCall.customer) {
        setCustomer(serviceCall.customer);
      }
      
      if (serviceCall.projectSite) {
        setProjectSite(serviceCall.projectSite);
      }
      
      if (serviceCall.hourlyBooking !== undefined) {
        setHourlyBooking(serviceCall.hourlyBooking.toString());
      }
      
      if (serviceCall.pumpType) {
        setPumpType(serviceCall.pumpType);
      }
      
      if (serviceCall.quantity) {
        setQuantity(serviceCall.quantity);
      }
      
      if (serviceCall.vehicleNumber) {
        setVehicleNumber(serviceCall.vehicleNumber);
      }
      
      if (serviceCall.operator) {
        setOperator(serviceCall.operator);
      }
      
      if (serviceCall.startTime) {
        setStartTime(serviceCall.startTime);
      }
      
      if (serviceCall.notes) {
        setNotes(serviceCall.notes);
      }
      
      // Set initial step based on the prop - not setting until the modal is fully opened
      console.log("Setting initial step to:", initialStep);
    }
  }, [serviceCall, initialStep, convertFromServiceCall]);
  
  // Force the step to be set AFTER the component mounts and data is populated
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure all data is populated first
      const timer = setTimeout(() => {
        console.log("Setting actual initial step to:", initialStep);
        setActualInitialStep(initialStep);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialStep]);
  
  const validateCertificateInfo = () => {
    // Basic required fields validation
    if (!serviceType) {
      toast.error("Please select a service type");
      return false;
    }
    
    if (!customer) {
      toast.error("Please select a customer");
      return false;
    }
    
    if (!operator) {
      toast.error("Please select an operator");
      return false;
    }
    
    return true;
  };
  
  const handleAdvance = () => {
    setLoading(true);
    
    setTimeout(() => {
      if (!onSave) {
        toast.success('Delivery certificate created', {
          description: 'The certificate has been saved successfully.',
        });
      } else {
        const certificateData = {
          date,
          serviceType,
          customer,
          projectSite,
          hourlyBooking,
          pumpType,
          quantity,
          vehicleNumber,
          operator,
          notes,
          
          // Additional info
          startTime,
          endTime,
          concreteType,
          companyProvides,
          elementType,
          waitingTime,
          workType,
          
          // Service additions
          transfers,
          additionalPipe,
          malkoTeam,
          includeConcreteSupply,
          additionalNotes,
        };
        
        onSave(certificateData);
      }
      
      setLoading(false);
      onClose();
    }, 1000);
  };
  
  // Mock customers for demo
  const customers = [
    { id: 'ABC Construction', name: 'ABC Construction' },
    { id: 'XYZ Builders', name: 'XYZ Builders' },
    { id: 'FastBuild Inc.', name: 'FastBuild Inc.' },
    { id: 'Premium Construction', name: 'Premium Construction' },
    { id: 'City Developers', name: 'City Developers' },
    { id: 'Metropolitan Projects', name: 'Metropolitan Projects' },
    { id: 'Urban Construction', name: 'Urban Construction' },
    { id: 'Elite Builders', name: 'Elite Builders' }
  ];
  
  const getModalTitle = () => {
    if (convertFromServiceCall && initialStep === 'additional') {
      return "Additional Information for Delivery Certificate";
    } else if (createOnly) {
      return "Create Delivery Certificate";
    } else if (serviceCall) {
      return "Convert Service Call to Delivery Certificate";
    } else {
      return "Create Delivery Certificate";
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <DialogTitle>
            {getModalTitle()}
          </DialogTitle>
          {convertFromServiceCall && initialStep === 'additional' && (
            <div className="text-sm text-blue-600 font-medium">
              Service call information has been transferred. Please complete the additional details below.
            </div>
          )}
        </DialogHeader>
        
        <div className="py-2">
          <DeliveryCertificateGameflow
            // Basic info
            date={date}
            setDate={setDate}
            serviceType={serviceType}
            setServiceType={setServiceType}
            customer={customer}
            setCustomer={setCustomer}
            projectSite={projectSite}
            setProjectSite={setProjectSite}
            hourlyBooking={hourlyBooking}
            setHourlyBooking={setHourlyBooking}
            pumpType={pumpType}
            setPumpType={setPumpType}
            quantity={quantity}
            setQuantity={setQuantity}
            vehicleNumber={vehicleNumber}
            setVehicleNumber={setVehicleNumber}
            operator={operator}
            setOperator={setOperator}
            notes={notes}
            setNotes={setNotes}
            
            // Additional info
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            concreteType={concreteType}
            setConcreteType={setConcreteType}
            companyProvides={companyProvides}
            setCompanyProvides={setCompanyProvides}
            elementType={elementType}
            setElementType={setElementType}
            waitingTime={waitingTime}
            setWaitingTime={setWaitingTime}
            workType={workType}
            setWorkType={setWorkType}
            
            // Service additions
            transfers={transfers}
            setTransfers={setTransfers}
            additionalPipe={additionalPipe}
            setAdditionalPipe={setAdditionalPipe}
            malkoTeam={malkoTeam}
            setMalkoTeam={setMalkoTeam}
            includeConcreteSupply={includeConcreteSupply}
            setIncludeConcreteSupply={setIncludeConcreteSupply}
            additionalNotes={additionalNotes}
            setAdditionalNotes={setAdditionalNotes}
            
            // Form validation
            validateCertificateInfo={validateCertificateInfo}
            onAdvance={handleAdvance}
            
            // Data helpers
            customers={customers}
            serviceCall={serviceCall}
            initialStep={actualInitialStep}
          />
        </div>
        
        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryCertificateModal;
