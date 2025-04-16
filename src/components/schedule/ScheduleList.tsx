
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatusBadge from '@/components/StatusBadge';
import { 
  Calendar, Clock, MapPin, User, 
  MoreHorizontal, CheckCircle, X, FileText, MessageSquare, Edit, Trash,
  FileUp, Signature, AlertTriangle
} from 'lucide-react';
import { format, parseISO, isToday, isPast } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Avatar from '@/components/Avatar';
import { useIsMobile } from '@/hooks/use-mobile';

export interface ScheduleListProps {
  schedules: any[]; 
  onOpenModal: (call: any) => void;
  onDeleteCall: (id: string) => void;
  onUploadSignature?: (id: string) => void;
  statusFilter?: string;
}

const ScheduleList = ({ 
  schedules, 
  onOpenModal, 
  onDeleteCall, 
  onUploadSignature,
  statusFilter = 'all'
}: ScheduleListProps) => {
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId) {
      onDeleteCall(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };
  
  const handleUploadSignature = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUploadSignature) {
      onUploadSignature(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'physical-signature':
        return '#10B981'; // Green
      case 'in-progress':
      case 'awaiting-signature':
        return '#F59E0B'; // Amber
      case 'without-signature':
        return '#F97316'; // Orange
      case 'incomplete':
      case 'canceled':
        return '#EF4444'; // Red
      case 'pending':
      case 'scheduled':
        return '#3366FF'; // Blue
      default:
        return '#6B7280'; // Gray
    }
  };
  
  const getStatusLabel = (status: string): string => {
    switch (status) {
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
  
  const getStatusType = (status: string): 'success' | 'warning' | 'error' | 'neutral' | 'info' => {
    switch (status) {
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
  
  // Check if service call needs attention (past date but not completed)
  const needsAttention = (schedule: any) => {
    if (schedule.status === 'incomplete') return true;
    if ((schedule.status === 'pending' || schedule.status === 'scheduled' || schedule.status === 'in-progress') && 
        isPast(new Date(schedule.date)) && !isToday(new Date(schedule.date))) {
      return true;
    }
    return false;
  };

  if (!schedules.length) {
    return (
      <Card className="border border-gray-200">
        <CardContent className="p-8 flex flex-col items-center justify-center">
          <Calendar className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No service calls found</h3>
          <p className="text-sm text-gray-500 mb-6 text-center">
            There are no service calls matching your filters or search criteria.
          </p>
          <Button onClick={() => onOpenModal(null)}>
            Create New Service Call
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {schedules.map((schedule) => (
        <Card 
          key={schedule.id}
          className={`border ${needsAttention(schedule) ? 'border-red-300 bg-red-50' : 'border-gray-200'} hover:border-gray-300 cursor-pointer transition-all hover:shadow-sm`}
          onClick={() => onOpenModal(schedule)}
        >
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row items-start border-l-4 rounded-l-md" 
              style={{ borderLeftColor: getStatusColor(schedule.status) }}
            >
              <div className="p-4 md:p-5 flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                  <h3 className="font-medium flex items-center">
                    {schedule.customer}
                    {needsAttention(schedule) && (
                      <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                    )}
                  </h3>
                  <div className="flex items-center md:ml-auto">
                    <StatusBadge 
                      status={getStatusType(schedule.status)} 
                      label={getStatusLabel(schedule.status)} 
                    />
                    
                    {schedule.status === 'without-signature' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-2 h-7 text-xs"
                        onClick={(e) => handleUploadSignature(schedule.id, e)}
                      >
                        <FileUp className="h-3 w-3 mr-1" />
                        Upload Signature
                      </Button>
                    )}
                    
                    {schedule.status === 'awaiting-signature' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-2 h-7 text-xs"
                      >
                        <Signature className="h-3 w-3 mr-1" />
                        Request Signature
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{format(new Date(schedule.date), 'MMMM d, yyyy')}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">
                      {schedule.startTime || format(new Date(schedule.date), 'h:mm a')} 
                      {schedule.endDate && ` - ${format(new Date(schedule.endDate), 'h:mm a')}`}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm line-clamp-1">
                      {schedule.projectSite || schedule.address}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{schedule.operator}</span>
                  </div>
                  
                  {schedule.notes && (
                    <div className="flex items-start md:col-span-2 mt-1">
                      <MessageSquare className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-600 line-clamp-1">{schedule.notes}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-3 border-t md:border-t-0 md:border-l border-gray-100 flex justify-end md:self-stretch">
                <TooltipProvider>
                  <DropdownMenu>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Actions</p>
                      </TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent align={isMobile ? "center" : "end"}>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(schedule);
                      }}>
                        <Edit className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      
                      {/* Status-specific actions */}
                      {schedule.status === 'without-signature' && (
                        <DropdownMenuItem onClick={(e) => handleUploadSignature(schedule.id, e)}>
                          <FileUp className="mr-2 h-4 w-4" />
                          Upload Signature
                        </DropdownMenuItem>
                      )}
                      
                      {schedule.status === 'awaiting-signature' && (
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Signature className="mr-2 h-4 w-4" />
                          Request Signature
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600" 
                        onClick={(e) => handleDeleteClick(schedule.id, e)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Dialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service call? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleList;
