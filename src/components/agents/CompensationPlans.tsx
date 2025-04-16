import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Plus, 
  Percent, 
  TrendingUp, 
  CheckCircle, 
  Users,
  Edit
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CompensationPlanDialog from './CompensationPlanDialog';
import CommissionCalculator from './CommissionCalculator';
import AgentCreationModal from './AgentCreationModal';

interface CompensationPlan {
  id: string;
  name: string;
  description: string;
  baseCommission: number;
  retainerPercent: number;
  revenueThreshold: number;
  color: string;
  features: string[];
  activeAgents: number;
}

interface ViewAgentsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  agents: Array<{
    id: string;
    name: string;
    email: string;
    region: string;
    revenue: number;
  }>;
  onAddAgent: () => void;
}

const ViewAgentsDialog: React.FC<ViewAgentsDialogProps> = ({ 
  isOpen, 
  onClose, 
  planName, 
  agents, 
  onAddAgent 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Agents on {planName} Plan
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-grow">
          {agents.length > 0 ? (
            <div className="space-y-4">
              {agents.map(agent => (
                <Card key={agent.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="font-semibold text-blue-700">{agent.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{agent.name}</h4>
                          <p className="text-sm text-gray-500">{agent.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{agent.region}</div>
                        <div className="text-sm text-gray-500">₪{(agent.revenue / 1000).toFixed(0)}K Revenue</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h4 className="text-lg font-medium text-gray-600">No Agents</h4>
              <p className="text-gray-500 mb-4">No agents are currently assigned to this plan</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t flex justify-between">
          <span className="text-sm text-gray-500 self-center">
            {agents.length} {agents.length === 1 ? 'agent' : 'agents'} on this plan
          </span>
          <div>
            <Button variant="outline" onClick={onClose} className="mr-2">
              Close
            </Button>
            <Button onClick={onAddAgent}>
              <Plus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const plans: CompensationPlan[] = [
  {
    id: 'starter',
    name: 'Starter Plan',
    description: 'For new agents beginning their sales career',
    baseCommission: 7,
    retainerPercent: 10,
    revenueThreshold: 100000,
    color: 'bg-blue-50 border-blue-200',
    features: [
      '7% base commission rate',
      '10% retainer from each transaction',
      'Up to 100,000₪ monthly revenue',
      'Basic performance tracking',
      'Standard support'
    ],
    activeAgents: 8
  },
  {
    id: 'intermediate',
    name: 'Intermediate Plan',
    description: 'For established agents with proven track record',
    baseCommission: 10,
    retainerPercent: 12,
    revenueThreshold: 200000,
    color: 'bg-green-50 border-green-200',
    features: [
      '10% base commission rate',
      '12% retainer from each transaction',
      '100,000₪ - 200,000₪ monthly revenue',
      'Advanced performance tracking',
      'Priority support',
      'Monthly strategy sessions'
    ],
    activeAgents: 15
  },
  {
    id: 'advanced',
    name: 'Advanced Plan',
    description: 'For high-performing experienced agents',
    baseCommission: 12,
    retainerPercent: 15,
    revenueThreshold: 300000,
    color: 'bg-purple-50 border-purple-200',
    features: [
      '12% base commission rate',
      '15% retainer from each transaction',
      '200,000₪ - 300,000₪ monthly revenue',
      'Comprehensive performance analytics',
      'VIP support',
      'Quarterly strategy planning',
      'Team leadership opportunities'
    ],
    activeAgents: 12
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    description: 'For top-tier elite sales agents',
    baseCommission: 15,
    retainerPercent: 20,
    revenueThreshold: 300001,
    color: 'bg-amber-50 border-amber-200',
    features: [
      '15% base commission rate',
      '20% retainer from each transaction',
      'Above 300,000₪ monthly revenue',
      'Executive analytics dashboard',
      'Dedicated account manager',
      'Regional leadership role',
      'Annual executive retreat',
      'Performance bonus incentives'
    ],
    activeAgents: 5
  },
  {
    id: 'custom',
    name: 'Custom Plan',
    description: 'Tailored compensation structure for special cases',
    baseCommission: 0,
    retainerPercent: 0,
    revenueThreshold: 0,
    color: 'bg-gray-50 border-gray-200',
    features: [
      'Customized commission structure',
      'Negotiable retainer percentages',
      'Flexible revenue thresholds',
      'Specialized incentive options',
      'Bespoke reporting and analytics',
      'Custom support package'
    ],
    activeAgents: 2
  }
];

const generateAgents = (count: number) => {
  const regions = ['Tel Aviv', 'Jerusalem', 'Haifa', 'Beersheba', 'Netanya'];
  return Array.from({ length: count }).map((_, index) => ({
    id: `agent-${index}`,
    name: `Agent ${index + 1}`,
    email: `agent${index + 1}@example.com`,
    region: regions[index % regions.length],
    revenue: 50000 + (index * 10000)
  }));
};

const CompensationPlans = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<CompensationPlan | null>(null);
  const [localPlans, setLocalPlans] = useState<CompensationPlan[]>(plans);
  const [viewAgentsDialogOpen, setViewAgentsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<CompensationPlan | null>(null);
  const [isAgentCreationModalOpen, setIsAgentCreationModalOpen] = useState(false);
  
  const handleCreatePlan = () => {
    setCurrentPlan(null);
    setIsPlanDialogOpen(true);
  };
  
  const handleEditPlan = (plan: CompensationPlan) => {
    setCurrentPlan(plan);
    setIsPlanDialogOpen(true);
  };
  
  const handleSavePlan = (planData: CompensationPlan) => {
    if (planData.id) {
      setLocalPlans(localPlans.map(p => 
        p.id === planData.id ? { ...planData, activeAgents: p.activeAgents } : p
      ));
    } else {
      const newPlan = {
        ...planData,
        id: `plan-${Date.now()}`,
        activeAgents: 0
      };
      setLocalPlans([...localPlans, newPlan]);
    }
  };
  
  const handleViewAgents = (plan: CompensationPlan) => {
    setSelectedPlan(plan);
    setViewAgentsDialogOpen(true);
  };
  
  const handleAddAgentToPlan = () => {
    setIsAgentCreationModalOpen(true);
    setViewAgentsDialogOpen(false);
  };
  
  const PlanAnalytics = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
          Compensation Plan Performance
        </h2>
        <p className="text-gray-500">
          Analyze the effectiveness and impact of your compensation plans
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Most Popular Plan</CardTitle>
            <CardDescription>By agent count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Intermediate</div>
            <p className="text-sm text-muted-foreground">15 active agents</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Highest Performing</CardTitle>
            <CardDescription>By average revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Premium</div>
            <p className="text-sm text-muted-foreground">₪142K avg per agent</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Total Commission</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₪352K</div>
            <p className="text-sm text-green-600">↑ 8.3% from previous period</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue by Plan Type</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-slate-50 rounded-md border border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Revenue by plan type chart visualization</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Agent allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-slate-50 rounded-md border border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Plan distribution chart visualization</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mx-auto bg-white border border-gray-200 p-1 shadow-sm rounded-xl overflow-hidden mb-6">
          <TabsTrigger 
            value="plans" 
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
          >
            Compensation Plans
          </TabsTrigger>
          <TabsTrigger 
            value="calculator" 
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
          >
            Commission Calculator
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
          >
            Plan Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans" className="mt-0">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                Commission Plans
              </h2>
              <Button className="flex items-center gap-2" onClick={handleCreatePlan}>
                <Plus className="h-4 w-4" />
                Create Custom Plan
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localPlans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`border-2 transition-all hover:shadow-md h-full flex flex-col ${
                    plan.color
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleEditPlan(plan)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <div className="flex justify-between items-center border-b pb-3 mb-3">
                      <div className="flex items-center">
                        <Percent className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="font-medium">Base Commission</span>
                      </div>
                      <span className="text-lg font-bold">{plan.baseCommission}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b pb-3 mb-3">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                        <span className="font-medium">Retainer</span>
                      </div>
                      <span className="text-lg font-bold">{plan.retainerPercent}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                        <span className="font-medium">Revenue Threshold</span>
                      </div>
                      <span className="text-lg font-bold">
                        {plan.id === 'premium' 
                          ? '300K+' 
                          : plan.id === 'custom' 
                            ? 'Custom' 
                            : `${plan.revenueThreshold/1000}K`}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Key Features</h4>
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
                  <CardFooter className="mt-auto pt-2 border-t">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-blue-600" />
                        <span className="text-sm">{plan.activeAgents} active agents</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewAgents(plan)}
                      >
                        View Agents
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="calculator" className="mt-0">
          <CommissionCalculator 
            plans={localPlans.map(plan => ({
              id: plan.id,
              name: plan.name,
              baseCommission: plan.baseCommission,
              retainerPercent: plan.retainerPercent
            }))}
          />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <PlanAnalytics />
        </TabsContent>
      </Tabs>
      
      <CompensationPlanDialog 
        isOpen={isPlanDialogOpen}
        onClose={() => setIsPlanDialogOpen(false)}
        plan={currentPlan}
        onSave={handleSavePlan}
      />
      
      <ViewAgentsDialog 
        isOpen={viewAgentsDialogOpen}
        onClose={() => setViewAgentsDialogOpen(false)}
        planName={selectedPlan?.name || ''}
        agents={selectedPlan ? generateAgents(selectedPlan.activeAgents) : []}
        onAddAgent={handleAddAgentToPlan}
      />
      
      <AgentCreationModal 
        isOpen={isAgentCreationModalOpen} 
        onClose={() => setIsAgentCreationModalOpen(false)}
      />
    </div>
  );
};

export default CompensationPlans;
