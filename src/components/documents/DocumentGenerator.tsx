
import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Printer, Download, Share2, FileText, FileSpreadsheet, BookText, PenLine, Stamp } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import ServiceCallDocument from './ServiceCallDocument';
import CertificateDocument from './CertificateDocument';
import ReportDocument from './ReportDocument';
import SignatureCanvas from './SignatureCanvas';
import StampUploader from './StampUploader';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DocumentGenerator = () => {
  const [activeTab, setActiveTab] = useState('service-call');
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [isStampDialogOpen, setIsStampDialogOpen] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [companyStamp, setCompanyStamp] = useState<string | null>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    companyName: 'UNIDOC Solutions',
    companyLogo: '/placeholder.svg',
    companyAddress: '123 Business Avenue, Suite 100, Enterprise City',
    companyPhone: '+1 (555) 123-4567',
    companyEmail: 'service@unidoc.com',
    customerName: '',
    customerAddress: '',
    contactPerson: '',
    telephone: '',
    email: '',
    serviceDate: new Date(),
    serviceTime: '',
    serviceType: 'concrete-pumping',
    assignedOperator: 'john-doe',
    projectSite: '',
    notes: '',
    status: 'scheduled',
    serviceItems: [
      { description: 'Service hours', quantity: 4, unit: 'hours' }
    ]
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!documentRef.current) {
      toast.error("Document not ready for download");
      return;
    }

    toast.loading("Preparing document for download...");

    const documentElement = documentRef.current;
    
    html2canvas(documentElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    }).then(canvas => {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const aspectRatio = canvas.width / canvas.height;
      const imgWidth = pdfWidth;
      const imgHeight = imgWidth / aspectRatio;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      let filename = 'document.pdf';
      if (activeTab === 'service-call') {
        filename = `ServiceCall_${formData.customerName || 'Unnamed'}_${new Date().toISOString().slice(0, 10)}.pdf`;
      } else if (activeTab === 'delivery-certificate') {
        filename = `DeliveryCertificate_${formData.customerName || 'Unnamed'}_${new Date().toISOString().slice(0, 10)}.pdf`;
      } else if (activeTab === 'report') {
        filename = `Report_${formData.customerName || 'Unnamed'}_${new Date().toISOString().slice(0, 10)}.pdf`;
      }
      
      pdf.save(filename);
      
      toast.success("Document downloaded successfully");
    }).catch(error => {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download document");
    });
  };

  const handleShare = () => {
    toast.success("Document shared successfully");
    console.log('Share document:', formData);
  };

  const getEndDate = () => {
    const date = new Date(formData.serviceDate);
    if (formData.serviceTime) {
      const [hours, minutes] = formData.serviceTime.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
        date.setHours(hours + 2, minutes);
      }
    }
    return date.toISOString();
  };

  const serviceCallData = {
    id: 'preview-id',
    customer: formData.customerName,
    date: formData.serviceDate.toISOString(),
    startTime: formData.serviceTime,
    endDate: getEndDate(),
    projectSite: formData.projectSite,
    address: formData.customerAddress,
    status: formData.status,
    notes: formData.notes,
    serviceType: formData.serviceType,
    operator: formData.assignedOperator.replace(/-/g, ' '),
    hourlyBooking: formData.serviceItems?.[0]?.quantity || 0,
    
    companyName: formData.companyName,
    companyLogo: formData.companyLogo,
    companyAddress: formData.companyAddress,
    companyPhone: formData.companyPhone,
    companyEmail: formData.companyEmail,
    contactName: formData.contactPerson,
    contactPhone: formData.telephone,
    contactEmail: formData.email,
    signature: signature,
    companyStamp: companyStamp,
  };

  const certificateData = {
    customer_name: formData.customerName,
    operator_name: formData.assignedOperator.replace(/-/g, ' '),
    date: formData.serviceDate.toISOString(),
    service_details: `${formData.serviceType.replace(/-/g, ' ')} services at ${formData.projectSite || formData.customerAddress}`,
    service_hours: formData.serviceItems?.[0]?.quantity || 0,
    status: 'draft',
    signature_type: signature ? 'digital' : null,
    signature_data: signature,
    
    company_name: formData.companyName,
    company_logo: formData.companyLogo,
    company_address: formData.companyAddress,
    company_phone: formData.companyPhone,
    company_email: formData.companyEmail,
    contact_person: formData.contactPerson,
    contact_phone: formData.telephone,
    contact_email: formData.email,
    location: formData.projectSite || formData.customerAddress,
    notes: formData.notes,
    company_stamp: companyStamp,
  };

  const reportData = {
    title: 'Service Activity Report',
    customerName: formData.customerName,
    date: formData.serviceDate.toISOString(),
    period: `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`,
    totalServices: 15,
    completedServices: 12,
    pendingServices: 3,
    totalHours: 45,
    totalAmount: 5250,
  };

  return (
    <div className="mx-auto py-2">
      <div className="flex flex-col space-y-6 print:hidden">
        <div className="flex justify-end items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <Tabs defaultValue="service-call" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 w-full md:w-auto">
            <TabsTrigger value="service-call" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>Service Call</span>
            </TabsTrigger>
            <TabsTrigger value="delivery-certificate" className="flex items-center">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              <span>Delivery Certificate</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center">
              <BookText className="h-4 w-4 mr-2" />
              <span>Report</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="service-call" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
                <h2 className="text-xl font-semibold">Service Call Information</h2>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input 
                        id="companyName" 
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyAddress">Company Address</Label>
                      <Input 
                        id="companyAddress" 
                        value={formData.companyAddress}
                        onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Company Phone</Label>
                      <Input 
                        id="companyPhone" 
                        value={formData.companyPhone}
                        onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Company Email</Label>
                      <Input 
                        id="companyEmail" 
                        value={formData.companyEmail}
                        onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input 
                        id="customerName" 
                        value={formData.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerAddress">Address</Label>
                      <Input 
                        id="customerAddress" 
                        value={formData.customerAddress}
                        onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person</Label>
                      <Input 
                        id="contactPerson" 
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Telephone</Label>
                      <Input 
                        id="telephone" 
                        value={formData.telephone}
                        onChange={(e) => handleInputChange('telephone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectSite">Project Site</Label>
                      <Input 
                        id="projectSite" 
                        value={formData.projectSite}
                        onChange={(e) => handleInputChange('projectSite', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Service Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceDate">Date</Label>
                      <DatePicker
                        date={formData.serviceDate}
                        onSelect={(date) => handleInputChange('serviceDate', date || new Date())}
                        minDate={new Date()}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceTime">Time</Label>
                      <Input 
                        id="serviceTime" 
                        value={formData.serviceTime}
                        onChange={(e) => handleInputChange('serviceTime', e.target.value)}
                        placeholder="e.g. 9:00 AM"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type</Label>
                      <Select 
                        value={formData.serviceType}
                        onValueChange={(value) => handleInputChange('serviceType', value)}
                      >
                        <SelectTrigger id="serviceType">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="concrete-pumping">Concrete Pumping</SelectItem>
                          <SelectItem value="excavation">Excavation</SelectItem>
                          <SelectItem value="demolition">Demolition</SelectItem>
                          <SelectItem value="transportation">Transportation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignedOperator">Assigned Operator</Label>
                      <Select 
                        value={formData.assignedOperator}
                        onValueChange={(value) => handleInputChange('assignedOperator', value)}
                      >
                        <SelectTrigger id="assignedOperator">
                          <SelectValue placeholder="Select operator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john-doe">John Doe</SelectItem>
                          <SelectItem value="jane-smith">Jane Smith</SelectItem>
                          <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                          <SelectItem value="emily-davis">Emily Davis</SelectItem>
                          <SelectItem value="michael-wilson">Michael Wilson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={formData.status}
                        onValueChange={(value) => handleInputChange('status', value)}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Service Hours</Label>
                      <Input 
                        id="quantity" 
                        type="number"
                        min="0"
                        value={formData.serviceItems?.[0]?.quantity || 0}
                        onChange={(e) => {
                          const items = [...(formData.serviceItems || [])];
                          if (items.length > 0) {
                            items[0] = { ...items[0], quantity: Number(e.target.value) };
                          } else {
                            items.push({ description: 'Service hours', quantity: Number(e.target.value), unit: 'hours' });
                          }
                          handleInputChange('serviceItems', items);
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Enter any additional information here..."
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Signatures and Stamps</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Button 
                        variant="outline" 
                        className="w-full h-20 border-dashed flex flex-col items-center justify-center gap-2"
                        onClick={() => setIsSignatureDialogOpen(true)}
                      >
                        <PenLine className="h-6 w-6" />
                        <span>{signature ? 'Change Signature' : 'Add Signature'}</span>
                      </Button>
                    </div>
                    
                    <div>
                      <Button 
                        variant="outline" 
                        className="w-full h-20 border-dashed flex flex-col items-center justify-center gap-2"
                        onClick={() => setIsStampDialogOpen(true)}
                      >
                        <Stamp className="h-6 w-6" />
                        <span>{companyStamp ? 'Change Stamp' : 'Add Company Stamp'}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="print:hidden">
                <div className="sticky top-6">
                  <div className="bg-white p-4 rounded-lg border shadow-sm mb-4">
                    <h2 className="text-lg font-semibold mb-2">Preview</h2>
                    <p className="text-sm text-gray-500 mb-4">
                      This is how your document will look when printed or downloaded.
                    </p>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </Button>
                      <Button size="sm" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-50 border rounded-lg p-4 overflow-auto max-h-[600px]">
                    <div className="bg-white shadow-sm mx-auto" style={{ maxWidth: '210mm' }}>
                      <div ref={documentRef}>
                        <ServiceCallDocument 
                          serviceCall={serviceCallData} 
                          documentNumber={`SC-${Math.floor(Math.random() * 10000)}`}
                          isPreview={true} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="delivery-certificate" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
                <h2 className="text-xl font-semibold">Delivery Certificate Information</h2>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input 
                        id="companyName" 
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyAddress">Company Address</Label>
                      <Input 
                        id="companyAddress" 
                        value={formData.companyAddress}
                        onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Company Phone</Label>
                      <Input 
                        id="companyPhone" 
                        value={formData.companyPhone}
                        onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Company Email</Label>
                      <Input 
                        id="companyEmail" 
                        value={formData.companyEmail}
                        onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input 
                        id="customerName" 
                        value={formData.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerAddress">Address</Label>
                      <Input 
                        id="customerAddress" 
                        value={formData.customerAddress}
                        onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person</Label>
                      <Input 
                        id="contactPerson" 
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectSite">Project Site</Label>
                      <Input 
                        id="projectSite" 
                        value={formData.projectSite}
                        onChange={(e) => handleInputChange('projectSite', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Service Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceDate">Date</Label>
                      <DatePicker
                        date={formData.serviceDate}
                        onSelect={(date) => handleInputChange('serviceDate', date || new Date())}
                        minDate={new Date()}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceTime">Time</Label>
                      <Input 
                        id="serviceTime" 
                        value={formData.serviceTime}
                        onChange={(e) => handleInputChange('serviceTime', e.target.value)}
                        placeholder="e.g. 9:00 AM"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type</Label>
                      <Select 
                        value={formData.serviceType}
                        onValueChange={(value) => handleInputChange('serviceType', value)}
                      >
                        <SelectTrigger id="serviceType">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="concrete-pumping">Concrete Pumping</SelectItem>
                          <SelectItem value="excavation">Excavation</SelectItem>
                          <SelectItem value="demolition">Demolition</SelectItem>
                          <SelectItem value="transportation">Transportation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignedOperator">Assigned Operator</Label>
                      <Select 
                        value={formData.assignedOperator}
                        onValueChange={(value) => handleInputChange('assignedOperator', value)}
                      >
                        <SelectTrigger id="assignedOperator">
                          <SelectValue placeholder="Select operator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john-doe">John Doe</SelectItem>
                          <SelectItem value="jane-smith">Jane Smith</SelectItem>
                          <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                          <SelectItem value="emily-davis">Emily Davis</SelectItem>
                          <SelectItem value="michael-wilson">Michael Wilson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Service Hours</Label>
                      <Input 
                        id="quantity" 
                        type="number"
                        min="0"
                        value={formData.serviceItems?.[0]?.quantity || 0}
                        onChange={(e) => {
                          const items = [...(formData.serviceItems || [])];
                          if (items.length > 0) {
                            items[0] = { ...items[0], quantity: Number(e.target.value) };
                          } else {
                            items.push({ description: 'Service hours', quantity: Number(e.target.value), unit: 'hours' });
                          }
                          handleInputChange('serviceItems', items);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Certificate Status</Label>
                      <Select 
                        value={formData.status}
                        onValueChange={(value) => handleInputChange('status', value)}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="awaiting-signature">Awaiting Signature</SelectItem>
                          <SelectItem value="signed">Signed</SelectItem>
                          <SelectItem value="without-signature">Without Signature</SelectItem>
                          <SelectItem value="physical-signature">Physical Signature</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Enter any additional information here..."
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Signatures and Stamps</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Button 
                        variant="outline" 
                        className="w-full h-20 border-dashed flex flex-col items-center justify-center gap-2"
                        onClick={() => setIsSignatureDialogOpen(true)}
                      >
                        <PenLine className="h-6 w-6" />
                        <span>{signature ? 'Change Signature' : 'Add Signature'}</span>
                      </Button>
                    </div>
                    
                    <div>
                      <Button 
                        variant="outline" 
                        className="w-full h-20 border-dashed flex flex-col items-center justify-center gap-2"
                        onClick={() => setIsStampDialogOpen(true)}
                      >
                        <Stamp className="h-6 w-6" />
                        <span>{companyStamp ? 'Change Stamp' : 'Add Company Stamp'}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="print:hidden">
                <div className="sticky top-6">
                  <div className="bg-white p-4 rounded-lg border shadow-sm mb-4">
                    <h2 className="text-lg font-semibold mb-2">Preview</h2>
                    <p className="text-sm text-gray-500 mb-4">
                      This is how your document will look when printed or downloaded.
                    </p>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </Button>
                      <Button size="sm" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-50 border rounded-lg p-4 overflow-auto max-h-[600px]">
                    <div className="bg-white shadow-sm mx-auto" style={{ maxWidth: '210mm' }}>
                      <div ref={documentRef}>
                        <CertificateDocument
                          certificate={certificateData}
                          documentNumber={`DC-${Math.floor(Math.random() * 10000)}`}
                          isPreview={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="report" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
                <h2 className="text-xl font-semibold">Report Information</h2>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Report Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reportTitle">Report Title</Label>
                      <Input 
                        id="reportTitle" 
                        defaultValue="Service Activity Report"
                        onChange={(e) => handleInputChange('reportTitle', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reportPeriod">Report Period</Label>
                      <Input 
                        id="reportPeriod" 
                        defaultValue={`${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}
                        onChange={(e) => handleInputChange('reportPeriod', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input 
                        id="customerName" 
                        value={formData.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reportDate">Report Date</Label>
                      <DatePicker
                        date={formData.serviceDate}
                        onSelect={(date) => handleInputChange('serviceDate', date || new Date())}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Report Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalServices">Total Services</Label>
                      <Input 
                        id="totalServices" 
                        type="number"
                        min="0"
                        defaultValue="15"
                        onChange={(e) => handleInputChange('totalServices', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="completedServices">Completed</Label>
                      <Input 
                        id="completedServices" 
                        type="number"
                        min="0"
                        defaultValue="12"
                        onChange={(e) => handleInputChange('completedServices', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pendingServices">Pending</Label>
                      <Input 
                        id="pendingServices" 
                        type="number"
                        min="0"
                        defaultValue="3"
                        onChange={(e) => handleInputChange('pendingServices', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalHours">Total Hours</Label>
                      <Input 
                        id="totalHours" 
                        type="number"
                        min="0"
                        defaultValue="45"
                        onChange={(e) => handleInputChange('totalHours', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalAmount">Total Amount ($)</Label>
                      <Input 
                        id="totalAmount" 
                        type="number"
                        min="0"
                        defaultValue="5250"
                        onChange={(e) => handleInputChange('totalAmount', Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reportNotes">Additional Notes</Label>
                  <Textarea 
                    id="reportNotes" 
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Enter any additional information here..."
                  />
                </div>
              </div>
              
              <div className="print:hidden">
                <div className="sticky top-6">
                  <div className="bg-white p-4 rounded-lg border shadow-sm mb-4">
                    <h2 className="text-lg font-semibold mb-2">Preview</h2>
                    <p className="text-sm text-gray-500 mb-4">
                      This is how your document will look when printed or downloaded.
                    </p>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </Button>
                      <Button size="sm" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-50 border rounded-lg p-4 overflow-auto max-h-[600px]">
                    <div className="bg-white shadow-sm mx-auto" style={{ maxWidth: '210mm' }}>
                      <div ref={documentRef}>
                        <ReportDocument
                          report={reportData}
                          documentNumber={`RPT-${Math.floor(Math.random() * 10000)}`}
                          isPreview={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden print:block print:p-0">
        {activeTab === 'service-call' && (
          <ServiceCallDocument 
            serviceCall={serviceCallData} 
            documentNumber={`SC-${Math.floor(Math.random() * 10000)}`}
          />
        )}
        {activeTab === 'delivery-certificate' && (
          <CertificateDocument
            certificate={certificateData}
            documentNumber={`DC-${Math.floor(Math.random() * 10000)}`}
          />
        )}
        {activeTab === 'report' && (
          <ReportDocument
            report={reportData}
            documentNumber={`RPT-${Math.floor(Math.random() * 10000)}`}
          />
        )}
      </div>

      <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
        <DialogContent className="max-w-lg">
          <SignatureCanvas 
            onSave={(signatureData) => {
              setSignature(signatureData);
              setIsSignatureDialogOpen(false);
              toast.success("Signature saved successfully");
            }}
            onCancel={() => setIsSignatureDialogOpen(false)}
            initialSignature={signature || undefined}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isStampDialogOpen} onOpenChange={setIsStampDialogOpen}>
        <DialogContent className="max-w-lg">
          <StampUploader 
            onSave={(stampData) => {
              setCompanyStamp(stampData);
              setIsStampDialogOpen(false);
              toast.success("Company stamp saved successfully");
            }}
            onCancel={() => setIsStampDialogOpen(false)}
            initialStamp={companyStamp || undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentGenerator;
