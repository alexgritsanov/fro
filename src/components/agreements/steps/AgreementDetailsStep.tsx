
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, FileText, Info } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import FormGroup from '@/components/FormGroup';

interface AgreementDetailsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const AgreementDetailsStep: React.FC<AgreementDetailsStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Agreement Information</h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter the basic details for this agreement
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="bg-blue-50 p-2 rounded-full mr-3">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Agreement Details</h3>
          </div>
          
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Agreement Title Field */}
              <FormGroup 
                label="Agreement Title" 
                htmlFor="title" 
                required={true}
                className="flex-1"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-gray-400 absolute right-2 top-[9px]" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter a descriptive title for this agreement</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Input
                  id="title"
                  placeholder="Enter agreement title"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  className="border-gray-300 focus:border-blue-500 h-10"
                  required
                />
              </FormGroup>
              
              {/* Agreement ID Field */}
              <FormGroup 
                label="Agreement ID" 
                htmlFor="agreementId"
                className="flex-1" 
              >
                <div className="relative">
                  <Input
                    id="agreementId"
                    placeholder="Auto-generated"
                    value={formData.agreementId || `AGR-${Math.floor(Math.random() * 10000)}`}
                    disabled
                    className="bg-gray-50 text-gray-600 font-mono h-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This ID is automatically generated</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </FormGroup>
            </div>
            
            {/* Description Field */}
            <FormGroup 
              label="Description" 
              htmlFor="description"
              className="flex-1"
            >
              <Textarea
                id="description"
                placeholder="Enter agreement description"
                className="min-h-[100px] border-gray-300 focus:border-blue-500 resize-none"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
              />
            </FormGroup>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Valid Until Field */}
              <FormGroup 
                label="Valid Until" 
                htmlFor="validUntil"
                required={true}
                className="flex-1"
                helperText="The agreement will expire after this date"
              >
                <DatePicker
                  date={formData.validUntil instanceof Date ? formData.validUntil : new Date(formData.validUntil)}
                  onSelect={(date) => updateFormData('validUntil', date)}
                  showCalendarByDefault={false}
                  minDate={new Date()}
                  className="w-full"
                />
              </FormGroup>
              
              {/* Effective From Field */}
              <FormGroup 
                label="Effective From" 
                htmlFor="startDate"
                className="flex-1"
                helperText="When this agreement becomes active"
              >
                <DatePicker
                  date={formData.startDate instanceof Date ? formData.startDate : new Date()}
                  onSelect={(date) => updateFormData('startDate', date)}
                  showCalendarByDefault={false}
                  className="w-full"
                />
              </FormGroup>
            </div>
          </div>
        </Card>
        
        <div className="flex justify-between pt-4">
          <div>{/* Empty div for spacing */}</div>
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:scale-105 transition-transform duration-300 gap-1"
          >
            Continue to Customer Details
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AgreementDetailsStep;
