
import React from 'react';
import { Package } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ConcreteTypeFieldProps {
  concreteType: string;
  setConcreteType: (type: string) => void;
}

const ConcreteTypeField: React.FC<ConcreteTypeFieldProps> = ({
  concreteType,
  setConcreteType
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <Package className="h-4 w-4 mr-1.5 text-blue-600" />
        Concrete Type
      </label>
      <Select value={concreteType} onValueChange={setConcreteType}>
        <SelectTrigger className="border-gray-200 bg-white">
          <SelectValue placeholder="Select concrete type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="B30">B30</SelectItem>
          <SelectItem value="B35">B35</SelectItem>
          <SelectItem value="B40">B40</SelectItem>
          <SelectItem value="B45">B45</SelectItem>
          <SelectItem value="B50">B50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ConcreteTypeField;
