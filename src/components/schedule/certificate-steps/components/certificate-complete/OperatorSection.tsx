
import React from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getOperatorName } from '../../utils/certificateHelpers';

interface OperatorSectionProps {
  operator: string;
  onEditService: () => void;
}

const OperatorSection: React.FC<OperatorSectionProps> = ({
  operator,
  onEditService
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg flex items-center mt-4">
        <User className="h-5 w-5 mr-2 text-blue-600" />
        Operator
      </h3>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start">
          <User className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Operator</p>
            <p className="font-medium">{getOperatorName(operator)}</p>
            <div className="flex items-center gap-1 mt-1">
              <Button 
                variant="outline" 
                size="xs" 
                className="h-7 px-2 py-1 text-xs"
                onClick={onEditService}
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

export default OperatorSection;
