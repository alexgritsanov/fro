
import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { PaginationControlsProps } from './types';

const PaginationControls: React.FC<PaginationControlsProps> = ({
  filteredOffices,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage
}) => {
  const totalPages = Math.ceil(filteredOffices.length / itemsPerPage);

  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm flex items-center justify-between">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Show 
        <select 
          className="mx-2 bg-white dark:bg-gray-800 border rounded px-2 py-1 dark:border-gray-700" 
          value={itemsPerPage} 
          onChange={e => setItemsPerPage(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        from {filteredOffices.length}
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} 
            />
          </PaginationItem>
          
          {Array.from({
            length: Math.min(5, totalPages)
          }).map((_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <PaginationItem key={i}>
                <PaginationLink 
                  isActive={pageNum === currentPage} 
                  onClick={() => setCurrentPage(pageNum)} 
                  className={pageNum === currentPage ? 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500' : ''}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} 
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} 
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
