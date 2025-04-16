import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  FileCheck
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

interface UserServiceHistoryProps {
  user: User | null;
}

const UserServiceHistory = ({ user }: UserServiceHistoryProps) => {
  if (!user) return <div>No user selected</div>;
  
  // Mock service calls
  const serviceCalls = [
    {
      id: 'sc1',
      serviceId: 'SC-2023-089',
      customer: 'Acme Corp',
      location: '123 Main St, Anytown',
      date: '2023-11-05',
      status: 'completed',
      notes: 'Regular maintenance completed successfully'
    },
    {
      id: 'sc2',
      serviceId: 'SC-2023-092',
      customer: 'TechGiant Inc',
      location: '456 Tech Ave, Innovation City',
      date: '2023-11-12',
      status: 'completed',
      notes: 'Equipment installation and testing'
    },
    {
      id: 'sc3',
      serviceId: 'SC-2023-097',
      customer: 'Stellar Systems',
      location: '789 Galaxy Blvd, Starville',
      date: '2023-11-18',
      status: 'scheduled',
      notes: 'Quarterly systems check'
    },
    {
      id: 'sc4',
      serviceId: 'SC-2023-103',
      customer: 'Global Industries',
      location: '101 Commerce St, Metropolis',
      date: '2023-11-15',
      status: 'cancelled',
      notes: 'Cancelled by customer due to site access issues'
    }
  ];
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <FileCheck className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h2 className="text-xl font-semibold">Service History</h2>
        
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
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            <span>View Calendar</span>
          </Button>
        </div>
      </div>
      
      <div className="relative w-full max-w-md">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input 
          placeholder="Search service calls..." 
          className="pl-10"
        />
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden divide-y">
        {serviceCalls.map((call) => (
          <div key={call.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                {getStatusIcon(call.status)}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{call.serviceId}</h3>
                    <p className="text-sm text-gray-600 mt-0.5">{call.customer}</p>
                  </div>
                  
                  <Badge className={getStatusClass(call.status)}>
                    {call.status}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{format(new Date(call.date), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{call.location}</span>
                  </div>
                </div>
                
                {call.notes && (
                  <p className="text-sm text-gray-600 mt-2 border-t border-gray-100 pt-2">
                    {call.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserServiceHistory;
