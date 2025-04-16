
import React from 'react';
import { Button } from '@/components/ui/button';
import { XCircle, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  error: string | null;
  isRefreshing: boolean;
  handleRefresh: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ error, isRefreshing, handleRefresh }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
      <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">Failed to load offices</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
      <Button onClick={handleRefresh} disabled={isRefreshing}>
        <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
        Try Again
      </Button>
    </div>
  );
};

export default EmptyState;
