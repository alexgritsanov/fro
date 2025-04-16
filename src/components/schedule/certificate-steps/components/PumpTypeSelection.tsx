
import React from 'react';
import { Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PumpTypeSelectionProps {
  pumpType: string;
  setPumpType: (type: string) => void;
  quantity: string;
  setQuantity: (quantity: string) => void;
}

const PumpTypeSelection: React.FC<PumpTypeSelectionProps> = ({
  pumpType,
  setPumpType,
  quantity,
  setQuantity
}) => {
  const pumpTypes = [
    { value: "72", label: "72 Meter" },
    { value: "52", label: "52 Meter" },
    { value: "42", label: "42 Meter" },
    { value: "36", label: "36 Meter" },
    { value: "28", label: "28 Meter" }
  ];

  const quantityOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center">
          <Truck className="h-4 w-4 mr-1.5 text-blue-600" />
          Pump Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {pumpTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setPumpType(type.value)}
              className={cn(
                "flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all",
                pumpType === type.value 
                  ? "bg-blue-50 border-blue-600" 
                  : "bg-white border-gray-200 hover:border-blue-300"
              )}
            >
              <span className="font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Quantity</label>
        <div className="flex flex-wrap gap-2">
          {quantityOptions.map((q) => (
            <Button
              key={q}
              variant={quantity === q ? "default" : "outline"}
              onClick={() => setQuantity(q)}
              className="w-12 h-12"
            >
              {q}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PumpTypeSelection;
