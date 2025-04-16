
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, MapPin, Building2, FileText, Edit } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { ScheduleCall } from '@/pages/Schedule';
import { calendarEventHover } from './serviceInfoUtils';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CalendarEventCardProps {
  event: ScheduleCall;
  onEdit?: (event: ScheduleCall) => void;
  onCertificate?: (event: ScheduleCall) => void;
  onClickCard?: (event: ScheduleCall) => void;
  className?: string;
  compact?: boolean;
}

const CalendarEventCard: React.FC<CalendarEventCardProps> = ({
  event,
  onEdit,
  onCertificate,
  onClickCard,
  className,
  compact = false
}) => {
  // Function to handle click events
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit(event);
  };
  
  const handleCertificateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCertificate) onCertificate(event);
  };
  
  const handleCardClick = (e: React.MouseEvent) => {
    if (onClickCard) onClickCard(event);
  };
  
  // Determine status type for styling
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
  
  // Get color classes based on status
  const getColorClasses = (status: string): string => {
    switch (getStatusType(status)) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-amber-500 bg-amber-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  // Render compact version for day/week view
  if (compact) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <motion.div
            variants={calendarEventHover}
            initial="initial"
            whileHover="hover"
            onClick={handleCardClick}
            className={cn(
              "border-l-2 px-1.5 py-1 text-xs rounded-sm cursor-pointer overflow-hidden text-left shadow-sm",
              getColorClasses(event.status),
              className
            )}
          >
            <div className="font-medium truncate">{event.customer}</div>
            {event.startTime && (
              <div className="text-[10px] flex items-center opacity-80">
                <Clock className="h-2 w-2 mr-1" />
                {event.startTime}
              </div>
            )}
          </motion.div>
        </HoverCardTrigger>
        <HoverCardContent side="left" align="start" className="w-80 p-0">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{event.customer}</h4>
              <StatusBadge 
                status={getStatusType(event.status)} 
                label={getStatusLabel(event.status)} 
                size="sm"
              />
            </div>
            <div className="space-y-1.5 text-xs text-gray-700">
              {event.startTime && (
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1.5 text-gray-500" />
                  <span>{event.startTime}</span>
                </div>
              )}
              {event.operator && (
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1.5 text-gray-500" />
                  <span>{event.operator}</span>
                </div>
              )}
              {(event.projectSite || event.address) && (
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1.5 text-gray-500" />
                  <span className="truncate">{event.projectSite || event.address}</span>
                </div>
              )}
              {event.serviceType && (
                <div className="flex items-center">
                  <Building2 className="h-3 w-3 mr-1.5 text-gray-500" />
                  <span>{event.serviceType.replace(/-/g, ' ')}</span>
                </div>
              )}
            </div>
            <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={handleEditClick}>
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Edit
              </Button>
              <Button size="sm" onClick={handleCertificateClick}>
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                Certificate
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }
  
  // Render standard version for month view
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.div
          variants={calendarEventHover}
          initial="initial"
          whileHover="hover"
          onClick={handleCardClick}
          className={cn(
            "border-l-2 flex items-center rounded-sm p-1 text-xs overflow-hidden bg-white group/event border shadow-sm",
            `border-l-${getStatusType(event.status) === 'success' ? 'green' : 
                       getStatusType(event.status) === 'warning' ? 'amber' : 
                       getStatusType(event.status) === 'error' ? 'red' : 
                       getStatusType(event.status) === 'info' ? 'blue' : 'gray'}-500`,
            className
          )}
        >
          <div className={cn(
            "w-4 h-4 rounded-full flex items-center justify-center mr-1 text-[8px] font-bold",
            getStatusType(event.status) === 'success' ? "bg-green-100 text-green-800" :
            getStatusType(event.status) === 'warning' ? "bg-amber-100 text-amber-800" :
            getStatusType(event.status) === 'error' ? "bg-red-100 text-red-800" :
            getStatusType(event.status) === 'info' ? "bg-blue-100 text-blue-800" :
            "bg-gray-100 text-gray-800"
          )}>
            {event.customer.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <span className="truncate flex-1 text-[10px] md:text-xs">{event.customer}</span>
          
          <div className="ml-auto flex items-center gap-0.5 opacity-0 group-hover/event:opacity-100 transition-opacity">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={handleEditClick}
                    className="p-0.5 hover:bg-gray-100 rounded-sm"
                  >
                    <Edit className="h-2.5 w-2.5 text-gray-500" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">Edit</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={handleCertificateClick}
                    className="p-0.5 hover:bg-gray-100 rounded-sm"
                  >
                    <FileText className="h-2.5 w-2.5 text-gray-500" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">Certificate</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="w-80 p-0 shadow-lg">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">{event.customer}</h4>
            <StatusBadge 
              status={getStatusType(event.status)} 
              label={getStatusLabel(event.status)} 
              size="sm"
            />
          </div>
          <div className="space-y-1.5 text-xs text-gray-700">
            {event.startTime && (
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1.5 text-gray-500" />
                <span>{event.startTime}</span>
              </div>
            )}
            {event.operator && (
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1.5 text-gray-500" />
                <span>{event.operator}</span>
              </div>
            )}
            {(event.projectSite || event.address) && (
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1.5 text-gray-500" />
                <span className="truncate">{event.projectSite || event.address}</span>
              </div>
            )}
            {event.serviceType && (
              <div className="flex items-center">
                <Building2 className="h-3 w-3 mr-1.5 text-gray-500" />
                <span>{event.serviceType.replace(/-/g, ' ')}</span>
              </div>
            )}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={handleEditClick}>
              <Edit className="h-3.5 w-3.5 mr-1.5" />
              Edit
            </Button>
            <Button size="sm" onClick={handleCertificateClick}>
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              Certificate
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CalendarEventCard;
