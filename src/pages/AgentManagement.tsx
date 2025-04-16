
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AgentDashboard from '@/components/agents/AgentDashboard';
import AgentDirectory from '@/components/agents/AgentDirectory';
import RegionalManagement from '@/components/agents/RegionalManagement';
import PerformanceAnalytics from '@/components/agents/PerformanceAnalytics';
import CompensationPlans from '@/components/agents/CompensationPlans';
import OnboardingCompliance from '@/components/agents/OnboardingCompliance';
import AgentCreationModal from '@/components/agents/AgentCreationModal';
import { ScrollArea } from '@/components/ui/scroll-area';

const AgentManagement = () => {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/agents') {
      setActiveTab('overview');
    } else if (path === '/agents/directory') {
      setActiveTab('directory');
    } else if (path === '/agents/regions') {
      setActiveTab('regions');
    } else if (path === '/agents/performance') {
      setActiveTab('performance');
    } else if (path === '/agents/compensation') {
      setActiveTab('compensation');
    } else if (path === '/agents/onboarding') {
      setActiveTab('onboarding');
    }
  }, [location.pathname]);
  
  const handleOpenModal = () => {
    setIsCreationModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsCreationModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <Header 
          title="Agent Management" 
          subtitle="Manage sales agents, performance and compensation"
          className="mb-0"
        />
        
        <Button 
          onClick={handleOpenModal}
          className="flex items-center gap-2 group hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
          <span>Add Agent</span>
        </Button>
      </div>
      
      <div className="mb-6">
        <Tabs value={activeTab} className="w-full">
          <TabsList className="bg-white border border-gray-200 p-1 shadow-sm rounded-xl overflow-x-auto flex-nowrap whitespace-nowrap">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              asChild
            >
              <Link to="/agents">Dashboard</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="directory"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              asChild
            >
              <Link to="/agents/directory">Directory</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="regions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              asChild
            >
              <Link to="/agents/regions">Regional</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="performance"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              asChild
            >
              <Link to="/agents/performance">Performance</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="compensation"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              asChild
            >
              <Link to="/agents/compensation">Compensation</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="onboarding"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
              asChild
            >
              <Link to="/agents/onboarding">Onboarding</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="pr-2">
          <Routes>
            <Route path="/" element={<AgentDashboard />} />
            <Route path="/directory" element={<AgentDirectory />} />
            <Route path="/regions" element={<RegionalManagement />} />
            <Route path="/performance" element={<PerformanceAnalytics />} />
            <Route path="/compensation" element={<CompensationPlans />} />
            <Route path="/onboarding" element={<OnboardingCompliance />} />
            <Route path="*" element={<Navigate to="/agents" replace />} />
          </Routes>
        </div>
      </ScrollArea>
      
      {isMobile && (
        <div className="fixed bottom-20 right-6 z-10">
          <Button 
            variant="default" 
            size="icon" 
            className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl transition-all"
            onClick={handleOpenModal}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      )}
      
      <AgentCreationModal 
        isOpen={isCreationModalOpen} 
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default AgentManagement;
