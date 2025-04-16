
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import StatusBadge from '@/components/StatusBadge';
import { Map, Users, Calendar, Clock, Eye, Edit, MoreHorizontal, UserCheck, Trash2 } from 'lucide-react';
import { OfficeGridProps } from './types';

const OfficeGrid: React.FC<OfficeGridProps> = ({
  paginatedOffices,
  onToggleStatus,
  onViewOffice,
  onEditOffice,
  onManageUsers,
  onManageUserLimits,
  onDeleteOffice
}) => {
  if (paginatedOffices.length === 0) {
    return (
      <div className="col-span-full p-12 text-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center justify-center space-y-3">
          <Eye className="h-12 w-12 text-gray-300 dark:text-gray-600" />
          <p className="text-lg font-medium">No offices found</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {paginatedOffices.map(office => (
        <Card key={office.id} className="hover:shadow-md transition-all duration-300 group overflow-hidden border-t-4 border-blue-500 dark:border-blue-600 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-900/30 dark:group-hover:to-indigo-900/30 transition-colors duration-300">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-gray-800 shadow-sm">
                  <AvatarImage src={office.logo} alt={office.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                    {office.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{office.name}</CardTitle>
                  <CardDescription>{office.service_type}</CardDescription>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Switch 
                  checked={office.status === 'active'} 
                  onCheckedChange={() => onToggleStatus(office)} 
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200" 
                />
                <StatusBadge 
                  status={office.status === 'active' ? 'success' : 'error'} 
                  label={office.status === 'active' ? 'Active' : 'Inactive'} 
                  size="sm" 
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="py-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Map className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>{office.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>User Limit: {office.user_limit}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>Created: {office.created_at ? new Date(office.created_at).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>Last activity: {office.last_activity ? new Date(office.last_activity).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t dark:border-gray-700">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Employees</p>
                <p className="font-semibold">{office.users?.employee || 0}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Customers</p>
                <p className="font-semibold">{office.users?.customer || 0}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-0 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100 dark:bg-cyan-900/20 dark:border-cyan-800 dark:text-cyan-400" 
              onClick={() => onViewOffice(office)}
            >
              <Eye className="h-4 w-4 mr-2" /> View
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1" 
              onClick={() => onEditOffice(office)}
            >
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1">
                  <MoreHorizontal className="h-4 w-4 mr-2" /> More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onManageUsers(office)} className="cursor-pointer">
                  <Users className="h-4 w-4 mr-2" /> Manage Users
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onManageUserLimits(office)} className="cursor-pointer">
                  <UserCheck className="h-4 w-4 mr-2" /> User Limits
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDeleteOffice(office)} className="cursor-pointer text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                  <Trash2 className="h-4 w-4 mr-2" /> Delete Office
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default OfficeGrid;
