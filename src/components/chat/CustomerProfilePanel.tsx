
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, FileText, AlertTriangle, MessageSquare, Phone, User, 
  Mail, Clock, MapPin, Building, Link, DownloadCloud, 
  FolderClosed, ChevronLeft, Grid, List, Search, 
  FileImage, FileSpreadsheet, Check, X, ExternalLink, 
  ArrowUpRight, Eye, MessageCircle 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface CustomerProfilePanelProps {
  customerId?: string;
  onClose: () => void;
}

// Type for document and folder items
interface DocumentItem {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'sheet';
  date: string;
  status?: string;
  size?: string;
  relatedDocuments?: {
    id: string;
    name: string;
    type: string;
    relationship: string;
  }[];
}

interface FolderItem {
  id: string;
  name: string;
  count: number;
  documents: DocumentItem[];
}

const CustomerProfilePanel = ({ customerId, onClose }: CustomerProfilePanelProps) => {
  const [activeTab, setActiveTab] = useState('files');
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewDocument, setPreviewDocument] = useState<DocumentItem | null>(null);
  const navigate = useNavigate();
  
  // This would normally fetch customer data from the database based on customerId
  // For now, we'll use enhanced mock data that matches the system design
  const customerData = {
    id: customerId || 'cust-1',
    name: 'Acme Corporation',
    avatar: '',
    status: 'Active',
    contactPerson: 'John Smith',
    email: 'john@acmecorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Tech City, CA 94103',
    website: 'www.acmecorp.com',
    created: '2023-01-15',
    lastActivity: '2024-07-25',
    folders: [
      {
        id: 'folder-1',
        name: 'Price Agreements',
        count: 2,
        documents: [
          { 
            id: 'doc-13', 
            name: 'Price Agreement 2024', 
            type: 'pdf' as const, 
            date: '2024-01-15', 
            status: 'Active', 
            size: '780 KB',
            relatedDocuments: [
              { id: 'serv-1', name: 'Service Call #SC-1234', type: 'service-call', relationship: 'Referenced by' },
              { id: 'doc-14', name: 'Special Conditions', type: 'pdf', relationship: 'Attachment' }
            ]
          },
          { 
            id: 'doc-14', 
            name: 'Special Conditions', 
            type: 'pdf' as const, 
            date: '2024-01-15', 
            status: 'Active', 
            size: '320 KB',
            relatedDocuments: [
              { id: 'doc-13', name: 'Price Agreement 2024', type: 'pdf', relationship: 'Parent document' }
            ]
          }
        ]
      },
      {
        id: 'folder-2',
        name: 'Invoices',
        count: 5,
        documents: [
          { 
            id: 'doc-5', 
            name: 'Invoice #INV-2345', 
            type: 'pdf' as const, 
            date: '2024-06-10', 
            status: 'Paid', 
            size: '320 KB',
            relatedDocuments: [
              { id: 'doc-10', name: 'Delivery Certificate #DC-1234', type: 'pdf', relationship: 'Based on' }
            ]
          },
          { id: 'doc-6', name: 'Invoice #INV-2240', type: 'pdf' as const, date: '2024-05-12', status: 'Paid', size: '350 KB' },
          { id: 'doc-7', name: 'Invoice #INV-2198', type: 'pdf' as const, date: '2024-04-08', status: 'Paid', size: '315 KB' },
          { id: 'doc-8', name: 'Invoice #INV-2156', type: 'pdf' as const, date: '2024-03-15', status: 'Paid', size: '340 KB' },
          { id: 'doc-9', name: 'Invoice #INV-2098', type: 'pdf' as const, date: '2024-02-10', status: 'Paid', size: '330 KB' }
        ]
      },
      {
        id: 'folder-3',
        name: 'Delivery Certificates',
        count: 3,
        documents: [
          { 
            id: 'doc-10', 
            name: 'Delivery Certificate #DC-1234', 
            type: 'pdf' as const, 
            date: '2024-06-05', 
            status: 'Signed', 
            size: '520 KB',
            relatedDocuments: [
              { id: 'serv-1', name: 'Service Call #SC-1234', type: 'service-call', relationship: 'Based on' },
              { id: 'doc-5', name: 'Invoice #INV-2345', type: 'pdf', relationship: 'Referenced by' }
            ]
          },
          { id: 'doc-11', name: 'Delivery Certificate #DC-1200', type: 'pdf' as const, date: '2024-05-22', status: 'Signed', size: '540 KB' },
          { id: 'doc-12', name: 'Delivery Certificate #DC-1178', type: 'pdf' as const, date: '2024-04-17', status: 'Signed', size: '510 KB' }
        ]
      },
      {
        id: 'folder-4',
        name: 'Service Calls',
        count: 3,
        documents: [
          { 
            id: 'serv-1', 
            name: 'Service Call #SC-1234', 
            type: 'pdf' as const, 
            date: '2024-06-05', 
            status: 'Completed', 
            size: '420 KB',
            relatedDocuments: [
              { id: 'doc-10', name: 'Delivery Certificate #DC-1234', type: 'pdf', relationship: 'Has delivery certificate' },
              { id: 'doc-13', name: 'Price Agreement 2024', type: 'pdf', relationship: 'References' }
            ]
          },
          { id: 'serv-2', name: 'Service Call #SC-1254', type: 'pdf' as const, date: '2024-07-10', status: 'Scheduled', size: '380 KB' },
          { id: 'serv-3', name: 'Service Call #SC-1210', type: 'pdf' as const, date: '2024-05-22', status: 'Completed', size: '410 KB' }
        ]
      },
      {
        id: 'folder-5',
        name: 'Reports',
        count: 2,
        documents: [
          { id: 'report-1', name: 'Monthly Service Report - June', type: 'sheet' as const, date: '2024-06-30', status: 'Final', size: '1.2 MB' },
          { id: 'report-2', name: 'Customer Satisfaction Survey', type: 'doc' as const, date: '2024-06-15', status: 'Final', size: '840 KB' }
        ]
      }
    ],
    services: [
      { id: 'serv-1', name: 'Concrete Pumping', date: '2024-06-05', status: 'Completed' },
      { id: 'serv-2', name: 'Equipment Rental', date: '2024-07-10', status: 'Scheduled' },
      { id: 'serv-3', name: 'Site Inspection', date: '2024-05-22', status: 'Completed' },
    ],
    disputes: [
      { id: 'disp-1', title: 'Invoice Discrepancy', date: '2024-07-01', status: 'Open' }
    ]
  };

  if (!customerId) {
    return (
      <div className="w-[350px] border-l border-gray-200 bg-gray-50 p-6 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-center">Select a customer conversation to view their details</p>
      </div>
    );
  }
  
  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf':
        return <FileText className="h-10 w-10 text-red-400" />;
      case 'doc':
        return <FileText className="h-10 w-10 text-blue-400" />;
      case 'image':
        return <FileImage className="h-10 w-10 text-green-400" />;
      case 'sheet':
        return <FileSpreadsheet className="h-10 w-10 text-emerald-400" />;
      default:
        return <FileText className="h-10 w-10 text-gray-400" />;
    }
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active':
        return "bg-green-50 text-green-700 border-green-200";
      case 'paid':
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case 'signed':
        return "bg-blue-50 text-blue-700 border-blue-200";
      case 'scheduled':
        return "bg-purple-50 text-purple-700 border-purple-200";
      case 'completed':
        return "bg-green-50 text-green-700 border-green-200";
      case 'final':
        return "bg-blue-50 text-blue-700 border-blue-200";
      case 'draft':
        return "bg-amber-50 text-amber-700 border-amber-200";
      case 'pending':
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  
  const handleSelectFolder = (folder: FolderItem) => {
    setSelectedFolder(folder);
    setSearchTerm('');
  };
  
  const handleBackToFolders = () => {
    setSelectedFolder(null);
    setSearchTerm('');
  };
  
  const handleOpenPreview = (document: DocumentItem) => {
    setPreviewDocument(document);
  };
  
  const handleClosePreview = () => {
    setPreviewDocument(null);
  };
  
  const handleStartDocumentChat = (document: DocumentItem) => {
    // Set up context for document chat and redirect to chat
    const docType = document.name.includes('Service Call') ? 'service-call' :
                    document.name.includes('Delivery Certificate') ? 'delivery-certificate' :
                    document.name.includes('Invoice') ? 'invoice' :
                    document.name.includes('Price Agreement') ? 'price-agreement' :
                    'document';
                    
    // In a real implementation, this would navigate to the chat page with document context
    navigate(`/chat?documentId=${document.id}&documentType=${docType}&documentName=${encodeURIComponent(document.name)}&customerId=${customerId}&customerName=${encodeURIComponent(customerData.name)}`);
    
    toast({
      title: 'Document Chat Started',
      description: `Starting a discussion about "${document.name}"`
    });
    
    onClose();
  };
  
  const handleViewFullProfile = () => {
    // In a real implementation, this would navigate to the customer profile page
    navigate(`/customers/${customerId}`);
    
    toast({
      title: 'Navigating to Full Profile',
      description: `Viewing full profile for ${customerData.name}`
    });
    
    onClose();
  };

  const renderFolders = () => {
    // Filter folders if search term exists
    const filteredFolders = customerData.folders.filter(folder => 
      searchTerm ? folder.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
    );
    
    return (
      <div className="grid grid-cols-2 gap-3">
        {filteredFolders.length === 0 ? (
          <p className="col-span-2 text-center py-4 text-gray-500">No folders match your search</p>
        ) : (
          filteredFolders.map(folder => (
            <Card 
              key={folder.id} 
              className="p-3 cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-b from-white to-gray-50"
              onClick={() => handleSelectFolder(folder)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 rounded-lg p-2">
                  <FolderClosed className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{folder.name}</p>
                  <p className="text-xs text-gray-500">{folder.count} documents</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    );
  };
  
  const renderDocuments = () => {
    if (!selectedFolder) return null;
    
    const filteredDocs = selectedFolder.documents.filter(doc => 
      searchTerm ? doc.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
    );
    
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={handleBackToFolders}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <h3 className="font-medium text-blue-700">{selectedFolder.name}</h3>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search files" 
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-full p-1",
                    viewMode === 'grid' ? "bg-blue-100 text-blue-700" : ""
                  )}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Grid view</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-full p-1",
                    viewMode === 'list' ? "bg-blue-100 text-blue-700" : ""
                  )}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>List view</TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {filteredDocs.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No documents match your search</p>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredDocs.map(doc => (
              <Card 
                key={doc.id} 
                className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOpenPreview(doc)}
              >
                <div className="flex flex-col items-center">
                  {getFileIcon(doc.type)}
                  <p className="font-medium text-sm text-center mt-2 line-clamp-2">{doc.name}</p>
                  <div className="mt-1 flex items-center justify-between w-full text-xs text-gray-500">
                    <span>{doc.date}</span>
                    <div className="flex gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DownloadCloud className="h-3.5 w-3.5 cursor-pointer hover:text-blue-600" />
                        </TooltipTrigger>
                        <TooltipContent>Download</TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <MessageSquare 
                            className="h-3.5 w-3.5 cursor-pointer hover:text-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartDocumentChat(doc);
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Discuss</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDocs.map(doc => (
              <Card 
                key={doc.id} 
                className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOpenPreview(doc)}
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(doc.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{doc.name}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{doc.date}</span>
                      {doc.status && (
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs",
                            getStatusBadgeColor(doc.status)
                          )}
                        >
                          {doc.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                          <DownloadCloud className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Download</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartDocumentChat(doc);
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Discuss</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const renderDocumentPreview = () => {
    if (!previewDocument) return null;
    
    return (
      <Dialog open={!!previewDocument} onOpenChange={handleClosePreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getFileIcon(previewDocument.type)}
                <div className="ml-3">
                  <DialogTitle className="text-lg">{previewDocument.name}</DialogTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-500">{previewDocument.date}</p>
                    {previewDocument.status && (
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          getStatusBadgeColor(previewDocument.status)
                        )}
                      >
                        {previewDocument.status}
                      </Badge>
                    )}
                    <p className="text-sm text-gray-500">{previewDocument.size}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1"
                  onClick={() => handleStartDocumentChat(previewDocument)}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Discuss</span>
                </Button>
                
                <Button variant="outline" size="sm" className="gap-1">
                  <DownloadCloud className="h-4 w-4" />
                  <span>Download</span>
                </Button>
                
                <Button variant="outline" size="sm" className="gap-1">
                  <ExternalLink className="h-4 w-4" />
                  <span>Open</span>
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            <div className="bg-gray-100 h-full flex items-center justify-center">
              {/* Mock document preview - in a real implementation, this would be the actual document */}
              <div className="bg-white shadow-md h-[80%] w-[80%] flex flex-col items-center justify-center p-10">
                <div className="flex flex-col items-center mb-10">
                  {getFileIcon(previewDocument.type)}
                  <h3 className="text-xl font-semibold mt-4 text-center">{previewDocument.name}</h3>
                  <p className="text-gray-500 mt-2">Preview not available</p>
                </div>
                
                <p className="text-center text-gray-600">
                  This is a preview placeholder for {previewDocument.name}.<br />
                  In a real implementation, the actual document would be displayed here.
                </p>
              </div>
            </div>
          </div>
          
          {previewDocument.relatedDocuments && previewDocument.relatedDocuments.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Related Documents</h4>
              <div className="space-y-2">
                {previewDocument.relatedDocuments.map(related => (
                  <div key={related.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium">{related.name}</p>
                        <p className="text-xs text-gray-500">{related.relationship}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="w-[350px] border-l border-gray-200 bg-gradient-to-b from-gray-50 to-white flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
        <h3 className="font-medium text-blue-800">Customer File</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 hover:bg-gray-100">
          <span className="sr-only">Close panel</span>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl font-semibold">
            {customerData.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-medium text-lg">{customerData.name}</h2>
              <Badge variant={customerData.status === 'Active' ? 'success' : 'secondary'}>
                {customerData.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <User className="h-3.5 w-3.5" />
              {customerData.contactPerson}
            </p>
          </div>
        </div>
        
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4 text-gray-400" />
            <a href={`mailto:${customerData.email}`} className="hover:text-blue-600">{customerData.email}</a>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4 text-gray-400" />
            <a href={`tel:${customerData.phone}`} className="hover:text-blue-600">{customerData.phone}</a>
          </div>
          <div className="flex items-start gap-2 text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
            <span>{customerData.address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Link className="h-4 w-4 text-gray-400" />
            <a href={`https://${customerData.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">{customerData.website}</a>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <Tabs 
          defaultValue="files" 
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="px-4 pt-3 bg-white">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="files" className="p-4 space-y-3">
            {customerData.disputes.length > 0 && (
              <Card className="p-3 bg-red-50 border-red-200">
                <div className="flex items-center gap-2 text-red-600 font-medium mb-1">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Active Disputes</span>
                </div>
                {customerData.disputes.map(dispute => (
                  <div key={dispute.id} className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-700">{dispute.title}</span>
                    <Badge variant="destructive" className="text-xs">{dispute.status}</Badge>
                  </div>
                ))}
              </Card>
            )}
            
            {selectedFolder ? renderDocuments() : renderFolders()}
          </TabsContent>
          
          <TabsContent value="services" className="p-4 space-y-3">
            <h4 className="font-medium text-sm mb-2 text-gray-600">Recent Services</h4>
            <div className="space-y-2">
              {customerData.services.map(service => (
                <div key={service.id} className="p-3 bg-white rounded-md border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-sm">{service.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{service.date}</span>
                    <Badge variant={service.status === 'Completed' ? 'success' : service.status === 'Scheduled' ? 'secondary' : 'outline'} className="text-xs">
                      {service.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="p-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-gray-600 mb-2">Account Information</h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Customer since</span>
                    <span className="font-medium">{customerData.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last activity</span>
                    <span className="font-medium">{customerData.lastActivity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total documents</span>
                    <span className="font-medium">
                      {customerData.folders.reduce((sum, folder) => sum + folder.count, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Active disputes</span>
                    <span className="font-medium">{customerData.disputes.length}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                variant="blueTeal"
                onClick={handleViewFullProfile}
              >
                <Building className="h-4 w-4 mr-2" />
                View Full Customer Profile
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Document Preview Dialog */}
      {renderDocumentPreview()}
    </div>
  );
};

export default CustomerProfilePanel;
