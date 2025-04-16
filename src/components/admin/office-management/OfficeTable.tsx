
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Pencil,
  Trash2,
  Users,
  Eye,
  MoreHorizontal,
  UserCog,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Company } from '@/types/company';

interface OfficeTableProps {
  offices: Company[];
  loading: boolean;
  selectedOffices: string[];
  onSelectOffice: (id: string) => void;
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleStatus: (office: Company) => void;
  onDeleteOffice: (office: Company) => void;
  onViewOffice: (office: Company) => void;
  onCreateOffice: () => void;
  onEditOffice: (office: Company) => void;
  onManageUsers: (office: Company) => void;
  onManageUserLimits: (office: Company) => void;
  searchTerm: string;
  activeFilter: string;
  locationFilter: string;
  serviceTypeFilter: string;
  userLimitFilter: string;
  currentPage: number;
  itemsPerPage: number;
  viewMode: string;
  paginatedOffices: Company[];
}

const OfficeTable: React.FC<OfficeTableProps> = ({
  paginatedOffices,
  selectedOffices,
  onSelectOffice,
  onSelectAll,
  onToggleStatus,
  onDeleteOffice,
  onViewOffice,
  onEditOffice,
  onManageUsers,
  onManageUserLimits,
}) => {
  // Fix for the Checkbox type issue by creating a wrapper function
  const handleSelectAll = (checked: boolean | string) => {
    // Create a synthetic event object that matches what onSelectAll expects
    const syntheticEvent = {
      target: { checked: checked === true }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onSelectAll(syntheticEvent);
  };

  return (
    <div className="w-full overflow-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr className="text-left">
            <th className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400">
              <Checkbox 
                checked={paginatedOffices.length > 0 && selectedOffices.length === paginatedOffices.length} 
                onCheckedChange={handleSelectAll} 
                className="border-gray-300 dark:border-gray-600"
              />
            </th>
            <th className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400">Office</th>
            <th className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
            <th className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400">Location</th>
            <th className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400">Created</th>
            <th className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400">Last Activity</th>
            <th className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
            <th className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOffices.map((office) => (
            <tr 
              key={office.id} 
              className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td className="p-3">
                <Checkbox 
                  checked={selectedOffices.includes(office.id)} 
                  onCheckedChange={() => onSelectOffice(office.id)}
                  className="border-gray-300 dark:border-gray-600"
                />
              </td>
              <td className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {office.logo ? (
                      <img 
                        src={office.logo} 
                        alt={office.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                        {office.name?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{office.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                      {office.office_email || office.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-3 text-sm text-gray-500 dark:text-gray-400">
                {office.service_type || office.company_type || 'N/A'}
              </td>
              <td className="p-3 text-sm text-gray-500 dark:text-gray-400">
                {office.location || office.address || 'N/A'}
              </td>
              <td className="p-3 text-sm text-gray-500 dark:text-gray-400">
                {new Date(office.created_at).toLocaleDateString()}
              </td>
              <td className="p-3 text-sm text-gray-500 dark:text-gray-400">
                {office.last_activity ? new Date(office.last_activity).toLocaleDateString() : 'N/A'}
              </td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={office.status === 'active'} 
                    onCheckedChange={() => onToggleStatus(office)}
                    className={office.status === 'active' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}
                  />
                  <Badge 
                    variant="outline" 
                    className={`${
                      office.status === 'active' 
                        ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}
                  >
                    {office.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onViewOffice(office)}
                      >
                        <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View Details</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onEditOffice(office)}
                      >
                        <Pencil className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onManageUsers(office)}
                      >
                        <Users className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Manage Users</TooltipContent>
                  </Tooltip>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onManageUserLimits(office)}>
                        <UserCog className="h-4 w-4 mr-2" />
                        User Limits
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDeleteOffice(office)}
                        className="text-red-600 focus:text-red-600 hover:text-red-500 focus:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
          
          {paginatedOffices.length === 0 && (
            <tr>
              <td colSpan={8} className="p-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <AlertCircle className="h-8 w-8 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">No offices found</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Try adjusting your filters or create a new office
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OfficeTable;
