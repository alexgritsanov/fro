import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  User, 
  Building, 
  Search, 
  Filter, 
  Plus, 
  Grid, 
  List,
  ChevronDown,
  DollarSign,
  Clock,
  Info,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import RegionalMap from './RegionalMap';
import RegionDialog from './RegionDialog';
import { DataTable } from '@/components/DataTable';

const mockRegions = [
  {
    id: '1',
    name: 'Tel Aviv',
    agents: 12,
    offices: 3,
    revenue: 1250000,
    growth: 15,
    targetRevenue: 1500000,
    coordinates: { x: 150, y: 200 },
    description: 'Central coastal region with high density of tech companies',
    managerName: 'Sarah Miller',
    customers: 45
  },
  {
    id: '2',
    name: 'Jerusalem',
    agents: 8,
    offices: 2,
    revenue: 980000,
    growth: 8,
    targetRevenue: 1200000,
    coordinates: { x: 200, y: 220 },
    description: 'Capital region with diverse business opportunities',
    managerName: 'David Cohen',
    customers: 32
  },
  {
    id: '3',
    name: 'Haifa',
    agents: 6,
    offices: 1,
    revenue: 750000,
    growth: 12,
    targetRevenue: 850000,
    coordinates: { x: 140, y: 120 },
    description: 'Northern port city with industrial focus',
    managerName: 'Michael Levy',
    customers: 28
  },
  {
    id: '4',
    name: 'Beer Sheva',
    agents: 4,
    offices: 1,
    revenue: 420000,
    growth: 20,
    targetRevenue: 500000,
    coordinates: { x: 160, y: 350 },
    description: 'Southern hub with emerging tech presence',
    managerName: 'Rachel Green',
    customers: 15
  },
  {
    id: '5',
    name: 'Eilat',
    agents: 2,
    offices: 1,
    revenue: 320000,
    growth: 5,
    targetRevenue: 400000,
    coordinates: { x: 180, y: 500 },
    description: 'Southern resort city with tourism focus',
    managerName: 'Daniel Ben',
    customers: 12
  }
];

const generateAgentData = (regionId: string, count: number) => {
  const roles = ['Senior Agent', 'Agent', 'Junior Agent', 'Trainee'];
  return Array.from({ length: count }).map((_, index) => ({
    id: `agent-${regionId}-${index}`,
    name: `Agent ${index + 1}`,
    email: `agent${index + 1}@example.com`,
    phone: `+972-${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 10000000)}`,
    role: roles[index % roles.length],
    status: index % 5 === 0 ? 'inactive' : 'active',
    performance: Math.round(70 + Math.random() * 30),
    revenue: Math.round(50000 + Math.random() * 100000),
    customers: Math.round(5 + Math.random() * 15),
    hireDate: new Date(Date.now() - Math.random() * 31536000000 * 2).toLocaleDateString(),
    avatar_url: ''
  }));
};

const RegionalManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isRegionDialogOpen, setIsRegionDialogOpen] = useState(false);
  const [regionToEdit, setRegionToEdit] = useState<any | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<any | null>(null);
  const [isAgentDetailsOpen, setIsAgentDetailsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);
  
  const filteredRegions = mockRegions.filter(region => 
    region.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (selectedFilter === 'all' || 
      (selectedFilter === 'high-growth' && region.growth > 10) ||
      (selectedFilter === 'target-exceeded' && region.revenue > region.targetRevenue) ||
      (selectedFilter === 'expansion' && region.agents < 5))
  );
  
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleOpenMap = () => {
    setIsMapOpen(true);
  };
  
  const handleCloseMap = () => {
    setIsMapOpen(false);
  };
  
  const handleAddRegion = () => {
    setRegionToEdit(null);
    setIsRegionDialogOpen(true);
  };
  
  const handleEditRegion = (region: any) => {
    setRegionToEdit(region);
    setIsRegionDialogOpen(true);
  };
  
  const handleSaveRegion = (region: any) => {
    console.log('Saving region:', region);
    setIsRegionDialogOpen(false);
  };

  const handleViewDetails = (region: any) => {
    setSelectedRegion(region);
    setIsDetailsDialogOpen(true);
  };
  
  const handleViewAgent = (agent: any) => {
    setSelectedAgent(agent);
    setIsAgentDetailsOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            className="pl-10" 
            placeholder="Search regions..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Regions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  onClick={() => handleFilterChange('all')}
                  className={selectedFilter === 'all' ? 'bg-blue-50 text-blue-700' : ''}
                >
                  <span className="flex-1">All Regions</span>
                  {selectedFilter === 'all' && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleFilterChange('high-growth')}
                  className={selectedFilter === 'high-growth' ? 'bg-blue-50 text-blue-700' : ''}
                >
                  <span className="flex-1">High Growth Regions (&gt;10%)</span>
                  {selectedFilter === 'high-growth' && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleFilterChange('target-exceeded')}
                  className={selectedFilter === 'target-exceeded' ? 'bg-blue-50 text-blue-700' : ''}
                >
                  <span className="flex-1">Target Exceeded</span>
                  {selectedFilter === 'target-exceeded' && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleFilterChange('expansion')}
                  className={selectedFilter === 'expansion' ? 'bg-blue-50 text-blue-700' : ''}
                >
                  <span className="flex-1">Expansion Opportunities</span>
                  {selectedFilter === 'expansion' && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="bg-white border rounded-md p-1 flex">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Button onClick={handleOpenMap} className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Map View
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            onClick={handleAddRegion}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Region
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full mb-6" />
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRegions.map(region => (
            <Card 
              key={region.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                    {region.name} Region
                  </h3>
                  <Badge variant="outline" className={
                    region.growth > 15 ? 'bg-green-100 text-green-800 border-green-200' :
                    region.growth > 5 ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    'bg-gray-100 text-gray-800 border-gray-200'
                  }>
                    {region.growth > 0 ? `+${region.growth}%` : `${region.growth}%`}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {region.description || 'No description available'}
                </p>
                
                <div className="grid grid-cols-2 gap-y-3 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">Agents: {region.agents}</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-purple-600" />
                    <span className="text-sm">{region.offices} Offices</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">₪{(region.revenue / 1000).toFixed(0)}K Revenue</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-amber-600" />
                    <span className="text-sm">{Math.round((region.revenue / region.targetRevenue) * 100)}% of Target</span>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    Manager: <span className="font-medium">{region.managerName}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditRegion(region)}>Edit</Button>
                    <Button size="sm" onClick={() => handleViewDetails(region)}>Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium border-b">
            <div className="col-span-3">Region</div>
            <div className="col-span-2 text-center">Agents</div>
            <div className="col-span-2 text-center">Revenue</div>
            <div className="col-span-2 text-center">Growth</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>
          <div className="divide-y">
            {filteredRegions.map(region => (
              <div key={region.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50">
                <div className="col-span-3">
                  <div className="font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                    {region.name}
                  </div>
                  <div className="text-xs text-gray-500">Manager: {region.managerName}</div>
                </div>
                <div className="col-span-2 text-center">{region.agents}</div>
                <div className="col-span-2 text-center">₪{(region.revenue / 1000).toFixed(0)}K</div>
                <div className="col-span-2 text-center">
                  <Badge variant="outline" className={
                    region.growth > 15 ? 'bg-green-100 text-green-800 border-green-200' :
                    region.growth > 5 ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    'bg-gray-100 text-gray-800 border-gray-200'
                  }>
                    {region.growth > 0 ? `+${region.growth}%` : `${region.growth}%`}
                  </Badge>
                </div>
                <div className="col-span-3 flex justify-end gap-2">
                  <Button variant="outline" size="sm">Agents</Button>
                  <Button variant="outline" size="sm">Offices</Button>
                  <Button size="sm" onClick={() => handleViewDetails(region)}>Details</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {filteredRegions.length === 0 && (
        <div className="bg-white border rounded-lg p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium mb-1">No regions found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? "No regions match your search criteria" : "There are no regions defined yet"}
          </p>
          <Button onClick={handleAddRegion}>
            <Plus className="h-4 w-4 mr-2" />
            Add a Region
          </Button>
        </div>
      )}
      
      <RegionalMap 
        isOpen={isMapOpen}
        onClose={handleCloseMap}
        regions={mockRegions}
      />
      
      <RegionDialog 
        isOpen={isRegionDialogOpen}
        onClose={() => setIsRegionDialogOpen(false)}
        region={regionToEdit || undefined}
        onSave={handleSaveRegion}
      />

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              {selectedRegion?.name} Region Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedRegion && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Agents</h3>
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-blue-700">{selectedRegion.agents}</div>
                    <div className="text-sm text-blue-600 mt-1">Active Sales Agents</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Offices</h3>
                      <Building className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-purple-700">{selectedRegion.offices}</div>
                    <div className="text-sm text-purple-600 mt-1">Regional Locations</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Revenue</h3>
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-700">₪{(selectedRegion.revenue / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-green-600 mt-1">
                      {selectedRegion.growth && selectedRegion.growth > 0 ? 
                        `+${selectedRegion.growth}% vs last year` : 
                        "Annual revenue"}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">
                    <Info className="h-4 w-4 mr-2" />
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="agents">
                    <User className="h-4 w-4 mr-2" />
                    Agents
                  </TabsTrigger>
                  <TabsTrigger value="offices">
                    <Building className="h-4 w-4 mr-2" />
                    Offices
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Region Description</h3>
                    <p className="text-gray-600">{selectedRegion.description || 'No description available'}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Regional Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-500">Manager</span>
                          <span className="font-medium">{selectedRegion.managerName || 'Not assigned'}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-500">Customers</span>
                          <span className="font-medium">{selectedRegion.customers || 0}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-500">Target Revenue</span>
                          <span className="font-medium">₪{(selectedRegion.targetRevenue / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-gray-500">Growth Rate</span>
                          <span className="font-medium">{selectedRegion.growth || 0}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Performance Metrics</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Revenue Target Progress</span>
                            <span className="text-sm font-medium">
                              {Math.round((selectedRegion.revenue / selectedRegion.targetRevenue) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${Math.round((selectedRegion.revenue / selectedRegion.targetRevenue) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="agents" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Sales Agents in {selectedRegion.name}</h3>
                    <div className="bg-white border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 text-sm font-medium border-b">
                        <div className="col-span-4">Name</div>
                        <div className="col-span-3">Role</div>
                        <div className="col-span-3">Performance</div>
                        <div className="col-span-2 text-right">Actions</div>
                      </div>
                      <div className="divide-y">
                        {generateAgentData(selectedRegion.id, selectedRegion.agents).map((agent, index) => (
                          <div key={agent.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                            <div className="col-span-4 font-medium">{agent.name}</div>
                            <div className="col-span-3">{agent.role}</div>
                            <div className="col-span-3">
                              <div className="flex items-center gap-2">
                                <div className="bg-blue-100 h-2 w-24 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-blue-600 h-full rounded-full" 
                                    style={{ width: `${agent.performance}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">{agent.performance}%</span>
                              </div>
                            </div>
                            <div className="col-span-2 text-right">
                              <Button size="sm" variant="outline" onClick={() => handleViewAgent(agent)}>View</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="offices" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Offices in {selectedRegion.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array.from({ length: selectedRegion.offices }).map((_, index) => (
                        <Card key={index}>
                          <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-medium">{selectedRegion.name} Office {index + 1}</h3>
                              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                                Active
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mb-3">
                              {selectedRegion.name} District, Main Street {100 + index}
                            </p>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Staff</span>
                                <span>{Math.floor(selectedRegion.agents / selectedRegion.offices) + (index === 0 ? selectedRegion.agents % selectedRegion.offices : 0)} employees</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Phone</span>
                                <span>+972-{Math.floor(Math.random() * 10)}-{Math.floor(Math.random() * 10000000)}</span>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button size="sm" variant="outline">View Details</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={isAgentDetailsOpen} onOpenChange={setIsAgentDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Agent Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about the selected agent
            </DialogDescription>
          </DialogHeader>
          
          {selectedAgent && (
            <div className="space-y-6 py-4">
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full h-24 w-24 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedAgent.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{selectedAgent.name}</h2>
                  <p className="text-gray-500 mb-3">{selectedAgent.role}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedAgent.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedAgent.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Joined: {selectedAgent.hireDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Badge 
                        variant="outline" 
                        className={selectedAgent.status === 'active' ? 
                          'bg-green-100 text-green-800 border-green-200' : 
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }
                      >
                        {selectedAgent.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Performance</h3>
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-blue-700">{selectedAgent.performance}%</div>
                    <div className="w-full bg-blue-100 h-2 rounded-full mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${selectedAgent.performance}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Revenue</h3>
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-700">₪{(selectedAgent.revenue / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-green-600 mt-1">Last 12 months</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Customers</h3>
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-purple-700">{selectedAgent.customers}</div>
                    <div className="text-sm text-purple-600 mt-1">Active accounts</div>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="performance" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="performance">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Performance
                  </TabsTrigger>
                  <TabsTrigger value="customers">
                    <User className="h-4 w-4 mr-2" />
                    Customers
                  </TabsTrigger>
                  <TabsTrigger value="documents">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="performance" className="space-y-4">
                  <div className="h-80 bg-slate-50 rounded-md border border-dashed flex items-center justify-center">
                    <p className="text-muted-foreground">Performance chart visualization would appear here</p>
                  </div>
                  
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-medium mb-3">Monthly Performance Metrics</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Deals Closed</span>
                            <span className="text-sm font-medium">78%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Customer Satisfaction</span>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Response Time</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="customers" className="space-y-4">
                  <Card>
                    <CardContent className="p-0">
                      <div className="p-4 border-b">
                        <h3 className="font-medium">Customer List</h3>
                      </div>
                      <div className="p-0">
                        <DataTable
                          data={Array.from({ length: selectedAgent.customers }).map((_, i) => ({
                            id: `customer-${i}`,
                            name: `Customer ${i + 1}`,
                            status: i % 5 === 0 ? 'inactive' : 'active',
                            revenue: `₪${(Math.random() * 100000).toFixed(0)}`,
                            lastContact: new Date(Date.now() - Math.random() * 7776000000).toLocaleDateString()
                          }))}
                          onRowClick={(row) => console.log("Customer clicked:", row)}
                          emptyMessage="No customers found."
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <Card>
                    <CardContent className="p-0">
                      <div className="p-4 border-b">
                        <h3 className="font-medium">Recent Documents</h3>
                      </div>
                      <div className="divide-y">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="p-4 flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-blue-600 mr-3" />
                              <div>
                                <h4 className="font-medium">Document {i + 1}</h4>
                                <p className="text-sm text-gray-500">Added on {new Date(Date.now() - i * 86400000).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAgentDetailsOpen(false)}>Close</Button>
                <Button>Edit Agent</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegionalManagement;
