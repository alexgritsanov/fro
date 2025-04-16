
import React from 'react';
import { format } from 'date-fns';
import { 
  FileText, Calendar, Clock, Building2, MapPin, User, 
  Truck, FileBarChart, Phone, Mail, ArrowRight, 
  CheckCircle, Shield, Layers, BadgeCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import DocumentID from './DocumentID';

export interface ServiceCallPreviewProps {
  serviceCallData: any;
  className?: string;
  isPrintMode?: boolean;
}

const ServiceCallPreview: React.FC<ServiceCallPreviewProps> = ({ 
  serviceCallData, 
  className,
  isPrintMode = false
}) => {
  const date = serviceCallData?.date ? new Date(serviceCallData.date) : new Date();
  
  return (
    <div className={cn(
      "bg-gradient-to-br from-slate-50 to-white p-6 h-full overflow-auto",
      isPrintMode ? "p-0 bg-white" : "",
      className
    )}>
      <div className={cn(
        "max-w-[210mm] mx-auto relative",
        isPrintMode ? "max-w-none w-full" : ""
      )}>
        {/* Background decorative elements */}
        {!isPrintMode && (
          <>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full opacity-20 blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full opacity-20 blur-3xl -z-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full opacity-10 blur-3xl -z-10"></div>
            
            {/* Abstract lines (data flow elements) */}
            <div className="absolute left-0 top-1/3 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-30 -z-10"></div>
            <div className="absolute left-0 top-2/3 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-100 to-transparent opacity-30 -z-10"></div>
          </>
        )}
        
        {/* Company Header with Logo and Information */}
        <div className="relative rounded-2xl overflow-hidden mb-6 shadow-sm border border-gray-100/50">
          {/* Gradient Background with Texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800"></div>
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }}></div>
          
          {/* Abstract Neural Network Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="network" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="white" />
                  <circle cx="30" cy="10" r="1" fill="white" />
                  <circle cx="10" cy="30" r="1" fill="white" />
                  <circle cx="30" cy="30" r="1" fill="white" />
                  <line x1="10" y1="10" x2="30" y2="10" stroke="white" strokeWidth="0.5" />
                  <line x1="10" y1="10" x2="10" y2="30" stroke="white" strokeWidth="0.5" />
                  <line x1="30" y1="10" x2="30" y2="30" stroke="white" strokeWidth="0.5" />
                  <line x1="10" y1="30" x2="30" y2="30" stroke="white" strokeWidth="0.5" />
                  <line x1="10" y1="10" x2="30" y2="30" stroke="white" strokeWidth="0.5" />
                  <line x1="30" y1="10" x2="10" y2="30" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#network)" />
            </svg>
          </div>
          
          {/* Design Layers */}
          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-10 -mb-10"></div>
          
          <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center">
              {/* Company Logo */}
              <div className="bg-white rounded-lg p-3 shadow-md mr-4 mb-3 md:mb-0 w-16 h-16 flex items-center justify-center">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              
              <div>
                {/* Company Name */}
                <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
                  UNIDOC CONCRETE
                </h1>
                
                {/* Company Details */}
                <div className="text-blue-100 text-xs mt-1 space-y-0.5">
                  <p className="flex items-center">
                    <Mail className="h-3 w-3 mr-1.5" /> info@unidoc-concrete.com
                  </p>
                  <p className="flex items-center">
                    <Phone className="h-3 w-3 mr-1.5" /> +1 (555) 123-4567
                  </p>
                  <p className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1.5" /> 123 Industry Ave, Construction City, CC 12345
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
              <div className="flex items-center">
                <BadgeCheck className="h-5 w-5 text-blue-200 mr-2" />
                <span className="text-white font-bold text-xl tracking-tight">SERVICE CALL</span>
              </div>
              
              {/* Document ID */}
              <div className="mt-1 text-blue-100 text-sm font-medium">
                <DocumentID 
                  type="service-call"
                  date={date}
                  id={serviceCallData?.id || '1001'}
                  size="sm"
                />
              </div>
              
              {/* Generated timestamp */}
              <p className="text-white/70 text-xs mt-1 flex items-center">
                <Calendar className="h-3 w-3 mr-1.5 text-blue-200" />
                Generated: {format(new Date(), 'MMMM d, yyyy • HH:mm')}
              </p>
              
              {/* Status indicator */}
              <div className="bg-white/10 px-3 py-1 rounded-full text-xs text-white/90 mt-2 backdrop-blur-sm">
                {serviceCallData?.status === 'completed' ? 'Completed' : 
                serviceCallData?.status === 'in-progress' ? 'In Progress' : 
                serviceCallData?.status || 'Scheduled'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Customer Information Card */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-5">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 px-4 py-3 border-b border-blue-100/50">
            <h2 className="font-medium text-blue-800 flex items-center text-sm">
              <Building2 className="w-4 h-4 mr-2 text-blue-600" />
              Customer Information
            </h2>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap md:flex-nowrap items-start gap-4 md:gap-6">
              <div className="w-full md:w-1/2 flex items-center">
                <div className="bg-blue-50 rounded-lg p-2 mr-3">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Customer</div>
                  <div className="font-medium text-gray-800 text-base">
                    {serviceCallData?.customerName || serviceCallData?.customer || 'Not specified'}
                  </div>
                  
                  <div className="text-sm text-gray-500 mt-1">Company ID: ABC12345</div>
                  <div className="flex items-center mt-1 text-xs text-gray-600">
                    <Phone className="w-3 h-3 text-blue-500 mr-1.5" />
                    (555) 987-6543
                  </div>
                  <div className="flex items-center mt-0.5 text-xs text-gray-600">
                    <Mail className="w-3 h-3 text-blue-500 mr-1.5" />
                    contact@customer-company.com
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Project Site</div>
                    <div className="text-gray-800 font-medium">
                      {serviceCallData?.projectSite || 'No project site specified'}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      123 Construction Road, Building B, Floor 3
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start mt-3">
                  <Calendar className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Service Date & Time</div>
                    <div className="text-gray-800 font-medium">
                      {serviceCallData?.date ? format(new Date(serviceCallData.date), 'EEEE, MMMM d, yyyy') : 'Not specified'}
                      {serviceCallData?.startTime ? ` • ${serviceCallData.startTime}` : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Service & Operator Details Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/* Service Details */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 md:col-span-2">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 px-4 py-3 border-b border-purple-100/50">
              <h2 className="font-medium text-purple-800 flex items-center text-sm">
                <FileBarChart className="w-4 h-4 mr-2 text-purple-600" />
                Service Details
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <div className="text-sm text-gray-500">Service Type</div>
                  <div className="font-medium text-gray-800 capitalize">
                    {serviceCallData?.serviceType?.replace('-', ' ') || 'Not specified'}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-medium text-gray-800">
                    {serviceCallData?.hourlyBooking || '0'} Hours
                  </div>
                </div>
                
                {serviceCallData?.serviceType === 'concrete-pumping' && (
                  <>
                    <div>
                      <div className="text-sm text-gray-500">Pump Type</div>
                      <div className="font-medium text-gray-800">
                        {serviceCallData?.pumpType || 'Not specified'}
                      </div>
                    </div>
                    
                    {serviceCallData?.quantity && (
                      <div>
                        <div className="text-sm text-gray-500">Quantity</div>
                        <div className="font-medium text-gray-800">
                          {serviceCallData?.quantity} m³
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {serviceCallData?.notes && (
                  <div className="col-span-2 mt-2">
                    <div className="text-sm text-gray-500">Notes</div>
                    <div className="text-gray-700 text-sm whitespace-pre-wrap bg-gray-50 p-3 rounded-lg border border-gray-100 mt-1">
                      {serviceCallData.notes}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Assigned Operator Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-gradient-to-r from-green-50 to-green-100/50 px-4 py-3 border-b border-green-100/50">
              <h2 className="font-medium text-green-800 flex items-center text-sm">
                <User className="w-4 h-4 mr-2 text-green-600" />
                Assigned Operator
              </h2>
            </div>
            <div className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center border border-blue-200/50">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-500">Operator</div>
                  <div className="font-medium text-gray-800">
                    {serviceCallData?.operatorName || serviceCallData?.operator || 'Not assigned'}
                  </div>
                  
                  {serviceCallData?.vehicleNumber && (
                    <div className="mt-1 text-xs text-gray-500 flex items-center">
                      <Truck className="w-3.5 h-3.5 mr-1 text-gray-400" />
                      Vehicle: {serviceCallData.vehicleNumber}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Authorization Section with Digital Verification Elements */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-5">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-100/50">
            <h2 className="font-medium text-gray-700 flex items-center text-sm">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Authorization & Verification
            </h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-700 font-medium flex items-center">
                  <Layers className="h-3.5 w-3.5 mr-1.5 text-blue-500" /> 
                  Customer Signature
                </p>
                <div className="h-16 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                  <div className="flex flex-col items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 mb-1">
                      <path d="M15 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7M15 3L19 7M15 3V7H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 17H15M9 14H15M9 11H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-400 text-xs">Signature required</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <p>Name: ______________________</p>
                  <p>Date: {format(new Date(), 'MM/dd/yyyy')}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-700 font-medium flex items-center">
                  <Layers className="h-3.5 w-3.5 mr-1.5 text-blue-500" /> 
                  Company Authorization
                </p>
                <div className="h-16 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                  <div className="flex flex-col items-center">
                    <Shield className="h-6 w-6 text-blue-200 mb-1" />
                    <p className="text-gray-400 text-xs">Official stamp</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <p>Auth: ______________________</p>
                  <p>ID: {serviceCallData?.id || '1001'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer with Security Elements */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs text-gray-400 mt-2 border-t border-gray-100 pt-3">
          <div className="flex items-center mb-2 md:mb-0">
            <FileText className="h-3.5 w-3.5 mr-1.5" />
            <p>Unidoc Service Management System</p>
          </div>
          
          <div className="flex justify-center mb-2 md:mb-0">
            <p className="px-2 py-0.5 bg-gray-100 rounded text-gray-500 text-[10px] tracking-wider uppercase flex items-center">
              <Shield className="h-3 w-3 mr-1 text-blue-400" />
              Secure Digital Document
            </p>
          </div>
          
          <div className="flex items-center justify-end gap-3">
            <span className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              +1 (555) 123-4567
            </span>
            <span className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              info@unidoc.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCallPreview;
