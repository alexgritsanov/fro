import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CalendarClock, Grid, List, BarChart2, ChevronLeft, 
  ChevronRight, Filter, Plus, AlertTriangle
} from 'lucide-react';
import { format, parseISO, addDays, isToday, isBefore, startOfMonth, endOfMonth } from 'date-fns';
import ScheduleList from '@/components/schedule/ScheduleList';
import ScheduleGrid from '@/components/schedule/ScheduleGrid';
import ServiceCallModal from '@/components/schedule/ServiceCallModal';
import { mockScheduleCalls } from '@/data/mockData';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import DeliveryCertificateModal from '@/components/schedule/DeliveryCertificateModal';
import AnalyticsPanel from '@/components/analytics/AnalyticsPanel';
import ScheduleAnalytics from '@/components/analytics/ScheduleAnalytics';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from '@/hooks/use-mobile';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from '@/lib/utils';
import IncompleteServiceCallsModal from '@/components/schedule/IncompleteServiceCallsModal';
import ScheduleCalendarView from '@/components/schedule/ScheduleCalendarView';
import NotificationDropdown from '@/components/NotificationDropdown';
import ScheduleEventModal from '@/components/schedule/ScheduleEventModal';

export interface ScheduleCall {
  id: string;
  customer: string;
  address: string;
  date: string;
  endDate: string;
  status: string;
  operator: string;
  serviceType: string;
  notes: string;
  projectSite?: string;
  hourlyBooking?: number | string;
  pumpType?: string;
  quantity?: string;
  vehicleNumber?: string;
  startTime?: string;
  craneSize?: string;
  vehicleType?: string;
  generalEquipment?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  time: string;
  read: boolean;
}

const Schedule = () => {
  const [view, setView] = useState<'list' | 'grid' | 'calendar'>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('30days');
  const [projectFilter, setProjectFilter] = useState<'active' | 'completed'>('active');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const [isAnalyticsPanelOpen, setIsAnalyticsPanelOpen] = useState(false);
  
  const [isCreateCallModalOpen, setIsCreateCallModalOpen] = useState(false);
  const [isEditCallModalOpen, setIsEditCallModalOpen] = useState(false);
  const [isViewCallModalOpen, setIsViewCallModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<ScheduleCall | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isCreateCertificateOnly, setIsCreateCertificateOnly] = useState(false);
  
  const [incompleteAlerts, setIncompleteAlerts] = useState(0);
  const [unsignedAlerts, setUnsignedAlerts] = useState(0);
  const [pendingSignatureAlerts, setPendingSignatureAlerts] = useState(0);
  
  const [isIncompleteModalOpen, setIsIncompleteModalOpen] = useState(false);
  const [isAwaitingSignatureModalOpen, setIsAwaitingSignatureModalOpen] = useState(false);
  const [isUnsignedModalOpen, setIsUnsignedModalOpen] = useState(false);
  
  const [incompleteCalls, setIncompleteCalls] = useState<ScheduleCall[]>([]);
  const [awaitingSignatureCalls, setAwaitingSignatureCalls] = useState<ScheduleCall[]>([]);
  const [unsignedCalls, setUnsignedCalls] = useState<ScheduleCall[]>([]);
  
  const isMobile = useIsMobile();
  const isTablet = useBreakpoint('lg');
  
  const [scheduleCalls, setScheduleCalls] = useState<ScheduleCall[]>(() => {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    
    const regularCalls = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(monthStart);
      date.setDate(Math.floor(Math.random() * 28) + 1);
      
      const statusOptions = [
        'pending', 'scheduled', 'in-progress', 'incomplete', 'awaiting-signature',
        'completed', 'physical-signature', 'without-signature', 'canceled'
      ];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      const customers = ['ABC Construction', 'XYZ Builders', 'FastBuild Inc.', 'Premium Construction', 'City Developers'];
      const customer = customers[Math.floor(Math.random() * customers.length)];
      
      const operators = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson'];
      const operator = operators[Math.floor(Math.random() * operators.length)];
      
      const serviceTypes = ['concrete-pumping', 'excavation', 'foundation', 'demolition', 'site-prep'];
      const serviceType = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
      
      const endDate = new Date(date);
      endDate.setHours(endDate.getHours() + 2);
      
      return {
        id: uuidv4(),
        customer,
        address: `${Math.floor(Math.random() * 1000) + 1} Main St, City`,
        date: date.toISOString(),
        endDate: endDate.toISOString(),
        status,
        operator,
        serviceType,
        notes: `Service call notes for ${customer}`,
        projectSite: `Site ${Math.floor(Math.random() * 100) + 1}`,
        hourlyBooking: Math.floor(Math.random() * 8) + 1,
        pumpType: ['Line Pump', 'Boom Pump', 'Trailer Pump'][Math.floor(Math.random() * 3)],
        quantity: `${Math.floor(Math.random() * 100) + 10} m³`,
        vehicleNumber: `VEH-${Math.floor(Math.random() * 1000) + 100}`,
        startTime: `${Math.floor(Math.random() * 12) + 7}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`
      };
    });
    
    const specialDate = new Date(2025, 2, 27);
    
    const specialCalls = Array.from({ length: 15 }, (_, i) => {
      const customers = [
        'SuperBuild Co.', 'Metro Construction', 'Urban Developers', 
        'Skyline Builders', 'Concrete Masters', 'Foundation Experts',
        'Premium Pumping', 'City Construction', 'Reliable Builders',
        'Quality Concrete', 'Fast Foundations', 'Expert Builders',
        'Elite Construction', 'Premier Pumping', 'Top Builders'
      ];
      
      const operators = [
        'John Smith', 'Sarah Johnson', 'Michael Brown', 
        'Emily Davis', 'David Wilson', 'Amanda Miller',
        'Robert Jones', 'Patricia Garcia', 'James Martinez',
        'Jennifer Robinson', 'Charles White', 'Mary Thomas',
        'Richard Anderson', 'Susan Taylor', 'Joseph Lee'
      ];
      
      const serviceTypes = ['concrete-pumping', 'excavation', 'foundation', 'demolition', 'site-prep'];
      const statusOptions = ['pending', 'scheduled', 'in-progress', 'awaiting-signature', 'completed'];
      
      const hour = Math.floor(i / 3) + 7;
      const minute = (i % 3) * 20;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      
      return {
        id: uuidv4(),
        customer: customers[i],
        address: `${Math.floor(Math.random() * 1000) + 1} Main St, City`,
        date: specialDate.toISOString(),
        endDate: new Date(specialDate.getFullYear(), specialDate.getMonth(), specialDate.getDate(), hour + 1, minute).toISOString(),
        status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
        operator: operators[i],
        serviceType: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
        notes: `Special service call for ${customers[i]} on March 27`,
        projectSite: `Site ${Math.floor(Math.random() * 100) + 1}`,
        hourlyBooking: Math.floor(Math.random() * 8) + 1,
        pumpType: ['Line Pump', 'Boom Pump', 'Trailer Pump'][Math.floor(Math.random() * 3)],
        quantity: `${Math.floor(Math.random() * 100) + 10} m³`,
        vehicleNumber: `VEH-${Math.floor(Math.random() * 1000) + 100}`,
        startTime: `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`
      };
    });
    
    return [...mockScheduleCalls, ...regularCalls, ...specialCalls];
  });
  
  const formattedDate = format(selectedDate, 'MMMM d, yyyy');
  
  useEffect(() => {
    const today = new Date();
    
    const incomplete = scheduleCalls.filter(call => 
      (call.status === 'in-progress' || call.status === 'incomplete') && 
      isBefore(new Date(call.date), today)
    );
    
    const awaiting = scheduleCalls.filter(call => 
      call.status === 'awaiting-signature'
    );
    
    const unsigned = scheduleCalls.filter(call => 
      call.status === 'without-signature'
    );
    
    setIncompleteCalls(incomplete);
    setAwaitingSignatureCalls(awaiting);
    setUnsignedCalls(unsigned);
    
    setIncompleteAlerts(incomplete.length);
    setUnsignedAlerts(unsigned.length);
    setPendingSignatureAlerts(awaiting.length);
    
    const todayIncomplete = scheduleCalls.filter(call => 
      isToday(new Date(call.date)) && 
      (call.status === 'pending' || call.status === 'scheduled' || call.status === 'in-progress')
    );
    
    if (todayIncomplete.length > 0) {
      toast.warning(`You have ${todayIncomplete.length} incomplete service call(s) for today`, {
        description: "Please complete these service calls and update their status.",
        duration: 5000,
        action: {
          label: "View",
          onClick: () => {
            setProjectFilter('active');
            setStatusFilter('in-progress');
          }
        }
      });
    }
  }, [scheduleCalls]);
  
  const goToPreviousDay = () => {
    setSelectedDate(prevDate => addDays(prevDate, -1));
  };
  
  const goToNextDay = () => {
    setSelectedDate(prevDate => addDays(prevDate, 1));
  };
  
  const handleOpenCreateModal = () => {
    setSelectedCall(null);
    setIsCreateCallModalOpen(true);
    setIsCreateCertificateOnly(false);
  };
  
  const handleOpenEditModal = (call: ScheduleCall) => {
    setSelectedCall(call);
    setIsEditCallModalOpen(true);
  };
  
  const handleOpenViewModal = (call: ScheduleCall) => {
    setSelectedCall(call);
    setIsViewCallModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsCreateCallModalOpen(false);
    setIsEditCallModalOpen(false);
    setIsViewCallModalOpen(false);
    setSelectedCall(null);
  };
  
  const handleOpenCertificateModal = (createOnly = false) => {
    setIsCreateCertificateOnly(createOnly);
    if (createOnly) {
      setSelectedCall(null);
    }
    setIsCertificateModalOpen(true);
  };
  
  const handleCloseCertificateModal = () => {
    setIsCertificateModalOpen(false);
  };
  
  const toggleAnalyticsPanel = () => {
    setIsAnalyticsPanelOpen(!isAnalyticsPanelOpen);
  };
  
  const handleCreateCall = (callData: Omit<ScheduleCall, 'id'>) => {
    setLoading(true);
    
    setTimeout(() => {
      const newCall: ScheduleCall = {
        id: uuidv4(),
        ...callData
      };
      
      setScheduleCalls(prev => [...prev, newCall]);
      setIsCreateCallModalOpen(false);
      setLoading(false);
      
      toast.success('Service call created', {
        description: `Successfully created service call for ${callData.customer}`,
      });
    }, 500);
  };
  
  const handleUpdateCall = (updatedCall: ScheduleCall) => {
    setLoading(true);
    
    setTimeout(() => {
      setScheduleCalls(prev => 
        prev.map(call => call.id === updatedCall.id ? updatedCall : call)
      );
      setIsEditCallModalOpen(false);
      setIsViewCallModalOpen(false);
      setSelectedCall(null);
      setLoading(false);
      
      toast.success('Service call updated', {
        description: `Successfully updated service call for ${updatedCall.customer}`,
      });
    }, 500);
  };
  
  const handleDeleteCall = (id: string) => {
    setLoading(true);
    
    setTimeout(() => {
      setScheduleCalls(prev => prev.filter(call => call.id !== id));
      setLoading(false);
      
      toast.success('Service call deleted', {
        description: 'Successfully deleted service call',
      });
    }, 500);
  };
  
  const handleSaveCertificate = (certificateData: any) => {
    console.log('Certificate data:', certificateData);
    
    if (selectedCall) {
      const updatedCall = {
        ...selectedCall,
        status: 'awaiting-signature'
      };
      
      handleUpdateCall(updatedCall);
    }
    
    toast.success('Delivery certificate saved', {
      description: 'The delivery certificate has been saved successfully.'
    });
    
    setIsCertificateModalOpen(false);
  };
  
  const handleUploadSignature = (callId: string) => {
    const call = scheduleCalls.find(c => c.id === callId);
    if (call) {
      setSelectedCall(call);
      toast.info('Signature upload functionality would open here');
      
      const updatedCall = {
        ...call,
        status: 'physical-signature'
      };
      
      handleUpdateCall(updatedCall);
    }
  };
  
  const filteredCalls = scheduleCalls.filter(call => {
    const activeStatuses = ['pending', 'scheduled', 'in-progress', 'incomplete', 'awaiting-signature'];
    const completedStatuses = ['completed', 'physical-signature', 'without-signature', 'canceled'];
    
    const matchesProjectFilter = projectFilter === 'active' 
      ? activeStatuses.includes(call.status)
      : completedStatuses.includes(call.status);
    
    const matchesStatusFilter = statusFilter === 'all' || call.status === statusFilter;
    
    return matchesProjectFilter && matchesStatusFilter;
  });
  
  const handleOpenIncompleteModal = () => {
    setIsIncompleteModalOpen(true);
  };

  const handleCloseIncompleteModal = () => {
    setIsIncompleteModalOpen(false);
  };
  
  const handleOpenAwaitingSignatureModal = () => {
    setIsAwaitingSignatureModalOpen(true);
  };

  const handleCloseAwaitingSignatureModal = () => {
    setIsAwaitingSignatureModalOpen(false);
  };
  
  const handleOpenUnsignedModal = () => {
    setIsUnsignedModalOpen(true);
  };

  const handleCloseUnsignedModal = () => {
    setIsUnsignedModalOpen(false);
  };
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Incomplete Service Calls',
      message: 'You have service calls past their scheduled date.',
      type: 'warning',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      title: 'Awaiting Signatures',
      message: 'Certificate waiting for customer signature.',
      type: 'info',
      time: 'Just now',
      read: false
    },
    {
      id: '3',
      title: 'Service Call Completed',
      message: 'Service call for ABC Construction has been completed.',
      type: 'success',
      time: 'Yesterday',
      read: true
    }
  ]);
  
  const handleNotificationClick = (notification: Notification) => {
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    
    if (notification.title === 'Incomplete Service Calls') {
      setIsIncompleteModalOpen(true);
    } else if (notification.title === 'Awaiting Signatures') {
      setIsAwaitingSignatureModalOpen(true);
    }
  };
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };
  
  const handleClearNotifications = () => {
    setNotifications([]);
  };
  
  const notificationCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="p-3 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 gap-3 md:gap-4">
        <Header 
          title="Schedule" 
          subtitle="Manage your service calls and work schedule"
          className="mb-0"
        />
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 relative"
            onClick={toggleAnalyticsPanel}
          >
            <BarChart2 className="h-5 w-5 text-gray-600" />
          </Button>
          
          <NotificationDropdown 
            notificationCount={notificationCount}
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onClearNotifications={handleClearNotifications}
          />
          
          <div className="flex gap-2">
            <Button onClick={handleOpenCreateModal}>
              <Plus className="h-4 w-4 mr-2" />
              {!isMobile ? "New Service Call" : "New"}
            </Button>
            
            <Button variant="outline" onClick={() => handleOpenCertificateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {!isMobile ? "New Certificate" : "Cert"}
            </Button>
          </div>
        </div>
      </div>
      
      {incompleteAlerts > 0 && (
        <Alert 
          variant="error" 
          className="mb-4 text-sm cursor-pointer" 
          onClick={handleOpenIncompleteModal}
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Incomplete Service Calls</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm flex flex-wrap items-center justify-between">
            <span>You have {incompleteAlerts} service call(s) past their scheduled date.</span>
            <Button 
              variant="error"
              size="sm"
              className="mt-2 sm:mt-0"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenIncompleteModal();
              }}
            >
              View Calls
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {pendingSignatureAlerts > 0 && (
        <Alert 
          variant="warning" 
          className="mb-4 text-sm cursor-pointer"
          onClick={handleOpenAwaitingSignatureModal}
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Awaiting Signatures</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm flex flex-wrap items-center justify-between">
            <span>You have {pendingSignatureAlerts} certificate(s) awaiting signatures.</span>
            <Button 
              variant="warning"
              size="sm"
              className="mt-2 sm:mt-0"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenAwaitingSignatureModal();
              }}
            >
              View Calls
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {unsignedAlerts > 0 && (
        <Alert 
          variant="warning" 
          className="mb-4 text-sm cursor-pointer"
          onClick={handleOpenUnsignedModal}
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Unsigned Certificates</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm flex flex-wrap items-center justify-between">
            <span>You have {unsignedAlerts} completed service call(s) without signatures.</span>
            <Button 
              variant="warning"
              size="sm"
              className="mt-2 sm:mt-0"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenUnsignedModal();
              }}
            >
              View Calls
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="mb-4 md:mb-6 bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200">
        <div className={cn(
          "flex flex-col md:flex-row md:items-center",
          isMobile ? "space-y-3" : "justify-between"
        )}>
          <div className="flex items-center space-x-2 md:space-x-4 overflow-x-auto py-1 no-scrollbar">
            <Button 
              variant={projectFilter === 'active' ? 'default' : 'outline'}
              onClick={() => {
                setProjectFilter('active');
                setStatusFilter('all');
              }}
              className="whitespace-nowrap relative"
              size={isMobile ? "sm" : "default"}
            >
              Active Projects
              {(incompleteAlerts + pendingSignatureAlerts) > 0 && (
                <Badge 
                  variant="countRed" 
                  className="absolute -top-2 -right-2 flex items-center justify-center h-5 min-w-[1.3rem] text-[11px] font-medium rounded-full z-10"
                >
                  {incompleteAlerts + pendingSignatureAlerts}
                </Badge>
              )}
            </Button>
            <Button 
              variant={projectFilter === 'completed' ? 'default' : 'outline'}
              onClick={() => {
                setProjectFilter('completed');
                setStatusFilter('all');
              }}
              className="whitespace-nowrap relative"
              size={isMobile ? "sm" : "default"}
            >
              Completed Projects
              {unsignedAlerts > 0 && (
                <Badge 
                  variant="countAmber" 
                  className="absolute -top-2 -right-2 flex items-center justify-center h-5 min-w-[1.3rem] text-[11px] font-medium rounded-full z-10"
                >
                  {unsignedAlerts}
                </Badge>
              )}
            </Button>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToPreviousDay}
              className="h-8 w-8 md:h-10 md:w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <h2 className="text-base md:text-lg font-medium mx-2 md:mx-4 whitespace-nowrap">
              {formattedDate}
            </h2>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToNextDay}
              className="h-8 w-8 md:h-10 md:w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 space-y-3 md:space-y-0">
        <Tabs 
          defaultValue="all" 
          className="flex-grow w-full overflow-x-auto"
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <TabsList className="bg-white border border-gray-200 w-full md:w-auto overflow-x-auto no-scrollbar">
            <TabsTrigger value="all" className="text-xs md:text-sm">All</TabsTrigger>
            
            {projectFilter === 'active' && (
              <>
                <TabsTrigger value="pending" className="text-xs md:text-sm relative">
                  Pending
                  {statusFilter !== 'pending' && incompleteAlerts > 0 && (
                    <Badge 
                      variant="countBlue" 
                      className="ml-1 text-xs flex items-center justify-center min-w-[1.3rem] h-5 rounded-full font-medium"
                    >
                      {incompleteAlerts}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="scheduled" className="text-xs md:text-sm">Scheduled</TabsTrigger>
                <TabsTrigger value="in-progress" className="text-xs md:text-sm">In Progress</TabsTrigger>
                <TabsTrigger value="incomplete" className="text-xs md:text-sm relative">
                  Incomplete
                  {statusFilter !== 'incomplete' && incompleteAlerts > 0 && (
                    <Badge 
                      variant="countRed" 
                      className="ml-1 text-xs flex items-center justify-center min-w-[1.3rem] h-5 rounded-full font-medium"
                    >
                      {incompleteAlerts}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="awaiting-signature" className="text-xs md:text-sm relative">
                  Awaiting Signature
                  {statusFilter !== 'awaiting-signature' && pendingSignatureAlerts > 0 && (
                    <Badge 
                      variant="countRed" 
                      className="ml-1 text-xs flex items-center justify-center min-w-[1.3rem] h-5 rounded-full font-medium"
                    >
                      {pendingSignatureAlerts}
                    </Badge>
                  )}
                </TabsTrigger>
              </>
            )}
            
            {projectFilter === 'completed' && (
              <>
                <TabsTrigger value="completed" className="text-xs md:text-sm">Completed</TabsTrigger>
                <TabsTrigger value="physical-signature" className="text-xs md:text-sm">Physical Signed</TabsTrigger>
                <TabsTrigger value="without-signature" className="text-xs md:text-sm relative">
                  Unsigned
                  {statusFilter !== 'without-signature' && unsignedAlerts > 0 && (
                    <Badge 
                      variant="countAmber" 
                      className="ml-1 text-xs flex items-center justify-center min-w-[1.3rem] h-5 rounded-full font-medium"
                    >
                      {unsignedAlerts}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="canceled" className="text-xs md:text-sm">Canceled</TabsTrigger>
              </>
            )}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full md:w-auto md:ml-4 justify-between md:justify-end">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 md:h-10 md:w-10"
          >
            <Filter className="h-4 w-4 text-gray-600" />
          </Button>
          
          <div className="bg-white border border-gray-200 rounded-md flex">
            <Button 
              variant="ghost" 
              className={`rounded-none text-xs md:text-sm px-2 md:px-3 ${view === 'list' ? 'bg-gray-100' : ''}`}
              onClick={() => setView('list')}
            >
              <List className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              {!isMobile && "List"}
            </Button>
            <Button 
              variant="ghost" 
              className={`rounded-none text-xs md:text-sm px-2 md:px-3 ${view === 'grid' ? 'bg-gray-100' : ''}`}
              onClick={() => setView('grid')}
            >
              <Grid className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              {!isMobile && "Grid"}
            </Button>
            <Button 
              variant="ghost" 
              className={`rounded-none text-xs md:text-sm px-2 md:px-3 ${view === 'calendar' ? 'bg-gray-100' : ''}`}
              onClick={() => setView('calendar')}
            >
              <CalendarClock className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              {!isMobile && "Calendar"}
            </Button>
          </div>
        </div>
      </div>
      
      {view === 'calendar' ? (
        <ScheduleCalendarView 
          scheduleCalls={filteredCalls}
          onOpenServiceCallModal={handleOpenViewModal}
          onOpenCertificateModal={(call) => {
            setSelectedCall(call);
            setIsCertificateModalOpen(true);
          }}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ) : view === 'list' ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <ScheduleList 
            schedules={filteredCalls}
            onOpenModal={handleOpenViewModal}
            onDeleteCall={handleDeleteCall}
            onUploadSignature={handleUploadSignature}
            statusFilter={statusFilter}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <ScheduleGrid 
            schedules={filteredCalls}
            onOpenModal={handleOpenViewModal}
            onDeleteCall={handleDeleteCall}
            onUploadSignature={handleUploadSignature}
            statusFilter={statusFilter}
          />
        </div>
      )}
      
      {isCreateCallModalOpen && (
        <ServiceCallModal
          isOpen={true}
          onClose={handleCloseModal}
          onSave={handleCreateCall}
        />
      )}
      
      {isEditCallModalOpen && selectedCall && (
        <ServiceCallModal
          isOpen={true}
          onClose={handleCloseModal}
          serviceCall={selectedCall}
          onSave={handleUpdateCall}
        />
      )}
      
      {isViewCallModalOpen && selectedCall && (
        <ScheduleEventModal
          isOpen={true}
          onClose={handleCloseModal}
          event={selectedCall}
          onStatusChange={(event, newStatus) => {
            const updatedCall = { ...event, status: newStatus };
            handleUpdateCall(updatedCall);
          }}
          onEdit={handleOpenEditModal}
          onSave={handleUpdateCall}
          onConvertToDeliveryCertificate={(updatedCall) => {
            handleUpdateCall(updatedCall);
          }}
        />
      )}
      
      {isCertificateModalOpen && (
        <DeliveryCertificateModal
          isOpen={true}
          onClose={handleCloseCertificateModal}
          serviceCall={isCreateCertificateOnly ? null : selectedCall}
          onSave={handleSaveCertificate}
          createOnly={isCreateCertificateOnly}
        />
      )}
      
      <IncompleteServiceCallsModal 
        isOpen={isIncompleteModalOpen}
        onClose={handleCloseIncompleteModal}
        incompleteCalls={incompleteCalls}
        onOpenModal={handleOpenEditModal}
        onDeleteCall={handleDeleteCall}
        onUploadSignature={handleUploadSignature}
        title="Incomplete Service Calls"
        status="incomplete"
      />
      
      <IncompleteServiceCallsModal 
        isOpen={isAwaitingSignatureModalOpen}
        onClose={handleCloseAwaitingSignatureModal}
        incompleteCalls={awaitingSignatureCalls}
        onOpenModal={handleOpenEditModal}
        onDeleteCall={handleDeleteCall}
        onUploadSignature={handleUploadSignature}
        title="Awaiting Signatures"
        status="awaiting-signature"
      />
      
      <IncompleteServiceCallsModal 
        isOpen={isUnsignedModalOpen}
        onClose={handleCloseUnsignedModal}
        incompleteCalls={unsignedCalls}
        onOpenModal={handleOpenEditModal}
        onDeleteCall={handleDeleteCall}
        onUploadSignature={handleUploadSignature}
        title="Unsigned Certificates"
        status="without-signature"
      />
      
      <AnalyticsPanel
        isOpen={isAnalyticsPanelOpen}
        onClose={() => setIsAnalyticsPanelOpen(false)}
        title="Schedule Analytics"
        defaultTimeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      >
        <ScheduleAnalytics timeRange={timeRange} />
      </AnalyticsPanel>
    </div>
  );
};

export default Schedule;
