
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import BasicInformation from '@/components/users/UserCreationSteps/BasicInformation';
import PermissionConfiguration from '@/components/users/UserCreationSteps/PermissionConfiguration';
import DocumentManagement from '@/components/users/UserCreationSteps/DocumentManagement';
import PriceAgreement from '@/components/users/UserCreationSteps/PriceAgreement';
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

interface CustomerUserCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerUserCreationModal = ({ isOpen, onClose }: CustomerUserCreationModalProps) => {
  // Pre-selected client user type
  const userType: UserType = 'client';
  
  const [step, setStep] = useState(1); // Start at step 1 (Basic Information)
  const [userData, setUserData] = useState(initialUserData);
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const [documents, setDocuments] = useState<Array<{ name: string; file: File | null; required: boolean; status?: 'pending' | 'approved' | 'rejected' }>>([]);
  const [activeTab, setActiveTab] = useState('Basic Information');

  // Define steps - skipping the User Type selection
  const steps: Step[] = [
    { id: 1, name: 'Basic Information', description: 'Enter customer information' },
    { id: 2, name: 'Permissions', description: 'Configure customer permissions' },
    { id: 3, name: 'Documents', description: 'Manage required documents' },
    { id: 4, name: 'Price Agreement', description: 'Set up price agreement' }
  ];
  
  // Initialize documents for client type
  useEffect(() => {
    setDocuments([
      { name: 'Customer Agreement', file: null, required: true, status: 'pending' }
    ]);
  }, []);

  useEffect(() => {
    setStep(1);
    setUserData(initialUserData);
    setPermissions({});
  }, [isOpen]);
  
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
            Create New Customer
            {step <= steps.length && (
              <Badge variant="secondary" className="ml-2">
                Step {step} of {steps.length}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Complete the form to create a new customer in the system.
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
                    {s.name === 'Basic Information' && (
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
                  Create Customer
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

export default CustomerUserCreationModal;
