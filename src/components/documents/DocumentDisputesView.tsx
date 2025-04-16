import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  AlertCircle, 
  MessageSquare, 
  User, 
  Plus, 
  Send,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import DocumentChatButton from '@/components/documents/DocumentChatButton';

interface DocumentDisputesViewProps {
  documentId: string;
  documentType: 'service-call' | 'certificate';
  documentNumber: string;
  customerId?: string;
  customerName?: string;
  showDisputeForm: boolean;
  onToggleDisputeForm: () => void;
}

const DocumentDisputesView: React.FC<DocumentDisputesViewProps> = ({
  documentId,
  documentType,
  documentNumber,
  customerId,
  customerName,
  showDisputeForm,
  onToggleDisputeForm
}) => {
  const [newDisputeTitle, setNewDisputeTitle] = useState('');
  const [newDisputeMessage, setNewDisputeMessage] = useState('');
  const [selectedDispute, setSelectedDispute] = useState<any | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const mockDisputes = [
    {
      id: '1',
      title: 'Incorrect service hours',
      status: 'open',
      created_at: new Date().toISOString(),
      created_by: 'John Doe',
      customer_id: customerId,
      description: 'The service hours recorded do not match our records.'
    },
    {
      id: '2',
      title: 'Material quantity dispute',
      status: 'in-progress',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      created_by: 'Jane Smith',
      customer_id: customerId,
      description: 'We received less material than what was documented.'
    }
  ];
  
  const mockMessages = [
    {
      id: '1',
      dispute_id: '1',
      message: 'I believe there was an error in recording the service hours. Our records show 4 hours but the certificate shows 6 hours.',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      created_by: 'John Doe',
      is_admin: false
    },
    {
      id: '2',
      dispute_id: '1',
      message: 'Thank you for bringing this to our attention. I\'ll review our records and get back to you shortly.',
      created_at: new Date(Date.now() - 43200000).toISOString(),
      created_by: 'Admin User',
      is_admin: true
    },
    {
      id: '3',
      dispute_id: '2',
      message: 'The delivery certificate shows 20 cubic meters of concrete, but we only received approximately 18 cubic meters.',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      created_by: 'Jane Smith',
      is_admin: false
    }
  ];
  
  const disputes = mockDisputes;
  const isLoadingDisputes = false;
  const messages = mockMessages.filter(msg => msg.dispute_id === selectedDispute?.id);
  const isLoadingMessages = false;
  
  const handleCreateDispute = async () => {
    if (!newDisputeTitle.trim() || !newDisputeMessage.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      toast.success('Dispute created successfully');
      setNewDisputeTitle('');
      setNewDisputeMessage('');
      onToggleDisputeForm();
      
      const newDispute = {
        id: (disputes.length + 1).toString(),
        title: newDisputeTitle,
        status: 'open',
        created_at: new Date().toISOString(),
        created_by: 'Current User',
        customer_id: customerId,
        description: newDisputeMessage
      };
    } catch (error: any) {
      toast.error('Error creating dispute');
    }
  };
  
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedDispute) return;
    
    try {
      toast.success('Message sent');
      setNewMessage('');
    } catch (error: any) {
      toast.error('Error sending message');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
            Disputes
          </h2>
          <p className="text-sm text-gray-500">
            View and manage disputes for document #{documentNumber}
          </p>
        </div>
        
        {!showDisputeForm && (
          <Button onClick={onToggleDisputeForm}>
            <Plus className="h-4 w-4 mr-2" />
            New Dispute
          </Button>
        )}
      </div>
      
      {showDisputeForm && (
        <Card className="p-4">
          <h3 className="font-medium mb-4">Create New Dispute</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Dispute Title</label>
              <Input
                placeholder="Enter a title for this dispute"
                value={newDisputeTitle}
                onChange={(e) => setNewDisputeTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe the issue in detail..."
                value={newDisputeMessage}
                onChange={(e) => setNewDisputeMessage(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onToggleDisputeForm}>
                Cancel
              </Button>
              <Button onClick={handleCreateDispute}>
                Submit Dispute
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-4">
          <h3 className="font-medium text-gray-500">Dispute List</h3>
          
          {isLoadingDisputes ? (
            <div className="space-y-3">
              {[1, 2, 3].map((_, i) => (
                <Card key={i} className="p-3">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </Card>
              ))}
            </div>
          ) : disputes.length > 0 ? (
            <div className="space-y-2">
              {disputes.map((dispute) => (
                <Card 
                  key={dispute.id} 
                  className={cn(
                    "p-3 cursor-pointer hover:border-blue-200 transition-colors",
                    selectedDispute?.id === dispute.id ? "border-blue-400 bg-blue-50" : ""
                  )}
                  onClick={() => setSelectedDispute(dispute)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{dispute.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={
                        dispute.status === 'open' ? "bg-amber-100 text-amber-800 border-amber-200" :
                        dispute.status === 'in-progress' ? "bg-blue-100 text-blue-800 border-blue-200" :
                        dispute.status === 'resolved' ? "bg-green-100 text-green-800 border-green-200" :
                        "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {dispute.status.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(dispute.created_at), 'MMM d, yyyy')}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">No disputes found</p>
            </Card>
          )}
        </div>
        
        <div className="md:col-span-2">
          {selectedDispute ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">
                  Dispute: {selectedDispute.title}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={
                      selectedDispute.status === 'open' ? "bg-amber-100 text-amber-800 border-amber-200" :
                      selectedDispute.status === 'in-progress' ? "bg-blue-100 text-blue-800 border-blue-200" :
                      selectedDispute.status === 'resolved' ? "bg-green-100 text-green-800 border-green-200" :
                      "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  >
                    {selectedDispute.status.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Badge>
                  
                  {customerId && (
                    <DocumentChatButton
                      documentId={selectedDispute.id}
                      documentType="dispute"
                      documentName={selectedDispute.title}
                      customerId={customerId}
                      customerName={customerName}
                      size="sm"
                      variant="outline"
                      className="ml-2"
                      hideLabel={true}
                    />
                  )}
                </div>
              </div>
              
              <Card className="p-4 bg-gray-50">
                <p className="text-sm whitespace-pre-line">{selectedDispute.description}</p>
              </Card>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </h3>
                
                {isLoadingMessages ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-16 w-full rounded-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          message.is_admin ? "flex-row" : "flex-row-reverse"
                        )}
                      >
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full",
                          message.is_admin ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                        )}>
                          <User className="h-4 w-4" />
                        </div>
                        
                        <div className={cn(
                          "rounded-lg p-3 max-w-[80%]",
                          message.is_admin ? "bg-blue-50 border border-blue-100" : "bg-gray-50 border border-gray-100"
                        )}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">
                              {message.is_admin ? 'Support Team' : message.created_by}
                            </span>
                            <span className="text-xs text-gray-500">
                              {format(new Date(message.created_at), 'MMM d, h:mm a')}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <MessageSquare className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500">No messages yet</p>
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  <Input
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <AlertCircle className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-700">Select a Dispute</h3>
                <p className="text-gray-500 max-w-md mx-auto mt-1">
                  Select a dispute from the list to view the conversation and details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentDisputesView;
