
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  MoreHorizontal, 
  Building2, 
  FileUp,
  Signature,
  AlertTriangle
} from 'lucide-react';
import { format, parseISO, isToday, isPast } from 'date-fns';
import { ScheduleCall } from '@/pages/Schedule';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import StatusBadge from '@/components/StatusBadge';

interface ScheduleGridProps {
  schedules: ScheduleCall[];
  onOpenModal: (call: ScheduleCall) => void;
  onDeleteCall: (id: string) => void;
  onUploadSignature?: (id: string) => void;
  statusFilter?: string;
}

// Helper function to convert status string to StatusBadge type
const getStatusType = (status: string): 'success' | 'warning' | 'error' | 'neutral' | 'info' => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'physical-signature':
      return 'success';
    case 'in-progress':
    case 'awaiting-signature':
    case 'without-signature':
      return 'warning';
    case 'incomplete':
    case 'canceled':
      return 'error';
    case 'pending':
    case 'scheduled':
      return 'info';
    default:
      return 'neutral';
  }
};

const getStatusLabel = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'Pending';
    case 'scheduled':
      return 'Scheduled';
    case 'in-progress':
      return 'In Progress';
    case 'incomplete':
      return 'Incomplete';
    case 'awaiting-signature':
      return 'Awaiting Signature';
    case 'completed':
      return 'Completed';
    case 'physical-signature':
      return 'Physical Signed';
    case 'without-signature':
      return 'Unsigned';
    case 'canceled':
      return 'Canceled';
    default:
      return status;
  }
};

// Helper function to determine if a service call needs attention
const needsAttention = (call: ScheduleCall) => {
  if (call.status === 'incomplete') return true;
  if ((call.status === 'pending' || call.status === 'scheduled' || call.status === 'in-progress') && 
      isPast(new Date(call.date)) && !isToday(new Date(call.date))) {
    return true;
  }
  return false;
};

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ 
  schedules, 
  onOpenModal, 
  onDeleteCall,
  onUploadSignature,
  statusFilter = 'all'
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  if (schedules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Calendar className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700">No service calls found</h3>
        <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or create a new service call</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {schedules.map((call) => (
        <Card 
          key={call.id} 
          className={cn(
            "cursor-pointer hover:shadow-md transition-shadow",
            needsAttention(call) ? "border-red-300 bg-red-50" : 
            call.status === 'completed' || call.status === 'physical-signature' 
              ? "border-green-200" 
              : call.status === 'in-progress' || call.status === 'awaiting-signature' || call.status === 'without-signature'
              ? "border-amber-200"
              : call.status === 'canceled' || call.status === 'incomplete'
              ? "border-red-200"
              : "border-blue-200"
          )}
          onClick={() => onOpenModal(call)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <StatusBadge 
                status={getStatusType(call.status)}
                label={getStatusLabel(call.status)}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal(call);
                  }}>View Details</DropdownMenuItem>
                  
                  {/* Status-specific actions */}
                  {call.status === 'without-signature' && onUploadSignature && (
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onUploadSignature(call.id);
                    }}>
                      <FileUp className="mr-2 h-4 w-4" />
                      Upload Signature
                    </DropdownMenuItem>
                  )}
                  
                  {call.status === 'awaiting-signature' && (
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      <Signature className="mr-2 h-4 w-4" />
                      Request Signature
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCall(call.id);
                  }} className="text-red-600">
                    Delete Call
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardTitle className="text-base flex items-center">
              {call.serviceType ? call.serviceType.charAt(0).toUpperCase() + call.serviceType.slice(1).replace(/-/g, ' ') : 'Service Call'}
              {needsAttention(call) && (
                <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <Calendar className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                <span>{formatDate(call.date)}</span>
              </div>
              <div className="flex items-start">
                <Clock className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                <span>{call.startTime || '9:00 AM'}</span>
              </div>
              <div className="flex items-start">
                <Building2 className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                <span className="font-medium">{call.customer || 'No customer'}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                <span>{call.projectSite || call.address || 'No location'}</span>
              </div>
              <div className="flex items-start">
                <User className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                <span>{call.operator || 'Unassigned'}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 pb-3 flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(call);
              }}
            >
              View Details
            </Button>
            
            {call.status === 'without-signature' && onUploadSignature && (
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onUploadSignature(call.id);
                }}
              >
                <FileUp className="h-4 w-4 mr-1" />
                Signature
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ScheduleGrid;
