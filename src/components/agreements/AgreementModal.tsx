
import React, { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, MessageSquare, ChevronRight, ChevronLeft, CheckCircle, Send } from 'lucide-react';
import DocumentChatButton from '@/components/documents/DocumentChatButton';
import { AnimatePresence, motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AgreementProgress from './AgreementProgress';
import AgreementDetailsStep from './steps/AgreementDetailsStep';
import CustomerDetailsStep from './steps/CustomerDetailsStep';
import AgreementPricingStep from './steps/AgreementPricingStep';
import AgreementTermsStep from './steps/AgreementTermsStep';
import AgreementPreviewStep from './steps/AgreementPreviewStep';
import AgreementShareStep from './steps/AgreementShareStep';
import { toast } from 'sonner';

interface AgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
  agreement?: any;
  customerId?: string;
  customerName?: string;
}

const AgreementModal = ({
  isOpen,
  onClose,
  isEditing = false,
  agreement,
  customerId,
  customerName
}: AgreementModalProps) => {
  const [activeTab, setActiveTab] = useState('details');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: agreement?.title || 'Concrete Pumping Services Agreement',
    description: agreement?.description || 'Standard price agreement for concrete pumping services',
    customer: customerId || agreement?.customer_id || '',
    customerName: customerName || agreement?.customerName || '',
    agreementId: agreement?.agreementId || `AGR-${Math.floor(Math.random() * 10000)}`,
    profile_data: agreement?.profile_data || {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: ''
    },
    company_data: agreement?.company_data || {
      company_name: '',
      vat_number: '',
      email: '',
      address: '',
      office_phone: '',
      company_type: 'business'
    },
    customerDetails: agreement?.customerDetails || {
      address: '',
      phone: '',
      email: '',
      contactPerson: '',
      taxId: ''
    },
    companyDetails: agreement?.companyDetails || {
      name: 'Unidoc Inc.',
      id: '123456789',
      phone: '+1 (555) 123-4567',
      email: 'contact@unidoc.com',
      address: '123 Main St, City, Country'
    },
    status: agreement?.status || 'draft',
    validUntil: agreement?.valid_until ? new Date(agreement.valid_until) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    pumpTypes: agreement?.pumpTypes || ["24M", "28M", "32M", "36M", "38M", "42M", "47M", "52M", "56M", "Up to 80"],
    pricingTiers: agreement?.pricingTiers || [{
      id: "tier-1",
      name: "Standard Rate",
      prices: [390, 420, 450, 490, 550, 610, 670, 790, 900, 1100]
    }, {
      id: "tier-2",
      name: "Mixed Concrete",
      prices: [410, 440, 470, 520, 580, 640, 700, 820, 940, 1200]
    }, {
      id: "tier-3",
      name: "Premium Rate",
      prices: [450, 480, 510, 560, 620, 680, 740, 860, 980, 1300]
    }],
    additionalServices: agreement?.additionalServices || [{
      id: 'svc-1',
      name: 'Concrete Supply Price',
      price: 500
    }, {
      id: 'svc-2',
      name: 'Minimum Order Value',
      price: 2000
    }],
    providerSignature: agreement?.providerSignature || null,
    customerSignature: agreement?.customerSignature || null,
    companyStamp: agreement?.companyStamp || null,
    terms: {
      conditions: agreement?.terms?.conditions || 'Standard concrete pumping service terms apply.',
      paymentConditions: agreement?.terms?.paymentConditions || 'Payment due within 30 days of invoice date.',
      additionalConditions: agreement?.terms?.additionalConditions || '',
      note: agreement?.terms?.note || ''
    }
  });

  const steps = ["Agreement Details", "Customer Details", "Pricing & Services", "Terms & Conditions", "Preview & Finalize", "Share Agreement"];
  const tabMapping = ["details", "customer", "pricing", "terms", "preview", "share"];
  const contentRef = useRef<HTMLDivElement>(null);

  const updateFormData = (field: string, value: any) => {
    if (field.includes('.')) {
      const parts = field.split('.');
      const parent = parts[0];
      const child = parts.slice(1).join('.');
      
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
      
      console.log('Updated nested field:', parent, child, value);
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
      
      console.log('Updated field:', field, value);
    }
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep + 1) {
      setCurrentStep(step);
      setActiveTab(tabMapping[step]);

      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setActiveTab(tabMapping[currentStep + 1]);

      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }

      const completedStep = steps[currentStep];
      toast.success(`${completedStep} completed`, {
        description: `Moving to ${steps[currentStep + 1]}`
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setActiveTab(tabMapping[currentStep - 1]);

      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  };

  const handleSave = () => {
    const finalStatus = currentStep === steps.length - 1 ? 'sent' : 'draft';
    updateFormData('status', finalStatus);
    
    // Add console logs to see what's being sent
    console.log('Saving Agreement Data:', {
      isEditing,
      formData,
      customerId,
      customerName,
      finalStatus,
      currentStep
    });
    
    toast.success(isEditing ? "Agreement updated successfully" : "Agreement created successfully", {
      description: `Price agreement for ${formData.customerName || 'customer'} has been ${isEditing ? 'updated' : 'created'}.`
    });
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setActiveTab('details');
    } else {
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop = 0;
        }
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveTab(tabMapping[currentStep]);
  }, [currentStep]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop = 0;
        }
      }, 50);
    }
  }, [isOpen, currentStep, activeTab]);

  return <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-full md:max-w-[95vw] lg:max-w-[90vw] p-0 flex flex-col max-h-screen overflow-hidden">
        <div className="p-4 sm:p-6 border-b flex flex-row items-center justify-between sticky top-0 bg-white z-10 shadow-sm">
          <div className="text-lg sm:text-xl font-bold text-blue-700 flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 hover:bg-blue-50" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            {isEditing ? 'Edit Agreement' : 'Create New Agreement'}
          </div>
          
          <div className="flex items-center gap-2">
            {isEditing && agreement?.id && customerId && <DocumentChatButton documentId={agreement.id} documentType="price-agreement" documentName={agreement.title || "Price Agreement"} customerId={customerId} customerName={customerName} variant="outline" size="sm" />}
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <AgreementProgress steps={steps} currentStep={currentStep} onStepClick={handleStepClick} isInteractive={true} />
        
        <div className="hidden sm:flex border-b">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            
          </Tabs>
        </div>
        
        <div className="flex-1 overflow-auto" ref={contentRef}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -10
          }} transition={{
            duration: 0.25
          }} className="h-full w-full max-w-[1400px] mx-auto">
              {activeTab === 'details' && <AgreementDetailsStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handlePrev} />}
              
              {activeTab === 'customer' && <CustomerDetailsStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handlePrev} />}
              
              {activeTab === 'pricing' && <AgreementPricingStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handlePrev} />}
              
              {activeTab === 'terms' && <AgreementTermsStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handlePrev} />}
              
              {activeTab === 'preview' && <AgreementPreviewStep formData={formData} updateFormData={updateFormData} isEditing={isEditing} onNext={handleNext} onBack={handlePrev} />}
              
              {activeTab === 'share' && <AgreementShareStep formData={formData} updateFormData={updateFormData} isEditing={isEditing} onNext={handleSave} onBack={handlePrev} />}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="border-t p-4 sm:p-6 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
          <div className="text-sm text-gray-500 hidden sm:block">
            {isEditing ? 'Editing agreement for ' : 'Creating new agreement for '} 
            <span className="font-medium">{formData.customerName || 'customer'}</span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {currentStep > 0 && <Button variant="outline" className="flex-1 sm:flex-initial group" onClick={handlePrev}>
                <ChevronLeft className="h-4 w-4 mr-1 group-hover:mr-2 transition-all duration-300" />
                Back
              </Button>}
            
            {currentStep < steps.length - 1 ? <Button className="bg-gradient-to-r from-blue-600 to-blue-500 flex-1 sm:flex-initial group hover:scale-105 transition-all duration-300" onClick={handleNext}>
                Next Step
                <ChevronRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all duration-300" />
              </Button> : <Button className="bg-gradient-to-r from-green-600 to-green-500 flex-1 sm:flex-initial hover:scale-105 transition-all duration-300" onClick={handleSave}>
                <CheckCircle className="h-4 w-4 mr-2" />
                {isEditing ? 'Save Changes' : 'Create Agreement'}
              </Button>}
          </div>
        </div>
      </SheetContent>
    </Sheet>;
};

export default AgreementModal;
