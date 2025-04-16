
import React from 'react';
import { Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface WaitingTimeFieldProps {
  waitingTime: string;
  setWaitingTime: (time: string) => void;
}

const WaitingTimeField: React.FC<WaitingTimeFieldProps> = ({
  waitingTime,
  setWaitingTime
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <Clock className="h-4 w-4 mr-1.5 text-blue-600" />
        Waiting Time
      </label>
      <div className="flex items-center">
        <Input 
          type="number" 
          min="0"
          value={waitingTime} 
          onChange={(e) => setWaitingTime(e.target.value)} 
          className="rounded-r-none border-gray-200 bg-white"
        />
        <div className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-200 rounded-r-md">
          Hours
        </div>
      </div>
      <p className="text-xs text-gray-500">Enter waiting time in hours if applicable.</p>
    </div>
  );
};

export default WaitingTimeField;
