
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertCircle, FileWarning, CheckCircle, Search, Clock, 
  X, Upload, Send, FileText, ChevronRight, Filter, Download,
  Mail, UserCheck, RefreshCw 
} from 'lucide-react';
import Avatar from '@/components/Avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DocumentRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserWithMissingDocuments {
  id: string;
  name: string;
  userType: 'client' | 'employee' | 'subcontractor' | 'foreman';
  email: string;
  documents: {
    name: string;
    required: boolean;
    status: 'missing' | 'expired' | 'expiring' | 'valid';
    dueDate?: string;
  }[];
  progress: number;
}

const userTypeColors = {
  client: 'amber',
  employee: 'green',
  subcontractor: 'purple',
  foreman: 'indigo'
};

const DocumentRequiredModal = ({ isOpen, onClose }: DocumentRequiredModalProps) => {
  const [activeTab, setActiveTab] = useState('missing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('all');
  const { toast } = useToast();
  
  // Mock data for users with missing documents
  const usersWithMissingDocs: UserWithMissingDocuments[] = [
    {
      id: '1',
      name: 'John Smith',
      userType: 'employee',
      email: 'john.smith@example.com',
      documents: [
        { name: 'Employment Contract', required: true, status: 'missing' },
        { name: 'ID Document', required: true, status: 'valid' },
        { name: 'Health Insurance', required: true, status: 'missing' },
        { name: 'Driver License', required: false, status: 'missing' }
      ],
      progress: 25
    },
    {
      id: '2',
      name: 'ABC Company',
      userType: 'client',
      email: 'contact@abccompany.com',
      documents: [
        { name: 'Company Registration', required: true, status: 'missing' },
        { name: 'Tax Documentation', required: true, status: 'missing' },
        { name: 'Customer Agreement', required: true, status: 'valid' }
      ],
      progress: 33
    },
    {
      id: '3',
      name: 'Sarah Wilson',
      userType: 'employee',
      email: 'sarah.wilson@example.com',
      documents: [
        { name: 'Employment Contract', required: true, status: 'missing' },
        { name: 'ID Document', required: true, status: 'expired', dueDate: '3 days ago' },
        { name: 'Certifications', required: false, status: 'valid' }
      ],
      progress: 33
    },
    {
      id: '4',
      name: 'Global Contractors',
      userType: 'subcontractor',
      email: 'info@globalcontractors.com',
      documents: [
        { name: 'Contractor Agreement', required: true, status: 'missing' },
        { name: 'Insurance Certificate', required: true, status: 'expiring', dueDate: 'in 5 days' },
        { name: 'Business License', required: true, status: 'valid' }
      ],
      progress: 33
    },
    {
      id: '5',
      name: 'David Thompson',
      userType: 'foreman',
      email: 'david.thompson@example.com',
      documents: [
        { name: 'ID Document', required: true, status: 'missing' },
        { name: 'Safety Certification', required: true, status: 'expired', dueDate: '10 days ago' },
        { name: 'Position Agreement', required: true, status: 'missing' }
      ],
      progress: 0
    },
  ];
  
  const filteredUsers = usersWithMissingDocs.filter(user => {
    // Filter by search query
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by user type
    if (selectedUserType !== 'all' && user.userType !== selectedUserType) {
      return false;
    }
    
    // Filter by document status based on active tab
    if (activeTab === 'missing' && !user.documents.some(doc => doc.status === 'missing')) {
      return false;
    } else if (activeTab === 'expired' && !user.documents.some(doc => doc.status === 'expired')) {
      return false;
    } else if (activeTab === 'expiring' && !user.documents.some(doc => doc.status === 'expiring')) {
      return false;
    }
    
    return true;
  });
  
  const handleRequestDocument = (userId: string, userName: string) => {
    toast({
      title: "Document Request Sent",
      description: `Email sent to ${userName} to upload missing documents`,
    });
  };
  
  const handleUploadDocument = (userId: string, documentName: string) => {
    toast({
      title: "Upload Document",
      description: `Upload ${documentName} for user`,
    });
  };
  
  const handleSendReminder = (userId: string, userName: string) => {
    toast({
      title: "Reminder Sent",
      description: `Reminder sent to ${userName}`,
    });
  };
  
  const handleBulkRequest = () => {
    toast({
      title: "Bulk Request Sent",
      description: `Document requests sent to ${filteredUsers.length} users`,
    });
  };
  
  const getMissingDocumentsCount = (user: UserWithMissingDocuments) => {
    return user.documents.filter(doc => doc.status === 'missing').length;
  };
  
  const getExpiredDocumentsCount = (user: UserWithMissingDocuments) => {
    return user.documents.filter(doc => doc.status === 'expired').length;
  };
  
  const getExpiringDocumentsCount = (user: UserWithMissingDocuments) => {
    return user.documents.filter(doc => doc.status === 'expiring').length;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl flex items-center">
            <FileWarning className="mr-2 h-5 w-5 text-amber-500" />
            Document Requirements
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            View and manage users with missing or expired documents
          </p>
        </DialogHeader>

        <div className="px-6 pt-2">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                type="search" 
                className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Search users..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedUserType} onValueChange={setSelectedUserType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All User Types</SelectItem>
                <SelectItem value="client">Clients</SelectItem>
                <SelectItem value="employee">Employees</SelectItem>
                <SelectItem value="subcontractor">Subcontractors</SelectItem>
                <SelectItem value="foreman">Foremen</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="missing" className="flex items-center">
                <FileWarning className="h-4 w-4 mr-2 text-amber-500" />
                Missing
                <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">
                  {usersWithMissingDocs.filter(u => u.documents.some(d => d.status === 'missing')).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="expired" className="flex items-center">
                <X className="h-4 w-4 mr-2 text-red-500" />
                Expired
                <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100">
                  {usersWithMissingDocs.filter(u => u.documents.some(d => d.status === 'expired')).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="expiring" className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-orange-500" />
                Expiring Soon
                <Badge className="ml-2 bg-orange-100 text-orange-800 hover:bg-orange-100">
                  {usersWithMissingDocs.filter(u => u.documents.some(d => d.status === 'expiring')).length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          
            <TabsContent value="missing">
              <div className="flex items-center justify-between px-6 pt-4">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredUsers.length}</span> users
                </p>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={handleBulkRequest}
                  >
                    <Send className="h-3.5 w-3.5" />
                    Request All
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Export
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="expired">
              <div className="flex items-center justify-between px-6 pt-4">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredUsers.length}</span> users
                </p>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={handleBulkRequest}
                  >
                    <Send className="h-3.5 w-3.5" />
                    Request All
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Export
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="expiring">
              <div className="flex items-center justify-between px-6 pt-4">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredUsers.length}</span> users
                </p>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={handleBulkRequest}
                  >
                    <Send className="h-3.5 w-3.5" />
                    Request All
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Export
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <ScrollArea className="flex-1 mt-4 px-6 pb-6 max-h-[calc(90vh-220px)]">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedUserType('all');
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map(user => (
                <Card key={user.id} className="p-4 border">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center">
                      <Avatar alt={user.name} className="mr-3" />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          <Badge className={`ml-2 bg-${userTypeColors[user.userType]}-100 text-${userTypeColors[user.userType]}-800`}>
                            {user.userType}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs flex items-center gap-1"
                        onClick={() => handleRequestDocument(user.id, user.name)}
                      >
                        <Mail className="h-3.5 w-3.5" />
                        Request
                      </Button>
                      
                      <Button 
                        size="sm" 
                        className="text-xs bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
                        onClick={() => handleUploadDocument(user.id, 'document')}
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-gray-500">Document Completion</span>
                      <span className="font-medium">{user.progress}%</span>
                    </div>
                    <Progress value={user.progress} className="h-2" />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {user.documents.map((doc, i) => (
                      <div 
                        key={i}
                        className={`flex items-start justify-between p-3 rounded-lg border ${
                          doc.status === 'missing' ? 'border-amber-200 bg-amber-50' :
                          doc.status === 'expired' ? 'border-red-200 bg-red-50' :
                          doc.status === 'expiring' ? 'border-orange-200 bg-orange-50' :
                          'border-green-200 bg-green-50'
                        }`}
                      >
                        <div className="flex items-start">
                          {doc.status === 'missing' ? (
                            <FileWarning className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                          ) : doc.status === 'expired' ? (
                            <X className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          ) : doc.status === 'expiring' ? (
                            <Clock className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          )}
                          
                          <div>
                            <p className={`text-sm font-medium ${
                              doc.status === 'missing' ? 'text-amber-800' :
                              doc.status === 'expired' ? 'text-red-800' :
                              doc.status === 'expiring' ? 'text-orange-800' :
                              'text-green-800'
                            }`}>
                              {doc.name}
                            </p>
                            
                            {doc.required && (
                              <span className="text-xs bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-600 mt-1 inline-block">
                                Required
                              </span>
                            )}
                            
                            {doc.dueDate && (
                              <p className={`text-xs mt-1 ${
                                doc.status === 'expired' ? 'text-red-600' : 'text-orange-600'
                              }`}>
                                {doc.status === 'expired' ? 'Expired ' : 'Expires '}{doc.dueDate}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {doc.status !== 'valid' && (
                          <Button 
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleUploadDocument(user.id, doc.name)}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="link"
                      size="sm"
                      className="text-blue-600 flex items-center"
                      onClick={() => handleSendReminder(user.id, user.name)}
                    >
                      Send Reminder
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {filteredUsers.length > 0 && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <UserCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-blue-800">Need to collect documents from multiple users?</p>
                  <p className="text-sm text-blue-600 mt-1">
                    You can send automated email requests to all users with missing documents. The system will track responses and notify you when documents are uploaded.
                  </p>
                  <Button 
                    className="mt-3 bg-blue-600 hover:bg-blue-700"
                    onClick={handleBulkRequest}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Bulk Document Request
                  </Button>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentRequiredModal;
