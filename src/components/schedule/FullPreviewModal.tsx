
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Maximize, Minimize, X } from 'lucide-react';
import ServiceCallPreview from './ServiceCallPreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

interface FullPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceCallData: any;
  documentNumber: string;
}

const FullPreviewModal: React.FC<FullPreviewModalProps> = ({
  isOpen,
  onClose,
  serviceCallData,
  documentNumber
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Force re-render when isOpen changes to ensure proper display
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Allow time for the state to update
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    toast.loading("Generating PDF...", { duration: 5000, id: "pdf-loading" });

    try {
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
      pdf.save(`ServiceCall_${documentNumber.replace(/[^a-zA-Z0-9]/g, '')}.pdf`);
      
      toast.success("PDF Downloaded Successfully", { duration: 2000, id: "pdf-loading" });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Error generating PDF. Please try again.", { duration: 3000, id: "pdf-loading" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn(
        "p-0 max-h-[90vh] overflow-auto bg-gray-50",
        isFullscreen ? "fixed inset-0 max-w-none w-full h-full rounded-none" : "max-w-5xl"
      )}>
        <div className="sticky top-0 z-10 bg-white p-4 border-b flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold truncate pr-2">
            Service Call Document - {documentNumber}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownloadPDF}
              title="Download PDF"
              className="hidden sm:flex"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              className="hidden sm:flex"
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 py-2 bg-white border-b sm:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPDF}
            className="flex-1 max-w-[150px]"
          >
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="flex-1 max-w-[150px]"
          >
            {isFullscreen ? (
              <><Minimize className="h-4 w-4 mr-2" /> Exit Fullscreen</>
            ) : (
              <><Maximize className="h-4 w-4 mr-2" /> Fullscreen</>
            )}
          </Button>
        </div>
        
        <div 
          ref={contentRef} 
          className="p-4 md:p-6 bg-white mx-auto print:p-0 print:shadow-none"
          style={{ 
            maxWidth: isFullscreen ? 'none' : '210mm',
            boxShadow: isFullscreen ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}
        >
          <ServiceCallPreview 
            serviceCallData={serviceCallData} 
            isPrintMode={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to conditionally merge classnames
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default FullPreviewModal;
