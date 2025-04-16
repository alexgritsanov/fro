
import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  FileText, 
  Clock,
  Building2,
  FileSignature,
  DollarSign,
  Download,
  Printer,
  Send
} from 'lucide-react';
import StatusIndicator from '@/components/StatusIndicator';
import Card from '@/components/Card';
import { Badge } from '@/components/ui/badge';

interface AgreementDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  agreement: any;
  onEdit: () => void;
}

const AgreementDetails = ({ isOpen, onClose, agreement, onEdit }: AgreementDetailsProps) => {
  const getStatusType = (status: string): any => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'pending';
      case 'expired':
        return 'expired';
      case 'draft':
        return 'draft';
      default:
        return 'neutral';
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md w-[90vw] overflow-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-md flex items-center justify-center">
              <FileText className="h-6 w-6 text-unidoc-primary-blue" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <SheetTitle className="text-left">{agreement.title}</SheetTitle>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <StatusIndicator 
                  status={getStatusType(agreement.status)}
                  withPill
                />
                <Badge variant="outline" className="text-xs">{agreement.id}</Badge>
              </div>
            </div>
          </div>
        </SheetHeader>
        
        <Tabs defaultValue="overview" className="mt-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="terms">Terms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Agreement Details</h3>
              <Card className="p-3 space-y-3">
                <div className="flex items-start">
                  <Building2 className="h-4 w-4 mr-3 text-unidoc-medium mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Customer</p>
                    <p className="text-sm text-unidoc-medium">{agreement.customer}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-4 w-4 mr-3 text-unidoc-medium mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-unidoc-medium">{agreement.created}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-4 w-4 mr-3 text-unidoc-medium mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Expires</p>
                    <p className="text-sm text-unidoc-medium">{agreement.expires}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <DollarSign className="h-4 w-4 mr-3 text-unidoc-medium mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Total Value</p>
                    <p className="text-sm text-unidoc-medium">${agreement.value.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FileSignature className="h-4 w-4 mr-3 text-unidoc-medium mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Signatures</p>
                    <p className="text-sm text-unidoc-medium">
                      {agreement.status === 'active' ? 'Signed by both parties' : 
                       agreement.status === 'pending' ? 'Waiting for customer signature' : 
                       'Not signed yet'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Send className="mr-2 h-4 w-4" />
                  Send to Customer
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Clone
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Activity Timeline</h3>
              <Card className="p-0 divide-y divide-unidoc-light-gray">
                <div className="p-3">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-xs text-unidoc-medium">{agreement.created}</p>
                  </div>
                  <p className="text-xs text-unidoc-medium mt-1">Agreement created by John Doe</p>
                </div>
                
                <div className="p-3">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Sent to Customer</p>
                    <p className="text-xs text-unidoc-medium">May 3, 2023</p>
                  </div>
                  <p className="text-xs text-unidoc-medium mt-1">Sent for approval via email</p>
                </div>
                
                {agreement.status === 'active' && (
                  <div className="p-3">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Approved</p>
                      <p className="text-xs text-unidoc-medium">May 5, 2023</p>
                    </div>
                    <p className="text-xs text-unidoc-medium mt-1">Approved and signed by customer</p>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="mt-4 space-y-4">
            <h3 className="text-sm font-medium mb-2">Services & Pricing</h3>
            
            <div className="space-y-2">
              <Card variant="gradient" className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Regular Maintenance</h4>
                    <p className="text-sm text-unidoc-medium mt-1">Monthly equipment inspection and servicing</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$450 × 12</p>
                    <p className="text-sm text-unidoc-medium mt-1">$5,400</p>
                  </div>
                </div>
              </Card>
              
              <Card variant="gradient" className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Parts Replacement</h4>
                    <p className="text-sm text-unidoc-medium mt-1">Replacement of standard wear parts</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$1,200 × 1</p>
                    <p className="text-sm text-unidoc-medium mt-1">$1,200</p>
                  </div>
                </div>
              </Card>
              
              <Card variant="gradient" className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Emergency Support</h4>
                    <p className="text-sm text-unidoc-medium mt-1">24/7 emergency support service</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$350 × 1</p>
                    <p className="text-sm text-unidoc-medium mt-1">$350</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="flex justify-between px-3 py-2 font-medium">
              <span>Total</span>
              <span>${agreement.value.toLocaleString()}</span>
            </div>
          </TabsContent>
          
          <TabsContent value="terms" className="mt-4">
            <h3 className="text-sm font-medium mb-2">Terms & Conditions</h3>
            <Card className="p-3">
              <div className="prose prose-sm max-w-none">
                <p className="text-sm">
                  <strong>1. SERVICES</strong><br />
                  The Service Provider agrees to provide the services described in this agreement (the "Services") to the Customer according to the terms and specifications set forth in this document.
                </p>
                <p className="text-sm mt-2">
                  <strong>2. COMPENSATION</strong><br />
                  Customer agrees to pay Service Provider the amounts specified in this agreement for the Services provided. Payments are due as specified in the pricing section.
                </p>
                <p className="text-sm mt-2">
                  <strong>3. TERM AND TERMINATION</strong><br />
                  This Agreement shall commence on the Effective Date and shall continue until terminated as provided herein. Either party may terminate this Agreement with thirty (30) days written notice to the other party.
                </p>
                <p className="text-sm mt-2">
                  <strong>4. WARRANTY</strong><br />
                  Service Provider warrants that the Services will be performed in a professional and workmanlike manner in accordance with generally accepted industry standards.
                </p>
                <p className="text-sm mt-2">
                  <strong>5. LIMITATION OF LIABILITY</strong><br />
                  IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA OR USE, INCURRED BY EITHER PARTY OR ANY THIRD PARTY.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        <SheetFooter className="mt-6">
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 w-full">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button onClick={onEdit} className="bg-primary-gradient">Edit Agreement</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AgreementDetails;
