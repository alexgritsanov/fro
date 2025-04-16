import React, { useState, useEffect, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { getAllCompanies, updateCompanyStatus, deleteCompany } from '@/services/api/companiesApi';
import { Company } from '@/types/company';
import { OfficeActionProps } from './types';

// Import subcomponents
import OfficeTable from './OfficeTable';
import OfficeGrid from './OfficeGrid';
import OfficeFilters from './OfficeFilters';
import OfficeDetailModal from './OfficeDetailModal';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import PaginationControls from './PaginationControls';
import ViewToggle from './ViewToggle';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';

const OfficeManagement: React.FC<OfficeActionProps> = ({
  onCreateOffice,
  onEditOffice,
  onManageUsers,
  onManageUserLimits
}) => {
  // State declarations
  const [offices, setOffices] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffices, setSelectedOffices] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [selectedOffice, setSelectedOffice] = useState<Company | null>(null);
  const [showOfficeDetails, setShowOfficeDetails] = useState(false);
  const [locationFilter, setLocationFilter] = useState('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('all');
  const [userLimitFilter, setUserLimitFilter] = useState('all');
  
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [officeToDelete, setOfficeToDelete] = useState<Company | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initial data fetching
  useEffect(() => {
    fetchOffices();
  }, []);

  // Derived data
  const uniqueLocations = ['all', ...Array.from(new Set(offices.map(office => office.location).filter(Boolean)))];
  const uniqueServiceTypes = ['all', ...Array.from(new Set(offices.map(office => office.service_type).filter(Boolean)))];

  // Fetch offices data with error handling
  const fetchOffices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const companies = await getAllCompanies();
      setOffices(companies);
    } catch (error) {
      console.error('Error fetching offices:', error);
      setError('Failed to load offices. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to load offices. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtered offices based on search and filters
  const filteredOffices = offices.filter(office => {
    if (activeFilter === 'active' && office.status !== 'active') return false;
    if (activeFilter === 'inactive' && office.status !== 'inactive') return false;
    if (locationFilter !== 'all' && office.location !== locationFilter) return false;
    if (serviceTypeFilter !== 'all' && office.service_type !== serviceTypeFilter) return false;
    if (userLimitFilter === 'small' && (office.user_limit || 0) > 100) return false;
    if (userLimitFilter === 'medium' && ((office.user_limit || 0) <= 100 || (office.user_limit || 0) > 300)) return false;
    if (userLimitFilter === 'large' && (office.user_limit || 0) <= 300) return false;
    
    const searchFields = [
      office.name, 
      office.service_type, 
      office.location, 
      office.office_email, 
      office.company_id
    ].filter(Boolean).map(field => field?.toLowerCase() || '');
    
    return searchTerm === '' || searchFields.some(field => field.includes(searchTerm.toLowerCase()));
  });

  // Paginated offices for current page
  const paginatedOffices = filteredOffices.slice(
    (currentPage - 1) * itemsPerPage, 
    (currentPage - 1) * itemsPerPage + itemsPerPage
  );

  // Event handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOffices(paginatedOffices.map(office => office.id));
    } else {
      setSelectedOffices([]);
    }
  };

  const handleSelectOffice = (id: string) => {
    if (selectedOffices.includes(id)) {
      setSelectedOffices(selectedOffices.filter(officeId => officeId !== id));
    } else {
      setSelectedOffices([...selectedOffices, id]);
    }
  };

  const handleToggleStatus = async (office: Company) => {
    try {
      const newStatus = office.status === 'active' ? 'inactive' : 'active';
      
      // Optimistic update
      setOffices(offices.map(o => 
        o.id === office.id ? { ...o, status: newStatus } : o
      ));
      
      await updateCompanyStatus(office.id, newStatus);
      
      toast({
        title: "Status updated",
        description: `${office.name} is now ${newStatus}`,
        variant: newStatus === 'active' ? "success" : "destructive"
      });
    } catch (error) {
      // Revert on error
      setOffices(offices.map(o => 
        o.id === office.id ? { ...o, status: office.status } : o
      ));
      
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchOffices();
      toast({
        title: "Data refreshed",
        description: "Office list has been updated",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Could not refresh data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleViewOffice = (office: Company) => {
    setSelectedOffice(office);
    setShowOfficeDetails(true);
  };

  const handleDeleteOffice = (office: Company) => {
    setOfficeToDelete(office);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteOffice = async () => {
    if (!officeToDelete) return;
    
    try {
      setIsDeleting(true);
      
      // Сначала делаем API-запрос
      await deleteCompany(officeToDelete.id);
      
      // После успешного ответа обновляем UI
      setOffices(prevOffices => prevOffices.filter(o => o.id !== officeToDelete.id));
      
      toast({
        title: "Office deleted",
        description: `${officeToDelete.name} has been deleted`,
        variant: "success"
      });
      
      // Reset page if necessary
      if (paginatedOffices.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      
      // Reset selection state
      setSelectedOffices(prevSelected => 
        prevSelected.filter(id => id !== officeToDelete.id)
      );
    } catch (error) {
      console.error('Error deleting office:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete office. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setOfficeToDelete(null);
      setShowDeleteConfirmation(false);
    }
  };

  const handleExport = () => {
    toast({
      title: "Export initiated",
      description: "Your export is being prepared and will download shortly",
      variant: "default"
    });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveFilter('all');
    setLocationFilter('all');
    setServiceTypeFilter('all');
    setUserLimitFilter('all');
    toast({
      description: "Filters have been reset"
    });
  };

  // Render states
  if (error && !isRefreshing) {
    return <EmptyState error={error} isRefreshing={isRefreshing} handleRefresh={handleRefresh} />;
  }

  if (loading && !isRefreshing) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Office Management</h2>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100">
            {filteredOffices.length} Offices
          </Badge>
        </div>
        
        <ViewToggle 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          handleRefresh={handleRefresh} 
          isRefreshing={isRefreshing} 
        />
      </div>
      
      <OfficeFilters 
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        serviceTypeFilter={serviceTypeFilter}
        setServiceTypeFilter={setServiceTypeFilter}
        userLimitFilter={userLimitFilter}
        setUserLimitFilter={setUserLimitFilter}
        uniqueLocations={uniqueLocations}
        uniqueServiceTypes={uniqueServiceTypes}
        handleResetFilters={handleResetFilters}
        handleExport={handleExport}
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {viewMode === 'table' ? (
          <OfficeTable 
            offices={offices}
            loading={loading}
            selectedOffices={selectedOffices}
            onSelectOffice={handleSelectOffice}
            onSelectAll={handleSelectAll}
            onToggleStatus={handleToggleStatus}
            onDeleteOffice={handleDeleteOffice}
            onViewOffice={handleViewOffice}
            searchTerm={searchTerm}
            activeFilter={activeFilter}
            locationFilter={locationFilter}
            serviceTypeFilter={serviceTypeFilter}
            userLimitFilter={userLimitFilter}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            viewMode={viewMode}
            paginatedOffices={paginatedOffices}
            onCreateOffice={onCreateOffice}
            onEditOffice={onEditOffice}
            onManageUsers={onManageUsers}
            onManageUserLimits={onManageUserLimits}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <OfficeGrid 
              offices={offices}
              loading={loading}
              selectedOffices={selectedOffices}
              onSelectOffice={handleSelectOffice}
              onSelectAll={handleSelectAll}
              onToggleStatus={handleToggleStatus}
              onDeleteOffice={handleDeleteOffice}
              onViewOffice={handleViewOffice}
              searchTerm={searchTerm}
              activeFilter={activeFilter}
              locationFilter={locationFilter}
              serviceTypeFilter={serviceTypeFilter}
              userLimitFilter={userLimitFilter}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              viewMode={viewMode}
              paginatedOffices={paginatedOffices}
              onCreateOffice={onCreateOffice}
              onEditOffice={onEditOffice}
              onManageUsers={onManageUsers}
              onManageUserLimits={onManageUserLimits}
            />
          </div>
        )}
      </div>
      
      <PaginationControls 
        filteredOffices={filteredOffices}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
      
      <OfficeDetailModal 
        key="office-detail-modal"
        showOfficeDetails={showOfficeDetails}
        setShowOfficeDetails={setShowOfficeDetails}
        selectedOffice={selectedOffice}
        onManageUsers={onManageUsers}
        onEditOffice={onEditOffice}
      />
      
      <DeleteConfirmationDialog 
        key="delete-confirmation-dialog"
        showDeleteConfirmation={showDeleteConfirmation}
        setShowDeleteConfirmation={setShowDeleteConfirmation}
        officeToDelete={officeToDelete}
        confirmDeleteOffice={confirmDeleteOffice}
        isDeleting={isDeleting}
      />
    </div>
  );
};


export default OfficeManagement;
