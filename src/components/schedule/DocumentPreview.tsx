
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User, Truck, Package, FileText, Building2, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ScheduleCall } from '@/pages/Schedule';
import DocumentID from '@/components/schedule/DocumentID';
import StatusBadge from '@/components/StatusBadge';
import { cn } from '@/lib/utils';
import ServiceCallDocument from '@/components/documents/ServiceCallDocument';
import DocumentChatButton from '@/components/documents/DocumentChatButton';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from '@/components/ui/use-toast';

export interface DocumentPreviewProps {
  type: 'service-call' | 'delivery-certificate';
  data: any;
  onClose: () => void;
  onPrint?: () => void;
  onDownload?: () => void;
  onSave?: () => void;
  customerId?: string;
  customerName?: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  type,
  data,
  onClose,
  onPrint,
  onDownload,
  onSave,
  customerId,
  customerName
}) => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  
  const formatDate = (date: string | Date) => {
    try {
      return format(new Date(date), 'MMMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatTime = (time: string) => {
    if (!time) return '';
    return time;
  };

  const getStatusType = (status: string): 'success' | 'warning' | 'error' | 'neutral' | 'info' => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'physical-signature':
        return 'success';
      case 'in-progress':
      case 'awaiting-signature':
      case 'without-signature':
        return 'warning';
      case 'incomplete':
      case 'canceled':
        return 'error';
      case 'pending':
      case 'scheduled':
        return 'info';
      default:
        return 'neutral';
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Pending';
      case 'scheduled':
        return 'Scheduled';
      case 'in-progress':
        return 'In Progress';
      case 'incomplete':
        return 'Incomplete';
      case 'awaiting-signature':
        return 'Awaiting Signature';
      case 'completed':
        return 'Completed';
      case 'physical-signature':
        return 'Physical Signed';
      case 'without-signature':
        return 'Unsigned';
      case 'canceled':
        return 'Canceled';
      default:
        return status;
    }
  };
  
  const handleDocumentDownload = async () => {
    if (!contentRef.current) return;

    try {
      // Show loading toast
      toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your document...",
      });

      // Set a slight delay to allow the UI to update
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate canvas from DOM element
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      });

      // Create a new PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Calculate the PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 297; // A4 height in mm
      
      // If the image height is less than page height, add it to the PDF directly
      if (imgHeight < pageHeight) {
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        // If the image is taller than a page, we need to split it into multiple pages
        let heightLeft = imgHeight;
        let position = 0;
        const imgData = canvas.toDataURL('image/png');
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      }

      // Save the PDF
      const documentPrefix = type === 'service-call' ? 'ServiceCall' : 'Certificate';
      const documentId = data.id?.substring(0, 8) || Math.floor(Math.random() * 10000).toString();
      pdf.save(`${documentPrefix}_${documentId}.pdf`);

      // Show success toast
      toast({
        title: "Download Complete",
        description: "Your document has been downloaded successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Download Failed",
        description: "There was a problem generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderServiceCallPreview = () => {
    const call = data as ScheduleCall & { delivery_certificate_id?: string };
    const documentNumber = `SC-${call.id?.substring(0, 8) || Math.floor(Math.random() * 10000).toString()}`;
    
    return (
      <div ref={contentRef}>
        <ServiceCallDocument 
          serviceCall={call}
          documentNumber={documentNumber}
          linkedCertificateId={call.delivery_certificate_id}
          isPreview={true}
        />
      </div>
    );
  };

  const renderDeliveryCertificatePreview = () => {
    const certificate = data;
    return (
      <div ref={contentRef} className="space-y-6 p-6 bg-white rounded-lg border print:shadow-none">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Delivery Certificate</h1>
            <div className="mt-2">
              <DocumentID 
                type="delivery-certificate" 
                date={certificate.date} 
                id={certificate.id}
                size="md"
              />
            </div>
          </div>
          <StatusBadge 
            status={getStatusType(certificate.status)} 
            label={getStatusLabel(certificate.status)} 
            size="md"
          />
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Service Details</h2>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(certificate.date)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Service Hours</p>
                  <p className="font-medium">{certificate.service_hours || 0} hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Service Details</p>
                  <p className="font-medium">{certificate.service_details || 'N/A'}</p>
                </div>
              </div>
              
              {certificate.quantity && (
                <div className="flex items-start">
                  <Package className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{certificate.quantity}</p>
                  </div>
                </div>
              )}
              
              {certificate.materials && (
                <div className="flex items-start">
                  <Package className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Materials Used</p>
                    <p className="font-medium">{certificate.materials}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Customer & Operator</h2>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <Building2 className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{certificate.customer_name || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Operator</p>
                  <p className="font-medium">{certificate.operator_name || 'N/A'}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">Signature Information:</h3>
              <div className="bg-gray-50 border border-gray-200 p-3 rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Signature Type:</span>{" "}
                  {certificate.signature_type === 'digital' ? 'Digital Signature' : 'Physical Signature'}
                </p>
                
                {certificate.signature_data && certificate.signature_type === 'digital' && (
                  <div className="mt-2 border border-gray-200 p-2 bg-white">
                    <img 
                      src={certificate.signature_data} 
                      alt="Customer Signature" 
                      className="max-h-24"
                    />
                  </div>
                )}
                
                {certificate.signature_type === 'physical' && certificate.pdf_url && (
                  <p className="text-sm mt-2">
                    <span className="font-medium">Document:</span> Physical signature document available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {certificate.service_call_id && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mt-4">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-800">Associated Service Call</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              This delivery certificate is associated with service call ID: {certificate.service_call_id}
            </p>
          </div>
        )}
        
        {certificate.status === 'without-signature' && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mt-4">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-amber-600 mr-2" />
              <span className="font-medium text-amber-800">Signature Required</span>
            </div>
            <p className="text-sm text-amber-700 mt-1">
              This delivery certificate requires a customer signature.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
      <DialogHeader>
        <DialogTitle>
          {type === 'service-call' ? 'Service Call Document' : 'Delivery Certificate'}
        </DialogTitle>
      </DialogHeader>
      
      <div className="print:mx-0 mb-6">
        {type === 'service-call' ? renderServiceCallPreview() : renderDeliveryCertificatePreview()}
      </div>
      
      <DialogFooter className="flex sm:justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <div className="flex gap-2">
          {customerId && (
            <DocumentChatButton
              documentId={data.id}
              documentType={type}
              documentName={`${type === 'service-call' ? 'Service Call' : 'Certificate'} #${data.id.substring(0, 8)}`}
              customerId={customerId}
              customerName={customerName}
              variant="outline"
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
            />
          )}
          <Button variant="outline" onClick={handleDocumentDownload} className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          {onSave && (
            <Button onClick={onSave}>
              Save
            </Button>
          )}
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default DocumentPreview;
