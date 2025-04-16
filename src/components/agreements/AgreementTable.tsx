
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, MoreHorizontal, Pencil, Copy, Download, Send, ExternalLink, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow, format, isValid } from 'date-fns';
import StatusIndicator from '@/components/StatusIndicator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn, formatDateSafely, formatTimeAgoSafely } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface AgreementTableProps {
  agreements: any[];
  onEdit: (agreement: any) => void;
  onStatusChange: (agreement: any, status: string) => void;
  onCreateFromTemplate: (customerId: string, customerName: string) => void;
}

const AgreementTable: React.FC<AgreementTableProps> = ({
  agreements,
  onEdit,
  onStatusChange,
  onCreateFromTemplate
}) => {
  // This function is optional and only shown when appropriate
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || value === null) return '---';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
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

  const handleApproveAgreement = (agreement: any, e: React.MouseEvent) => {
    e.stopPropagation();
    onStatusChange(agreement, 'active');
    toast.success(`Agreement approved`, {
      description: `Agreement with ${getCustomerName(agreement)} has been approved.`
    });
  };

  const handleRejectAgreement = (agreement: any, e: React.MouseEvent) => {
    e.stopPropagation();
    onStatusChange(agreement, 'rejected');
    toast.success(`Agreement rejected`, {
      description: `Agreement with ${getCustomerName(agreement)} has been rejected.`
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold">Agreement Title</TableHead>
            <TableHead className="font-semibold">Customer</TableHead>
            <TableHead className="font-semibold w-[120px]">Status</TableHead>
            <TableHead className="font-semibold text-right">Created</TableHead>
            <TableHead className="font-semibold text-right">Expires</TableHead>
            <TableHead className="w-[180px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agreements.map((agreement) => (
            <TableRow 
              key={agreement.id} 
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="font-medium group">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    agreement.status === 'active' && "bg-green-500",
                    agreement.status === 'pending' && "bg-amber-500",
                    agreement.status === 'draft' && "bg-blue-500",
                    agreement.status === 'expired' && "bg-red-500",
                    agreement.status === 'rejected' && "bg-gray-400",
                  )}></span>
                  <span className="group-hover:underline">{agreement.title}</span>
                  {agreement.notes && (
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-gray-400 text-xs">ℹ</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{agreement.notes}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  ID: {agreement.id.substring(0, 8)}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{getCustomerName(agreement)}</div>
                {agreement.location && (
                  <div className="text-xs text-gray-500">{agreement.location}</div>
                )}
                {agreement.contact && (
                  <div className="text-xs text-gray-500">{agreement.contact}</div>
                )}
              </TableCell>
              <TableCell>
                <StatusIndicator status={agreement.status} />
              </TableCell>
              <TableCell className="text-right text-sm">
                <div className="flex flex-col items-end">
                  <div>{formatDateSafely(new Date(agreement.created || agreement.createdAt || agreement.created_at))}</div>
                  <div className="text-xs text-gray-500">{formatTimeAgoSafely(new Date(agreement.created || agreement.createdAt || agreement.created_at))}</div>
                </div>
              </TableCell>
              <TableCell className="text-right text-sm">
                <div className="flex flex-col items-end">
                  <div>{formatDateSafely(new Date(agreement.expires || agreement.expiresAt || agreement.valid_until))}</div>
                  <div className={cn(
                    "text-xs",
                    new Date(agreement.expires || agreement.expiresAt || agreement.valid_until) < new Date() ? "text-red-500" : "text-gray-500"
                  )}>
                    {formatTimeAgoSafely(new Date(agreement.expires || agreement.expiresAt || agreement.valid_until))}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 border-green-200 hover:bg-green-50 hover:text-green-700"
                        onClick={(e) => handleApproveAgreement(agreement, e)}
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="sr-only">Approve</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Approve Agreement</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 border-red-200 hover:bg-red-50 hover:text-red-700"
                        onClick={(e) => handleRejectAgreement(agreement, e)}
                      >
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="sr-only">Reject</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Reject Agreement</TooltipContent>
                  </Tooltip>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8"
                    onClick={() => onEdit(agreement)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8"
                    onClick={() => onCreateFromTemplate(getCustomerId(agreement), getCustomerName(agreement))}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Use as Template</span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[160px]">
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" />
                        <span>Send to Customer</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download PDF</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        <span>Open Preview</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AgreementTable;
