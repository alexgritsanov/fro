
import React from 'react';
import { Clock } from 'lucide-react';
import QuickHourSelection from './QuickHourSelection';

interface HourlyBookingProps {
  hourlyBooking: string;
  setHourlyBooking: (value: string | number) => void;
}

const HourlyBooking: React.FC<HourlyBookingProps> = ({
  hourlyBooking,
  setHourlyBooking
}) => {
  return (
    <div className="space-y-4">
      <QuickHourSelection
        label="Hours Booked"
        value={hourlyBooking.toString()}
        setValue={(value) => setHourlyBooking(value)}
        icon={<Clock className="h-4 w-4 mr-1.5 text-blue-600" />}
        unit="hrs"
      />
      <p className="text-xs text-gray-500 mt-2">
        Select the number of hours booked for this service.
      </p>
    </div>
  );
};

export default HourlyBooking;
