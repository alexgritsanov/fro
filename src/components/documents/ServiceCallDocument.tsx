
import React from 'react';
import { format } from 'date-fns';
import { 
  FileText, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Truck, 
  Hash,
  Link,
  Building2,
  Mail,
  Phone,
  CheckCircle2,
  ClipboardCheck,
  Info,
  FileSpreadsheet,
  XSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { cn } from '@/lib/utils';
import { ScheduleCall } from '@/pages/Schedule';

// Extended type to include optional properties that might be used
interface ExtendedScheduleCall extends ScheduleCall {
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  endTime?: string;
  companyName?: string;
  companyLogo?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  signature?: string;
  companyStamp?: string;
}

interface ServiceCallDocumentProps {
  serviceCall: ScheduleCall | ExtendedScheduleCall;
  documentNumber: string;
  onClose?: () => void;
  onGenerateCertificate?: () => void;
  linkedCertificateId?: string | null;
  isPreview?: boolean;
}

const ServiceCallDocument: React.FC<ServiceCallDocumentProps> = ({
  serviceCall,
  documentNumber,
  onClose,
  onGenerateCertificate,
  linkedCertificateId,
  isPreview = false
}) => {
  // Cast serviceCall to ExtendedScheduleCall to safely access optional properties
  const extendedServiceCall = serviceCall as ExtendedScheduleCall;
  
  // Default company information if not provided
  const companyName = extendedServiceCall.companyName || 'UNIDOC Solutions';
  const companyLogo = extendedServiceCall.companyLogo || '/placeholder.svg';
  const companyAddress = extendedServiceCall.companyAddress || '123 Business Avenue, Suite 100, Enterprise City';
  const companyPhone = extendedServiceCall.companyPhone || '+1 (555) 123-4567';
  const companyEmail = extendedServiceCall.companyEmail || 'service@unidoc.com';

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'N/A';
    return timeString;
  };

  const getStatusType = (status: string): 'success' | 'warning' | 'error' | 'neutral' | 'info' => {
    switch (status) {
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'scheduled': return 'Scheduled';
      case 'in-progress': return 'In Progress';
      case 'incomplete': return 'Incomplete';
      case 'awaiting-signature': return 'Awaiting Signature';
      case 'completed': return 'Completed';
      case 'physical-signature': return 'Physical Signed';
      case 'without-signature': return 'Unsigned';
      case 'canceled': return 'Canceled';
      default: return status;
    }
  };

  return (
    <div className={cn(
      "relative bg-white print:bg-white print:m-0 print:p-0 print:shadow-none print:max-w-none",
      "rounded-lg overflow-hidden pb-3 w-full",
      isPreview ? "border border-gray-200 text-sm" : "shadow-lg"
    )}>
      {/* Professional watermark for document feel */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] print:opacity-[0.04] z-0">
        <div className="text-gray-900 font-bold text-9xl transform -rotate-30">UNIDOC</div>
      </div>

      {/* Company header with logo */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 py-4 px-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white rounded-lg shadow-sm p-2 flex items-center justify-center">
              <img src={companyLogo} alt="Company Logo" className="max-w-full max-h-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{companyName}</h1>
              <p className="text-xs text-gray-600">{companyAddress}</p>
              <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-600">
                <span className="flex items-center">
                  <Phone className="h-3 w-3 mr-1" />
                  {companyPhone}
                </span>
                <span className="flex items-center">
                  <Mail className="h-3 w-3 mr-1" />
                  {companyEmail}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-1">
              <FileText className="h-5 w-5 text-blue-600" />
              SERVICE CALL
            </h2>
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-600 mr-1">Document #:</span>
              <span className="text-xs font-semibold text-gray-900">{documentNumber}</span>
            </div>
            <StatusBadge 
              status={getStatusType(serviceCall.status)} 
              label={getStatusLabel(serviceCall.status)} 
              size="sm"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Main content with grid layout */}
      <div className="px-6 py-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Customer Information Section */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-start mb-2">
              <div className="p-1.5 bg-blue-50 rounded-lg border border-blue-100">
                <Building2 className="h-4 w-4 text-blue-700" />
              </div>
              <div className="ml-2">
                <h3 className="text-base font-semibold text-gray-900">Customer Information</h3>
                <p className="text-xs text-gray-500">Complete customer details</p>
              </div>
            </div>
            
            <div className="mt-2 space-y-2">
              <div>
                <div className="text-xs text-gray-500 uppercase font-medium">Company Name</div>
                <div className="text-sm font-semibold text-gray-900">{serviceCall.customer || 'Not Specified'}</div>
              </div>
              
              {extendedServiceCall.contactName && (
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Contact Person</div>
                  <div className="text-xs text-gray-900 flex items-center">
                    <User className="h-3 w-3 text-gray-500 mr-1" />
                    {extendedServiceCall.contactName}
                  </div>
                </div>
              )}
              
              {extendedServiceCall.contactPhone && (
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Contact Phone</div>
                  <div className="text-xs text-gray-900 flex items-center">
                    <Phone className="h-3 w-3 text-gray-500 mr-1" />
                    {extendedServiceCall.contactPhone}
                  </div>
                </div>
              )}
              
              {extendedServiceCall.contactEmail && (
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Email Address</div>
                  <div className="text-xs text-gray-900 flex items-center">
                    <Mail className="h-3 w-3 text-gray-500 mr-1" />
                    {extendedServiceCall.contactEmail}
                  </div>
                </div>
              )}
              
              <div>
                <div className="text-xs text-gray-500 uppercase font-medium">Project Site</div>
                <div className="text-xs text-gray-900 flex items-start">
                  <MapPin className="h-3 w-3 text-gray-500 mr-1 mt-0.5" />
                  <span>{serviceCall.projectSite || serviceCall.address || 'No location specified'}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Service Details Section */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-start mb-2">
              <div className="p-1.5 bg-blue-50 rounded-lg border border-blue-100">
                <Truck className="h-4 w-4 text-blue-700" />
              </div>
              <div className="ml-2">
                <h3 className="text-base font-semibold text-gray-900">Service Details</h3>
                <p className="text-xs text-gray-500">Service type and scheduling information</p>
              </div>
            </div>
            
            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2">
              <div>
                <div className="text-xs text-gray-500 uppercase font-medium">Service Type</div>
                <div className="text-sm font-semibold text-gray-900 capitalize">
                  {serviceCall.serviceType?.replace(/-/g, ' ') || 'N/A'}
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 uppercase font-medium">Operator</div>
                <div className="text-sm font-semibold text-gray-900">
                  {serviceCall.operator || 'Unassigned'}
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 uppercase font-medium">Date</div>
                <div className="text-xs text-gray-900 flex items-center">
                  <Calendar className="h-3 w-3 text-gray-500 mr-1" />
                  {formatDate(serviceCall.date)}
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 uppercase font-medium">Duration</div>
                <div className="text-xs text-gray-900 flex items-center">
                  <Clock className="h-3 w-3 text-gray-500 mr-1" />
                  {serviceCall.hourlyBooking || '0'} hours
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 uppercase font-medium">Start Time</div>
                <div className="text-xs text-gray-900">{formatTime(serviceCall.startTime)}</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 uppercase font-medium">End Time</div>
                <div className="text-xs text-gray-900">{formatTime(extendedServiceCall.endTime)}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Equipment and Additional Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {(serviceCall.vehicleNumber || serviceCall.pumpType) && (
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-start mb-2">
                <div className="p-1.5 bg-blue-50 rounded-lg border border-blue-100">
                  <Truck className="h-4 w-4 text-blue-700" />
                </div>
                <div className="ml-2">
                  <h3 className="text-base font-semibold text-gray-900">Equipment Information</h3>
                  <p className="text-xs text-gray-500">Details about the equipment used</p>
                </div>
              </div>
              
              <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2">
                {serviceCall.vehicleNumber && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-medium">Vehicle Number</div>
                    <div className="text-sm font-semibold text-gray-900">{serviceCall.vehicleNumber}</div>
                  </div>
                )}
                
                {serviceCall.pumpType && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-medium">Pump Type</div>
                    <div className="text-sm font-semibold text-gray-900">{serviceCall.pumpType}</div>
                  </div>
                )}
                
                {serviceCall.quantity && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-medium">Quantity</div>
                    <div className="text-sm font-semibold text-gray-900">{serviceCall.quantity}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Linked Documents Section */}
          {linkedCertificateId && (
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-start mb-2">
                <div className="p-1.5 bg-green-50 rounded-lg border border-green-100">
                  <Link className="h-4 w-4 text-green-700" />
                </div>
                <div className="ml-2">
                  <h3 className="text-base font-semibold text-gray-900">Linked Documents</h3>
                  <p className="text-xs text-gray-500">Related certificates and documentation</p>
                </div>
              </div>
              
              <div className="mt-2 bg-green-50 rounded-lg border border-green-100 p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm border border-green-200 text-green-700">
                    <FileSpreadsheet className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-green-800">Delivery Certificate</p>
                    <p className="text-xs text-green-700">Document ID: {linkedCertificateId}</p>
                  </div>
                  <Button variant="outline" size="sm" className="bg-white text-green-700 border-green-200 hover:bg-green-50 text-xs h-7 px-2">
                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Notes Section */}
      {serviceCall.notes && (
        <div className="px-6 mb-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-start mb-2">
              <div className="p-1.5 bg-blue-50 rounded-lg border border-blue-100">
                <Info className="h-4 w-4 text-blue-700" />
              </div>
              <div className="ml-2">
                <h3 className="text-base font-semibold text-gray-900">Notes & Instructions</h3>
                <p className="text-xs text-gray-500">Additional information and special requirements</p>
              </div>
            </div>
            
            <div className="mt-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-700 whitespace-pre-line">{serviceCall.notes}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Signature Section - REDUCED SIZE */}
      <div className="px-6 mb-3">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-start mb-2">
            <div className="p-1.5 bg-blue-50 rounded-lg border border-blue-100">
              <CheckCircle2 className="h-4 w-4 text-blue-700" />
            </div>
            <div className="ml-2">
              <h3 className="text-base font-semibold text-gray-900">Authorization</h3>
              <p className="text-xs text-gray-500">Signatures and authorization information</p>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 uppercase font-medium mb-1">Customer Signature</div>
              <div className="h-16 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                {extendedServiceCall.signature ? (
                  <img 
                    src={extendedServiceCall.signature}
                    alt="Customer Signature" 
                    className="max-h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-gray-400 italic">No signature provided</span>
                )}
              </div>
              <div className="flex gap-3 mt-1">
                <div className="text-xs text-gray-500 flex-1">
                  Name: <span className="border-b border-gray-300 pb-0.5 inline-block w-full"></span>
                </div>
                <div className="text-xs text-gray-500 flex-1">
                  Date: <span className="border-b border-gray-300 pb-0.5 inline-block w-full"></span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex-1 flex items-center">
                <div className="w-20 h-20 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden ml-auto">
                  {extendedServiceCall.companyStamp ? (
                    <img 
                      src={extendedServiceCall.companyStamp} 
                      alt="Company Stamp" 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <FileText className="h-6 w-6 text-gray-300 mx-auto" />
                      <span className="block text-xs text-gray-400">Stamp</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right mt-1">
                <div className="text-xs text-gray-500">Authorized By:</div>
                <div className="text-xs font-medium text-gray-900">
                  {serviceCall.operator || 'Company Representative'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      {!isPreview && (
        <div className="flex justify-end space-x-3 px-6 mt-4 print:hidden">
          {onClose && (
            <Button variant="outline" onClick={onClose} size="sm" className="flex items-center h-8">
              <XSquare className="h-3.5 w-3.5 mr-1.5" />
              Close
            </Button>
          )}
          {onGenerateCertificate && !linkedCertificateId && serviceCall.status !== 'canceled' && (
            <Button onClick={onGenerateCertificate} size="sm" className="bg-blue-600 hover:bg-blue-700 flex items-center h-8">
              <FileSpreadsheet className="h-3.5 w-3.5 mr-1.5" />
              Generate Certificate
            </Button>
          )}
        </div>
      )}
      
      {/* Document footer */}
      <div className="mt-auto pt-2 px-6 border-t border-gray-200">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div>Generated on {format(new Date(), 'MMMM d, yyyy')}</div>
          <div>{companyName} • Official Service Document</div>
          <div>Page 1 of 1</div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCallDocument;
