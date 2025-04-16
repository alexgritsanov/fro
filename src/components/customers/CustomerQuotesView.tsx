import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown,
  Copy,
  Trash2,
  AlertCircle,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format, isBefore } from 'date-fns';
import AgreementModalWrapper from './QuoteModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

interface CustomerQuotesViewProps {
  customer: any;
}

const CustomerQuotesView = ({ customer }: CustomerQuotesViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const navigate = useNavigate();
  
  const { data: quotes, isLoading, refetch } = useQuery({
    queryKey: ['customer-quotes', customer.id],
    queryFn: async () => {
      try {
        console.log('Fetching quotes for customer:', customer.id);
        
        const { data, error } = await supabase
          .from('customer_quotes')
          .select('*')
          .eq('customer_id', customer.id);
          
        if (error) {
          console.error('Error from Supabase:', error);
          throw error;
        }
        
        console.log('Received quotes from Supabase:', data);
        
        const now = new Date();
        const updatedQuotes = (data || []).map(quote => {
          if (quote.status === 'sent' && quote.valid_until && isBefore(new Date(quote.valid_until), now)) {
            updateQuoteStatus(quote.id, 'expired');
            return { ...quote, status: 'expired' };
          }
          return quote;
        });
        
        return updatedQuotes;
      } catch (error: any) {
        console.error('Error fetching price agreements:', error);
        toast.error("Error fetching price agreements", {
          description: error.message
        });
        return [];
      }
    }
  });

  const updateQuoteStatus = async (quoteId: string, status: string) => {
    try {
      console.log(`Updating quote status for ID ${quoteId} to ${status}`);
      
      const { error } = await supabase
        .from('customer_quotes')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', quoteId);
        
      if (error) {
        console.error('Error updating quote status:', error);
        throw error;
      }
      
      console.log('Quote status updated successfully');
    } catch (error: any) {
      console.error('Error updating quote status:', error);
    }
  };

  const handleCreateQuote = () => {
    console.log('Opening modal to create new quote for customer:', customer.id);
    setSelectedQuote(null);
    setShowQuoteModal(true);
  };
  
  const handleEditQuote = (quote: any) => {
    console.log('Opening modal to edit quote:', quote);
    setSelectedQuote(quote);
    setShowQuoteModal(true);
  };
  
  const handleDeleteQuote = async (quoteId: string) => {
    try {
      console.log('Deleting quote with ID:', quoteId);
      
      const { error } = await supabase
        .from('customer_quotes')
        .delete()
        .eq('id', quoteId);
        
      if (error) {
        console.error('Error deleting quote:', error);
        throw error;
      }
      
      console.log('Quote deleted successfully, refreshing data');
      refetch();
      
      toast.success("Price agreement deleted", {
        description: "The price agreement has been successfully deleted."
      });
    } catch (error: any) {
      console.error('Error in handleDeleteQuote:', error);
      toast.error("Error deleting price agreement", {
        description: error.message
      });
    }
  };
  
  const handleDuplicateQuote = (quote: any) => {
    const duplicatedQuote = {
      ...quote,
      id: undefined,
      title: `${quote.title} (Copy)`,
      status: 'draft',
      created_at: new Date().toISOString()
    };
    setSelectedQuote(duplicatedQuote);
    setShowQuoteModal(true);
  };
  
  const handleSortChange = (column: 'date' | 'amount') => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };
  
  const handleUpdateStatus = async (quoteId: string, status: string) => {
    try {
      await updateQuoteStatus(quoteId, status);
      refetch();
      
      toast.success(`Price agreement marked as ${status}`, {
        description: `The price agreement status has been updated to ${status}.`
      });
    } catch (error: any) {
      toast.error("Error updating status", {
        description: error.message
      });
    }
  };
  
  const navigateToAgreements = () => {
    navigate('/agreements');
  };
  
  const filteredQuotes = (quotes || [])
    .filter(quote => 
      quote.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus ? quote.status === selectedStatus : true)
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return sortOrder === 'asc'
          ? Number(a.amount) - Number(b.amount)
          : Number(b.amount) - Number(a.amount);
      }
    });
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'sent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'expired':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const needsQuoteAlert = customer.needs_quote && (quotes || []).length === 0;
  
  return (
    <div className="space-y-4">
      {needsQuoteAlert && (
        <Alert className="bg-amber-50 border-amber-200 cursor-pointer" onClick={handleCreateQuote}>
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 flex items-center justify-between">
            <span>This customer needs a price agreement. Click here to create one.</span>
            <Button variant="outline" size="sm" className="ml-2 bg-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Agreement
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 min-w-0 w-full">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-unidoc-medium" />
          <Input 
            placeholder="Search price agreements..." 
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                <span>Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                className={!selectedStatus ? "bg-unidoc-light-gray/50" : ""}
                onClick={() => setSelectedStatus(null)}
              >
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className={selectedStatus === 'draft' ? "bg-unidoc-light-gray/50" : ""}
                onClick={() => setSelectedStatus('draft')}
              >
                Draft
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={selectedStatus === 'sent' ? "bg-unidoc-light-gray/50" : ""}
                onClick={() => setSelectedStatus('sent')}
              >
                Sent
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={selectedStatus === 'approved' ? "bg-unidoc-light-gray/50" : ""}
                onClick={() => setSelectedStatus('approved')}
              >
                Approved
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={selectedStatus === 'rejected' ? "bg-unidoc-light-gray/50" : ""}
                onClick={() => setSelectedStatus('rejected')}
              >
                Rejected
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={selectedStatus === 'expired' ? "bg-unidoc-light-gray/50" : ""}
                onClick={() => setSelectedStatus('expired')}
              >
                Expired
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="sm:ml-2 flex-shrink-0" onClick={handleCreateQuote}>
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Create Agreement</span>
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((_, index) => (
            <Card key={index} className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-10 w-10 rounded-md flex-shrink-0" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </Card>
          ))}
        </div>
      ) : filteredQuotes.length > 0 ? (
        <div className="space-y-3">
          {filteredQuotes.map((quote) => (
            <Card key={quote.id} className="p-4 hover:shadow-sm transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-unidoc-primary-blue/10 flex items-center justify-center text-unidoc-primary-blue">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{quote.title}</h3>
                    <p className="text-sm text-unidoc-medium">
                      Created on {format(new Date(quote.created_at), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={getStatusBadgeClass(quote.status)}
                  >
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                          <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditQuote(quote)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Edit Agreement
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateQuote(quote)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      {quote.status === 'draft' && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(quote.id, 'sent')}>
                          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                          Send to Customer
                        </DropdownMenuItem>
                      )}
                      {quote.status === 'sent' && (
                        <>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(quote.id, 'approved')}>
                            <Check className="mr-2 h-4 w-4 text-green-600" />
                            Mark as Approved
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(quote.id, 'rejected')}>
                            <svg className="mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            Mark as Rejected
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDeleteQuote(quote.id)} 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-unidoc-medium mr-2" />
                  <div>
                    <div className="text-sm text-unidoc-medium">Amount</div>
                    <div className="font-medium">${Number(quote.amount).toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-unidoc-medium mr-2" />
                  <div>
                    <div className="text-sm text-unidoc-medium">Valid Until</div>
                    <div className="font-medium">
                      {quote.valid_until 
                        ? format(new Date(quote.valid_until), 'MMM d, yyyy')
                        : 'N/A'}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-auto"
                    onClick={() => handleEditQuote(quote)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <FileText className="mx-auto h-12 w-12 text-unidoc-light-gray" />
          <h3 className="mt-4 text-lg font-medium">No price agreements found</h3>
          <p className="mt-1 text-unidoc-medium">
            {searchTerm || selectedStatus
              ? "Try changing your search or filter criteria"
              : "Get started by creating a new price agreement for this customer"}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
            <Button onClick={handleCreateQuote}>
              <Plus className="h-4 w-4 mr-2" />
              Create Agreement
            </Button>
            <Button variant="outline" onClick={navigateToAgreements}>
              View All Agreements
            </Button>
          </div>
        </div>
      )}
      
      {showQuoteModal && (
        <AgreementModalWrapper
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
          customerId={customer.id}
          quote={selectedQuote}
          onComplete={refetch}
        />
      )}
    </div>
  );
};

export default CustomerQuotesView;
