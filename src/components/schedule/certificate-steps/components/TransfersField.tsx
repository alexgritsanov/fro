
import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TransfersFieldProps {
  transfers: string;
  setTransfers: (transfers: string) => void;
}

const TransfersField: React.FC<TransfersFieldProps> = ({
  transfers,
  setTransfers
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <ArrowLeftRight className="h-4 w-4 mr-1.5 text-blue-600" />
        Transfers on site
      </label>
      <div className="flex items-center">
        <Input 
          type="number" 
          min="0"
          value={transfers} 
          onChange={(e) => setTransfers(e.target.value)} 
          className="rounded-r-none border-gray-200 bg-white py-3 px-4 text-base"
          style={{ minHeight: "48px" }}
        />
        <div className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-200 rounded-r-md h-full flex items-center min-h-[48px] text-base">
          Transfers
        </div>
      </div>
      <p className="text-xs text-gray-500">Enter the number of transfers required on site.</p>
    </div>
  );
};

export default TransfersField;
