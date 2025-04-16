import React, { useState, useEffect } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter,
  SheetClose 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  FileText, 
  Calendar,
  Clock,
  DollarSign,
  FolderOpen,
  FilePlus,
  Download,
  Search,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  ArrowLeft,
  UserRound,
  CalendarClock,
  ActivitySquare,
  BarChart4,
  ReceiptText,
  CircleDollarSign,
  Wallet,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  X,
  Edit,
  User,
  UserCheck,
  Briefcase,
  Clock3,
  CreditCard,
  FileUp,
  Landmark,
  Building,
  TrendingUp,
  PieChart,
  LineChart,
  BarChart
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import Card from '@/components/Card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import CustomerFilesView from './CustomerFilesView';
import CustomerServiceHistoryView from './CustomerServiceHistoryView';
import CustomerDisputesView from './CustomerDisputesView';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CustomerAgreementsView from './CustomerAgreementsView';
import { mockCustomerDocuments, mockServiceCallsExtended, mockCertificates, mockCustomerDisputes, mockDisputeMessages, mockAgreements } from '@/data/mockData';
import CustomerModal from './CustomerModal';
import CustomerCreationModal from './CustomerCreationModal';

interface CustomerDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
  onEdit: () => void;
}

const CustomerDetails = ({ isOpen, onClose, customer, onEdit }: CustomerDetailsProps) => {
  const [currentTab, setCurrentTab] = useState('overview');
  const [selectedFolderName, setSelectedFolderName] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(true);
  const [isLoadingContact, setIsLoadingContact] = useState(true);
  const [isLoadingServiceCalls, setIsLoadingServiceCalls] = useState(true);
  const [isLoadingCertificates, setIsLoadingCertificates] = useState(true);
  const [isLoadingAgreements, setIsLoadingAgreements] = useState(true);
  const [isLoadingDisputes, setIsLoadingDisputes] = useState(true);
  
  useEffect(() => {
    if (isOpen) {
      const loadingTimers: NodeJS.Timeout[] = [];
      
      loadingTimers.push(setTimeout(() => setIsLoadingCustomer(false), 200));
      loadingTimers.push(setTimeout(() => setIsLoadingContact(false), 300));
      loadingTimers.push(setTimeout(() => setIsLoadingServiceCalls(false), 400));
      loadingTimers.push(setTimeout(() => setIsLoadingCertificates(false), 400));
      loadingTimers.push(setTimeout(() => setIsLoadingAgreements(false), 350));
      loadingTimers.push(setTimeout(() => setIsLoadingDisputes(false), 500));
      
      return () => {
        loadingTimers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isOpen]);

  const customerDetails = customer;
  const contactPerson = { 
    full_name: customer.contactName, 
    phone: customer.phone, 
    email: customer.email 
  };
  const serviceCalls = mockServiceCallsExtended.filter(call => call.customer === customer.id);
  const certificates = mockCertificates.filter(cert => cert.customer === customer.id);
  const agreements = mockAgreements.filter(agr => agr.customer_id === customer.id);
  const disputes = mockCustomerDisputes.filter(disp => disp.customer_id === customer.id);

  const getCustomerStats = () => {
    return {
      totalServiceCalls: serviceCalls?.length || 0,
      completedServiceCalls: serviceCalls?.filter(call => call.status === 'completed')?.length || 0,
      pendingServiceCalls: serviceCalls?.filter(call => call.status === 'pending' || call.status === 'scheduled')?.length || 0,
      totalCertificates: certificates?.length || 0,
      signedCertificates: certificates?.filter(cert => cert.status === 'signed' || cert.status === 'physical-signature')?.length || 0,
      pendingCertificates: certificates?.filter(cert => cert.status === 'draft' || cert.status === 'awaiting-signature')?.length || 0,
      totalAgreements: agreements?.length || 0,
      activeAgreements: agreements?.filter(agr => agr.status === 'active')?.length || 0,
      openDisputes: disputes?.filter(disp => disp.status === 'open')?.length || 0,
      lastActivity: serviceCalls?.[0]?.date || certificates?.[0]?.date || 'No recent activity',
      upcomingServiceCall: serviceCalls?.find(call => call.status === 'scheduled' || call.status === 'pending'),
      revenue: {
        total: 15420.75,
        thisMonth: 3250.50,
        lastMonth: 4120.25,
        trend: '+12%'
      },
      satisfaction: {
        score: 4.7,
        responses: 8,
        trend: '+0.3'
      }
    };
  };

  const stats = getCustomerStats();
  
  const handleBackToFolders = () => {
    setSelectedFolderName(null);
  };
  
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="p-0 overflow-hidden flex flex-col w-[90vw] max-w-[1200px] sm:max-w-[1200px]">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <SheetHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-16 h-16 border-2 border-gray-100">
                      {isLoadingCustomer ? (
                        <Skeleton className="w-full h-full rounded-full" />
                      ) : (
                        <>
                          <AvatarImage src={customerDetails?.avatar_url || ''} alt={customerDetails?.name || ''} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 font-semibold text-xl">
                            {customerDetails?.name?.charAt(0) || customer?.name?.charAt(0) || 'C'}
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div>
                      <SheetTitle className="text-left text-2xl">
                        {isLoadingCustomer ? (
                          <Skeleton className="h-8 w-64" />
                        ) : (
                          customerDetails?.name || customer?.name
                        )}
                      </SheetTitle>
                      {isLoadingCustomer ? (
                        <Skeleton className="h-6 w-32 mt-1" />
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <StatusBadge 
                            status={customerDetails?.status === 'active' ? 'success' : customerDetails?.status === 'prospect' ? 'warning' : 'neutral'} 
                            label={customerDetails?.status || customer?.status || 'Unknown'} 
                          />
                          {customerDetails?.nickname && (
                            <Badge variant="outline" className="text-gray-600 bg-gray-50">
                              {customerDetails.nickname}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleOpenEditModal}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Customer
                    </Button>
                    <SheetClose asChild>
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetHeader>
              
              <Tabs 
                defaultValue="overview" 
                className="mt-4"
                value={currentTab}
                onValueChange={setCurrentTab}
              >
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="business">Business Details</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="agreements">Agreements</TabsTrigger>
                  <TabsTrigger value="disputes">Disputes</TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-hidden h-[calc(100vh-200px)]">
                  <ScrollArea className="h-full w-full p-6">
                    <TabsContent value="overview" className="mt-0 space-y-6">
                      <section>
                        <h3 className="text-lg font-medium mb-4">Dashboard Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="p-4 border-l-4 border-blue-500 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm text-gray-500">Service Calls</p>
                                <div className="flex items-baseline mt-1">
                                  <span className="text-2xl font-semibold">{stats.totalServiceCalls}</span>
                                  <span className="text-sm text-gray-500 ml-2">total</span>
                                </div>
                              </div>
                              <div className="bg-blue-50 p-2 rounded-full">
                                <CalendarClock className="h-5 w-5 text-blue-500" />
                              </div>
                            </div>
                            <div className="mt-2 flex justify-between text-xs">
                              <span className="text-green-600">{stats.completedServiceCalls} completed</span>
                              <span className="text-amber-600">{stats.pendingServiceCalls} pending</span>
                            </div>
                          </Card>
                          
                          <Card className="p-4 border-l-4 border-green-500 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm text-gray-500">Certificates</p>
                                <div className="flex items-baseline mt-1">
                                  <span className="text-2xl font-semibold">{stats.totalCertificates}</span>
                                  <span className="text-sm text-gray-500 ml-2">total</span>
                                </div>
                              </div>
                              <div className="bg-green-50 p-2 rounded-full">
                                <FileText className="h-5 w-5 text-green-500" />
                              </div>
                            </div>
                            <div className="mt-2 flex justify-between text-xs">
                              <span className="text-green-600">{stats.signedCertificates} signed</span>
                              <span className="text-amber-600">{stats.pendingCertificates} pending</span>
                            </div>
                          </Card>
                          
                          <Card className="p-4 border-l-4 border-purple-500 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm text-gray-500">Agreements</p>
                                <div className="flex items-baseline mt-1">
                                  <span className="text-2xl font-semibold">{stats.totalAgreements}</span>
                                  <span className="text-sm text-gray-500 ml-2">total</span>
                                </div>
                              </div>
                              <div className="bg-purple-50 p-2 rounded-full">
                                <ReceiptText className="h-5 w-5 text-purple-500" />
                              </div>
                            </div>
                            <div className="mt-2 flex justify-between text-xs">
                              <span className="text-green-600">{stats.activeAgreements} active</span>
                              <span className="text-gray-600">{stats.totalAgreements - stats.activeAgreements} inactive</span>
                            </div>
                          </Card>
                          
                          <Card className="p-4 border-l-4 border-red-500 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm text-gray-500">Open Disputes</p>
                                <div className="flex items-baseline mt-1">
                                  <span className="text-2xl font-semibold">{stats.openDisputes}</span>
                                  <span className="text-sm text-gray-500 ml-2">total</span>
                                </div>
                              </div>
                              <div className="bg-red-50 p-2 rounded-full">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                              </div>
                            </div>
                            <div className="mt-2 text-xs">
                              {stats.openDisputes > 0 ? (
                                <span className="text-red-600">Requires attention</span>
                              ) : (
                                <span className="text-green-600">No open disputes</span>
                              )}
                            </div>
                          </Card>
                        </div>
                      </section>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-5 hover:shadow-md transition-all">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium flex items-center gap-2">
                              <CircleDollarSign className="h-5 w-5 text-blue-600" />
                              Revenue Overview
                            </h4>
                            <Badge variant="secondary">
                              {stats.revenue.trend}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-xs text-gray-500">This Month</p>
                              <p className="text-xl font-semibold">${stats.revenue.thisMonth.toLocaleString()}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-xs text-gray-500">Last Month</p>
                              <p className="text-xl font-semibold">${stats.revenue.lastMonth.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="h-[120px] w-full flex items-end justify-between gap-1 mt-4 border-b border-gray-100 pb-2">
                            <div className="flex-1 bg-blue-500 rounded-t h-[60%] opacity-80"></div>
                            <div className="flex-1 bg-blue-500 rounded-t h-[80%] opacity-80"></div>
                            <div className="flex-1 bg-blue-500 rounded-t h-[60%] opacity-80"></div>
                            <div className="flex-1 bg-blue-500 rounded-t h-[75%] opacity-80"></div>
                            <div className="flex-1 bg-blue-500 rounded-t h-[90%] opacity-80"></div>
                            <div className="flex-1 bg-blue-500 rounded-t h-[85%] opacity-80"></div>
                            <div className="flex-1 bg-blue-500 rounded-t h-[65%] opacity-80"></div>
                            <div className="flex-1 bg-blue-500 rounded-t h-[70%] opacity-80"></div>
                            <div className="flex-1 bg-blue-500 rounded-t h-[60%] opacity-80"></div>
                            <div className="flex-1 bg-blue-500 rounded-t h-[85%] opacity-80"></div>
                            <div className="flex-1 bg-blue-500 rounded-t h-[90%] opacity-80"></div>
                            <div className="flex-1 bg-blue-500 rounded-t h-[100%] opacity-80"></div>
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Jan</span>
                            <span>Mar</span>
                            <span>Jun</span>
                            <span>Sep</span>
                            <span>Dec</span>
                          </div>
                        </Card>
                        
                        <Card className="p-5 hover:shadow-md transition-all">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium flex items-center gap-2">
                              <UserCheck className="h-5 w-5 text-green-600" />
                              Customer Satisfaction
                            </h4>
                            <Badge variant="outline" className="text-green-600 bg-green-50">
                              {stats.satisfaction.trend}
                            </Badge>
                          </div>
                          
                          <div className="flex justify-center items-center mb-4">
                            <div className="relative flex items-center justify-center">
                              <div className="absolute text-center">
                                <p className="text-3xl font-bold">{stats.satisfaction.score}</p>
                                <p className="text-xs text-gray-500">out of 5</p>
                              </div>
                              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="45"
                                  fill="none"
                                  stroke="#f1f5f9"
                                  strokeWidth="10"
                                />
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="45"
                                  fill="none"
                                  stroke="#22c55e"
                                  strokeWidth="10"
                                  strokeDasharray="282.7"
                                  strokeDashoffset={(1 - (stats.satisfaction.score / 5)) * 282.7}
                                />
                              </svg>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-5 gap-1 mt-4">
                            <div className="flex flex-col items-center">
                              <div className="flex items-center space-x-1 text-yellow-500">
                                <span className="text-lg">★</span>
                              </div>
                              <div className="mt-1 h-16 w-full bg-gray-100 rounded-t relative overflow-hidden">
                                <div className="absolute bottom-0 w-full bg-green-500 h-[5%] rounded-t"></div>
                              </div>
                              <span className="text-xs mt-1">1</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="flex items-center space-x-1 text-yellow-500">
                                <span className="text-lg">★★</span>
                              </div>
                              <div className="mt-1 h-16 w-full bg-gray-100 rounded-t relative overflow-hidden">
                                <div className="absolute bottom-0 w-full bg-green-500 h-[5%] rounded-t"></div>
                              </div>
                              <span className="text-xs mt-1">2</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="flex items-center space-x-1 text-yellow-500">
                                <span className="text-lg">★★★</span>
                              </div>
                              <div className="mt-1 h-16 w-full bg-gray-100 rounded-t relative overflow-hidden">
                                <div className="absolute bottom-0 w-full bg-green-500 h-[10%] rounded-t"></div>
                              </div>
                              <span className="text-xs mt-1">3</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="flex items-center space-x-1 text-yellow-500">
                                <span className="text-lg">★★★★</span>
                              </div>
                              <div className="mt-1 h-16 w-full bg-gray-100 rounded-t relative overflow-hidden">
                                <div className="absolute bottom-0 w-full bg-green-500 h-[30%] rounded-t"></div>
                              </div>
                              <span className="text-xs mt-1">4</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="flex items-center space-x-1 text-yellow-500">
                                <span className="text-lg">★★★★★</span>
                              </div>
                              <div className="mt-1 h-16 w-full bg-gray-100 rounded-t relative overflow-hidden">
                                <div className="absolute bottom-0 w-full bg-green-500 h-[60%] rounded-t"></div>
                              </div>
                              <span className="text-xs mt-1">5</span>
                            </div>
                          </div>
                          
                          <p className="text-center text-sm text-gray-500 mt-3">
                            Based on {stats.satisfaction.responses} survey responses
                          </p>
                        </Card>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-5 hover:shadow-md transition-all">
                          <h4 className="font-medium flex items-center gap-2 mb-4">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            Upcoming Activity
                          </h4>
                          
                          {stats.upcomingServiceCall ? (
                            <div className="space-y-4">
                              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                <div className="p-2 bg-blue-100 rounded-full">
                                  <CalendarClock className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium">{stats.upcomingServiceCall.serviceType}</p>
                                  <p className="text-sm text-gray-600">
                                    {format(new Date(stats.upcomingServiceCall.date), 'MMM d, yyyy')}
                                  </p>
                                  <Badge className="mt-1 bg-amber-100 text-amber-800 border-amber-200">
                                    {stats.upcomingServiceCall.status}
                                  </Badge>
                                </div>
                              </div>
                              
                              <Button variant="outline" size="sm" className="w-full">
                                View All Scheduled Services
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                              <div className="p-3 bg-gray-100 rounded-full mb-3">
                                <Calendar className="h-6 w-6 text-gray-400" />
                              </div>
                              <p className="text-gray-600">No upcoming services scheduled</p>
                              <Button variant="outline" size="sm" className="mt-3">
                                Schedule New Service
                              </Button>
                            </div>
                          )}
                        </Card>
                        
                        <Card className="p-5 hover:shadow-md transition-all">
                          <h4 className="font-medium flex items-center gap-2 mb-4">
                            <ActivitySquare className="h-5 w-5 text-blue-600" />
                            Recent Activity
                          </h4>
                          
                          <div className="space-y-4">
                            {serviceCalls && serviceCalls.length > 0 ? (
                              serviceCalls.slice(0, 3).map((call, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                  <div className="p-2 bg-blue-100 rounded-full">
                                    {call.status === 'completed' ? (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : call.status === 'cancelled' ? (
                                      <XCircle className="h-4 w-4 text-red-600" />
                                    ) : (
                                      <Clock3 className="h-4 w-4 text-amber-600" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <p className="font-medium text-sm">{call.serviceType}</p>
                                      <span className="text-xs text-gray-500">
                                        {format(new Date(call.date), 'MMM d')}
                                      </span>
                                    </div>
                                    <Badge className={cn(
                                      "mt-1 text-xs",
                                      call.status === 'completed' && "bg-green-100 text-green-800 border-green-200",
                                      call.status === 'cancelled' && "bg-red-100 text-red-800 border-red-200",
                                      call.status === 'scheduled' && "bg-blue-100 text-blue-800 border-blue-200",
                                      call.status === 'pending' && "bg-amber-100 text-amber-800 border-amber-200"
                                    )}>
                                      {call.status}
                                    </Badge>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                No recent activity
                              </div>
                            )}
                            
                            {serviceCalls && serviceCalls.length > 0 && (
                              <Button variant="outline" size="sm" className="w-full" onClick={() => setCurrentTab('history')}>
                                View All Activity
                              </Button>
                            )}
                          </div>
                        </Card>
                      </div>
                      
                      {stats.openDisputes > 0 && (
                        <Alert className="bg-red-50 border-red-200">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <div className="flex justify-between items-center w-full">
                            <AlertDescription className="text-red-800">
                              {stats.openDisputes} open dispute{stats.openDisputes !== 1 ? 's' : ''} requiring attention
                            </AlertDescription>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 border-red-200 hover:bg-red-100"
                              onClick={() => setCurrentTab('disputes')}
                            >
                              View Disputes
                            </Button>
                          </div>
                        </Alert>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="business" className="mt-0 space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Business Details</h3>
                        <Button variant="outline" size="sm" onClick={handleOpenEditModal}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Details
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-5 hover:shadow-md transition-all">
                          <h4 className="font-medium flex items-center gap-2 mb-4 pb-2 border-b">
                            <Building2 className="h-5 w-5 text-blue-600" />
                            Company Information
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Building2 className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Company Name</p>
                                <p className="font-medium">{customerDetails?.name || 'N/A'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Building className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Company Nickname</p>
                                <p className="font-medium">{customerDetails?.nickname || 'N/A'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Briefcase className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Business Type</p>
                                <p className="font-medium">{customerDetails?.type || 'Business'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Landmark className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Tax ID</p>
                                <p className="font-medium">{customerDetails?.taxId || 'N/A'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Globe className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Website</p>
                                <p className="font-medium">{customerDetails?.website || 'N/A'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Clock className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Customer Since</p>
                                <p className="font-medium">{customerDetails?.customerSince ? format(new Date(customerDetails.customerSince), 'MMM d, yyyy') : 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                        </Card>
                        
                        <Card className="p-5 hover:shadow-md transition-all">
                          <h4 className="font-medium flex items-center gap-2 mb-4 pb-2 border-b">
                            <Phone className="h-5 w-5 text-blue-600" />
                            Contact Information
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Mail className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{customerDetails?.email || 'N/A'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Phone className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{customerDetails?.phone || 'N/A'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Phone className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Office Phone</p>
                                <p className="font-medium">{customerDetails?.officePhone || 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="font-medium flex items-center gap-2 mb-4 pb-2 border-b mt-6">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            Address
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <MapPin className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Address Line 1</p>
                                <p className="font-medium">{customerDetails?.address || 'N/A'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <MapPin className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Address Line 2</p>
                                <p className="font-medium">{customerDetails?.address2 || 'N/A'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <MapPin className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">City/State/Zip</p>
                                <p className="font-medium">
                                  {[
                                    customerDetails?.city,
                                    customerDetails?.state,
                                    customerDetails?.zipCode
                                  ].filter(Boolean).join(', ') || 'N/A'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <MapPin className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Country</p>
                                <p className="font-medium">{customerDetails?.country || 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                        </Card>
                        
                        <Card className="p-5 hover:shadow-md transition-all">
                          <h4 className="font-medium flex items-center gap-2 mb-4 pb-2 border-b">
                            <User className="h-5 w-5 text-blue-600" />
                            Primary Contact
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <User className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{contactPerson?.full_name || customerDetails?.contactName || 'N/A'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Mail className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{contactPerson?.email || customerDetails?.contactEmail || 'N/A'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Phone className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{contactPerson?.phone || customerDetails?.contactPhone || 'N/A'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Briefcase className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Position</p>
                                <p className="font-medium">{customerDetails?.contactPosition || 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                        </Card>
                        
                        <Card className="p-5 hover:shadow-md transition-all">
                          <h4 className="font-medium flex items-center gap-2 mb-4 pb-2 border-b">
                            <Info className="h-5 w-5 text-blue-600" />
                            Additional Information
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <CheckCircle className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <div>
                                  <StatusBadge 
                                    status={customerDetails?.status === 'active' ? 'success' : customerDetails?.status === 'prospect' ? 'warning' : 'neutral'} 
                                    label={customerDetails?.status || customer?.status || 'Unknown'} 
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <CreditCard className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Payment Terms</p>
                                <p className="font-medium">{customerDetails?.paymentTerms || 'Net 30'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <FileUp className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Documents Required</p>
                                <p className="font-medium">{customerDetails?.documentsRequired || 'Standard Documentation'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                                <Info className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Notes</p>
                                <p className="font-medium">{customerDetails?.notes || 'No additional notes'}</p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="files" className="mt-0">
                      <CustomerFilesView 
                        customer={customer} 
                        folderName={selectedFolderName}
                        onSelectFolder={setSelectedFolderName}
                        onBackToFolders={handleBackToFolders}
                        viewMode={viewMode}
                        onChangeViewMode={setViewMode}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                      />
                    </TabsContent>
                    
                    <TabsContent value="history" className="mt-0">
                      <CustomerServiceHistoryView 
                        customer={customer} 
                        serviceCalls={serviceCalls}
                        certificates={certificates}
                        isLoading={isLoadingServiceCalls || isLoadingCertificates}
                      />
                    </TabsContent>
                    
                    <TabsContent value="agreements" className="mt-0">
                      <CustomerAgreementsView 
                        customer={customer}
                        agreements={agreements}
                        isLoading={isLoadingAgreements}
                      />
                    </TabsContent>
                    
                    <TabsContent value="disputes" className="mt-0">
                      <CustomerDisputesView 
                        customer={customer}
                        disputes={disputes}
                        isLoading={isLoadingDisputes}
                      />
                    </TabsContent>
                  </ScrollArea>
                </div>
              </Tabs>
            </div>
            
            <SheetFooter className="mt-auto p-4 border-t">
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 w-full">
                <Button variant="outline" onClick={onClose}>Close</Button>
                <Button onClick={handleOpenEditModal}>Edit Customer</Button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
      
      {isEditModalOpen && (
        <CustomerCreationModal 
          isOpen={isEditModalOpen} 
          onClose={handleCloseEditModal}
          customer={customer}
          isEditMode={true}
        />
      )}
    </>
  );
};

export default CustomerDetails;
