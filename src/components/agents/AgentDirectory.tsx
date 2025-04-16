
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Users, 
  MapPin, 
  BarChart, 
  DollarSign, 
  UserCheck, 
  MoreHorizontal,
  Eye,
  FileText,
  Building,
  Edit,
  XCircle,
  CheckCircle,
  Grid,
  List
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Avatar from '@/components/Avatar';
import AgentProfilePanel from './AgentProfilePanel';
import OfficesDialog from './OfficesDialog';
import AgentFilterDialog from './AgentFilterDialog';

interface AgentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  status: 'active' | 'pending' | 'inactive' | 'expired';
  offices: number;
  revenue: number;
  plan: 'Starter' | 'Intermediate' | 'Advanced' | 'Premium' | 'Custom';
}

interface Office {
  id: string;
  name: string;
  address: string;
  region: string;
  status: 'active' | 'pending' | 'inactive';
  customersCount: number;
}

const mockAgents: AgentData[] = [
  {
    id: '1',
    name: 'David Cohen',
    email: 'david.cohen@example.com',
    phone: '+972 50-123-4567',
    region: 'Tel Aviv',
    status: 'active',
    offices: 12,
    revenue: 156000,
    plan: 'Premium'
  },
  {
    id: '2',
    name: 'Sarah Goldman',
    email: 'sarah.goldman@example.com',
    phone: '+972 54-987-6543',
    region: 'Jerusalem',
    status: 'active',
    offices: 8,
    revenue: 112000,
    plan: 'Advanced'
  },
  {
    id: '3',
    name: 'Michael Levy',
    email: 'michael.levy@example.com',
    phone: '+972 52-765-4321',
    region: 'Haifa',
    status: 'pending',
    offices: 5,
    revenue: 78000,
    plan: 'Intermediate'
  },
  {
    id: '4',
    name: 'Rachel Stern',
    email: 'rachel.stern@example.com',
    phone: '+972 50-234-5678',
    region: 'Beersheba',
    status: 'inactive',
    offices: 3,
    revenue: 45000,
    plan: 'Starter'
  },
  {
    id: '5',
    name: 'Daniel Rosenberg',
    email: 'daniel.rosenberg@example.com',
    phone: '+972 55-876-5432',
    region: 'Netanya',
    status: 'expired',
    offices: 0,
    revenue: 0,
    plan: 'Custom'
  },
  {
    id: '6',
    name: 'Noa Friedman',
    email: 'noa.friedman@example.com',
    phone: '+972 53-345-6789',
    region: 'Tel Aviv',
    status: 'active',
    offices: 10,
    revenue: 134000,
    plan: 'Premium'
  }
];

// Sample data for offices
const generateOffices = (agentId: string, count: number, region: string): Office[] => {
  return Array.from({ length: count }).map((_, index) => ({
    id: `office-${agentId}-${index}`,
    name: `${region} Office ${index + 1}`,
    address: `${index + 123} Main St, ${region}`,
    region: region,
    status: index % 3 === 0 ? 'pending' : 'active',
    customersCount: Math.floor(Math.random() * 20) + 5
  }));
};

const AgentDirectory = () => {
  const [view, setView] = useState<'cards' | 'table'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOfficesDialogOpen, setIsOfficesDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    regions: [],
    statuses: [],
    plans: [],
    sortBy: 'name',
    revenueMin: 0,
    revenueMax: 500000,
    officesMin: 0,
    officesMax: 20,
  });
  
  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        agent.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = filters.regions.length === 0 || 
                         filters.regions.includes(agent.region);
    
    const matchesStatus = filters.statuses.length === 0 || 
                         filters.statuses.includes(agent.status);
    
    const matchesPlan = filters.plans.length === 0 || 
                       filters.plans.includes(agent.plan);
    
    const matchesRevenue = agent.revenue >= filters.revenueMin && 
                          agent.revenue <= filters.revenueMax;
    
    const matchesOffices = agent.offices >= filters.officesMin && 
                          agent.offices <= filters.officesMax;
    
    return matchesSearch && matchesRegion && matchesStatus && 
           matchesPlan && matchesRevenue && matchesOffices;
  });
  
  // Sort agents based on the selected sort criteria
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (filters.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'revenue-high':
        return b.revenue - a.revenue;
      case 'revenue-low':
        return a.revenue - b.revenue;
      case 'offices':
        return b.offices - a.offices;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const handleViewProfile = (agent: AgentData) => {
    setSelectedAgent(agent);
    setIsProfileOpen(true);
  };
  
  const handleViewOffices = (agent: AgentData) => {
    setSelectedAgent(agent);
    setIsOfficesDialogOpen(true);
  };
  
  const handleAddOffice = () => {
    // This would open the office creation modal
    // For now, it's just a placeholder
    console.log("Add office for agent:", selectedAgent?.name);
  };
  
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };
  
  return (
    <div>
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search agents..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 flex-wrap md:flex-nowrap">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setIsFilterDialogOpen(true)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <div className="flex rounded-md overflow-hidden border">
              <Button 
                variant={view === 'cards' ? 'default' : 'ghost'} 
                className="rounded-none border-0"
                onClick={() => setView('cards')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={view === 'table' ? 'default' : 'ghost'} 
                className="rounded-none border-0"
                onClick={() => setView('table')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {view === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedAgents.map(agent => (
              <Card key={agent.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 flex flex-row items-center space-y-0 gap-3">
                  <Avatar 
                    alt={agent.name} 
                    className="h-12 w-12 border-2 border-white shadow-sm" 
                  />
                  <div className="flex-1">
                    <CardTitle className="text-base">{agent.name}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(agent.status)}
                    >
                      {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleViewProfile(agent)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Agent
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleViewOffices(agent)}>
                        <Building className="h-4 w-4 mr-2" />
                        View Offices
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <FileText className="h-4 w-4 mr-2" />
                        View Agreement
                      </DropdownMenuItem>
                      {agent.status === 'active' ? (
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                          <XCircle className="h-4 w-4 mr-2" />
                          Deactivate
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="cursor-pointer text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Activate
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      {agent.region}
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                      ₪{(agent.revenue / 1000).toFixed(0)}K Revenue
                    </div>
                    <div className="flex items-center text-sm">
                      <Building className="h-4 w-4 mr-2 text-gray-500" />
                      {agent.offices} Offices
                    </div>
                    <div className="flex items-center text-sm">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      {agent.plan} Plan
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleViewOffices(agent)}
                    >
                      Offices
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleViewProfile(agent)}
                    >
                      Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50 rounded-lg">
                <tr>
                  <th className="px-6 py-3">Agent</th>
                  <th className="px-6 py-3">Region</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Offices</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Plan</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedAgents.map(agent => (
                  <tr key={agent.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <Avatar 
                        alt={agent.name} 
                        className="h-8 w-8" 
                      />
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-gray-500">{agent.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{agent.region}</td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(agent.status)}
                      >
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="px-2 underline-offset-4 hover:underline"
                        onClick={() => handleViewOffices(agent)}
                      >
                        {agent.offices}
                      </Button>
                    </td>
                    <td className="px-6 py-4">₪{(agent.revenue / 1000).toFixed(0)}K</td>
                    <td className="px-6 py-4">{agent.plan}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewProfile(agent)}
                        >
                          Profile
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleViewProfile(agent)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleViewOffices(agent)}>
                              <Building className="h-4 w-4 mr-2" />
                              View Offices
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <FileText className="h-4 w-4 mr-2" />
                              View Agreement
                            </DropdownMenuItem>
                            {agent.status === 'active' ? (
                              <DropdownMenuItem className="cursor-pointer text-red-600">
                                <XCircle className="h-4 w-4 mr-2" />
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="cursor-pointer text-green-600">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Activate
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Agent Profile Panel */}
      <AgentProfilePanel 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        agent={selectedAgent}
      />
      
      {/* Offices Dialog */}
      <OfficesDialog
        isOpen={isOfficesDialogOpen}
        onClose={() => setIsOfficesDialogOpen(false)}
        agentName={selectedAgent?.name}
        offices={selectedAgent ? generateOffices(selectedAgent.id, selectedAgent.offices, selectedAgent.region) : []}
        onAddOffice={handleAddOffice}
      />
      
      {/* Filter Dialog */}
      <AgentFilterDialog
        isOpen={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default AgentDirectory;
