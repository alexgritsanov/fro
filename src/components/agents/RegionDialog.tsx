
import React, { useState } from 'react';
import { X, MapPin, Users, Building, TrendingUp, DollarSign } from 'lucide-react';
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

interface Region {
  id?: string;
  name: string;
  description: string;
  managerName?: string;
  targetRevenue?: number;
  notes?: string;
}

interface RegionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  region?: Region;
  onSave: (region: Region) => void;
}

const RegionDialog = ({ isOpen, onClose, region, onSave }: RegionDialogProps) => {
  const isEditing = !!region?.id;
  
  const [formData, setFormData] = useState<Region>(
    region || {
      name: '',
      description: '',
      managerName: '',
      targetRevenue: 0,
      notes: ''
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
  
  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="mb-4">
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              {isEditing ? 'Edit Region' : 'Add New Region'}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            {isEditing 
              ? 'Modify the details of this region' 
              : 'Create a new geographic region for agent management'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-grow pr-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Region Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Tel Aviv"
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
                placeholder="Brief description of this region"
                className="mt-1"
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="managerName">Regional Manager</Label>
              <Input
                id="managerName"
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
                placeholder="Name of regional manager"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="targetRevenue">Target Annual Revenue (₪)</Label>
              <div className="relative mt-1">
                <Input
                  id="targetRevenue"
                  name="targetRevenue"
                  type="number"
                  min="0"
                  value={formData.targetRevenue}
                  onChange={handleNumberChange}
                  className="pl-6"
                />
                <span className="absolute left-3 top-2.5 text-gray-500">₪</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any additional information about this region"
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isEditing ? 'Save Changes' : 'Create Region'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegionDialog;
