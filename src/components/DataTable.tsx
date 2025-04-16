
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StatusBadge from '@/components/StatusBadge';

interface DataTableProps {
  data: any[];
  onRowClick?: (row: any) => void;
  emptyMessage?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  onRowClick,
  emptyMessage = 'No data available.'
}) => {
  // Handle undefined data case
  if (!data || data.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  // Make sure we have at least one row before trying to determine columns
  if (!data[0]) {
    return (
      <div className="py-8 text-center text-gray-500">
        Invalid data structure.
      </div>
    );
  }

  // Determine columns based on first row data
  const columns = Object.keys(data[0]).filter(key => 
    // Filter out columns we don't want to display (like id)
    key !== 'id' && 
    key !== 'avatar_url' &&
    key !== 'notes'
  );

  // Get status type for badge
  const getStatusType = (status: string) => {
    if (!status) return 'neutral';
    
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {data[0].avatar_url !== undefined && <TableHead>Avatar</TableHead>}
          {columns.map(column => (
            <TableHead key={column}>
              {column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow 
            key={row.id || index}
            className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
            onClick={() => onRowClick && onRowClick(row)}
          >
            {row.avatar_url !== undefined && (
              <TableCell>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={row.avatar_url} alt={row.name || 'User avatar'} />
                  <AvatarFallback>
                    {row.name ? row.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
            )}
            
            {columns.map(column => (
              <TableCell key={column}>
                {column === 'status' ? (
                  <StatusBadge 
                    status={getStatusType(row[column])} 
                    label={row[column]} 
                  />
                ) : (
                  row[column]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
