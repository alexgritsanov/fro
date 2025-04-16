
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateSelectionProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  date,
  setDate
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <CalendarIcon className="h-4 w-4 mr-1.5 text-blue-600" />
        Date
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal border-gray-200 bg-white ${!date && "text-gray-400"}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && setDate(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelection;
