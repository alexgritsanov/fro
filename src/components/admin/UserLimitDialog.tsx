
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  CheckCircle2, 
  Sparkles,
  Building2,
  HardHat,
  Truck,
  User,
  Plus,
  Save,
  Edit,
  ChevronRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserLimitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  office: any;
  onSave: (limits: any) => void;
}

// Plan definitions
const plans = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'For small teams and startups',
    price: '$99/month',
    color: 'border-blue-500 bg-blue-50',
    highlight: false,
    limits: {
      total: 50,
      employee: 20,
      foreman: 5,
      subcontractor: 10,
      client: 15
    },
    features: [
      'Limited to 50 total users',
      'Basic support',
      'Document management',
      'Scheduling features'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing businesses',
    price: '$299/month',
    color: 'border-indigo-500 bg-indigo-50',
    highlight: true,
    limits: {
      total: 200,
      employee: 80,
      foreman: 20,
      subcontractor: 50,
      client: 50
    },
    features: [
      'Up to 200 total users',
      'Priority support',
      'Advanced reporting',
      'API access',
      'Custom branding'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: '$799/month',
    color: 'border-purple-500 bg-purple-50',
    highlight: false,
    limits: {
      total: 500,
      employee: 200,
      foreman: 50,
      subcontractor: 100,
      client: 150
    },
    features: [
      'Up to 500 total users',
      '24/7 dedicated support',
      'Custom integrations',
      'Advanced security features',
      'Dedicated account manager'
    ]
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Set your own limits',
    price: 'Custom Pricing',
    color: 'border-gray-500 bg-gray-50',
    highlight: false,
    limits: {
      total: 0,
      employee: 0,
      foreman: 0,
      subcontractor: 0,
      client: 0
    },
    features: [
      'Define your own user limits',
      'Scale as your business grows',
      'Flexible user allocation',
      'Optimized for your needs'
    ]
  }
];

const UserLimitDialog: React.FC<UserLimitDialogProps> = ({ 
  isOpen, 
  onClose, 
  office, 
  onSave 
}) => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [customLimits, setCustomLimits] = useState({
    total: 500,
    employee: 200,
    foreman: 50,
    subcontractor: 100,
    client: 150
  });
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [activeTab, setActiveTab] = useState('plans');

  // Initialize custom limits when selecting a plan
  useEffect(() => {
    if (selectedPlan !== 'custom') {
      const planLimits = plans.find(p => p.id === selectedPlan)?.limits;
      if (planLimits) {
        setCustomLimits(planLimits);
      }
    }
  }, [selectedPlan]);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    
    if (planId === 'custom') {
      setIsCustomizing(true);
      setActiveTab('custom');
    } else {
      const planLimits = plans.find(p => p.id === planId)?.limits;
      if (planLimits) {
        setCustomLimits(planLimits);
      }
      setIsCustomizing(false);
    }
  };

  const handleSave = () => {
    // In a real app, this would update the database
    onSave(selectedPlan === 'custom' ? customLimits : plans.find(p => p.id === selectedPlan)?.limits);
    
    toast({
      title: "User limits updated",
      description: `The user limits for ${office?.name} have been updated.`,
      variant: "default"
    });
    
    onClose();
  };

  const handleCustomLimitChange = (type: string, value: number) => {
    setCustomLimits(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleApplyCustomLimits = () => {
    setSelectedPlan('custom');
    toast({
      title: "Custom limits applied",
      description: "Custom user limits have been applied",
      variant: "default"
    });
  };

  const handleResetToDefault = () => {
    const professionalLimits = plans.find(p => p.id === 'professional')?.limits;
    if (professionalLimits) {
      setCustomLimits(professionalLimits);
      toast({
        title: "Limits reset",
        description: "User limits have been reset to Professional plan defaults",
        variant: "default"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">User Limits for {office?.name}</DialogTitle>
          <DialogDescription>
            Choose a plan for this office to control the number of users by role type
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="plans" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-64 mx-auto mb-6">
            <TabsTrigger value="plans">Select a Plan</TabsTrigger>
            <TabsTrigger value="custom">Custom Limits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`border-2 transition-all hover:shadow-md ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-blue-500 ' + plan.color
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  } ${plan.highlight ? 'shadow-md md:scale-105' : ''}`}
                >
                  <CardHeader className={`pb-2 ${selectedPlan === plan.id ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : ''}`}>
                    <div className="flex justify-between items-center">
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.highlight && (
                        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                          <Sparkles className="h-3 w-3 mr-1" />
                          POPULAR
                        </div>
                      )}
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold mb-4">{plan.price}</div>
                    
                    {plan.id === 'custom' ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-medium">Total Users</Label>
                            <Input 
                              type="number" 
                              min="1" 
                              value={customLimits.total}
                              onChange={(e) => handleCustomLimitChange('total', parseInt(e.target.value) || 0)}
                              className="h-8 mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium">Employees</Label>
                            <Input 
                              type="number" 
                              min="0" 
                              value={customLimits.employee}
                              onChange={(e) => handleCustomLimitChange('employee', parseInt(e.target.value) || 0)}
                              className="h-8 mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium">Foremen</Label>
                            <Input 
                              type="number" 
                              min="0" 
                              value={customLimits.foreman}
                              onChange={(e) => handleCustomLimitChange('foreman', parseInt(e.target.value) || 0)}
                              className="h-8 mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium">Subcontractors</Label>
                            <Input 
                              type="number" 
                              min="0" 
                              value={customLimits.subcontractor}
                              onChange={(e) => handleCustomLimitChange('subcontractor', parseInt(e.target.value) || 0)}
                              className="h-8 mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs font-medium">Clients</Label>
                          <Input 
                            type="number" 
                            min="0" 
                            value={customLimits.client}
                            onChange={(e) => handleCustomLimitChange('client', parseInt(e.target.value) || 0)}
                            className="h-8 mt-1"
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Customize your user limits directly
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-blue-500" />
                          <span>Employee: {plan.limits.employee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HardHat className="h-4 w-4 text-indigo-500" />
                          <span>Foreman: {plan.limits.foreman}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-purple-500" />
                          <span>Subcontractor: {plan.limits.subcontractor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-amber-500" />
                          <span>Client: {plan.limits.client}</span>
                        </div>
                        <div className="pt-2 border-t mt-2">
                          <div className="font-medium">Total: {plan.limits.total} users</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t">
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {plan.id === 'custom' ? (
                      <Button 
                        className={`w-full ${selectedPlan === plan.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-white text-gray-700 border border-gray-300'}`}
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        {selectedPlan === plan.id ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Selected
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Apply Custom Limits
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button 
                        className={`w-full ${selectedPlan === plan.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-white text-gray-700 border border-gray-300'}`}
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        {selectedPlan === plan.id ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Selected
                          </>
                        ) : (
                          'Select Plan'
                        )}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Custom User Limits</CardTitle>
                <CardDescription>
                  Set specific limits for each user type according to your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="totalLimit" className="text-base font-medium">
                      Total User Limit
                    </Label>
                    <div className="flex items-center mt-2">
                      <Input
                        id="totalLimit"
                        type="number"
                        min="1"
                        value={customLimits.total}
                        onChange={(e) => handleCustomLimitChange('total', parseInt(e.target.value) || 0)}
                        className="w-full"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      This is the maximum number of users allowed for this office
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-base font-medium flex items-center">
                        <User className="h-4 w-4 mr-2 text-green-600" />
                        Employee Limit
                      </Label>
                      <div className="flex items-center mt-2">
                        <Input
                          type="number"
                          min="0"
                          value={customLimits.employee}
                          onChange={(e) => handleCustomLimitChange('employee', parseInt(e.target.value) || 0)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium flex items-center">
                        <HardHat className="h-4 w-4 mr-2 text-indigo-600" />
                        Foreman Limit
                      </Label>
                      <div className="flex items-center mt-2">
                        <Input
                          type="number"
                          min="0"
                          value={customLimits.foreman}
                          onChange={(e) => handleCustomLimitChange('foreman', parseInt(e.target.value) || 0)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium flex items-center">
                        <Truck className="h-4 w-4 mr-2 text-purple-600" />
                        Subcontractor Limit
                      </Label>
                      <div className="flex items-center mt-2">
                        <Input
                          type="number"
                          min="0"
                          value={customLimits.subcontractor}
                          onChange={(e) => handleCustomLimitChange('subcontractor', parseInt(e.target.value) || 0)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium flex items-center">
                        <Building2 className="h-4 w-4 mr-2 text-amber-600" />
                        Client Limit
                      </Label>
                      <div className="flex items-center mt-2">
                        <Input
                          type="number"
                          min="0"
                          value={customLimits.client}
                          onChange={(e) => handleCustomLimitChange('client', parseInt(e.target.value) || 0)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-5">
                <div className="text-sm text-gray-500">
                  {customLimits.employee + customLimits.foreman + customLimits.subcontractor + customLimits.client > customLimits.total && (
                    <span className="text-red-500">
                      Warning: Individual user type limits exceed the total limit.
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleResetToDefault}>
                    Reset to Default
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600"
                    onClick={handleApplyCustomLimits}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Apply Custom Limits
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserLimitDialog;
