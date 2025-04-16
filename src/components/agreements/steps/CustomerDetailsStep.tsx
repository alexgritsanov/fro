
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Building2, User, Phone, Mail, MapPin } from 'lucide-react';
import FormGroup from '@/components/FormGroup';

interface CustomerDetailsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const CustomerDetailsStep: React.FC<CustomerDetailsStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack
}) => {
  // Initialize nested structure if not exists
  React.useEffect(() => {
    if (!formData.profile_data) {
      updateFormData('profile_data', {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
      });
    }
    
    if (!formData.company_data) {
      updateFormData('company_data', {
        company_name: '',
        vat_number: '',
        email: '',
        address: '',
        office_phone: '',
        company_type: 'business'
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Customer Information</h1>
          <p className="text-sm text-gray-500 mt-1">
            Provide details about the customer for this agreement
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="bg-blue-50 p-2 rounded-full mr-3">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Company Details</h3>
          </div>
          
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Company Name Field */}
              <FormGroup
                label="Company Name"
                htmlFor="companyName"
                required={true}
                className="flex-1"
              >
                <Input
                  id="companyName"
                  placeholder="Enter customer company name"
                  value={formData.company_data?.company_name || ''}
                  onChange={(e) => updateFormData('company_data.company_name', e.target.value)}
                  className="border-gray-300 focus:border-blue-500 h-10"
                  required
                />
              </FormGroup>
              
              {/* Company ID/Tax Number Field */}
              <FormGroup
                label="VAT Number"
                htmlFor="vatNumber"
                className="flex-1"
              >
                <Input
                  id="vatNumber"
                  placeholder="Enter VAT or company registration number"
                  value={formData.company_data?.vat_number || ''}
                  onChange={(e) => updateFormData('company_data.vat_number', e.target.value)}
                  className="border-gray-300 focus:border-blue-500 h-10"
                />
              </FormGroup>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Contact Person Field */}
              <FormGroup
                label="Contact Person First Name"
                htmlFor="firstName"
                className="flex-1"
              >
                <div className="relative">
                  <User className="h-3.5 w-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={formData.profile_data?.first_name || ''}
                    onChange={(e) => updateFormData('profile_data.first_name', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 h-10 pl-9"
                  />
                </div>
              </FormGroup>
              
              <FormGroup
                label="Contact Person Last Name"
                htmlFor="lastName"
                className="flex-1"
              >
                <div className="relative">
                  <User className="h-3.5 w-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={formData.profile_data?.last_name || ''}
                    onChange={(e) => updateFormData('profile_data.last_name', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 h-10 pl-9"
                  />
                </div>
              </FormGroup>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Phone Number Field */}
              <FormGroup
                label="Contact Phone Number"
                htmlFor="contactPhone"
                className="flex-1"
              >
                <div className="relative">
                  <Phone className="h-3.5 w-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="contactPhone"
                    placeholder="Enter contact phone number"
                    value={formData.profile_data?.phone_number || ''}
                    onChange={(e) => updateFormData('profile_data.phone_number', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 h-10 pl-9"
                  />
                </div>
              </FormGroup>
              
              {/* Office Phone Field */}
              <FormGroup
                label="Office Phone"
                htmlFor="officePhone"
                className="flex-1"
              >
                <div className="relative">
                  <Phone className="h-3.5 w-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="officePhone"
                    placeholder="Enter office phone number"
                    value={formData.company_data?.office_phone || ''}
                    onChange={(e) => updateFormData('company_data.office_phone', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 h-10 pl-9"
                  />
                </div>
              </FormGroup>
            </div>
            
            {/* Email Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormGroup
                label="Contact Email"
                htmlFor="contactEmail"
                className="flex-1"
              >
                <div className="relative">
                  <Mail className="h-3.5 w-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="contactEmail"
                    placeholder="Enter contact email address"
                    type="email"
                    value={formData.profile_data?.email || ''}
                    onChange={(e) => updateFormData('profile_data.email', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 h-10 pl-9"
                  />
                </div>
              </FormGroup>
              
              <FormGroup
                label="Company Email"
                htmlFor="companyEmail"
                className="flex-1"
              >
                <div className="relative">
                  <Mail className="h-3.5 w-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="companyEmail"
                    placeholder="Enter company email address"
                    type="email"
                    value={formData.company_data?.email || ''}
                    onChange={(e) => updateFormData('company_data.email', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 h-10 pl-9"
                  />
                </div>
              </FormGroup>
            </div>
            
            {/* Address Field */}
            <FormGroup
              label="Company Address"
              htmlFor="address"
              className="flex-1"
            >
              <div className="relative">
                <MapPin className="h-3.5 w-3.5 text-gray-500 absolute left-3 top-3" />
                <Textarea
                  id="address"
                  placeholder="Enter company address"
                  value={formData.company_data?.address || ''}
                  onChange={(e) => updateFormData('company_data.address', e.target.value)}
                  className="border-gray-300 focus:border-blue-500 min-h-[80px] resize-none pl-9"
                />
              </div>
            </FormGroup>
          </div>
        </Card>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button"
            variant="outline" 
            onClick={onBack}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Agreement Details
          </Button>
          
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:scale-105 transition-transform duration-300 gap-1"
          >
            Continue to Pricing
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerDetailsStep;
