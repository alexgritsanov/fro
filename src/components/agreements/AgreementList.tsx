import React, { useState, useMemo } from 'react';
import { FileCheck, Plus, MoreHorizontal, ExternalLink, Pencil, Copy, Download, Calendar, DollarSign, CheckCircle2, Clock3, FileText, AlertTriangle, XCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { mockAgreements } from '@/data/mockData';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import AgreementModal from './AgreementModal';
import StatusIndicator from '../StatusIndicator';
import { useNavigate } from 'react-router-dom';
import AgreementCard from './AgreementCard';
import AgreementTable from './AgreementTable';

interface AgreementListProps {
  viewMode: 'grid' | 'list';
  statusFilter: string;
  searchTerm: string;
  showDataOverview: boolean;
  onCloseDataOverview: () => void;
  onCreateAgreement: (customerId?: string, customerName?: string) => void;
}

export const handleEditAgreement = (agreement: any) => {
  toast.success("Editing agreement", {
    description: `Opening editor for "${agreement.title}"`
  });
};

const AgreementList: React.FC<AgreementListProps> = ({
  viewMode,
  statusFilter,
  searchTerm,
  showDataOverview,
  onCloseDataOverview,
  onCreateAgreement
}) => {
  const [editingAgreement, setEditingAgreement] = useState<any | null>(null);
  const [selectedAgreement, setSelectedAgreement] = useState<any | null>(null);
  
  const filteredAgreements = useMemo(() => {
    return mockAgreements.filter(agreement => {
      const matchesStatus = statusFilter === 'all' || agreement.status === statusFilter;
      const matchesSearch = searchTerm === '' || agreement.title.toLowerCase().includes(searchTerm.toLowerCase()) || getCustomerName(agreement).toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchTerm]);
  
  const handleViewAgreement = (agreement: any) => {
    setSelectedAgreement(agreement);
  };
  
  const handleDuplicateAgreement = (agreement: any) => {
    toast.success("Agreement duplicated", {
      description: `A copy of "${agreement.title}" has been created`
    });
  };
  
  const handleDownloadPDF = (agreement: any) => {
    toast.success("Downloading PDF", {
      description: `${agreement.title} will be downloaded shortly`
    });
  };
  
  const handleSendToCustomer = (agreement: any) => {
    toast.success("Agreement sent to customer", {
      description: `${agreement.title} has been sent to ${getCustomerName(agreement)}`
    });
  };

  const getCustomerName = (agreement: any) => {
    if (typeof agreement.customer === 'object' && agreement.customer && agreement.customer.name) {
      return agreement.customer.name;
    } else if (typeof agreement.customer === 'string') {
      return agreement.customer;
    } else if (agreement.customerName) {
      return agreement.customerName;
    } else {
      return 'Unknown Customer';
    }
  };
  
  const getCustomerId = (agreement: any) => {
    if (typeof agreement.customer === 'object' && agreement.customer && agreement.customer.id) {
      return agreement.customer.id;
    } else if (agreement.customer_id) {
      return agreement.customer_id;
    } else {
      return agreement.id;
    }
  };

  const handleStatusChange = (agreement: any, newStatus: string) => {
    toast.success(`Status updated to ${newStatus}`, {
      description: `Agreement ${agreement.id} status has been changed to ${newStatus}.`,
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />
    });
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filteredAgreements.map(agreement => (
              <AgreementCard
                key={agreement.id}
                agreement={agreement}
                onEdit={() => handleEditAgreement(agreement)}
                onStatusChange={(status) => handleStatusChange(agreement, status)}
                onCreateFromTemplate={() => onCreateAgreement(
                  getCustomerId(agreement),
                  getCustomerName(agreement)
                )}
              />
            ))}
          </div>
        ) : (
          <AgreementTable
            agreements={filteredAgreements}
            onEdit={handleEditAgreement}
            onStatusChange={handleStatusChange}
            onCreateFromTemplate={(customerId, customerName) => onCreateAgreement(customerId, customerName)}
          />
        )}
        
        {filteredAgreements.length === 0 && (
          <div className="text-center py-12 border rounded-lg bg-gray-50/50 transition-all duration-200 hover:shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <FileCheck className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium">No agreements found</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              {searchTerm || statusFilter !== 'all' ? "Try changing your search or filter criteria" : "Start by creating a new agreement for a customer"}
            </p>
            <Button className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-md hover:scale-105 transition-all duration-200" onClick={() => onCreateAgreement()}>
              <Plus className="h-4 w-4 mr-2" />
              New Agreement
            </Button>
          </div>
        )}
        
        {editingAgreement && <AgreementModal isOpen={!!editingAgreement} onClose={() => setEditingAgreement(null)} isEditing={true} agreement={editingAgreement} customerId={getCustomerId(editingAgreement)} customerName={getCustomerName(editingAgreement)} />}
        
        {selectedAgreement && <AgreementModal isOpen={!!selectedAgreement} onClose={() => setSelectedAgreement(null)} isEditing={true} agreement={selectedAgreement} customerId={getCustomerId(selectedAgreement)} customerName={getCustomerName(selectedAgreement)} />}
      </div>
    </TooltipProvider>
  );
};

export default AgreementList;
