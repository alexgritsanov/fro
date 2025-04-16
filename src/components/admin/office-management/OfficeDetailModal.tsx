import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building, Users, Edit, ShieldCheck } from 'lucide-react';
import { OfficeDetailModalProps } from './types';

const OfficeDetailModal: React.FC<OfficeDetailModalProps> = ({
  showOfficeDetails,
  setShowOfficeDetails,
  selectedOffice,
  onManageUsers,
  onEditOffice
}) => {
  if (!selectedOffice) return null;

  const handleClose = () => {
    setShowOfficeDetails(false);
  };

  return (
    <Dialog open={showOfficeDetails} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-gray-800 shadow-sm">
              <AvatarImage src={selectedOffice?.logo} alt={selectedOffice?.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                {selectedOffice?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {selectedOffice?.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information about this office and its operations
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-500" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Service Type</p>
                    <p className="font-medium">{selectedOffice.service_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-medium">{selectedOffice.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <Badge className={selectedOffice.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'}>
                      {selectedOffice.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">User Limit</p>
                    <p className="font-medium">{selectedOffice.user_limit} users</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                    <p className="font-medium">{selectedOffice.created_at ? new Date(selectedOffice.created_at).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Activity</p>
                    <p className="font-medium">{selectedOffice.last_activity ? new Date(selectedOffice.last_activity).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  User Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Employees</span>
                    <span className="font-semibold">{selectedOffice.users?.employee || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full" 
                      style={{
                        width: `${Math.min((selectedOffice.users?.employee || 0) / (selectedOffice.user_limit || 1) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subcontractors</span>
                    <span className="font-semibold">{selectedOffice.users?.subcontractor || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-purple-600 h-2.5 rounded-full" 
                      style={{
                        width: `${Math.min((selectedOffice.users?.subcontractor || 0) / (selectedOffice.user_limit || 1) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Foremen</span>
                    <span className="font-semibold">{selectedOffice.users?.foreman || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-2.5 rounded-full" 
                      style={{
                        width: `${Math.min((selectedOffice.users?.foreman || 0) / (selectedOffice.user_limit || 1) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customers</span>
                    <span className="font-semibold">{selectedOffice.users?.customer || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-amber-600 h-2.5 rounded-full" 
                      style={{
                        width: `${Math.min((selectedOffice.users?.customer || 0) / (selectedOffice.user_limit || 1) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-500" />
                Security & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center">
                    <span className="mr-2">Required for admins:</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Enabled
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Password Policy</h3>
                  <div className="flex items-center">
                    <span className="mr-2">Strength requirement:</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      High
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">IP Restrictions</h3>
                  <div className="flex items-center">
                    <span className="mr-2">Status:</span>
                    <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                      Disabled
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <DialogFooter className="flex justify-between items-center gap-2 sm:gap-0 mt-6">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onManageUsers(selectedOffice)}>
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                handleClose();
                onEditOffice(selectedOffice);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Office
            </Button>
          </div>
          <Button variant="default" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OfficeDetailModal;
