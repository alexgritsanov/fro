
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, AlertCircle, Upload, MessageSquare } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
  dispute?: any;
}

const DisputeModal = ({ isOpen, onClose, customer, dispute }: DisputeModalProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isEditing = !!dispute;
  
  const [title, setTitle] = useState(dispute?.title || '');
  const [description, setDescription] = useState(dispute?.description || '');
  const [documentId, setDocumentId] = useState(dispute?.document_id || '');
  const [status, setStatus] = useState(dispute?.status || 'open');
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch customer documents
  const { data: documents, isLoading: isLoadingDocuments } = useQuery({
    queryKey: ['customer-documents', customer.id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('customer_documents')
          .select('*')
          .eq('customer_id', customer.id);
          
        if (error) throw error;
        return data || [];
      } catch (error: any) {
        toast({
          title: "Error fetching documents",
          description: error.message,
          variant: "destructive"
        });
        return [];
      }
    }
  });
  
  const handleSave = async () => {
    if (!title || !description) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const disputeData = {
        customer_id: customer.id,
        document_id: documentId || null,
        title,
        description,
        status
      };
      
      let result;
      
      if (isEditing) {
        // Update existing dispute
        const { data, error } = await supabase
          .from('customer_disputes')
          .update(disputeData)
          .eq('id', dispute.id)
          .select();
          
        if (error) throw error;
        result = data;
      } else {
        // Create new dispute
        const { data, error } = await supabase
          .from('customer_disputes')
          .insert(disputeData)
          .select();
          
        if (error) throw error;
        result = data;
        
        // Create initial message
        if (result && result[0]) {
          const { error: messageError } = await supabase
            .from('dispute_messages')
            .insert({
              dispute_id: result[0].id,
              message: `Dispute opened: ${description}`,
              created_by: (await supabase.auth.getUser()).data.user?.id
            });
            
          if (messageError) throw messageError;
        }
      }
      
      toast({
        title: isEditing ? "Dispute updated" : "Dispute created",
        description: `Successfully ${isEditing ? 'updated' : 'created'} dispute "${title}".`
      });
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['customer-disputes', customer.id] });
      queryClient.invalidateQueries({ queryKey: ['dispute-messages'] });
      
      onClose();
    } catch (error: any) {
      toast({
        title: "Error saving dispute",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveAndDiscuss = async () => {
    if (!title || !description) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create/update the dispute first
      const disputeData = {
        customer_id: customer.id,
        document_id: documentId || null,
        title,
        description,
        status
      };
      
      let result;
      
      if (isEditing) {
        // Update existing dispute
        const { data, error } = await supabase
          .from('customer_disputes')
          .update(disputeData)
          .eq('id', dispute.id)
          .select();
          
        if (error) throw error;
        result = data;
      } else {
        // Create new dispute
        const { data, error } = await supabase
          .from('customer_disputes')
          .insert(disputeData)
          .select();
          
        if (error) throw error;
        result = data;
        
        // Create initial message
        if (result && result[0]) {
          const { error: messageError } = await supabase
            .from('dispute_messages')
            .insert({
              dispute_id: result[0].id,
              message: `Dispute opened: ${description}`,
              created_by: (await supabase.auth.getUser()).data.user?.id
            });
            
          if (messageError) throw messageError;
        }
      }
      
      // Store document context in sessionStorage to maintain state across navigation
      const disputeId = isEditing ? dispute.id : (result && result[0].id);
      
      sessionStorage.setItem('chatContext', JSON.stringify({
        documentId: disputeId,
        documentType: 'dispute',
        documentName: title,
        customerId: customer.id,
        customerName: customer.name,
        timestamp: new Date().toISOString()
      }));
      
      // Close the modal
      onClose();
      
      // Navigate to communication tab
      navigate(`/customers/${customer.id}?tab=communication&chatContext=${disputeId}`);
      
      toast({
        title: "Dispute created",
        description: "Dispute created and communication opened."
      });
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['customer-disputes', customer.id] });
      queryClient.invalidateQueries({ queryKey: ['dispute-messages'] });
      
    } catch (error: any) {
      toast({
        title: "Error processing dispute",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            {isEditing ? 'Edit Dispute' : 'Create New Dispute'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter dispute title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe the issue in detail"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="document">Related Document (Optional)</Label>
            <Select value={documentId} onValueChange={setDocumentId}>
              <SelectTrigger id="document">
                <SelectValue placeholder="Select a document" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No document</SelectItem>
                {documents?.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    {doc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {!isEditing && !documents?.length && (
            <div className="bg-blue-50 p-4 rounded-md flex items-start mt-4">
              <FileText className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-700">No documents found</h4>
                <p className="text-sm text-blue-600 mt-1">
                  You can still create a dispute without attaching a document, or you can upload a document first.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={isLoading}
            className="order-2 sm:order-1"
          >
            Cancel
          </Button>
          
          {!isEditing && (
            <Button 
              variant="outline"
              onClick={handleSaveAndDiscuss}
              disabled={isLoading}
              className="order-1 sm:order-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              {isLoading ? 'Processing...' : 'Create & Discuss'}
            </Button>
          )}
          
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className="order-0 sm:order-3"
          >
            {isLoading ? 'Saving...' : (isEditing ? 'Update Dispute' : 'Create Dispute')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisputeModal;
