import React, { useState, useEffect } from 'react';
import { X, Map, Info, MapPin, User, Building, DollarSign, ChevronDown, ChevronUp, Users, List, Grid, Search, Eye, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import RegionDialog from './RegionDialog';
import { toast } from 'sonner';

interface RegionData {
  id: string;
  name: string;
  agents: number;
  offices: number;
  revenue: number;
  coordinates: { x: number; y: number };
  description: string;
  managerName?: string;
  targetRevenue?: number;
  growth?: number;
  customers?: number;
}

interface RegionalMapProps {
  isOpen: boolean;
  onClose: () => void;
  regions: RegionData[];
}

const RegionalMap = ({ isOpen, onClose, regions }: RegionalMapProps) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [isRegionDetailsOpen, setIsRegionDetailsOpen] = useState(false);
  const [isRegionDialogOpen, setIsRegionDialogOpen] = useState(false);
  const [regionToEdit, setRegionToEdit] = useState<RegionData | null>(null);
  const [activeTab, setActiveTab] = useState('map');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [detailsActiveTab, setDetailsActiveTab] = useState('details');
  
  const enhancedRegions: RegionData[] = [
    {
      id: '1',
      name: 'Tel Aviv',
      agents: 12,
      offices: 3,
      revenue: 1250000,
      coordinates: { x: 150, y: 200 },
      description: 'Central coastal region with high density of tech companies',
      managerName: 'Sarah Miller',
      targetRevenue: 1500000,
      growth: 15,
      customers: 45
    },
    {
      id: '2',
      name: 'Jerusalem',
      agents: 8,
      offices: 2,
      revenue: 980000,
      coordinates: { x: 200, y: 220 },
      description: 'Capital region with diverse business opportunities',
      managerName: 'David Cohen',
      targetRevenue: 1200000,
      growth: 8,
      customers: 32
    },
    {
      id: '3',
      name: 'Haifa',
      agents: 6,
      offices: 1,
      revenue: 750000,
      coordinates: { x: 140, y: 120 },
      description: 'Northern port city with industrial focus',
      managerName: 'Michael Levy',
      targetRevenue: 850000,
      growth: 12,
      customers: 28
    },
    {
      id: '4',
      name: 'Beer Sheva',
      agents: 4,
      offices: 1,
      revenue: 420000,
      coordinates: { x: 160, y: 350 },
      description: 'Southern hub with emerging tech presence',
      managerName: 'Rachel Green',
      targetRevenue: 500000,
      growth: 20,
      customers: 15
    },
    {
      id: '5',
      name: 'Eilat',
      agents: 2,
      offices: 1,
      revenue: 320000,
      coordinates: { x: 180, y: 500 },
      description: 'Southern resort city with tourism focus',
      managerName: 'Daniel Ben',
      targetRevenue: 400000,
      growth: 5,
      customers: 12
    }
  ];
  
  const filteredRegions = enhancedRegions.filter(regionItem => 
    regionItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleRegionClick = (regionItem: RegionData) => {
    setSelectedRegion(regionItem);
  };
  
  const handleRegionHover = (regionId: string | null) => {
    setHoveredRegion(regionId);
  };
  
  const handleOpenRegionDetails = () => {
    if (selectedRegion) {
      setIsRegionDetailsOpen(true);
    }
  };
  
  const handleCloseRegionDetails = () => {
    setIsRegionDetailsOpen(false);
  };
  
  const handleAddRegion = () => {
    setRegionToEdit(null);
    setIsRegionDialogOpen(true);
  };
  
  const handleEditRegion = (regionItem: RegionData) => {
    setRegionToEdit(regionItem);
    setIsRegionDialogOpen(true);
  };
  
  const handleSaveRegion = (regionItem: RegionData) => {
    console.log('Saving region:', regionItem);
    toast.success(`Region "${regionItem.name}" saved successfully`);
    setIsRegionDialogOpen(false);
  };

  const handleViewAgents = (regionItem: RegionData) => {
    setSelectedRegion(regionItem);
    setIsRegionDetailsOpen(true);
    setDetailsActiveTab('agents');
  };

  const handleViewOffices = (regionItem: RegionData) => {
    setSelectedRegion(regionItem);
    setIsRegionDetailsOpen(true);
    setDetailsActiveTab('offices');
  };
  
  const getRegionFill = (regionItem: RegionData) => {
    if (selectedRegion?.id === regionItem.id) return '#3366FF';
    if (hoveredRegion === regionItem.id) return '#6690FF';
    
    const maxRevenue = Math.max(...enhancedRegions.map(r => r.revenue));
    const minRevenue = Math.min(...enhancedRegions.map(r => r.revenue));
    const normalizedRevenue = (regionItem.revenue - minRevenue) / (maxRevenue - minRevenue);
    
    const r = Math.round(230 - normalizedRevenue * 140);
    const g = Math.round(242 - normalizedRevenue * 90);
    const b = Math.round(255 - normalizedRevenue * 50);
    
    return `rgb(${r},${g},${b})`;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] h-[80vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 py-4 bg-white border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl flex items-center">
              <Map className="h-5 w-5 mr-2 text-blue-600" />
              Regional Management
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mr-2">
                <TabsList>
                  <TabsTrigger value="map" className="px-3">
                    <Map className="h-4 w-4 mr-2" />
                    Map
                  </TabsTrigger>
                  <TabsTrigger value="regions" className="px-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    Regions
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button
                variant="outline"
                size="sm"
                className="mr-2"
                onClick={handleAddRegion}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Region
              </Button>
              
              <DialogClose asChild>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>
        
        <div className="relative flex-grow overflow-hidden">
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="map" className="absolute inset-0 m-0">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-blue-100">
                <svg 
                  viewBox="0 0 300 600" 
                  className="w-full h-full"
                  style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
                >
                  <defs>
                    <radialGradient id="oceanGradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                      <stop offset="0%" stopColor="#cee8fa" />
                      <stop offset="100%" stopColor="#90c4e8" />
                    </radialGradient>
                  </defs>
                  
                  <rect x="0" y="0" width="300" height="600" fill="url(#oceanGradient)" />
                  
                  <path 
                    d="M100,50 L150,30 L200,50 L220,100 L230,200 L250,300 L220,400 L180,450 L150,500 L120,550 L100,500 L80,400 L90,300 L70,200 L80,100 Z" 
                    fill="#e8f4fc" 
                    stroke="#90c4e8" 
                    strokeWidth="2"
                  />
                  
                  <text x="30" y="250" fill="#4a88c5" fontSize="16" fontWeight="bold" opacity="0.7">Mediterranean Sea</text>
                  
                  <ellipse cx="235" cy="320" rx="15" ry="50" fill="#a3d5f7" stroke="#90c4e8" strokeWidth="1" />
                  <text x="230" y="320" fill="#4a88c5" fontSize="10" fontWeight="bold" opacity="0.7" transform="rotate(90 230,320)">Dead Sea</text>
                  
                  <path 
                    d="M150,120 L190,150 L200,250 L150,280 L120,200 Z" 
                    fill="none" 
                    stroke="#ccc" 
                    strokeWidth="1" 
                    strokeDasharray="5,5"
                  />
                  <path 
                    d="M150,280 L200,250 L190,350 L150,380 L120,330 Z" 
                    fill="none" 
                    stroke="#ccc" 
                    strokeWidth="1" 
                    strokeDasharray="5,5"
                  />
                  <path 
                    d="M150,380 L190,350 L170,450 L140,480 L120,440 Z" 
                    fill="none" 
                    stroke="#ccc" 
                    strokeWidth="1" 
                    strokeDasharray="5,5"
                  />
                  
                  <circle cx="150" cy="200" r="3" fill="#3366FF" />
                  <text x="155" y="200" fontSize="10" fill="#1a1f36">Tel Aviv</text>
                  
                  <circle cx="180" cy="220" r="3" fill="#3366FF" />
                  <text x="185" y="220" fontSize="10" fill="#1a1f36">Jerusalem</text>
                  
                  <circle cx="140" cy="120" r="3" fill="#3366FF" />
                  <text x="145" y="120" fontSize="10" fill="#1a1f36">Haifa</text>
                  
                  <circle cx="160" cy="350" r="3" fill="#3366FF" />
                  <text x="165" y="350" fontSize="10" fill="#1a1f36">Beer Sheva</text>
                  
                  <circle cx="150" cy="500" r="3" fill="#3366FF" />
                  <text x="155" y="500" fontSize="10" fill="#1a1f36">Eilat</text>
                  
                  {enhancedRegions.map(regionItem => (
                    <g
                      key={regionItem.id}
                      transform={`translate(${regionItem.coordinates.x}, ${regionItem.coordinates.y})`}
                      onClick={() => handleRegionClick(regionItem)}
                      onMouseEnter={() => handleRegionHover(regionItem.id)}
                      onMouseLeave={() => handleRegionHover(null)}
                      className="cursor-pointer transition-all duration-300"
                      style={{ transform: `translate(${regionItem.coordinates.x}px, ${regionItem.coordinates.y}px) scale(${selectedRegion?.id === regionItem.id || hoveredRegion === regionItem.id ? 1.2 : 1})` }}
                    >
                      {(selectedRegion?.id === regionItem.id) && (
                        <circle 
                          r="20" 
                          fill="#3366FF" 
                          opacity="0.2"
                          className="animate-pulse"
                        />
                      )}
                      
                      <circle 
                        r="12" 
                        fill={getRegionFill(regionItem)}
                        stroke="#fff" 
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />
                      
                      <circle 
                        r={6 + (regionItem.agents / 5)}
                        fill="none"
                        stroke="#fff" 
                        strokeWidth="1"
                        strokeDasharray="2,2"
                        opacity="0.7"
                        className="transition-all duration-300"
                      />
                      
                      <circle 
                        r="4" 
                        fill="#fff"
                      />
                      
                      {(selectedRegion?.id === regionItem.id || hoveredRegion === regionItem.id) && (
                        <>
                          <rect
                            x="-40"
                            y="16"
                            width="80"
                            height="36"
                            rx="4"
                            fill="white"
                            opacity="0.9"
                            stroke="#ddd"
                          />
                          <text 
                            y="30" 
                            textAnchor="middle" 
                            fontSize="10" 
                            fontWeight="bold" 
                            fill="#1a1f36"
                          >
                            {regionItem.name}
                          </text>
                          <text 
                            y="45" 
                            textAnchor="middle" 
                            fontSize="8" 
                            fill="#6E7891"
                          >
                            {regionItem.agents} Agents • ₪{(regionItem.revenue / 1000).toFixed(0)}K
                          </text>
                        </>
                      )}
                    </g>
                  ))}
                </svg>
              </div>
              
              <AnimatePresence>
                {selectedRegion && (
                  <motion.div 
                    className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                        {selectedRegion.name} Region
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => setSelectedRegion(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <p className="text-sm text-gray-600">{selectedRegion.description || 'No description available'}</p>
                      
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="text-sm">{selectedRegion.agents} Agents</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-purple-600" />
                          <span className="text-sm">{selectedRegion.offices} Offices</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-sm">₪{(selectedRegion.revenue / 1000).toFixed(0)}K Revenue</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-orange-600" />
                          <span className="text-sm">{selectedRegion.customers || 0} Customers</span>
                        </div>
                      </div>
                      
                      {selectedRegion.managerName && (
                        <div className="pt-2 mt-2 border-t border-gray-100">
                          <div className="text-xs text-gray-500">Regional Manager</div>
                          <div className="font-medium">{selectedRegion.managerName}</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditRegion(selectedRegion)}>
                        Edit
                      </Button>
                      <Button size="sm" onClick={handleOpenRegionDetails}>
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">Click on a region marker for details</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 rounded-lg shadow-lg p-3 max-w-[180px]">
                <h4 className="text-sm font-medium mb-2">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                    <span>Selected Region</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                    <span>Region</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 border border-dashed border-gray-400 rounded-full mr-2"></div>
                    <span>Agent Density</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="regions" className="absolute inset-0 m-0 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search regions..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2 items-center">
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
                    
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleAddRegion}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Region
                    </Button>
                  </div>
                </div>
                
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRegions.map((regionItem) => (
                      <Card 
                        key={regionItem.id}
                        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleRegionClick(regionItem)}
                      >
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-lg flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                              {regionItem.name}
                            </h3>
                            <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                              Region
                            </Badge>
                          </div>
                          
                          {regionItem.description && (
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{regionItem.description}</p>
                          )}
                          
                          <div className="grid grid-cols-2 gap-y-3 mb-3">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-blue-600" />
                              <span className="text-sm">{regionItem.agents} Agents</span>
                            </div>
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-2 text-purple-600" />
                              <span className="text-sm">{regionItem.offices} Offices</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                              <span className="text-sm">₪{(regionItem.revenue / 1000).toFixed(0)}K</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-orange-600" />
                              <span className="text-sm">{regionItem.customers || 0} Customers</span>
                            </div>
                          </div>
                          
                          {regionItem.managerName && (
                            <div className="pt-3 mt-3 border-t border-gray-100">
                              <div className="text-xs text-gray-500">Regional Manager</div>
                              <div className="font-medium">{regionItem.managerName}</div>
                            </div>
                          )}
                          
                          <div className="flex justify-end gap-2 mt-4">
                            <Button size="sm" variant="outline" onClick={(e) => {
                              e.stopPropagation();
                              handleEditRegion(regionItem);
                            }}>
                              Edit
                            </Button>
                            <Button size="sm" onClick={(e) => {
                              e.stopPropagation(); 
                              setSelectedRegion(regionItem);
                              handleOpenRegionDetails();
                            }}>
                              Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 text-sm font-medium border-b">
                      <div className="col-span-3">Region</div>
                      <div className="col-span-2 text-center">Agents</div>
                      <div className="col-span-2 text-center">Offices</div>
                      <div className="col-span-2 text-center">Revenue</div>
                      <div className="col-span-3 text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {filteredRegions.map((regionItem) => (
                        <div 
                          key={regionItem.id}
                          className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleRegionClick(regionItem)}
                        >
                          <div className="col-span-3">
                            <div className="font-medium flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                              {regionItem.name}
                            </div>
                            {regionItem.managerName && (
                              <div className="text-xs text-gray-500">
                                Manager: {regionItem.managerName}
                              </div>
                            )}
                          </div>
                          <div className="col-span-2 text-center">{regionItem.agents}</div>
                          <div className="col-span-2 text-center">{regionItem.offices}</div>
                          <div className="col-span-2 text-center">₪{(regionItem.revenue / 1000).toFixed(0)}K</div>
                          <div className="col-span-3 flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewAgents(regionItem);
                              }}
                            >
                              Agents
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewOffices(regionItem);
                              }}
                            >
                              Offices
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation(); 
                                setSelectedRegion(regionItem);
                                handleOpenRegionDetails();
                              }}
                            >
                              Details
                            </Button>
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
                      <Plus className="h-4 w-4 mr-1" />
                      Add a Region
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
      
      <Dialog open={isRegionDetailsOpen} onOpenChange={handleCloseRegionDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              {selectedRegion?.name} Region Details
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Agents</h3>
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-700">{selectedRegion?.agents}</div>
                  <div className="text-sm text-blue-600 mt-1">Active Sales Agents</div>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Offices</h3>
                    <Building className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-700">{selectedRegion?.offices}</div>
                  <div className="text-sm text-purple-600 mt-1">Regional Locations</div>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Revenue</h3>
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-700">₪{(selectedRegion?.revenue! / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-green-600 mt-1">
                    {selectedRegion?.growth && selectedRegion.growth > 0 ? 
                      `+${selectedRegion.growth}% vs last year` : 
                      "Annual revenue"}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs value={detailsActiveTab} onValueChange={setDetailsActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="details">
                  <Info className="h-4 w-4 mr-2" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="agents">
                  <Users className="h-4 w-4 mr-2" />
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
                  <p className="text-gray-600">{selectedRegion?.description || 'No description available'}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Regional Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Manager</span>
                        <span className="font-medium">{selectedRegion?.managerName || 'Not assigned'}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Customers</span>
                        <span className="font-medium">{selectedRegion?.customers || 0}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Target Revenue</span>
                        <span className="font-medium">₪{(selectedRegion?.targetRevenue! / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Growth Rate</span>
                        <span className="font-medium">{selectedRegion?.growth || 0}%</span>
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
                            {Math.round((selectedRegion?.revenue! / selectedRegion?.targetRevenue!) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${Math.round((selectedRegion?.revenue! / selectedRegion?.targetRevenue!) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Agent Utilization</span>
                          <span className="text-sm font-medium">
                            {selectedRegion?.agents ? '75%' : '0%'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-purple-600 h-2.5 rounded-full" 
                            style={{ width: selectedRegion?.agents ? '75%' : '0%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Customer Satisfaction</span>
                          <span className="text-sm font-medium">
                            {selectedRegion?.customers ? '92%' : '0%'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: selectedRegion?.customers ? '92%' : '0%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="agents" className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Users className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-1">Agent Information</h3>
                  <p className="text-gray-500">
                    Detailed agent information will be available here.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="offices" className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Building className="h-10 w-10 text-purple-600 mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-1">Office Information</h3>
                  <p className="text-gray-500">
                    Detailed office information will be available here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {isRegionDialogOpen && (
        <RegionDialog
          isOpen={isRegionDialogOpen}
          onClose={() => setIsRegionDialogOpen(false)}
          onSave={handleSaveRegion}
          region={regionToEdit}
        />
      )}
    </Dialog>
  );
};

export default RegionalMap;
