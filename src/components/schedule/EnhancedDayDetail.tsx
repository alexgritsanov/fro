
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin, User, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScheduleCall } from '@/pages/Schedule';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';

interface EnhancedDayDetailProps {
  serviceCall: ScheduleCall;
  onViewDetails: (call: ScheduleCall) => void;
  onCreateCertificate: (call: ScheduleCall) => void;
}

const EnhancedDayDetail: React.FC<EnhancedDayDetailProps> = ({
  serviceCall,
  onViewDetails,
  onCreateCertificate,
}) => {
  const getStatusType = (status: string): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
    switch (status) {
      case 'completed':
      case 'physical-signature':
        return 'success';
      case 'in-progress':
      case 'awaiting-signature':
      case 'without-signature':
        return 'warning';
      case 'incomplete':
      case 'canceled':
        return 'error';
      case 'pending':
      case 'scheduled':
        return 'info';
      default:
        return 'neutral';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'scheduled':
        return 'Scheduled';
      case 'in-progress':
        return 'In Progress';
      case 'incomplete':
        return 'Incomplete';
      case 'awaiting-signature':
        return 'Awaiting Signature';
      case 'completed':
        return 'Completed';
      case 'physical-signature':
        return 'Physical Signed';
      case 'without-signature':
        return 'Unsigned';
      case 'canceled':
        return 'Canceled';
      default:
        return status;
    }
  };

  return (
    <Card className={`mb-3 overflow-hidden border-l-4 transition-all hover:shadow-md ${
      getStatusType(serviceCall.status) === 'success' ? "border-l-green-500" :
      getStatusType(serviceCall.status) === 'warning' ? "border-l-amber-500" :
      getStatusType(serviceCall.status) === 'error' ? "border-l-red-500" :
      getStatusType(serviceCall.status) === 'info' ? "border-l-blue-500" :
      "border-l-gray-300"
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center">
            <Avatar 
              name={serviceCall.customer}
              className="mr-3"
              size="sm"
            />
            <div>
              <h4 className="font-medium text-gray-900">{serviceCall.customer}</h4>
              <p className="text-sm text-gray-500">
                {serviceCall.serviceType?.replace(/-/g, ' ')}
              </p>
            </div>
          </div>
          <StatusBadge
            status={getStatusType(serviceCall.status)}
            label={getStatusLabel(serviceCall.status)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
          <div className="flex items-start text-sm">
            <Clock className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-500">Time</p>
              <p className="text-gray-700">{serviceCall.startTime || "Not specified"}</p>
            </div>
          </div>
          <div className="flex items-start text-sm">
            <User className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-500">Operator</p>
              <p className="text-gray-700">{serviceCall.operator || "Not assigned"}</p>
            </div>
          </div>
          <div className="flex items-start text-sm">
            <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-500">Location</p>
              <p className="truncate max-w-[200px] text-gray-700">{serviceCall.projectSite || serviceCall.address || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-start text-sm">
            <Calendar className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-500">Date</p>
              <p className="text-gray-700">
                {serviceCall.date ? format(new Date(serviceCall.date), 'MMM d, yyyy') : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-end mt-3 pt-2 border-t border-gray-100 gap-2">
          <Button 
            variant="flat" 
            size="sm" 
            className="text-gray-700 w-full sm:w-auto"
            onClick={() => onViewDetails(serviceCall)}
          >
            <FileText className="h-3.5 w-3.5 mr-1" />
            View Details
          </Button>
          <Button 
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => onCreateCertificate(serviceCall)}
          >
            Create Certificate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedDayDetail;
