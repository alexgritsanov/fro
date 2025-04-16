
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { PlusCircle, FileDown, SlidersHorizontal, BarChart2, Grid, List, Award, Badge, Shield } from 'lucide-react';
import CustomerModal from '@/components/customers/CustomerModal';
import AnalyticsPanel from '@/components/analytics/AnalyticsPanel';
import CustomerAnalytics from '@/components/analytics/CustomerAnalytics';
import EnhancedCustomerList from '@/components/customers/EnhancedCustomerList';
import CustomerTable from '@/components/customers/CustomerTable';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import CustomerDetails from '@/components/customers/CustomerDetails';
import CustomerCreateWizard from '@/components/customers/CustomerCreateWizard';
import SearchAndFilterHeader from '@/components/SearchAndFilterHeader';
import CustomerUserCreationModal from '@/components/customers/CustomerUserCreationModal';
import AgreementNotificationBanner from '@/components/customers/AgreementNotificationBanner';
import AgreementModalWrapper from '@/components/customers/QuoteModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllCustomers, Customer } from '@/services/api/customersApi';

// Define customer rating tiers type
type RatingTier = 'standard' | 'premium' | 'elite';

const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyticsPanelOpen, setIsAnalyticsPanelOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('30days');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ratingFilters, setRatingFilters] = useState<RatingTier[]>([]);
  const [isUserCreationModalOpen, setIsUserCreationModalOpen] = useState(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch customers from API
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
      setError('Failed to load customers. Please try again.');
      toast.error('Failed to load customers', {
        description: 'Please refresh the page or try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get customer rating based on customer ID (consistent hash function)
  const getCustomerRating = (customer: Customer): RatingTier => {
    const hash = customer.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    
    if (hash % 3 === 0) return 'elite';
    if (hash % 3 === 1) return 'premium';
    return 'standard';
  };

  // Handle URL parameters for filtering
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filterParam = searchParams.get('filter');
    
    if (filterParam === 'needs_agreement') {
      setStatusFilter('all'); // Reset status filter
      setRatingFilters([]); // Reset rating filter
      setSearchQuery('needs_quote:true');
    }
  }, [location.search]);

  const filteredCustomers = customers.filter(customer => {
    // Special case for needs_quote filter
    if (searchQuery === 'needs_quote:true') {
      return customer.needs_quote;
    }
    
    // Apply search filter
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (customer.phone && customer.phone.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || customer.status.toLowerCase() === statusFilter.toLowerCase();
    
    // Apply rating filter
    const customerRating = getCustomerRating(customer);
    const matchesRating = ratingFilters.length === 0 || ratingFilters.includes(customerRating);
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const openCreateModal = () => {
    setIsUserCreationModalOpen(true);
  };

  const openEditModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const openCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const closeCreationModal = () => {
    setIsCreationModalOpen(false);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
    setSelectedCustomer(null);
  };

  const closeUserCreationModal = () => {
    setIsUserCreationModalOpen(false);
  };

  const toggleAnalyticsPanel = () => {
    setIsAnalyticsPanelOpen(!isAnalyticsPanelOpen);
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting customers as ${format}`, {
      description: `Your file will be ready for download shortly.`
    });
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    
    if (searchQuery === 'needs_quote:true') {
      setSearchQuery('');
      navigate('/customers');
    }
  };

  const toggleRatingFilter = (rating: RatingTier) => {
    setRatingFilters(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
    
    if (searchQuery === 'needs_quote:true') {
      setSearchQuery('');
      navigate('/customers');
    }
  };
  
  const handleOpenAgreementModal = (customerId: string, customerName: string) => {
    setSelectedCustomerId(customerId);
    setSelectedCustomerName(customerName);
    setIsAgreementModalOpen(true);
  };
  
  const handleCloseAgreementModal = () => {
    setIsAgreementModalOpen(false);
    setSelectedCustomerId(null);
    setSelectedCustomerName(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (searchQuery === 'needs_quote:true' && value) {
      navigate('/customers');
    }
    
    setSearchQuery(value);
  };

  const handleRefresh = async () => {
    await fetchCustomers();
    toast.success('Customer data refreshed');
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <Header 
          title="Customers" 
          subtitle="Manage your customer information and quotes"
          className="mb-0"
        />
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10"
            onClick={toggleAnalyticsPanel}
          >
            <BarChart2 className="h-5 w-5 text-gray-600" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10">
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('CSV')}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('Excel')}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('PDF')}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={openCreateModal}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Customer
          </Button>
        </div>
      </div>
      
      <AgreementNotificationBanner 
        onCreateAgreement={handleOpenAgreementModal}
      />
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Input
              placeholder={searchQuery === 'needs_quote:true' ? "Filtered: Needs Agreement" : "Search customers..."}
              className={cn("pl-10", searchQuery === 'needs_quote:true' ? "bg-amber-50" : "")}
              value={searchQuery === 'needs_quote:true' ? '' : searchQuery}
              onChange={handleSearchChange}
              disabled={searchQuery === 'needs_quote:true'}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </span>
            {searchQuery === 'needs_quote:true' && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1.5 h-7 text-amber-800 hover:text-amber-900 hover:bg-amber-100"
                onClick={() => {
                  setSearchQuery('');
                  navigate('/customers');
                }}
              >
                Clear Filter
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2 justify-end">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleRefresh} 
              className="h-10 w-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(isLoading && "animate-spin")}
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
            </Button>
          
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="md:w-auto">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2 text-sm font-medium">Customer Status</div>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={statusFilter === 'all'}
                  onCheckedChange={() => handleStatusFilterChange('all')}
                >
                  All Customers
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter === 'active'}
                  onCheckedChange={() => handleStatusFilterChange('active')}
                >
                  Active Customers
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter === 'inactive'}
                  onCheckedChange={() => handleStatusFilterChange('inactive')}
                >
                  Inactive Customers
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter === 'prospect'}
                  onCheckedChange={() => handleStatusFilterChange('prospect')}
                >
                  Prospects
                </DropdownMenuCheckboxItem>
                
                <DropdownMenuSeparator />
                <div className="px-3 py-2 text-sm font-medium">Customer Tiers</div>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={ratingFilters.includes('standard')}
                  onCheckedChange={() => toggleRatingFilter('standard')}
                >
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-gray-600" />
                    <span>Standard (10,000/mo)</span>
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={ratingFilters.includes('premium')}
                  onCheckedChange={() => toggleRatingFilter('premium')}
                >
                  <div className="flex items-center">
                    <Badge className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Premium (10,001-50,000/mo)</span>
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={ratingFilters.includes('elite')}
                  onCheckedChange={() => toggleRatingFilter('elite')}
                >
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-amber-600" />
                    <span>Elite (50,000+/mo)</span>
                  </div>
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="border rounded overflow-hidden flex">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn('rounded-none', viewMode === 'grid' ? 'bg-gray-100' : '')} 
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn('rounded-none', viewMode === 'list' ? 'bg-gray-100' : '')} 
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
              <div className="mt-2 text-sm text-red-700">
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {viewMode === 'grid' ? (
          <EnhancedCustomerList
            customers={filteredCustomers}
            isLoading={isLoading}
            onSelectCustomer={openCustomerDetails}
            viewMode={viewMode}
            onCreateCustomer={openCreateModal}
            onCreateAgreement={handleOpenAgreementModal}
          />
        ) : (
          <CustomerTable
            customers={filteredCustomers}
            isLoading={isLoading}
            onSelectCustomer={openCustomerDetails}
          />
        )}
      </div>
      
      {isModalOpen && selectedCustomer && (
        <CustomerModal
          isOpen={isModalOpen}
          onClose={closeModal}
          customer={selectedCustomer}
        />
      )}
      
      {isDetailsOpen && selectedCustomer && (
        <CustomerDetails
          isOpen={isDetailsOpen}
          onClose={closeDetails}
          customer={selectedCustomer}
          onEdit={() => {
            closeDetails();
            openEditModal(selectedCustomer);
          }}
        />
      )}
      
      {isCreationModalOpen && (
        <CustomerCreateWizard
          isOpen={isCreationModalOpen}
          onClose={closeCreationModal}
        />
      )}
      
      {isUserCreationModalOpen && (
        <CustomerUserCreationModal
          isOpen={isUserCreationModalOpen}
          onClose={closeUserCreationModal}
        />
      )}
      
      {isAgreementModalOpen && selectedCustomerId && (
        <AgreementModalWrapper
          isOpen={isAgreementModalOpen}
          onClose={handleCloseAgreementModal}
          customerId={selectedCustomerId}
          customerName={selectedCustomerName || undefined}
        />
      )}
      
      <AnalyticsPanel
        isOpen={isAnalyticsPanelOpen}
        onClose={() => setIsAnalyticsPanelOpen(false)}
        title="Customer Analytics"
        defaultTimeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      >
        <CustomerAnalytics timeRange={timeRange} />
      </AnalyticsPanel>
    </div>
  );
};

export default Customers;
