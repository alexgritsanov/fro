
import React from 'react';
import { format } from 'date-fns';
import { Printer, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentPreviewProps {
  template: any;
  documentType: string;
  formData: any;
}

const DocumentPreview = ({ template, documentType, formData }: DocumentPreviewProps) => {
  if (!template) return null;
  
  const renderServiceCallPreview = () => (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">SERVICE CALL</h1>
          <p className="text-gray-500">Document #: SC-{Math.floor(Math.random() * 10000)}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold">UNIDOC</h2>
          <p className="text-sm">123 Business Street</p>
          <p className="text-sm">Business City, BZ 12345</p>
          <p className="text-sm">123-456-7890</p>
          <p className="text-sm">contact@unidoc.com</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Customer Information</h3>
          <p className="font-semibold">{formData.customerName || 'Customer Name'}</p>
          <p>{formData.customerAddress || 'Customer Address'}</p>
          <p>Contact: {formData.contactPerson || 'Contact Person'}</p>
          <p>Tel: {formData.telephone || 'Telephone'}</p>
          <p>Email: {formData.email || 'Email'}</p>
        </div>
        
        <div>
          <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Service Information</h3>
          <p><span className="font-semibold">Date: </span>
            {formData.serviceDate ? format(formData.serviceDate, 'MMMM dd, yyyy') : 'Date'}</p>
          <p><span className="font-semibold">Time: </span>
            {formData.serviceTime || 'Time'}</p>
          <p><span className="font-semibold">Service Type: </span>
            {formData.serviceType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Service Type'}</p>
          <p><span className="font-semibold">Operator: </span>
            {formData.assignedOperator?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Operator'}</p>
          <p><span className="font-semibold">Status: </span>
            <span className={`font-semibold ${
              formData.status === 'completed' ? 'text-green-600' : 
              formData.status === 'in-progress' ? 'text-amber-600' : 
              formData.status === 'awaiting-signature' ? 'text-orange-600' : 
              'text-blue-600'
            }`}>
              {formData.status?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Status'}
            </span>
          </p>
        </div>
      </div>
      
      {formData.projectSite && (
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Project Site</h3>
          <p>{formData.projectSite}</p>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Service Details</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="py-2 px-4 font-semibold">Description</th>
              <th className="py-2 px-4 font-semibold text-right">Quantity</th>
              <th className="py-2 px-4 font-semibold text-right">Unit</th>
            </tr>
          </thead>
          <tbody>
            {formData.serviceItems && formData.serviceItems.length > 0 ? (
              formData.serviceItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 px-4">{item.description || 'Service description'}</td>
                  <td className="py-2 px-4 text-right">{item.quantity || 0}</td>
                  <td className="py-2 px-4 text-right">
                    {item.unit?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Unit'}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b border-gray-100">
                <td className="py-2 px-4">Service description</td>
                <td className="py-2 px-4 text-right">0</td>
                <td className="py-2 px-4 text-right">Hours</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Notes</h3>
        <p className="whitespace-pre-line">{formData.notes || 'No additional notes provided.'}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Customer Signature</h3>
          <div className="border-b border-dashed border-gray-400 h-16 mt-4"></div>
          <p className="text-sm text-center mt-1">Signature</p>
        </div>
        
        <div>
          <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Service Provider</h3>
          <div className="border-b border-dashed border-gray-400 h-16 mt-4"></div>
          <p className="text-sm text-center mt-1">Signature</p>
        </div>
      </div>
      
      <div className="text-xs text-center text-gray-500 mt-8">
        <p>This document was generated by Unidoc Document Generator</p>
        <p>Generated on {format(new Date(), 'MMMM dd, yyyy, h:mm a')}</p>
      </div>
    </div>
  );
  
  const renderDeliveryCertificatePreview = () => (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">DELIVERY CERTIFICATE</h1>
          <p className="text-gray-500">Certificate #: DC-{Math.floor(Math.random() * 10000)}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold">UNIDOC</h2>
          <p className="text-sm">123 Business Street</p>
          <p className="text-sm">Business City, BZ 12345</p>
          <p className="text-sm">123-456-7890</p>
          <p className="text-sm">contact@unidoc.com</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Customer Information</h3>
          <p className="font-semibold">{formData.customerName || 'Customer Name'}</p>
          <p>{formData.customerAddress || 'Customer Address'}</p>
          <p>Contact: {formData.contactPerson || 'Contact Person'}</p>
          <p>Tel: {formData.telephone || 'Telephone'}</p>
          <p>Email: {formData.email || 'Email'}</p>
        </div>
        
        <div>
          <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Service Information</h3>
          <p><span className="font-semibold">Date: </span>
            {formData.serviceDate ? format(formData.serviceDate, 'MMMM dd, yyyy') : 'Date'}</p>
          <p><span className="font-semibold">Time: </span>
            {formData.serviceTime || 'Time'}</p>
          <p><span className="font-semibold">Service Type: </span>
            {formData.serviceType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Service Type'}</p>
          <p><span className="font-semibold">Operator: </span>
            {formData.assignedOperator?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Operator'}</p>
          <p><span className="font-semibold">Status: </span>
            <span className={`font-semibold ${
              formData.status === 'completed' ? 'text-green-600' : 
              formData.status === 'in-progress' ? 'text-amber-600' : 
              formData.status === 'awaiting-signature' ? 'text-orange-600' : 
              'text-blue-600'
            }`}>
              {formData.status?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Status'}
            </span>
          </p>
        </div>
      </div>
      
      {formData.projectSite && (
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Delivery Location</h3>
          <p>{formData.projectSite}</p>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Delivered Items</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="py-2 px-4 font-semibold">Description</th>
              <th className="py-2 px-4 font-semibold text-right">Quantity</th>
              <th className="py-2 px-4 font-semibold text-right">Unit</th>
            </tr>
          </thead>
          <tbody>
            {formData.serviceItems && formData.serviceItems.length > 0 ? (
              formData.serviceItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 px-4">{item.description || 'Item description'}</td>
                  <td className="py-2 px-4 text-right">{item.quantity || 0}</td>
                  <td className="py-2 px-4 text-right">
                    {item.unit?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Unit'}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b border-gray-100">
                <td className="py-2 px-4">Item description</td>
                <td className="py-2 px-4 text-right">0</td>
                <td className="py-2 px-4 text-right">Units</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Notes</h3>
        <p className="whitespace-pre-line">{formData.notes || 'No additional notes provided.'}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Received By</h3>
          <div className="border-b border-dashed border-gray-400 h-16 mt-4"></div>
          <p className="text-sm text-center mt-1">Name & Signature</p>
        </div>
        
        <div>
          <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Delivered By</h3>
          <div className="border-b border-dashed border-gray-400 h-16 mt-4"></div>
          <p className="text-sm text-center mt-1">Name & Signature</p>
        </div>
      </div>
      
      <div className="text-xs text-center text-gray-500 mt-8">
        <p>This document was generated by Unidoc Document Generator</p>
        <p>Generated on {format(new Date(), 'MMMM dd, yyyy, h:mm a')}</p>
      </div>
    </div>
  );
  
  const renderReportPreview = () => (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {formData.reportType?.toUpperCase() || 'CUSTOM'} REPORT
          </h1>
          <p className="text-gray-500">Report #: RP-{Math.floor(Math.random() * 10000)}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold">UNIDOC</h2>
          <p className="text-sm">123 Business Street</p>
          <p className="text-sm">Business City, BZ 12345</p>
          <p className="text-sm">123-456-7890</p>
          <p className="text-sm">contact@unidoc.com</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Report Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><span className="font-semibold">Report Type: </span>
              {formData.reportType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Report Type'}</p>
            <p><span className="font-semibold">Period: </span>
              {formData.reportStartDate ? format(formData.reportStartDate, 'MMMM dd, yyyy') : 'Start Date'} 
              - 
              {formData.reportEndDate ? format(formData.reportEndDate, 'MMMM dd, yyyy') : 'End Date'}</p>
          </div>
          <div>
            <p><span className="font-semibold">Filtered By: </span>
              {formData.filterBy?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'All'}</p>
            {formData.filterBy === 'customer' && (
              <p><span className="font-semibold">Customer: </span>
                {formData.customerFilter?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'All Customers'}</p>
            )}
            {formData.filterBy === 'employee' && (
              <p><span className="font-semibold">Employee: </span>
                {formData.employeeFilter?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'All Employees'}</p>
            )}
            {formData.filterBy === 'service-type' && (
              <p><span className="font-semibold">Service Type: </span>
                {formData.serviceTypeFilter?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'All Service Types'}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Report Summary</h3>
        
        {/* Mock chart for graphical report */}
        {(formData.reportFormat === 'graphical' || formData.reportFormat === 'combined') && (
          <div className="mb-6">
            <div className="aspect-video bg-gray-100 rounded flex items-center justify-center mb-2">
              <img 
                src="https://via.placeholder.com/800x400?text=Report+Chart"
                alt="Report Chart"
                className="max-w-full h-auto rounded"
              />
            </div>
            <p className="text-sm text-center text-gray-500">Chart: Activity summary for the selected period</p>
          </div>
        )}
        
        {/* Mock table for tabular report */}
        {(formData.reportFormat === 'tabular' || formData.reportFormat === 'combined') && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="py-2 px-4 font-semibold">Date</th>
                  <th className="py-2 px-4 font-semibold">Customer</th>
                  <th className="py-2 px-4 font-semibold">Service Type</th>
                  <th className="py-2 px-4 font-semibold">Operator</th>
                  <th className="py-2 px-4 font-semibold text-right">Hours</th>
                  <th className="py-2 px-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Mock data for table */}
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">01/06/2023</td>
                  <td className="py-2 px-4">Company A</td>
                  <td className="py-2 px-4">Concrete Pumping</td>
                  <td className="py-2 px-4">John Doe</td>
                  <td className="py-2 px-4 text-right">4.5</td>
                  <td className="py-2 px-4 text-right">
                    <span className="text-green-600 font-medium">Completed</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">02/06/2023</td>
                  <td className="py-2 px-4">Company B</td>
                  <td className="py-2 px-4">Excavation</td>
                  <td className="py-2 px-4">Jane Smith</td>
                  <td className="py-2 px-4 text-right">6.0</td>
                  <td className="py-2 px-4 text-right">
                    <span className="text-green-600 font-medium">Completed</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">03/06/2023</td>
                  <td className="py-2 px-4">Company C</td>
                  <td className="py-2 px-4">Demolition</td>
                  <td className="py-2 px-4">Bob Johnson</td>
                  <td className="py-2 px-4 text-right">8.0</td>
                  <td className="py-2 px-4 text-right">
                    <span className="text-amber-600 font-medium">In Progress</span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="py-2 px-4 font-semibold" colSpan={4}>Total</td>
                  <td className="py-2 px-4 font-semibold text-right">18.5</td>
                  <td className="py-2 px-4"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-gray-800 border-b pb-1">Key Metrics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded text-center">
            <p className="text-sm text-gray-600">Total Service Calls</p>
            <p className="text-xl font-bold text-blue-600">24</p>
          </div>
          <div className="bg-green-50 p-4 rounded text-center">
            <p className="text-sm text-gray-600">Completion Rate</p>
            <p className="text-xl font-bold text-green-600">92%</p>
          </div>
          <div className="bg-amber-50 p-4 rounded text-center">
            <p className="text-sm text-gray-600">Avg. Duration</p>
            <p className="text-xl font-bold text-amber-600">5.2 hrs</p>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-center text-gray-500 mt-8">
        <p>This document was generated by Unidoc Document Generator</p>
        <p>Generated on {format(new Date(), 'MMMM dd, yyyy, h:mm a')}</p>
      </div>
    </div>
  );
  
  // Render the appropriate preview based on document type
  return (
    <div className="document-preview">
      {documentType === 'service-call' && renderServiceCallPreview()}
      {documentType === 'delivery-certificate' && renderDeliveryCertificatePreview()}
      {['report', 'customer-report', 'employee-report'].includes(documentType) && renderReportPreview()}
    </div>
  );
};

export default DocumentPreview;
