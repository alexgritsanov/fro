
import React from 'react';
import { Calendar, Clock, PenSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { getServiceTypeName } from '../../utils/certificateHelpers';

interface BasicInformationSectionProps {
  date: Date;
  startTime: string;
  endTime: string;
  hourlyBooking: string | number;
  serviceType: string;
  onEditType: () => void;
}

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  date,
  startTime,
  endTime,
  hourlyBooking,
  serviceType,
  onEditType,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg flex items-center">
        <PenSquare className="h-5 w-5 mr-2 text-blue-600" />
        Basic Information
      </h3>
      
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">{format(date, 'MMMM d, yyyy')}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Service Hours</p>
            <p className="font-medium">{startTime} - {endTime} ({hourlyBooking} hours)</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <PenSquare className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Service Type</p>
            <p className="font-medium">{getServiceTypeName(serviceType)}</p>
            <div className="flex items-center gap-1 mt-1">
              <Button 
                variant="outline" 
                size="xs" 
                className="h-7 px-2 py-1 text-xs"
                onClick={onEditType}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationSection;
