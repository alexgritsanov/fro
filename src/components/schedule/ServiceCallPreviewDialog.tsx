
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  Edit2, 
  Trash2, 
  X,
  Clock,
  MapPin,
  Building2,
  Truck,
  Info
} from 'lucide-react';
import { format } from 'date-fns';
import { ScheduleCall } from '@/pages/Schedule';
import { Avatar } from '@/components/ui/avatar';
import { format as formatDate } from 'date-fns';
import StatusBadge from '@/components/StatusBadge';
import ConvertToCertificateModal from './ConvertToCertificateModal';

// Import the step components
import ServiceTypeStep from './steps/ServiceTypeStep';
import CustomerStep from './steps/CustomerStep';
import LocationStep from './steps/LocationStep';
import ScheduleStep from './steps/ScheduleStep';
import EquipmentStep from './steps/EquipmentStep';
import DetailsStep from './steps/DetailsStep';

// Define an extended interface for ScheduleCall to include the missing properties
interface ExtendedScheduleCall extends ScheduleCall {
  craneSize?: string;
  vehicleType?: string;
  generalEquipment?: string;
}

interface ServiceCallPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  serviceCall: ScheduleCall | null;
  onEdit?: (call: ScheduleCall) => void;
  onCreateCertificate?: (call: ScheduleCall) => void;
  onSave?: (updatedCall: ScheduleCall) => void;
  onCancel?: (call: ScheduleCall) => void;
  viewOnly?: boolean;
}

const ServiceCallPreviewDialog: React.FC<ServiceCallPreviewDialogProps> = ({
  isOpen,
  onClose,
  serviceCall,
  onEdit,
  onCreateCertificate,
  onSave,
  onCancel,
  viewOnly = false
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [updatedServiceCall, setUpdatedServiceCall] = useState<ExtendedScheduleCall | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  // Add states for the missing properties required by LocationStep
  const [customSites, setCustomSites] = useState<string[]>([]);
  const [showConvertModal, setShowConvertModal] = useState(false);

  // Initialize updatedServiceCall with serviceCall data when dialog opens
  React.useEffect(() => {
    if (serviceCall) {
      setUpdatedServiceCall({ 
        ...serviceCall,
        craneSize: serviceCall.craneSize || '',
        vehicleType: serviceCall.vehicleType || '',
        generalEquipment: serviceCall.generalEquipment || ''
      });
    }
  }, [serviceCall]);

  if (!serviceCall || !updatedServiceCall) return null;

  const getStatusLabel = (status: string): string => {
    return status.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const handleEditClick = (field: string) => {
    setEditingField(field);
    setEditMode(true);
  };

  const handleCreateCertificate = () => {
    // Instead of directly passing to parent, show our convert modal
    setShowConvertModal(true);
  };
  
  const handleConvertCertificate = (updatedCall: ScheduleCall) => {
    setShowConvertModal(false);
    if (onCreateCertificate) {
      onCreateCertificate(updatedCall);
    }
    onClose();
  };

  const handleSaveEdit = () => {
    setEditMode(false);
    setEditingField(null);
    
    if (updatedServiceCall && onSave) {
      onSave(updatedServiceCall);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingField(null);
    
    // Reset to original values
    if (serviceCall) {
      setUpdatedServiceCall({ 
        ...serviceCall,
        craneSize: serviceCall.craneSize || '',
        vehicleType: serviceCall.vehicleType || '',
        generalEquipment: serviceCall.generalEquipment || ''
      });
    }
  };

  const handleCancelServiceCall = () => {
    if (onCancel && serviceCall) {
      onCancel(serviceCall);
      setShowCancelConfirm(false);
      onClose();
    }
  };

  const updateServiceCall = (field: string, value: any) => {
    if (updatedServiceCall) {
      setUpdatedServiceCall({ ...updatedServiceCall, [field]: value });
    }
  };

  // Render different edit components based on the field being edited
  const renderEditComponent = () => {
    if (!editingField || !updatedServiceCall) return null;

    const dummyFormErrors = {}; 
    const dummySetFormErrors = () => {};
    const dummyErrorShakeAnimate = false;
    
    // Add dummy value for hourlyBooking
    const hourlyBooking = updatedServiceCall.hourlyBooking || 0;
    const setHourlyBooking = (value: string | number) => {
      updateServiceCall('hourlyBooking', value);
    };

    switch (editingField) {
      case 'service':
        return (
          <ServiceTypeStep 
            serviceType={updatedServiceCall.serviceType || ''}
            setServiceType={(value) => updateServiceCall('serviceType', value)}
            moveToNextStep={() => handleSaveEdit()}
            formErrors={dummyFormErrors}
            setFormErrors={dummySetFormErrors}
            errorShakeAnimate={dummyErrorShakeAnimate}
          />
        );
      case 'customer':
        return (
          <CustomerStep 
            customer={updatedServiceCall.customer || ''}
            setCustomer={(value) => updateServiceCall('customer', value)}
            moveToNextStep={() => handleSaveEdit()}
            moveToPrevStep={() => handleCancelEdit()}
            formErrors={dummyFormErrors}
            setFormErrors={dummySetFormErrors}
            customers={[]}
            customerSearch={''}
            setCustomerSearch={() => {}}
            errorShakeAnimate={dummyErrorShakeAnimate}
          />
        );
      case 'location':
        return (
          <LocationStep 
            projectSite={updatedServiceCall.projectSite || ''}
            setProjectSite={(value) => updateServiceCall('projectSite', value)}
            moveToNextStep={() => handleSaveEdit()}
            moveToPrevStep={() => handleCancelEdit()}
            formErrors={dummyFormErrors}
            setFormErrors={dummySetFormErrors}
            errorShakeAnimate={dummyErrorShakeAnimate}
            customSites={customSites}
            setCustomSites={setCustomSites}
          />
        );
      case 'schedule':
        return (
          <ScheduleStep 
            date={new Date(updatedServiceCall.date || Date.now())}
            setDate={(value) => updateServiceCall('date', value.toISOString())}
            startTime={updatedServiceCall.startTime || ''}
            setStartTime={(value) => updateServiceCall('startTime', value)}
            moveToNextStep={() => handleSaveEdit()}
            moveToPrevStep={() => handleCancelEdit()}
          />
        );
      case 'equipment':
        return (
          <EquipmentStep 
            serviceType={updatedServiceCall.serviceType || ''}
            pumpType={updatedServiceCall.pumpType || ''}
            setPumpType={(value) => updateServiceCall('pumpType', value)}
            quantity={updatedServiceCall.quantity || ''}
            setQuantity={(value) => updateServiceCall('quantity', value)}
            craneSize={updatedServiceCall.craneSize || ''}
            setCraneSize={(value) => updateServiceCall('craneSize', value)}
            vehicleType={updatedServiceCall.vehicleType || ''}
            setVehicleType={(value) => updateServiceCall('vehicleType', value)}
            generalEquipment={updatedServiceCall.generalEquipment || ''}
            setGeneralEquipment={(value) => updateServiceCall('generalEquipment', value)}
            moveToNextStep={() => handleSaveEdit()}
            moveToPrevStep={() => handleCancelEdit()}
            formErrors={dummyFormErrors}
            setFormErrors={dummySetFormErrors}
            errorShakeAnimate={dummyErrorShakeAnimate}
            hourlyBooking={hourlyBooking}
            setHourlyBooking={setHourlyBooking}
          />
        );
      case 'details':
        return (
          <DetailsStep 
            notes={updatedServiceCall.notes || ''}
            setNotes={(value) => updateServiceCall('notes', value)}
            moveToNextStep={() => handleSaveEdit()}
            moveToPrevStep={() => handleCancelEdit()}
          />
        );
      default:
        return null;
    }
  };

  // Service call preview section component
  const SectionCard = ({ 
    icon, 
    label, 
    children,
    field
  }: { 
    icon: React.ReactNode, 
    label: string, 
    children: React.ReactNode,
    field: string
  }) => (
    <div className="p-4 border rounded-xl bg-white mb-3 relative group">
      <div className="flex items-center mb-1 text-gray-500">
        {icon}
        <div className="ml-2 text-sm font-medium">{label}</div>
        {!viewOnly && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 md:static md:relative"
            onClick={() => handleEditClick(field)}
            aria-label={`Edit ${label}`}
          >
            <Edit2 className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-1">Edit</span>
          </Button>
        )}
      </div>
      <div className="mt-1 pr-4">{children}</div>
    </div>
  );

  // Format date display
  const formatDisplayDate = (date: string) => {
    try {
      return formatDate(new Date(date), 'MMMM d, yyyy');
    } catch (error) {
      return date;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        {editMode && editingField ? (
          <DialogContent className="max-w-lg sm:max-w-2xl p-0 overflow-hidden bg-white">
            <div className="p-4 bg-white">
              <Button variant="ghost" onClick={handleCancelEdit} className="mb-4">
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              {renderEditComponent()}
            </div>
          </DialogContent>
        ) : showCancelConfirm ? (
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Cancel Service Call</DialogTitle>
            </DialogHeader>
            <p className="py-4">Are you sure you want to cancel this service call? This action cannot be undone.</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCancelConfirm(false)}>No, Keep It</Button>
              <Button variant="destructive" onClick={handleCancelServiceCall}>Yes, Cancel Service Call</Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          <DialogContent className="max-w-lg sm:max-w-2xl md:max-w-3xl p-0 bg-white overflow-auto max-h-[90vh]">
            <div className="bg-white rounded-lg shadow-sm">
              <DialogHeader className="p-4 md:p-5 border-b sticky top-0 bg-white z-10">
                <div className="flex flex-row items-center justify-between">
                  <DialogTitle className="text-xl md:text-2xl font-bold truncate">{updatedServiceCall.customer} Service Call</DialogTitle>
                  <StatusBadge 
                    status={updatedServiceCall.status === 'completed' ? 'success' : 
                      updatedServiceCall.status === 'cancelled' ? 'error' : 
                      updatedServiceCall.status === 'in-progress' ? 'warning' : 'neutral'} 
                    label={getStatusLabel(updatedServiceCall.status)} 
                  />
                </div>
              </DialogHeader>
              
              <div className="p-4 md:p-5 overflow-y-auto">
                <div className="space-y-3">
                  <SectionCard 
                    icon={<FileText className="h-5 w-5 text-blue-600" />}
                    label="Service Type"
                    field="service"
                  >
                    <p className="text-lg font-medium">{updatedServiceCall.serviceType?.replace(/-/g, ' ')}</p>
                  </SectionCard>
                  
                  <SectionCard 
                    icon={<Building2 className="h-5 w-5 text-blue-600" />}
                    label="Customer"
                    field="customer"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-2">
                        {updatedServiceCall.customer?.charAt(0) || 'C'}
                      </div>
                      <span className="text-lg font-medium">{updatedServiceCall.customer}</span>
                    </div>
                  </SectionCard>
                  
                  <SectionCard 
                    icon={<MapPin className="h-5 w-5 text-green-600" />}
                    label="Project Site"
                    field="location"
                  >
                    <p className="text-lg font-medium">{updatedServiceCall.projectSite || 'Not specified'}</p>
                  </SectionCard>
                  
                  <SectionCard 
                    icon={<Calendar className="h-5 w-5 text-orange-600" />}
                    label="Schedule"
                    field="schedule"
                  >
                    <p className="text-lg font-medium">{formatDisplayDate(updatedServiceCall.date)}</p>
                    {updatedServiceCall.startTime && (
                      <div className="mt-1 inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {updatedServiceCall.startTime}
                      </div>
                    )}
                  </SectionCard>
                  
                  <SectionCard 
                    icon={<Truck className="h-5 w-5 text-purple-600" />}
                    label="Equipment"
                    field="equipment"
                  >
                    {updatedServiceCall.pumpType && (
                      <div className="mb-1">
                        <span className="text-sm font-medium text-gray-500">Pump Type: </span>
                        <span className="font-medium">{updatedServiceCall.pumpType}</span>
                      </div>
                    )}
                    {updatedServiceCall.quantity && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Quantity: </span>
                        <span className="font-medium">{updatedServiceCall.quantity} m³</span>
                      </div>
                    )}
                    {!updatedServiceCall.pumpType && !updatedServiceCall.quantity && (
                      <p className="text-gray-500 italic">No equipment details specified</p>
                    )}
                  </SectionCard>
                  
                  <SectionCard 
                    icon={<Info className="h-5 w-5 text-red-600" />}
                    label="Notes"
                    field="details"
                  >
                    <p className="whitespace-pre-line">{updatedServiceCall.notes || <span className="text-gray-500 italic">No notes added</span>}</p>
                  </SectionCard>
                </div>
              </div>
              
              <div className="p-4 md:p-5 border-t bg-white sticky bottom-0">
                <div className="flex flex-wrap gap-2">
                  {!viewOnly && (
                    <Button 
                      variant="destructive" 
                      onClick={() => setShowCancelConfirm(true)}
                      className="w-full sm:w-auto sm:mr-auto order-last sm:order-first"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Cancel Service Call
                    </Button>
                  )}
                  
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                    <Button 
                      variant="outline" 
                      onClick={onClose}
                      size="sm"
                    >
                      Close
                    </Button>
                    
                    <Button 
                      onClick={handleCreateCertificate}
                      size="sm"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Convert to Certificate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Add Convert to Certificate Modal */}
      {updatedServiceCall && (
        <ConvertToCertificateModal
          isOpen={showConvertModal}
          onClose={() => setShowConvertModal(false)}
          onConfirm={handleConvertCertificate}
          serviceCall={updatedServiceCall}
        />
      )}
    </>
  );
};

export default ServiceCallPreviewDialog;
