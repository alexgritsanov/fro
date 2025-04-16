
import React from 'react';
import { Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface QuickHourSelectionProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  icon?: React.ReactNode;
  unit?: string;
}

const QuickHourSelection: React.FC<QuickHourSelectionProps> = ({
  value,
  setValue,
  label,
  icon,
  unit
}) => {
  const quickOptions = ["None", "1", "2", "3", "4"];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        {icon && icon}
        <h3 className="font-medium">{label}</h3>
      </div>

      <RadioGroup
        value={value}
        onValueChange={setValue}
        className="flex flex-wrap gap-3"
      >
        {quickOptions.map((option) => (
          <div key={option} className="flex items-center">
            <RadioGroupItem
              value={option}
              id={`${label.toLowerCase().replace(/\s+/g, '-')}-${option}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`${label.toLowerCase().replace(/\s+/g, '-')}-${option}`}
              className="flex h-14 w-24 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-base transition-all peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-600 hover:bg-gray-50"
            >
              {option}
              {option === 'None' ? null : unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
            </Label>
          </div>
        ))}

        <div className="flex items-center ml-1">
          <div className="relative">
            <Input
              type="number"
              min="0"
              value={!quickOptions.includes(value) ? value : ""}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Custom"
              className="w-36 pr-12 py-3 h-14 text-base"
            />
            {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">{unit}</span>}
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default QuickHourSelection;
