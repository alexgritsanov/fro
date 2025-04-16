
import React, { useState } from 'react';
import { X, Plus, Minus, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface CompensationPlan {
  id?: string;
  name: string;
  description: string;
  baseCommission: number;
  retainerPercent: number;
  revenueThreshold: number;
  features: string[];
  color: string;
}

interface CompensationPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: CompensationPlan;
  onSave: (plan: CompensationPlan) => void;
}

const CompensationPlanDialog = ({ isOpen, onClose, plan, onSave }: CompensationPlanDialogProps) => {
  const isEditing = !!plan?.id;
  
  const [formData, setFormData] = useState<CompensationPlan>(
    plan || {
      name: '',
      description: '',
      baseCommission: 0,
      retainerPercent: 0,
      revenueThreshold: 0,
      features: [''],
      color: 'bg-blue-50 border-blue-200',
    }
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value)
    });
  };
  
  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };
  
  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };
  
  const removeFeature = (index: number) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };
  
  const handleSubmit = () => {
    // Filter out empty features
    const cleanedFeatures = formData.features.filter(f => f.trim() !== '');
    const cleanedData = {
      ...formData,
      features: cleanedFeatures
    };
    
    onSave(cleanedData);
    onClose();
  };
  
  const handleColorSelect = (color: string) => {
    setFormData({
      ...formData,
      color
    });
  };
  
  const colorOptions = [
    { name: 'Blue', value: 'bg-blue-50 border-blue-200' },
    { name: 'Green', value: 'bg-green-50 border-green-200' },
    { name: 'Purple', value: 'bg-purple-50 border-purple-200' },
    { name: 'Amber', value: 'bg-amber-50 border-amber-200' },
    { name: 'Red', value: 'bg-red-50 border-red-200' },
    { name: 'Gray', value: 'bg-gray-50 border-gray-200' },
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="mb-4">
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl">
              {isEditing ? 'Edit Compensation Plan' : 'Create New Compensation Plan'}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            {isEditing 
              ? 'Modify the details of this compensation plan' 
              : 'Set up a new compensation plan for agents'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-grow pr-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Premium Plan"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of this compensation plan"
                className="mt-1"
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="baseCommission">Base Commission (%)</Label>
                <div className="relative mt-1">
                  <Input
                    id="baseCommission"
                    name="baseCommission"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.baseCommission}
                    onChange={handleNumberChange}
                    className="pr-8"
                  />
                  <Percent className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="retainerPercent">Retainer (%)</Label>
                <div className="relative mt-1">
                  <Input
                    id="retainerPercent"
                    name="retainerPercent"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.retainerPercent}
                    onChange={handleNumberChange}
                    className="pr-8"
                  />
                  <Percent className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="revenueThreshold">Revenue Threshold (₪)</Label>
              <div className="relative mt-1">
                <Input
                  id="revenueThreshold"
                  name="revenueThreshold"
                  type="number"
                  min="0"
                  value={formData.revenueThreshold}
                  onChange={handleNumberChange}
                  className="pl-6"
                />
                <span className="absolute left-3 top-2.5 text-gray-500">₪</span>
              </div>
            </div>
            
            <div>
              <Label>Color Theme</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    className={`h-10 rounded-md border-2 flex items-center justify-center text-xs ${color.value} ${
                      formData.color === color.value ? 'ring-2 ring-offset-2 ring-blue-600' : ''
                    }`}
                    onClick={() => handleColorSelect(color.value)}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Features</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addFeature}
                  type="button"
                  className="h-8"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Feature
                </Button>
              </div>
              
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                      className="flex-grow"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      type="button"
                      disabled={formData.features.length <= 1}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isEditing ? 'Save Changes' : 'Create Plan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompensationPlanDialog;
