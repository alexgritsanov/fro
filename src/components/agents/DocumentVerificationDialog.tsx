
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileCheck, 
  FileX, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MoreHorizontal,
  Upload,
  Eye,
  Download,
  Edit
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';

// Mock document data that would come from your database
const mockAgentDocuments = [
  { 
    id: '1',
    name: 'Photo ID',
    type: 'identification',
    status: 'pending',
    uploadDate: new Date(Date.now() - 86400000 * 2),
    required: true,
    notes: '',
    fileType: 'image/jpeg',
    uploadedBy: 'Agent'
  },
  { 
    id: '2',
    name: 'Agent Agreement',
    type: 'agreement',
    status: 'approved',
    uploadDate: new Date(Date.now() - 86400000 * 5),
    required: true,
    notes: 'Approved on first review',
    fileType: 'application/pdf',
    uploadedBy: 'System'
  },
  { 
    id: '3',
    name: 'Business License',
    type: 'license',
    status: 'rejected',
    uploadDate: new Date(Date.now() - 86400000 * 3),
    required: true,
    notes: 'License expired, please upload current license',
    fileType: 'application/pdf',
    uploadedBy: 'Agent'
  },
  { 
    id: '4',
    name: 'Insurance Certificate',
    type: 'insurance',
    status: 'pending',
    uploadDate: new Date(Date.now() - 86400000 * 1),
    required: true,
    notes: '',
    fileType: 'application/pdf',
    uploadedBy: 'Agent'
  },
  { 
    id: '5',
    name: 'Training Certificate',
    type: 'training',
    status: 'pending',
    uploadDate: new Date(Date.now() - 86400000 * 4),
    required: false,
    notes: '',
    fileType: 'application/pdf',
    uploadedBy: 'System'
  }
];

interface DocumentVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document?: any;
}

const DocumentVerificationDialog = ({ isOpen, onClose, document }: DocumentVerificationDialogProps) => {
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Filter documents based on current tab
  const getFilteredDocuments = () => {
    if (currentTab === 'all') return mockAgentDocuments;
    return mockAgentDocuments.filter(doc => doc.status === currentTab);
  };
  
  const handleApproveDocument = (documentId: string) => {
    // In a real app, you would call an API to update the document status
    toast.success(`Document ${documentId} approved successfully`);
  };
  
  const handleRejectDocument = (documentId: string) => {
    // In a real app, you would call an API to update the document status
    toast.error(`Document ${documentId} rejected`);
  };
  
  const handleViewDocument = (doc: any) => {
    setSelectedDocument(doc);
    setIsPreviewOpen(true);
  };
  
  const handleDownloadDocument = (documentId: string) => {
    // In a real app, you would download the document
    toast.success(`Downloading document ${documentId}`);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pending Review</Badge>;
    }
  };
  
  const getDocumentIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <FileCheck className="h-5 w-5 text-blue-500" />;
    } else if (fileType === 'application/pdf') {
      return <FileCheck className="h-5 w-5 text-red-500" />;
    } else {
      return <FileCheck className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              <FileCheck className="h-5 w-5 mr-2 text-blue-600" />
              Document Verification
            </DialogTitle>
            <DialogDescription>
              Review agent documents and approve or reject them.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Documents ({mockAgentDocuments.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({mockAgentDocuments.filter(d => d.status === 'pending').length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({mockAgentDocuments.filter(d => d.status === 'approved').length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({mockAgentDocuments.filter(d => d.status === 'rejected').length})</TabsTrigger>
            </TabsList>
            
            <div className="overflow-y-auto flex-1 pr-1">
              {getFilteredDocuments().length > 0 ? (
                <div className="space-y-3">
                  {getFilteredDocuments().map((doc) => (
                    <Card key={doc.id} className="p-4 border shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {getDocumentIcon(doc.fileType)}
                          <div>
                            <h3 className="font-medium flex items-center">
                              {doc.name}
                              {doc.required && (
                                <span className="ml-2 text-xs text-red-500">*Required</span>
                              )}
                            </h3>
                            <div className="flex items-center mt-1 space-x-3 text-sm text-gray-500">
                              <span>Uploaded {formatDistanceToNow(doc.uploadDate, { addSuffix: true })}</span>
                              <span>•</span>
                              <span>By {doc.uploadedBy}</span>
                            </div>
                            {doc.notes && (
                              <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                {doc.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(doc.status)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDocument(doc)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Document
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadDocument(doc.id)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              {doc.status !== 'approved' && (
                                <DropdownMenuItem onClick={() => handleApproveDocument(doc.id)}>
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                  Approve
                                </DropdownMenuItem>
                              )}
                              {doc.status !== 'rejected' && (
                                <DropdownMenuItem onClick={() => handleRejectDocument(doc.id)}>
                                  <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                  Reject
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Add Note
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No documents found in this category.
                </div>
              )}
            </div>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload New Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Document Preview Dialog */}
      {selectedDocument && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Document Preview: {selectedDocument.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-6 bg-gray-50 flex items-center justify-center min-h-[300px]">
                {selectedDocument.fileType.startsWith('image/') ? (
                  <div className="text-center">
                    {/* In a real app, this would show the actual image */}
                    <div className="bg-gray-200 rounded-lg w-full h-48 flex items-center justify-center">
                      <p className="text-gray-500">Image preview would be shown here</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <FileCheck className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-4 text-gray-500">Preview not available for this file type</p>
                    <Button variant="outline" className="mt-4">
                      <Download className="h-4 w-4 mr-2" />
                      Download to View
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Review Notes</h3>
                  <Input 
                    placeholder="Add verification notes here..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => {
                      handleRejectDocument(selectedDocument.id);
                      setIsPreviewOpen(false);
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Document
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => {
                      handleApproveDocument(selectedDocument.id);
                      setIsPreviewOpen(false);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Document
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close Preview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DocumentVerificationDialog;
