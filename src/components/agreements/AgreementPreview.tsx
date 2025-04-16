
import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import { 
  Download, Printer, ZoomIn, ZoomOut, 
  RefreshCw, FileText, CheckCircle, 
  Building2, User, Calendar, CreditCard,
  Phone, Mail, MapPin, FileBarChart,
  Shield, DollarSign, AlignLeft, Hash,
  Signature, Pen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AgreementPreviewProps {
  formData: any;
  className?: string;
  isPrintMode?: boolean;
}

const AgreementPreview: React.FC<AgreementPreviewProps> = ({ 
  formData, 
  className,
  isPrintMode = false
}) => {
  const [zoom, setZoom] = useState(1);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // This would be implemented with a PDF generation library
    // For now, we'll use print-to-PDF functionality
    window.print();
  };
  
  const increaseZoom = () => {
    if (zoom < 2) {
      setZoom(prev => Math.min(prev + 0.1, 2));
    }
  };
  
  const decreaseZoom = () => {
    if (zoom > 0.5) {
      setZoom(prev => Math.max(prev - 0.1, 0.5));
    }
  };
  
  const resetZoom = () => {
    setZoom(1);
  };
  
  // Format currency with 2 decimal places
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Generate signature placeholder with improved layout
  const renderSignaturePlaceholder = (title: string, name?: string, date?: Date) => (
    <div className="flex flex-col items-start">
      <span className="text-sm font-medium mb-1">{title}</span>
      <div className="border-b border-dashed border-gray-400 w-full h-16 mb-2 signature-area flex items-center justify-center">
        <span className="text-xs text-gray-400 italic">Click to sign</span>
      </div>
      <div className="flex justify-between w-full text-xs text-gray-600">
        <div>
          <span className="font-medium">Name:</span> {name || '________________'}
        </div>
        <div>
          <span className="font-medium">Date:</span> {date ? format(date, 'dd/MM/yyyy') : format(new Date(), 'dd/MM/yyyy')}
        </div>
      </div>
    </div>
  );
  
  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Controls bar - only shown in non-print mode */}
      {!isPrintMode && (
        <div className="flex items-center justify-between p-3 bg-gray-50 border-b print:hidden">
          <div className="text-sm font-medium text-gray-700 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-sky-600" />
            Agreement Preview
          </div>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={decreaseZoom}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom Out</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetZoom}
              className="text-xs px-2"
            >
              {Math.round(zoom * 100)}%
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={increaseZoom}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom In</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Printer className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Print</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download PDF</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
      
      {/* Scrollable preview area */}
      <ScrollArea className="flex-1">
        <div 
          className={cn(
            "bg-gray-100 flex justify-center p-6 min-h-full",
            isPrintMode ? "p-0 bg-white" : ""
          )}
        >
          {/* A4 size container with appropriate scaling */}
          <div 
            ref={previewRef}
            className={cn(
              "bg-white shadow-md w-[210mm] min-h-[297mm] mx-auto agreement-print",
              isPrintMode ? "shadow-none w-full" : ""
            )} 
            style={{
              transform: !isPrintMode ? `scale(${zoom})` : 'none',
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease'
            }}
          >
            {/* Agreement Content */}
            <div className="p-8 max-w-full">
              {/* Header section with company info and document title */}
              <div className="relative rounded-xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-sky-600"></div>
                <div className="absolute inset-0 opacity-10" 
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
                  }}
                ></div>
                
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                <div className="relative p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col md:flex-row md:items-center">
                    {/* Company Logo */}
                    <div className="bg-white rounded-lg p-3 shadow-sm mr-4 mb-3 md:mb-0 w-16 h-16 flex items-center justify-center">
                      <Shield className="h-10 w-10 text-sky-500" />
                    </div>
                    
                    <div>
                      {/* Company Name */}
                      <h1 className="text-white text-2xl font-bold tracking-tight">
                        {formData.companyDetails?.name || 'UNIDOC'}
                      </h1>
                      
                      {/* Provider Details - Now shown in header */}
                      <div className="text-sky-100 text-xs mt-1 space-y-0.5">
                        <p className="flex items-center">
                          <Mail className="h-3 w-3 mr-1.5" /> {formData.companyDetails?.email || 'info@unidoc.com'}
                        </p>
                        <p className="flex items-center">
                          <Phone className="h-3 w-3 mr-1.5" /> {formData.companyDetails?.phone || '+1 (555) 123-4567'}
                        </p>
                        <p className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1.5" /> {formData.companyDetails?.address || '123 Business Ave, City'}
                        </p>
                        {formData.companyDetails?.id && (
                          <p className="flex items-center">
                            <Hash className="h-3 w-3 mr-1.5 text-sky-200" /> 
                            ID: {formData.companyDetails.id}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                    <div className="flex items-center">
                      <FileBarChart className="h-5 w-5 text-sky-200 mr-2" />
                      <span className="text-white font-bold text-xl tracking-tight">PRICE AGREEMENT</span>
                    </div>
                    
                    {/* Document ID */}
                    <p className="text-sky-100 text-sm mt-1 flex items-center">
                      <Hash className="h-3 w-3 mr-1.5 text-sky-200" /> 
                      {formData.agreementId || 'AGR-0001'}
                    </p>
                    
                    {/* Generated timestamp */}
                    <p className="text-white/70 text-xs mt-1 flex items-center">
                      <Calendar className="h-3 w-3 mr-1.5 text-sky-200" />
                      Date: {format(new Date(), 'MMMM d, yyyy')}
                    </p>
                    
                    {/* Valid until */}
                    {formData.validUntil && (
                      <p className="text-white/70 text-xs mt-1 flex items-center">
                        <Calendar className="h-3 w-3 mr-1.5 text-sky-200" />
                        Valid until: {format(new Date(formData.validUntil), 'MMMM d, yyyy')}
                      </p>
                    )}
                    
                    {/* Status indicator */}
                    <div className="bg-white/10 px-3 py-1 rounded-full text-xs text-white/90 mt-2 backdrop-blur-sm">
                      {formData.status === 'draft' ? 'Draft' : 
                      formData.status === 'sent' ? 'Sent' : 
                      formData.status === 'approved' ? 'Approved' : 
                      formData.status === 'expired' ? 'Expired' : 
                      'Draft'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Title & Description */}
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{formData.title || 'Concrete Pumping Services Agreement'}</h2>
                {formData.description && (
                  <p className="text-gray-600 italic">{formData.description}</p>
                )}
              </div>
              
              {/* Customer Information - Now with 2-column layout */}
              <div className="mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <h3 className="text-base font-semibold mb-3 pb-2 border-b border-gray-100 text-gray-700 flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-sky-500" />
                    Customer Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 customer-info-grid">
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Company Name</p>
                        <p className="font-medium">{formData.customerName || 'Customer Name'}</p>
                      </div>
                      
                      {formData.customerDetails?.address && (
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Address</p>
                          <p className="text-sm text-gray-600 flex items-start">
                            <MapPin className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-gray-400 flex-shrink-0" />
                            <span>{formData.customerDetails.address}</span>
                          </p>
                        </div>
                      )}
                      
                      {formData.customerDetails?.phone && (
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Phone</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Phone className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                            <span>{formData.customerDetails.phone}</span>
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {formData.customerDetails?.email && (
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Email</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Mail className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                            <span>{formData.customerDetails.email}</span>
                          </p>
                        </div>
                      )}
                      
                      {formData.customerDetails?.contactPerson && (
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Contact Person</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <User className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                            <span>{formData.customerDetails.contactPerson}</span>
                          </p>
                        </div>
                      )}
                      
                      {formData.customerDetails?.taxId && (
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Tax ID</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Hash className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                            <span>{formData.customerDetails.taxId}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pricing Table Section */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3 pb-2 border-b border-gray-100 text-gray-700 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-sky-500" />
                  Pricing & Services
                </h3>
                
                <div className="overflow-x-auto">
                  {formData.pumpTypes && formData.pumpTypes.length > 0 && formData.pricingTiers && formData.pricingTiers.length > 0 && (
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-2 px-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border border-gray-200">
                            Pump Type
                          </th>
                          {formData.pricingTiers.map((tier, index) => (
                            <th 
                              key={tier.id || index} 
                              className="py-2 px-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border border-gray-200"
                            >
                              {tier.name || `Tier ${index + 1}`}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.pumpTypes.map((pumpType, typeIndex) => (
                          <tr key={typeIndex} className={typeIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="py-2 px-3 text-sm text-gray-700 border border-gray-200 font-medium">
                              {pumpType}
                            </td>
                            {formData.pricingTiers.map((tier, tierIndex) => (
                              <td 
                                key={`${typeIndex}-${tierIndex}`} 
                                className="py-2 px-3 text-sm text-right text-gray-700 border border-gray-200"
                              >
                                {tier.prices && tier.prices[typeIndex] !== undefined
                                  ? formatCurrency(tier.prices[typeIndex])
                                  : '—'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  
                  {/* Additional Services Table */}
                  {formData.additionalServices && formData.additionalServices.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2 text-gray-700">Additional Services</h4>
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="py-2 px-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border border-gray-200">
                              Service
                            </th>
                            <th className="py-2 px-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border border-gray-200 w-1/4">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {formData.additionalServices.map((service, index) => (
                            <tr key={service.id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="py-2 px-3 text-sm text-gray-700 border border-gray-200">
                                {service.name}
                              </td>
                              <td className="py-2 px-3 text-sm text-right text-gray-700 border border-gray-200">
                                {formatCurrency(service.price)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                
                <div className="mt-2 text-xs text-gray-500 italic">
                  * All prices are in ILS and do not include VAT unless specified otherwise.
                </div>
              </div>
              
              {/* Terms and Conditions Section */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3 pb-2 border-b border-gray-100 text-gray-700 flex items-center">
                  <AlignLeft className="w-4 h-4 mr-2 text-sky-500" />
                  Terms & Conditions
                </h3>
                
                <div className="space-y-4">
                  {formData.terms?.conditions && (
                    <div className="text-sm text-gray-700 whitespace-pre-line p-3 bg-gray-50 rounded-md border border-gray-100">
                      {formData.terms.conditions}
                    </div>
                  )}
                  
                  {formData.terms?.paymentConditions && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700">Payment Terms</h4>
                      <div className="text-sm text-gray-700 whitespace-pre-line p-3 bg-gray-50 rounded-md border border-gray-100">
                        {formData.terms.paymentConditions}
                      </div>
                    </div>
                  )}
                  
                  {formData.terms?.note && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700">Additional Notes</h4>
                      <div className="text-sm text-gray-700 whitespace-pre-line p-3 bg-gray-50 rounded-md border border-gray-100">
                        {formData.terms.note}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Improved Authorization Section */}
              <div className="mb-6 authorization-section">
                <h3 className="text-base font-semibold mb-3 pb-2 border-b border-gray-100 text-gray-700 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-sky-500" />
                  Authorization
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                  {/* Customer Signature */}
                  <div className="border rounded-lg p-4 bg-gradient-to-b from-gray-50 to-white shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <Signature className="w-4 h-4 mr-2 text-blue-500" />
                      Customer Signature
                    </h4>
                    <div className="relative">
                      {formData.customerSignature ? (
                        <div className="h-24 flex items-center justify-center border rounded-md bg-white p-2 shadow-inner">
                          <img 
                            src={formData.customerSignature} 
                            alt="Customer Signature" 
                            className="max-h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="h-24 border border-dashed border-blue-300 rounded-md flex items-center justify-center bg-white shadow-inner relative group">
                          <span className="text-sm text-gray-400 absolute">Customer signature required</span>
                          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Pen className="h-5 w-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex justify-between bg-white p-3 rounded-md border border-gray-100 text-xs text-gray-600">
                      <div>
                        <p className="font-medium text-gray-700">Authorized Signatory:</p>
                        <p>{formData.customerName || "________________"}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Date:</p>
                        <p>{format(new Date(), 'dd/MM/yyyy')}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Provider Signature */}
                  <div className="border rounded-lg p-4 bg-gradient-to-b from-gray-50 to-white shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <Signature className="w-4 h-4 mr-2 text-blue-500" />
                      Provider Signature
                    </h4>
                    <div className="relative">
                      {formData.providerSignature ? (
                        <div className="h-24 flex items-center justify-center border rounded-md bg-white p-2 shadow-inner">
                          <img 
                            src={formData.providerSignature} 
                            alt="Provider Signature" 
                            className="max-h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="h-24 border border-dashed border-blue-300 rounded-md flex items-center justify-center bg-white shadow-inner relative group">
                          <span className="text-sm text-gray-400 absolute">Provider signature required</span>
                          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Pen className="h-5 w-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      )}
                      
                      {formData.companyStamp && (
                        <div className="absolute bottom-2 right-2 w-20 h-20 flex items-center justify-center">
                          <img 
                            src={formData.companyStamp} 
                            alt="Company Stamp" 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex justify-between bg-white p-3 rounded-md border border-gray-100 text-xs text-gray-600">
                      <div>
                        <p className="font-medium text-gray-700">Authorized Signatory:</p>
                        <p>{formData.companyDetails?.name || "UNIDOC"}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Date:</p>
                        <p>{format(new Date(), 'dd/MM/yyyy')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer with Security Elements */}
              <div className="mt-8 pt-4 border-t border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center mb-2 md:mb-0">
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    <p>Document ID: {formData.agreementId || 'AGR-0001'}</p>
                  </div>
                  
                  <div className="flex items-center mb-2 md:mb-0">
                    <p className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 text-[10px] tracking-wider uppercase flex items-center">
                      <Shield className="h-3 w-3 mr-1 text-sky-500" />
                      Secure Document
                    </p>
                  </div>
                  
                  <div>
                    <p>Generated on {format(new Date(), 'MMMM d, yyyy')}</p>
                  </div>
                </div>
                
                {/* Unidoc Branding */}
                <div className="text-center mt-6 text-xs text-gray-400 unidoc-watermark">
                  <p className="flex items-center justify-center">
                    <Shield className="h-3 w-3 mr-1 text-sky-400" />
                    Created with <span className="font-semibold text-sky-500 mx-1">UNIDOC</span> - Digital Document Solutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AgreementPreview;
