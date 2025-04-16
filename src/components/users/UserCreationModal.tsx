
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import UserTypeSelection from './UserCreationSteps/UserTypeSelection';
import BasicInformation from './UserCreationSteps/BasicInformation';
import PermissionConfiguration from './UserCreationSteps/PermissionConfiguration';
import DocumentManagement from './UserCreationSteps/DocumentManagement';
import PriceAgreement from './UserCreationSteps/PriceAgreement';
import { toast } from '@/components/ui/use-toast';

export type UserType = 'employee' | 'foreman' | 'subcontractor' | 'client' | 'office';

const initialUserData = {
  name: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  position: '',
  company: '',
  address: '',
  status: 'active',
  notes: '',
  nickname: '',
  officePhone: '',
  avatar: null,
  id: ''
};

type Step = {
  id: number;
  name: string;
  description?: string;
};

interface UserCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserCreationModal = ({ isOpen, onClose }: UserCreationModalProps) => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>('employee');
  const [userData, setUserData] = useState(initialUserData);
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const [documents, setDocuments] = useState<Array<{ name: string; file: File | null; required: boolean; status?: 'pending' | 'approved' | 'rejected' }>>([]);
  const [activeTab, setActiveTab] = useState('User Type');

  // Define steps based on user type
  const steps: Step[] = [
    { id: 1, name: 'User Type', description: 'Select user type' },
    { id: 2, name: 'Basic Information', description: 'Enter basic user information' },
    // Adding Permissions step for client and subcontractor as well
    ...(userType === 'employee' || userType === 'foreman' || userType === 'client' || userType === 'subcontractor' ? 
      [{ id: 3, name: 'Permissions', description: 'Configure user permissions' }] : []),
    // Adding documents step for employee, foreman, subcontractor, client
    ...(userType === 'employee' || userType === 'foreman' || userType === 'subcontractor' || userType === 'client' ? 
      [{ id: userType === 'client' || userType === 'subcontractor' ? 4 : 4, name: 'Documents', description: 'Manage required documents' }] : []),
    // Adding price agreement for client and subcontractor
    ...(userType === 'client' || userType === 'subcontractor' ? 
      [{ id: 5, name: 'Price Agreement', description: 'Set up price agreement' }] : [])
  ];
  
  // Reset data when userType changes
  useEffect(() => {
    // Initialize documents based on user type
    if (userType === 'client') {
      setDocuments([
        { name: 'Customer Agreement', file: null, required: true, status: 'pending' }
      ]);
    } else if (userType === 'employee' || userType === 'foreman') {
      setDocuments([
        { name: 'Employment Contract', file: null, required: true, status: 'pending' },
        { name: 'ID Document', file: null, required: true, status: 'pending' },
        { name: 'Certifications', file: null, required: false, status: 'pending' }
      ]);
    } else if (userType === 'subcontractor') {
      setDocuments([
        { name: 'Contractor Agreement', file: null, required: true, status: 'pending' },
        { name: 'Insurance Certificate', file: null, required: true, status: 'pending' },
        { name: 'Business License', file: null, required: true, status: 'pending' }
      ]);
    }
  }, [userType]);

  useEffect(() => {
    setStep(1);
    setUserData(initialUserData);
    setPermissions({});
  }, [userType, isOpen]);
  
  // Set active tab when step changes
  useEffect(() => {
    if (step <= steps.length && steps[step - 1]) {
      setActiveTab(steps[step - 1].name);
    }
  }, [step, steps]);
  
  const handleNextStep = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
  };
  
  const handleUserDataChange = (data: Partial<typeof initialUserData>) => {
    setUserData({ ...userData, ...data });
  };
  
  const handlePermissionChange = (permission: string, value: boolean) => {
    setPermissions({ ...permissions, [permission]: value });
  };
  
  const handleDocumentUpdate = (updatedDocuments: Array<{ name: string; file: File | null; required: boolean; status?: 'pending' | 'approved' | 'rejected' }>) => {
    setDocuments(updatedDocuments);
  };
  
  const handleSubmit = () => {
    // Validate required fields based on user type
    if (!userData.name || !userData.email || !userData.phone) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Process the data (e.g., send to server)
    console.log('User Type:', userType);
    console.log('User Data:', userData);
    console.log('Permissions:', permissions);
    console.log('Documents:', documents);
    
    // Close the modal
    onClose();
    
    // Reset the state
    setStep(1);
    setUserType('employee');
    setUserData(initialUserData);
    setPermissions({});
    setDocuments([]);
  };
  
  const progress = ((step - 1) / (steps.length - 1)) * 100;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Create New User
            {step <= steps.length && (
              <Badge variant="secondary" className="ml-2">
                Step {step} of {steps.length}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Complete the form to create a new user in the system.
          </DialogDescription>
        </DialogHeader>
        
        {step <= steps.length && (
          <>
            <div className="mb-4">
              <Progress value={progress} className="h-2" />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                {steps.map((s) => (
                  <TabsTrigger 
                    key={s.id} 
                    value={s.name} 
                    disabled={s.id > step}
                    className="flex items-center space-x-2"
                  >
                    {s.id < step && <Check className="h-4 w-4 text-green-500" />}
                    <span>{s.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <Separator className="my-4" />
            
              <div className="py-4">
                {steps.map((s) => (
                  <TabsContent key={s.id} value={s.name}>
                    {s.id === 1 && (
                      <UserTypeSelection 
                        selectedType={userType}
                        onSelect={handleUserTypeChange}
                      />
                    )}
                    {s.id === 2 && (
                      <BasicInformation 
                        userType={userType}
                        userData={userData}
                        onChange={handleUserDataChange}
                      />
                    )}
                    {s.name === 'Permissions' && (
                      <PermissionConfiguration 
                        userType={userType}
                        userPermissions={permissions}
                        onPermissionChange={handlePermissionChange}
                      />
                    )}
                    {s.name === 'Documents' && (
                      <DocumentManagement
                        userType={userType}
                        documents={documents}
                        onUpdateDocuments={handleDocumentUpdate}
                      />
                    )}
                    {s.name === 'Price Agreement' && (
                      <PriceAgreement
                        userData={userData}
                      />
                    )}
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </>
        )}
        
        <div className="flex justify-between">
          {step <= steps.length && (
            <>
              <Button 
                variant="outline"
                onClick={handlePrevStep}
                disabled={step === 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              {step < steps.length ? (
                <Button onClick={handleNextStep}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Create User
                </Button>
              )}
            </>
          )}
          
          {step > steps.length && (
            <Button onClick={onClose}>Close</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserCreationModal;
