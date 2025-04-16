
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Clock, 
  MessageCircle, 
  Plus, 
  FileText, 
  CheckCircle, 
  XCircle,
  Calendar,
  RefreshCcw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

interface CustomerDisputesViewProps {
  customer: any;
  disputes?: any[];
  isLoading?: boolean;
}

const CustomerDisputesView: React.FC<CustomerDisputesViewProps> = ({ 
  customer,
  disputes = [],
  isLoading = false
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [newDisputeOpen, setNewDisputeOpen] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<any | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newMessage, setNewMessage] = useState('');
  
  const filteredDisputes = filter === 'all' 
    ? disputes 
    : disputes.filter(d => d.status === filter);
  
  const handleCreateDispute = () => {
    setNewDisputeOpen(true);
    setTitle('');
    setDescription('');
  };
  
  const handleSubmitDispute = () => {
    if (!title || !description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real implementation, this would create a new dispute in the database
    toast.success("Dispute created successfully", {
      description: "Your dispute has been submitted and will be reviewed by our team."
    });
    
    setNewDisputeOpen(false);
  };
  
  const handleViewDispute = (dispute: any) => {
    setSelectedDispute(dispute);
    setNewMessage('');
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real implementation, this would add a message to the dispute
    toast.success("Message sent", {
      description: "Your message has been added to the dispute thread."
    });
    
    setNewMessage('');
  };
  
  const handleResolveDispute = () => {
    // In a real implementation, this would update the dispute status
    toast.success("Dispute resolved", {
      description: "The dispute has been marked as resolved."
    });
    
    setSelectedDispute(null);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Open</Badge>;
      case 'in-progress':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Disputes & Issues</h3>
        <Button onClick={handleCreateDispute}>
          <Plus className="h-4 w-4 mr-2" />
          New Dispute
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-[100px] w-full" />
            ))}
          </div>
        ) : filteredDisputes.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <div className="mx-auto w-16 h-16 bg-green-50 flex items-center justify-center rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-lg font-medium">No disputes found</h3>
            <p className="text-gray-500 max-w-md mx-auto mt-2">
              {filter === 'all' 
                ? "This customer doesn't have any disputes or issues reported." 
                : `No ${filter} disputes found.`}
            </p>
            <Button className="mt-4" onClick={handleCreateDispute}>
              <Plus className="h-4 w-4 mr-2" />
              Report a New Issue
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDisputes.map(dispute => (
              <Card 
                key={dispute.id} 
                className={cn(
                  "p-4 cursor-pointer hover:shadow-md transition-all",
                  dispute.status === 'open' && "border-l-4 border-l-red-500",
                  dispute.status === 'in-progress' && "border-l-4 border-l-amber-500",
                  dispute.status === 'resolved' && "border-l-4 border-l-green-500"
                )}
                onClick={() => handleViewDispute(dispute)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">{dispute.title}</h4>
                      {getStatusBadge(dispute.status)}
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {dispute.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm text-gray-500">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {format(new Date(dispute.created_at), 'MMM d, yyyy')}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Tabs>
      
      {/* New Dispute Dialog */}
      <Dialog open={newDisputeOpen} onOpenChange={setNewDisputeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Report a New Issue</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title <span className="text-red-500">*</span></Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Brief description of the issue"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">
                Detailed Description <span className="text-red-500">*</span>
              </Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Please provide all relevant details about the issue"
                rows={5}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewDisputeOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitDispute}>
              Submit Issue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dispute Detail Dialog */}
      <Dialog open={!!selectedDispute} onOpenChange={(open) => !open && setSelectedDispute(null)}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span>Dispute Details</span>
                {selectedDispute && getStatusBadge(selectedDispute.status)}
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {selectedDispute && (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="space-y-4 overflow-y-auto flex-1">
                <div>
                  <h3 className="font-medium text-lg">{selectedDispute.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    {format(new Date(selectedDispute.created_at), 'MMM d, yyyy')}
                  </div>
                </div>
                
                <Card className="p-4 bg-gray-50">
                  <p className="text-sm">{selectedDispute.description}</p>
                </Card>
                
                <Separator />
                
                {/* Message Thread (would be real in a full implementation) */}
                <div className="space-y-3">
                  <h4 className="font-medium">Discussion</h4>
                  
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        U
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg rounded-tl-none">
                        <p className="text-sm">{selectedDispute.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {format(new Date(selectedDispute.created_at), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 justify-end">
                      <div className="bg-gray-100 p-3 rounded-lg rounded-tr-none">
                        <p className="text-sm">Thank you for reporting this issue. We'll look into it and get back to you shortly.</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {format(new Date(selectedDispute.created_at), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        A
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex gap-2">
                  <Textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-1"
                    rows={2}
                  />
                  <Button 
                    className="self-end"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    Send
                  </Button>
                </div>
                
                {selectedDispute.status !== 'resolved' && (
                  <div className="flex justify-end mt-4">
                    <Button 
                      variant="outline" 
                      className="text-green-600"
                      onClick={handleResolveDispute}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Resolved
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerDisputesView;
