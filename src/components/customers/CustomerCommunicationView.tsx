import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MessageSquare, 
  Send, 
  FileText, 
  PlusCircle, 
  Paperclip, 
  Clock, 
  User, 
  Search,
  MoreHorizontal,
  Download,
  Edit,
  ArrowLeft,
  Check,
  Filter,
  ChevronDown,
  X,
  FileCheck,
  Image,
  Link as LinkIcon,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Avatar from '@/components/Avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import DisputeModal from './DisputeModal';

interface CustomerCommunicationViewProps {
  customer: any;
}

const mockMessages = [
  {
    id: 'msg-1',
    sender: 'John Doe',
    senderRole: 'Account Manager',
    senderIsUser: true,
    content: 'Hello! I wanted to reach out regarding your upcoming service appointment on June 15th. Is there anything specific you\'d like us to address during the visit?',
    timestamp: '2023-06-10T10:30:00',
    read: true
  },
  {
    id: 'msg-2',
    sender: 'Jane Smith',
    senderRole: 'Customer',
    senderIsUser: false,
    content: 'Hi John, thanks for checking in. Yes, we\'ve been having some issues with the hydraulic system that I\'d like your team to take a look at. It seems to be losing pressure intermittently.',
    timestamp: '2023-06-10T11:15:00',
    read: true
  },
  {
    id: 'msg-3',
    sender: 'John Doe',
    senderRole: 'Account Manager',
    senderIsUser: true,
    content: 'I\'ll make sure to note that for our service team. We\'ll bring the appropriate diagnostic equipment to check the hydraulic system thoroughly. Is there a particular time that works best for you on the 15th?',
    timestamp: '2023-06-10T11:30:00',
    read: true
  },
  {
    id: 'msg-4',
    sender: 'Jane Smith',
    senderRole: 'Customer',
    senderIsUser: false,
    content: 'Morning would be preferable, if possible. Our facility is quieter then, which would make it easier for your team to work.',
    timestamp: '2023-06-10T13:45:00',
    read: true
  },
  {
    id: 'msg-5',
    sender: 'John Doe',
    senderRole: 'Account Manager',
    senderIsUser: true,
    content: 'Perfect! I\'ve scheduled the appointment for 9:00 AM on June 15th. You\'ll receive a confirmation email shortly. If you need anything else before then, please don\'t hesitate to reach out.',
    timestamp: '2023-06-10T14:20:00',
    read: true,
    attachments: [
      {
        id: 'attach-1',
        name: 'ServiceConfirmation.pdf',
        type: 'pdf',
        size: '245 KB'
      }
    ]
  },
  {
    id: 'msg-6',
    sender: 'Jane Smith',
    senderRole: 'Customer',
    senderIsUser: false,
    content: 'Received, thank you!',
    timestamp: '2023-06-10T15:05:00',
    read: true
  }
];

const mockDocuments = [
  {
    id: 'doc-1',
    title: 'Customer Onboarding Guide',
    description: 'Standard process document for new customer setup',
    category: 'Process Documentation',
    lastUpdated: '2023-05-12T10:30:00',
    createdBy: 'Sarah Williams',
    format: 'pdf',
    size: '1.2 MB',
    comments: [
      {
        id: 'comment-1',
        user: 'John Doe',
        content: 'Please review the updated payment terms section',
        timestamp: '2023-05-15T14:22:00'
      },
      {
        id: 'comment-2',
        user: 'Lisa Adams',
        content: 'Added the new service tiers information',
        timestamp: '2023-05-18T09:45:00'
      }
    ]
  },
  {
    id: 'doc-2',
    title: 'Service Level Agreement',
    description: 'Current SLA with response time commitments',
    category: 'Legal',
    lastUpdated: '2023-04-30T16:45:00',
    createdBy: 'Mark Thompson',
    format: 'docx',
    size: '890 KB',
    comments: [
      {
        id: 'comment-3',
        user: 'Robert Chen',
        content: 'Legal team has approved this version',
        timestamp: '2023-05-02T11:30:00'
      }
    ]
  },
  {
    id: 'doc-3',
    title: 'Equipment Specification Sheet',
    description: 'Technical specifications for installed equipment',
    category: 'Technical',
    lastUpdated: '2023-06-05T14:15:00',
    createdBy: 'David Miller',
    format: 'xlsx',
    size: '1.5 MB',
    comments: []
  },
  {
    id: 'doc-4',
    title: 'Annual Maintenance Schedule',
    description: 'Planned maintenance dates for the current year',
    category: 'Service Planning',
    lastUpdated: '2023-01-15T09:20:00',
    createdBy: 'Emily Johnson',
    format: 'pdf',
    size: '750 KB',
    comments: [
      {
        id: 'comment-4',
        user: 'John Doe',
        content: 'Updated with the new quarterly schedule',
        timestamp: '2023-03-22T15:10:00'
      }
    ]
  }
];

const CustomerCommunicationView: React.FC<CustomerCommunicationViewProps> = ({ customer }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'documentation'>('chat');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [disputeDocument, setDisputeDocument] = useState<any | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const [documentContext, setDocumentContext] = useState<any | null>(null);
  
  useEffect(() => {
    const contextId = searchParams.get('chatContext');
    
    if (contextId) {
      const storedContext = sessionStorage.getItem('chatContext');
      if (storedContext) {
        try {
          const parsedContext = JSON.parse(storedContext);
          setDocumentContext(parsedContext);
          
          setActiveTab('chat');
          
          setNewMessage(`Regarding ${parsedContext.documentType.replace('-', ' ')}: ${parsedContext.documentName}\n\n`);
          
          sessionStorage.removeItem('chatContext');
        } catch (error) {
          console.error('Error parsing chat context:', error);
        }
      }
    }
  }, [searchParams]);
  
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    console.log('Sending message:', newMessage);
    
    setNewMessage('');
    
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleSendComment = () => {
    if (newComment.trim() === '' || !selectedDocument) return;
    
    console.log('Adding comment to document:', selectedDocument.id, newComment);
    
    setNewComment('');
  };
  
  const handleOpenDispute = (document: any) => {
    setDisputeDocument(document);
    setIsDisputeModalOpen(true);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-10 w-10 text-red-500" />;
      case 'docx':
        return <FileText className="h-10 w-10 text-blue-500" />;
      case 'xlsx':
        return <FileText className="h-10 w-10 text-green-500" />;
      case 'jpg':
      case 'png':
        return <Image className="h-10 w-10 text-purple-500" />;
      default:
        return <FileText className="h-10 w-10 text-gray-500" />;
    }
  };
  
  const groupedMessages: { [key: string]: typeof mockMessages } = {};
  mockMessages.forEach(message => {
    const date = new Date(message.timestamp).toDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Communication</h2>
          <p className="text-sm text-gray-500">
            Manage communications and documentation for {customer.name}
          </p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'chat' | 'documentation')}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="documentation">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {activeTab === 'chat' ? (
        <div className="grid grid-cols-1 gap-6 h-[calc(100vh-300px)] min-h-[500px] bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium">{customer.name}</h3>
                  <p className="text-sm text-gray-500">
                    {customer.status === 'active' ? 'Active Customer' : 'Inactive Customer'}
                  </p>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Search className="h-4 w-4 mr-2" />
                    Search Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export Chat History
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">
                    <X className="h-4 w-4 mr-2" />
                    Clear Conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              {documentContext && (
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-blue-600 mr-2 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-800">
                        Discussion about {documentContext.documentType.replace('-', ' ')}
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        {documentContext.documentName}
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-blue-600">
                          Started {format(new Date(documentContext.timestamp), 'MMM d, yyyy, h:mm a')}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs text-blue-700 hover:text-blue-800 hover:bg-blue-100"
                          onClick={() => setDocumentContext(null)}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Clear context
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {Object.keys(groupedMessages).map(date => (
                <div key={date} className="mb-6">
                  <div className="flex justify-center mb-4">
                    <Badge className="bg-gray-100 text-gray-800 font-normal">
                      {new Date(date).toLocaleDateString(undefined, { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Badge>
                  </div>
                  
                  {groupedMessages[date].map(message => (
                    <div 
                      key={message.id} 
                      className={cn(
                        "mb-4 max-w-[80%]",
                        message.senderIsUser ? "ml-auto" : "mr-auto"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {!message.senderIsUser && (
                          <Avatar alt={message.sender} size="sm" />
                        )}
                        
                        <div>
                          <div 
                            className={cn(
                              "rounded-lg p-3",
                              message.senderIsUser 
                                ? "bg-unidoc-primary-blue text-white" 
                                : "bg-gray-100 text-gray-800"
                            )}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-sm">
                                {message.sender}
                                <span className={cn(
                                  "ml-2 text-xs font-normal",
                                  message.senderIsUser ? "text-blue-100" : "text-gray-500"
                                )}>
                                  {message.senderRole}
                                </span>
                              </span>
                            </div>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-200">
                                {message.attachments.map(attachment => (
                                  <div 
                                    key={attachment.id}
                                    className={cn(
                                      "flex items-center gap-2 p-2 rounded",
                                      message.senderIsUser ? "bg-blue-600" : "bg-gray-200"
                                    )}
                                  >
                                    <FileText className={cn(
                                      "h-4 w-4",
                                      message.senderIsUser ? "text-blue-200" : "text-gray-600"
                                    )} />
                                    <span className="text-sm">{attachment.name}</span>
                                    <span className={cn(
                                      "text-xs",
                                      message.senderIsUser ? "text-blue-200" : "text-gray-500"
                                    )}>
                                      {attachment.size}
                                    </span>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className={cn(
                                        "h-6 w-6 ml-auto",
                                        message.senderIsUser ? "text-blue-200 hover:text-white hover:bg-blue-700" : "text-gray-600 hover:bg-gray-300"
                                      )}
                                    >
                                      <Download className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className={cn(
                            "flex items-center mt-1",
                            message.senderIsUser ? "justify-end" : "justify-start"
                          )}>
                            <Clock className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">
                              {format(new Date(message.timestamp), 'h:mm a')}
                            </span>
                            {message.senderIsUser && message.read && (
                              <Check className="h-3 w-3 text-green-500 ml-1" />
                            )}
                          </div>
                        </div>
                        
                        {message.senderIsUser && (
                          <Avatar alt={message.sender} size="sm" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            
            <div className="border-t p-4">
              <div className="flex items-end gap-2">
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-[80px]"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <div className="flex flex-col gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-9 w-9"
                          onClick={() => setActiveTab('documentation')}
                        >
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Link to document</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    className="h-9 w-9 p-0 bg-unidoc-primary-blue"
                    onClick={handleSendMessage}
                    disabled={newMessage.trim() === ''}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 min-w-0 w-full max-w-md">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input 
                placeholder="Search documents..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Process Documentation">Process</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Service Planning">Service Planning</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4 text-gray-600" />
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-unidoc-primary-blue">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Document</DialogTitle>
                    <DialogDescription>
                      Upload a new document for {customer.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input placeholder="Enter document title" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea placeholder="Enter document description" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Process Documentation">Process Documentation</SelectItem>
                          <SelectItem value="Legal">Legal</SelectItem>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="Service Planning">Service Planning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">File</label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Paperclip className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Drag and drop your file here, or click to browse</p>
                        <Button variant="outline" size="sm">Browse Files</Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" asChild>
                      <DialogClose>Cancel</DialogClose>
                    </Button>
                    <Button type="submit">Upload Document</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {!selectedDocument ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((document) => (
                <Card 
                  key={document.id} 
                  className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedDocument(document)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex">
                      {getFileIcon(document.format)}
                      <div className="ml-3">
                        <CardTitle className="text-base mb-1">{document.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {document.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2 pt-0">
                    <Badge className="mb-2">{document.category}</Badge>
                    <div className="flex justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(new Date(document.lastUpdated), 'MMM dd, yyyy')}
                      </div>
                      <div>{document.size}</div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-3 pb-2 flex justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="h-3 w-3 mr-1" />
                      {document.createdBy}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2 text-xs text-unidoc-primary-blue"
                        onClick={(e) => {
                          e.stopPropagation();
                          sessionStorage.setItem('chatContext', JSON.stringify({
                            documentId: document.id,
                            documentType: document.category.toLowerCase(),
                            documentName: document.title,
                            customerId: customer.id,
                            customerName: customer.name,
                            timestamp: new Date().toISOString()
                          }));
                          setActiveTab('chat');
                          setDocumentContext({
                            documentId: document.id,
                            documentType: document.category.toLowerCase(),
                            documentName: document.title,
                            customerId: customer.id,
                            customerName: customer.name,
                            timestamp: new Date().toISOString()
                          });
                        }}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Discuss
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2 text-xs text-amber-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDispute(document);
                        }}
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Dispute
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 mr-4"
                  onClick={() => setSelectedDocument(null)}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Documents
                </Button>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      {getFileIcon(selectedDocument.format)}
                      <div className="ml-4">
                        <h2 className="text-xl font-semibold mb-1">{selectedDocument.title}</h2>
                        <p className="text-gray-600">{selectedDocument.description}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <Badge>{selectedDocument.category}</Badge>
                          <span className="text-sm text-gray-500">{selectedDocument.size}</span>
                          <span className="text-sm text-gray-500">
                            Updated: {format(new Date(selectedDocument.lastUpdated), 'MMM dd, yyyy')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          sessionStorage.setItem('chatContext', JSON.stringify({
                            documentId: selectedDocument.id,
                            documentType: selectedDocument.category.toLowerCase(),
                            documentName: selectedDocument.title,
                            customerId: customer.id,
                            customerName: customer.name,
                            timestamp: new Date().toISOString()
                          }));
                          setActiveTab('chat');
                          setDocumentContext({
                            documentId: selectedDocument.id,
                            documentType: selectedDocument.category.toLowerCase(),
                            documentName: selectedDocument.title,
                            customerId: customer.id,
                            customerName: customer.name,
                            timestamp: new Date().toISOString()
                          });
                          setSelectedDocument(null);
                        }}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Discuss
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenDispute(selectedDocument)}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Dispute
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon" className="h-9 w-9">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Add Comment
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            <X className="h-4 w-4 mr-2" />
                            Delete Document
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Comments</h3>
                  
                  <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                    {selectedDocument.comments.length > 0 ? (
                      selectedDocument.comments.map((comment: any) => (
                        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <Avatar alt={comment.user} size="sm" className="mr-3" />
                              <div>
                                <div className="font-medium">{comment.user}</div>
                                <div className="text-xs text-gray-500">
                                  {format(new Date(comment.timestamp), 'MMM dd, yyyy h:mm a')}
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="mt-2 text-gray-700">{comment.content}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No comments yet
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <Textarea
                      placeholder="Add a comment..."
                      className="mb-2"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button 
                      className="bg-unidoc-primary-blue"
                      onClick={handleSendComment}
                      disabled={newComment.trim() === ''}
                    >
                      Add Comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {isDisputeModalOpen && disputeDocument && (
        <DisputeModal
          isOpen={isDisputeModalOpen}
          onClose={() => setIsDisputeModalOpen(false)}
          dispute={disputeDocument}
          customer={customer}
        />
      )}
    </div>
  );
};

export default CustomerCommunicationView;
