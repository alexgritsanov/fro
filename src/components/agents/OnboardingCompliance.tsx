import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  UserCheck, 
  CheckSquare, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  Download, 
  Upload,
  Search,
  Filter,
  BarChart,
  FileCheck,
  Eye,
  Plus,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  MapPin,
  Info,
  ArrowLeft
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import DocumentVerificationDialog from './DocumentVerificationDialog';
import TrainingScheduleDialog from './TrainingScheduleDialog';
import AgreementDialog from './AgreementDialog';
import DocumentUploadDialog from './DocumentUploadDialog';
import StatusReportDialog from './StatusReportDialog';
import FilterDocumentsDialog from './FilterDocumentsDialog';
import TrainingDashboard from './training/TrainingDashboard';

const mockDocuments = [
  { 
    id: '1',
    type: 'Agent Agreement', 
    required: 'All Agents', 
    status: 'complete', 
    received: '25 agents', 
    expiration: 'Varies',
    content: 'This is a standard agent agreement document defining the relationship between the agency and its agents.'
  },
  { 
    id: '2',
    type: 'Tax Registration', 
    required: 'All Agents', 
    status: 'pending', 
    received: '22 agents', 
    expiration: 'N/A',
    content: 'Tax registration documents containing tax identification numbers and relevant financial information.'
  },
  { 
    id: '3',
    type: 'Identity Verification', 
    required: 'All Agents', 
    status: 'complete', 
    received: '25 agents', 
    expiration: 'N/A',
    content: 'Government-issued ID verification documents to confirm agent identities.'
  },
  { 
    id: '4',
    type: 'Business License', 
    required: 'Premium Agents', 
    status: 'incomplete', 
    received: '3 of 5 agents', 
    expiration: 'Annual',
    content: 'Business operating licenses issued by the relevant authorities for premium agent services.'
  },
  { 
    id: '5',
    type: 'Insurance Verification', 
    required: 'All Agents', 
    status: 'warning', 
    received: '18 agents', 
    expiration: 'Various dates',
    content: 'Insurance policy documents confirming appropriate coverage for agent activities.'
  }
];

const mockAgreements = [
  {
    id: '1',
    name: 'Standard Agent Agreement',
    type: 'All Agents',
    status: 'active',
    lastUpdated: '2023-12-01',
    signatories: '25 agents'
  },
  {
    id: '2',
    name: 'Premium Agent Agreement',
    type: 'Premium Agents',
    status: 'active',
    lastUpdated: '2023-11-15',
    signatories: '5 agents'
  },
  {
    id: '3',
    name: 'Regional Manager Agreement',
    type: 'Managers',
    status: 'pending review',
    lastUpdated: '2023-12-10',
    signatories: '2 of 3 managers'
  },
  {
    id: '4',
    name: 'Independent Contractor Agreement',
    type: 'Contractors',
    status: 'expired',
    lastUpdated: '2023-06-30',
    signatories: '0 agents'
  }
];

const OnboardingCompliance = () => {
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isStatusReportOpen, setIsStatusReportOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isAgreementDialogOpen, setIsAgreementDialogOpen] = useState(false);
  const [isTrainingDialogOpen, setIsTrainingDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("documents");
  const [isViewDocumentOpen, setIsViewDocumentOpen] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState<any>(null);
  const [isViewAgreementOpen, setIsViewAgreementOpen] = useState(false);
  const [isEditAgreementOpen, setIsEditAgreementOpen] = useState(false);
  
  const handleVerifyDocuments = () => {
    setIsVerificationDialogOpen(true);
  };
  
  const handleUploadDocument = () => {
    setIsUploadDialogOpen(true);
  };
  
  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setIsViewDocumentOpen(true);
  };
  
  const handleDownloadDocument = (document: any) => {
    toast.success(`Downloaded ${document.type}`);
  };
  
  const handleGenerateStatusReport = () => {
    setIsStatusReportOpen(true);
  };
  
  const handleFilterDocuments = () => {
    setIsFilterDialogOpen(true);
  };
  
  const handleManageDocument = (document: any) => {
    setSelectedDocument(document);
    setIsVerificationDialogOpen(true);
  };
  
  const handleNewAgreement = () => {
    setSelectedAgreement(null);
    setIsAgreementDialogOpen(true);
  };
  
  const handleScheduleTraining = () => {
    setIsTrainingDialogOpen(true);
  };
  
  const handleViewAgreement = (agreement: any) => {
    setSelectedAgreement(agreement);
    setIsViewAgreementOpen(true);
  };
  
  const handleEditAgreement = (agreement: any) => {
    setSelectedAgreement(agreement);
    setIsEditAgreementOpen(true);
  };

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mx-auto bg-white border border-gray-200 p-1 shadow-sm rounded-xl overflow-hidden mb-6">
          <TabsTrigger 
            value="documents" 
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
          >
            Document Management
          </TabsTrigger>
          <TabsTrigger 
            value="agreements" 
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
          >
            Agreements
          </TabsTrigger>
          <TabsTrigger 
            value="training" 
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
          >
            Training & Certification
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents" className="mt-0">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Required Documents
              </h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleUploadDocument}
                >
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
                <Button 
                  className="flex items-center gap-2"
                  onClick={handleVerifyDocuments}
                >
                  <CheckSquare className="h-4 w-4" />
                  Verify Documents
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search documents..." className="pl-10" />
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleFilterDocuments}
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleGenerateStatusReport}
                >
                  <BarChart className="h-4 w-4" />
                  Status Report
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50 rounded-lg">
                  <tr>
                    <th className="px-6 py-3">Document Type</th>
                    <th className="px-6 py-3">Required For</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Received</th>
                    <th className="px-6 py-3">Expiration</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDocuments.map((doc, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{doc.type}</td>
                      <td className="px-6 py-4">{doc.required}</td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="outline" 
                          className={`
                            ${doc.status === 'complete' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                            ${doc.status === 'pending' ? 'bg-amber-100 text-amber-800 border-amber-200' : ''}
                            ${doc.status === 'incomplete' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                            ${doc.status === 'warning' ? 'bg-orange-100 text-orange-800 border-orange-200' : ''}
                          `}
                        >
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">{doc.received}</td>
                      <td className="px-6 py-4">{doc.expiration}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8"
                            onClick={() => handleDownloadDocument(doc)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8"
                            onClick={() => handleViewDocument(doc)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            className="h-8"
                            onClick={() => handleManageDocument(doc)}
                          >
                            Manage
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="agreements" className="mt-0">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Agent Agreements
              </h2>
              <div className="flex gap-2">
                <Button
                  className="flex items-center gap-2"
                  onClick={handleNewAgreement}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New Agreement
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50 rounded-lg">
                  <tr>
                    <th className="px-6 py-3">Agreement Name</th>
                    <th className="px-6 py-3">For</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Last Updated</th>
                    <th className="px-6 py-3">Signatories</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAgreements.map((agreement, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{agreement.name}</td>
                      <td className="px-6 py-4">{agreement.type}</td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="outline" 
                          className={`
                            ${agreement.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                            ${agreement.status === 'pending review' ? 'bg-amber-100 text-amber-800 border-amber-200' : ''}
                            ${agreement.status === 'expired' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                          `}
                        >
                          {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">{agreement.lastUpdated}</td>
                      <td className="px-6 py-4">{agreement.signatories}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8"
                            onClick={() => handleViewAgreement(agreement)}
                          >
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            className="h-8"
                            onClick={() => handleEditAgreement(agreement)}
                          >
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="training" className="mt-0">
          <TrainingDashboard />
        </TabsContent>
      </Tabs>
      
      {isVerificationDialogOpen && (
        <DocumentVerificationDialog
          isOpen={isVerificationDialogOpen}
          onClose={() => setIsVerificationDialogOpen(false)}
          document={selectedDocument}
        />
      )}
      
      {isUploadDialogOpen && (
        <DocumentUploadDialog
          isOpen={isUploadDialogOpen}
          onClose={() => setIsUploadDialogOpen(false)}
        />
      )}
      
      {isStatusReportOpen && (
        <StatusReportDialog
          isOpen={isStatusReportOpen}
          onClose={() => setIsStatusReportOpen(false)}
        />
      )}
      
      {isFilterDialogOpen && (
        <FilterDocumentsDialog
          isOpen={isFilterDialogOpen}
          onClose={() => setIsFilterDialogOpen(false)}
        />
      )}
      
      {isTrainingDialogOpen && (
        <TrainingScheduleDialog
          isOpen={isTrainingDialogOpen}
          onClose={() => setIsTrainingDialogOpen(false)}
        />
      )}
      
      {isAgreementDialogOpen && (
        <AgreementDialog
          isOpen={isAgreementDialogOpen}
          onClose={() => setIsAgreementDialogOpen(false)}
          agent={null}
        />
      )}
      
      <Dialog open={isViewDocumentOpen} onOpenChange={setIsViewDocumentOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="back" 
                className="mr-2" 
                onClick={() => setIsViewDocumentOpen(false)}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <DialogTitle className="flex items-center text-xl">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  {selectedDocument?.type}
                </DialogTitle>
                <DialogDescription>
                  Required for: {selectedDocument?.required}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex justify-between items-center">
              <Badge 
                variant="outline" 
                className={`
                  ${selectedDocument?.status === 'complete' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                  ${selectedDocument?.status === 'pending' ? 'bg-amber-100 text-amber-800 border-amber-200' : ''}
                  ${selectedDocument?.status === 'incomplete' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                  ${selectedDocument?.status === 'warning' ? 'bg-orange-100 text-orange-800 border-orange-200' : ''}
                `}
              >
                Status: {selectedDocument?.status.charAt(0).toUpperCase() + selectedDocument?.status.slice(1)}
              </Badge>
              
              <div className="text-sm">
                Received: {selectedDocument?.received}
              </div>
            </div>
            
            <div className="bg-gray-50 border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Document Content</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {selectedDocument?.content || 'No content available'}
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800">Document Information</h3>
                  <p className="text-blue-700 text-sm mt-1">
                    This document {selectedDocument?.expiration !== 'N/A' ? 
                      `expires ${selectedDocument?.expiration.toLowerCase()}` : 
                      'does not expire'}.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsViewDocumentOpen(false)}
            >
              Close
            </Button>
            <Button onClick={() => {
              handleManageDocument(selectedDocument);
              setIsViewDocumentOpen(false);
            }}>
              Manage Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isViewAgreementOpen} onOpenChange={setIsViewAgreementOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="back" 
                className="mr-2" 
                onClick={() => setIsViewAgreementOpen(false)}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <DialogTitle className="flex items-center text-xl">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  {selectedAgreement?.name}
                </DialogTitle>
                <DialogDescription>
                  For: {selectedAgreement?.type}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex justify-between items-center">
              <Badge 
                variant="outline" 
                className={`
                  ${selectedAgreement?.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                  ${selectedAgreement?.status === 'pending review' ? 'bg-amber-100 text-amber-800 border-amber-200' : ''}
                  ${selectedAgreement?.status === 'expired' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                `}
              >
                Status: {selectedAgreement?.status.charAt(0).toUpperCase() + selectedAgreement?.status.slice(1)}
              </Badge>
              
              <div className="text-sm">
                Last Updated: {selectedAgreement?.lastUpdated}
              </div>
            </div>
            
            <div className="bg-gray-50 border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Agreement Preview</h3>
              <div className="border rounded-lg p-6 bg-white">
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold">{selectedAgreement?.name}</h1>
                  <p className="text-gray-500 text-sm">Agreement for {selectedAgreement?.type}</p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-700">
                    This Agreement ("Agreement") is entered into as of the Effective Date by and between 
                    the Company and the Agent, as defined below.
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">WHEREAS:</h4>
                    <p className="text-gray-700">
                      The Company wishes to engage the Agent to perform certain services, and the Agent 
                      wishes to provide such services to the Company, all subject to the terms and 
                      conditions of this Agreement.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">1. DEFINITIONS</h4>
                    <p className="text-gray-700">
                      1.1 "Company" means Unidoc Ltd. and its affiliates.<br />
                      1.2 "Agent" means the individual or entity providing services under this Agreement.<br />
                      1.3 "Effective Date" means the date of last signature below.
                    </p>
                  </div>
                  
                  <p className="text-gray-400 italic text-sm">
                    [This is a preview. The full agreement contains additional terms and conditions.]
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800">Agreement Information</h3>
                  <p className="text-blue-700 text-sm mt-1">
                    This agreement has been signed by {selectedAgreement?.signatories}.
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="text-blue-700"
                onClick={() => {
                  toast.success("Agreement downloaded successfully");
                }}
              >
                <Download className="h-4 w-4 mr-1" />
                Download PDF
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsViewAgreementOpen(false)}
            >
              Close
            </Button>
            <Button onClick={() => {
              setIsViewAgreementOpen(false);
              handleEditAgreement(selectedAgreement);
            }}>
              Edit Agreement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {isEditAgreementOpen && (
        <AgreementDialog
          isOpen={isEditAgreementOpen}
          onClose={() => setIsEditAgreementOpen(false)}
          agent={null}
        />
      )}
    </div>
  );
};

export default OnboardingCompliance;
