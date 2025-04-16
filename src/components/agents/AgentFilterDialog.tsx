
import React, { useState } from 'react';
import { X, Check, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface FilterOptions {
  regions: string[];
  statuses: string[];
  plans: string[];
  sortBy: string;
  revenueMin: number;
  revenueMax: number;
  officesMin: number;
  officesMax: number;
}

interface AgentFilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
}

const AgentFilterDialog = ({ isOpen, onClose, filters, onApplyFilters }: AgentFilterDialogProps) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  
  const handleResetFilters = () => {
    setLocalFilters({
      regions: [],
      statuses: [],
      plans: [],
      sortBy: 'name',
      revenueMin: 0,
      revenueMax: 500000,
      officesMin: 0,
      officesMax: 20,
    });
  };
  
  const handleApplyFilters = () => {
    onApplyFilters(localFilters);
    onClose();
  };
  
  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="mb-4">
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl">Filter Agents</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            Refine the agent list with multiple criteria
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-grow pr-2">
          <Accordion type="multiple" defaultValue={['regions', 'status']}>
            <AccordionItem value="regions">
              <AccordionTrigger className="text-base font-medium">
                Regions
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {['Tel Aviv', 'Jerusalem', 'Haifa', 'Beersheba', 'Netanya', 'Eilat'].map((region) => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`region-${region}`}
                        checked={localFilters.regions.includes(region)}
                        onCheckedChange={() => {
                          setLocalFilters({
                            ...localFilters,
                            regions: toggleArrayItem(localFilters.regions, region)
                          });
                        }}
                      />
                      <Label htmlFor={`region-${region}`}>{region}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="status">
              <AccordionTrigger className="text-base font-medium">
                Status
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {['active', 'pending', 'inactive', 'expired'].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-${status}`}
                        checked={localFilters.statuses.includes(status)}
                        onCheckedChange={() => {
                          setLocalFilters({
                            ...localFilters,
                            statuses: toggleArrayItem(localFilters.statuses, status)
                          });
                        }}
                      />
                      <Label htmlFor={`status-${status}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="plans">
              <AccordionTrigger className="text-base font-medium">
                Compensation Plans
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {['Starter', 'Intermediate', 'Advanced', 'Premium', 'Custom'].map((plan) => (
                    <div key={plan} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`plan-${plan}`}
                        checked={localFilters.plans.includes(plan)}
                        onCheckedChange={() => {
                          setLocalFilters({
                            ...localFilters,
                            plans: toggleArrayItem(localFilters.plans, plan)
                          });
                        }}
                      />
                      <Label htmlFor={`plan-${plan}`}>{plan}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="revenue">
              <AccordionTrigger className="text-base font-medium">
                Revenue Range
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <Label htmlFor="revenue-min">Minimum</Label>
                      <div className="flex items-center mt-1">
                        <span className="mr-1">₪</span>
                        <Input 
                          id="revenue-min"
                          type="number" 
                          value={localFilters.revenueMin}
                          onChange={(e) => {
                            setLocalFilters({
                              ...localFilters,
                              revenueMin: Number(e.target.value)
                            });
                          }}
                          className="w-24"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="revenue-max">Maximum</Label>
                      <div className="flex items-center mt-1">
                        <span className="mr-1">₪</span>
                        <Input 
                          id="revenue-max"
                          type="number" 
                          value={localFilters.revenueMax}
                          onChange={(e) => {
                            setLocalFilters({
                              ...localFilters,
                              revenueMax: Number(e.target.value)
                            });
                          }}
                          className="w-24"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="offices">
              <AccordionTrigger className="text-base font-medium">
                Office Count
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <Label htmlFor="offices-min">Minimum</Label>
                      <Input 
                        id="offices-min"
                        type="number" 
                        value={localFilters.officesMin}
                        onChange={(e) => {
                          setLocalFilters({
                            ...localFilters,
                            officesMin: Number(e.target.value)
                          });
                        }}
                        className="w-20 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="offices-max">Maximum</Label>
                      <Input 
                        id="offices-max"
                        type="number" 
                        value={localFilters.officesMax}
                        onChange={(e) => {
                          setLocalFilters({
                            ...localFilters,
                            officesMax: Number(e.target.value)
                          });
                        }}
                        className="w-20 mt-1"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="sort">
              <AccordionTrigger className="text-base font-medium">
                Sort By
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={localFilters.sortBy}
                  onValueChange={(value) => {
                    setLocalFilters({
                      ...localFilters,
                      sortBy: value
                    });
                  }}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="name" id="sort-name" />
                    <Label htmlFor="sort-name">Name</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="revenue-high" id="sort-revenue-high" />
                    <Label htmlFor="sort-revenue-high">Revenue (High to Low)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="revenue-low" id="sort-revenue-low" />
                    <Label htmlFor="sort-revenue-low">Revenue (Low to High)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="offices" id="sort-offices" />
                    <Label htmlFor="sort-offices">Office Count</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="status" id="sort-status" />
                    <Label htmlFor="sort-status">Status</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <DialogFooter className="mt-6 flex justify-between">
          <Button variant="outline" onClick={handleResetFilters}>
            Reset Filters
          </Button>
          <Button onClick={handleApplyFilters} className="ml-auto">
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgentFilterDialog;
