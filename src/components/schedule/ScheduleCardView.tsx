import React from 'react';
import { format } from 'date-fns';
import { 
  CalendarIcon, 
  Clock,
  MapPin,
  User,
  Building2,
  CheckCircle,
  XCircle,
  FileCheck,
  ExternalLink,
  MoreHorizontal
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';
import { mockScheduleEvents } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ScheduleCardViewProps {
  statusFilter: string;
  projectType: 'active' | 'completed';
  searchTerm: string;
  onEventSelect: (event: any) => void;
}

const ScheduleCardView = ({ 
  statusFilter, 
  projectType, 
  searchTerm, 
  onEventSelect 
}: ScheduleCardViewProps) => {
  const isMobile = useIsMobile();
  
  const filteredEvents = mockScheduleEvents.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.operator.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    
    if (statusFilter === 'all') {
      if (projectType === 'active') {
        matchesStatus = ['pending', 'confirmed', 'in-progress', 'waiting-signature'].includes(event.status);
      } else {
        matchesStatus = ['completed', 'physical-signature', 'without-signature', 'cancelled'].includes(event.status);
      }
    } else {
      matchesStatus = event.status === statusFilter.replace('service-call', 'pending');
    }
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    let badgeType: "info" | "success" | "warning" | "error" | "neutral";
    let label = '';
    
    switch (status) {
      case 'pending':
        badgeType = 'info';
        label = 'Service Call (New)';
        break;
      case 'confirmed':
        badgeType = 'success';
        label = 'Scheduled';
        break;
      case 'in-progress':
        badgeType = 'warning';
        label = 'In Progress';
        break;
      case 'waiting-signature':
        badgeType = 'warning';
        label = 'Waiting for Signature';
        break;
      case 'completed':
        badgeType = 'success';
        label = 'Completed';
        break;
      case 'physical-signature':
        badgeType = 'info';
        label = 'Physical Signature';
        break;
      case 'without-signature':
        badgeType = 'warning';
        label = 'Without Signature';
        break;
      case 'cancelled':
        badgeType = 'error';
        label = 'Cancelled';
        break;
      default:
        badgeType = 'neutral';
        label = status;
    }
    
    return <StatusBadge status={badgeType} label={label} />;
  };
  
  const getBorderColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'border-blue-500';
      case 'confirmed':
        return 'border-green-500';
      case 'in-progress':
        return 'border-amber-500';
      case 'waiting-signature':
        return 'border-orange-500';
      case 'completed':
        return 'border-green-500';
      case 'physical-signature':
        return 'border-blue-500';
      case 'without-signature':
        return 'border-amber-500';
      case 'cancelled':
        return 'border-red-500';
      default:
        return 'border-gray-300';
    }
  };
  
  // Function to get status color class
  const getStatusColorClass = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-amber-100 text-amber-800';
      case 'waiting-signature':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'physical-signature':
        return 'bg-blue-100 text-blue-800';
      case 'without-signature':
        return 'bg-amber-100 text-amber-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (filteredEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <CalendarIcon className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No events found</h3>
        <p className="text-gray-500 max-w-md mb-6">
          There are no events matching your filters. Try adjusting your search criteria.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredEvents.map((event) => (
        <Card 
          key={event.id}
          className={cn(
            "overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer",
            "relative"
          )}
          onClick={() => onEventSelect(event)}
        >
          <div className="absolute -top-0.5 -right-0.5 z-10">
            <div className={cn(
              "px-3 py-1 text-xs font-semibold rounded-bl-md shadow-sm",
              getStatusColorClass(event.status)
            )}>
              {event.status === 'pending' && 'Service Call (New)'}
              {event.status === 'confirmed' && 'Scheduled'}
              {event.status === 'in-progress' && 'In Progress'}
              {event.status === 'waiting-signature' && 'Waiting for Signature'}
              {event.status === 'completed' && 'Completed'}
              {event.status === 'physical-signature' && 'Physical Signature'}
              {event.status === 'without-signature' && 'Without Signature'}
              {event.status === 'cancelled' && 'Cancelled'}
            </div>
          </div>
          
          <div className={cn(
            "absolute left-0 top-0 bottom-0 w-1",
            getBorderColor(event.status)
          )}></div>
          
          <CardHeader className="pb-2 relative">
            <div className="absolute right-2 top-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <FileCheck className="mr-2 h-4 w-4" />
                    <span>Mark as Completed</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span>Open Details</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">
                    <XCircle className="mr-2 h-4 w-4" />
                    <span>Cancel</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-base">{event.title}</CardTitle>
              </div>
            </div>
            <div className="mt-1">{getStatusBadge(event.status)}</div>
          </CardHeader>
          
          <CardContent className="pb-2 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>
                {format(new Date(event.startTime), 'MMM dd, yyyy h:mm a')} - {format(new Date(event.endTime), 'h:mm a')}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <Building2 className="h-4 w-4 mr-2" />
              <span>{event.customer}</span>
            </div>
            
            {event.projectSite && (
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{event.projectSite}</span>
              </div>
            )}
            
            <div className="flex items-center text-sm text-gray-500">
              <User className="h-4 w-4 mr-2" />
              <div className="flex items-center">
                <Avatar 
                  name={event.operator}
                  size="sm" 
                  className="mr-2"
                />
                <span>{event.operator}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="pt-2 border-t flex justify-between">
            <span className="text-xs text-gray-500">ID: {event.id}</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={(e) => {
                e.stopPropagation();
                onEventSelect(event);
              }}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ScheduleCardView;
