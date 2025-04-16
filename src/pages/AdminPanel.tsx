
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart3, Plus, Download, Filter, Search, Building2, Settings, Activity, Users, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import AdminDashboard from '@/components/admin/AdminDashboard';
import OfficeManagement from '@/components/admin/OfficeManagement';
import CreateOfficeModal from '@/components/admin/create-office/CreateOfficeModal';
import EditOfficeModal from '@/components/admin/EditOfficeModal';
import OfficeUserManagement from '@/components/admin/OfficeUserManagement';
import GlobalSettings from '@/components/admin/GlobalSettings';
import UserLimitDialog from '@/components/admin/UserLimitDialog';
import { toast } from '@/components/ui/use-toast';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateOfficeModal, setShowCreateOfficeModal] = useState(false);
  const [showEditOfficeModal, setShowEditOfficeModal] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showUserLimitDialog, setShowUserLimitDialog] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleOpenCreateModal = () => {
    setShowCreateOfficeModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateOfficeModal(false);
    toast({
      title: "Office creation",
      description: "Office creation process was cancelled",
      variant: "default"
    });
  };

  const handleCreateSuccess = () => {
    setShowCreateOfficeModal(false);
    toast({
      title: "Success!",
      description: "New office has been successfully created",
      variant: "success"
    });
  };

  const handleOpenEditModal = (office) => {
    setSelectedOffice(office);
    setShowEditOfficeModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditOfficeModal(false);
    setSelectedOffice(null);
    toast({
      description: "Office editing cancelled",
      variant: "default"
    });
  };

  const handleEditSuccess = () => {
    setShowEditOfficeModal(false);
    setSelectedOffice(null);
    toast({
      title: "Changes saved",
      description: "Office information has been updated successfully",
      variant: "success"
    });
  };

  const handleOpenUserManagement = (office) => {
    setSelectedOffice(office);
    setShowUserManagement(true);
  };

  const handleCloseUserManagement = () => {
    setShowUserManagement(false);
    setSelectedOffice(null);
  };
  
  const handleOpenUserLimitDialog = (office) => {
    setSelectedOffice(office);
    setShowUserLimitDialog(true);
  };
  
  const handleCloseUserLimitDialog = () => {
    setShowUserLimitDialog(false);
  };
  
  const handleUserLimitSave = (limits) => {
    toast({
      title: "User limits updated",
      description: `User limits for ${selectedOffice?.name} have been updated.`,
      variant: "success"
    });
    setShowUserLimitDialog(false);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <Header 
          title="Admin Panel" 
          subtitle="Manage offices, users, and platform settings"
          className="mb-0"
        />
        
        {activeTab === 'offices' && (
          <Button 
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 group hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
            <span>Add Office</span>
          </Button>
        )}
      </div>
      
      <Tabs 
        defaultValue="dashboard" 
        className="w-full" 
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="mb-8 bg-white border border-gray-200 p-1 shadow-sm rounded-xl overflow-hidden">
          <TabsTrigger 
            value="dashboard" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger 
            value="offices" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
          >
            <Building2 className="h-4 w-4 mr-2" />
            Office Management
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
          >
            <Settings className="h-4 w-4 mr-2" />
            Global Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="animate-fade-in">
          <AdminDashboard />
        </TabsContent>
        
        <TabsContent value="offices" className="animate-fade-in">
          <OfficeManagement 
            onCreateOffice={handleOpenCreateModal}
            onEditOffice={handleOpenEditModal}
            onManageUsers={handleOpenUserManagement}
            onManageUserLimits={handleOpenUserLimitDialog}
          />
        </TabsContent>
        
        <TabsContent value="settings" className="animate-fade-in">
          <GlobalSettings />
        </TabsContent>
      </Tabs>
      
      {isMobile && activeTab === 'offices' && (
        <div className="fixed bottom-20 right-6 z-10">
          <Button 
            variant="default" 
            size="icon" 
            className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl transition-all"
            onClick={handleOpenCreateModal}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      )}
      
      <CreateOfficeModal 
        isOpen={showCreateOfficeModal} 
        onClose={handleCloseCreateModal}
        onSuccess={handleCreateSuccess}
      />
      
      <EditOfficeModal 
        isOpen={showEditOfficeModal} 
        onClose={handleCloseEditModal}
        office={selectedOffice}
      />
      
      <OfficeUserManagement
        isOpen={showUserManagement}
        onClose={handleCloseUserManagement}
        office={selectedOffice}
      />
      
      <UserLimitDialog
        isOpen={showUserLimitDialog}
        onClose={handleCloseUserLimitDialog}
        office={selectedOffice}
        onSave={handleUserLimitSave}
      />
    </div>
  );
};

export default AdminPanel;
