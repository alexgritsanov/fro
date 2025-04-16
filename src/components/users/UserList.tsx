import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertCircle, 
  Check, 
  Search, 
  MoreHorizontal, 
  Edit, 
  UserX, 
  UserCheck,
  Mail,
  Shield,
  Filter,
  Grid,
  List,
  X,
  FolderOpen,
  RefreshCw
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { DataTable } from '@/components/DataTable';
import StatusBadge from '@/components/StatusBadge';
import UserFolder from './UserFolder';
import ActionMenu from '@/components/ActionMenu';
import { getAllProfiles, updateProfileStatus, Profile } from '@/services/api/profilesApi';

interface UserListProps {
  onEdit: (user: Profile) => void;
  onViewUser?: (user: Profile) => void;
}

const UserList: React.FC<UserListProps> = ({ onEdit, onViewUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  
  const { data: users, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['profiles'],
    queryFn: getAllProfiles,
    staleTime: 300000 // 5 minutes
  });
  
  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      await updateProfileStatus(userId, newStatus);
      
      toast.success(`User status updated to ${newStatus}`);
      refetch(); // Refresh the data
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    }
  };
  
  const handleViewUserFolder = (user: Profile) => {
    setSelectedUser(user);
    setIsFolderOpen(true);
  };
  
  const handleCloseUserFolder = () => {
    setIsFolderOpen(false);
    setSelectedUser(null);
  };
  
  const clearAllFilters = () => {
    setRoleFilter('all');
    setStatusFilter('all');
    setSearchTerm('');
  };
  
  const toggleRoleFilter = (role: string) => {
    setRoleFilter(prev => prev === role ? 'all' : role);
  };
  
  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev => prev === status ? 'all' : status);
  };
  
  const filteredUsers = users?.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter.toLowerCase();
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  }) || [];
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 flex justify-center items-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (isError) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load users</h3>
            <p className="text-sm text-gray-500 mb-4">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
            <Button onClick={() => refetch()} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <>
      <Card className="border border-gray-200 bg-white">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <CardTitle>User Management</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-10 w-full md:w-64" 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === 'list' ? "default" : "ghost"} 
                  size="sm"
                  className="rounded-none px-3"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'grid' ? "default" : "ghost"} 
                  size="sm"
                  className="rounded-none px-3"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Filters</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-xs" 
                      onClick={clearAllFilters}
                    >
                      Clear All
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <h4 className="mb-2 text-sm font-semibold">Filter by Role</h4>
                    <div className="grid gap-1.5">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`justify-between ${roleFilter === 'all' ? 'bg-gray-100' : ''}`}
                        onClick={() => toggleRoleFilter('all')}
                      >
                        <span>All Roles</span>
                        {roleFilter === 'all' && <Check className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`justify-between ${roleFilter === 'client' ? 'bg-gray-100' : ''}`}
                        onClick={() => toggleRoleFilter('client')}
                      >
                        <span>Client</span>
                        {roleFilter === 'client' && <Check className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`justify-between ${roleFilter === 'employee' ? 'bg-gray-100' : ''}`}
                        onClick={() => toggleRoleFilter('employee')}
                      >
                        <span>Employee</span>
                        {roleFilter === 'employee' && <Check className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`justify-between ${roleFilter === 'foreman' ? 'bg-gray-100' : ''}`}
                        onClick={() => toggleRoleFilter('foreman')}
                      >
                        <span>Foreman</span>
                        {roleFilter === 'foreman' && <Check className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`justify-between ${roleFilter === 'subcontractor' ? 'bg-gray-100' : ''}`}
                        onClick={() => toggleRoleFilter('subcontractor')}
                      >
                        <span>Subcontractor</span>
                        {roleFilter === 'subcontractor' && <Check className="h-4 w-4" />}
                      </Button>
                    </div>
                    <DropdownMenuSeparator className="my-2" />
                    <h4 className="mb-2 text-sm font-semibold">Filter by Status</h4>
                    <div className="grid gap-1.5">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`justify-between ${statusFilter === 'all' ? 'bg-gray-100' : ''}`}
                        onClick={() => toggleStatusFilter('all')}
                      >
                        <span>All Statuses</span>
                        {statusFilter === 'all' && <Check className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`justify-between ${statusFilter === 'active' ? 'bg-gray-100' : ''}`}
                        onClick={() => toggleStatusFilter('active')}
                      >
                        <span>Active</span>
                        {statusFilter === 'active' && <Check className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`justify-between ${statusFilter === 'inactive' ? 'bg-gray-100' : ''}`}
                        onClick={() => toggleStatusFilter('inactive')}
                      >
                        <span>Inactive</span>
                        {statusFilter === 'inactive' && <Check className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="foremen">Foremen</TabsTrigger>
              <TabsTrigger value="subcontractors">Subcontractors</TabsTrigger>
              <TabsTrigger value="supplier-clients">Supplier-Client</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {viewMode === 'list' ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={user.avatar_url} />
                                  <AvatarFallback className="bg-blue-100 text-blue-600">
                                    {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{user.name || 'Unnamed User'}</div>
                                  <div className="text-sm text-gray-500">{user.email || `user-${user.id.substring(0, 8)}@example.com`}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={
                                user.role === 'Client' 
                                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
                                  : user.role === 'Foreman'
                                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                                  : user.role === 'Employee'
                                  ? 'bg-green-100 text-green-800 border-green-200'
                                  : 'bg-purple-100 text-purple-800 border-purple-200'
                              }>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div className={`h-2 w-2 rounded-full mr-2 ${
                                  user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                }`}></div>
                                <StatusBadge 
                                  status={user.status === 'active' ? 'success' : 'error'} 
                                  label={user.status}
                                  size="xs"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              {formatDate(user.lastActive)}
                            </TableCell>
                            <TableCell className="text-right">
                              <ActionMenu
                                actions={[
                                  {
                                    label: "Edit User",
                                    icon: <Edit className="h-4 w-4" />,
                                    onClick: () => onEdit(user)
                                  },
                                  {
                                    label: "View User Folder",
                                    icon: <FolderOpen className="h-4 w-4" />,
                                    onClick: () => handleViewUserFolder(user)
                                  },
                                  {
                                    label: "Email User",
                                    icon: <Mail className="h-4 w-4" />,
                                    onClick: () => console.log("Email user:", user.email)
                                  },
                                  {
                                    label: "Permissions",
                                    icon: <Shield className="h-4 w-4" />,
                                    onClick: () => console.log("Manage permissions for:", user.name)
                                  },
                                  {
                                    label: user.status === 'active' ? "Deactivate" : "Activate",
                                    icon: user.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />,
                                    onClick: () => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active'),
                                    variant: user.status === 'active' ? 'destructive' : 'success'
                                  }
                                ]}
                                iconOnly={true}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 mb-2">No users found</h3>
                            <p className="text-sm text-gray-500">
                              Try adjusting your search or filter criteria
                            </p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <Card key={user.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="p-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={user.avatar_url} />
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                                  {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{user.name || 'Unnamed User'}</h3>
                                <p className="text-sm text-gray-500">{user.email || `user-${user.id.substring(0, 8)}@example.com`}</p>
                              </div>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs text-gray-500">Role</p>
                                <Badge className={
                                  user.role === 'Client' 
                                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
                                    : user.role === 'Foreman'
                                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                                    : user.role === 'Employee'
                                    ? 'bg-green-100 text-green-800 border-green-200'
                                    : 'bg-purple-100 text-purple-800 border-purple-200'
                                }>
                                  {user.role}
                                </Badge>
                              </div>
                              
                              <div>
                                <p className="text-xs text-gray-500">Status</p>
                                <div className="flex items-center">
                                  <div className={`h-2 w-2 rounded-full mr-2 ${
                                    user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                  }`}></div>
                                  <StatusBadge 
                                    status={user.status === 'active' ? 'success' : 'error'} 
                                    label={user.status}
                                    size="xs"
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <p className="text-xs text-gray-500">Last Active</p>
                              <p className="text-sm">{formatDate(user.lastActive)}</p>
                            </div>
                          </div>
                          
                          <div className="border-t flex">
                            <Button 
                              variant="ghost" 
                              className="flex-1 rounded-none h-10"
                              onClick={() => handleViewUserFolder(user)}
                            >
                              <FolderOpen className="h-4 w-4 mr-2" />
                              View Folder
                            </Button>
                            <div className="border-l h-10"></div>
                            <ActionMenu
                              actions={[
                                {
                                  label: "Edit User",
                                  icon: <Edit className="h-4 w-4" />,
                                  onClick: () => onEdit(user)
                                },
                                {
                                  label: "Email User",
                                  icon: <Mail className="h-4 w-4" />,
                                  onClick: () => console.log("Email user:", user.email)
                                },
                                {
                                  label: "Permissions",
                                  icon: <Shield className="h-4 w-4" />,
                                  onClick: () => console.log("Manage permissions for:", user.name)
                                },
                                {
                                  label: user.status === 'active' ? "Deactivate" : "Activate",
                                  icon: user.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />,
                                  onClick: () => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active'),
                                  variant: user.status === 'active' ? 'destructive' : 'success'
                                }
                              ]}
                              iconOnly={true}
                              triggerClassName="rounded-none h-10 px-4"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No users found</h3>
                      <p className="text-sm text-gray-500">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="clients" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <Check className="h-12 w-12 text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-600 mb-2">This is a placeholder</h3>
                          <p className="text-sm text-gray-500">
                            In a real application, this would show filtered client users
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="employees" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <Check className="h-12 w-12 text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-600 mb-2">This is a placeholder</h3>
                          <p className="text-sm text-gray-500">
                            In a real application, this would show filtered employee users
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="foremen" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <Check className="h-12 w-12 text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-600 mb-2">This is a placeholder</h3>
                          <p className="text-sm text-gray-500">
                            In a real application, this would show filtered foremen users
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="subcontractors" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <Check className="h-12 w-12 text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-600 mb-2">This is a placeholder</h3>
                          <p className="text-sm text-gray-500">
                            In a real application, this would show filtered subcontractor users
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="supplier-clients" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <Check className="h-12 w-12 text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-600 mb-2">This is a placeholder</h3>
                          <p className="text-sm text-gray-500">
                            In a real application, this would show filtered supplier-client users
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {selectedUser && (
        <UserFolder 
          user={selectedUser}
          onClose={handleCloseUserFolder}
          open={isFolderOpen}
          onDeleteUser={(userId) => {
            toast.success(`User deleted successfully`);
            handleCloseUserFolder();
          }}
          onResetPassword={(userId) => {
            toast.success(`Password reset email sent`);
          }}
          onPromote={(userId) => {
            toast.success(`User promoted successfully`);
          }}
          onDeactivate={(userId) => {
            handleStatusChange(userId, 'inactive');
          }}
          onActivate={(userId) => {
            handleStatusChange(userId, 'active');
          }}
        />
      )}
    </>
  );
};

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'MMM d, yyyy');
  } catch (e) {
    return 'Invalid date';
  }
};

export default UserList;
