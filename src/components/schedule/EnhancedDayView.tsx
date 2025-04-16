
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Clock, User, MapPin, Building2, X } from 'lucide-react';
import { format } from 'date-fns';
import { ScheduleCall } from '@/pages/Schedule';
import StatusBadge from '@/components/StatusBadge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface EnhancedDayViewProps {
  selectedDate: Date;
  scheduleItems: ScheduleCall[];
  isOpen: boolean;
  onClose: () => void;
  onEventSelect: (call: ScheduleCall) => void;
  onCreateNew: () => void;
}

const EnhancedDayView: React.FC<EnhancedDayViewProps> = ({
  selectedDate,
  scheduleItems,
  isOpen,
  onClose,
  onEventSelect,
  onCreateNew
}) => {
  // Get status type for styling
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
  
  // Format status label for display
  const getStatusLabel = (status: string): string => {
    return status.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader className="flex items-center justify-between flex-row">
          <DialogTitle className="text-xl">
            {format(selectedDate, 'MMMM d, yyyy')}
          </DialogTitle>
          
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            {scheduleItems.length} service call{scheduleItems.length !== 1 && 's'}
          </div>
          
          <Button 
            size="sm"
            onClick={() => {
              onClose();
              onCreateNew();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Service Call
          </Button>
        </div>
        
        <ScrollArea className="h-96 pr-4">
          <div className="space-y-3">
            {scheduleItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No service calls for this date
              </div>
            ) : (
              scheduleItems.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "border rounded-md p-3 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors",
                    "border-l-4",
                    getStatusType(item.status) === 'success' ? "border-l-green-500" : 
                    getStatusType(item.status) === 'warning' ? "border-l-amber-500" : 
                    getStatusType(item.status) === 'error' ? "border-l-red-500" : 
                    getStatusType(item.status) === 'info' ? "border-l-blue-500" : "border-l-gray-300"
                  )}
                  onClick={() => {
                    onClose();
                    onEventSelect(item);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{item.customer}</h3>
                    <StatusBadge 
                      status={getStatusType(item.status)} 
                      label={getStatusLabel(item.status)} 
                      size="sm"
                    />
                  </div>
                  
                  <div className="text-xs text-gray-600 space-y-1">
                    {item.startTime && (
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1.5 text-gray-400" />
                        <span>{item.startTime}</span>
                      </div>
                    )}
                    {item.operator && (
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1.5 text-gray-400" />
                        <span>{item.operator}</span>
                      </div>
                    )}
                    {(item.projectSite || item.address) && (
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1.5 text-gray-400" />
                        <span className="truncate">{item.projectSite || item.address}</span>
                      </div>
                    )}
                    {item.serviceType && (
                      <div className="flex items-center">
                        <Building2 className="h-3 w-3 mr-1.5 text-gray-400" />
                        <span>{item.serviceType.replace(/-/g, ' ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedDayView;
