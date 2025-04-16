import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  Filter, 
  Plus, 
  Search, 
  BarChart2, 
  ChevronDown,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  RefreshCw,
  LayoutGrid,
  List,
  X,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isValid } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockAgreements } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AgreementModal from '@/components/agreements/AgreementModal';
import { GradientCard } from '@/components/ui/card';
import AnalyticsPanel from '@/components/analytics/AnalyticsPanel';
import AgreementAnalytics from '@/components/analytics/AgreementAnalytics';
import AgreementList from '@/components/agreements/AgreementList';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from "@/lib/utils";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AgreementTable from '@/components/agreements/AgreementTable';
import { handleEditAgreement } from '@/components/agreements/AgreementList';
import { toast } from 'sonner';

const Agreements = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDataOverview, setShowDataOverview] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month' | 'custom'>('all');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState('30days');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showExpiredAgreementsDialog, setShowExpiredAgreementsDialog] = useState(false);

  const safeAgreements = useMemo(() => {
    return mockAgreements.map(agreement => {
      const created_at = agreement.created_at && typeof agreement.created_at === 'string' 
        ? new Date(agreement.created_at) 
        : new Date();
      
      const validCreated = isValid(created_at) ? created_at : new Date();
      
      return {
        ...agreement,
        created_at: validCreated,
        valid_until: agreement.valid_until && typeof agreement.valid_until === 'string'
          ? (isValid(new Date(agreement.valid_until)) ? new Date(agreement.valid_until) : undefined)
          : undefined
      };
    });
  }, [mockAgreements]);

  const pendingTooLong = useMemo(() => {
    return safeAgreements.filter(agreement => {
      if (agreement.status !== 'pending') return false;
      
      const createdDate = agreement.created_at;
      const currentDate = new Date();
      
      if (!isValid(createdDate)) return false;
      
      const daysDifference = Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));
      
      return daysDifference > 14;
    });
  }, [safeAgreements]);

  const expiredAgreements = useMemo(() => {
    return safeAgreements.filter(agreement => agreement.status === 'expired');
  }, [safeAgreements]);

  const getStatusCounts = useMemo(() => {
    const counts = {
      draft: 0,
      pending: 0,
      active: 0,
      expired: 0,
      rejected: 0,
      total: safeAgreements.length
    };
    
    safeAgreements.forEach(agreement => {
      if (counts.hasOwnProperty(agreement.status)) {
        counts[agreement.status as keyof typeof counts]++;
      }
    });
    
    return counts;
  }, [safeAgreements]);

  const handleDateRangeSelect = (range: 'all' | 'today' | 'week' | 'month' | 'custom') => {
    setDateRange(range);
    const today = new Date();
    
    switch(range) {
      case 'today':
        setStartDate(today);
        setEndDate(today);
        break;
      case 'week':
        setStartDate(startOfWeek(today));
        setEndDate(endOfWeek(today));
        break;
      case 'month':
        setStartDate(startOfMonth(today));
        setEndDate(endOfMonth(today));
        break;
      case 'custom':
        break;
      default:
        setStartDate(undefined);
        setEndDate(undefined);
    }
  };

  const handleCreateAgreement = (customerId?: string, customerName?: string) => {
    if (customerId) {
      setSelectedCustomerId(customerId);
      setSelectedCustomerName(customerName || null);
    } else {
      setSelectedCustomerId(null);
      setSelectedCustomerName(null);
    }
    setShowCreateModal(true);
  };

  const toggleAnalytics = () => {
    setShowAnalytics(!showAnalytics);
  };

  const handleTimeRangeChange = (value: string) => {
    setAnalyticsTimeRange(value);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const formatDateSafely = (date: Date | string | undefined) => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (!isValid(dateObj)) {
      return 'Invalid date';
    }
    
    try {
      return format(dateObj, 'MMM dd, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const handleViewExpiredAgreements = () => {
    setShowExpiredAgreementsDialog(true);
  };

  const handleCreateNewFromExpired = (agreement: any) => {
    setShowExpiredAgreementsDialog(false);
    const customerId = typeof agreement.customer === 'object' && agreement.customer?.id 
      ? agreement.customer.id 
      : agreement.customer_id || agreement.id;
    
    const customerName = typeof agreement.customer === 'object' && agreement.customer?.name 
      ? agreement.customer.name 
      : agreement.customerName || agreement.customer || "Unknown Customer";
    
    handleCreateAgreement(customerId, customerName);
  };

  const handleMarkRejected = (agreement: any) => {
    setShowExpiredAgreementsDialog(false);
  };

  return (
    <TooltipProvider>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Header 
            title="Price Agreements" 
            subtitle="Manage customer price agreements and contracts"
            className="mb-0"
          />
          
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0 w-full md:w-auto">
            <Button 
              variant="outline" 
              className="hidden md:flex items-center text-cyan-600 border-cyan-200 hover:bg-cyan-50"
              onClick={toggleAnalytics}
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            
            <Button 
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={handleRefresh}
            >
              <RefreshCw className={cn(
                "h-4 w-4 text-gray-600",
                isLoading && "animate-spin"
              )} />
            </Button>
            
            <Button 
              onClick={() => handleCreateAgreement()} 
              className="bg-gradient-to-r from-blue-600 to-blue-500 flex-1 md:flex-initial"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Agreement
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <GradientCard variant="blue" className="p-4 transition-all duration-200 hover:shadow-md">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-blue-900 font-medium">Total</span>
              <span className="text-2xl font-bold text-blue-950">{getStatusCounts.total}</span>
            </div>
            <div className="flex items-center mt-2 text-xs text-blue-800">
              <FileText className="h-3 w-3 mr-1" />
              All price agreements
            </div>
          </GradientCard>
          
          <GradientCard variant="neutral" className="p-4 transition-all duration-200 hover:shadow-md">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600 font-medium">Draft</span>
              <span className="text-2xl font-bold text-gray-800">{getStatusCounts.draft}</span>
            </div>
            <div className="flex items-center mt-2 text-xs text-gray-600">
              <FileText className="h-3 w-3 mr-1" />
              Not yet sent
            </div>
          </GradientCard>
          
          <GradientCard variant="warning" className="p-4 transition-all duration-200 hover:shadow-md">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-amber-800 font-medium">Pending</span>
              <span className="text-2xl font-bold text-amber-900">{getStatusCounts.pending}</span>
            </div>
            <div className="flex items-center mt-2 text-xs text-amber-700">
              <Clock3 className="h-3 w-3 mr-1" />
              Awaiting approval
            </div>
          </GradientCard>
          
          <GradientCard variant="success" className="p-4 transition-all duration-200 hover:shadow-md">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-green-800 font-medium">Active</span>
              <span className="text-2xl font-bold text-green-900">{getStatusCounts.active}</span>
            </div>
            <div className="flex items-center mt-2 text-xs text-green-700">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Approved agreements
            </div>
          </GradientCard>
          
          <GradientCard variant="error" className="p-4 transition-all duration-200 hover:shadow-md">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-red-800 font-medium">Expired</span>
              <span className="text-2xl font-bold text-red-900">{getStatusCounts.expired}</span>
            </div>
            <div className="flex items-center mt-2 text-xs text-red-700">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Need renewal
            </div>
          </GradientCard>
        </div>
        
        {pendingTooLong.length > 0 && (
          <Alert className="mb-4 bg-amber-50 border-amber-200 transition-all duration-200 hover:shadow-md">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 flex flex-wrap gap-2 items-center">
              {pendingTooLong.length} agreement{pendingTooLong.length > 1 ? 's have' : ' has'} been awaiting approval for more than 14 days. 
              <Button variant="link" className="text-amber-800 font-medium p-0 h-auto ml-1">
                View details
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        {expiredAgreements.length > 0 && (
          <Alert 
            className="mb-4 bg-red-50 border-red-200 transition-all duration-200 hover:shadow-md cursor-pointer"
            onClick={handleViewExpiredAgreements}
          >
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 flex flex-wrap gap-2 items-center justify-between w-full">
              <div className="flex items-center">
                {expiredAgreements.length} agreement{expiredAgreements.length > 1 ? 's have' : ' has'} expired and require action.
              </div>
              <div className="flex flex-wrap gap-2 items-center ml-auto">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white border-red-200 text-red-800 hover:bg-red-100 shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewExpiredAgreements();
                  }}
                >
                  View Details
                  <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="bg-white border rounded-xl p-4 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1 md:max-w-md">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input 
                  placeholder="Search by name or customer" 
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-sm text-gray-600 whitespace-nowrap hidden md:block">Date Range</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Filter agreements by creation date
                  </TooltipContent>
                </Tooltip>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-10 text-gray-600 border-gray-300 hover:bg-gray-50 ml-0 md:ml-2">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange === 'all' && "All Time"}
                      {dateRange === 'today' && "Today"}
                      {dateRange === 'week' && "This Week"}
                      {dateRange === 'month' && "This Month"}
                      {dateRange === 'custom' && startDate && endDate 
                        ? `${format(startDate, "d MMM")}-${format(endDate, "d MMM")}`
                        : dateRange === 'custom' ? "Custom Range" : ""}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <div className="p-3 border-b">
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={dateRange === 'all' ? "bg-blue-50 border-blue-200 text-blue-700" : ""}
                          onClick={() => handleDateRangeSelect('all')}
                        >
                          All Time
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={dateRange === 'today' ? "bg-blue-50 border-blue-200 text-blue-700" : ""}
                          onClick={() => handleDateRangeSelect('today')}
                        >
                          Today
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={dateRange === 'week' ? "bg-blue-50 border-blue-200 text-blue-700" : ""}
                          onClick={() => handleDateRangeSelect('week')}
                        >
                          This Week
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={dateRange === 'month' ? "bg-blue-50 border-blue-200 text-blue-700" : ""}
                          onClick={() => handleDateRangeSelect('month')}
                        >
                          This Month
                        </Button>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={`w-full mt-2 ${dateRange === 'custom' ? "bg-blue-50 border-blue-200 text-blue-700" : ""}`}
                        onClick={() => handleDateRangeSelect('custom')}
                      >
                        Custom Range
                      </Button>
                    </div>
                    {dateRange === 'custom' && (
                      <div className="p-3 flex gap-2">
                        <div>
                          <p className="mb-1 text-sm">Start Date</p>
                          <DatePicker
                            date={startDate}
                            onSelect={setStartDate}
                          />
                        </div>
                        <div>
                          <p className="mb-1 text-sm">End Date</p>
                          <DatePicker
                            date={endDate}
                            onSelect={setEndDate}
                          />
                        </div>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            
              <div className="flex items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex rounded-md border border-gray-200 overflow-hidden">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`rounded-none h-10 px-3 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-700' : ''}`}
                        onClick={() => setViewMode('grid')}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`rounded-none h-10 px-3 ${viewMode === 'list' ? 'bg-blue-50 text-blue-700' : ''}`}
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Toggle view mode
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Tabs 
              defaultValue="all" 
              className="w-full" 
              onValueChange={(value) => setStatusFilter(value)}
            >
              <TabsList className="flex gap-2 justify-start overflow-x-auto p-1 border border-gray-100 rounded-lg bg-gray-50">
                <TabsTrigger 
                  value="all" 
                  className="rounded-md px-4 py-2 data-[state=active]:bg-gradient-to-r from-blue-600 to-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-800 data-[state=inactive]:border data-[state=inactive]:border-gray-200 data-[state=inactive]:shadow-sm transition-all"
                >
                  All
                  <Badge variant="countBlue" className="ml-2 min-w-[1.5rem] h-6 flex items-center justify-center">
                    {getStatusCounts.total}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="draft" 
                  className="rounded-md px-4 py-2 data-[state=active]:bg-gradient-to-r from-blue-600 to-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-800 data-[state=inactive]:border data-[state=inactive]:border-gray-200 data-[state=inactive]:shadow-sm transition-all"
                >
                  Draft
                  <Badge variant="countGray" className="ml-2 min-w-[1.5rem] h-6 flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-400 text-white">
                    {getStatusCounts.draft}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="pending" 
                  className="rounded-md px-4 py-2 data-[state=active]:bg-gradient-to-r from-blue-600 to-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-800 data-[state=inactive]:border data-[state=inactive]:border-gray-200 data-[state=inactive]:shadow-sm transition-all"
                >
                  Sent for Approval
                  <Badge variant="countAmber" className="ml-2 min-w-[1.5rem] h-6 flex items-center justify-center">
                    {getStatusCounts.pending}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="active" 
                  className="rounded-md px-4 py-2 data-[state=active]:bg-gradient-to-r from-blue-600 to-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-800 data-[state=inactive]:border data-[state=inactive]:border-gray-200 data-[state=inactive]:shadow-sm transition-all"
                >
                  Approved
                  <Badge variant="countGreen" className="ml-2 min-w-[1.5rem] h-6 flex items-center justify-center">
                    {getStatusCounts.active}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="expired" 
                  className="rounded-md px-4 py-2 data-[state=active]:bg-gradient-to-r from-blue-600 to-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-800 data-[state=inactive]:border data-[state=inactive]:border-gray-200 data-[state=inactive]:shadow-sm transition-all"
                >
                  Expired
                  <Badge variant="countRed" className="ml-2 min-w-[1.5rem] h-6 flex items-center justify-center">
                    {getStatusCounts.expired}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="rejected" 
                  className="rounded-md px-4 py-2 data-[state=active]:bg-gradient-to-r from-blue-600 to-blue-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-800 data-[state=inactive]:border data-[state=inactive]:border-gray-200 data-[state=inactive]:shadow-sm transition-all"
                >
                  Rejected
                  <Badge variant="countRed" className="ml-2 min-w-[1.5rem] h-6 flex items-center justify-center">
                    {getStatusCounts.rejected}
                  </Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {dateRange !== 'all' && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full text-xs text-blue-700 font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      {dateRange === 'today' && "Today"}
                      {dateRange === 'week' && "This Week"}
                      {dateRange === 'month' && "This Month"}
                      {dateRange === 'custom' && startDate && endDate && 
                        `${format(startDate, "d MMM")} - ${format(endDate, "d MMM")}`}
                    </div>
                  )}
                  {statusFilter !== 'all' && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full text-xs text-blue-700 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    </div>
                  )}
                  {searchTerm && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full text-xs text-blue-700 font-medium">
                      <Search className="h-3.5 w-3.5" />
                      {searchTerm}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className={cn(
          "transition-all duration-300",
          isLoading ? "opacity-60" : "opacity-100"
        )}>
          <AgreementList 
            viewMode={viewMode} 
            statusFilter={statusFilter} 
            searchTerm={searchTerm}
            showDataOverview={showDataOverview}
            onCloseDataOverview={() => setShowDataOverview(false)}
            onCreateAgreement={handleCreateAgreement}
          />
        </div>
        
        {showCreateModal && (
          <AgreementModal 
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            customerId={selectedCustomerId || undefined}
            customerName={selectedCustomerName || undefined}
          />
        )}
        
        <AnalyticsPanel 
          isOpen={showAnalytics} 
          onClose={toggleAnalytics}
          title="Agreement Analytics"
          onTimeRangeChange={handleTimeRangeChange}
          defaultTimeRange={analyticsTimeRange}
        >
          <AgreementAnalytics timeRange={analyticsTimeRange} />
        </AnalyticsPanel>

        <Dialog open={showExpiredAgreementsDialog} onOpenChange={setShowExpiredAgreementsDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center text-red-800">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                Expired Agreements Requiring Action
              </DialogTitle>
              <DialogDescription>
                These agreements have expired and require your attention. You can either create new offers or mark them as rejected.
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              {expiredAgreements.length > 0 ? (
                <div className="space-y-4">
                  <AgreementTable 
                    agreements={expiredAgreements}
                    onEdit={(agreement) => {
                      setShowExpiredAgreementsDialog(false);
                      handleEditAgreement(agreement);
                    }}
                    onStatusChange={(agreement, status) => {
                      if (status === 'rejected') {
                        handleMarkRejected(agreement);
                      }
                    }}
                    onCreateFromTemplate={(customerId, customerName) => {
                      setShowExpiredAgreementsDialog(false);
                      handleCreateAgreement(customerId, customerName);
                    }}
                  />
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowExpiredAgreementsDialog(false)}
                    >
                      Close
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        setShowExpiredAgreementsDialog(false);
                      }}
                    >
                      Mark All Rejected
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-blue-500"
                      onClick={() => {
                        setShowExpiredAgreementsDialog(false);
                      }}
                    >
                      Create New Offers
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-gray-500">No expired agreements found.</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default Agreements;
