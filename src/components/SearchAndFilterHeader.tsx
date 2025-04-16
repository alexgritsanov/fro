
import React from 'react';
import { Search, Filter, Download, Plus, CalendarDays, Grid2X2, List, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ViewMode {
  mode: 'grid' | 'list' | 'calendar';
  icon: React.ReactNode;
  label: string;
}

interface SearchAndFilterHeaderProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  viewMode?: 'grid' | 'list' | 'calendar';
  onViewModeChange?: (mode: 'grid' | 'list' | 'calendar') => void;
  enableViewToggle?: boolean;
  filterButton?: boolean;
  onFilterClick?: () => void;
  exportButton?: boolean;
  onExportClick?: () => void;
  onCreateClick?: () => void;
  createButtonLabel?: string;
  sortOptions?: {value: string, label: string}[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  operatorFilter?: boolean;
  operatorValue?: string;
  onOperatorChange?: (value: string) => void;
  customerFilter?: boolean;
  customerValue?: string;
  onCustomerChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  compact?: boolean;
}

const SearchAndFilterHeader: React.FC<SearchAndFilterHeaderProps> = ({
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  viewMode = 'grid',
  onViewModeChange,
  enableViewToggle = false,
  filterButton = false,
  onFilterClick,
  exportButton = false,
  onExportClick,
  onCreateClick,
  createButtonLabel = "New",
  sortOptions,
  sortValue,
  onSortChange,
  operatorFilter = false,
  operatorValue = "All Operators",
  onOperatorChange,
  customerFilter = false,
  customerValue = "All Customers",
  onCustomerChange,
  children,
  className,
  compact = false,
}) => {
  const viewModes: ViewMode[] = [
    { mode: 'calendar', icon: <Calendar className="h-4 w-4" />, label: 'Calendar View' },
    { mode: 'grid', icon: <Grid2X2 className="h-4 w-4" />, label: 'Grid View' },
    { mode: 'list', icon: <List className="h-4 w-4" />, label: 'List View' },
  ];
  
  const handleViewModeChange = (mode: 'grid' | 'list' | 'calendar') => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };
  
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className={cn("relative flex-1 min-w-0 w-full", compact ? "max-w-md" : "max-w-2xl")}>
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input 
            placeholder={searchPlaceholder} 
            className="pl-10"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-end flex-wrap">
          {filterButton && (
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 bg-white"
              onClick={onFilterClick}
              title="Filter"
            >
              <Filter className="h-4 w-4 text-gray-600" />
            </Button>
          )}
          
          {exportButton && (
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 bg-white"
              onClick={onExportClick}
              title="Export"
            >
              <Download className="h-4 w-4 text-gray-600" />
            </Button>
          )}

          {onCreateClick && (
            <Button 
              onClick={onCreateClick}
              className="whitespace-nowrap"
            >
              <Plus className="h-4 w-4 mr-2" />
              {createButtonLabel}
            </Button>
          )}
          
          {children}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          {operatorFilter && onOperatorChange && (
            <Select value={operatorValue} onValueChange={onOperatorChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Operators" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Operators">All Operators</SelectItem>
                <SelectItem value="John Smith">John Smith</SelectItem>
                <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                <SelectItem value="Michael Brown">Michael Brown</SelectItem>
              </SelectContent>
            </Select>
          )}

          {customerFilter && onCustomerChange && (
            <Select value={customerValue} onValueChange={onCustomerChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Customers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Customers">All Customers</SelectItem>
                <SelectItem value="ABC Construction">ABC Construction</SelectItem>
                <SelectItem value="XYZ Builders">XYZ Builders</SelectItem>
                <SelectItem value="City Developers">City Developers</SelectItem>
              </SelectContent>
            </Select>
          )}

          {sortOptions && onSortChange && (
            <Select value={sortValue} onValueChange={onSortChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {enableViewToggle && onViewModeChange && (
          <div className="flex items-center gap-1 bg-white rounded-md border border-gray-200 p-1 ml-auto">
            <ToggleGroup 
              type="single" 
              value={viewMode} 
              onValueChange={(value) => value && handleViewModeChange(value as 'grid' | 'list' | 'calendar')}
            >
              {viewModes.map((mode) => (
                <ToggleGroupItem 
                  key={mode.mode}
                  value={mode.mode}
                  aria-label={mode.label}
                  className={cn(
                    "h-8 w-8",
                    viewMode === mode.mode ? "bg-primary-gradient text-white" : "text-gray-600"
                  )}
                >
                  {mode.icon}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilterHeader;
