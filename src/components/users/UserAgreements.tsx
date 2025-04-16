
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Filter, Search, Clock, User, Building } from 'lucide-react';
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

interface UserAgreementsProps {
  user: User | null;
}

const UserAgreements = ({ user }: UserAgreementsProps) => {
  if (!user) return <div>No user selected</div>;
  
  // Mock agreements
  const agreements = [
    {
      id: 'a1',
      title: 'Service Agreement 2023',
      status: 'active',
      date: '2023-01-15',
      type: 'Service',
      customer: 'Acme Corp'
    },
    {
      id: 'a2',
      title: 'Equipment Rental Contract',
      status: 'active',
      date: '2023-06-22',
      type: 'Rental',
      customer: 'TechGiant Inc'
    },
    {
      id: 'a3',
      title: 'Maintenance Agreement Q4',
      status: 'pending',
      date: '2023-10-01',
      type: 'Maintenance',
      customer: 'Stellar Systems'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h2 className="text-xl font-semibold">Agreements</h2>
        
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
            <span>New Agreement</span>
          </Button>
        </div>
      </div>
      
      <div className="relative w-full max-w-md">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input 
          placeholder="Search agreements..." 
          className="pl-10"
        />
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {agreements.length > 0 ? (
          <div className="divide-y">
            {agreements.map((agreement) => (
              <div key={agreement.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="font-medium">{agreement.title}</h3>
                      <Badge className={
                        agreement.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                        agreement.status === 'pending' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }>
                        {agreement.status}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{format(new Date(agreement.date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        <span>{agreement.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="h-3.5 w-3.5" />
                        <span>{agreement.customer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <FileText className="h-12 w-12" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">No agreements found</h3>
            <p className="text-gray-500">This user doesn't have any agreements yet.</p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Agreement
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAgreements;
