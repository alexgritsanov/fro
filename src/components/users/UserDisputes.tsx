
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Filter, 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  FileText,
  BarChart,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserDisputesProps {
  user: User | null;
}

const UserDisputes = ({ user }: UserDisputesProps) => {
  if (!user) return <div>No user selected</div>;
  
  // Mock disputes data
  const disputes = [
    {
      id: 'd1',
      title: 'Billing Discrepancy - Invoice #2023-156',
      type: 'Billing',
      date: '2023-11-10',
      status: 'open',
      priority: 'high',
      customer: 'Acme Corp',
      description: 'Customer disputes the hours billed on Invoice #2023-156.'
    },
    {
      id: 'd2',
      title: 'Service Quality - SC-2023-089',
      type: 'Service',
      date: '2023-11-05',
      status: 'resolved',
      priority: 'medium',
      customer: 'TechGiant Inc',
      description: 'Customer reported issues with service quality on service call SC-2023-089.'
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open':
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            Open
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            In Progress
          </Badge>
        );
      case 'resolved':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Resolved
          </Badge>
        );
      case 'closed':
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            Closed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            Medium
          </Badge>
        );
      case 'low':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Low
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {priority}
          </Badge>
        );
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'open':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'in-progress':
        return <BarChart className="h-5 w-5 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'closed':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h2 className="text-xl font-semibold">Disputes</h2>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          
          <Button 
            size="sm"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>New Dispute</span>
          </Button>
        </div>
      </div>
      
      <div className="relative w-full max-w-md">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input 
          placeholder="Search disputes..." 
          className="pl-10"
        />
      </div>
      
      {disputes.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden divide-y">
          {disputes.map((dispute) => (
            <div key={dispute.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                  {getStatusIcon(dispute.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-medium text-gray-900">{dispute.title}</h3>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(dispute.status)}
                      {getPriorityBadge(dispute.priority)}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{format(new Date(dispute.date), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      <span>{dispute.customer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      <span>{dispute.type}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-2 border-t border-gray-100 pt-2">
                    {dispute.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <AlertTriangle className="h-12 w-12" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">No disputes found</h3>
          <p className="text-gray-500">There are no disputes associated with this user.</p>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create New Dispute
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserDisputes;
