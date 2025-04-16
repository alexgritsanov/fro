
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, Clock, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DatePicker } from "@/components/ui/date-picker";
import { StepProps, containerVariants } from '../serviceInfoUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';

interface ScheduleStepProps extends StepProps {
  date: Date;
  setDate: (date: Date) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  moveToPrevStep: () => void;
}

const ScheduleStep: React.FC<ScheduleStepProps> = ({
  date,
  setDate,
  startTime,
  setStartTime,
  moveToNextStep,
  moveToPrevStep
}) => {
  const [selectedTimeOption, setSelectedTimeOption] = React.useState<string>(startTime);
  const timePickerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const hourNum = hour;
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        const displayHour = hourNum % 12 || 12;
        const displayTime = `${displayHour}:${formattedMinute} ${ampm}`;
        options.push({
          value: `${formattedHour}:${formattedMinute}`,
          display: displayTime
        });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleTimeSelect = (time: string) => {
    setStartTime(time);
    setSelectedTimeOption(time);
  };

  // Scroll time picker to selected time
  useEffect(() => {
    if (timePickerRef.current && selectedTimeOption) {
      const selectedEl = timePickerRef.current.querySelector(`[data-value="${selectedTimeOption}"]`);
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedTimeOption, timePickerRef.current]);

  const formattedDate = date ? format(date, 'MMMM d, yyyy') : 'Select a date';

  return (
    <motion.div 
      key="schedule"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col min-h-[450px] md:min-h-[500px] p-4 md:p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center mb-4 md:mb-6">
        <CalendarIcon className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mr-2 md:mr-3" />
        <h2 className="text-xl md:text-2xl font-bold">Schedule Service</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="flex flex-col">
          <p className="font-medium mb-2 md:mb-3 text-gray-600 text-sm md:text-base">
            {formattedDate}
          </p>
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            {/* Calendar is now directly visible */}
            <div className="p-2 md:p-4">
              <DatePicker
                date={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="border-0 shadow-none w-full"
                minDate={new Date()}
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col">
          <p className="font-medium mb-2 md:mb-3 text-gray-600 text-sm md:text-base">Select Time</p>
          <div className="border border-gray-200 rounded-lg h-[200px] md:h-[280px] overflow-hidden">
            <div 
              ref={timePickerRef}
              className="max-h-[200px] md:max-h-[280px] overflow-y-auto p-2 scrollbar-thin"
            >
              <div className="grid grid-cols-2 gap-1">
                {timeOptions.map((time) => (
                  <Button
                    key={time.value}
                    data-value={time.value}
                    variant={time.value === selectedTimeOption ? "default" : "ghost"}
                    size={isMobile ? "sm" : "sm"}
                    className={cn(
                      "justify-start py-2 md:py-3 px-2 md:px-3 text-left rounded-md transition-colors text-xs md:text-sm",
                      time.value === selectedTimeOption ? "bg-blue-600" : "hover:bg-blue-50"
                    )}
                    onClick={() => handleTimeSelect(time.value)}
                  >
                    <Clock className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1 md:mr-2 opacity-70" />
                    {time.display}
                    {time.value === selectedTimeOption && (
                      <Check className="h-3 w-3 md:h-4 md:w-4 ml-auto" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto pt-4 md:pt-6 flex justify-between">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className={`${isMobile ? 'text-base h-10 px-4' : 'text-lg h-12 px-8'}`}
        >
          Back
        </Button>
        <Button 
          onClick={moveToNextStep} 
          className={`${isMobile ? 'text-base h-10 px-4' : 'text-lg h-12 px-8'} bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-md`}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ScheduleStep;
