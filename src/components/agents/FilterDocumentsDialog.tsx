
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Filter, X, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface FilterDocumentsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterDocumentsDialog: React.FC<FilterDocumentsDialogProps> = ({
  isOpen,
  onClose
}) => {
  const [statusFilters, setStatusFilters] = useState<string[]>(['complete', 'pending']);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [expirationFilter, setExpirationFilter] = useState('all');
  const [agentTypeFilter, setAgentTypeFilter] = useState('all');
  
  const handleStatusFilterChange = (value: string) => {
    if (statusFilters.includes(value)) {
      setStatusFilters(statusFilters.filter(item => item !== value));
    } else {
      setStatusFilters([...statusFilters, value]);
    }
  };
  
  const handleTypeFilterChange = (value: string) => {
    if (typeFilters.includes(value)) {
      setTypeFilters(typeFilters.filter(item => item !== value));
    } else {
      setTypeFilters([...typeFilters, value]);
    }
  };
  
  const handleApplyFilters = () => {
    toast.success('Filters applied successfully');
    onClose();
  };
  
  const handleClearFilters = () => {
    setStatusFilters([]);
    setTypeFilters([]);
    setExpirationFilter('all');
    setAgentTypeFilter('all');
    toast.info('Filters cleared');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5 text-blue-600" />
            Filter Documents
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Document Status</Label>
              {statusFilters.length > 0 && (
                <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                  {statusFilters.length} selected
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="status-complete" 
                  checked={statusFilters.includes('complete')}
                  onCheckedChange={() => handleStatusFilterChange('complete')}
                />
                <label 
                  htmlFor="status-complete" 
                  className="text-sm font-medium flex items-center cursor-pointer"
                >
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1.5"></div>
                  Complete
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="status-pending" 
                  checked={statusFilters.includes('pending')}
                  onCheckedChange={() => handleStatusFilterChange('pending')}
                />
                <label 
                  htmlFor="status-pending" 
                  className="text-sm font-medium flex items-center cursor-pointer"
                >
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-1.5"></div>
                  Pending
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="status-incomplete" 
                  checked={statusFilters.includes('incomplete')}
                  onCheckedChange={() => handleStatusFilterChange('incomplete')}
                />
                <label 
                  htmlFor="status-incomplete" 
                  className="text-sm font-medium flex items-center cursor-pointer"
                >
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                  Incomplete
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="status-warning" 
                  checked={statusFilters.includes('warning')}
                  onCheckedChange={() => handleStatusFilterChange('warning')}
                />
                <label 
                  htmlFor="status-warning" 
                  className="text-sm font-medium flex items-center cursor-pointer"
                >
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-1.5"></div>
                  Warning
                </label>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Document Type</Label>
              {typeFilters.length > 0 && (
                <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                  {typeFilters.length} selected
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              {[
                { id: 'agent-agreement', name: 'Agent Agreement' },
                { id: 'tax-registration', name: 'Tax Registration' },
                { id: 'identity-verification', name: 'Identity Verification' },
                { id: 'business-license', name: 'Business License' },
                { id: 'insurance-verification', name: 'Insurance Verification' }
              ].map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`type-${type.id}`} 
                    checked={typeFilters.includes(type.id)}
                    onCheckedChange={() => handleTypeFilterChange(type.id)}
                  />
                  <label 
                    htmlFor={`type-${type.id}`} 
                    className="text-sm font-medium cursor-pointer"
                  >
                    {type.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <Label className="text-base font-medium">Expiration Date</Label>
            <RadioGroup value={expirationFilter} onValueChange={setExpirationFilter}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="exp-all" />
                  <label htmlFor="exp-all" className="text-sm font-medium cursor-pointer">
                    All Documents
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expiring-soon" id="exp-soon" />
                  <label htmlFor="exp-soon" className="text-sm font-medium cursor-pointer">
                    Expiring in 30 days
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expired" id="exp-expired" />
                  <label htmlFor="exp-expired" className="text-sm font-medium cursor-pointer">
                    Expired
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-expiration" id="exp-no" />
                  <label htmlFor="exp-no" className="text-sm font-medium cursor-pointer">
                    No Expiration
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <Label className="text-base font-medium">Agent Type</Label>
            <RadioGroup value={agentTypeFilter} onValueChange={setAgentTypeFilter}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="agent-all" />
                  <label htmlFor="agent-all" className="text-sm font-medium cursor-pointer">
                    All Agents
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="agent-standard" />
                  <label htmlFor="agent-standard" className="text-sm font-medium cursor-pointer">
                    Standard Agents
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="premium" id="agent-premium" />
                  <label htmlFor="agent-premium" className="text-sm font-medium cursor-pointer">
                    Premium Agents
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handleClearFilters}
            className="w-full sm:w-auto flex items-center gap-2 order-2 sm:order-1"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
          <Button 
            onClick={handleApplyFilters}
            className="w-full sm:w-auto flex items-center gap-2 order-1 sm:order-2"
          >
            <Check className="h-4 w-4" />
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDocumentsDialog;
