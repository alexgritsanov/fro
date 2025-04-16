import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Save, Download, Send, Edit, Check, Maximize, Minimize, Upload, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import SignatureCanvas from 'react-signature-canvas';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AgreementPreview from '../AgreementPreview';
import { toast } from 'sonner';
import StampUploader from '@/components/documents/StampUploader';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface AgreementPreviewStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
  isEditing?: boolean;
}

const AgreementPreviewStep: React.FC<AgreementPreviewStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isEditing = false
}) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>('preview');
  const [providerSignature, setProviderSignature] = useState<string | null>(formData.providerSignature || null);
  const [providerSignatureRef, setProviderSignatureRef] = useState<SignatureCanvas | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStampUploader, setShowStampUploader] = useState(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const handleSignatureClear = () => {
    if (providerSignatureRef) {
      providerSignatureRef.clear();
      setProviderSignature(null);
      updateFormData('providerSignature', null);
    }
  };
  
  const handleSignatureSave = () => {
    if (providerSignatureRef && !providerSignatureRef.isEmpty()) {
      const signatureData = providerSignatureRef.toDataURL('image/png');
      setProviderSignature(signatureData);
      updateFormData('providerSignature', signatureData);
      toast.success("Signature saved successfully");
    } else {
      toast.error("Please provide a signature before saving");
    }
  };

  const handleSaveStamp = (stampData: string) => {
    updateFormData('companyStamp', stampData);
    setShowStampUploader(false);
    toast.success("Company stamp saved successfully");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    
    setTimeout(() => {
      if (previewContainerRef.current) {
        previewContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handlePrint = async () => {
    if (!previewRef.current) {
      toast.error("Preview not ready for printing");
      return;
    }

    toast.loading("Preparing document for printing...", { id: "print-progress" });

    try {
      const previewElement = previewRef.current.cloneNode(true) as HTMLDivElement;
      
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '210mm';
      container.style.height = 'auto';
      container.style.backgroundColor = 'white';
      container.style.padding = '0';
      container.style.margin = '0';
      container.className = 'agreement-print';
      
      container.appendChild(previewElement);
      
      document.body.appendChild(container);
      
      setTimeout(() => {
        toast.dismiss("print-progress");
        window.print();
        
        setTimeout(() => {
          document.body.removeChild(container);
        }, 100);
      }, 300);
    } catch (error) {
      console.error("Error preparing for print:", error);
      toast.error("Failed to prepare document for printing");
      toast.dismiss("print-progress");
    }
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) {
      toast.error("Preview not ready for download");
      return;
    }

    toast.loading("Generating PDF...", { id: "pdf-progress" });

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

      const fileName = `${formData.customerName || 'Agreement'}_${formData.agreementId || new Date().getTime()}.pdf`;
      pdf.save(fileName);
      
      toast.success("PDF downloaded successfully", { id: "pdf-progress" });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF", { id: "pdf-progress" });
    }
  };

  useEffect(() => {
    if (!formData.providerSignature && localStorage.getItem('defaultProviderSignature')) {
      const savedSignature = localStorage.getItem('defaultProviderSignature');
      if (savedSignature) {
        updateFormData('providerSignature', savedSignature);
        setProviderSignature(savedSignature);
      }
    }
  }, []);

  useEffect(() => {
    if (formData.providerSignature && providerSignatureRef) {
      const img = new Image();
      img.src = formData.providerSignature;
      img.onload = () => {
        providerSignatureRef.clear();
        providerSignatureRef.fromDataURL(formData.providerSignature);
      };
    }
  }, [providerSignatureRef, formData.providerSignature]);

  const setAsDefaultSignature = () => {
    if (providerSignature) {
      localStorage.setItem('defaultProviderSignature', providerSignature);
      toast.success("Signature set as default for future agreements");
    } else {
      toast.error("Please save a signature first");
    }
  };
  
  return (
    <div className={cn(
      "flex flex-col h-full transition-all duration-300",
      isFullscreen ? "fixed inset-0 z-50 bg-white" : ""
    )}>
      {isFullscreen && (
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h2 className="text-lg font-semibold">Agreement Preview</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
              <Minimize className="h-4 w-4 mr-2" />
              Exit Fullscreen
            </Button>
          </div>
        </div>
      )}
      
      <div className={cn(
        "space-y-6 p-4 md:p-6 overflow-y-auto",
        isFullscreen ? "flex-1" : ""
      )} ref={previewContainerRef}>
        {!isFullscreen && (
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Preview & Finalize</h1>
              <p className="text-sm text-gray-500 mt-1">
                Preview your agreement and add your signature before sending
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
                className="hidden md:flex"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="hidden md:flex"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
                className="hidden md:flex"
              >
                <Maximize className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
            </div>
          </div>
        )}
        
        {!isFullscreen && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-md mb-4">
              <TabsTrigger value="preview" className="flex-1">
                Preview
              </TabsTrigger>
              <TabsTrigger value="sign" className="flex-1">
                Sign Agreement
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="m-0">
              <div className="border rounded-md overflow-hidden bg-gray-50 h-[700px] print:h-auto print:bg-white" ref={previewRef}>
                <AgreementPreview formData={formData} className="h-full" />
              </div>
              
              <div className="flex gap-2 mt-2 md:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadPDF}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="flex-1"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="flex-1"
                >
                  <Maximize className="h-4 w-4 mr-2" />
                  Fullscreen
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="sign" className="m-0">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="p-5 border border-gray-200 shadow-sm col-span-1 lg:col-span-2">
                  <h3 className="text-lg font-medium mb-4">Provider Signature</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signature" className="text-base">
                        Sign below to finalize the agreement
                      </Label>
                      <div className="border-2 rounded-md border-gray-200 bg-white h-40 flex items-center justify-center overflow-hidden">
                        {providerSignature ? (
                          <div className="signature-preview h-full w-full flex items-center justify-center p-4 relative group">
                            <img 
                              src={providerSignature} 
                              alt="Signature" 
                              className="max-h-full max-w-full object-contain"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-white"
                                onClick={handleSignatureClear}
                              >
                                Edit Signature
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <SignatureCanvas
                            ref={(ref) => setProviderSignatureRef(ref)}
                            canvasProps={{
                              width: 500,
                              height: 160,
                              className: 'signature-canvas w-full h-full'
                            }}
                            backgroundColor="rgba(255, 255, 255, 0)"
                          />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSignatureClear}
                        className="flex-1"
                      >
                        Clear
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleSignatureSave}
                        className="flex-1 bg-sky-500 hover:bg-sky-600"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Signature
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={setAsDefaultSignature}
                        className="flex-1"
                        disabled={!providerSignature}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Set as Default
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowStampUploader(true)}
                        className="flex-1"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Company Stamp
                      </Button>
                    </div>
                    
                    <div className="text-sm text-gray-500 bg-sky-50 p-3 rounded-md border border-sky-100">
                      <p>By signing this document, you confirm that:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                        <li>You have reviewed all terms and conditions</li>
                        <li>You have authority to sign on behalf of your company</li>
                        <li>You agree to the pricing structure outlined</li>
                      </ul>
                    </div>
                  </div>
                </Card>
                
                <div className="col-span-1 lg:col-span-3 border rounded-md overflow-hidden bg-gray-50 h-[700px]">
                  <AgreementPreview formData={formData} className="h-full" />
                </div>
              </div>
              
              {showStampUploader && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="max-w-md w-full">
                    <StampUploader 
                      onSave={handleSaveStamp}
                      onCancel={() => setShowStampUploader(false)}
                      initialStamp={formData.companyStamp}
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
        
        {isFullscreen && (
          <div className="h-full flex-1 min-h-0" ref={previewRef}>
            <AgreementPreview formData={formData} className="h-full" />
          </div>
        )}
        
        {!isFullscreen && (
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onBack} className="flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" />
              <span className={isMobile ? "sr-only" : ""}>Back</span>
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleDownloadPDF}
                className="flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                <span className={isMobile ? "sr-only" : ""}>Export</span>
              </Button>
              
              <Button 
                onClick={onNext} 
                className="bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-600 hover:to-sky-500 flex items-center"
              >
                <span className={isMobile ? "sr-only" : ""}>Continue</span>
                <ChevronRight className={cn("h-4 w-4", isMobile ? "" : "ml-2")} />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {isFullscreen && (
        <div className="p-4 border-t bg-white flex justify-between items-center">
          <Button variant="outline" onClick={toggleFullscreen}>
            <Minimize className="h-4 w-4 mr-2" />
            Exit Fullscreen
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleDownloadPDF}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button 
              variant="outline" 
              onClick={handlePrint}
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgreementPreviewStep;
