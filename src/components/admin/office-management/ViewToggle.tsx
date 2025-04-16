
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw } from 'lucide-react';
import { ViewToggleProps } from './types';

const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  setViewMode,
  handleRefresh,
  isRefreshing
}) => {
  return (
    <div className="flex items-center gap-3">
      <Button 
        variant="outline" 
        size="sm" 
        className={`transition-all duration-300 ${
          viewMode === 'table' 
            ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' 
            : 'bg-white dark:bg-gray-800'
        }`} 
        onClick={() => setViewMode('table')}
      >
        Table View
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className={`transition-all duration-300 ${
          viewMode === 'grid' 
            ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' 
            : 'bg-white dark:bg-gray-800'
        }`} 
        onClick={() => setViewMode('grid')}
      >
        Grid View
      </Button>
      
      <Button 
        variant="outline" 
        className="bg-white dark:bg-gray-800 transition-colors duration-300" 
        onClick={handleRefresh} 
        disabled={isRefreshing}
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
    </div>
  );
};

export default ViewToggle;
