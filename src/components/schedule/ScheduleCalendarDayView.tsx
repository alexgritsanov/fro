
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScheduleCall } from '@/pages/Schedule';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, User, AlertTriangle, Building2, Filter, Search, ChevronRight, Edit, FileText, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import StatusBadge from '@/components/StatusBadge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import DocumentPreviewModal from '../documents/DocumentPreviewModal';
import { motion } from 'framer-motion';

interface ScheduleCalendarDayViewProps {
  date: Date;
  events: ScheduleCall[];
  isOpen: boolean;
  onClose: () => void;
  onEventSelect: (event: ScheduleCall) => void;
  onCreateCertificate: (event: ScheduleCall) => void;
}

const ScheduleCalendarDayView: React.FC<ScheduleCalendarDayViewProps> = ({
  date,
  events,
  isOpen,
  onClose,
  onEventSelect,
  onCreateCertificate
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filterOperator, setFilterOperator] = useState<string>('all');
  const [filterCustomer, setFilterCustomer] = useState<string>('all');
  const [filterSite, setFilterSite] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewType, setViewType] = useState<'timeline' | 'list' | 'grid'>('timeline');
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleCall | null>(null);
  const [hoverEvent, setHoverEvent] = useState<ScheduleCall | null>(null);
  const [quickActionEvent, setQuickActionEvent] = useState<ScheduleCall | null>(null);

  const operators = [...new Set(events.map(event => event.operator))].filter(Boolean);
  const customers = [...new Set(events.map(event => event.customer))].filter(Boolean);
  const sites = [...new Set(events.map(event => event.projectSite || event.address))].filter(Boolean);

  // Group events by time for timeline view
  const groupedEvents: { [key: string]: ScheduleCall[] } = {};
  
  events.forEach(event => {
    const startTime = event.startTime || '00:00';
    if (!groupedEvents[startTime]) {
      groupedEvents[startTime] = [];
    }
    groupedEvents[startTime].push(event);
  });

  const sortedTimeSlots = Object.keys(groupedEvents).sort();

  // Filter events based on selected filters
  const filteredEvents = events.filter(event => {
    const matchesOperator = filterOperator === 'all' || event.operator === filterOperator;
    const matchesCustomer = filterCustomer === 'all' || event.customer === filterCustomer;
    const matchesSite = filterSite === 'all' || 
      (event.projectSite && event.projectSite === filterSite) || 
      (event.address && event.address === filterSite);
    const matchesSearch = !searchTerm || 
      (event.customer && event.customer.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.operator && event.operator.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.projectSite && event.projectSite.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.address && event.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.serviceType && event.serviceType.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = activeTab === 'all' || event.status === activeTab;
    
    return matchesOperator && matchesCustomer && matchesSite && matchesSearch && matchesStatus;
  });

  // Group filtered events for timeline view
  const filteredGroupedEvents: { [key: string]: ScheduleCall[] } = {};
  
  filteredEvents.forEach(event => {
    const startTime = event.startTime || '00:00';
    if (!filteredGroupedEvents[startTime]) {
      filteredGroupedEvents[startTime] = [];
    }
    filteredGroupedEvents[startTime].push(event);
  });

  const filteredSortedTimeSlots = Object.keys(filteredGroupedEvents).sort();

  const hasCallsNeedingAttention = events.some(event => 
    event.status === 'incomplete' || 
    event.status === 'awaiting-signature' || 
    event.status === 'without-signature'
  );

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

  const getStatusLabel = (status: string) => {
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

  const handleEventClick = (event: ScheduleCall) => {
    setSelectedEvent(event);
    setShowDocumentPreview(true);
  };

  const handleCloseDocumentPreview = () => {
    setShowDocumentPreview(false);
    setSelectedEvent(null);
  };

  const getDocumentNumber = (id: string) => {
    // In a real app, this would come from the backend
    // This is a simple implementation for demo purposes
    return `SC-${id.substring(0, 8).toUpperCase()}`;
  };

  const handleEventHover = (event: ScheduleCall) => {
    setHoverEvent(event);
  };

  const handleEventLeave = () => {
    setHoverEvent(null);
  };

  const handleQuickAction = (event: ScheduleCall, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickActionEvent(event);
  };

  const handleCloseQuickAction = () => {
    setQuickActionEvent(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Schedule for {format(date, 'MMMM d, yyyy')}</span>
            {hasCallsNeedingAttention && (
              <div className="flex items-center text-amber-600 bg-amber-50 px-2 py-1 rounded text-sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Calls need attention
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Select value={filterOperator} onValueChange={setFilterOperator}>
                  <SelectTrigger>
                    <SelectValue placeholder="Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Operators</SelectItem>
                    {operators.map(operator => (
                      <SelectItem key={operator} value={operator}>{operator}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Select value={filterCustomer} onValueChange={setFilterCustomer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    {customers.map(customer => (
                      <SelectItem key={customer} value={customer}>{customer}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setFilterSite('all')}
              >
                <Filter className="h-4 w-4" />
              </Button>
              
              <div className="bg-gray-100 rounded-md flex">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "rounded-l-md rounded-r-none",
                    viewType === 'timeline' ? "bg-white shadow-sm" : ""
                  )}
                  onClick={() => setViewType('timeline')}
                >
                  <Clock className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "rounded-none",
                    viewType === 'list' ? "bg-white shadow-sm" : ""
                  )}
                  onClick={() => setViewType('list')}
                >
                  <User className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "rounded-r-md rounded-l-none",
                    viewType === 'grid' ? "bg-white shadow-sm" : ""
                  )}
                  onClick={() => setViewType('grid')}
                >
                  <Building2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="awaiting-signature">Awaiting Signature</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="physical-signature">Physical Signed</TabsTrigger>
              <TabsTrigger value="without-signature">Unsigned</TabsTrigger>
              <TabsTrigger value="canceled">Canceled</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {filteredEvents.length > 0 ? (
                <>
                  {viewType === 'timeline' && (
                    <div className="space-y-6">
                      {filteredSortedTimeSlots.map(timeSlot => (
                        <div key={timeSlot} className="space-y-2">
                          <h3 className="text-md font-medium flex items-center border-b pb-1">
                            <Clock className="mr-2 h-4 w-4 text-gray-500" />
                            {timeSlot}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {filteredGroupedEvents[timeSlot].map(event => (
                              <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Card 
                                  className={cn(
                                    "cursor-pointer hover:shadow-md transition-shadow overflow-hidden group relative",
                                    getStatusType(event.status) === 'success' ? "border-l-4 border-l-green-500" :
                                    getStatusType(event.status) === 'warning' ? "border-l-4 border-l-amber-500" :
                                    getStatusType(event.status) === 'error' ? "border-l-4 border-l-red-500" :
                                    getStatusType(event.status) === 'info' ? "border-l-4 border-l-blue-500" :
                                    "border-l-4 border-l-gray-300"
                                  )}
                                  onClick={() => onEventSelect(event)}
                                  onMouseEnter={() => handleEventHover(event)}
                                  onMouseLeave={handleEventLeave}
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-medium truncate">{event.customer}</h4>
                                      <StatusBadge 
                                        status={getStatusType(event.status)} 
                                        label={getStatusLabel(event.status)} 
                                      />
                                    </div>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex items-center text-gray-600">
                                        <User className="h-3.5 w-3.5 mr-2 text-gray-400" />
                                        {event.operator || 'No operator assigned'}
                                      </div>
                                      <div className="flex items-center text-gray-600">
                                        <MapPin className="h-3.5 w-3.5 mr-2 text-gray-400" />
                                        {event.projectSite || event.address || 'No location'}
                                      </div>
                                      <div className="flex items-center text-gray-600">
                                        <Building2 className="h-3.5 w-3.5 mr-2 text-gray-400" />
                                        {event.serviceType?.replace(/-/g, ' ') || 'No service type'}
                                      </div>
                                    </div>
                                    
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <div className="bg-white shadow-md rounded-full p-1">
                                        <button 
                                          onClick={(e) => handleQuickAction(event, e)}
                                          className="rounded-full hover:bg-gray-100 p-1"
                                        >
                                          <Edit className="h-4 w-4 text-gray-500" />
                                        </button>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                                      <div className="text-xs text-gray-500">
                                        {getDocumentNumber(event.id)}
                                      </div>
                                      <div className="flex gap-2">
                                        <Button 
                                          variant="outline"
                                          size="sm"
                                          className="text-xs h-7"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            onEventSelect(event);
                                          }}
                                        >
                                          Edit
                                        </Button>
                                        <Button 
                                          size="sm"
                                          className="text-xs h-7"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            onCreateCertificate(event);
                                          }}
                                        >
                                          Certificate
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {viewType === 'list' && (
                    <div className="space-y-3">
                      {filteredEvents.map(event => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div 
                            className={cn(
                              "flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group",
                              getStatusType(event.status) === 'success' ? "border-l-4 border-l-green-500" :
                              getStatusType(event.status) === 'warning' ? "border-l-4 border-l-amber-500" :
                              getStatusType(event.status) === 'error' ? "border-l-4 border-l-red-500" :
                              getStatusType(event.status) === 'info' ? "border-l-4 border-l-blue-500" :
                              "border-l-4 border-l-gray-300"
                            )}
                            onClick={() => onEventSelect(event)}
                            onMouseEnter={() => handleEventHover(event)}
                            onMouseLeave={handleEventLeave}
                          >
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{event.customer}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500">
                                    {event.startTime}
                                  </span>
                                  <StatusBadge 
                                    status={getStatusType(event.status)} 
                                    label={getStatusLabel(event.status)} 
                                    size="sm"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <User className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                  {event.operator || 'Unassigned'}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                  {event.projectSite || event.address || 'No location'}
                                </div>
                                <div className="flex items-center">
                                  <Building2 className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                  {event.serviceType?.replace(/-/g, ' ') || 'No service type'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEventSelect(event);
                                }}
                              >
                                <Edit className="h-3.5 w-3.5 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                size="sm"
                                className="h-8 px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onCreateCertificate(event);
                                }}
                              >
                                <FileText className="h-3.5 w-3.5 mr-1" />
                                Certificate
                              </Button>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-300 ml-2" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {viewType === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredEvents.map(event => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card 
                            className={cn(
                              "cursor-pointer hover:shadow-md transition-shadow h-full group",
                              getStatusType(event.status) === 'success' ? "border-t-4 border-t-green-500" :
                              getStatusType(event.status) === 'warning' ? "border-t-4 border-t-amber-500" :
                              getStatusType(event.status) === 'error' ? "border-t-4 border-t-red-500" :
                              getStatusType(event.status) === 'info' ? "border-t-4 border-t-blue-500" :
                              "border-t-4 border-t-gray-300"
                            )}
                            onClick={() => onEventSelect(event)}
                            onMouseEnter={() => handleEventHover(event)}
                            onMouseLeave={handleEventLeave}
                          >
                            <CardContent className="p-4 flex flex-col h-full">
                              <div className="flex items-start justify-between mb-2 relative">
                                <div>
                                  <Badge 
                                    variant="outline" 
                                    className="mb-2 text-xs"
                                  >
                                    {event.startTime || 'No time'}
                                  </Badge>
                                  <h4 className="font-medium">{event.customer}</h4>
                                </div>
                                <StatusBadge 
                                  status={getStatusType(event.status)}
                                  label={getStatusLabel(event.status)} 
                                  size="sm"
                                />
                                
                                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="bg-white shadow-md rounded-full p-1">
                                    <button 
                                      onClick={(e) => handleQuickAction(event, e)}
                                      className="rounded-full hover:bg-gray-100 p-1"
                                    >
                                      <Edit className="h-4 w-4 text-gray-500" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <Separator className="my-3" />
                              <div className="space-y-3 text-sm flex-1">
                                <div className="flex items-center text-gray-600">
                                  <User className="h-4 w-4 mr-2 text-gray-400" />
                                  <div>
                                    <span className="text-xs font-medium text-gray-500">Operator</span>
                                    <p>{event.operator || 'No operator assigned'}</p>
                                  </div>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                  <div>
                                    <span className="text-xs font-medium text-gray-500">Location</span>
                                    <p className="truncate">{event.projectSite || event.address || 'No location'}</p>
                                  </div>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                                  <div>
                                    <span className="text-xs font-medium text-gray-500">Service</span>
                                    <p>{event.serviceType?.replace(/-/g, ' ') || 'No service type'}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                                <div className="text-xs text-gray-500">
                                  {getDocumentNumber(event.id)}
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-blue-600 text-xs h-7"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onEventSelect(event);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button 
                                    size="sm"
                                    className="text-xs h-7"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onCreateCertificate(event);
                                    }}
                                  >
                                    Certificate
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="py-10 text-center text-gray-500">
                  <AlertTriangle className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium mb-1">No events found</h3>
                  <p>Try adjusting your search or filters</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
      
      {showDocumentPreview && selectedEvent && (
        <DocumentPreviewModal
          isOpen={showDocumentPreview}
          onClose={handleCloseDocumentPreview}
          documentType="service-call"
          documentData={selectedEvent}
          documentNumber={getDocumentNumber(selectedEvent.id)}
          customerId={selectedEvent.id.slice(0, 8)} // Mock customer ID for demo
          customerName={selectedEvent.customer}
          onGenerateCertificate={() => {
            onCreateCertificate(selectedEvent);
            handleCloseDocumentPreview();
          }}
        />
      )}
      
      {quickActionEvent && (
        <Dialog open={true} onOpenChange={handleCloseQuickAction}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Quick Actions</span>
                <Button variant="ghost" size="sm" onClick={handleCloseQuickAction} className="h-6 w-6 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24"
                onClick={() => {
                  onEventSelect(quickActionEvent);
                  handleCloseQuickAction();
                }}
              >
                <Edit className="h-6 w-6 mb-2" />
                <span>Edit</span>
                <span className="text-xs text-gray-500">Service Call</span>
              </Button>
              
              <Button 
                className="flex flex-col items-center justify-center h-24"
                onClick={() => {
                  onCreateCertificate(quickActionEvent);
                  handleCloseQuickAction();
                }}
              >
                <FileText className="h-6 w-6 mb-2" />
                <span>Create</span>
                <span className="text-xs">Certificate</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24"
                onClick={handleCloseQuickAction}
              >
                <Check className="h-6 w-6 mb-2 text-green-500" />
                <span>Mark as</span>
                <span className="text-xs text-gray-500">Completed</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24"
                onClick={handleCloseQuickAction}
              >
                <AlertTriangle className="h-6 w-6 mb-2 text-amber-500" />
                <span>Flag for</span>
                <span className="text-xs text-gray-500">Follow-up</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};

export default ScheduleCalendarDayView;
