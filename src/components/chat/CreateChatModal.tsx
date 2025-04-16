
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Users, FileText, X, ChevronRight, Building, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from '@/components/ui/card';

interface User {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  status: 'online' | 'offline' | 'away';
}

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
}

interface Folder {
  id: string;
  name: string;
  count: number;
  documents: Document[];
}

interface Customer {
  id: string;
  name: string;
  avatar?: string;
  folders: Folder[];
}

interface CreateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChat: (type: 'direct' | 'group' | 'document', data: any) => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({
  isOpen,
  onClose,
  onCreateChat
}) => {
  const [activeTab, setActiveTab] = useState<'direct' | 'group' | 'document'>('direct');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [documentStep, setDocumentStep] = useState<'customer' | 'folder' | 'document'>('customer');
  
  // Enhanced mock data with customers, folders and documents
  const mockCustomers: Customer[] = [
    {
      id: 'c1',
      name: 'Acme Corporation',
      folders: [
        {
          id: 'folder-1',
          name: 'Price Agreements',
          count: 2,
          documents: [
            { id: 'doc-1', name: 'Price Agreement 2024', type: 'price-agreement', date: '2024-01-15' },
            { id: 'doc-2', name: 'Special Conditions', type: 'price-agreement', date: '2024-01-15' }
          ]
        },
        {
          id: 'folder-2',
          name: 'Service Calls',
          count: 3,
          documents: [
            { id: 'doc-3', name: 'Service Call #SC-1234', type: 'service-call', date: '2024-03-15' },
            { id: 'doc-4', name: 'Service Call #SC-1235', type: 'service-call', date: '2024-04-20' },
            { id: 'doc-5', name: 'Service Call #SC-1236', type: 'service-call', date: '2024-05-05' }
          ]
        },
        {
          id: 'folder-3',
          name: 'Delivery Certificates',
          count: 3,
          documents: [
            { id: 'doc-6', name: 'Delivery Certificate #DC-1234', type: 'certificate', date: '2024-03-16' },
            { id: 'doc-7', name: 'Delivery Certificate #DC-1235', type: 'certificate', date: '2024-04-21' },
            { id: 'doc-8', name: 'Delivery Certificate #DC-1236', type: 'certificate', date: '2024-05-06' }
          ]
        },
        {
          id: 'folder-4',
          name: 'Invoices',
          count: 3,
          documents: [
            { id: 'doc-9', name: 'Invoice #INV-2345', type: 'invoice', date: '2024-03-20' },
            { id: 'doc-10', name: 'Invoice #INV-2346', type: 'invoice', date: '2024-04-25' },
            { id: 'doc-11', name: 'Invoice #INV-2347', type: 'invoice', date: '2024-05-10' }
          ]
        },
        {
          id: 'folder-5',
          name: 'Reports',
          count: 2,
          documents: [
            { id: 'doc-12', name: 'Monthly Report - March', type: 'report', date: '2024-03-31' },
            { id: 'doc-13', name: 'Monthly Report - April', type: 'report', date: '2024-04-30' }
          ]
        }
      ]
    },
    {
      id: 'c2',
      name: 'TechStart Inc.',
      folders: [
        {
          id: 'folder-6',
          name: 'Price Agreements',
          count: 1,
          documents: [
            { id: 'doc-14', name: 'Price Agreement 2024', type: 'price-agreement', date: '2024-02-10' }
          ]
        },
        {
          id: 'folder-7',
          name: 'Service Calls',
          count: 2,
          documents: [
            { id: 'doc-15', name: 'Service Call #SC-2001', type: 'service-call', date: '2024-03-25' },
            { id: 'doc-16', name: 'Service Call #SC-2002', type: 'service-call', date: '2024-04-15' }
          ]
        }
      ]
    }
  ];
  
  // Mock data for users with enhanced user roles
  const mockUsers: User[] = [
    { id: 'u1', name: 'Alice Smith', role: 'Operator', status: 'online' },
    { id: 'u2', name: 'Bob Johnson', role: 'Admin', status: 'away' },
    { id: 'u3', name: 'Charlie Brown', role: 'Customer', status: 'offline' },
    { id: 'u4', name: 'Diana Evans', role: 'Foreman', status: 'online' },
    { id: 'u5', name: 'Edward Miller', role: 'Subcontractor', status: 'offline' },
    { id: 'u6', name: 'Frank Wilson', role: 'Office', status: 'online' },
    { id: 'u7', name: 'Grace Taylor', role: 'Operator', status: 'away' },
    { id: 'u8', name: 'Henry Davis', role: 'Admin', status: 'offline' },
    { id: 'u9', name: 'Irene Clark', role: 'Customer', status: 'online' },
    { id: 'u10', name: 'Jack Lewis', role: 'Foreman', status: 'offline' },
  ];
  
  const availableRoles = ['all', 'Admin', 'Office', 'Foreman', 'Operator', 'Subcontractor', 'Customer'];
  
  // Reset document workflow state when changing tabs
  useEffect(() => {
    if (activeTab === 'document') {
      setDocumentStep('customer');
      setSelectedCustomer(null);
      setSelectedFolder(null);
      setSelectedDocument(null);
    }
  }, [activeTab]);
  
  const filteredUsers = mockUsers.filter(user => {
    if (roleFilter !== 'all' && user.role !== roleFilter) return false;
    
    if (!searchTerm) return true;
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.role.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const filteredCustomers = mockCustomers.filter(customer => {
    if (!searchTerm) return true;
    return customer.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const filteredFolders = selectedCustomer?.folders.filter(folder => {
    if (!searchTerm) return true;
    return folder.name.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];
  
  const filteredDocuments = selectedFolder?.documents.filter(doc => {
    if (!searchTerm) return true;
    return doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           doc.type.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];
  
  const toggleUserSelection = (user: User) => {
    if (activeTab === 'direct') {
      setSelectedUsers([user]);
      return;
    }
    
    if (selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };
  
  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDocumentStep('folder');
    setSearchTerm('');
  };
  
  const selectFolder = (folder: Folder) => {
    setSelectedFolder(folder);
    setDocumentStep('document');
    setSearchTerm('');
  };
  
  const selectDocument = (document: Document) => {
    setSelectedDocument(document);
  };
  
  const goBackToCustomers = () => {
    setDocumentStep('customer');
    setSelectedCustomer(null);
    setSelectedFolder(null);
    setSelectedDocument(null);
    setSearchTerm('');
  };
  
  const goBackToFolders = () => {
    setDocumentStep('folder');
    setSelectedFolder(null);
    setSelectedDocument(null);
    setSearchTerm('');
  };
  
  const removeSelectedUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== userId));
  };
  
  const clearSelection = () => {
    setSelectedUsers([]);
    setSelectedDocument(null);
    setSelectedCustomer(null);
    setSelectedFolder(null);
    setGroupName('');
    setGroupDescription('');
    setDocumentStep('customer');
  };
  
  const handleCreateChat = () => {
    if (activeTab === 'direct' && selectedUsers.length > 0) {
      onCreateChat('direct', { participant: selectedUsers[0] });
    } else if (activeTab === 'group' && selectedUsers.length > 0) {
      onCreateChat('group', {
        name: groupName || `Group (${selectedUsers.length} members)`,
        description: groupDescription,
        members: selectedUsers
      });
    } else if (activeTab === 'document' && selectedDocument && selectedCustomer) {
      onCreateChat('document', {
        document: {
          ...selectedDocument,
          customerName: selectedCustomer.name
        },
        participants: selectedUsers.length > 0 ? selectedUsers : []
      });
    }
    
    clearSelection();
    onClose();
  };
  
  const isCreateDisabled = () => {
    if (activeTab === 'direct') return selectedUsers.length === 0;
    if (activeTab === 'group') return selectedUsers.length === 0;
    if (activeTab === 'document') return !selectedDocument;
    return true;
  };
  
  const renderDocumentWorkflow = () => {
    if (documentStep === 'customer') {
      return (
        <div className="space-y-1">
          <div className="mb-3">
            <h3 className="text-sm font-medium mb-1 text-blue-700">Step 1: Select Customer</h3>
            <p className="text-xs text-gray-500">Choose a customer to browse their documents</p>
          </div>
          
          {filteredCustomers.length === 0 ? (
            <p className="text-center py-4 text-gray-500">No customers found</p>
          ) : (
            filteredCustomers.map(customer => (
              <div
                key={customer.id}
                className="flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 border border-gray-200"
                onClick={() => selectCustomer(customer)}
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-500 flex items-center justify-center text-white font-semibold mr-3">
                  {customer.name.charAt(0)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{customer.name}</h4>
                  <p className="text-xs text-gray-500">{customer.folders.reduce((sum, folder) => sum + folder.count, 0)} documents</p>
                </div>
                
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))
          )}
        </div>
      );
    }
    
    if (documentStep === 'folder' && selectedCustomer) {
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 h-8"
              onClick={goBackToCustomers}
            >
              <X className="h-4 w-4" />
              <span>Back</span>
            </Button>
            
            <div>
              <h3 className="text-sm font-medium text-blue-700">Step 2: Select Folder</h3>
              <div className="flex items-center">
                <p className="text-xs text-gray-500">Browsing documents for</p>
                <Badge variant="outline" className="ml-1 text-xs font-normal">{selectedCustomer.name}</Badge>
              </div>
            </div>
          </div>
          
          {filteredFolders.length === 0 ? (
            <p className="text-center py-4 text-gray-500">No folders found</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {filteredFolders.map(folder => (
                <Card 
                  key={folder.id} 
                  className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => selectFolder(folder)}
                >
                  <div className="flex items-center">
                    <div className="bg-blue-50 rounded-lg p-2 mr-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{folder.name}</p>
                      <p className="text-xs text-gray-500">{folder.count} documents</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    if (documentStep === 'document' && selectedFolder) {
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 h-8"
              onClick={goBackToFolders}
            >
              <X className="h-4 w-4" />
              <span>Back</span>
            </Button>
            
            <div>
              <h3 className="text-sm font-medium text-blue-700">Step 3: Select Document</h3>
              <div className="flex items-center">
                <p className="text-xs text-gray-500">Browsing</p>
                <Badge variant="outline" className="mx-1 text-xs font-normal">{selectedFolder.name}</Badge>
                <p className="text-xs text-gray-500">for</p>
                <Badge variant="outline" className="ml-1 text-xs font-normal">{selectedCustomer?.name}</Badge>
              </div>
            </div>
          </div>
          
          {filteredDocuments.length === 0 ? (
            <p className="text-center py-4 text-gray-500">No documents found</p>
          ) : (
            filteredDocuments.map(document => (
              <div
                key={document.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedDocument?.id === document.id 
                    ? 'bg-blue-50 border-blue-200 border' 
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
                onClick={() => selectDocument(document)}
              >
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{document.name}</h4>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs">
                      {document.type.replace('-', ' ')}
                    </Badge>
                    <span className="text-xs text-gray-500 ml-2">{document.date}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create New Conversation</DialogTitle>
        </DialogHeader>
        
        <Tabs 
          value={activeTab} 
          onValueChange={(v) => {
            setActiveTab(v as 'direct' | 'group' | 'document');
            clearSelection();
          }}
          className="w-full"
        >
          <TabsList className="w-full">
            <TabsTrigger value="direct" className="flex-1">
              Direct Message
            </TabsTrigger>
            <TabsTrigger value="group" className="flex-1">
              Group Chat
            </TabsTrigger>
            <TabsTrigger value="document" className="flex-1">
              Document Discussion
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="direct" className="mt-4 space-y-4">
            {/* Selection Area for Direct Messages */}
            {selectedUsers.length > 0 && (
              <div className="p-3 border rounded-md border-blue-200 bg-blue-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-blue-800">Selected</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                    onClick={clearSelection}
                  >
                    Clear
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedUsers.map(user => (
                    <Badge 
                      key={user.id} 
                      variant="secondary"
                      className="flex items-center gap-1 py-1 pl-1 pr-2"
                    >
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-[8px] bg-blue-100 text-blue-700">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[150px]">{user.name}</span>
                      <span className="text-xs text-gray-500 ml-1 truncate max-w-[60px]">({user.role})</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 rounded-full hover:bg-blue-200"
                        onClick={() => removeSelectedUser(user.id)}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Search and Role Filter */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder={`Search users...`}
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select 
                value={roleFilter} 
                onValueChange={setRoleFilter}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map(role => (
                    <SelectItem key={role} value={role}>
                      {role === 'all' ? 'All Roles' : role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* User List */}
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-2">
                {filteredUsers.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No users found</p>
                ) : (
                  filteredUsers.map(user => (
                    <div
                      key={user.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedUsers.some(u => u.id === user.id) 
                          ? 'bg-blue-50 border-blue-200 border' 
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                      onClick={() => toggleUserSelection(user)}
                    >
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{user.name}</h4>
                          <div className="flex items-center">
                            <span className={`h-2 w-2 rounded-full ${
                              user.status === 'online' ? 'bg-green-500' : 
                              user.status === 'away' ? 'bg-yellow-500' : 
                              'bg-gray-400'
                            }`} />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-xs mr-2">
                            {user.role}
                          </Badge>
                          <p className="text-sm text-gray-600">{user.status}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="group" className="mt-4 space-y-4">
            {/* Group Settings */}
            <div className="p-3 border rounded-md border-gray-200 space-y-3">
              <div>
                <Label htmlFor="group-name">Group Name</Label>
                <Input 
                  id="group-name" 
                  placeholder="Enter group name" 
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="group-description">Description (optional)</Label>
                <Textarea 
                  id="group-description" 
                  placeholder="What's this group about?" 
                  rows={2}
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                />
              </div>
            </div>
            
            {/* Selected Users */}
            {selectedUsers.length > 0 && (
              <div className="p-3 border rounded-md border-purple-200 bg-purple-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-purple-800">Selected Members ({selectedUsers.length})</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs text-purple-700 hover:text-purple-900 hover:bg-purple-100"
                    onClick={clearSelection}
                  >
                    Clear
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedUsers.map(user => (
                    <Badge 
                      key={user.id} 
                      variant="secondary"
                      className="flex items-center gap-1 py-1 pl-1 pr-2 bg-purple-100"
                    >
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-[8px] bg-purple-200 text-purple-700">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[150px]">{user.name}</span>
                      <span className="text-xs text-gray-500 ml-1 truncate max-w-[60px]">({user.role})</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 rounded-full hover:bg-purple-200"
                        onClick={() => removeSelectedUser(user.id)}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Search and Role Filter */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder={`Search users...`}
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select 
                value={roleFilter} 
                onValueChange={setRoleFilter}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map(role => (
                    <SelectItem key={role} value={role}>
                      {role === 'all' ? 'All Roles' : role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* User List */}
            <ScrollArea className="h-[250px] pr-4">
              <div className="space-y-2">
                {filteredUsers.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No users found</p>
                ) : (
                  filteredUsers.map(user => (
                    <div
                      key={user.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedUsers.some(u => u.id === user.id) 
                          ? 'bg-purple-50 border-purple-200 border' 
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                      onClick={() => toggleUserSelection(user)}
                    >
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{user.name}</h4>
                          <div className="flex items-center">
                            <span className={`h-2 w-2 rounded-full ${
                              user.status === 'online' ? 'bg-green-500' : 
                              user.status === 'away' ? 'bg-yellow-500' : 
                              'bg-gray-400'
                            }`} />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-xs mr-2">
                            {user.role}
                          </Badge>
                          <p className="text-sm text-gray-600">{user.status}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="document" className="mt-4 space-y-4">
            {/* Selected Document */}
            {selectedDocument && selectedCustomer && (
              <div className="p-3 border rounded-md border-amber-200 bg-amber-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-amber-800">Selected Document</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                    onClick={() => setSelectedDocument(null)}
                  >
                    Clear
                  </Button>
                </div>
                
                <div className="flex items-start mt-2">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-amber-600" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-amber-900">{selectedDocument.name}</p>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs border-amber-200 text-amber-700">
                        {selectedDocument.type.replace('-', ' ')}
                      </Badge>
                      <span className="text-xs text-amber-700 ml-2">{selectedDocument.date}</span>
                    </div>
                    <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
                      <Building className="h-3 w-3 mr-1" />
                      {selectedCustomer.name}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
            
            {/* Selected Users (Optional) */}
            {selectedUsers.length > 0 && (
              <div className="p-3 border rounded-md border-amber-200 bg-amber-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-amber-800">Invite Participants (Optional)</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                    onClick={() => setSelectedUsers([])}
                  >
                    Clear
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedUsers.map(user => (
                    <Badge 
                      key={user.id} 
                      variant="secondary"
                      className="flex items-center gap-1 py-1 pl-1 pr-2 bg-amber-100"
                    >
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-[8px] bg-amber-200 text-amber-700">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[150px]">{user.name}</span>
                      <span className="text-xs text-amber-700 ml-1 truncate max-w-[60px]">({user.role})</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 rounded-full hover:bg-amber-200"
                        onClick={() => removeSelectedUser(user.id)}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Document Workflow Search */}
            {(documentStep === 'customer' || documentStep === 'folder' || documentStep === 'document') && (
              <div className="relative mb-2">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder={
                    documentStep === 'customer' ? "Search customers..." :
                    documentStep === 'folder' ? "Search folders..." :
                    "Search documents..."
                  }
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
            
            {/* Document Selection Workflow */}
            <ScrollArea className="h-[350px] pr-4">
              {renderDocumentWorkflow()}
            </ScrollArea>
            
            {/* Invite Participants Section */}
            {selectedDocument && (
              <div className="p-3 border rounded-md border-gray-200">
                <div className="flex items-center mb-2">
                  <UserIcon className="h-4 w-4 text-gray-500 mr-2" />
                  <h3 className="text-sm font-medium">Invite Participants (Optional)</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search users to invite..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select 
                    value={roleFilter} 
                    onValueChange={setRoleFilter}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map(role => (
                        <SelectItem key={role} value={role}>
                          {role === 'all' ? 'All Roles' : role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mt-2 max-h-[150px] overflow-y-auto">
                  {filteredUsers.slice(0, 4).map(user => (
                    <div
                      key={user.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                        selectedUsers.some(u => u.id === user.id) 
                          ? 'bg-amber-50 border-amber-200 border' 
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                      onClick={() => toggleUserSelection(user)}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-xs">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-xs">
                            {user.role}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleCreateChat}
            disabled={isCreateDisabled()}
            className={activeTab === 'direct' ? 'bg-blue-600 hover:bg-blue-700' : 
                     activeTab === 'group' ? 'bg-purple-600 hover:bg-purple-700' : 
                     'bg-amber-600 hover:bg-amber-700'}
          >
            {activeTab === 'direct' ? 'Start Chat' : 
             activeTab === 'group' ? 'Create Group' : 
             'Start Discussion'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatModal;
