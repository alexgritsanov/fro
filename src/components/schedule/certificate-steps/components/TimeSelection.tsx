
import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSelectionProps {
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime
}) => {
  // Generate time options for every 30 minutes
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

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center">
          <Clock className="h-4 w-4 mr-1.5 text-blue-600" />
          Start time
        </label>
        <div className="border border-gray-200 rounded-md h-[200px] overflow-y-auto p-2">
          <div className="grid grid-cols-2 gap-1">
            {timeOptions.map((time) => (
              <button
                key={`start-${time.value}`}
                type="button"
                onClick={() => setStartTime(time.value)}
                className={`py-2 px-3 text-left text-sm rounded-md ${
                  startTime === time.value 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-blue-50'
                }`}
              >
                {time.display}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center">
          <Clock className="h-4 w-4 mr-1.5 text-blue-600" />
          End time
        </label>
        <div className="border border-gray-200 rounded-md h-[200px] overflow-y-auto p-2">
          <div className="grid grid-cols-2 gap-1">
            {timeOptions.map((time) => (
              <button
                key={`end-${time.value}`}
                type="button"
                onClick={() => setEndTime(time.value)}
                className={`py-2 px-3 text-left text-sm rounded-md ${
                  endTime === time.value 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-blue-50'
                }`}
              >
                {time.display}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeSelection;
