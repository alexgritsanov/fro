
import React, { useState, useEffect } from 'react';
import { DollarSign, Calculator, Percent, ArrowRight, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Slider
} from "@/components/ui/slider";

interface Plan {
  id: string;
  name: string;
  baseCommission: number;
  retainerPercent: number;
}

interface CommissionCalculatorProps {
  plans: Plan[];
}

const CommissionCalculator = ({ plans }: CommissionCalculatorProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(plans[0]?.id || '');
  const [saleAmount, setSaleAmount] = useState<number>(100000);
  const [overrideCommission, setOverrideCommission] = useState<boolean>(false);
  const [customCommission, setCustomCommission] = useState<number>(10);
  
  const [baseCommission, setBaseCommission] = useState<number>(0);
  const [retainerAmount, setRetainerAmount] = useState<number>(0);
  const [totalCommission, setTotalCommission] = useState<number>(0);
  
  // Calculate commission whenever inputs change
  useEffect(() => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;
    
    const commissionRate = overrideCommission ? customCommission : plan.baseCommission;
    const baseAmount = (saleAmount * commissionRate) / 100;
    const retainer = (baseAmount * plan.retainerPercent) / 100;
    
    setBaseCommission(baseAmount);
    setRetainerAmount(retainer);
    setTotalCommission(baseAmount - retainer);
  }, [selectedPlan, saleAmount, overrideCommission, customCommission, plans]);
  
  const handleReset = () => {
    setSaleAmount(100000);
    setOverrideCommission(false);
    setSelectedPlan(plans[0]?.id || '');
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' })
      .format(amount)
      .replace('₪', '₪ '); // Add a space after the currency symbol
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-100">
        <CardHeader className="pb-2 bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-lg flex items-center">
            <Calculator className="h-5 w-5 mr-2 text-blue-600" />
            Commission Calculator
          </CardTitle>
          <CardDescription>
            Calculate commission payouts based on plans and sale amounts
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="plan">Compensation Plan</Label>
                <Select 
                  value={selectedPlan} 
                  onValueChange={setSelectedPlan}
                >
                  <SelectTrigger id="plan" className="mt-1">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map(plan => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name} ({plan.baseCommission}% base rate)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="sale-amount">Sale Amount</Label>
                <div className="relative mt-1">
                  <Input
                    id="sale-amount"
                    type="number"
                    min="0"
                    step="1000"
                    value={saleAmount}
                    onChange={(e) => setSaleAmount(Number(e.target.value))}
                    className="pl-6"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-500">₪</span>
                </div>
                <Slider
                  value={[saleAmount]}
                  min={10000}
                  max={500000}
                  step={5000}
                  onValueChange={(value) => setSaleAmount(value[0])}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₪10K</span>
                  <span>₪250K</span>
                  <span>₪500K</span>
                </div>
              </div>
              
              <div className="border-t border-dashed pt-4">
                <div className="flex items-center justify-between mb-3">
                  <Label htmlFor="override-commission">Custom Commission Rate</Label>
                  <div className="flex items-center">
                    <Button 
                      variant={overrideCommission ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setOverrideCommission(!overrideCommission)}
                      className={`h-7 ${overrideCommission ? "bg-blue-600 text-white" : ""}`}
                    >
                      {overrideCommission ? "Enabled" : "Override"}
                    </Button>
                  </div>
                </div>
                
                <div className={`relative ${!overrideCommission && "opacity-50"}`}>
                  <Input
                    id="override-commission"
                    type="number"
                    min="0"
                    max="100"
                    value={customCommission}
                    onChange={(e) => setCustomCommission(Number(e.target.value))}
                    disabled={!overrideCommission}
                    className="pr-8"
                  />
                  <Percent className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RefreshCcw className="h-3 w-3 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
            
            <div className="lg:border-l lg:pl-6 space-y-6">
              <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-sm">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                    <div className="text-center">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Sale Amount</h3>
                      <p className="text-2xl font-bold">{formatCurrency(saleAmount)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium flex items-center">
                          <Percent className="h-4 w-4 mr-1 text-blue-600" />
                          Base Commission Rate
                        </h3>
                        <p className="text-sm text-gray-500">
                          {overrideCommission ? "Custom rate" : "Plan standard rate"}
                        </p>
                      </div>
                      <span className="text-lg font-semibold">
                        {overrideCommission ? customCommission : plans.find(p => p.id === selectedPlan)?.baseCommission || 0}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium flex items-center">
                          <ArrowRight className="h-4 w-4 mr-1 text-green-600" />
                          Base Commission Amount
                        </h3>
                      </div>
                      <span className="text-lg font-semibold">{formatCurrency(baseCommission)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-dashed">
                      <div>
                        <h3 className="font-medium flex items-center">
                          <Percent className="h-4 w-4 mr-1 text-amber-600" />
                          Retainer Percentage
                        </h3>
                        <p className="text-sm text-gray-500">Held by company</p>
                      </div>
                      <span className="text-lg font-semibold">
                        {plans.find(p => p.id === selectedPlan)?.retainerPercent || 0}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-1">
                      <div>
                        <h3 className="font-medium flex items-center">
                          <ArrowRight className="h-4 w-4 mr-1 text-red-600" />
                          Retainer Amount
                        </h3>
                      </div>
                      <span className="text-lg font-semibold text-red-600">
                        - {formatCurrency(retainerAmount)}
                      </span>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-md mt-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Final Payout</h3>
                        <span className="text-xl font-bold text-green-600">
                          {formatCurrency(totalCommission)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionCalculator;
