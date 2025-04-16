
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserCog, User, MapPin, DollarSign, FileText, CheckCircle, ChevronRight, ChevronLeft, Upload, X, Edit } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface AgentCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PlanType = 'tier1' | 'tier2' | 'tier3' | 'tier4' | 'custom';

const AgentCreationModal: React.FC<AgentCreationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [customTab, setCustomTab] = useState('components');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      region: '',
      address: '',
      experience: '',
      specialties: '',
      taxId: '',
      companyName: ''
    }
  });
  
  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSelectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
  };

  const plans = [
    {
      id: 'tier1',
      name: 'Tier 1',
      description: 'Starter commission package',
      baseCommission: 7,
      retainer: 10,
      threshold: '0 - 100,000₪',
      color: 'bg-blue-50 border-blue-200',
      features: [
        '7% base commission rate',
        '10% retainer from transactions',
        'Up to 100,000₪ threshold',
        'Standard support',
        'Basic reporting'
      ]
    },
    {
      id: 'tier2',
      name: 'Tier 2',
      description: 'Intermediate commission package',
      baseCommission: 10,
      retainer: 12,
      threshold: '100,000₪ - 200,000₪',
      color: 'bg-green-50 border-green-200',
      features: [
        '10% base commission rate',
        '12% retainer from transactions',
        '100,000₪ - 200,000₪ threshold',
        'Priority support',
        'Enhanced reporting',
        'Monthly strategy sessions'
      ]
    },
    {
      id: 'tier3',
      name: 'Tier 3',
      description: 'Advanced commission package',
      baseCommission: 12,
      retainer: 15,
      threshold: '200,000₪ - 300,000₪',
      color: 'bg-purple-50 border-purple-200',
      features: [
        '12% base commission rate',
        '15% retainer from transactions',
        '200,000₪ - 300,000₪ threshold',
        'VIP support',
        'Premium reporting',
        'Quarterly strategy sessions',
        'Leadership opportunities'
      ]
    },
    {
      id: 'tier4',
      name: 'Tier 4',
      description: 'Premium commission package',
      baseCommission: 15,
      retainer: 20,
      threshold: '300,000₪+',
      color: 'bg-amber-50 border-amber-200',
      features: [
        '15% base commission rate',
        '20% retainer from transactions',
        'Above 300,000₪ threshold',
        'Dedicated account manager',
        'Executive dashboard',
        'Annual retreats',
        'Regional leadership role',
        'Performance bonuses'
      ]
    },
    {
      id: 'custom',
      name: 'Custom',
      description: 'Tailored commission structure',
      baseCommission: 0,
      retainer: 0,
      threshold: 'Custom',
      color: 'bg-gray-50 border-gray-200',
      features: [
        'Customized commission rates',
        'Negotiable retainer percentages',
        'Flexible revenue thresholds',
        'Specialized incentives',
        'Custom analytics package'
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1050px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2 mb-2">
            <UserCog className="h-5 w-5 text-blue-600" />
            Create New Agent
          </DialogTitle>
          <DialogDescription>
            Set up a new agent with all required information, compensation details and agreement.
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-1 py-4">
          {/* Progress Steps */}
          <div className="w-full mb-6">
            <div className="flex justify-between">
              {[
                { step: 1, label: 'Agent Information' },
                { step: 2, label: 'Regional Assignment' },
                { step: 3, label: 'Compensation Plan' },
                { step: 4, label: 'Agreement Preview' },
                { step: 5, label: 'Confirmation' }
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center">
                  <div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full mb-1 text-sm font-medium ${
                      step === item.step 
                        ? 'bg-blue-600 text-white' 
                        : step > item.step 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step > item.step ? <CheckCircle className="h-5 w-5" /> : item.step}
                  </div>
                  <div className="text-xs text-center hidden sm:block">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="relative flex h-1 w-full bg-gray-200 mt-4 mb-2">
              <div 
                className="absolute h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(step - 1) * 25}%` }}
              ></div>
            </div>
          </div>
          
          {/* Step 1: Agent Information */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Agent Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last name" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Email address" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Phone number" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / Business Number</Label>
                    <Input id="taxId" placeholder="Tax ID or business number" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name (if applicable)</Label>
                    <Input id="companyName" placeholder="Company name" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Full address" className="min-h-[80px]" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Professional Experience</Label>
                    <Textarea id="experience" placeholder="Describe agent's professional experience" className="min-h-[80px]" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialties">Specialties</Label>
                    <Textarea id="specialties" placeholder="Agent's specialties or focus areas" className="min-h-[80px]" />
                  </div>
                  
                  <div className="border-2 border-dashed rounded-lg p-4 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                    <p className="text-sm font-medium">Upload Profile Photo</p>
                    <p className="text-xs text-gray-500 mt-1">Click to browse or drag and drop</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Regional Assignment */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Regional Assignment
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryRegion">Primary Region</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tel-aviv">Tel Aviv</SelectItem>
                        <SelectItem value="jerusalem">Jerusalem</SelectItem>
                        <SelectItem value="haifa">Haifa</SelectItem>
                        <SelectItem value="beersheba">Beersheba</SelectItem>
                        <SelectItem value="netanya">Netanya</SelectItem>
                        <SelectItem value="eilat">Eilat</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">The main region where this agent will operate</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryRegions">Secondary Regions (optional)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select secondary regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tel-aviv">Tel Aviv</SelectItem>
                        <SelectItem value="jerusalem">Jerusalem</SelectItem>
                        <SelectItem value="haifa">Haifa</SelectItem>
                        <SelectItem value="beersheba">Beersheba</SelectItem>
                        <SelectItem value="netanya">Netanya</SelectItem>
                        <SelectItem value="eilat">Eilat</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">Additional regions this agent may service</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="officeAssignment">Office Assignment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select offices" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office1">Tel Aviv HQ</SelectItem>
                        <SelectItem value="office2">Jerusalem Office</SelectItem>
                        <SelectItem value="office3">Haifa Branch</SelectItem>
                        <SelectItem value="office4">Beersheba Office</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500">Offices this agent will manage</p>
                      <Button variant="link" size="sm" className="text-xs h-auto p-0">
                        Create New Office
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="territory">Territory Details</Label>
                    <Textarea id="territory" placeholder="Specific area details, boundaries, etc." className="min-h-[80px]" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gray-50 h-[300px] flex items-center justify-center">
                    <p className="text-gray-500">Region Map Visualization</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="regionalNotes">Regional Notes</Label>
                    <Textarea id="regionalNotes" placeholder="Additional notes about this region assignment" className="min-h-[80px]" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Compensation Plan */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                Compensation Plan
              </h2>
              
              <Tabs defaultValue="plans" value={customTab} onValueChange={setCustomTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-64 mx-auto mb-6">
                  <TabsTrigger value="plans">Select a Plan</TabsTrigger>
                  <TabsTrigger value="custom">Custom Plan</TabsTrigger>
                </TabsList>
                
                <TabsContent value="plans" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.slice(0, 4).map((plan) => (
                      <Card 
                        key={plan.id}
                        className={`border-2 transition-all hover:shadow-md h-full flex flex-col ${
                          selectedPlan === plan.id as PlanType
                            ? 'ring-2 ring-blue-500 ' + plan.color
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{plan.name}</CardTitle>
                            {selectedPlan === plan.id as PlanType && (
                              <Badge className="bg-blue-500">Selected</Badge>
                            )}
                          </div>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-4 flex-grow">
                          <div className="flex justify-between items-center border-b pb-3 mb-3">
                            <span className="font-medium">Base Commission</span>
                            <span className="text-lg font-bold">{plan.baseCommission}%</span>
                          </div>
                          
                          <div className="flex justify-between items-center border-b pb-3 mb-3">
                            <span className="font-medium">Retainer</span>
                            <span className="text-lg font-bold">{plan.retainer}%</span>
                          </div>
                          
                          <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <span className="font-medium">Revenue Threshold</span>
                            <span className="text-lg font-bold">{plan.threshold}</span>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Features</h4>
                            <ul className="space-y-2">
                              {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter className="mt-auto">
                          <Button 
                            className="w-full"
                            variant={selectedPlan === plan.id as PlanType ? 'default' : 'outline'}
                            onClick={() => handleSelectPlan(plan.id as PlanType)}
                          >
                            {selectedPlan === plan.id as PlanType ? 'Selected' : 'Select Plan'}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="custom" className="mt-0">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="bg-white border rounded-lg p-5 flex-grow space-y-6 shadow-sm">
                      <h3 className="font-semibold">Custom Compensation Plan</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="customBaseCommission">Base Commission Rate (%)</Label>
                            <Input id="customBaseCommission" type="number" min="0" max="30" placeholder="e.g., 10" />
                            <p className="text-xs text-gray-500">The base commission percentage for this agent</p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="customRetainer">Retainer Percentage (%)</Label>
                            <Input id="customRetainer" type="number" min="0" max="30" placeholder="e.g., 15" />
                            <p className="text-xs text-gray-500">Additional percentage retained from each transaction</p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="customThreshold">Revenue Threshold (₪)</Label>
                            <Input id="customThreshold" type="number" min="0" placeholder="e.g., 250000" />
                            <p className="text-xs text-gray-500">Monthly revenue threshold for this compensation level</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="customIncentives">Additional Incentives</Label>
                            <Textarea id="customIncentives" placeholder="Describe any additional incentives" className="min-h-[80px]" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="customTerms">Special Terms</Label>
                            <Textarea id="customTerms" placeholder="Any special terms or conditions" className="min-h-[80px]" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button 
                          className="flex items-center gap-2"
                          onClick={() => handleSelectPlan('custom')}
                        >
                          Apply Custom Plan
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 border rounded-lg p-5 lg:w-[350px] shadow-sm space-y-4">
                      <h3 className="font-semibold">Plan Summary</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-gray-600">Plan Type:</span>
                          <span className="font-medium">Custom</span>
                        </div>
                        
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-gray-600">Base Commission:</span>
                          <span className="font-medium">0%</span>
                        </div>
                        
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-gray-600">Retainer:</span>
                          <span className="font-medium">0%</span>
                        </div>
                        
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-gray-600">Threshold:</span>
                          <span className="font-medium">₪0</span>
                        </div>
                        
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-gray-600">Estimated Monthly:</span>
                          <span className="font-medium">₪0</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg text-sm border border-blue-100 text-blue-700">
                        <p>Configure your custom plan on the left and see the summary here.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          {/* Step 4: Agreement Preview */}
          {step === 4 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Agreement Preview
              </h2>
              
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="bg-white border rounded-lg shadow-sm lg:flex-1 overflow-hidden">
                  <div className="bg-gray-100 border-b p-3 flex justify-between items-center">
                    <h3 className="font-medium">Agent Agreement</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  
                  <div className="h-[500px] flex items-center justify-center p-6 bg-white">
                    <div className="border rounded-lg w-full h-full flex items-center justify-center bg-gray-50">
                      <p className="text-gray-500">PDF Agreement Preview</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border rounded-lg p-5 lg:w-[350px] shadow-sm space-y-4">
                  <h3 className="font-semibold border-b pb-2">Agreement Details</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 text-sm">Agent Name:</span>
                      <p className="font-medium">John Doe</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 text-sm">Region:</span>
                      <p className="font-medium">Tel Aviv</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 text-sm">Compensation Plan:</span>
                      <p className="font-medium">
                        {selectedPlan ? (
                          <>
                            {selectedPlan === 'tier1' && 'Tier 1 (7% + 10%)'}
                            {selectedPlan === 'tier2' && 'Tier 2 (10% + 12%)'}
                            {selectedPlan === 'tier3' && 'Tier 3 (12% + 15%)'}
                            {selectedPlan === 'tier4' && 'Tier 4 (15% + 20%)'}
                            {selectedPlan === 'custom' && 'Custom Plan'}
                          </>
                        ) : 'Not selected'}
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 text-sm">Effective Date:</span>
                      <p className="font-medium">January 1, 2025</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 text-sm">Expiration Date:</span>
                      <p className="font-medium">December 31, 2025</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2 mb-4">
                      <input 
                        type="checkbox" 
                        id="agreeTerms" 
                        className="mt-1"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                      />
                      <label htmlFor="agreeTerms" className="text-sm">
                        I confirm that all information is correct and ready to send for signature
                      </label>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      disabled={!agreedToTerms}
                    >
                      Send for Signature
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="text-center py-8">
              <div className="bg-green-100 text-green-800 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Agent Created Successfully!</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                The agent has been created and the agreement has been sent for signature.
              </p>
              
              <div className="bg-white border rounded-lg p-5 max-w-md mx-auto text-left mb-6">
                <h3 className="font-semibold border-b pb-2 mb-3">Agent Details</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">John Doe</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">john.doe@example.com</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Region:</span>
                    <span className="font-medium">Tel Aviv</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-medium">
                      {selectedPlan ? (
                        <>
                          {selectedPlan === 'tier1' && 'Tier 1 (7% + 10%)'}
                          {selectedPlan === 'tier2' && 'Tier 2 (10% + 12%)'}
                          {selectedPlan === 'tier3' && 'Tier 3 (12% + 15%)'}
                          {selectedPlan === 'tier4' && 'Tier 4 (15% + 20%)'}
                          {selectedPlan === 'custom' && 'Custom Plan'}
                        </>
                      ) : 'Not selected'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-amber-600">Pending Signature</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button>
                  View Agent Profile
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation Buttons */}
        {step < 5 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <Button 
              variant="outline"
              onClick={step === 1 ? onClose : handlePreviousStep}
              className="flex items-center gap-2"
            >
              {step === 1 ? (
                <>
                  <X className="h-4 w-4" />
                  Cancel
                </>
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </>
              )}
            </Button>
            
            <Button 
              onClick={handleNextStep}
              className="flex items-center gap-2"
              disabled={step === 3 && !selectedPlan}
            >
              {step === 4 ? 'Complete' : 'Continue'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AgentCreationModal;
