
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check } from 'lucide-react';
import { adminUsers } from './data';

interface AdminAssignmentStepProps {
  selectedAdmin: string;
  setSelectedAdmin: (value: string) => void;
  agentId?: string;
  agentName?: string;
}

const AdminAssignmentStep: React.FC<AdminAssignmentStepProps> = ({
  selectedAdmin,
  setSelectedAdmin,
  agentId,
  agentName
}) => {
  const displayAdminUsers = agentId 
    ? [
        {
          id: agentId,
          name: agentName || 'Agent',
          email: 'agent@example.com',
          avatar: null,
          role: 'Agent'
        },
        ...adminUsers
      ]
    : adminUsers;
    
  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold mb-4">Admin Assignment</h2>
      <p className="text-gray-600 mb-4">Select an admin user who will be responsible for managing this office.</p>
      
      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
        {displayAdminUsers.map(admin => (
          <div 
            key={admin.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md flex items-center
              ${selectedAdmin === admin.id ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300' : 'border-gray-200 hover:border-blue-300'}`}
            onClick={() => setSelectedAdmin(admin.id)}
          >
            <div className="mr-4">
              <Avatar className="h-12 w-12 border border-gray-200">
                <AvatarImage src={admin.avatar || ''} alt={admin.name} />
                <AvatarFallback className="bg-blue-100 text-blue-800">
                  {admin.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-grow">
              <p className="font-medium">{admin.name}</p>
              <p className="text-sm text-gray-500">{admin.email}</p>
              <p className="text-xs text-gray-400">{admin.role}</p>
            </div>
            {selectedAdmin === admin.id && (
              <div className="flex-shrink-0 bg-blue-500 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAssignmentStep;
