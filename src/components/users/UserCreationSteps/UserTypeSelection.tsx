
import React from 'react';
import { UserType } from '../UserCreationModal';
import { Card } from '@/components/ui/card';
import { Building2, HardHat, Truck, User } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

interface UserTypeSelectionProps {
  selectedType: UserType;
  onSelect: (type: UserType) => void;
}

const UserTypeSelection = ({ selectedType, onSelect }: UserTypeSelectionProps) => {
  const userTypes = [
    {
      id: 'client',
      name: 'Client',
      description: 'A customer who receives services',
      icon: <Building2 className="h-6 w-6 text-amber-600" />,
      color: 'bg-amber-50 border-amber-200 hover:bg-amber-100'
    },
    {
      id: 'employee',
      name: 'Employee',
      description: 'An internal staff member',
      icon: <User className="h-6 w-6 text-green-600" />,
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'subcontractor',
      name: 'Subcontractor',
      description: 'External service provider',
      icon: <Truck className="h-6 w-6 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      id: 'foreman',
      name: 'Foreman',
      description: 'Supervises field operations',
      icon: <HardHat className="h-6 w-6 text-indigo-600" />,
      color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
    }
  ];
  
  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Select the type of user you want to create. This will determine their role and permissions in the system.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userTypes.map((type) => (
          <Card 
            key={type.id}
            className={`p-4 cursor-pointer transition-all duration-300 border hover:shadow-md ${
              selectedType === type.id 
                ? `ring-2 ring-blue-600 ${type.color}` 
                : `border-gray-200 hover:border-blue-200 ${type.color}`
            }`}
            onClick={() => onSelect(type.id as UserType)}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100">
                {type.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 flex items-center justify-between">
                  {type.name}
                  {selectedType === type.id && (
                    <StatusBadge 
                      status="success" 
                      label="Selected" 
                      size="xs"
                    />
                  )}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{type.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserTypeSelection;
