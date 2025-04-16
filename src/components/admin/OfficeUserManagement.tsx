
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, MoreHorizontal, Filter, Download, ChevronDown, Mail, Phone, User, Key, Shield, X, CheckCircle, XCircle, AlertCircle, Edit, Trash2, Lock, UserCheck, Users } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import StatusBadge from '@/components/StatusBadge';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import UserLimitDialog from './UserLimitDialog';

// Sample data for the component
const sampleUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    avatar: null,
    role: 'Admin',
    status: 'active',
    lastActive: '2 hours ago'
  },
  {
    id: 2,
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    avatar: null,
    role: 'Office Staff',
    status: 'active',
    lastActive: '1 day ago'
  },
  {
    id: 3,
    name: 'Michael Davis',
    email: 'michael.davis@example.com',
    avatar: null,
    role: 'Foreman',
    status: 'inactive',
    lastActive: '5 days ago'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    avatar: null,
    role: 'Employee',
    status: 'pending',
    lastActive: 'Never'
  },
  {
    id: 5,
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    avatar: null,
    role: 'Subcontractor',
    status: 'active',
    lastActive: '3 hours ago'
  },
];

interface OfficeUserManagementProps {
  isOpen: any;
  onClose: any;
  office: any;
}

const OfficeUserManagement = ({ isOpen, onClose, office }: OfficeUserManagementProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [inviteUserOpen, setInviteUserOpen] = useState(false);
  const [userLimitDialogOpen, setUserLimitDialogOpen] = useState(false);
  
  // Status toggle handler
  const handleStatusToggle = (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    // In a real app, you would update the status in your backend
    toast({
      title: "User status updated",
      description: `User status has been changed to ${newStatus}`,
      variant: newStatus === 'active' ? "default" : "default",
    });
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditUserOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    // In a real app, you would delete the user from your backend
    toast({
      title: "User deleted",
      description: `${user.name} has been removed from the system`,
      variant: "destructive",
    });
  };

  const handleInviteUser = () => {
    setInviteUserOpen(true);
  };

  const handleCloseInviteUser = () => {
    setInviteUserOpen(false);
  };

  const handleSendInvite = () => {
    // In a real app, you would send the invite
    toast({
      title: "Invitation sent",
      description: "User invitation has been sent successfully",
      variant: "default",
    });
    setInviteUserOpen(false);
  };

  const handleCloseEditUser = () => {
    setEditUserOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = () => {
    // In a real app, you would save the user
    toast({
      title: "User updated",
      description: "User information has been updated successfully",
      variant: "default",
    });
    setEditUserOpen(false);
    setSelectedUser(null);
  };

  const handleOpenUserLimitDialog = () => {
    setUserLimitDialogOpen(true);
  };

  const handleCloseUserLimitDialog = () => {
    setUserLimitDialogOpen(false);
  };

  const handleUserLimitSave = (limits: any) => {
    toast({
      title: "User limits updated",
      description: `User limits for ${office?.name} have been updated.`,
      variant: "default"
    });
    setUserLimitDialogOpen(false);
  };

  const handleApplyFilter = () => {
    toast({
      title: "Filters applied",
      description: `Showing filtered results`,
      variant: "default"
    });
    setFilterOpen(false);
  };

  const clearFilters = () => {
    setRoleFilter('all');
    setStatusFilter('all');
    toast({
      title: "Filters cleared",
      description: "Showing all users",
      variant: "default"
    });
  };

  // Filter users based on the active tab, search term, role filter, and status filter
  const filteredUsers = sampleUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter.toLowerCase();
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    if (activeTab === 'all') return matchesSearch && matchesRole && matchesStatus;
    if (activeTab === 'active') return user.status === 'active' && matchesSearch && matchesRole;
    if (activeTab === 'inactive') return user.status === 'inactive' && matchesSearch && matchesRole;
    if (activeTab === 'pending') return user.status === 'pending' && matchesSearch && matchesRole;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Get counts for each tab
  const counts = {
    all: sampleUsers.length,
    active: sampleUsers.filter(user => user.status === 'active').length,
    inactive: sampleUsers.filter(user => user.status === 'inactive').length,
    pending: sampleUsers.filter(user => user.status === 'pending').length
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl overflow-hidden bg-background p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <DialogTitle className="text-2xl font-bold">User Management</DialogTitle>
              <DialogDescription>
                {office ? `Manage users for ${office.name}` : 'Manage users for this office'}
              </DialogDescription>
            </div>
            <div className="mt-2 sm:mt-0 flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                onClick={handleOpenUserLimitDialog}
              >
                <UserCheck className="h-4 w-4" />
                User Limits
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6 overflow-auto max-h-[80vh]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                className="pl-10 w-full sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2 w-full sm:w-auto justify-end">
              <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    {(roleFilter !== 'all' || statusFilter !== 'all') && (
                      <Badge className="ml-2 bg-blue-100 text-blue-600">Filtered</Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <Label className="text-xs font-medium">Role</Label>
                    <select
                      className="w-full mt-1 p-2 text-sm border rounded-md"
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                    >
                      <option value="all">All Roles</option>
                      <option value="admin">Admin</option>
                      <option value="office staff">Office Staff</option>
                      <option value="foreman">Foreman</option>
                      <option value="employee">Employee</option>
                      <option value="subcontractor">Subcontractor</option>
                    </select>
                  </div>
                  
                  <div className="p-2">
                    <Label className="text-xs font-medium">Status</Label>
                    <select
                      className="w-full mt-1 p-2 text-sm border rounded-md"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  
                  <div className="p-2 pt-0 flex justify-between">
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear
                    </Button>
                    <Button size="sm" onClick={handleApplyFilter}>
                      Apply
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="outline"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              
              <Button 
                onClick={handleInviteUser}
                className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <UserPlus className="h-4 w-4" />
                <span>Invite User</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid grid-cols-4 mb-6 bg-muted/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-white">
                All <StatusBadge label={counts.all.toString()} status="neutral" size="sm" className="ml-2" />
              </TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-white">
                Active <StatusBadge label={counts.active.toString()} status="success" size="sm" className="ml-2" />
              </TabsTrigger>
              <TabsTrigger value="inactive" className="data-[state=active]:bg-white">
                Inactive <StatusBadge label={counts.inactive.toString()} status="warning" size="sm" className="ml-2" />
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-white">
                Pending <StatusBadge label={counts.pending.toString()} status="info" size="sm" className="ml-2" />
              </TabsTrigger>
            </TabsList>
            
            {/* Tab content for all users */}
            <TabsContent value="all" className="mt-0">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="overflow-hidden rounded-md border">
                    <table className="w-full border-collapse">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Role</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden lg:table-cell">Last Active</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <tr key={user.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.avatar || ''} alt={user.name} />
                                    <AvatarFallback className="bg-primary-gradient text-white">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-sm">{user.name}</div>
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                  {user.role === 'Admin' && <Shield className="h-4 w-4 text-indigo-500" />}
                                  {user.role === 'Office Staff' && <Mail className="h-4 w-4 text-blue-500" />}
                                  {user.role === 'Foreman' && <User className="h-4 w-4 text-amber-500" />}
                                  {user.role === 'Employee' && <User className="h-4 w-4 text-green-500" />}
                                  {user.role === 'Subcontractor' && <User className="h-4 w-4 text-purple-500" />}
                                  <span className="text-sm">{user.role}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-muted-foreground hidden lg:table-cell">{user.lastActive}</td>
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <Switch 
                                    checked={user.status === 'active'} 
                                    onCheckedChange={() => handleStatusToggle(user.id, user.status)} 
                                    className={user.status === 'active' ? '' : 'bg-gray-200'}
                                  />
                                  <span className="text-sm">
                                    {user.status === 'active' && <span className="text-green-600">Active</span>}
                                    {user.status === 'inactive' && <span className="text-gray-600">Inactive</span>}
                                    {user.status === 'pending' && <span className="text-amber-600">Pending</span>}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit User
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Key className="h-4 w-4 mr-2" />
                                      Reset Password
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-destructive focus:text-destructive">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete User
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                              No users found. Try adjusting your search or filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab content for active users */}
            <TabsContent value="active" className="mt-0">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="overflow-hidden rounded-md border">
                    <table className="w-full border-collapse">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Role</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden lg:table-cell">Last Active</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.filter(user => user.status === 'active').length > 0 ? (
                          filteredUsers.filter(user => user.status === 'active').map((user) => (
                            <tr key={user.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.avatar || ''} alt={user.name} />
                                    <AvatarFallback className="bg-primary-gradient text-white">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-sm">{user.name}</div>
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                  {user.role === 'Admin' && <Shield className="h-4 w-4 text-indigo-500" />}
                                  {user.role === 'Office Staff' && <Mail className="h-4 w-4 text-blue-500" />}
                                  {user.role === 'Foreman' && <User className="h-4 w-4 text-amber-500" />}
                                  {user.role === 'Employee' && <User className="h-4 w-4 text-green-500" />}
                                  {user.role === 'Subcontractor' && <User className="h-4 w-4 text-purple-500" />}
                                  <span className="text-sm">{user.role}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-muted-foreground hidden lg:table-cell">{user.lastActive}</td>
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <Switch 
                                    checked={user.status === 'active'} 
                                    onCheckedChange={() => handleStatusToggle(user.id, user.status)} 
                                    className={user.status === 'active' ? '' : 'bg-gray-200'}
                                  />
                                  <span className="text-sm">
                                    {user.status === 'active' && <span className="text-green-600">Active</span>}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit User
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Key className="h-4 w-4 mr-2" />
                                      Reset Password
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-destructive focus:text-destructive">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete User
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                              No active users found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab content for inactive users */}
            <TabsContent value="inactive" className="mt-0">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="overflow-hidden rounded-md border">
                    <table className="w-full border-collapse">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Role</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden lg:table-cell">Last Active</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.filter(user => user.status === 'inactive').length > 0 ? (
                          filteredUsers.filter(user => user.status === 'inactive').map((user) => (
                            <tr key={user.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.avatar || ''} alt={user.name} />
                                    <AvatarFallback className="bg-primary-gradient text-white">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-sm">{user.name}</div>
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                  {user.role === 'Admin' && <Shield className="h-4 w-4 text-indigo-500" />}
                                  {user.role === 'Office Staff' && <Mail className="h-4 w-4 text-blue-500" />}
                                  {user.role === 'Foreman' && <User className="h-4 w-4 text-amber-500" />}
                                  {user.role === 'Employee' && <User className="h-4 w-4 text-green-500" />}
                                  {user.role === 'Subcontractor' && <User className="h-4 w-4 text-purple-500" />}
                                  <span className="text-sm">{user.role}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-muted-foreground hidden lg:table-cell">{user.lastActive}</td>
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <Switch 
                                    checked={user.status === 'active'} 
                                    onCheckedChange={() => handleStatusToggle(user.id, user.status)} 
                                    className={user.status === 'active' ? '' : 'bg-gray-200'}
                                  />
                                  <span className="text-sm">
                                    {user.status === 'inactive' && <span className="text-gray-600">Inactive</span>}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit User
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Key className="h-4 w-4 mr-2" />
                                      Reset Password
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-destructive focus:text-destructive">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete User
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                              No inactive users found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab content for pending users */}
            <TabsContent value="pending" className="mt-0">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="overflow-hidden rounded-md border">
                    <table className="w-full border-collapse">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Role</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden lg:table-cell">Last Active</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.filter(user => user.status === 'pending').length > 0 ? (
                          filteredUsers.filter(user => user.status === 'pending').map((user) => (
                            <tr key={user.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.avatar || ''} alt={user.name} />
                                    <AvatarFallback className="bg-primary-gradient text-white">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-sm">{user.name}</div>
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                  {user.role === 'Admin' && <Shield className="h-4 w-4 text-indigo-500" />}
                                  {user.role === 'Office Staff' && <Mail className="h-4 w-4 text-blue-500" />}
                                  {user.role === 'Foreman' && <User className="h-4 w-4 text-amber-500" />}
                                  {user.role === 'Employee' && <User className="h-4 w-4 text-green-500" />}
                                  {user.role === 'Subcontractor' && <User className="h-4 w-4 text-purple-500" />}
                                  <span className="text-sm">{user.role}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-muted-foreground hidden lg:table-cell">{user.lastActive}</td>
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <Switch 
                                    checked={user.status === 'active'} 
                                    onCheckedChange={() => handleStatusToggle(user.id, user.status)} 
                                    className={user.status === 'active' ? '' : 'bg-gray-200'}
                                  />
                                  <span className="text-sm">
                                    {user.status === 'pending' && <span className="text-amber-600">Pending</span>}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit User
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Key className="h-4 w-4 mr-2" />
                                      Reset Password
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-destructive focus:text-destructive">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete User
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                              No pending users found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
      
      {/* Invite User Dialog */}
      <Dialog open={inviteUserOpen} onOpenChange={handleCloseInviteUser}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite New User</DialogTitle>
            <DialogDescription>
              Send an invitation to add a new user to the office.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="user@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">User Role</Label>
              <select 
                id="role" 
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="office">Office Staff</option>
                <option value="foreman">Foreman</option>
                <option value="employee">Employee</option>
                <option value="subcontractor">Subcontractor</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <textarea 
                id="message" 
                placeholder="Add a personal message to the invitation email"
                className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCloseInviteUser}>Cancel</Button>
            <Button onClick={handleSendInvite} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Send Invitation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog */}
      <Dialog open={editUserOpen} onOpenChange={handleCloseEditUser}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar || ''} alt={selectedUser.name} />
                  <AvatarFallback className="bg-primary-gradient text-white text-lg">
                    {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input 
                  id="edit-name" 
                  defaultValue={selectedUser.name}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  defaultValue={selectedUser.email}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <select 
                  id="edit-role" 
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  defaultValue={selectedUser.role}
                >
                  <option value="Admin">Admin</option>
                  <option value="Office Staff">Office Staff</option>
                  <option value="Foreman">Foreman</option>
                  <option value="Employee">Employee</option>
                  <option value="Subcontractor">Subcontractor</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <div className="flex items-center gap-3">
                  <Switch id="edit-status" defaultChecked={selectedUser.status === 'active'} />
                  <Label htmlFor="edit-status" className="cursor-pointer">
                    {selectedUser.status === 'active' ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCloseEditUser}>Cancel</Button>
            <Button onClick={handleSaveUser} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* User Limit Dialog */}
      {userLimitDialogOpen && (
        <UserLimitDialog
          isOpen={userLimitDialogOpen}
          onClose={handleCloseUserLimitDialog}
          office={office}
          onSave={handleUserLimitSave}
        />
      )}
    </Dialog>
  );
};

export default OfficeUserManagement;
