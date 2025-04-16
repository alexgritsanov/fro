
import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  onSelect: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
  minDate?: Date
  showCalendarByDefault?: boolean
}

export function DatePicker({ 
  date, 
  onSelect, 
  className, 
  disabled, 
  minDate,
  showCalendarByDefault = false
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  
  // Format the date safely, return a placeholder if date is invalid
  const formatDateSafely = (date: Date | undefined) => {
    if (!date || isNaN(date.getTime())) {
      return undefined;
    }
    try {
      return format(date, "PPP");
    } catch (error) {
      console.error("Date formatting error:", error);
      return undefined;
    }
  };
  
  const formattedDate = formatDateSafely(date);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !formattedDate && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedDate ? formattedDate : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date && !isNaN(date.getTime()) ? date : undefined}
          onSelect={(newDate) => {
            onSelect(newDate);
            setOpen(false);
          }}
          initialFocus
          className="p-3 pointer-events-auto"
          disabled={(currentDate) => {
            if (!currentDate || !minDate) return false;
            return currentDate < minDate;
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
