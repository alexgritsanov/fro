
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Eye, Trash2, FilePlus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Avatar from '@/components/Avatar';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Customer } from '@/services/api/customersApi';

interface CustomerTableProps {
  customers: Customer[];
  isLoading: boolean;
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, isLoading, onSelectCustomer }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-500';
      case 'prospect':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="p-4">
          <div className="flex space-x-4 mb-4">
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-10 w-[200px]" />
          </div>
          
          <div className="border rounded-md">
            <div className="h-12 px-4 border-b bg-gray-50 flex items-center">
              <div className="grid grid-cols-5 w-full">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[70px]" />
              </div>
            </div>
            
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-16 px-4 border-b flex items-center">
                <div className="grid grid-cols-5 w-full">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-[120px]" />
                  </div>
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-8 w-[70px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Customer</TableHead>
              <TableHead>Contact Details</TableHead>
              <TableHead>Business ID</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg>
                    </div>
                    <p className="text-gray-500">No customers found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow 
                  key={customer.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => onSelectCustomer(customer)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar 
                        alt={customer.name} 
                        size="sm" 
                        status={customer.status === 'active' ? 'online' : 'offline'} 
                      />
                      <div>
                        <div className="font-medium flex items-center">
                          {customer.name}
                          {customer.needs_quote && (
                            <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              <span className="text-xs">Needs Agreement</span>
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {customer.nickname || customer.type}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {customer.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {customer.phone || 'No phone'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-mono">
                      {customer.customerId || customer.vat_number || 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(customer.last_active || customer.created_at)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs capitalize", getStatusColor(customer.status))}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onSelectCustomer(customer);
                        }}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Customer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FilePlus className="mr-2 h-4 w-4" />
                          Create Agreement
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Customer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CustomerTable;
