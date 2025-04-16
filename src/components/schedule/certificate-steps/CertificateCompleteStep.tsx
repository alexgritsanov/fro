
import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle, FileText, Calendar, Clock, Building2, MapPin, User, Package, Truck, CreditCard } from 'lucide-react';
import { containerVariants } from '../serviceInfoUtils';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { getCustomerName } from './utils/certificateHelpers';

interface CertificateCompleteStepProps {
  date: Date;
  serviceType: string;
  customer: string;
  projectSite: string;
  operator: string;
  pumpType: string;
  quantity: string;
  hourlyBooking: string | number;
  concreteType: string;
  notes: string;
  additionalNotes: string;
  startTime: string;
  endTime: string;
  moveToNextStep: () => void;
  moveToPrevStep: () => void;
  setCurrentStep: (step: string) => void;
  customers: any[];
}

const CertificateCompleteStep: React.FC<CertificateCompleteStepProps> = ({
  date,
  serviceType,
  customer,
  projectSite,
  operator,
  quantity,
  hourlyBooking,
  concreteType,
  notes,
  additionalNotes,
  startTime,
  endTime,
  moveToNextStep,
  moveToPrevStep,
  setCurrentStep,
  customers
}) => {
  // Company details (would typically come from a context or state)
  const companyInfo = {
    name: "Unidoc Solutions Ltd.",
    id: "12345678",
    email: "info@unidocsolutions.com",
    phone: "+1 (234) 567-8901",
    address: "123 Business Park, Suite 101, New York, NY 10001"
  };

  // Certificate details
  const certificateId = `CERT-${Date.now().toString().slice(-6)}`;
  const dateGenerated = new Date();

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      {/* Header with company details */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{companyInfo.name}</h1>
            <p className="text-sm opacity-90">Company ID: {companyInfo.id}</p>
            <p className="text-sm opacity-90">{companyInfo.phone} | {companyInfo.email}</p>
            <p className="text-sm opacity-90">{companyInfo.address}</p>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <h2 className="text-lg font-bold">Delivery Certificate</h2>
              <p className="text-sm">ID: {certificateId}</p>
              <p className="text-xs mt-1">Status: <span className="font-medium bg-green-500 rounded-full px-2 py-0.5">Draft</span></p>
              <p className="text-xs mt-1">Generated: {format(dateGenerated, "MMM d, yyyy HH:mm")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate content */}
      <div className="p-6 space-y-8">
        {/* Customer Information */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-blue-800 flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              Customer Information
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{getCustomerName(customer, customers)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Project Site</p>
                <p className="font-medium">{projectSite || '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-blue-800 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Basic Information
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{format(date, "MMM d, yyyy")}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Service Type</p>
                <p className="font-medium">{serviceType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Operator</p>
                <p className="font-medium">{operator}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Start Time</p>
                <p className="font-medium">{startTime || '—'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">End Time</p>
                <p className="font-medium">{endTime || '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-blue-800 flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Additional Information
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Concrete Type</p>
                <p className="font-medium">{concreteType || '—'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium">{quantity || '—'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Hours Booked</p>
                <p className="font-medium">{hourlyBooking || '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Additions */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-blue-800 flex items-center">
              <Truck className="h-4 w-4 mr-2" />
              Service Additions
            </h3>
          </div>
          <div className="p-4 space-y-4">
            {(notes || additionalNotes) && (
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Notes</p>
                <p className="text-sm">{notes}</p>
                {additionalNotes && <p className="text-sm mt-2">{additionalNotes}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Signatures Section */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-blue-800 flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Signatures & Stamp
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Customer Signature</p>
                <div className="h-20 border border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <p className="text-sm text-gray-400">Signature will be collected</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Operator Signature</p>
                <div className="h-20 border border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <p className="text-sm text-gray-400">Signature will be collected</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Company Stamp</p>
                <div className="h-20 border border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <p className="text-sm text-gray-400">Stamp will be applied</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VAT Note */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Note:</span> All prices displayed are exclusive of VAT.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={moveToPrevStep}
            className="px-6"
          >
            Back
          </Button>
          
          <Button 
            onClick={moveToNextStep}
            className="px-8 bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Finalize Certificate
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCompleteStep;
