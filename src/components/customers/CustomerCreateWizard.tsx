import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, ChevronRight, Upload, AlertCircle, X, Trash, Plus, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import QuoteModal from './QuoteModal';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface CustomerCreateWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerCreateWizard = ({
  isOpen,
  onClose
}: CustomerCreateWizardProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [isCreatingQuote, setIsCreatingQuote] = useState(false);
  const [skipQuote, setSkipQuote] = useState(false);
  const [newCustomerId, setNewCustomerId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    companyName?: string;
    companyId?: string;
    email?: string;
    contactPhone?: string;
  }>({});

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    profile_data: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: ''
    },
    company_data: {
      company_name: '',
      vat_number: '',
      email: '',
      address: '',
      office_phone: '',
      company_type: 'concrete-pumping'
    },
    status: 'active',
    profileImage: null as File | null,
    imagePreview: null as string | null,
    priceAgreementFile: null as File | null,
    agreementFileName: ''
  });

  const updateFormData = (field: string, value: any) => {
    if (field.includes('.')) {
      const [section, key] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      updateFormData('profileImage', file);
      updateFormData('imagePreview', URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      updateFormData('priceAgreementFile', file);
      updateFormData('agreementFileName', file.name);
    }
  };

  const validateStep = (currentStep: number) => {
    const errors: {
      companyName?: string;
      companyId?: string;
      email?: string;
      contactPhone?: string;
    } = {};
    
    if (currentStep === 1) {
      if (!formData.company_data.company_name) {
        errors.companyName = 'Company name is required';
      }
    } else if (currentStep === 2) {
      if (!formData.profile_data.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.profile_data.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!formData.profile_data.phone_number) {
        errors.contactPhone = 'Contact number is required';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(step)) {
      toast.error("Please fill out all required fields", {
        description: "Some required fields are missing or invalid"
      });
      return;
    }
    if (step < totalSteps) {
      setStep(step + 1);
      setFormErrors({});
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setFormErrors({});
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `customer-avatars/${fileName}`;
      const {
        error: uploadError
      } = await supabase.storage.from('customer-assets').upload(filePath, file);
      if (uploadError) throw uploadError;
      return filePath;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const uploadDocument = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `price-agreements/${fileName}`;
      const {
        error: uploadError
      } = await supabase.storage.from('customer-documents').upload(filePath, file);
      if (uploadError) throw uploadError;
      return filePath;
    } catch (error) {
      console.error('Error uploading document:', error);
      return null;
    }
  };

  const createCustomer = async () => {
    try {
      if (!validateStep(step)) {
        toast.error("Please fill out all required fields", {
          description: "Some required fields are missing or invalid"
        });
        return;
      }
      
      let avatarUrl = null;
      if (formData.profileImage) {
        avatarUrl = await uploadImage(formData.profileImage);
      }
      
      let priceAgreementUrl = null;
      if (formData.priceAgreementFile) {
        priceAgreementUrl = await uploadDocument(formData.priceAgreementFile);
      }

      const newId = uuidv4();
      setNewCustomerId(newId);

      console.log("Sending data to backend:", {
        profile_data: formData.profile_data,
        company_data: formData.company_data
      });

      const newCustomer = {
        id: newId,
        name: formData.company_data.company_name,
        nickname: formData.company_data.company_name,
        office_email: formData.company_data.email,
        office_phone: formData.company_data.office_phone,
        address: formData.company_data.address,
        company_id: formData.company_data.vat_number || newId.substring(0, 8),
        status: formData.status,
        notes: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        company_data: formData.company_data,
        profile_data: formData.profile_data
      };

      const { data, error } = await supabase
        .from('companies')
        .insert(newCustomer)
        .select();

      if (error) throw error;

      const newUser = {
        id: uuidv4(),
        full_name: `${formData.profile_data.first_name} ${formData.profile_data.last_name}`,
        avatar_url: avatarUrl,
        phone: formData.profile_data.phone_number,
        position: 'Primary Contact',
        is_contact_person: true,
        company_id: newId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        email: formData.profile_data.email
      };

      const { error: userError } = await supabase
        .from('profiles')
        .insert(newUser);

      if (userError) throw userError;

      if (priceAgreementUrl) {
        const documentEntry = {
          customer_id: newId,
          name: formData.agreementFileName || 'Price Agreement',
          file_path: priceAgreementUrl,
          file_type: formData.priceAgreementFile?.type || 'application/pdf',
          size: formData.priceAgreementFile?.size || 0,
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { error: docError } = await supabase
          .from('customer_documents')
          .insert(documentEntry);

        if (docError) throw docError;
      }

      queryClient.invalidateQueries({
        queryKey: ['customers']
      });
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
      toast.success("Customer created successfully", {
        description: `${formData.company_data.company_name} has been added to your customer portfolio.`
      });

      setStep(totalSteps + 1);
    } catch (error: any) {
      console.error('Error creating customer:', error);
      toast.error("Error creating customer", {
        description: error.message || "An unexpected error occurred"
      });
    }
  };

  const handleCreateQuote = () => {
    setIsCreatingQuote(true);
  };
  
  const handleSkipQuote = () => {
    setSkipQuote(true);
    toast("Customer created without price agreement", {
      description: "You can create a price agreement for this customer later from the customer profile."
    });
    onClose();
  };
  
  const handleQuoteComplete = () => {
    setIsCreatingQuote(false);
    toast.success("Price agreement created successfully", {
      description: "The price agreement has been linked to the customer profile."
    });
    onClose();
  };
  
  const handleViewCustomer = () => {
    onClose();
    navigate(`/customers/${newCustomerId}`);
  };

  const progressPercentage = (step - 1) / (totalSteps - 1) * 100;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <span>Create New Customer</span>
            {step <= totalSteps && <Badge variant="outline" className="ml-2">
                Step {step} of {totalSteps}
              </Badge>}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-8 mt-2">
          <div className="flex justify-between mb-2">
            {Array.from({
            length: totalSteps
          }).map((_, index) => <div key={index} className={`flex flex-col items-center relative ${index < step ? 'text-unidoc-primary-blue' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 === step ? 'bg-unidoc-primary-blue text-white shadow-lg transform scale-110 transition-all duration-500' : index + 1 < step ? 'bg-unidoc-primary-blue text-white' : 'bg-gray-200 text-gray-500'} transition-all duration-300 z-10`}>
                  {index + 1 < step ? <Check className="h-5 w-5" /> : index + 1}
                </div>
                <span className="text-xs mt-1 font-medium">
                  {index === 0 ? 'Company' : index === 1 ? 'Contact' : 'Documents'}
                </span>
              </div>)}
          </div>
          <Progress value={progressPercentage} className="h-3 bg-gray-100 rounded-full overflow-hidden" indicatorClassName={`bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700 ease-in-out`} />
        </div>
        
        {step === 1 && <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="h-24 w-24 cursor-pointer border-2 border-gray-200" onClick={() => document.getElementById('avatar-upload')?.click()}>
                  {formData.imagePreview ? <AvatarImage src={formData.imagePreview} alt="Profile preview" /> : <AvatarFallback className="bg-gray-100 text-gray-400 text-lg">
                      {formData.company_data.company_name ? formData.company_data.company_name.charAt(0).toUpperCase() : 'C'}
                    </AvatarFallback>}
                </Avatar>
                <input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white shadow" onClick={() => document.getElementById('avatar-upload')?.click()}>
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
                    Full Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="companyName" 
                    value={formData.company_data.company_name} 
                    onChange={e => updateFormData('company_data.company_name', e.target.value)} 
                    placeholder="Enter company name" 
                    className={`w-full pt-1 ${formErrors.companyName ? 'border-red-500' : ''}`} 
                  />
                  {formErrors.companyName && <p className="text-sm text-red-500">{formErrors.companyName}</p>}
                </div>
                
                <div className="relative space-y-2">
                  <Label htmlFor="nickname" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
                    Customer Nickname
                  </Label>
                  <Input 
                    id="nickname" 
                    value={formData.company_data.company_name} 
                    onChange={e => updateFormData('company_data.company_name', e.target.value)} 
                    placeholder="Enter a nickname for quick reference" 
                    className="w-full pt-1" 
                  />
                </div>

                <div className="relative space-y-2">
                  <Label htmlFor="companyId" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
                    Company ID
                  </Label>
                  <Input 
                    id="companyId" 
                    value={formData.company_data.vat_number} 
                    onChange={e => updateFormData('company_data.vat_number', e.target.value)} 
                    placeholder="Enter company ID" 
                    className={`w-full pt-1 ${formErrors.companyId ? 'border-red-500' : ''}`} 
                  />
                  {formErrors.companyId && <p className="text-sm text-red-500">{formErrors.companyId}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative space-y-2">
                  <Label htmlFor="customerType" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
                    Customer Type
                  </Label>
                  <Select 
                    value={formData.company_data.company_type} 
                    onValueChange={value => updateFormData('company_data.company_type', value)}
                  >
                    <SelectTrigger id="customerType" className="pt-1">
                      <SelectValue placeholder="Select customer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concrete-pumping">Concrete Pumping</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="relative space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
                    Status
                  </Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={value => updateFormData('status', value)}
                  >
                    <SelectTrigger id="status" className="pt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="prospect">Prospect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>}
        
        {step === 2 && <div className="space-y-4">
            <div className="relative space-y-2">
              <Label htmlFor="contactName" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
                Contact Person Name
              </Label>
              <Input 
                id="contactName" 
                value={`${formData.profile_data.first_name} ${formData.profile_data.last_name}`} 
                onChange={e => {
                  const parts = e.target.value.split(' ');
                  const firstName = parts[0] || '';
                  const lastName = parts.slice(1).join(' ') || '';
                  updateFormData('profile_data.first_name', firstName);
                  updateFormData('profile_data.last_name', lastName);
                }} 
                placeholder="Enter primary contact name" 
                className="w-full pt-1" 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative space-y-2">
                <Label htmlFor="contactPhone" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
                  Contact Number <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="contactPhone" 
                  value={formData.profile_data.phone_number} 
                  onChange={e => updateFormData('profile_data.phone_number', e.target.value)} 
                  placeholder="Enter contact phone number" 
                  className={`w-full pt-1 ${formErrors.contactPhone ? 'border-red-500' : ''}`} 
                />
                {formErrors.contactPhone && <p className="text-sm text-red-500">{formErrors.contactPhone}</p>}
              </div>
              
              <div className="relative space-y-2">
                <Label htmlFor="officePhone" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
                  Office Number
                </Label>
                <Input 
                  id="officePhone" 
                  value={formData.company_data.office_phone} 
                  onChange={e => updateFormData('company_data.office_phone', e.target.value)} 
                  placeholder="Enter office phone number" 
                  className="w-full pt-1" 
                />
              </div>
            </div>
            
            <div className="relative space-y-2">
              <Label htmlFor="email" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.profile_data.email} 
                onChange={e => updateFormData('profile_data.email', e.target.value)} 
                placeholder="Enter email address" 
                className={`w-full pt-1 ${formErrors.email ? 'border-red-500' : ''}`} 
              />
              {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
            </div>
            
            <div className="relative space-y-2">
              <Label htmlFor="address" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">
                Office Address
              </Label>
              <Input 
                id="address" 
                value={formData.company_data.address} 
                onChange={e => updateFormData('company_data.address', e.target.value)} 
                placeholder="Enter primary address" 
                className="w-full pt-1" 
              />
            </div>
          </div>}
        
        {step === 3 && <div className="space-y-4">
            <div className="relative space-y-2">
              
              
            </div>
            
            <div className="relative space-y-2">
              <Label htmlFor="priceAgreement" className="text-sm font-medium inline-block bg-white px-1 -ml-1 absolute -top-2 left-3 z-10">Copy Of Price Agreement Document</Label>
              <div className="border rounded-md p-4 bg-gray-50">
                {formData.agreementFileName ? <div className="flex items-center justify-between">
                    <span className="text-sm truncate max-w-[80%]">{formData.agreementFileName}</span>
                    <Button variant="ghost" size="icon" onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  priceAgreementFile: null,
                  agreementFileName: ''
                }));
              }}>
                      <Trash size={16} className="text-red-500" />
                    </Button>
                  </div> : <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="h-12 w-12 text-gray-300 mb-2" />
                    <div className="text-sm text-gray-500 mb-2">Drag and drop or click to upload</div>
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('agreement-upload')?.click()}>
                      Choose File
                    </Button>
                  </div>}
                <input id="agreement-upload" type="file" className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={handleFileChange} />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                You can attach a copy of the signed written quote for reference and documentation purposes.
              </p>
            </div>
            
            <Alert className="bg-blue-50 border-blue-200 cursor-pointer" onClick={handleCreateQuote}>
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Create a Price Agreement</AlertTitle>
              <AlertDescription className="text-blue-600">
                After creating this customer, you'll have an option to create a price agreement for them. 
                You can attach a signed copy of the written quote for your records.
              </AlertDescription>
            </Alert>
          </div>}
        
        {step > totalSteps && !isCreatingQuote && <div className="space-y-6 py-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">Customer Created Successfully</h3>
              <p className="text-gray-500 text-sm">
                {formData.company_data.company_name} has been added to your customer portfolio.
              </p>
            </div>
            
            <Alert className="bg-amber-50 border-amber-200 cursor-pointer" onClick={handleCreateQuote}>
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">Create a Price Agreement</AlertTitle>
              <AlertDescription className="text-amber-600 flex items-center justify-between">
                <span>Would you like to create a price agreement for this customer now?</span>
                <Button variant="outline" size="sm" className="ml-2 bg-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Agreement
                </Button>
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleSkipQuote}>
                Skip for Now
              </Button>
              <Button onClick={handleCreateQuote} className="bg-unidoc-primary-blue hover:bg-unidoc-primary-blue/90">
                Create Price Agreement
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-center">
              <Button variant="link" onClick={handleViewCustomer} className="flex items-center text-unidoc-primary-blue">
                <FileText className="mr-1 h-4 w-4" />
                View Customer Profile
              </Button>
            </div>
          </div>}
        
        {isCreatingQuote && newCustomerId && <QuoteModal isOpen={isCreatingQuote} onClose={() => {
        setIsCreatingQuote(false);
        onClose();
      }} onComplete={handleQuoteComplete} customerId={newCustomerId} fromCustomerCreation={true} />}
        
        <DialogFooter className="flex justify-between items-center">
          {step <= totalSteps && <>
              {step > 1 && <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>}
              
              <div className="ml-auto">
                <Button variant="outline" onClick={onClose} className="mr-2">
                  Cancel
                </Button>
                
                {step < totalSteps ? <Button onClick={nextStep} className="bg-unidoc-primary-blue hover:bg-unidoc-primary-blue/90">
                    Continue
                  </Button> : <Button onClick={createCustomer} className="bg-unidoc-primary-blue hover:bg-unidoc-primary-blue/90">
                    Create Customer
                  </Button>}
              </div>
            </>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerCreateWizard;
