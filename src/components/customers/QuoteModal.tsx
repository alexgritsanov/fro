
import React, { useState } from 'react';
import { toast } from 'sonner';
import AgreementModal from '@/components/agreements/AgreementModal';

interface AgreementModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  quote?: any; // Renamed from quote to agreement in the implementation
  customerId?: string;
  customerName?: string;
  fromCustomerCreation?: boolean;
}

// Renamed component from QuoteModal to AgreementModalWrapper
const AgreementModalWrapper = ({ 
  isOpen, 
  onClose, 
  onComplete, 
  quote, // Keeping parameter name for backward compatibility
  customerId, 
  fromCustomerCreation, 
  customerName 
}: AgreementModalWrapperProps) => {
  const [showAgreementModal, setShowAgreementModal] = useState(true);
  
  console.log('AgreementModalWrapper opened with props:', {
    isOpen,
    onComplete: !!onComplete,
    customerId,
    customerName,
    fromCustomerCreation,
    isEditing: !!quote,
    quoteDetails: quote
  });
  
  const handleClose = () => {
    console.log('AgreementModalWrapper closing');
    setShowAgreementModal(false);
    onClose();
    
    // Call onComplete if provided (to refresh customer data)
    if (onComplete) {
      console.log('Calling onComplete callback to refresh data');
      onComplete();
    }
  };
  
  // Just pass through to the new AgreementModal component
  return (
    <>
      {showAgreementModal && (
        <AgreementModal
          isOpen={isOpen}
          onClose={handleClose}
          isEditing={!!quote}
          agreement={quote}
          customerId={customerId}
          customerName={customerName}
        />
      )}
    </>
  );
};

export default AgreementModalWrapper;
