
import React from 'react';
import { X, BarChart2, Filter, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  timeRangeOptions?: { value: string; label: string }[];
  defaultTimeRange?: string;
  onTimeRangeChange?: (value: string) => void;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  isOpen,
  onClose,
  title,
  children,
  timeRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '12months', label: 'Last 12 Months' },
    { value: 'all', label: 'All Time' },
  ],
  defaultTimeRange = '30days',
  onTimeRangeChange,
}) => {
  const [timeRange, setTimeRange] = React.useState(defaultTimeRange);

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    if (onTimeRangeChange) {
      onTimeRangeChange(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] lg:w-[500px] xl:w-[550px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center">
            <BarChart2 className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="px-6 py-4 border-b bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1.5" />
              <span>Time Period</span>
            </div>
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[180px] h-8 text-sm">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {timeRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <ScrollArea className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {children}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
