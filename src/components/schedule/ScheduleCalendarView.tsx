import React, { useState, useMemo } from 'react';
import { 
  Calendar, ChevronLeft, ChevronRight, Plus, Clock, User, 
  MapPin, ChevronDown, FileText, Edit, Info, Check, X,
  Calendar as CalendarIcon, Clock3, Grid3X3, List, AlertTriangle
} from 'lucide-react';
import { 
  format, addMonths, subMonths, setDefaultOptions, addDays, 
  startOfWeek, endOfWeek, isSameDay, isBefore, isAfter, 
  addWeeks, subWeeks, isWithinInterval, parseISO, 
  isToday as isDateToday, startOfDay, endOfDay
} from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ScheduleCall } from '@/pages/Schedule';
import Avatar from '@/components/Avatar';
import StatusBadge from '@/components/StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedDayView from './EnhancedDayView';
import { useIsMobile } from '@/hooks/use-mobile';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import CalendarEventCard from './CalendarEventCard';
import ServiceCallPreviewDialog from './ServiceCallPreviewDialog';
import { 
  getTimeSlotBackground, 
  getTimeSlotHeight, 
  getEventTopPosition, 
  estimateEventDuration,
  calculateEventPosition
} from './serviceInfoUtils';

setDefaultOptions({ locale: enUS });

type CalendarViewType = 'day' | 'week' | 'month';

interface ScheduleCalendarViewProps {
  scheduleCalls: ScheduleCall[];
  onOpenServiceCallModal: (call: ScheduleCall) => void;
  onOpenCertificateModal: (call: ScheduleCall) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const ScheduleCalendarView: React.FC<ScheduleCalendarViewProps> = ({
  scheduleCalls,
  onOpenServiceCallModal,
  onOpenCertificateModal,
  selectedDate,
  setSelectedDate
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isDayViewOpen, setIsDayViewOpen] = useState(false);
  const [calendarView, setCalendarView] = useState<CalendarViewType>('month');
  const [hoveredEvent, setHoveredEvent] = useState<ScheduleCall | null>(null);
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  const [previewCall, setPreviewCall] = useState<ScheduleCall | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isMobile = useIsMobile();

  const navigatePrevious = () => {
    if (calendarView === 'month') {
      setCurrentMonth(subMonths(currentMonth, 1));
    } else if (calendarView === 'week') {
      setCurrentMonth(subWeeks(currentMonth, 1));
    } else if (calendarView === 'day') {
      setCurrentMonth(addDays(currentMonth, -1));
    }
  };

  const navigateNext = () => {
    if (calendarView === 'month') {
      setCurrentMonth(addMonths(currentMonth, 1));
    } else if (calendarView === 'week') {
      setCurrentMonth(addWeeks(currentMonth, 1));
    } else if (calendarView === 'day') {
      setCurrentMonth(addDays(currentMonth, 1));
    }
  };
  
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  const getMonthDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ date: null, isPadding: true });
    }
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push({ date, isPadding: false });
    }
    
    return days;
  };
  
  const getWeekDays = () => {
    const start = startOfWeek(currentMonth);
    const end = endOfWeek(currentMonth);
    const days = [];
    
    let day = start;
    while (isBefore(day, end) || isSameDay(day, end)) {
      days.push({ date: new Date(day), isPadding: false });
      day = addDays(day, 1);
    }
    
    return days;
  };

  const getDayHours = () => {
    const hours = [];
    for (let hour = 6; hour < 21; hour++) {
      const hourDate = new Date(currentMonth);
      hourDate.setHours(hour, 0, 0, 0);
      hours.push(hourDate);
    }
    return hours;
  };

  const getDays = () => {
    if (calendarView === 'month') {
      return getMonthDays();
    } else if (calendarView === 'week') {
      return getWeekDays();
    } else if (calendarView === 'day') {
      return [{ date: currentMonth, isPadding: false }];
    }
    
    return [];
  };
  
  const formatDateForComparison = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
  };
  
  const getServiceCallsForDate = (date: Date) => {
    if (!date) return [];
    
    const dateString = formatDateForComparison(date);
    
    return scheduleCalls.filter(call => {
      if (!call.date) return false;
      const callDate = format(new Date(call.date), 'yyyy-MM-dd');
      return callDate === dateString;
    });
  };
  
  const getEventsForHour = (date: Date, hour: number) => {
    if (!date) return [];
    
    const startHour = new Date(date);
    startHour.setHours(hour, 0, 0, 0);
    
    const endHour = new Date(date);
    endHour.setHours(hour, 59, 59, 999);
    
    return scheduleCalls.filter(call => {
      if (!call.date) return false;
      
      const callDate = new Date(call.date);
      
      if (!call.startTime) return false;
      
      // Extract hour from startTime
      const timeMatch = call.startTime.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (!timeMatch) return false;
      
      let callHour = parseInt(timeMatch[1], 10);
      const minutes = parseInt(timeMatch[2], 10);
      const ampm = timeMatch[3]?.toUpperCase();
      
      // Adjust hour based on AM/PM
      if (ampm === 'PM' && callHour !== 12) callHour += 12;
      if (ampm === 'AM' && callHour === 12) callHour = 0;
      
      callDate.setHours(callHour, minutes, 0, 0);
      
      return callDate >= startHour && callDate <= endHour && 
             formatDateForComparison(callDate) === formatDateForComparison(date);
    });
  };
  
  const handleDayClick = (date: Date) => {
    if (!date) return;
    
    setSelectedDate(date);
    const calls = getServiceCallsForDate(date);
    
    if (calls.length > 0) {
      setIsDayViewOpen(true);
    } else {
      onOpenServiceCallModal({
        id: '',
        customer: '',
        address: '',
        date: date.toISOString(),
        endDate: date.toISOString(),
        status: 'pending',
        operator: '',
        serviceType: '',
        notes: ''
      });
    }
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    if (!date) return;
    
    const newDate = new Date(date);
    newDate.setHours(hour, 0, 0, 0);
    
    setSelectedDate(newDate);
    onOpenServiceCallModal({
      id: '',
      customer: '',
      address: '',
      date: newDate.toISOString(),
      endDate: newDate.toISOString(),
      status: 'pending',
      operator: '',
      serviceType: '',
      notes: '',
      startTime: `${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`
    });
  };
  
  const handleEventHover = (call: ScheduleCall) => {
    setHoveredEvent(call);
  };
  
  const handleEventLeave = () => {
    setHoveredEvent(null);
  };
  
  const handleCardClick = (call: ScheduleCall) => {
    setIsDayViewOpen(false);
    setPreviewCall(call);
    setIsPreviewOpen(true);
  };
  
  const handleQuickEdit = (call: ScheduleCall) => {
    onOpenServiceCallModal(call);
  };
  
  const handleQuickCertificate = (call: ScheduleCall) => {
    onOpenCertificateModal(call);
  };
  
  const handleDayHover = (date: Date) => {
    setHoveredDay(date);
  };
  
  const handleDayLeave = () => {
    setHoveredDay(null);
  };
  
  const handleCloseDayView = () => {
    setIsDayViewOpen(false);
  };
  
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewCall(null);
  };
  
  const handleCreateServiceCall = () => {
    onOpenServiceCallModal({
      id: '',
      customer: '',
      address: '',
      date: selectedDate.toISOString(),
      endDate: selectedDate.toISOString(),
      status: 'pending',
      operator: '',
      serviceType: '',
      notes: ''
    });
  };
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const isToday = (date: Date) => {
    if (!date) return false;
    const today = new Date();
    return formatDateForComparison(date) === formatDateForComparison(today);
  };
  
  const isSelectedDate = (date: Date) => {
    if (!date || !selectedDate) return false;
    return formatDateForComparison(date) === formatDateForComparison(selectedDate);
  };
  
  const isSpecialDate = (date: Date) => {
    if (!date) return false;
    return format(date, 'yyyy-MM-dd') === '2025-03-27';
  };

  const getHeaderText = () => {
    if (calendarView === 'month') {
      return format(currentMonth, 'MMMM yyyy');
    } else if (calendarView === 'week') {
      const weekStart = startOfWeek(currentMonth);
      const weekEnd = endOfWeek(currentMonth);
      const sameMonth = weekStart.getMonth() === weekEnd.getMonth();
      
      if (sameMonth) {
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'd, yyyy')}`;
      } else {
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      }
    } else {
      return format(currentMonth, 'EEEE, MMMM d, yyyy');
    }
  };

  const days = useMemo(() => getDays(), [currentMonth, calendarView]);
  const hours = useMemo(() => getDayHours(), [currentMonth]);

  const renderMonthView = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="grid grid-cols-7 gap-1 md:gap-2"
      >
        {daysOfWeek.map(day => (
          <div key={day} className="text-center py-2 font-medium text-gray-600 text-xs md:text-sm">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => {
          if (day.isPadding) {
            return <div key={`padding-${index}`} className="h-24 md:h-32 bg-gray-50 rounded-lg border border-gray-100"></div>;
          }
          
          const dateServiceCalls = getServiceCallsForDate(day.date);
          const totalCalls = dateServiceCalls.length;
          const displayCalls = totalCalls > 2 ? dateServiceCalls.slice(0, 2) : dateServiceCalls;
          const hiddenCalls = totalCalls - displayCalls.length;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0.8, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
              onClick={() => handleDayClick(day.date)}
              onMouseEnter={() => handleDayHover(day.date)}
              onMouseLeave={handleDayLeave}
              className={cn(
                "h-24 md:h-32 p-1 overflow-hidden border rounded-lg transition-all duration-200 cursor-pointer group relative",
                isToday(day.date) ? "border-blue-500 bg-blue-50" : "border-gray-100",
                isSelectedDate(day.date) ? "ring-2 ring-blue-400" : "",
                totalCalls > 0 ? "hover:border-blue-300" : "hover:bg-gray-50",
              )}
            >
              <div className="absolute top-0 right-0 left-0 h-6 flex items-center justify-between px-2">
                <div 
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-sm",
                    isToday(day.date) ? "bg-blue-500 text-white" : "text-gray-700"
                  )}
                >
                  {format(day.date, 'd')}
                </div>
                
                {(isHoveredDay(day.date) || totalCalls > 0) && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button 
                      className="p-1 hover:bg-blue-100 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCreateServiceCall();
                      }}
                    >
                      <Plus className="h-3 w-3 text-blue-600" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="space-y-1 overflow-hidden mt-5">
                {displayCalls.map((call, idx) => (
                  <CalendarEventCard 
                    key={idx} 
                    event={call} 
                    onEdit={handleQuickEdit}
                    onCertificate={handleQuickCertificate}
                    onClickCard={(call) => handleCardClick(call)}
                  />
                ))}
                
                {hiddenCalls > 0 && (
                  <div 
                    className="text-xs text-blue-600 bg-blue-50 rounded px-2 py-1 hover:bg-blue-100 cursor-pointer mt-1 text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDate(day.date);
                      setIsDayViewOpen(true);
                    }}
                  >
                    + {hiddenCalls} more
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  const isHoveredDay = (date: Date) => {
    if (!hoveredDay || !date) return false;
    return formatDateForComparison(hoveredDay) === formatDateForComparison(date);
  };

  const renderTimeLabels = () => {
    return (
      <div className="w-16 flex-shrink-0 pr-2 relative z-10">
        {hours.map((hour) => (
          <div 
            key={hour.getHours()} 
            className="h-[72px] flex items-start justify-end text-xs text-gray-500 -mt-3 pointer-events-none"
          >
            <span className="bg-white px-1">{format(hour, 'h a')}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderDayColumn = (day: Date, dayIndex: number) => {
    const dayEvents = getServiceCallsForDate(day);
    
    const eventsByHour: { [hour: number]: ScheduleCall[] } = {};
    
    dayEvents.forEach(event => {
      const timeMatch = event.startTime?.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (!timeMatch) return;
      
      let hours = parseInt(timeMatch[1], 10);
      const ampm = timeMatch[3]?.toUpperCase();
      
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      
      if (!eventsByHour[hours]) eventsByHour[hours] = [];
      eventsByHour[hours].push(event);
    });

    return (
      <div 
        key={dayIndex}
        className={cn(
          "flex-1 relative",
          isToday(day) ? "bg-blue-50/30" : ""
        )}
      >
        {hours.map((hour) => (
          <div 
            key={hour.getHours()}
            className={cn(
              "h-[72px] border-b border-gray-100 relative hover:bg-gray-100/50 transition-colors cursor-pointer",
              getTimeSlotBackground(hour.getHours()),
              isToday(day) && hour.getHours() === new Date().getHours() ? "bg-blue-100/30" : ""
            )}
            onClick={() => handleTimeSlotClick(day, hour.getHours())}
          >
            <div className="absolute left-0 right-0 top-0 h-px bg-gray-200 z-10"></div>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-100 z-10"></div>
            <div className="absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center">
              <div className="p-1 bg-blue-100 rounded-full">
                <Plus className="h-3 w-3 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
        
        {dayEvents.map((event, eventIndex) => {
          const topPosition = getEventTopPosition(event.startTime || '9:00 AM');
          const duration = estimateEventDuration(event.startTime || '');
          const height = (duration / 60) * 72;
          const { width, left } = calculateEventPosition(dayEvents, event, eventIndex);
          
          return (
            <div 
              key={event.id}
              className="absolute z-20"
              style={{ 
                top: `${topPosition}px`, 
                height: `${height}px`,
                left: left,
                width: width,
                padding: '2px'
              }}
            >
              <CalendarEventCard 
                event={event} 
                onEdit={handleQuickEdit}
                onCertificate={handleQuickCertificate}
                onClickCard={(event) => handleCardClick(event)}
                compact={true}
                className="h-full"
              />
            </div>
          );
        })}
        
        {isToday(day) && (
          <div 
            className="absolute left-0 right-0 border-t border-red-500 z-30"
            style={{
              top: `${((new Date().getHours() - 6) * 72) + (new Date().getMinutes() * 72 / 60)}px`
            }}
          >
            <div className="w-2 h-2 rounded-full bg-red-500 -mt-1 -ml-1" />
          </div>
        )}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays();
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex flex-col"
      >
        <div className="grid grid-cols-7 gap-1 mb-4">
          {weekDays.map((day, index) => (
            <div 
              key={index} 
              className={cn(
                "text-center pb-2",
                isToday(day.date) ? "font-bold text-blue-600" : ""
              )}
            >
              <div className="font-medium text-gray-600 mb-1">
                {format(day.date, 'EEE')}
              </div>
              <div
                className={cn(
                  "inline-flex items-center justify-center h-8 w-8 rounded-full text-sm mx-auto",
                  isToday(day.date) ? "bg-blue-500 text-white" : "text-gray-700",
                  isSelectedDate(day.date) ? "ring-2 ring-blue-400" : ""
                )}
                onClick={() => {
                  setSelectedDate(day.date);
                  setCalendarView('day');
                }}
              >
                {format(day.date, 'd')}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="flex h-[800px] overflow-y-auto">
            {renderTimeLabels()}
            
            <div className="flex-1 flex divide-x border-l">
              {weekDays.map((day, dayIndex) => renderDayColumn(day.date, dayIndex))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderDayView = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex flex-col"
      >
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">
              {format(currentMonth, 'EEEE, MMMM d, yyyy')}
              {isToday(currentMonth) && (
                <Badge variant="default" className="ml-2 bg-blue-500">Today</Badge>
              )}
            </h2>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCreateServiceCall}>
                <Plus className="h-4 w-4 mr-1" />
                New Call
              </Button>
            </div>
          </div>
          
          <div className="flex h-[800px] overflow-y-auto">
            {renderTimeLabels()}
            
            <div className="flex-1 border-l">
              {renderDayColumn(currentMonth, 0)}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Button 
            variant="outline" 
            size="icon"
            onClick={navigatePrevious}
            className="mr-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h2 className="text-lg font-medium mx-2">
            {getHeaderText()}
          </h2>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={navigateNext}
            className="ml-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={goToToday}
            className="ml-4"
          >
            Today
          </Button>
        </div>
        
        <div className="flex items-center">
          <ToggleGroup type="single" value={calendarView} onValueChange={(value) => value && setCalendarView(value as CalendarViewType)}>
            <ToggleGroupItem value="day" aria-label="Day view">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4" />
                      {!isMobile && <span className="ml-2">Day</span>}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Day view</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ToggleGroupItem>
            <ToggleGroupItem value="week" aria-label="Week view">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <Clock3 className="h-4 w-4" />
                      {!isMobile && <span className="ml-2">Week</span>}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Week view</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ToggleGroupItem>
            <ToggleGroupItem value="month" aria-label="Month view">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <Grid3X3 className="h-4 w-4" />
                      {!isMobile && <span className="ml-2">Month</span>}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Month view</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {calendarView === 'month' && renderMonthView()}
        {calendarView === 'week' && renderWeekView()}
        {calendarView === 'day' && renderDayView()}
      </AnimatePresence>
      
      <EnhancedDayView
        selectedDate={selectedDate}
        scheduleItems={getServiceCallsForDate(selectedDate)}
        isOpen={isDayViewOpen}
        onClose={handleCloseDayView}
        onEventSelect={handleCardClick}
        onCreateNew={handleCreateServiceCall}
      />
      
      {previewCall && (
        <ServiceCallPreviewDialog
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          serviceCall={previewCall}
          onEdit={handleQuickEdit}
          onCreateCertificate={handleQuickCertificate}
        />
      )}
    </div>
  );
};

export default ScheduleCalendarView;
