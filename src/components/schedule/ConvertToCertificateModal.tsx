
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, User, MapPin, Building2, Truck, Clock, Edit2, Info } from 'lucide-react';
import { format } from 'date-fns';
import { ScheduleCall } from '@/pages/Schedule';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Import the step components
import ServiceTypeStep from './steps/ServiceTypeStep';
import CustomerStep from './steps/CustomerStep';
import LocationStep from './steps/LocationStep';
import ScheduleStep from './steps/ScheduleStep';
import EquipmentStep from './steps/EquipmentStep';
import DetailsStep from './steps/DetailsStep';

interface ConvertToCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedServiceCall: any) => void;
  serviceCall: ScheduleCall;
}

const ConvertToCertificateModal: React.FC<ConvertToCertificateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  serviceCall
}) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [updatedServiceCall, setUpdatedServiceCall] = useState<ScheduleCall | null>(null);
  const [formErrors, setFormErrors] = useState<{
    [key: string]: string;
  }>({});
  const [errorShakeAnimate, setErrorShakeAnimate] = useState(false);

  // For CustomerStep
  const [customerSearch, setCustomerSearch] = useState('');
  const [customers, setCustomers] = useState([{
    id: 'ABC Construction',
    name: 'ABC Construction'
  }, {
    id: 'XYZ Builders',
    name: 'XYZ Builders'
  }, {
    id: 'FastBuild Inc.',
    name: 'FastBuild Inc.'
  }, {
    id: 'Premium Construction',
    name: 'Premium Construction'
  }, {
    id: 'City Developers',
    name: 'City Developers'
  }, {
    id: 'Metropolitan Projects',
    name: 'Metropolitan Projects'
  }, {
    id: 'Urban Construction',
    name: 'Urban Construction'
  }, {
    id: 'Elite Builders',
    name: 'Elite Builders'
  }]);

  // For LocationStep
  const [customSites, setCustomSites] = useState<string[]>([]);
  
  useEffect(() => {
    if (serviceCall) {
      setUpdatedServiceCall({
        ...serviceCall
      });
    }
  }, [serviceCall]);
  
  useEffect(() => {
    if (isOpen) {
      console.log("ConvertToCertificateModal opened with service call:", serviceCall);
    }
  }, [isOpen, serviceCall]);
  
  if (!serviceCall || !updatedServiceCall) return null;
  
  const getStatusLabel = (status: string): string => {
    return status.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };
  
  const handleEditToggle = (field: string | null) => {
    setIsEditing(field);
  };
  
  const handleFieldUpdate = (field: keyof ScheduleCall, value: any) => {
    setUpdatedServiceCall(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value
      };
    });
  };
  
  const handleConfirmWithUpdates = () => {
    // Pass the updated service call data
    console.log("Confirming with updated service call:", updatedServiceCall);
    onConfirm(updatedServiceCall);
  };
  
  const handleCancel = () => {
    setIsEditing(null);
  };

  // Render edit component based on the field being edited
  const renderEditComponent = () => {
    if (!isEditing || !updatedServiceCall) return null;
    
    const moveToNextStep = () => {
      setIsEditing(null);
    };
    
    const moveToPrevStep = () => {
      setIsEditing(null);
    };
    
    // Use the full-size components for better consistency with the main creation flow
    switch (isEditing) {
      case 'serviceType':
        return (
          <div className="p-0 w-full">
            <ServiceTypeStep 
              serviceType={updatedServiceCall.serviceType || ''} 
              setServiceType={value => handleFieldUpdate('serviceType', value)} 
              moveToNextStep={moveToNextStep} 
              formErrors={formErrors} 
              setFormErrors={setFormErrors} 
              errorShakeAnimate={errorShakeAnimate} 
            />
          </div>
        );
      case 'customer':
        return (
          <div className="p-0 w-full">
            <CustomerStep 
              customer={updatedServiceCall.customer || ''} 
              setCustomer={value => handleFieldUpdate('customer', value)} 
              moveToNextStep={moveToNextStep} 
              moveToPrevStep={moveToPrevStep} 
              formErrors={formErrors} 
              setFormErrors={setFormErrors} 
              customers={customers} 
              customerSearch={customerSearch} 
              setCustomerSearch={setCustomerSearch} 
              errorShakeAnimate={errorShakeAnimate} 
            />
          </div>
        );
      case 'projectSite':
        return (
          <div className="p-0 w-full">
            <LocationStep 
              projectSite={updatedServiceCall.projectSite || ''} 
              setProjectSite={value => handleFieldUpdate('projectSite', value)} 
              moveToNextStep={moveToNextStep} 
              moveToPrevStep={moveToPrevStep} 
              formErrors={formErrors} 
              setFormErrors={setFormErrors} 
              errorShakeAnimate={errorShakeAnimate} 
              customSites={customSites} 
              setCustomSites={setCustomSites} 
            />
          </div>
        );
      case 'schedule':
        return (
          <div className="p-0 w-full">
            <ScheduleStep 
              date={new Date(updatedServiceCall.date || Date.now())} 
              setDate={value => handleFieldUpdate('date', value.toISOString())} 
              startTime={updatedServiceCall.startTime || ''} 
              setStartTime={value => handleFieldUpdate('startTime', value)} 
              moveToNextStep={moveToNextStep} 
              moveToPrevStep={moveToPrevStep} 
            />
          </div>
        );
      case 'equipment':
        return (
          <div className="p-0 w-full">
            <EquipmentStep 
              serviceType={updatedServiceCall.serviceType || ''} 
              pumpType={updatedServiceCall.pumpType || ''} 
              setPumpType={value => handleFieldUpdate('pumpType', value)} 
              quantity={updatedServiceCall.quantity || ''} 
              setQuantity={value => handleFieldUpdate('quantity', value)} 
              craneSize={updatedServiceCall.craneSize || ''} 
              setCraneSize={value => handleFieldUpdate('craneSize', value)} 
              vehicleType={updatedServiceCall.vehicleType || ''} 
              setVehicleType={value => handleFieldUpdate('vehicleType', value)} 
              generalEquipment={updatedServiceCall.generalEquipment || ''} 
              setGeneralEquipment={value => handleFieldUpdate('generalEquipment', value)} 
              moveToNextStep={moveToNextStep} 
              moveToPrevStep={moveToPrevStep} 
              formErrors={formErrors} 
              setFormErrors={setFormErrors} 
              errorShakeAnimate={errorShakeAnimate} 
              hourlyBooking={updatedServiceCall.hourlyBooking || 0} 
              setHourlyBooking={value => handleFieldUpdate('hourlyBooking', value)} 
            />
          </div>
        );
      case 'notes':
        return (
          <div className="p-0 w-full">
            <DetailsStep 
              notes={updatedServiceCall.notes || ''} 
              setNotes={value => handleFieldUpdate('notes', value)} 
              moveToNextStep={moveToNextStep} 
              moveToPrevStep={moveToPrevStep} 
            />
          </div>
        );
      case 'operator':
        return (
          <div className="p-0 w-full">
            <div className="p-4 md:p-6 bg-white rounded-xl">
              <h3 className="text-xl font-medium mb-4">Edit Operator</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Operator Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md" 
                    value={updatedServiceCall.operator || ''} 
                    onChange={e => handleFieldUpdate('operator', e.target.value)} 
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={moveToPrevStep}>Cancel</Button>
                  <Button onClick={moveToNextStep}>Save</Button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Render the main content when not editing
  const renderMainContent = () => {
    return (
      <>
        <DialogHeader className="pb-2 border-b">
          <DialogTitle className="text-xl flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Convert to Delivery Certificate
          </DialogTitle>
          <DialogDescription>
            Review and update service call information before creating a delivery certificate.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2 space-y-4">
          <Alert variant="info" className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Converting Service Call to Delivery Certificate</AlertTitle>
            <AlertDescription className="text-blue-700">
              Edit the information below if needed. After you confirm, you'll proceed directly to the additional information step.
            </AlertDescription>
          </Alert>
          
          <div className="flex items-center justify-between mb-3 bg-gray-50 p-3 rounded-lg border">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Building2 className="h-5 w-5 text-blue-600" />
              {updatedServiceCall.customer}
            </div>
            <div className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              {getStatusLabel(updatedServiceCall.status)}
            </div>
          </div>
          
          {/* Service Type Section */}
          <div className="mb-4 last:mb-0 bg-white rounded-md border p-3 hover:border-blue-300 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 text-gray-600">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-sm">Service Type</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleEditToggle('serviceType')} className="h-7 text-xs">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
            <div className="mt-1 text-base font-medium">
              {updatedServiceCall.serviceType?.replace(/-/g, ' ') || <span className="text-gray-400 italic">Not specified</span>}
            </div>
          </div>
          
          {/* Customer Section */}
          <div className="mb-4 last:mb-0 bg-white rounded-md border p-3 hover:border-blue-300 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-sm">Customer</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleEditToggle('customer')} className="h-7 text-xs">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
            <div className="mt-1 text-base font-medium">
              {updatedServiceCall.customer || <span className="text-gray-400 italic">Not specified</span>}
            </div>
          </div>
          
          {/* Project Site Section */}
          <div className="mb-4 last:mb-0 bg-white rounded-md border p-3 hover:border-blue-300 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-sm">Project Site</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleEditToggle('projectSite')} className="h-7 text-xs">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
            <div className="mt-1 text-base font-medium">
              {updatedServiceCall.projectSite || <span className="text-gray-400 italic">Not specified</span>}
            </div>
          </div>
          
          {/* Schedule Section */}
          <div className="mb-4 last:mb-0 bg-white rounded-md border p-3 hover:border-blue-300 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-sm">Schedule</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleEditToggle('schedule')} className="h-7 text-xs">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
            <div className="mt-1 text-base font-medium flex flex-col gap-1">
              <div>{updatedServiceCall.date ? format(new Date(updatedServiceCall.date), 'MMM d, yyyy') : <span className="text-gray-400 italic">Not specified</span>}</div>
              {updatedServiceCall.startTime && <div className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {updatedServiceCall.startTime}
                </div>}
            </div>
          </div>
          
          {/* Operator Section */}
          <div className="mb-4 last:mb-0 bg-white rounded-md border p-3 hover:border-blue-300 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-sm">Operator</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleEditToggle('operator')} className="h-7 text-xs">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
            <div className="mt-1 text-base font-medium">
              {updatedServiceCall.operator || <span className="text-gray-400 italic">Not specified</span>}
            </div>
          </div>
          
          {/* Equipment Section */}
          <div className="mb-4 last:mb-0 bg-white rounded-md border p-3 hover:border-blue-300 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-sm">Equipment</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleEditToggle('equipment')} className="h-7 text-xs">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
            <div className="mt-1 space-y-1">
              {updatedServiceCall.pumpType && <div>
                  <span className="text-sm font-medium text-gray-500">Pump Type: </span>
                  <span className="font-medium">{updatedServiceCall.pumpType}</span>
                </div>}
              {updatedServiceCall.quantity && <div>
                  <span className="text-sm font-medium text-gray-500">Quantity: </span>
                  <span className="font-medium">{updatedServiceCall.quantity} m³</span>
                </div>}
              {!updatedServiceCall.pumpType && !updatedServiceCall.quantity && <p className="text-gray-400 italic">No equipment details specified</p>}
            </div>
          </div>
          
          {/* Notes Section */}
          <div className="mb-4 last:mb-0 bg-white rounded-md border p-3 hover:border-blue-300 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Info className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-sm">Notes</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleEditToggle('notes')} className="h-7 text-xs">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
            <div className="mt-1 text-base">
              {updatedServiceCall.notes || <span className="text-gray-400 italic">No notes added</span>}
            </div>
          </div>
        </div>

        <DialogFooter className="pt-2 border-t">
          <div className="w-full flex flex-col sm:flex-row gap-2 justify-end">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto order-last sm:order-first">
              Cancel
            </Button>
            <Button onClick={handleConfirmWithUpdates} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              Continue to Additional Information
            </Button>
          </div>
        </DialogFooter>
      </>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto px-[28px]">
        {isEditing ? (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={handleCancel} className="mb-2">
              Cancel
            </Button>
            {renderEditComponent()}
          </div>
        ) : renderMainContent()}
      </DialogContent>
    </Dialog>
  );
};

export default ConvertToCertificateModal;
