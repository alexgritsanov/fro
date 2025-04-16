
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check, X, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserType } from '../UserCreationModal';

interface PermissionConfigurationProps {
  userType?: UserType;
  userPermissions: Record<string, boolean>;
  onPermissionChange: (permission: string, value: boolean) => void;
}

const PermissionConfiguration = ({ userType = 'employee', userPermissions, onPermissionChange }: PermissionConfigurationProps) => {
  // Define permission sets based on user type
  const permissionSets = {
    client: {
      dashboard: {
        viewOwnData: true,
        viewReports: true,
        viewSchedule: true,
        viewInvoices: true,
        viewAnalytics: false,
      },
      schedule: {
        requestService: true,
        viewOwnSchedule: true,
        editSchedule: false,
        approveSchedule: false,
      },
      users: {
        manageOwnProfile: true,
        inviteUsers: false,
        manageUsers: false,
      },
      documents: {
        viewOwnDocuments: true,
        createDocuments: false,
        approveDocuments: false,
      }
    },
    employee: {
      dashboard: {
        viewOwnData: true,
        viewReports: true,
        viewSchedule: true,
        viewInvoices: false,
        viewAnalytics: false,
      },
      schedule: {
        requestService: false,
        viewOwnSchedule: true,
        editSchedule: false,
        approveSchedule: false,
      },
      users: {
        manageOwnProfile: true,
        inviteUsers: false,
        manageUsers: false,
      },
      documents: {
        viewOwnDocuments: true,
        createDocuments: true,
        approveDocuments: false,
      }
    },
    subcontractor: {
      dashboard: {
        viewOwnData: true,
        viewReports: true,
        viewSchedule: true,
        viewInvoices: false,
        viewAnalytics: false,
      },
      schedule: {
        requestService: false,
        viewOwnSchedule: true,
        editSchedule: false,
        approveSchedule: false,
      },
      users: {
        manageOwnProfile: true,
        inviteUsers: false,
        manageUsers: false,
      },
      documents: {
        viewOwnDocuments: true,
        createDocuments: true,
        approveDocuments: false,
      }
    },
    foreman: {
      dashboard: {
        viewOwnData: true,
        viewReports: true,
        viewSchedule: true,
        viewInvoices: true,
        viewAnalytics: true,
      },
      schedule: {
        requestService: true,
        viewOwnSchedule: true,
        editSchedule: true,
        approveSchedule: true,
      },
      users: {
        manageOwnProfile: true,
        inviteUsers: false,
        manageUsers: false,
      },
      documents: {
        viewOwnDocuments: true,
        createDocuments: true,
        approveDocuments: true,
      }
    },
    office: {
      dashboard: {
        viewOwnData: true,
        viewReports: true,
        viewSchedule: true,
        viewInvoices: true,
        viewAnalytics: true,
      },
      schedule: {
        requestService: true,
        viewOwnSchedule: true,
        editSchedule: true,
        approveSchedule: true,
      },
      users: {
        manageOwnProfile: true,
        inviteUsers: true,
        manageUsers: true,
      },
      documents: {
        viewOwnDocuments: true,
        createDocuments: true,
        approveDocuments: true,
      }
    }
  };
  
  const permissions = permissionSets[userType];
  
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Permission Configuration</h2>
          <p className="text-gray-500">
            Default permissions based on the selected user type
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border">
            <h3 className="font-medium mb-3">Dashboard Access</h3>
            <div className="space-y-2">
              {Object.entries(permissions.dashboard).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-60">
                          {getPermissionDescription(key)}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {value ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300" />
                  )}
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-4 border">
            <h3 className="font-medium mb-3">Schedule Management</h3>
            <div className="space-y-2">
              {Object.entries(permissions.schedule).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-60">
                          {getPermissionDescription(key)}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {value ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300" />
                  )}
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-4 border">
            <h3 className="font-medium mb-3">User Management</h3>
            <div className="space-y-2">
              {Object.entries(permissions.users).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-60">
                          {getPermissionDescription(key)}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {value ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300" />
                  )}
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-4 border">
            <h3 className="font-medium mb-3">Document Management</h3>
            <div className="space-y-2">
              {Object.entries(permissions.documents).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-60">
                          {getPermissionDescription(key)}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {value ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800 text-sm">
          <div className="flex items-start">
            <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Default Permissions</p>
              <p className="mt-1">These permissions are automatically configured based on the user type. System administrators can adjust individual permissions after the user has been created.</p>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

// Helper function to provide more details about each permission
function getPermissionDescription(key: string): string {
  const descriptions: Record<string, string> = {
    viewOwnData: "Access to view their own personal data and information",
    viewReports: "Access to view reports relevant to their role",
    viewSchedule: "Access to view upcoming scheduled activities",
    viewInvoices: "Access to view invoices and financial information",
    viewAnalytics: "Access to view system analytics and data visualizations",
    requestService: "Ability to create new service requests",
    viewOwnSchedule: "Access to view their own schedule and assignments",
    editSchedule: "Ability to modify scheduled activities",
    approveSchedule: "Authority to approve or reject scheduled activities",
    manageOwnProfile: "Ability to edit their own profile information",
    inviteUsers: "Ability to invite new users to the system",
    manageUsers: "Authority to create, edit, and deactivate user accounts",
    viewOwnDocuments: "Access to view documents relevant to them",
    createDocuments: "Ability to create and upload new documents",
    approveDocuments: "Authority to approve or reject documents",
  };
  
  return descriptions[key] || "Permission for system functionality";
}

export default PermissionConfiguration;
