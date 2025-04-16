
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  ArrowRight, 
  Building2, 
  Check, 
  CheckCircle2, 
  X
} from 'lucide-react';

import CompanyTypeStep from './CompanyTypeStep';
import CompanyInfoStep from './CompanyInfoStep';
import ContactPersonStep from './ContactPersonStep';
import UserLimitsStep from './UserLimitsStep';
import AdminAssignmentStep from './AdminAssignmentStep';
import ReviewStep from './ReviewStep';
import { OfficeFormData } from './types';

interface CreateOfficeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  agentId?: string;
  agentName?: string;
  agentRegion?: string;
}

const CreateOfficeModal = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  agentId,
  agentName,
  agentRegion
}: CreateOfficeModalProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  
  // Form state
  const [companyType, setCompanyType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [officePhone, setOfficePhone] = useState('');
  const [officeEmail, setOfficeEmail] = useState('');
  
  // Person Info Fields
  const [personFirstName, setPersonFirstName] = useState('');
  const [personLastName, setPersonLastName] = useState('');
  const [personEmail, setPersonEmail] = useState('');
  const [personPhone, setPersonPhone] = useState('');
  
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [activeTab, setActiveTab] = useState('plans');
  const [customLimits, setCustomLimits] = useState({
    total: 200,
    employee: 80,
    foreman: 20,
    subcontractor: 50,
    client: 50
  });
  
  const [selectedAdmin, setSelectedAdmin] = useState('');
  
  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
  
  useEffect(() => {
    if (agentId) {
      setSelectedAdmin(agentId);
    }
  }, [agentId]);
  
  useEffect(() => {
    if (agentRegion && officeAddress === '') {
      setOfficeAddress(`${agentRegion} District`);
    }
  }, [agentRegion, officeAddress]);
  
  const nextStep = () => {
    if (step === 1 && !companyType) {
      toast({
        title: "Required field missing",
        description: "Please select a company type",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2) {
      if (!companyName) {
        toast({
          title: "Required field missing",
          description: "Please enter the company name",
          variant: "destructive"
        });
        return;
      }
      if (!officeEmail) {
        toast({
          title: "Required field missing",
          description: "Please enter an office email",
          variant: "destructive"
        });
        return;
      }
    }

    if (step === 3) {
      if (!personFirstName || !personLastName || !personEmail) {
        toast({
          title: "Required fields missing",
          description: "Please enter first name, last name, and email for the contact person",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (step === 5 && !selectedAdmin) {
      toast({
        title: "Required field missing",
        description: "Please select an admin user",
        variant: "destructive"
      });
      return;
    }
    
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const goToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= totalSteps) {
      setStep(stepNumber);
    }
  };
  
  const formData: OfficeFormData = {
    companyType,
    companyName,
    companyId,
    officeAddress,
    officePhone,
    officeEmail,
    company_data: {
  company_name: companyName,
  vat_number: companyId,
  email: officeEmail,
  address: officeAddress,

  office_phone: officePhone,
  company_type: companyType
},
    
    profile_data: {
      first_name: personFirstName,
      last_name: personLastName,
      email: personEmail,
      phone_number: personPhone
    },
    selectedPlan,
    customLimits,
    selectedAdmin
  };
  
  const handleSubmit = async () => {
    console.log('Office Creation Form Data:', formData);

    try {
      const response = await fetch('https://unidoc-server-c4649a0d7e27.herokuapp.com/api/companies/create-with-owner-by-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to create office');
      }

      const data = await response.json();
      console.log('API Response:', data);

      toast({
        title: "Office created successfully",
        description: `${companyName} has been added to your offices`,
        variant: "success"
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (error) {
      console.error('Error creating office:', error);
      toast({
        title: "Failed to create office",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: "destructive"
      });
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <CompanyTypeStep companyType={companyType} setCompanyType={setCompanyType} />;
      case 2:
        return (
          <CompanyInfoStep
            companyName={companyName}
            setCompanyName={setCompanyName}
            companyId={companyId}
            setCompanyId={setCompanyId}
            officeAddress={officeAddress}
            setOfficeAddress={setOfficeAddress}
            officePhone={officePhone}
            setOfficePhone={setOfficePhone}
            officeEmail={officeEmail}
            setOfficeEmail={setOfficeEmail}
          />
        );
      case 3:
        return (
          <ContactPersonStep
            personFirstName={personFirstName}
            setPersonFirstName={setPersonFirstName}
            personLastName={personLastName}
            setPersonLastName={setPersonLastName}
            personEmail={personEmail}
            setPersonEmail={setPersonEmail}
            personPhone={personPhone}
            setPersonPhone={setPersonPhone}
          />
        );
      case 4:
        return (
          <UserLimitsStep
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            customLimits={customLimits}
            setCustomLimits={setCustomLimits}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      case 5:
        return (
          <AdminAssignmentStep
            selectedAdmin={selectedAdmin}
            setSelectedAdmin={setSelectedAdmin}
            agentId={agentId}
            agentName={agentName}
          />
        );
      case 6:
        return <ReviewStep formData={formData} goToStep={goToStep} />;
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1050px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2 mb-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            {agentName ? `Add Office for ${agentName}` : 'Add New Office'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center relative cursor-pointer group ${
                  index < step ? 'text-blue-600' : index === step - 1 ? 'text-blue-600' : 'text-gray-400'
                }`}
                onClick={() => index < step && goToStep(index + 1)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center 
                    ${index + 1 === step ? 'bg-blue-600 text-white shadow-lg transform scale-110 transition-all duration-500' : 
                      index + 1 < step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'} 
                    transition-all duration-300 z-10 group-hover:shadow-md`}
                >
                  {index + 1 < step ? <Check className="h-5 w-5" /> : index + 1}
                </div>
                <span className="text-xs mt-1 font-medium whitespace-nowrap">
                  {index === 0 ? 'Company Type' : 
                   index === 1 ? 'Company Info' : 
                   index === 2 ? 'Contact Person' :
                   index === 3 ? 'User Limits' : 
                   index === 4 ? 'Admin Assignment' : 'Review & Confirm'}
                </span>
              </div>
            ))}
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-gray-100 rounded-full overflow-hidden" 
            indicatorClassName={`bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700 ease-in-out`} 
          />
        </div>
        
        {renderStepContent()}
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={step === 1 ? onClose : prevStep}
            className="flex items-center"
          >
            {step === 1 ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </>
            )}
          </Button>
          
          <Button 
            onClick={nextStep}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm hover:shadow-md transition-all flex items-center"
          >
            {step === totalSteps ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Create Office
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOfficeModal;
