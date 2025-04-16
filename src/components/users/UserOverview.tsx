
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Calendar,
  Mail,
  Phone,
  Clock,
  Building,
  Award,
  Star,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileCheck,
  Settings,
  Briefcase,
  User as UserIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import StatusBadge, { StatusType } from '@/components/StatusBadge';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone?: string;
  addedDate?: string;
  lastActive?: string;
  position?: string;
}

interface UserOverviewProps {
  user: User | null;
  onDeleteUser?: (userId: string) => void;
  onResetPassword?: (userId: string) => void;
  onPromote?: (userId: string) => void;
  onDeactivate?: (userId: string) => void;
  onActivate?: (userId: string) => void;
}

const UserOverview = ({ 
  user, 
  onDeleteUser,
  onResetPassword,
  onPromote,
  onDeactivate,
  onActivate
}: UserOverviewProps) => {
  if (!user) return <div>No user selected</div>;
  
  // Map user status to StatusType
  const getStatusType = (status: string): StatusType => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'neutral';
    }
  };
  
  // Statistics data for the user
  const statistics = [
    { 
      label: 'Completed Jobs', 
      value: '32', 
      icon: FileCheck, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      label: 'Avg. Rating', 
      value: '4.8/5', 
      icon: Star, 
      color: 'bg-amber-100 text-amber-600' 
    },
    { 
      label: 'Open Tasks', 
      value: '3', 
      icon: Clock, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      label: 'Doc. Submitted', 
      value: '12', 
      icon: ShieldCheck, 
      color: 'bg-indigo-100 text-indigo-600' 
    }
  ];
  
  // Recent activity events
  const recentActivity = [
    {
      type: 'document',
      title: 'Submitted Delivery Certificate #1053',
      date: '2023-11-24',
      time: '14:32',
      icon: FileCheck,
      status: 'completed'
    },
    {
      type: 'login',
      title: 'Logged in to the system',
      date: '2023-11-23',
      time: '09:15',
      icon: CheckCircle,
      status: 'success'
    },
    {
      type: 'profile',
      title: 'Updated contact information',
      date: '2023-11-20',
      time: '16:45',
      icon: Settings,
      status: 'info'
    },
    {
      type: 'document',
      title: 'Completed Service Call #SC-2023-092',
      date: '2023-11-12',
      time: '11:30',
      icon: FileCheck,
      status: 'completed'
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Header with user details - using a softer gradient background */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="h-24 w-24 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm">
              <UserIcon className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          
          <div className="md:w-2/3 space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge className="capitalize bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                  {user.role}
                </Badge>
                <StatusBadge status={getStatusType(user.status)} label={user.status} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{user.phone}</span>
                </div>
              )}
              {user.addedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Joined: {user.addedDate}</span>
                </div>
              )}
              {user.lastActive && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Last active: {user.lastActive}</span>
                </div>
              )}
              {user.position && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Position: {user.position}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {statistics.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center justify-center hover:shadow-sm transition-shadow">
            <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center mb-3`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">{stat.value}</span>
            <span className="text-sm text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </div>
        <div className="divide-y">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full flex-shrink-0 ${
                  activity.status === 'completed' ? 'bg-green-100' :
                  activity.status === 'success' ? 'bg-blue-100' :
                  activity.status === 'info' ? 'bg-purple-100' :
                  activity.status === 'warning' ? 'bg-amber-100' :
                  activity.status === 'error' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <activity.icon className={`h-4 w-4 ${
                    activity.status === 'completed' ? 'text-green-600' :
                    activity.status === 'success' ? 'text-blue-600' :
                    activity.status === 'info' ? 'text-purple-600' :
                    activity.status === 'warning' ? 'text-amber-600' :
                    activity.status === 'error' ? 'text-red-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-800">{activity.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.date}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* User Actions */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <CardTitle className="text-lg">User Actions</CardTitle>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {onResetPassword && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onResetPassword(user.id)}
              >
                Reset Password
              </Button>
            )}
            
            {user.status === 'active' && onDeactivate && (
              <Button 
                variant="outline" 
                size="sm"
                className="text-amber-600 border-amber-300 hover:bg-amber-50"
                onClick={() => onDeactivate(user.id)}
              >
                Deactivate User
              </Button>
            )}
            
            {user.status === 'inactive' && onActivate && (
              <Button 
                variant="outline" 
                size="sm"
                className="text-green-600 border-green-300 hover:bg-green-50"
                onClick={() => onActivate(user.id)}
              >
                Activate User
              </Button>
            )}
            
            {onPromote && (
              <Button 
                variant="outline" 
                size="sm"
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
                onClick={() => onPromote(user.id)}
              >
                Promote User
              </Button>
            )}
            
            {onDeleteUser && (
              <Button 
                variant="outline" 
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50"
                onClick={() => onDeleteUser(user.id)}
              >
                Delete User
              </Button>
            )}
          </div>
          
          {user.status === 'inactive' && (
            <Alert className="bg-amber-50 text-amber-800 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription>
                This user account is currently inactive. They cannot log in or access the system.
              </AlertDescription>
            </Alert>
          )}
          
          {user.status === 'pending' && (
            <Alert className="bg-blue-50 text-blue-800 border-blue-200">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                This user account is pending verification. They have limited access to the system.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
