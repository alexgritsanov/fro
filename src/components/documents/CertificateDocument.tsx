
import React from 'react';
import { format } from 'date-fns';
import { 
  FileSpreadsheet, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle,
  CircleX,
  Link,
  FileText,
  PenLine,
  Award,
  Building2,
  Stamp,
  Package,
  ShieldCheck,
  Download,
  Phone,
  Mail,
  CheckCircle2,
  Info,
  Truck,
  XSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { cn } from '@/lib/utils';

interface CertificateDocumentProps {
  certificate: any;
  documentNumber: string;
  onClose?: () => void;
  linkedServiceCallId?: string | null;
  linkedServiceCallNumber?: string | null;
  isPreview?: boolean;
  onViewSignature?: () => void;
  onRequestSignature?: () => void;
  onDownload?: () => void;
}

const CertificateDocument: React.FC<CertificateDocumentProps> = ({
  certificate,
  documentNumber,
  onClose,
  linkedServiceCallId,
  linkedServiceCallNumber,
  isPreview = false,
  onViewSignature,
  onRequestSignature,
  onDownload
}) => {
  // Default company information if not provided
  const companyName = certificate.company_name || 'UNIDOC Solutions';
  const companyLogo = certificate.company_logo || '/placeholder.svg';
  const companyAddress = certificate.company_address || '123 Business Avenue, Suite 100, Enterprise City';
  const companyPhone = certificate.company_phone || '+1 (555) 123-4567';
  const companyEmail = certificate.company_email || 'service@unidoc.com';

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const getStatusType = (status: string): 'success' | 'warning' | 'error' | 'neutral' | 'info' => {
    switch (status) {
      case 'completed':
      case 'signed':
      case 'physical-signature':
        return 'success';
      case 'awaiting-signature':
      case 'without-signature':
      case 'draft':
        return 'warning';
      case 'rejected':
      case 'canceled':
        return 'error';
      default:
        return 'neutral';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'awaiting-signature': return 'Awaiting Signature';
      case 'signed': return 'Signed';
      case 'physical-signature': return 'Physical Signed';
      case 'without-signature': return 'Unsigned';
      case 'rejected': return 'Rejected';
      case 'canceled': return 'Canceled';
      default: return status;
    }
  };

  const hasSignature = certificate.status === 'signed' || 
                       certificate.status === 'physical-signature' || 
                       certificate.signature_data;

  return (
    <div className={cn(
      "relative bg-white print:bg-white print:m-0 print:p-0 print:shadow-none print:max-w-none",
      "rounded-lg overflow-hidden pb-6 w-full",
      isPreview ? "border border-gray-200" : "shadow-lg"
    )}>
      {/* Official certificate watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] print:opacity-[0.04] z-0">
        <div className="text-gray-900 font-bold text-9xl transform -rotate-30">CERTIFICATE</div>
      </div>

      {/* Company header with logo */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 py-6 px-8">
        <div className="flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg shadow-sm p-2 flex items-center justify-center">
              <img src={companyLogo} alt="Company Logo" className="max-w-full max-h-full" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{companyName}</h1>
              <p className="text-sm text-gray-600">{companyAddress}</p>
              <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
                <span className="flex items-center">
                  <Phone className="h-3.5 w-3.5 mr-1" />
                  {companyPhone}
                </span>
                <span className="flex items-center">
                  <Mail className="h-3.5 w-3.5 mr-1" />
                  {companyEmail}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Award className="h-6 w-6 text-green-600" />
              DELIVERY CERTIFICATE
            </h2>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-600 mr-2">Certificate #:</span>
              <span className="text-sm font-semibold text-gray-900">{documentNumber}</span>
            </div>
            <StatusBadge 
              status={getStatusType(certificate.status)} 
              label={getStatusLabel(certificate.status)} 
              size="md"
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Professional certificate section with decorative elements */}
      <div className="relative px-8 py-6">
        {/* Subtle certificate background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: "12px 12px"
             }}>
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          {/* Customer Information */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-start mb-3">
              <div className="p-2 bg-green-50 rounded-lg border border-green-100">
                <Building2 className="h-5 w-5 text-green-700" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
                <p className="text-sm text-gray-500">Customer details and contact information</p>
              </div>
            </div>
            
            <div className="mt-3 space-y-3">
              <div>
                <div className="text-xs text-gray-500 uppercase font-medium">Customer</div>
                <div className="text-base font-semibold text-gray-900">{certificate.customer_name || 'N/A'}</div>
              </div>
              
              {certificate.contact_person && (
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Contact Person</div>
                  <div className="text-sm text-gray-900 flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-1.5" />
                    {certificate.contact_person}
                  </div>
                </div>
              )}
              
              {certificate.contact_phone && (
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Contact Phone</div>
                  <div className="text-sm text-gray-900 flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-1.5" />
                    {certificate.contact_phone}
                  </div>
                </div>
              )}
              
              {certificate.contact_email && (
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Email Address</div>
                  <div className="text-sm text-gray-900 flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-1.5" />
                    {certificate.contact_email}
                  </div>
                </div>
              )}
              
              {certificate.location && (
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Service Location</div>
                  <div className="text-sm text-gray-900 flex items-start">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1.5 mt-0.5" />
                    <span>{certificate.location}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Service Details */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-start mb-3">
              <div className="p-2 bg-green-50 rounded-lg border border-green-100">
                <Truck className="h-5 w-5 text-green-700" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900">Service Details</h3>
                <p className="text-sm text-gray-500">Information about the service provided</p>
              </div>
            </div>
            
            <div className="mt-3 space-y-3">
              <div>
                <div className="text-xs text-gray-500 uppercase font-medium">Service Description</div>
                <div className="text-base text-gray-900">{certificate.service_details || 'N/A'}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Date</div>
                  <div className="text-sm text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-1.5" />
                    {certificate.date ? formatDate(certificate.date) : 'N/A'}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Service Hours</div>
                  <div className="text-sm text-gray-900">
                    <Clock className="h-4 w-4 text-gray-500 inline mr-1.5" />
                    {certificate.service_hours || '0'} hours
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Operator</div>
                  <div className="text-sm text-gray-900">
                    <User className="h-4 w-4 text-gray-500 inline mr-1.5" />
                    {certificate.operator_name || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Materials and Quantities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 relative z-10">
          {/* Materials Section */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-start mb-3">
              <div className="p-2 bg-green-50 rounded-lg border border-green-100">
                <Package className="h-5 w-5 text-green-700" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900">Materials & Quantities</h3>
                <p className="text-sm text-gray-500">Details of materials used for the service</p>
              </div>
            </div>
            
            <div className="mt-3 space-y-3">
              {certificate.materials && (
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Materials</div>
                  <div className="text-sm text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {certificate.materials}
                  </div>
                </div>
              )}
              
              {certificate.quantity && (
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Quantity</div>
                  <div className="text-sm text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {certificate.quantity}
                  </div>
                </div>
              )}
              
              {!certificate.materials && !certificate.quantity && (
                <div className="text-sm text-gray-500 italic">No materials or quantities specified</div>
              )}
            </div>
          </div>

          {/* Linked Service Call */}
          {linkedServiceCallId ? (
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-start mb-3">
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <Link className="h-5 w-5 text-blue-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Related Service Call</h3>
                  <p className="text-sm text-gray-500">Service call that generated this certificate</p>
                </div>
              </div>
              
              <div className="mt-3 bg-blue-50 rounded-lg border border-blue-100 p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-blue-200 text-blue-700">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-800">Service Call</p>
                    <p className="text-xs text-blue-700">
                      {linkedServiceCallNumber ? `Document #: ${linkedServiceCallNumber}` : `ID: ${linkedServiceCallId}`}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="bg-white text-blue-700 border-blue-200 hover:bg-blue-50">
                    <FileText className="h-4 w-4 mr-2" />
                    View Service Call
                  </Button>
                </div>
              </div>
            </div>
          ) : certificate.notes ? (
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-start mb-3">
                <div className="p-2 bg-green-50 rounded-lg border border-green-100">
                  <Info className="h-5 w-5 text-green-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Notes & Additional Information</h3>
                  <p className="text-sm text-gray-500">Special instructions or comments</p>
                </div>
              </div>
              
              <div className="mt-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-gray-700 whitespace-pre-line">{certificate.notes}</p>
              </div>
            </div>
          ) : null}
        </div>
        
        {/* Notes Section - if present and not shown above */}
        {certificate.notes && linkedServiceCallId && (
          <div className="mt-6">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-start mb-3">
                <div className="p-2 bg-green-50 rounded-lg border border-green-100">
                  <Info className="h-5 w-5 text-green-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Notes & Additional Information</h3>
                  <p className="text-sm text-gray-500">Special instructions or comments</p>
                </div>
              </div>
              
              <div className="mt-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-gray-700 whitespace-pre-line">{certificate.notes}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Signature Section */}
      <div className="px-8 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-start mb-3">
            <div className="p-2 bg-green-50 rounded-lg border border-green-100">
              <PenLine className="h-5 w-5 text-green-700" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">Authorization</h3>
              <p className="text-sm text-gray-500">Service acceptance and authorization</p>
            </div>
          </div>
          
          <div className="mt-3">
            <div className={cn(
              "rounded-lg p-4 border",
              hasSignature ? "bg-green-50 border-green-100" : "bg-amber-50 border-amber-100"
            )}>
              <div className="flex flex-wrap items-center gap-4">
                <div className={cn(
                  "p-3 rounded-full",
                  hasSignature ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                )}>
                  {hasSignature ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <CircleX className="h-6 w-6" />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className={cn(
                    "font-medium",
                    hasSignature ? "text-green-800" : "text-amber-800"
                  )}>
                    {hasSignature ? 'Certificate Signed' : 'Signature Required'}
                  </p>
                  <p className={cn(
                    "text-sm",
                    hasSignature ? "text-green-700" : "text-amber-700"
                  )}>
                    {hasSignature ? 
                      (certificate.signature_type === 'physical' ? 
                        'Physical signature received and verified' : 
                        'Digital signature captured successfully') : 
                      'This certificate requires customer signature'
                    }
                  </p>
                </div>
                
                {hasSignature && onViewSignature && !isPreview && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={cn(
                      "ml-auto print:hidden",
                      hasSignature ? "text-green-700 border-green-200 hover:bg-green-100" : 
                      "text-amber-700 border-amber-200 hover:bg-amber-100"
                    )}
                    onClick={onViewSignature}
                  >
                    <PenLine className="h-4 w-4 mr-2" />
                    View Signature
                  </Button>
                )}
                
                {!hasSignature && onRequestSignature && !isPreview && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-auto text-amber-700 border-amber-200 hover:bg-amber-100 print:hidden" 
                    onClick={onRequestSignature}
                  >
                    <PenLine className="h-4 w-4 mr-2" />
                    Request Signature
                  </Button>
                )}
              </div>
              
              {hasSignature && certificate.signature_data && (
                <div className="mt-4 bg-white rounded-lg p-3 border border-green-100 shadow-sm">
                  <p className="text-xs text-green-800 font-medium mb-2">Signature Preview:</p>
                  <div className="h-20 bg-gray-50 rounded border border-gray-100 flex items-center justify-center p-2">
                    <img 
                      src={certificate.signature_data} 
                      alt="Customer Signature" 
                      className="max-h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <div className="text-xs text-gray-500 uppercase font-medium mb-2">Customer Acknowledgment</div>
              <div className="h-20 bg-gray-50 rounded-lg border border-gray-200 p-3">
                <p className="text-sm text-gray-700">
                  I hereby acknowledge the completion of the described services to my satisfaction.
                </p>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Name: <span className="border-b border-gray-300 pb-0.5 inline-block w-48"></span>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Date: <span className="border-b border-gray-300 pb-0.5 inline-block w-48"></span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="w-32 h-32 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                {certificate.company_stamp ? (
                  <img 
                    src={certificate.company_stamp}
                    alt="Company Stamp" 
                    className="max-w-full max-h-full object-contain" 
                  />
                ) : (
                  <div className="text-center">
                    <Stamp className="h-10 w-10 text-gray-300 mx-auto" />
                    <span className="block text-xs text-gray-400 mt-2">Company Stamp</span>
                  </div>
                )}
              </div>
              
              <div className="text-right mt-2">
                <div className="text-xs text-gray-500">Certificate Verified By:</div>
                <div className="text-sm font-medium text-gray-900 mt-1">
                  {certificate.verified_by || certificate.operator_name || 'System Verification'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Certificate Verification */}
      <div className="px-8 mb-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-900">Verification Code:</p>
              <p className="text-xs text-gray-600">{certificate.verification_code || documentNumber.replace(/[^0-9a-zA-Z]/g, '')}</p>
            </div>
          </div>
          
          <div className="flex items-center bg-white px-3 py-1.5 rounded-md border border-gray-200">
            <Calendar className="h-4 w-4 text-gray-500 mr-1.5" />
            <span className="text-sm text-gray-900">Issue Date: {formatDate(certificate.date || new Date().toString())}</span>
          </div>
          
          <div className="flex items-center bg-white px-3 py-1.5 rounded-md border border-gray-200">
            <FileSpreadsheet className="h-4 w-4 text-gray-500 mr-1.5" />
            <span className="text-sm text-gray-900">Certificate #{documentNumber}</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      {!isPreview && (
        <div className="flex justify-end space-x-3 px-8 mt-8 print:hidden">
          {onClose && (
            <Button variant="outline" onClick={onClose} className="flex items-center">
              <XSquare className="h-4 w-4 mr-2" />
              Close
            </Button>
          )}
          
          {onDownload && (
            <Button 
              onClick={onDownload} 
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          )}
        </div>
      )}
      
      {/* Document footer */}
      <div className="mt-auto pt-4 px-8 border-t border-gray-200">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div>Generated on {format(new Date(), 'MMMM d, yyyy')}</div>
          <div>{companyName} • Official Certificate</div>
          <div>Page 1 of 1</div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDocument;
