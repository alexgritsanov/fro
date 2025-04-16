
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Send, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  User,
  MoreVertical,
  Paperclip,
  FileText,
  X,
  Link
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserCommunicationProps {
  user: User | null;
}

const UserCommunication = ({ user }: UserCommunicationProps) => {
  if (!user) return <div>No user selected</div>;
  
  const [newMessage, setNewMessage] = useState('');
  const [searchParams] = useSearchParams();
  const [documentContext, setDocumentContext] = useState<any | null>(null);
  
  // Check for document context in URL params or session storage
  useEffect(() => {
    const contextId = searchParams.get('chatContext');
    
    if (contextId) {
      // Retrieve context from session storage
      const storedContext = sessionStorage.getItem('chatContext');
      if (storedContext) {
        try {
          const parsedContext = JSON.parse(storedContext);
          setDocumentContext(parsedContext);
          
          // Prepare default message with document context
          setNewMessage(`Regarding ${parsedContext.documentType.replace('-', ' ')}: ${parsedContext.documentName}\n\n`);
          
          // Clear session storage to prevent reuse
          sessionStorage.removeItem('chatContext');
        } catch (error) {
          console.error('Error parsing chat context:', error);
        }
      }
    }
  }, [searchParams]);
  
  // Mock communication history
  const communications = [
    {
      id: 'c1',
      type: 'email',
      subject: 'Schedule Confirmation',
      message: 'This email confirms your scheduled service call for tomorrow at 10:00 AM.',
      date: '2023-11-25',
      time: '15:30',
      status: 'sent',
      sender: 'System'
    },
    {
      id: 'c2',
      type: 'sms',
      subject: null,
      message: 'Your technician is on the way and will arrive in approximately 20 minutes.',
      date: '2023-11-20',
      time: '09:45',
      status: 'sent',
      sender: 'System'
    },
    {
      id: 'c3',
      type: 'email',
      subject: 'Service Report',
      message: 'Please find attached the detailed service report from your recent maintenance visit.',
      date: '2023-11-18',
      time: '14:15',
      status: 'sent',
      sender: 'Alex Thompson'
    },
    {
      id: 'c4',
      type: 'message',
      subject: null,
      message: 'I need to reschedule the appointment for next week. Is Tuesday morning available?',
      date: '2023-11-10',
      time: '11:20',
      status: 'received',
      sender: user.name
    }
  ];
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // In a real app, this would send the message to the backend
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully."
    });
    
    // Clear the input
    setNewMessage('');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h2 className="text-xl font-semibold">Communication</h2>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <Phone className="h-4 w-4" />
            <span>SMS</span>
          </Button>
          
          <Button 
            size="sm"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Message</span>
          </Button>
        </div>
      </div>
      
      <div className="relative w-full max-w-md">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input 
          placeholder="Search communications..." 
          className="pl-10"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold">Communication History</h3>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </Button>
          </div>
          
          <ScrollArea className="h-[400px]">
            <div className="divide-y">
              {communications.map((comm) => (
                <div key={comm.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      comm.type === 'email' ? 'bg-blue-100' :
                      comm.type === 'sms' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {comm.type === 'email' ? (
                        <Mail className="h-5 w-5 text-blue-600" />
                      ) : comm.type === 'sms' ? (
                        <Phone className="h-5 w-5 text-green-600" />
                      ) : (
                        <MessageSquare className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          {comm.subject && (
                            <h4 className="font-medium text-gray-900">{comm.subject}</h4>
                          )}
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <span>{comm.status === 'sent' ? 'From:' : 'To:'}</span>
                            <span className="font-medium">
                              {comm.status === 'sent' ? comm.sender : user.name}
                            </span>
                          </div>
                        </div>
                        
                        <Badge variant="outline" className={`text-xs ${
                          comm.type === 'email' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          comm.type === 'sms' ? 'bg-green-50 text-green-700 border-green-200' :
                          'bg-purple-50 text-purple-700 border-purple-200'
                        }`}>
                          {comm.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{comm.message}</p>
                      
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(comm.date), 'MMM dd, yyyy')}</span>
                        <Clock className="h-3 w-3 ml-1" />
                        <span>{comm.time}</span>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Reply</DropdownMenuItem>
                        <DropdownMenuItem>Forward</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">New Message</h3>
          </div>
          
          <div className="p-4 flex-1">
            {/* Document Context Banner - only shown when referencing a document */}
            {documentContext && (
              <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-800">
                      Discussion about {documentContext.documentType.replace('-', ' ')}
                    </h4>
                    <p className="text-sm text-blue-700">
                      {documentContext.documentName}
                    </p>
                    <div className="mt-2 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs text-blue-700 hover:text-blue-800 hover:bg-blue-100"
                        onClick={() => setDocumentContext(null)}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Clear reference
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-shrink-0">
                <span className="text-sm font-medium">To:</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center bg-blue-50 text-blue-700 rounded-full pl-2 pr-3 py-1 text-sm w-fit">
                  <User className="h-3.5 w-3.5 mr-1" />
                  <span>{user.name}</span>
                </div>
              </div>
            </div>
            
            <Input 
              placeholder="Subject (optional)" 
              className="mb-4"
            />
            
            <Textarea 
              placeholder="Type your message here..." 
              className="min-h-[150px] mb-4"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-2" />
                  <span>Attach</span>
                </Button>
                
                <Button variant="outline" size="sm">
                  <Link className="h-4 w-4 mr-2" />
                  <span>Link Document</span>
                </Button>
              </div>
              
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                <span>Send Message</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCommunication;
