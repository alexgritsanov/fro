
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  FileText,
  Plus,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Download,
  ExternalLink,
  Copy,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import QuoteModal from './QuoteModal';
import { toast } from 'sonner';
import { mockAgreements } from '@/data/mockData';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';

interface CustomerAgreementsViewProps {
  customer: any;
  agreements: any[];
  isLoading: boolean;
}

const CustomerAgreementsView: React.FC<CustomerAgreementsViewProps> = ({
  customer,
  agreements,
  isLoading
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingAgreement, setEditingAgreement] = useState<any | null>(null);
  const [viewingAgreement, setViewingAgreement] = useState<any | null>(null);
  
  const customerAgreements = agreements.length > 0 
    ? agreements
    : mockAgreements.filter(a => a.customer_id === customer.id);
    
  const filteredAgreements = filter === 'all' 
    ? customerAgreements
    : customerAgreements.filter(agr => agr.status === filter);
  
  const handleCreateAgreement = () => {
    setCreateModalOpen(true);
  };
  
  const handleEditAgreement = (agreement: any) => {
    setEditingAgreement(agreement);
  };
  
  const handleViewAgreement = (agreement: any) => {
    setViewingAgreement(agreement);
  };
  
  const handleClosePriceAgreement = () => {
    setCreateModalOpen(false);
    setEditingAgreement(null);
  };
  
  const handleCloseViewAgreement = () => {
    setViewingAgreement(null);
  };
  
  const handleDownload = (agreement: any) => {
    toast.success(`Downloading price agreement: ${agreement.title}`, {
      description: "Your file will be ready shortly."
    });
  };
  
  const handleDuplicate = (agreement: any) => {
    toast.success(`Duplicated price agreement: ${agreement.title}`, {
      description: "You can now edit the duplicate version."
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'draft':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Draft</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Expired</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Price Agreements</h3>
        <Button onClick={handleCreateAgreement}>
          <Plus className="h-4 w-4 mr-2" />
          New Agreement
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        
        <TabsContent value={filter}>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                  <div className="mt-4 flex gap-4">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredAgreements.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <div className="mx-auto w-16 h-16 bg-blue-50 flex items-center justify-center rounded-full mb-4">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium">No agreements found</h3>
              <p className="text-gray-500 max-w-md mx-auto mt-2">
                {filter === 'all' 
                  ? "This customer doesn't have any price agreements yet." 
                  : `No ${filter} agreements found.`}
              </p>
              <Button className="mt-4" onClick={handleCreateAgreement}>
                <Plus className="h-4 w-4 mr-2" />
                Create a Price Agreement
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAgreements.map(agreement => (
                <Card key={agreement.id} className={cn(
                  "p-5 transition-all hover:shadow-md cursor-pointer",
                  agreement.status === 'active' && "border-l-4 border-l-green-500",
                  agreement.status === 'draft' && "border-l-4 border-l-amber-500",
                  agreement.status === 'expired' && "border-l-4 border-l-red-500",
                  agreement.status === 'pending' && "border-l-4 border-l-blue-500"
                )}
                onClick={() => handleViewAgreement(agreement)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-lg">{agreement.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {format(new Date(agreement.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(agreement.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleViewAgreement(agreement);
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Document
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleEditAgreement(agreement);
                          }}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Edit Agreement
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(agreement);
                          }}>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicate(agreement);
                          }}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Valid Until</p>
                        <p className="text-sm font-medium">
                          {agreement.valid_until ? format(new Date(agreement.valid_until), 'MMM d, yyyy') : 'No expiration date'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="text-sm font-medium capitalize">{agreement.status}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t pt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {agreement.description ? (
                        <span className="line-clamp-1">{agreement.description}</span>
                      ) : (
                        <span className="italic">No description provided</span>
                      )}
                    </div>
                    <Button size="sm" variant="outline" onClick={(e) => {
                      e.stopPropagation();
                      handleEditAgreement(agreement);
                    }}>
                      Edit Agreement
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {(createModalOpen || editingAgreement) && (
        <QuoteModal 
          isOpen={createModalOpen || !!editingAgreement} 
          onClose={handleClosePriceAgreement}
          onComplete={handleClosePriceAgreement}
          customerId={customer.id}
          customerName={customer.name}
          fromCustomerCreation={false}
          quote={editingAgreement}
        />
      )}
      
      {/* PDF Viewer Dialog */}
      {viewingAgreement && (
        <Dialog open={!!viewingAgreement} onOpenChange={handleCloseViewAgreement}>
          <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  {viewingAgreement.title}
                </div>
                {getStatusBadge(viewingAgreement.status)}
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex-1 overflow-hidden rounded-lg border bg-white min-h-[60vh] flex flex-col">
              <div className="bg-gray-100 p-2 flex justify-between items-center border-b">
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <span className="text-xs">100%</span>
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDownload(viewingAgreement)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto p-4 flex justify-center">
                <div className="w-full max-w-[800px] bg-white shadow-lg p-8 rounded-lg">
                  {/* Document Preview */}
                  <div className="mb-10 text-center">
                    <h2 className="text-2xl font-bold mb-2">PRICE AGREEMENT</h2>
                    <p className="text-gray-600">Agreement #{viewingAgreement.id}</p>
                  </div>
                  
                  <div className="mb-8 flex justify-between">
                    <div>
                      <h3 className="font-bold mb-2">PROVIDER:</h3>
                      <p>Your Company Name</p>
                      <p>123 Business Avenue</p>
                      <p>Tech City, CA 94103</p>
                      <p>contact@yourcompany.com</p>
                    </div>
                    
                    <div className="text-right">
                      <h3 className="font-bold mb-2">CLIENT:</h3>
                      <p>{customer.name}</p>
                      <p>{customer.address || "Client Address"}</p>
                      <p>{customer.phone || "Client Phone"}</p>
                      <p>{customer.email || "Client Email"}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="border-b pb-2 mb-4">
                      <h3 className="font-bold">AGREEMENT DETAILS</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Agreement ID:</p>
                        <p className="font-medium">{viewingAgreement.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Created:</p>
                        <p className="font-medium">{format(new Date(viewingAgreement.created_at), 'MMM d, yyyy')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Valid Until:</p>
                        <p className="font-medium">
                          {viewingAgreement.valid_until ? format(new Date(viewingAgreement.valid_until), 'MMM d, yyyy') : 'No expiration date'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status:</p>
                        <p className="font-medium capitalize">{viewingAgreement.status}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="border-b pb-2 mb-4">
                      <h3 className="font-bold">SERVICES & RATES</h3>
                    </div>
                    
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="p-2 border">Service</th>
                          <th className="p-2 border">Unit</th>
                          <th className="p-2 border">Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border">Concrete Pumping</td>
                          <td className="p-2 border">Per Hour</td>
                          <td className="p-2 border">$150.00</td>
                        </tr>
                        <tr>
                          <td className="p-2 border">Equipment Rental</td>
                          <td className="p-2 border">Per Day</td>
                          <td className="p-2 border">$750.00</td>
                        </tr>
                        <tr>
                          <td className="p-2 border">Labor</td>
                          <td className="p-2 border">Per Hour</td>
                          <td className="p-2 border">$65.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mb-6">
                    <div className="border-b pb-2 mb-4">
                      <h3 className="font-bold">TERMS & CONDITIONS</h3>
                    </div>
                    
                    <div className="text-sm space-y-2">
                      <p>1. This agreement is valid for the period specified above.</p>
                      <p>2. Rates are subject to availability and may change with written notice.</p>
                      <p>3. Payment terms: Net 30 days from invoice date.</p>
                      <p>4. Cancellation policy: 24-hour notice required; otherwise, a fee equal to 50% of the service rate may apply.</p>
                      <p>5. All services are subject to our standard terms and conditions.</p>
                    </div>
                  </div>
                  
                  <div className="mt-10 pt-6 border-t grid grid-cols-2 gap-8">
                    <div>
                      <p className="font-medium mb-6">FOR PROVIDER:</p>
                      <div className="h-10 border-b mb-2"></div>
                      <p className="text-sm">Authorized Signature</p>
                      <p className="text-sm text-gray-500 mt-4">Date: _____________</p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-6">FOR CLIENT:</p>
                      <div className="h-10 border-b mb-2"></div>
                      <p className="text-sm">Authorized Signature</p>
                      <p className="text-sm text-gray-500 mt-4">Date: _____________</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                This is a preview of the agreement document.
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleCloseViewAgreement}>
                  Close
                </Button>
                <Button onClick={() => handleDownload(viewingAgreement)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CustomerAgreementsView;
