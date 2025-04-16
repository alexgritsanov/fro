
import React from 'react';
import { format } from 'date-fns';
import { FileText, Calendar, Clock, Building2, User, Truck, FileBarChart, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import DocumentID from './DocumentID';

interface DeliveryCertificatePreviewProps {
  certificateData: any;
  className?: string;
}

const DeliveryCertificatePreview: React.FC<DeliveryCertificatePreviewProps> = ({ certificateData, className }) => {
  const date = certificateData?.date ? new Date(certificateData.date) : new Date();
  
  return (
    <div className={cn("bg-white border border-gray-200 rounded-md shadow-sm p-6 h-full overflow-auto", className)}>
      <div className="max-w-[210mm] mx-auto bg-white">
        <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Delivery Certificate</h1>
            <p className="text-gray-500 text-sm">
              <DocumentID 
                type="delivery-certificate"
                date={date}
                id={certificateData?.id || '1001'}
                size="sm"
              />
            </p>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-gray-800">Unidoc Services</div>
            <div className="text-gray-500 text-sm">123 Business Road</div>
            <div className="text-gray-500 text-sm">Cityville, ST 12345</div>
            <div className="text-gray-500 text-sm">info@unidoc.com</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <h2 className="font-semibold text-gray-800 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              Certificate Details
            </h2>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-gray-700">
                  {certificateData?.date ? format(new Date(certificateData.date), 'MMMM d, yyyy') : 'Not specified'}
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-gray-700">Status: {certificateData?.status || 'Draft'}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="font-semibold text-gray-800 flex items-center">
              <Building2 className="w-4 h-4 mr-2 text-blue-600" />
              Customer Information
            </h2>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="font-medium text-gray-800">{certificateData?.customer || 'Not specified'}</div>
              <div className="text-gray-600 text-sm">{certificateData?.projectSite || certificateData?.serviceLocation || 'No location specified'}</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <h2 className="font-semibold text-gray-800 flex items-center">
              <FileBarChart className="w-4 h-4 mr-2 text-blue-600" />
              Service Details
            </h2>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Service Type:</div>
                <div className="text-gray-800 font-medium">{certificateData?.serviceType || certificateData?.serviceDetails || 'Not specified'}</div>
                
                <div className="text-gray-600">Service Hours:</div>
                <div className="text-gray-800 font-medium">{certificateData?.serviceHours || '0'} Hours</div>
                
                <div className="text-gray-600">Materials:</div>
                <div className="text-gray-800 font-medium">{certificateData?.materials || 'Not specified'}</div>
                
                <div className="text-gray-600">Quantity:</div>
                <div className="text-gray-800 font-medium">{certificateData?.quantity || 'Not specified'}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="font-semibold text-gray-800 flex items-center">
              <User className="w-4 h-4 mr-2 text-blue-600" />
              Operator Information
            </h2>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="font-medium text-gray-800">{certificateData?.operator || 'Not assigned'}</div>
              {certificateData?.vehicleNumber && (
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Truck className="w-3 h-3 mr-1 text-blue-600" />
                  Vehicle: {certificateData.vehicleNumber}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <h2 className="font-semibold text-gray-800 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-blue-600" />
            Additional Notes
          </h2>
          <div className="bg-gray-50 p-3 rounded-md min-h-[100px] text-gray-700">
            {certificateData?.notes || certificateData?.additionalNotes || 'No notes provided.'}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mt-10 pt-6 border-t border-gray-200">
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Customer Signature:</p>
            {certificateData?.customerSignature ? (
              <div className="h-20 border border-gray-200 rounded flex items-center justify-center bg-gray-50">
                <img src={certificateData.customerSignature} alt="Customer Signature" className="max-h-full" />
              </div>
            ) : (
              <div className="h-10 border-b border-gray-300"></div>
            )}
            <p className="text-sm text-gray-500">Date: {format(new Date(), 'MM/dd/yyyy')}</p>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Operator Signature:</p>
            {certificateData?.operatorSignature ? (
              <div className="h-20 border border-gray-200 rounded flex items-center justify-center bg-gray-50">
                <img src={certificateData.operatorSignature} alt="Operator Signature" className="max-h-full" />
              </div>
            ) : (
              <div className="h-10 border-b border-gray-300"></div>
            )}
            <p className="text-sm text-gray-500">Date: {format(new Date(), 'MM/dd/yyyy')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCertificatePreview;
