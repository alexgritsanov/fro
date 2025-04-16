
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      <p className="text-gray-500 dark:text-gray-400">Loading offices...</p>
    </div>
  );
};

export default LoadingState;
