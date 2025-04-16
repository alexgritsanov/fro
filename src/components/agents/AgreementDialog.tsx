import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  CheckCircle, 
  Users, 
  Calendar as CalendarLucideIcon, 
  Plus,
  Search,
  DollarSign,
  Check,
  CalendarIcon
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

interface AgreementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  agent?: { id: string; name: string } | null;
}

const AgreementDialog: React.FC<AgreementDialogProps> = ({
  isOpen,
  onClose,
  agent
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [agreementTitle, setAgreementTitle] = useState('');
  const [agreementType, setAgreementType] = useState('');
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>();
  const [expiryDate, setExpiryDate] = useState<Date | undefined>();
  const [description, setDescription] = useState('');
  const [commissionStructure, setCommissionStructure] = useState('standard');
  const [baseCommission, setBaseCommission] = useState('5');
  const [bonusThreshold, setBonusThreshold] = useState('100000');
  const [bonusRate, setBonusRate] = useState('2');
  
  const handleCreateAgreement = () => {
    if (!agreementTitle || !agreementType || !effectiveDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Agreement created successfully');
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-blue-600" />
            {agent ? `Create Agreement for ${agent.name}` : 'Create New Agreement'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="w-full max-w-md mb-4">
            <TabsTrigger value="details" className="flex-1">
              Agreement Details
            </TabsTrigger>
            <TabsTrigger value="commission" className="flex-1">
              Commission Structure
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex-1">
              Preview
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-y-auto py-2">
            <TabsContent value="details" className="m-0 p-1">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agreement-title">Agreement Title *</Label>
                    <Input 
                      id="agreement-title" 
                      placeholder="Enter agreement title"
                      value={agreementTitle}
                      onChange={(e) => setAgreementTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="agreement-type">Agreement Type *</Label>
                    <Select value={agreementType} onValueChange={setAgreementType}>
                      <SelectTrigger id="agreement-type">
                        <SelectValue placeholder="Select agreement type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Agent Agreement</SelectItem>
                        <SelectItem value="senior">Senior Agent Agreement</SelectItem>
                        <SelectItem value="regional">Regional Manager Agreement</SelectItem>
                        <SelectItem value="custom">Custom Agreement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="effective-date">Effective Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {effectiveDate ? format(effectiveDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={effectiveDate}
                          onSelect={setEffectiveDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {expiryDate ? format(expiryDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={expiryDate}
                          onSelect={setExpiryDate}
                          initialFocus
                          disabled={(date) => effectiveDate ? date < effectiveDate : false}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter agreement description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-medium flex items-center mb-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                    Agreement Template
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    This agreement will be based on the standard template for the selected agreement type.
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="custom-template" />
                    <label 
                      htmlFor="custom-template" 
                      className="text-sm font-medium cursor-pointer"
                    >
                      Use custom template instead
                    </label>
                  </div>
                </div>
                
                {agent && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="font-medium flex items-center mb-2">
                      <Users className="h-4 w-4 text-green-600 mr-2" />
                      Selected Agent
                    </h3>
                    <p className="text-sm text-green-700">
                      This agreement will be created for <strong>{agent.name}</strong>.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="commission" className="m-0 p-1">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="commission-structure">Commission Structure *</Label>
                  <Select value={commissionStructure} onValueChange={setCommissionStructure}>
                    <SelectTrigger id="commission-structure">
                      <SelectValue placeholder="Select commission structure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (Flat Rate)</SelectItem>
                      <SelectItem value="tiered">Tiered (Based on Revenue)</SelectItem>
                      <SelectItem value="progressive">Progressive (Increasing with Sales)</SelectItem>
                      <SelectItem value="custom">Custom Structure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="bg-gray-50 border rounded-lg p-5">
                  {commissionStructure === 'standard' && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Standard Commission Structure</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        A fixed percentage commission on all sales.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="base-commission">Base Commission Rate (%)</Label>
                          <div className="relative">
                            <Input 
                              id="base-commission" 
                              type="number"
                              min="0"
                              max="100"
                              value={baseCommission}
                              onChange={(e) => setBaseCommission(e.target.value)}
                              className="pl-7"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {commissionStructure === 'tiered' && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Tiered Commission Structure</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Different commission rates based on sales revenue thresholds.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="base-commission">Base Commission Rate (%)</Label>
                          <div className="relative">
                            <Input 
                              id="base-commission" 
                              type="number"
                              min="0"
                              max="100"
                              value={baseCommission}
                              onChange={(e) => setBaseCommission(e.target.value)}
                              className="pl-7"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bonus-threshold">Bonus Threshold (₪)</Label>
                          <div className="relative">
                            <Input 
                              id="bonus-threshold" 
                              type="number"
                              min="0"
                              value={bonusThreshold}
                              onChange={(e) => setBonusThreshold(e.target.value)}
                              className="pl-7"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₪</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bonus-rate">Bonus Commission Rate (%)</Label>
                          <div className="relative">
                            <Input 
                              id="bonus-rate" 
                              type="number"
                              min="0"
                              max="100"
                              value={bonusRate}
                              onChange={(e) => setBonusRate(e.target.value)}
                              className="pl-7"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Applied to sales exceeding the bonus threshold
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {commissionStructure === 'progressive' && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Progressive Commission Structure</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Commission rate increases as sales targets are achieved.
                      </p>
                      
                      <div className="space-y-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="px-4 py-2 text-left">Sales Level</th>
                              <th className="px-4 py-2 text-center">Revenue Range</th>
                              <th className="px-4 py-2 text-right">Commission Rate</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { level: 'Level 1', range: '₪0 - ₪50,000', rate: '3%' },
                              { level: 'Level 2', range: '₪50,001 - ₪100,000', rate: '5%' },
                              { level: 'Level 3', range: '₪100,001 - ₪250,000', rate: '7%' },
                              { level: 'Level 4', range: '₪250,001+', rate: '10%' }
                            ].map((tier, index) => (
                              <tr key={index} className="border-b">
                                <td className="px-4 py-3 font-medium">{tier.level}</td>
                                <td className="px-4 py-3 text-center">{tier.range}</td>
                                <td className="px-4 py-3 text-right">{tier.rate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Level
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {commissionStructure === 'custom' && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Custom Commission Structure</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Define a custom commission structure with specific rules.
                      </p>
                      
                      <Textarea 
                        placeholder="Describe the custom commission structure..."
                        rows={4}
                      />
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="needs-approval" />
                        <label 
                          htmlFor="needs-approval" 
                          className="text-sm font-medium cursor-pointer"
                        >
                          This structure requires management approval
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="m-0 p-1">
              <div className="border rounded-lg p-6 max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-1">
                    {agreementTitle || 'Agreement Title'}
                  </h1>
                  <p className="text-gray-500">
                    {agreementType ? (
                      agreementType === 'standard' ? 'Standard Agent Agreement' :
                      agreementType === 'senior' ? 'Senior Agent Agreement' :
                      agreementType === 'regional' ? 'Regional Manager Agreement' :
                      'Custom Agreement'
                    ) : 'Agreement Type'}
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between text-sm border-b pb-4">
                    <div>
                      <p className="font-medium">Effective Date:</p>
                      <p>{effectiveDate ? format(effectiveDate, 'PPP') : 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Expiry Date:</p>
                      <p>{expiryDate ? format(expiryDate, 'PPP') : 'Not specified'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-gray-700">{description || 'No description provided.'}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Commission Structure</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      {commissionStructure === 'standard' && (
                        <div>
                          <p className="mb-2"><strong>Standard Commission Structure</strong></p>
                          <p className="mb-1">Base Commission Rate: {baseCommission}%</p>
                          <p className="text-sm text-gray-600">
                            Agent will receive a {baseCommission}% commission on all sales.
                          </p>
                        </div>
                      )}
                      
                      {commissionStructure === 'tiered' && (
                        <div>
                          <p className="mb-2"><strong>Tiered Commission Structure</strong></p>
                          <p className="mb-1">Base Commission Rate: {baseCommission}%</p>
                          <p className="mb-1">Bonus Threshold: ₪{parseInt(bonusThreshold).toLocaleString()}</p>
                          <p className="mb-1">Bonus Commission Rate: {bonusRate}%</p>
                          <p className="text-sm text-gray-600">
                            Agent will receive {baseCommission}% on sales up to ₪{parseInt(bonusThreshold).toLocaleString()}, 
                            and {bonusRate}% on sales exceeding this threshold.
                          </p>
                        </div>
                      )}
                      
                      {commissionStructure === 'progressive' && (
                        <div>
                          <p className="mb-2"><strong>Progressive Commission Structure</strong></p>
                          <p className="mb-1">The commission rate increases as sales targets are achieved:</p>
                          <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>3% on sales from ₪0 to ₪50,000</li>
                            <li>5% on sales from ₪50,001 to ₪100,000</li>
                            <li>7% on sales from ₪100,001 to ₪250,000</li>
                            <li>10% on sales above ₪250,001</li>
                          </ul>
                        </div>
                      )}
                      
                      {commissionStructure === 'custom' && (
                        <div>
                          <p className="mb-2"><strong>Custom Commission Structure</strong></p>
                          <p className="text-sm text-gray-600">
                            This agreement uses a custom commission structure as defined in the agreement details.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {agent && (
                    <div>
                      <h3 className="font-medium mb-2">Agent</h3>
                      <p className="text-gray-700">{agent.name}</p>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-500 border-t pt-4">
                    <p>This is a preview of the agreement. The actual agreement will include all terms and conditions.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
        <DialogFooter className="pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {activeTab === 'preview' ? (
            <Button onClick={handleCreateAgreement}>
              <FileText className="h-4 w-4 mr-2" />
              Create Agreement
            </Button>
          ) : (
            <Button onClick={() => setActiveTab(activeTab === 'details' ? 'commission' : 'preview')}>
              Continue
              <CalendarLucideIcon className="h-4 w-4 ml-2" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgreementDialog;
