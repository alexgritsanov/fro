import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, FileText, CreditCard, Info, AlignLeft, Check, Plus, Edit, Trash2, Save, EllipsisVertical, Star } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FormGroup from '@/components/FormGroup';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import ActionMenu from '@/components/ActionMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface TemplateItem {
  id: string;
  name: string;
  content: string;
  isDefault?: boolean;
}

interface AgreementTermsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const AgreementTermsStep: React.FC<AgreementTermsStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack
}) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>('general');
  const [selectedGeneralTemplates, setSelectedGeneralTemplates] = useState<string[]>(['custom']);
  const [selectedPaymentTemplates, setSelectedPaymentTemplates] = useState<string[]>(['custom', 'vat']);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [templateType, setTemplateType] = useState<'general' | 'payment'>('general');
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');
  const [editingTemplate, setEditingTemplate] = useState<TemplateItem | null>(null);
  
  const [generalTemplates, setGeneralTemplates] = useState<TemplateItem[]>([
    {
      id: 'standard',
      name: 'Standard Terms',
      content: 'Standard concrete pumping service terms apply. The customer agrees to the terms of service outlined in this agreement. All services are subject to availability and weather conditions. The provider reserves the right to cancel or reschedule services due to unsafe conditions.',
      isDefault: true
    }, 
    {
      id: 'detailed',
      name: 'Detailed Terms',
      content: 'This agreement outlines the terms and conditions for concrete pumping services. The customer acknowledges and agrees to all terms specified herein. Services will be provided as scheduled, subject to weather conditions, site accessibility, and equipment availability. The provider may cancel or reschedule services if conditions are deemed unsafe or unsuitable. The customer is responsible for ensuring adequate access to the work site and obtaining any necessary permits.'
    }, 
    {
      id: 'simple',
      name: 'Simple Terms',
      content: 'Basic service terms apply. Services subject to weather and site conditions. 24-hour cancellation required.'
    }, 
    {
      id: 'custom',
      name: 'Custom Terms',
      content: formData.terms?.conditions || ''
    }
  ]);
  
  const [paymentTemplates, setPaymentTemplates] = useState<TemplateItem[]>([
    {
      id: 'net30',
      name: 'Net 30 Days',
      content: 'Payment is due within 30 days of invoice date. Late payments will incur a 2% fee per month.',
      isDefault: true
    }, 
    {
      id: 'net60',
      name: 'Net 60 Days',
      content: 'Payment is due within 60 days of invoice date. Late payments will incur a 1.5% fee per month.'
    }, 
    {
      id: 'net90',
      name: 'Net 90 Days',
      content: 'Payment is due within 90 days of invoice date. Late payments will incur a 1% fee per month.'
    }, 
    {
      id: 'advance',
      name: 'Payment in Advance',
      content: 'Full payment is required before services are rendered. Cancellations with less than 48 hours notice may incur a 25% fee.'
    },
    {
      id: 'vat',
      name: 'Prices Exclude VAT',
      content: 'All prices specified in this agreement do not include VAT, which will be charged at the applicable rate on the invoice.',
      isDefault: true
    },
    {
      id: 'custom',
      name: 'Custom Payment Terms',
      content: formData.terms?.paymentConditions || ''
    }
  ]);
  
  useEffect(() => {
    const defaultGeneralTemplates = generalTemplates
      .filter(template => template.isDefault)
      .map(template => template.id);
      
    const defaultPaymentTemplates = paymentTemplates
      .filter(template => template.isDefault)
      .map(template => template.id);
    
    if (defaultGeneralTemplates.length > 0) {
      setSelectedGeneralTemplates(prev => 
        Array.from(new Set([...prev, ...defaultGeneralTemplates]))
      );
    }
    
    if (defaultPaymentTemplates.length > 0) {
      setSelectedPaymentTemplates(prev => 
        Array.from(new Set([...prev, ...defaultPaymentTemplates]))
      );
    }
    
    updateCombinedContent();
  }, []);
  
  const updateCombinedContent = () => {
    let combinedGeneralContent = '';
    selectedGeneralTemplates.forEach(templateId => {
      const template = generalTemplates.find(t => t.id === templateId);
      if (template && template.id !== 'custom') {
        combinedGeneralContent += template.content + '\n\n';
      }
    });
    
    if (selectedGeneralTemplates.includes('custom')) {
      if (formData.terms?.conditions && formData.terms.conditions !== combinedGeneralContent.trim()) {
      } else {
        updateFormData('terms.conditions', combinedGeneralContent.trim());
      }
    } else {
      updateFormData('terms.conditions', combinedGeneralContent.trim());
    }
    
    let combinedPaymentContent = '';
    selectedPaymentTemplates.forEach(templateId => {
      const template = paymentTemplates.find(t => t.id === templateId);
      if (template && template.id !== 'custom') {
        combinedPaymentContent += template.content + '\n\n';
      }
    });
    
    if (selectedPaymentTemplates.includes('custom')) {
      if (formData.terms?.paymentConditions && formData.terms.paymentConditions !== combinedPaymentContent.trim()) {
      } else {
        updateFormData('terms.paymentConditions', combinedPaymentContent.trim());
      }
    } else {
      updateFormData('terms.paymentConditions', combinedPaymentContent.trim());
    }
  };
  
  const handleTemplateToggle = (templateId: string, templateType: 'general' | 'payment') => {
    if (templateType === 'general') {
      if (selectedGeneralTemplates.includes(templateId)) {
        if (selectedGeneralTemplates.length > 1) {
          setSelectedGeneralTemplates(selectedGeneralTemplates.filter(id => id !== templateId));
        }
      } else {
        setSelectedGeneralTemplates([...selectedGeneralTemplates, templateId]);
      }
    } else {
      if (selectedPaymentTemplates.includes(templateId)) {
        if (selectedPaymentTemplates.length > 1) {
          setSelectedPaymentTemplates(selectedPaymentTemplates.filter(id => id !== templateId));
        }
      } else {
        setSelectedPaymentTemplates([...selectedPaymentTemplates, templateId]);
      }
    }
    
    setTimeout(updateCombinedContent, 0);
  };
  
  const handleCustomTermsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData('terms.conditions', e.target.value);
  };
  
  const handleCustomPaymentTermsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData('terms.paymentConditions', e.target.value);
  };
  
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData('terms.note', e.target.value);
  };
  
  const openCreateTemplateDialog = (type: 'general' | 'payment') => {
    setTemplateType(type);
    setNewTemplateName('');
    setNewTemplateContent(type === 'general' ? formData.terms?.conditions || '' : formData.terms?.paymentConditions || '');
    setEditingTemplate(null);
    setShowTemplateDialog(true);
  };
  
  const openEditTemplateDialog = (template: TemplateItem, type: 'general' | 'payment') => {
    setTemplateType(type);
    setEditingTemplate(template);
    setNewTemplateName(template.name);
    setNewTemplateContent(template.content);
    setShowTemplateDialog(true);
  };
  
  const handleSaveTemplate = () => {
    if (!newTemplateName.trim()) {
      toast.error("Template name is required");
      return;
    }
    
    const newTemplate: TemplateItem = {
      id: editingTemplate ? editingTemplate.id : `template-${Date.now()}`,
      name: newTemplateName,
      content: newTemplateContent,
      isDefault: editingTemplate?.isDefault || false
    };
    
    if (templateType === 'general') {
      if (editingTemplate) {
        setGeneralTemplates(generalTemplates.map(t => t.id === editingTemplate.id ? newTemplate : t));
      } else {
        setGeneralTemplates([...generalTemplates.filter(t => t.id !== 'custom'), newTemplate, generalTemplates.find(t => t.id === 'custom')!]);
      }
    } else {
      if (editingTemplate) {
        setPaymentTemplates(paymentTemplates.map(t => t.id === editingTemplate.id ? newTemplate : t));
      } else {
        setPaymentTemplates([...paymentTemplates.filter(t => t.id !== 'custom'), newTemplate, paymentTemplates.find(t => t.id === 'custom')!]);
      }
    }
    
    toast.success(editingTemplate ? "Template updated successfully" : "New template created successfully");
    setShowTemplateDialog(false);
  };
  
  const handleDeleteTemplate = (templateId: string, templateType: 'general' | 'payment') => {
    if (confirm("Are you sure you want to delete this template?")) {
      if (templateType === 'general') {
        setGeneralTemplates(generalTemplates.filter(t => t.id !== templateId));
        if (selectedGeneralTemplates.includes(templateId)) {
          setSelectedGeneralTemplates(selectedGeneralTemplates.filter(id => id !== templateId));
        }
      } else {
        setPaymentTemplates(paymentTemplates.filter(t => t.id !== templateId));
        if (selectedPaymentTemplates.includes(templateId)) {
          setSelectedPaymentTemplates(selectedPaymentTemplates.filter(id => id !== templateId));
        }
      }
      toast.success("Template deleted successfully");
    }
  };

  const handleToggleDefaultTemplate = (template: TemplateItem, type: 'general' | 'payment') => {
    const newIsDefault = !template.isDefault;
    
    if (type === 'general') {
      setGeneralTemplates(generalTemplates.map(t => 
        t.id === template.id 
          ? { ...t, isDefault: newIsDefault } 
          : t
      ));
      
      if (newIsDefault && !selectedGeneralTemplates.includes(template.id)) {
        setSelectedGeneralTemplates(prev => [...prev, template.id]);
      }
    } else {
      setPaymentTemplates(paymentTemplates.map(t => 
        t.id === template.id 
          ? { ...t, isDefault: newIsDefault } 
          : t
      ));
      
      if (newIsDefault && !selectedPaymentTemplates.includes(template.id)) {
        setSelectedPaymentTemplates(prev => [...prev, template.id]);
      }
    }
    
    toast.success(newIsDefault 
      ? `${template.name} set as default template` 
      : `${template.name} removed from default templates`
    );
    
    setTimeout(updateCombinedContent, 0);
  };
  
  const renderTemplateItem = (template: TemplateItem, type: 'general' | 'payment') => {
    const isSelected = type === 'general' 
      ? selectedGeneralTemplates.includes(template.id)
      : selectedPaymentTemplates.includes(template.id);
    
    const isCustomTemplate = template.id === 'custom';
    const isProtectedTemplate = template.id === 'vat' || template.id === 'custom';
    
    return (
      <div 
        key={template.id} 
        className={`relative border rounded-lg p-3 transition-all duration-200 ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => handleTemplateToggle(template.id, type)}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start flex-1 min-w-0">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={() => handleTemplateToggle(template.id, type)}
              className="mr-2 mt-1 flex-shrink-0"
              id={`template-${template.id}`}
            />
            <label 
              htmlFor={`template-${template.id}`} 
              className="font-medium cursor-pointer flex-1 min-w-0 flex flex-wrap items-center gap-x-2"
              onClick={(e) => e.preventDefault()}
            >
              <span className="truncate">{template.name}</span>
              {template.isDefault && (
                <span className="inline-flex items-center px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full whitespace-nowrap flex-shrink-0">
                  <Star className="h-3 w-3 mr-0.5 fill-blue-500 text-blue-500" />
                  Default
                </span>
              )}
            </label>
          </div>
          
          <div className="flex items-center flex-shrink-0 ml-1">
            {!isCustomTemplate && (
              <ActionMenu
                iconOnly={true}
                triggerClassName="h-7 w-7"
                side="right"
                actions={[
                  {
                    label: "Edit Template",
                    icon: <Edit className="h-4 w-4 mr-2" />,
                    onClick: () => openEditTemplateDialog(template, type)
                  },
                  {
                    label: template.isDefault ? "Remove Default" : "Set as Default",
                    icon: <Star className={cn("h-4 w-4 mr-2", template.isDefault && "fill-blue-500 text-blue-500")} />,
                    onClick: () => handleToggleDefaultTemplate(template, type)
                  },
                  ...(isProtectedTemplate ? [] : [
                    {
                      label: "Delete Template",
                      icon: <Trash2 className="h-4 w-4 mr-2" />,
                      variant: "destructive" as "destructive",
                      onClick: () => handleDeleteTemplate(template.id, type)
                    }
                  ])
                ]}
              />
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 ml-6">
          {template.id !== 'custom' ? template.content : 'Custom terms and conditions'}
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Terms & Conditions</h1>
          <p className="text-sm text-gray-500 mt-1">
            Define the terms and conditions for this agreement
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium">General Terms & Conditions</h3>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openCreateTemplateDialog('general')} 
              className="text-blue-600 border-blue-200 hover:bg-blue-50" 
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Template
            </Button>
          </div>
          
          <Separator className="mb-4" />
          
          <div className="space-y-4">
            <Label className="text-base flex items-center justify-between flex-wrap">
              <span>Select Terms Templates</span>
              <span className="text-xs text-gray-500">You can select multiple templates</span>
            </Label>
            <div className={`grid grid-cols-1 ${isMobile ? "" : "sm:grid-cols-2"} gap-3`}>
              {generalTemplates.map(template => renderTemplateItem(template, 'general'))}
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="conditions" className="text-base">Terms Content</Label>
            <Textarea 
              id="conditions" 
              value={formData.terms?.conditions || ''} 
              onChange={handleCustomTermsChange} 
              placeholder="Enter general terms and conditions" 
              className="min-h-[200px] border-gray-300 resize-y" 
            />
            <p className="text-sm text-gray-500">
              {!selectedGeneralTemplates.includes('custom') ? 
                "Using predefined templates. Select 'Custom Terms' to add your own." : 
                "Customize your terms and conditions."
              }
            </p>
          </div>
        </Card>
        
        <Card className="p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium">Payment Terms</h3>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openCreateTemplateDialog('payment')} 
              className="text-blue-600 border-blue-200 hover:bg-blue-50" 
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Template
            </Button>
          </div>
          
          <Separator className="mb-4" />
          
          <div className="space-y-4">
            <Label className="text-base flex items-center justify-between flex-wrap">
              <span>Select Payment Terms</span>
              <span className="text-xs text-gray-500">You can select multiple templates</span>
            </Label>
            <div className={`grid grid-cols-1 ${isMobile ? "" : "sm:grid-cols-2"} gap-3`}>
              {paymentTemplates.map(template => renderTemplateItem(template, 'payment'))}
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="paymentConditions" className="text-base">Payment Terms Content</Label>
            <Textarea 
              id="paymentConditions" 
              value={formData.terms?.paymentConditions || ''} 
              onChange={handleCustomPaymentTermsChange} 
              placeholder="Enter payment terms and conditions" 
              className="min-h-[150px] border-gray-300 resize-y" 
            />
            <p className="text-sm text-gray-500">
              {!selectedPaymentTemplates.includes('custom') ? 
                "Using predefined templates. Select 'Custom Payment Terms' to add your own." : 
                "Customize your payment terms."
              }
            </p>
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="note" className="text-base flex items-center">
              <Info className="h-4 w-4 mr-1 text-gray-500" />
              Additional Notes
            </Label>
            <Textarea 
              id="note" 
              value={formData.terms?.note || ''} 
              onChange={handleNoteChange} 
              placeholder="Enter any additional notes or special conditions" 
              className="min-h-[80px] border-gray-300 resize-y" 
            />
          </div>
        </Card>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ChevronLeft className="mr-2 h-4 w-4" />
          <span className={isMobile ? "sr-only" : ""}>Back</span>
        </Button>
        <Button onClick={onNext} className="bg-gradient-to-r from-blue-600 to-blue-500 flex items-center">
          <span className={isMobile ? "sr-only" : ""}>Continue</span>
          <ChevronRight className={cn("h-4 w-4", isMobile ? "" : "ml-2")} />
        </Button>
      </div>
      
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingTemplate ? 'Edit Template' : 'Create New Template'}
            </DialogTitle>
            <DialogDescription>
              {editingTemplate 
                ? 'Update the template name and content below.'
                : 'Fill in the details to create a new template that you can reuse in future agreements.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="templateName" className="text-base">Template Name</Label>
              <Input
                id="templateName"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                placeholder="Enter a name for this template"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="templateContent" className="text-base">Template Content</Label>
              <Textarea
                id="templateContent"
                value={newTemplateContent}
                onChange={(e) => setNewTemplateContent(e.target.value)}
                placeholder="Enter the content for this template"
                className="min-h-[150px] resize-y"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="defaultTemplate"
                checked={editingTemplate?.isDefault || false}
                onCheckedChange={(checked) => {
                  if (editingTemplate) {
                    setEditingTemplate({...editingTemplate, isDefault: !!checked});
                  }
                }}
              />
              <label
                htmlFor="defaultTemplate"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Set as default template
              </label>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowTemplateDialog(false)} className="sm:order-1 order-2 sm:flex-none flex-1">
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate} className="bg-gradient-to-r from-blue-600 to-blue-500 sm:order-2 order-1 sm:flex-none flex-1">
              <Save className="h-4 w-4 mr-2" />
              {editingTemplate ? 'Update Template' : 'Save Template'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgreementTermsStep;
