
import React from 'react';
import { Layers } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ElementTypeFieldProps {
  elementType: string;
  setElementType: (type: string) => void;
}

const ElementTypeField: React.FC<ElementTypeFieldProps> = ({
  elementType,
  setElementType
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <Layers className="h-4 w-4 mr-1.5 text-blue-600" />
        Element Type
      </label>
      <Select value={elementType} onValueChange={setElementType}>
        <SelectTrigger className="border-gray-200 bg-white">
          <SelectValue placeholder="Select element type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Wall">Wall</SelectItem>
          <SelectItem value="Floor">Floor</SelectItem>
          <SelectItem value="Column">Column</SelectItem>
          <SelectItem value="Beam">Beam</SelectItem>
          <SelectItem value="Foundation">Foundation</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ElementTypeField;
