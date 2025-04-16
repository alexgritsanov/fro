
import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  AlertCircle, 
  FileText, 
  MessageSquare, 
  Clock, 
  Send,
  Download,
  User
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Avatar from '@/components/Avatar';

interface DisputeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dispute: any;
}

const DisputeDetailsModal = ({ isOpen, onClose, dispute }: DisputeDetailsModalProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fetch dispute messages
  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['dispute-messages', dispute.id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('dispute_messages')
          .select('*')
          .eq('dispute_id', dispute.id)
          .order('created_at', { ascending: true });
          
        if (error) throw error;
        return data || [];
      } catch (error: any) {
        toast({
          title: "Error fetching messages",
          description: error.message,
          variant: "destructive"
        });
        return [];
      }
    }
  });
  
  // Fetch associated document if any
  const { data: document, isLoading: isLoadingDocument } = useQuery({
    queryKey: ['document', dispute.document_id],
    queryFn: async () => {
      if (!dispute.document_id) return null;
      
      try {
        const { data, error } = await supabase
          .from('customer_documents')
          .select('*')
          .eq('id', dispute.document_id)
          .single();
          
        if (error) throw error;
        return data;
      } catch (error: any) {
        toast({
          title: "Error fetching document",
          description: error.message,
          variant: "destructive"
        });
        return null;
      }
    },
    enabled: !!dispute.document_id
  });
  
  // Scroll to bottom when new messages are loaded
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setIsSending(true);
    
    try {
      const { error } = await supabase
        .from('dispute_messages')
        .insert({
          dispute_id: dispute.id,
          message: newMessage,
          created_by: (await supabase.auth.getUser()).data.user?.id
        });
        
      if (error) throw error;
      
      // Clear input and refresh messages
      setNewMessage('');
      queryClient.invalidateQueries({ queryKey: ['dispute-messages', dispute.id] });
      
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const handleStartCommunication = () => {
    // Store document context in sessionStorage to maintain state across navigation
    sessionStorage.setItem('chatContext', JSON.stringify({
      documentId: dispute.id,
      documentType: 'dispute',
      documentName: dispute.title,
      customerId: dispute.customer_id,
      customerName: "Customer", // In a real app, fetch the customer name
      timestamp: new Date().toISOString()
    }));
    
    // Close the modal
    onClose();
    
    // Navigate to communication tab
    navigate(`/customers/${dispute.customer_id}?tab=communication&chatContext=${dispute.id}`);
    
    toast({
      title: "Chat opened",
      description: "Starting conversation about this dispute."
    });
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const formatStatusLabel = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <AlertCircle className="mr-2 h-5 w-5" />
            Dispute Details
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="conversation" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="conversation">Conversation</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent 
            value="conversation" 
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {isLoadingMessages ? (
                Array(3).fill(null).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-16 w-full rounded-lg" />
                    </div>
                  </div>
                ))
              ) : messages && messages.length > 0 ? (
                <>
                  {messages.map((message, index) => (
                    <div key={index} className="flex gap-3">
                      <Avatar alt="User" size="sm" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">User</span>
                          <span className="text-xs text-unidoc-medium">
                            {format(new Date(message.created_at), 'MMM d, yyyy h:mm a')}
                          </span>
                        </div>
                        <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                          {message.message}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-unidoc-light-gray mx-auto mb-3" />
                  <h3 className="text-lg font-medium">No messages yet</h3>
                  <p className="text-unidoc-medium mt-1">
                    Start the conversation by sending a message.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isSending}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isSending || !newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6 overflow-auto p-1">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{dispute.title}</h3>
                  <div className="text-sm text-unidoc-medium">
                    Created on {format(new Date(dispute.created_at), 'MMMM d, yyyy')}
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={getStatusBadgeClass(dispute.status)}
                >
                  {formatStatusLabel(dispute.status)}
                </Badge>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <Card className="p-3 bg-gray-50">
                  <p className="whitespace-pre-line">{dispute.description}</p>
                </Card>
              </div>
              
              {dispute.document_id && (
                <>
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Related Document</h4>
                    {isLoadingDocument ? (
                      <Card className="p-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-10 w-10 rounded-md" />
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                      </Card>
                    ) : document ? (
                      <Card className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-700">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <h5 className="font-medium">{document.name}</h5>
                              <p className="text-sm text-unidoc-medium">
                                {document.file_type?.toUpperCase() || 'DOCUMENT'} • {document.size ? `${(document.size / 1024).toFixed(0)} KB` : 'Unknown size'}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </Card>
                    ) : (
                      <Card className="p-4 text-center text-unidoc-medium">
                        Document not found or was removed.
                      </Card>
                    )}
                  </div>
                </>
              )}
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Timeline</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">Dispute Created</div>
                      <div className="text-sm text-unidoc-medium">
                        {format(new Date(dispute.created_at), 'MMMM d, yyyy h:mm a')}
                      </div>
                    </div>
                  </div>
                  
                  {messages && messages.length > 0 && (
                    <div className="flex gap-3">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">First Response</div>
                        <div className="text-sm text-unidoc-medium">
                          {format(new Date(messages[0].created_at), 'MMMM d, yyyy h:mm a')}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {dispute.status !== 'open' && (
                    <div className="flex gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center",
                        dispute.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        dispute.status === 'resolved' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      )}>
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">Status Changed to {formatStatusLabel(dispute.status)}</div>
                        <div className="text-sm text-unidoc-medium">
                          {format(new Date(dispute.updated_at), 'MMMM d, yyyy h:mm a')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="border-t pt-3">
          <Button variant="outline" className="mr-2" onClick={onClose}>
            Close
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleStartCommunication}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Start Communication
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisputeDetailsModal;
