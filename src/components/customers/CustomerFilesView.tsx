
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  FolderOpen, 
  ArrowLeft, 
  Grid, 
  List, 
  Search, 
  FileSpreadsheet, 
  FileImage, 
  FilePlus, 
  Download, 
  Link2, 
  MessageCircle, 
  MoreHorizontal, 
  Eye,
  Calendar,
  Receipt,
  FileCheck,
  ClipboardList,
  AlertTriangle,
  File
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { mockCustomerDocuments } from '@/data/mockData';

interface CustomerFilesViewProps {
  customer: any;
  folderName: string | null;
  onSelectFolder: (folderName: string) => void;
  onBackToFolders: () => void;
  viewMode: 'grid' | 'list';
  onChangeViewMode: (mode: 'grid' | 'list') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

interface DocumentType {
  id: string;
  name: string;
  type: string;
  date: string;
  size?: string;
  status?: string;
  linkedDocuments?: {
    id: string;
    name: string;
    type: string;
    relationship: string;
  }[];
}

interface FolderType {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
  documents: DocumentType[];
}

const CustomerFilesView = ({
  customer,
  folderName,
  onSelectFolder,
  onBackToFolders,
  viewMode,
  onChangeViewMode,
  searchTerm,
  onSearchChange
}: CustomerFilesViewProps) => {
  const [isDocumentPreviewOpen, setIsDocumentPreviewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{sender: string, message: string, timestamp: Date}[]>([]);
  
  // Define standard folder types
  const folders: FolderType[] = [
    {
      id: 'price-agreements',
      name: 'Price Agreements',
      icon: <FileCheck className="h-5 w-5" />,
      count: 3,
      color: 'bg-blue-500',
      documents: mockCustomerDocuments
        .filter(doc => doc.file_type === 'agreement' || doc.file_type === 'pdf')
        .map(doc => ({
          id: doc.id,
          name: doc.name,
          type: doc.file_type,
          date: doc.created_at,
          size: `${Math.floor(doc.size / 1024)} KB`,
          status: doc.status,
          linkedDocuments: [
            { id: 'serv-1', name: 'Service Call #SC-1234', type: 'service-call', relationship: 'Referenced by' },
            { id: 'cert-2', name: 'Delivery Certificate #DC-2345', type: 'certificate', relationship: 'Based on agreement' }
          ]
        }))
    },
    {
      id: 'service-calls',
      name: 'Service Calls',
      icon: <Calendar className="h-5 w-5" />,
      count: 8,
      color: 'bg-green-500',
      documents: mockCustomerDocuments
        .filter(doc => doc.file_type === 'service-call' || doc.file_type === 'pdf')
        .map(doc => ({
          id: doc.id,
          name: doc.name,
          type: doc.file_type,
          date: doc.created_at,
          size: `${Math.floor(doc.size / 1024)} KB`,
          status: doc.status,
          linkedDocuments: [
            { id: 'cert-2', name: 'Delivery Certificate #DC-2345', type: 'certificate', relationship: 'Generated from' },
            { id: 'inv-1', name: 'Invoice #INV-5678', type: 'invoice', relationship: 'Billed via' }
          ]
        }))
    },
    {
      id: 'delivery-certificates',
      name: 'Delivery Certificates',
      icon: <ClipboardList className="h-5 w-5" />,
      count: 5,
      color: 'bg-amber-500',
      documents: mockCustomerDocuments
        .filter(doc => doc.file_type === 'certificate' || doc.file_type === 'pdf')
        .map(doc => ({
          id: doc.id,
          name: doc.name,
          type: doc.file_type,
          date: doc.created_at,
          size: `${Math.floor(doc.size / 1024)} KB`,
          status: doc.status,
          linkedDocuments: [
            { id: 'serv-1', name: 'Service Call #SC-1234', type: 'service-call', relationship: 'Based on' },
            { id: 'inv-1', name: 'Invoice #INV-5678', type: 'invoice', relationship: 'Included in' }
          ]
        }))
    },
    {
      id: 'reports',
      name: 'Reports',
      icon: <FileSpreadsheet className="h-5 w-5" />,
      count: 2,
      color: 'bg-purple-500',
      documents: mockCustomerDocuments
        .filter(doc => doc.file_type === 'report' || doc.file_type === 'xlsx')
        .map(doc => ({
          id: doc.id,
          name: doc.name,
          type: doc.file_type,
          date: doc.created_at,
          size: `${Math.floor(doc.size / 1024)} KB`,
          status: doc.status,
          linkedDocuments: [
            { id: 'serv-1', name: 'Service Call #SC-1234', type: 'service-call', relationship: 'Includes data from' },
            { id: 'cert-2', name: 'Delivery Certificate #DC-2345', type: 'certificate', relationship: 'Includes data from' }
          ]
        }))
    },
    {
      id: 'invoices',
      name: 'Invoices',
      icon: <Receipt className="h-5 w-5" />,
      count: 7,
      color: 'bg-red-500',
      documents: mockCustomerDocuments
        .filter(doc => doc.file_type === 'invoice' || doc.file_type === 'pdf')
        .map(doc => ({
          id: doc.id,
          name: doc.name,
          type: doc.file_type,
          date: doc.created_at,
          size: `${Math.floor(doc.size / 1024)} KB`,
          status: doc.status,
          linkedDocuments: [
            { id: 'cert-2', name: 'Delivery Certificate #DC-2345', type: 'certificate', relationship: 'Based on' },
            { id: 'agr-1', name: 'Price Agreement 2023', type: 'agreement', relationship: 'Using rates from' }
          ]
        }))
    }
  ];

  const selectedFolder = folders.find(folder => folder.id === folderName?.toLowerCase().replace(/\s+/g, '-'));
  
  const filteredDocuments = selectedFolder?.documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleViewDocument = (document: DocumentType) => {
    setSelectedDocument(document);
    setIsDocumentPreviewOpen(true);
  };
  
  const handleDownloadDocument = (document: DocumentType) => {
    toast.success(`Downloading ${document.name}`, {
      description: "Your file will be ready shortly."
    });
  };
  
  const handleOpenChatDialog = (document: DocumentType) => {
    setSelectedDocument(document);
    setIsChatDialogOpen(true);
  };
  
  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        sender: 'You',
        message: chatMessage,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, newMessage]);
      setChatMessage('');
      
      // Simulate response after a short delay
      setTimeout(() => {
        const responseMessage = {
          sender: 'System',
          message: `Your message about ${selectedDocument?.name} has been received. A team member will respond shortly.`,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, responseMessage]);
      }, 1000);
    }
  };
  
  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-10 w-10 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-10 w-10 text-blue-500" />;
      case 'xls':
      case 'xlsx':
      case 'sheet':
        return <FileSpreadsheet className="h-10 w-10 text-green-500" />;
      case 'jpg':
      case 'png':
      case 'image':
        return <FileImage className="h-10 w-10 text-purple-500" />;
      case 'agreement':
        return <FileCheck className="h-10 w-10 text-blue-500" />;
      case 'service-call':
        return <Calendar className="h-10 w-10 text-green-500" />;
      case 'certificate':
        return <ClipboardList className="h-10 w-10 text-amber-500" />;
      case 'report':
        return <FileSpreadsheet className="h-10 w-10 text-purple-500" />;
      case 'invoice':
        return <Receipt className="h-10 w-10 text-red-500" />;
      default:
        return <File className="h-10 w-10 text-gray-500" />;
    }
  };
  
  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'draft':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Draft</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Pending</Badge>;
      case 'signed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Signed</Badge>;
      case 'awaiting signature':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Awaiting Signature</Badge>;
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Expired</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };

  const handleViewLinkedDocument = (linkedDoc: any) => {
    toast.info(`Viewing linked document: ${linkedDoc.name}`, {
      description: "This will open the related document details."
    });
  };

  return (
    <div className="space-y-6">
      {!folderName ? (
        // Folders View
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-lg font-medium">Document Library</h3>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className={cn("p-2", viewMode === 'grid' ? 'bg-gray-100' : '')}
                onClick={() => onChangeViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className={cn("p-2", viewMode === 'list' ? 'bg-gray-100' : '')}
                onClick={() => onChangeViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <FilePlus className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </div>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {folders.map((folder) => (
                <Card 
                  key={folder.id}
                  className="p-4 cursor-pointer hover:shadow-md transition-all border-l-4"
                  style={{ borderLeftColor: folder.color }}
                  onClick={() => onSelectFolder(folder.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${folder.color.replace('bg-', 'bg-opacity-10 text-')}`}>
                        {folder.icon}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{folder.name}</h4>
                        <p className="text-sm text-gray-500">{folder.count} documents</p>
                      </div>
                    </div>
                    <FolderOpen className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {folders.map((folder) => (
                <div 
                  key={folder.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onSelectFolder(folder.id)}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${folder.color.replace('bg-', 'bg-opacity-10 text-')}`}>
                      {folder.icon}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">{folder.name}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{folder.count} documents</span>
                    <FolderOpen className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        // Documents in selected folder view
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onBackToFolders}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Folders</span>
              </Button>
              <h3 className="text-lg font-medium">{selectedFolder?.name}</h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input 
                  placeholder="Search files..." 
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className={cn("p-2", viewMode === 'grid' ? 'bg-gray-100' : '')}
                onClick={() => onChangeViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className={cn("p-2", viewMode === 'list' ? 'bg-gray-100' : '')}
                onClick={() => onChangeViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <FilePlus className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
          
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <div className="mx-auto w-16 h-16 bg-blue-50 flex items-center justify-center rounded-full mb-4">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium">No documents found</h3>
              <p className="text-gray-500 max-w-md mx-auto mt-2">
                {searchTerm 
                  ? `No documents matching "${searchTerm}" in this folder.` 
                  : `This folder is empty.`}
              </p>
              <Button className="mt-4" variant="outline">
                <FilePlus className="h-4 w-4 mr-2" />
                Upload New Document
              </Button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((document) => (
                <Card 
                  key={document.id} 
                  className="p-4 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleViewDocument(document)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      {getDocumentIcon(document.type)}
                    </div>
                    <div>
                      {getStatusBadge(document.status)}
                    </div>
                  </div>
                  
                  <h4 className="font-medium mb-1 line-clamp-2">{document.name}</h4>
                  <p className="text-sm text-gray-500 mb-3">{format(new Date(document.date), 'MMM d, yyyy')}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{document.size || '250 KB'}</span>
                    
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadDocument(document);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenChatDialog(document);
                        }}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleViewDocument(document);
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Document
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadDocument(document);
                          }}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleOpenChatDialog(document);
                          }}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Start Discussion
                          </DropdownMenuItem>
                          <Separator />
                          {document.linkedDocuments && document.linkedDocuments.length > 0 && (
                            <>
                              <div className="px-2 py-1.5 text-xs text-gray-500">Linked Documents</div>
                              {document.linkedDocuments.map(linkedDoc => (
                                <DropdownMenuItem key={linkedDoc.id} onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewLinkedDocument(linkedDoc);
                                }}>
                                  <Link2 className="h-4 w-4 mr-2" />
                                  {linkedDoc.name}
                                </DropdownMenuItem>
                              ))}
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  {document.linkedDocuments && document.linkedDocuments.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <Link2 className="h-3 w-3 mr-1" />
                        <span>{document.linkedDocuments.length} linked document{document.linkedDocuments.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredDocuments.map((document) => (
                <div 
                  key={document.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleViewDocument(document)}
                >
                  <div className="flex items-center flex-1">
                    <div className="p-2 rounded-lg bg-gray-50">
                      {getDocumentIcon(document.type)}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h4 className="font-medium">{document.name}</h4>
                        <div className="flex items-center gap-2 mt-1 md:mt-0">
                          {getStatusBadge(document.status)}
                          <span className="text-sm text-gray-500">{format(new Date(document.date), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                      
                      {document.linkedDocuments && document.linkedDocuments.length > 0 && (
                        <div className="mt-1 text-xs text-gray-500 flex items-center">
                          <Link2 className="h-3 w-3 mr-1" />
                          <span>{document.linkedDocuments.length} linked document{document.linkedDocuments.length !== 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadDocument(document);
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenChatDialog(document);
                      }}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleViewDocument(document);
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Document
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadDocument(document);
                        }}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleOpenChatDialog(document);
                        }}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Start Discussion
                        </DropdownMenuItem>
                        <Separator />
                        {document.linkedDocuments && document.linkedDocuments.length > 0 && (
                          <>
                            <div className="px-2 py-1.5 text-xs text-gray-500">Linked Documents</div>
                            {document.linkedDocuments.map(linkedDoc => (
                              <DropdownMenuItem key={linkedDoc.id} onClick={(e) => {
                                e.stopPropagation();
                                handleViewLinkedDocument(linkedDoc);
                              }}>
                                <Link2 className="h-4 w-4 mr-2" />
                                {linkedDoc.name}
                              </DropdownMenuItem>
                            ))}
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Document Preview Dialog */}
      <Dialog open={isDocumentPreviewOpen} onOpenChange={setIsDocumentPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedDocument && getDocumentIcon(selectedDocument.type)}
              <span>{selectedDocument?.name}</span>
              {selectedDocument?.status && getStatusBadge(selectedDocument.status)}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="preview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="linked">Linked Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="pt-4">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center p-5">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Document Preview</h3>
                  <p className="text-gray-500 max-w-md mx-auto mt-2">
                    Preview would be shown here for PDFs and images
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleOpenChatDialog(selectedDocument!)}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Discuss This Document
                </Button>
                
                <Button size="sm" onClick={() => handleDownloadDocument(selectedDocument!)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Document Name</p>
                  <p className="font-medium">{selectedDocument?.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium capitalize">{selectedDocument?.type}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {selectedDocument?.date ? format(new Date(selectedDocument.date), 'MMM d, yyyy') : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div>{selectedDocument?.status && getStatusBadge(selectedDocument.status)}</div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-medium">{selectedDocument?.size || '250 KB'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{customer.name}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="linked" className="pt-4">
              {selectedDocument?.linkedDocuments && selectedDocument.linkedDocuments.length > 0 ? (
                <div className="space-y-3">
                  {selectedDocument.linkedDocuments.map(linkedDoc => (
                    <div 
                      key={linkedDoc.id}
                      className="flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleViewLinkedDocument(linkedDoc)}
                    >
                      <div className="p-2 rounded-lg bg-gray-50">
                        {getDocumentIcon(linkedDoc.type)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <h4 className="font-medium">{linkedDoc.name}</h4>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-100">
                            {linkedDoc.relationship}
                          </Badge>
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Link2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-md font-medium">No linked documents</h3>
                  <p className="text-gray-500 max-w-md mx-auto mt-2">
                    This document is not linked to any other documents.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDocumentPreviewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Chat Dialog */}
      <Dialog open={isChatDialogOpen} onOpenChange={setIsChatDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Discussion: {selectedDocument?.name}
            </DialogTitle>
            <DialogDescription>
              Discuss this document with your team or raise a dispute.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4 max-h-[300px] overflow-y-auto p-2 border rounded-md bg-gray-50">
            {chatMessages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No messages yet. Start the conversation.
              </div>
            ) : (
              chatMessages.map((msg, index) => (
                <div key={index} className={cn(
                  "max-w-[80%] p-3 rounded-lg",
                  msg.sender === 'You' 
                    ? "bg-blue-100 text-blue-800 ml-auto" 
                    : "bg-gray-200"
                )}>
                  <div className="text-xs font-medium mb-1">{msg.sender}</div>
                  <p className="text-sm">{msg.message}</p>
                  <div className="text-xs text-right mt-1 opacity-70">
                    {format(msg.timestamp, 'HH:mm')}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="flex gap-2 mt-2">
            <Input 
              placeholder="Type your message..." 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
          
          <div className="mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-red-600 hover:text-red-700"
              onClick={() => {
                setIsChatDialogOpen(false);
                toast.info("Dispute option will be available in a future update", {
                  description: "This feature is coming soon."
                });
              }}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Raise a Dispute about this Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerFilesView;
