
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Avatar from '@/components/Avatar';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Edit, 
  File, 
  Download,
  FileText,
  Check,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface UserDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onEdit: () => void;
}

const UserDetails = ({ isOpen, onClose, user, onEdit }: UserDetailsProps) => {
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Define role-based permissions
  const getRolePermissions = (role: string) => {
    const permissions = {
      'admin': {
        dashboardAccess: true,
        manageCustomers: true, 
        manageSchedule: true,
        manageAgreements: true,
        manageUsers: true,
        viewReports: true,
        editSettings: true
      },
      'office': {
        dashboardAccess: true,
        manageCustomers: true,
        manageSchedule: true,
        manageAgreements: false,
        manageUsers: false,
        viewReports: true,
        editSettings: false
      },
      'foreman': {
        dashboardAccess: true,
        manageCustomers: false,
        manageSchedule: true,
        manageAgreements: false,
        manageUsers: false,
        viewReports: true,
        editSettings: false
      },
      'employee': {
        dashboardAccess: true,
        manageCustomers: false,
        manageSchedule: false,
        manageAgreements: false,
        manageUsers: false,
        viewReports: false,
        editSettings: false
      },
      'subcontractor': {
        dashboardAccess: true,
        manageCustomers: false,
        manageSchedule: false,
        manageAgreements: false,
        manageUsers: false,
        viewReports: false,
        editSettings: false
      },
      'client': {
        dashboardAccess: true,
        manageCustomers: false,
        manageSchedule: false,
        manageAgreements: false,
        manageUsers: false,
        viewReports: false,
        editSettings: false
      },
      'default': {
        dashboardAccess: false,
        manageCustomers: false,
        manageSchedule: false,
        manageAgreements: false,
        manageUsers: false,
        viewReports: false,
        editSettings: false
      }
    };
    
    return permissions[role as keyof typeof permissions] || permissions.default;
  };

  const userPermissions = getRolePermissions(user.role?.toLowerCase());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-unidoc-primary-blue" />
            User Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar 
              alt={user.name} 
              size="lg" 
              status={user.status === 'active' ? 'online' : 'offline'} 
            />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <div className="flex items-center mt-1 gap-2">
                <Badge 
                  className={cn(
                    "capitalize",
                    user.role?.toLowerCase() === 'admin' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' :
                    user.role?.toLowerCase() === 'foreman' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                    user.role?.toLowerCase() === 'employee' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                    user.role?.toLowerCase() === 'office' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                    user.role?.toLowerCase() === 'subcontractor' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' :
                    user.role?.toLowerCase() === 'client' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                    'bg-gray-100 text-gray-800 hover:bg-gray-100'
                  )}
                >
                  {user.role}
                </Badge>
                <Badge 
                  variant={user.status === 'active' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {user.status}
                </Badge>
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
        
        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center text-unidoc-medium mb-1 text-sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </div>
                <div>{user.email}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center text-unidoc-medium mb-1 text-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone
                </div>
                <div>{user.phone || 'Not provided'}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center text-unidoc-medium mb-1 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last Active
                </div>
                <div>{format(new Date(user.lastActive), 'PPP p')}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center text-unidoc-medium mb-1 text-sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Role
                </div>
                <div className="capitalize">{user.role}</div>
              </div>
              
              {user.role?.toLowerCase() === 'client' && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center text-unidoc-medium mb-1 text-sm">
                    Company
                  </div>
                  <div>{user.company || 'Not provided'}</div>
                </div>
              )}
              
              {(user.role?.toLowerCase() === 'employee' || user.role?.toLowerCase() === 'foreman') && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center text-unidoc-medium mb-1 text-sm">
                    Position
                  </div>
                  <div>{user.position || 'Not provided'}</div>
                </div>
              )}
              
              {user.role?.toLowerCase() === 'subcontractor' && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center text-unidoc-medium mb-1 text-sm">
                    Business Type
                  </div>
                  <div>{user.businessType || 'Not provided'}</div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="permissions" className="pt-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-3">System Access Level</h3>
              <div className="space-y-3">
                {Object.entries(userPermissions).map(([permission, granted], index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <span className="capitalize">{permission.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <div className="flex items-center">
                      {granted ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Granted
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200 flex items-center gap-1">
                          <X className="h-3 w-3" />
                          Not Granted
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="pt-4">
            {user.documents && user.documents.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">User Documents</h3>
                <div className="border rounded-md divide-y">
                  {user.documents.map((doc: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded mr-3">
                          <FileText className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-unidoc-medium">{formatFileSize(doc.size)}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-unidoc-primary-blue">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 border rounded-md bg-gray-50">
                <File className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <h3 className="text-lg font-medium">No Documents</h3>
                <p className="text-sm text-unidoc-medium mb-4">This user doesn't have any documents uploaded yet.</p>
                <Button variant="outline" size="sm" onClick={onEdit}>
                  Upload Documents
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetails;
