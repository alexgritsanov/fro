
import React from 'react';
import { Briefcase } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WorkTypeFieldProps {
  workType: string;
  setWorkType: (type: string) => void;
}

const WorkTypeField: React.FC<WorkTypeFieldProps> = ({
  workType,
  setWorkType
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <Briefcase className="h-4 w-4 mr-1.5 text-blue-600" />
        Work Type
      </label>
      <Select value={workType} onValueChange={setWorkType}>
        <SelectTrigger className="border-gray-200 bg-white">
          <SelectValue placeholder="Select work type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="full_day">Full Day</SelectItem>
          <SelectItem value="half_day">Half Day</SelectItem>
          <SelectItem value="hourly">Hourly</SelectItem>
          <SelectItem value="project_based">Project Based</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkTypeField;
