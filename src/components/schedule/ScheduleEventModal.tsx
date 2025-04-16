
import React, { useState } from 'react';
import { format } from 'date-fns';
import ServiceCallPreviewDialog from './ServiceCallPreviewDialog';
import DeliveryCertificateModal from './DeliveryCertificateModal';
import ConvertToCertificateModal from './ConvertToCertificateModal';
import ConvertToCertificateFlow from './ConvertToCertificateFlow';
import { toast } from 'sonner';

export interface ScheduleEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  onStatusChange?: (event: any, newStatus: string) => void;
  onEdit?: (event: any) => void;
  onSave?: (updatedEvent: any) => void;
  onConvertToDeliveryCertificate?: (event: any) => void;
  viewOnly?: boolean;
}

const ScheduleEventModal = ({ 
  isOpen, 
  onClose, 
  event,
  onStatusChange,
  onEdit,
  onSave,
  onConvertToDeliveryCertificate,
  viewOnly = false
}: ScheduleEventModalProps) => {
  const [isServiceCallPreviewOpen, setIsServiceCallPreviewOpen] = useState(isOpen);
  const [isDeliveryCertificateModalOpen, setIsDeliveryCertificateModalOpen] = useState(false);
  const [isConvertToCertificateModalOpen, setIsConvertToCertificateModalOpen] = useState(false);
  const [isConvertToCertificateFlowOpen, setIsConvertToCertificateFlowOpen] = useState(false);
  const [updatedServiceCall, setUpdatedServiceCall] = useState(event);
  
  if (!event) return null;
  
  const handleStatusChange = (newStatus: string) => {
    if (onStatusChange) {
      onStatusChange(event, newStatus);
      
      toast.success(`Status updated to ${newStatus.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}`, {
        description: `Service call ${event.id} has been updated.`,
      });
      
      if (newStatus === 'cancelled') {
        onClose();
      }
    }
  };
  
  const handleEdit = () => {
    if (onEdit) {
      onEdit(event);
      onClose();
    }
  };
  
  const handleSave = (updatedEvent: any) => {
    if (onSave) {
      onSave(updatedEvent);
    }
  };

  const handleCancelServiceCall = () => {
    handleStatusChange('cancelled');
  };
  
  const handleCreateDeliveryCertificate = () => {
    if (event.status === 'in-progress' || event.status === 'scheduled' || event.status === 'pending') {
      // Close the service call preview and show the conversion confirmation modal
      setIsServiceCallPreviewOpen(false);
      setIsConvertToCertificateModalOpen(true);
    } else {
      toast.error("Cannot convert to delivery certificate", {
        description: "Service call must be in progress, pending, or scheduled to convert to a delivery certificate.",
      });
    }
  };
  
  const handleConfirmConvertToCertificate = (updatedServiceCallData: any) => {
    // Close the confirmation modal
    setIsConvertToCertificateModalOpen(false);
    
    // Update the service call data with any edits from the confirmation modal
    setUpdatedServiceCall({...updatedServiceCallData});
    
    // Open the convert to certificate flow
    console.log("Opening certificate flow with data:", updatedServiceCallData);
    setIsConvertToCertificateFlowOpen(true);
  };
  
  const handleSaveDeliveryCertificate = (data: any) => {
    if (onConvertToDeliveryCertificate) {
      // Combine the updated service call data with the additional certificate data
      const completeData = {
        ...updatedServiceCall,
        ...data
      };
      
      console.log("Saving certificate with complete data:", completeData);
      onConvertToDeliveryCertificate(completeData);
      
      toast.success("Delivery Certificate Created", {
        description: "The service call has been converted to a delivery certificate.",
      });
      
      setIsDeliveryCertificateModalOpen(false);
      setIsConvertToCertificateFlowOpen(false);
      onClose();
    }
  };

  const handleCloseConvertModal = () => {
    setIsConvertToCertificateModalOpen(false);
    // Reopen the service call preview when closing the convert modal without proceeding
    setIsServiceCallPreviewOpen(true);
  };

  const handleMainClose = () => {
    setIsServiceCallPreviewOpen(false);
    onClose();
  };

  const handleDeliveryCertificateModalClose = () => {
    setIsDeliveryCertificateModalOpen(false);
    setIsConvertToCertificateFlowOpen(false);
    onClose();
  };

  return (
    <>
      <ServiceCallPreviewDialog
        isOpen={isServiceCallPreviewOpen && !isConvertToCertificateModalOpen && !isConvertToCertificateFlowOpen}
        onClose={handleMainClose}
        serviceCall={event}
        onEdit={handleEdit}
        onSave={handleSave}
        onCreateCertificate={handleCreateDeliveryCertificate}
        onCancel={handleCancelServiceCall}
        viewOnly={viewOnly}
      />
      
      {isConvertToCertificateModalOpen && (
        <ConvertToCertificateModal
          isOpen={isConvertToCertificateModalOpen}
          onClose={handleCloseConvertModal}
          onConfirm={handleConfirmConvertToCertificate}
          serviceCall={event}
        />
      )}
      
      {isConvertToCertificateFlowOpen && (
        <ConvertToCertificateFlow
          isOpen={isConvertToCertificateFlowOpen}
          onClose={handleDeliveryCertificateModalClose}
          onSave={handleSaveDeliveryCertificate}
          serviceCall={updatedServiceCall}
        />
      )}
    </>
  );
};

export default ScheduleEventModal;
