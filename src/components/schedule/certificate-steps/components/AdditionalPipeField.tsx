
import React from 'react';
import { Pipette } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AdditionalPipeFieldProps {
  additionalPipe: string;
  setAdditionalPipe: (pipe: string) => void;
}

const AdditionalPipeField: React.FC<AdditionalPipeFieldProps> = ({
  additionalPipe,
  setAdditionalPipe
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <Pipette className="h-4 w-4 mr-1.5 text-blue-600" />
        Additional Pipe (meter)
      </label>
      <div className="flex items-center">
        <Input 
          type="number" 
          min="0"
          value={additionalPipe} 
          onChange={(e) => setAdditionalPipe(e.target.value)} 
          className="rounded-r-none border-gray-200 bg-white"
        />
        <div className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-200 rounded-r-md">
          Meter
        </div>
      </div>
    </div>
  );
};

export default AdditionalPipeField;
