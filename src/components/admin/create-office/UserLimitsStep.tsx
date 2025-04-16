
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { plans } from './data';
import { CheckCircle2, Edit, User, HardHat, Truck, Building2, Sparkles, Save } from 'lucide-react';

interface UserLimitsStepProps {
  selectedPlan: string;
  setSelectedPlan: (value: string) => void;
  customLimits: {
    total: number;
    employee: number;
    foreman: number;
    subcontractor: number;
    client: number;
  };
  setCustomLimits: (value: any) => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const UserLimitsStep: React.FC<UserLimitsStepProps> = ({
  selectedPlan,
  setSelectedPlan,
  customLimits,
  setCustomLimits,
  activeTab,
  setActiveTab
}) => {
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    
    if (planId === 'custom') {
      setActiveTab('custom');
    } else {
      const planLimits = plans.find(p => p.id === planId)?.limits;
      if (planLimits) {
        setCustomLimits(planLimits);
      }
    }
  };
  
  const handleCustomLimitChange = (type: string, value: number) => {
    setCustomLimits((prev: any) => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold mb-4">User Limits</h2>
      <Tabs defaultValue="plans" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-64 mx-auto mb-6">
          <TabsTrigger value="plans">Select a Plan</TabsTrigger>
          <TabsTrigger value="custom">Custom Limits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`border-2 transition-all hover:shadow-md h-full flex flex-col ${
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
                <CardContent className="pb-4 flex-grow">
                  <div className="text-lg font-bold mb-4">{plan.price}</div>
                  
                  {plan.id === 'custom' ? (
                    <div className="space-y-3">
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
                <CardFooter className="mt-auto">
                  {plan.id === 'custom' ? (
                    <Button 
                      className={`w-full flex items-center justify-center ${
                        selectedPlan === plan.id 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => handleSelectPlan(plan.id)}
                    >
                      {selectedPlan === plan.id ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          <span>Apply Custom Limits</span>
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button 
                      className={`w-full flex items-center justify-center ${selectedPlan === plan.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-white text-gray-700 border border-gray-300'}`}
                      onClick={() => handleSelectPlan(plan.id)}
                    >
                      {selectedPlan === plan.id ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <span>Select Plan</span>
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
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600"
                  onClick={() => {
                    setSelectedPlan('custom');
                    toast({
                      title: "Custom limits applied",
                      description: "Your custom user limits have been set.",
                    });
                  }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Apply Custom Limits
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserLimitsStep;
