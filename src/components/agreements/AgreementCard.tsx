
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar, FileText, ChevronRight, MoreHorizontal, Copy, Pencil, Download, Send, CheckCircle, Clock, AlertTriangle, XCircle, Building, Phone, Mail, MapPin, AlertCircle, IdCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { formatDateSafely } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import StatusIndicator from '@/components/StatusIndicator';
import Avatar from '@/components/Avatar';

interface AgreementCardProps {
  agreement: any;
  onEdit: () => void;
  onStatusChange: (status: string) => void;
  onCreateFromTemplate: () => void;
}

const AgreementCard: React.FC<AgreementCardProps> = ({
  agreement,
  onEdit,
  onStatusChange,
  onCreateFromTemplate
}) => {
  // Get status type
  const getStatusType = (status: string): any => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'pending';
      case 'expired':
        return 'warning';
      case 'rejected':
        return 'error';
      case 'draft':
        return 'draft';
      default:
        return 'neutral';
    }
  };

  // Get customer name
  const getCustomerName = () => {
    if (typeof agreement.customer === 'object' && agreement.customer?.name) {
      return agreement.customer.name;
    } else if (typeof agreement.customer === 'string') {
      return agreement.customer;
    } else if (agreement.customerName) {
      return agreement.customerName;
    }
    return 'Unknown Customer';
  };

  // Get customer email
  const getCustomerEmail = () => {
    if (typeof agreement.customer === 'object' && agreement.customer?.email) {
      return agreement.customer.email;
    }
    return agreement.customerEmail || 'No email provided';
  };

  // Get customer phone
  const getCustomerPhone = () => {
    if (typeof agreement.customer === 'object' && agreement.customer?.phone) {
      return agreement.customer.phone;
    }
    return agreement.customerPhone || 'No phone provided';
  };

  // Get customer address
  const getCustomerAddress = () => {
    if (typeof agreement.customer === 'object' && agreement.customer?.address) {
      return agreement.customer.address;
    }
    return agreement.customerAddress || 'No address provided';
  };

  // Check if agreement is expired
  const isExpired = () => {
    return agreement.status === 'expired';
  };

  // Check if agreement needs attention
  const needsAttention = () => {
    return agreement.status === 'expired' || agreement.status === 'pending';
  };

  const getBorderGradient = () => {
    switch (agreement.status) {
      case 'active':
        return 'hover:before:bg-gradient-to-r hover:before:from-green-300 hover:before:to-emerald-500';
      case 'pending':
        return 'hover:before:bg-gradient-to-r hover:before:from-amber-300 hover:before:to-amber-500';
      case 'expired':
        return 'hover:before:bg-gradient-to-r hover:before:from-red-300 hover:before:to-red-500';
      case 'rejected':
        return 'hover:before:bg-gradient-to-r hover:before:from-red-300 hover:before:to-red-500';
      case 'draft':
        return 'hover:before:bg-gradient-to-r hover:before:from-blue-300 hover:before:to-blue-500';
      default:
        return 'hover:before:bg-gradient-to-r hover:before:from-gray-300 hover:before:to-gray-500';
    }
  };

  const getStatusBadge = () => {
    switch (agreement.status) {
      case 'active':
        return (
          <div className="bg-green-100 text-green-700 py-1 px-3 rounded-full font-medium text-sm flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Approved
          </div>
        );
      case 'pending':
        return (
          <div className="bg-amber-100 text-amber-700 py-1 px-3 rounded-full font-medium text-sm flex items-center">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
            Pending Approval
          </div>
        );
      case 'expired':
        return (
          <div className="bg-red-100 text-red-700 py-1 px-3 rounded-full font-medium text-sm flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Expired
          </div>
        );
      case 'rejected':
        return (
          <div className="bg-red-100 text-red-700 py-1 px-3 rounded-full font-medium text-sm flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Rejected
          </div>
        );
      case 'draft':
        return (
          <div className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full font-medium text-sm flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Draft
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 text-gray-700 py-1 px-3 rounded-full font-medium text-sm flex items-center">
            <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
            Unknown
          </div>
        );
    }
  };

  return (
    <div 
      onClick={onEdit}
      className={cn(
        "group cursor-pointer transition-all duration-300 rounded-xl relative",
        "before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:z-0 before:transition-opacity before:opacity-0 group-hover:before:opacity-100",
        getBorderGradient()
      )}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md bg-white relative z-10 h-full rounded-xl flex flex-col">
        <div className="flex justify-end px-4 pt-4">
          {getStatusBadge()}
        </div>
        
        <CardContent className="p-5 flex-grow">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 relative">
                {agreement.customer?.avatar ? (
                  <img 
                    src={agreement.customer.avatar} 
                    alt={getCustomerName()} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200" 
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600 border-2 border-blue-200">
                    <Building className="h-6 w-6" />
                  </div>
                )}
                {agreement.status === 'active' && (
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white absolute -mt-1 ml-10"></div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{agreement.title}</h3>
                <p className="text-gray-600 font-medium">{getCustomerName()}</p>
                
                {needsAttention() && (
                  <div 
                    className={cn(
                      "mt-3 p-2 border rounded-md flex items-center gap-2 cursor-pointer shadow-sm transition-all hover:shadow hover:scale-[1.01]",
                      isExpired() ? "border-red-200 bg-red-50 text-red-700" : "border-amber-200 bg-amber-50 text-amber-700"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStatusChange(isExpired() ? 'active' : 'active');
                    }}
                  >
                    {isExpired() ? (
                      <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">
                      {isExpired() 
                        ? "This agreement has expired. Click to renew." 
                        : "Awaiting approval. Click to review."}
                    </span>
                  </div>
                )}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={e => {
                    e.stopPropagation();
                    onEdit();
                  }}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Agreement
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={e => {
                    e.stopPropagation();
                    onCreateFromTemplate();
                  }}>
                    <Copy className="h-4 w-4 mr-2" />
                    Use as Template
                  </DropdownMenuItem>
                  {agreement.status === 'draft' && <DropdownMenuItem onClick={e => {
                    e.stopPropagation();
                    onStatusChange('pending');
                  }}>
                    <Send className="h-4 w-4 mr-2" />
                    Send to Customer
                  </DropdownMenuItem>}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={e => {
                    e.stopPropagation();
                  }}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="space-y-3 py-2">
              <div className="flex items-center gap-2 text-gray-700">
                <IdCard className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium">ID: {agreement.id || agreement.agreementId}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{getCustomerPhone()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm truncate max-w-[250px]">{getCustomerEmail()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm truncate max-w-[250px]">{getCustomerAddress()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Valid until: {formatDateSafely(agreement.validUntil || agreement.expires || agreement.expiresAt || '')}</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-5 py-4 bg-gray-50 flex justify-between items-center border-t">
          <StatusIndicator status={agreement.status} withBadge size="sm" />
          
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-2 hover:bg-gray-200 border-gray-300 transition-all hover:scale-105" 
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <span className="mr-1">View</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AgreementCard;
