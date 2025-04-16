
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Link, 
  MessageSquare, 
  AlertTriangle, 
  Printer, 
  Download, 
  Share2, 
  FileText, 
  FileSpreadsheet, 
  BarChart2, 
  X, 
  Check,
  Eye,
  Mail,
  Copy,
  Maximize,
  Minimize
} from 'lucide-react';
import { ScheduleCall } from '@/pages/Schedule';
import ServiceCallDocument from './ServiceCallDocument';
import CertificateDocument from './CertificateDocument';
import DocumentDisputesView from './DocumentDisputesView';
import { toast } from '@/components/ui/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Update the interface to be consistent with our document type mapping
interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: 'service-call' | 'certificate';  // This expects 'certificate', not 'delivery-certificate'
  documentData: any;
  documentNumber?: string;  // Make optional in case it's not provided
  linkedDocumentId?: string | null;
  linkedDocumentNumber?: string | null;
  customerId?: string;
  customerName?: string;
  onGenerateCertificate?: () => void;
}

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  documentType,
  documentData,
  documentNumber = '', // Provide default value
  linkedDocumentId,
  linkedDocumentNumber,
  customerId,
  customerName,
  onGenerateCertificate
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('preview');
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleViewSignature = () => {
    // Implementation for viewing signature
    toast({
      title: "Signature View",
      description: "Signature viewer will open in a moment.",
    });
  };

  const handleRequestSignature = () => {
    // Implementation for requesting signature
    toast({
      title: "Signature Request",
      description: "Signature request will be sent to the customer.",
    });
  };

  const handleDownloadPDF = async () => {
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
      const documentPrefix = documentType === 'service-call' ? 'ServiceCall' : 'Certificate';
      pdf.save(`${documentPrefix}_${documentNumber.replace(/[^a-zA-Z0-9]/g, '')}.pdf`);

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

  const handleShare = () => {
    // Implementation for sharing document
    toast({
      title: "Share Document",
      description: "Share options will appear shortly.",
    });
  };

  const handleCopyLink = () => {
    // Implementation for copying document link
    navigator.clipboard.writeText(`https://unidoc.com/documents/${documentType}/${documentNumber}`);
    toast({
      title: "Link Copied",
      description: "Document link has been copied to clipboard.",
    });
  };
  
  const handleStartCommunication = () => {
    // Store context in session storage for the communication view
    sessionStorage.setItem('chatContext', JSON.stringify({
      documentId: documentData.id,
      documentType: documentType,
      documentName: `${documentType === 'service-call' ? 'Service Call' : 'Certificate'} #${documentNumber}`,
      customerId: customerId,
      customerName: customerName,
      timestamp: new Date().toISOString()
    }));
    
    // Close the modal
    onClose();
    
    // Navigate to the appropriate communication view
    if (customerId) {
      navigate(`/customers/${customerId}?tab=communication&chatContext=${documentData.id}`);
    } else {
      navigate(`/users?tab=communication&chatContext=${documentData.id}`);
    }
    
    toast({
      title: "Chat opened",
      description: "Starting conversation about this document.",
    });
  };

  const getDocumentIcon = () => {
    if (documentType === 'service-call') return <FileText className="h-5 w-5 text-blue-600" />;
    if (documentType === 'certificate') return <FileSpreadsheet className="h-5 w-5 text-emerald-600" />;
    return <BarChart2 className="h-5 w-5 text-purple-600" />;
  };

  const getDocumentTitle = () => {
    if (documentType === 'service-call') return "Service Call Document";
    if (documentType === 'certificate') return "Delivery Certificate";
    return "Report Document";
  };

  const handleEmailDocument = () => {
    // Implementation for emailing document
    toast({
      title: "Email Document",
      description: "Email form will open shortly.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isFullscreen ? 'fixed inset-0 max-w-none rounded-none' : 'max-w-4xl'} max-h-[90vh] p-0 overflow-auto bg-gray-50 print:shadow-none`}>
        <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center">
            {getDocumentIcon()}
            <h2 className="ml-2 text-lg font-semibold">{getDocumentTitle()}</h2>
            <span className="ml-2 text-sm text-gray-500">#{documentNumber}</span>
          </div>
          
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsFullscreen(!isFullscreen)} 
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} title="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Main Content Area */}
          <div className="flex-1 overflow-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="sticky top-0 z-10 bg-white border-b px-4 flex items-center justify-between">
                <TabsList className="mt-1 mb-1">
                  <TabsTrigger value="preview" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Document
                  </TabsTrigger>
                  <TabsTrigger value="disputes" className="flex items-center relative">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Disputes
                    {/* Example notification badge for disputes */}
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      2
                    </span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="preview" className="p-6 mt-0 bg-gray-50">
                <div id="document-preview-content" ref={contentRef}>
                  {documentType === 'service-call' && (
                    <ServiceCallDocument
                      serviceCall={documentData as ScheduleCall}
                      documentNumber={documentNumber}
                      linkedCertificateId={linkedDocumentId}
                      onGenerateCertificate={onGenerateCertificate}
                    />
                  )}
                  
                  {documentType === 'certificate' && (
                    <CertificateDocument
                      certificate={documentData}
                      documentNumber={documentNumber}
                      linkedServiceCallId={linkedDocumentId}
                      linkedServiceCallNumber={linkedDocumentNumber}
                      onViewSignature={handleViewSignature}
                      onRequestSignature={handleRequestSignature}
                    />
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="disputes" className="p-6 mt-0">
                <DocumentDisputesView 
                  documentId={documentData.id} 
                  documentType={documentType}
                  documentNumber={documentNumber}
                  customerId={customerId}
                  customerName={customerName}
                  showDisputeForm={showDisputeForm}
                  onToggleDisputeForm={() => setShowDisputeForm(!showDisputeForm)}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Action Sidebar */}
          <div className="w-64 bg-white border-l print:hidden">
            <div className="p-4 border-b">
              <h3 className="text-sm font-medium mb-3">Document Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleDownloadPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleStartCommunication}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discuss Document
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Document
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleEmailDocument}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email Document
                </Button>
              </div>
            </div>
            
            <div className="p-4 border-b">
              <h3 className="text-sm font-medium mb-3">Linked Documents</h3>
              {linkedDocumentId ? (
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center">
                    {documentType === 'certificate' ? (
                      <FileText className="h-4 w-4 text-blue-600 mr-2" />
                    ) : (
                      <FileSpreadsheet className="h-4 w-4 text-emerald-600 mr-2" />
                    )}
                    <div className="flex-1 text-sm">
                      <div className="font-medium">
                        {documentType === 'certificate' ? 'Service Call' : 'Certificate'}
                      </div>
                      <div className="text-xs text-gray-500">#{linkedDocumentNumber || linkedDocumentId}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic">No linked documents found</div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-medium mb-3">Document Info</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="font-medium">{documentType === 'service-call' ? 'Service Call' : 'Certificate'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">ID:</span>
                  <span className="font-medium">{documentNumber}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-medium capitalize">{documentData.status?.replace(/-/g, ' ') || 'Unknown'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span className="font-medium">{documentData.createdAt || documentData.date || 'Unknown'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Updated:</span>
                  <span className="font-medium">{documentData.updatedAt || documentData.date || 'Unknown'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPreviewModal;
