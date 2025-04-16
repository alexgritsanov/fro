
import React, { useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, X } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';

// Setup the localizer for the calendar
const localizer = momentLocalizer(moment);

interface OperatorCalendarPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  operatorId: string;
  operatorName: string;
  currentDate: Date;
}

const OperatorCalendarPreview: React.FC<OperatorCalendarPreviewProps> = ({
  isOpen,
  onClose,
  operatorId,
  operatorName,
  currentDate
}) => {
  const [viewDate, setViewDate] = useState<Date>(currentDate);
  const [view, setView] = useState<string>(Views.WEEK);

  // Mock events for demonstration
  const events = React.useMemo(() => {
    // This would be replaced with actual data fetched for the operator
    return [
      {
        id: 1,
        title: 'Concrete Pumping - Site A',
        start: new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate(), 9, 0),
        end: new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate(), 12, 0),
        resourceId: operatorId,
        customer: 'ABC Construction',
        location: 'Site A, Jerusalem',
        status: 'confirmed',
      },
      {
        id: 2,
        title: 'Crane Service - Site B',
        start: addDays(new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate(), 14, 0), 1),
        end: addDays(new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate(), 17, 0), 1),
        resourceId: operatorId,
        customer: 'XYZ Builders',
        location: 'Site B, Tel Aviv',
        status: 'pending',
      },
      {
        id: 3,
        title: 'Transportation - Site C',
        start: addDays(new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate(), 10, 0), 2),
        end: addDays(new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate(), 16, 0), 2),
        resourceId: operatorId,
        customer: '123 Development',
        location: 'Site C, Haifa',
        status: 'confirmed',
      },
    ];
  }, [viewDate, operatorId]);

  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    if (action === 'PREV') {
      setViewDate(prevDate => view === Views.DAY ? subDays(prevDate, 1) : 
                            view === Views.WEEK ? subDays(prevDate, 7) : 
                            new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    } else if (action === 'NEXT') {
      setViewDate(prevDate => view === Views.DAY ? addDays(prevDate, 1) : 
                            view === Views.WEEK ? addDays(prevDate, 7) : 
                            new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    } else {
      setViewDate(new Date());
    }
  };

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  const eventStyleGetter = (event: any) => {
    let backgroundColor = '#3366FF';
    let borderColor = '#2952CC';
    
    if (event.status === 'pending') {
      backgroundColor = '#FF9500';
      borderColor = '#CC7A00';
    }
    
    return {
      style: {
        backgroundColor,
        borderColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '1px solid',
        display: 'block',
        fontWeight: '600',
        fontSize: '0.8rem',
        padding: '2px 4px'
      }
    };
  };

  const EventComponent = ({ event }: { event: any }) => (
    <div className="w-full h-full overflow-hidden">
      <div className="text-xs font-bold truncate">{event.title}</div>
      {event.customer && (
        <div className="text-xs truncate opacity-90">{event.customer}</div>
      )}
    </div>
  );

  const CustomToolbar = ({ onNavigate, label }: any) => (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onNavigate('PREV')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => onNavigate('TODAY')}>
          Today
        </Button>
        <Button variant="outline" size="sm" onClick={() => onNavigate('NEXT')}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="text-lg font-semibold">{label}</div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant={view === Views.DAY ? 'default' : 'outline'} 
          size="sm"
          onClick={() => handleViewChange(Views.DAY)}
        >
          Day
        </Button>
        <Button 
          variant={view === Views.WEEK ? 'default' : 'outline'} 
          size="sm"
          onClick={() => handleViewChange(Views.WEEK)}
        >
          Week
        </Button>
        <Button 
          variant={view === Views.MONTH ? 'default' : 'outline'} 
          size="sm"
          onClick={() => handleViewChange(Views.MONTH)}
        >
          Month
        </Button>
      </div>
    </div>
  );

  const EventDetails = ({ event }: { event: any }) => (
    <div className="p-3 bg-white rounded-md shadow-md border">
      <h3 className="font-semibold text-lg">{event.title}</h3>
      <div className="mt-2 space-y-2">
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-2 text-gray-500" />
          <span>
            {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
          <span>{event.location}</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t flex justify-end">
        <Button size="sm">View Details</Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              {operatorName}'s Schedule
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="h-[600px] overflow-y-auto">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            view={view}
            date={viewDate}
            onNavigate={(date) => setViewDate(date)}
            onView={(newView) => setView(newView)}
            eventPropGetter={eventStyleGetter}
            components={{
              event: EventComponent,
              toolbar: (props) => <CustomToolbar {...props} onNavigate={handleNavigate} label={format(viewDate, 'MMMM yyyy')} />,
              eventWrapper: ({ event, children }) => (
                <div title={event.title}>{children}</div>
              ),
            }}
            popup
            popupOffset={10}
            tooltipAccessor={null}
            onSelectEvent={(event) => console.log('Selected event:', event)}
            onSelectSlot={(slotInfo) => console.log('Selected slot:', slotInfo)}
            selectable
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OperatorCalendarPreview;
