import React, { useState } from 'react';
import { X, User, MapPin, Building, DollarSign, FileText, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Avatar from '@/components/Avatar';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetClose
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateOfficeModal from '@/components/admin/create-office/CreateOfficeModal';

interface AgentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  status: 'active' | 'pending' | 'inactive' | 'expired';
  offices: number;
  revenue: number;
  plan: string;
}

interface AgentProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  agent?: AgentData | null;
}

const AgentProfilePanel = ({ isOpen, onClose, agent }: AgentProfilePanelProps) => {
  const [showCreateOfficeModal, setShowCreateOfficeModal] = useState(false);
  
  if (!agent) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const handleOpenCreateOfficeModal = () => {
    setShowCreateOfficeModal(true);
  };
  
  const handleCloseCreateOfficeModal = () => {
    setShowCreateOfficeModal(false);
  };
  
  const handleCreateOfficeSuccess = () => {
    setShowCreateOfficeModal(false);
    // In a real app, you would refresh agent data or increment office count
  };
  
  const mockOffices = Array.from({ length: agent.offices || 0 }).map((_, index) => ({
    id: `office-${index}`,
    name: `${agent.region} Office ${index + 1}`,
    address: `${agent.region} District, Main Street ${100 + index}`,
    region: agent.region,
    status: 'active' as const,
    customersCount: Math.floor(Math.random() * 20) + 5
  }));

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader className="space-y-2 pb-4 border-b">
            <div className="flex justify-between items-start">
              <SheetTitle className="text-2xl font-bold">{agent.name}</SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={getStatusColor(agent.status)}
              >
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </Badge>
              <SheetDescription>{agent.email}</SheetDescription>
            </div>
          </SheetHeader>
          
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="offices">Offices</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar alt={agent.name} className="h-16 w-16 border-2 border-white shadow-sm" />
                <div>
                  <h2 className="text-xl font-semibold">{agent.name}</h2>
                  <p className="text-gray-500">{agent.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                      Region
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{agent.region}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Building className="h-4 w-4 mr-2 text-purple-600" />
                      Offices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{agent.offices}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                      Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">₪{(agent.revenue / 1000).toFixed(0)}K</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-amber-600" />
                      Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{agent.plan}</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-blue-600" />
                    Performance Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-slate-50 rounded-md border border-dashed flex items-center justify-center">
                    <p className="text-muted-foreground">Performance chart visualization</p>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Monthly Average</p>
                      <p className="text-lg font-semibold">₪{(agent.revenue / 12 / 1000).toFixed(1)}K</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Growth</p>
                      <p className="text-lg font-semibold text-green-600">+12.5%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="offices" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Managed Offices</h3>
                <Button size="sm" onClick={handleOpenCreateOfficeModal}>
                  <Building className="h-4 w-4 mr-2" />
                  Add Office
                </Button>
              </div>
              
              <div className="space-y-3">
                {agent.offices > 0 ? (
                  Array.from({ length: agent.offices }).map((_, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <Building className="h-4 w-4 text-blue-700" />
                          </div>
                          <div>
                            <h4 className="font-medium">{agent.region} Office {index + 1}</h4>
                            <p className="text-sm text-gray-500">Active since Jan 2023</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="bg-slate-50 rounded-lg border border-dashed p-8 text-center">
                    <Building className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-600">No Offices</h3>
                    <p className="text-sm text-gray-500 mb-4">This agent doesn't manage any offices yet</p>
                    <Button size="sm" onClick={handleOpenCreateOfficeModal}>
                      <Building className="h-4 w-4 mr-2" />
                      Add First Office
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 bg-slate-50 rounded-md border border-dashed flex items-center justify-center">
                    <p className="text-muted-foreground">Revenue chart visualization</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Conversions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-slate-50 rounded-md border border-dashed flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">Conversion metrics</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-slate-50 rounded-md border border-dashed flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">Retention metrics</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Documents & Agreements</h3>
                <Button size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Agent Agreement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-700 mr-2" />
                      <div>
                        <p className="font-medium">{agent.plan} Plan Agreement</p>
                        <p className="text-xs text-gray-500">Signed on Jan 15, 2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Required Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-green-700 mr-2" />
                      <div>
                        <p className="font-medium">Identity Verification</p>
                        <p className="text-xs text-gray-500">Uploaded on Jan 10, 2023</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Verified
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-amber-50 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-amber-700 mr-2" />
                      <div>
                        <p className="font-medium">Tax Registration</p>
                        <p className="text-xs text-gray-500">Uploaded on Jan 12, 2023</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                      Pending
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
      
      <CreateOfficeModal 
        isOpen={showCreateOfficeModal} 
        onClose={handleCloseCreateOfficeModal} 
        onSuccess={handleCreateOfficeSuccess}
        agentId={agent.id}
        agentName={agent.name}
        agentRegion={agent.region}
      />
    </>
  );
};

export default AgentProfilePanel;
