
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2, User, Users, CircleDollarSign, Edit, ClipboardList } from 'lucide-react';
import { adminUsers, companyTypes } from './data';
import { OfficeFormData } from './types';

interface ReviewStepProps {
  formData: OfficeFormData;
  goToStep: (step: number) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, goToStep }) => {
  const { 
    companyName, 
    companyType, 
    companyId, 
    officeAddress, 
    officePhone, 
    officeEmail,
    profile_data, 
    selectedPlan, 
    customLimits,
    selectedAdmin 
  } = formData;

  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <ClipboardList className="h-5 w-5 mr-2 text-blue-600" />
        Review & Confirm
      </h2>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{companyName || 'Company Name'}</h3>
            <p className="text-gray-600">{companyTypes.find(t => t.value === companyType)?.label || 'Company Type'}</p>
          </div>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2 flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-blue-600" />
              Company Information
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto h-6 w-6" 
                onClick={() => goToStep(2)}
              >
                <Edit className="h-4 w-4 text-gray-500" />
              </Button>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Company ID:</p>
                <p className="font-medium">{companyId || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-gray-500">Address:</p>
                <p className="font-medium">{officeAddress || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone:</p>
                <p className="font-medium">{officePhone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-gray-500">Email:</p>
                <p className="font-medium">{officeEmail || 'Not provided'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2 flex items-center">
              <User className="h-4 w-4 mr-2 text-blue-600" />
              Contact Person
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto h-6 w-6" 
                onClick={() => goToStep(3)}
              >
                <Edit className="h-4 w-4 text-gray-500" />
              </Button>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Name:</p>
                <p className="font-medium">{`${profile_data.first_name} ${profile_data.last_name}` || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-gray-500">Email:</p>
                <p className="font-medium">{profile_data.email || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone:</p>
                <p className="font-medium">{profile_data.phone_number || 'Not provided'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2 flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-600" />
              User Limits
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto h-6 w-6" 
                onClick={() => goToStep(4)}
              >
                <Edit className="h-4 w-4 text-gray-500" />
              </Button>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div className="bg-gray-50 p-2 rounded-md text-center">
                <p className="text-xs text-gray-500">Total</p>
                <p className="font-bold text-blue-600">{customLimits.total}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-md text-center">
                <p className="text-xs text-gray-500">Employees</p>
                <p className="font-bold text-green-600">{customLimits.employee}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-md text-center">
                <p className="text-xs text-gray-500">Foremen</p>
                <p className="font-bold text-indigo-600">{customLimits.foreman}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-md text-center">
                <p className="text-xs text-gray-500">Subcontractors</p>
                <p className="font-bold text-purple-600">{customLimits.subcontractor}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-md text-center">
                <p className="text-xs text-gray-500">Clients</p>
                <p className="font-bold text-amber-600">{customLimits.client}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2 flex items-center">
              <User className="h-4 w-4 mr-2 text-blue-600" />
              Admin Assignment
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto h-6 w-6" 
                onClick={() => goToStep(5)}
              >
                <Edit className="h-4 w-4 text-gray-500" />
              </Button>
            </h4>
            {selectedAdmin ? (
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={adminUsers.find(a => a.id === selectedAdmin)?.avatar || ''} />
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    {adminUsers.find(a => a.id === selectedAdmin)?.name.split(' ').map(n => n[0]).join('') || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{adminUsers.find(a => a.id === selectedAdmin)?.name}</p>
                  <p className="text-sm text-gray-500">{adminUsers.find(a => a.id === selectedAdmin)?.email}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No admin assigned</p>
            )}
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <CircleDollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Billing Information</h3>
              <p className="mt-1 text-sm text-blue-600">
                This office will be set up with the {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan. 
                Your subscription will be updated accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
