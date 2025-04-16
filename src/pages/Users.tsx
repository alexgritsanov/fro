
import React, { useState } from 'react';
import Header from '@/components/Header';
import UserList from '@/components/users/UserList';
import UserModal from '@/components/users/UserModal';
import UserCreationModal from '@/components/users/UserCreationModal';
import { Button } from '@/components/ui/button';
import { Plus, BarChart2 } from 'lucide-react';
import AnalyticsPanel from '@/components/analytics/AnalyticsPanel';
import UserAnalytics from '@/components/analytics/UserAnalytics';
import UserDetails from '@/components/users/UserDetails';
import { toast } from 'sonner';
import { Profile } from '@/services/api/profilesApi';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState('30days');

  const handleOpenModal = () => {
    setIsCreationModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseCreationModal = () => {
    setIsCreationModalOpen(false);
  };

  const handleEditUser = (user: Profile) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  
  const handleViewUser = (user: Profile) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };
  
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  const toggleAnalytics = () => {
    setShowAnalytics(!showAnalytics);
  };
  
  const handleTimeRangeChange = (value: string) => {
    setAnalyticsTimeRange(value);
  };
  
  const handleStatusChange = (userId: string, newStatus: string) => {
    // In a real app, you'd update the status in your database
    // For now, just show a toast notification
    toast.success(`User status updated to ${newStatus}`);
    
    // If the currently selected user is the one being updated, update their status
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({
        ...selectedUser,
        status: newStatus
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <Header 
          title="Users" 
          subtitle="Manage system users, operators and employees"
          className="mb-0"
        />
        
        <div className="flex space-x-2 mt-2 md:mt-0">
          <Button 
            variant="outline" 
            className="hidden md:flex items-center text-cyan-600 border-cyan-200 hover:bg-cyan-50"
            onClick={toggleAnalytics}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          
          <Button onClick={handleOpenModal} variant="default">
            <Plus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>
      </div>
      
      <UserList 
        onEdit={handleEditUser} 
        onViewUser={handleViewUser}
      />
      
      <AnalyticsPanel 
        isOpen={showAnalytics} 
        onClose={toggleAnalytics}
        title="User Analytics"
        onTimeRangeChange={handleTimeRangeChange}
        defaultTimeRange={analyticsTimeRange}
      >
        <UserAnalytics timeRange={analyticsTimeRange} />
      </AnalyticsPanel>
      
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
        />
      )}
      
      {isDetailsModalOpen && (
        <UserDetails
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          user={selectedUser}
          onEdit={() => {
            setIsDetailsModalOpen(false);
            setIsModalOpen(true);
          }}
        />
      )}
      
      {isCreationModalOpen && (
        <UserCreationModal
          isOpen={isCreationModalOpen}
          onClose={handleCloseCreationModal}
        />
      )}
    </div>
  );
};

export default Users;
