
import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  Calendar, 
  ChevronRight, 
  Clock, 
  FileText, 
  Users, 
  Truck, 
  BarChart2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  X,
  ArrowRight,
  Briefcase,
  BarChart3,
  TrendingUp,
  DollarSign,
  RefreshCw,
  User,
  CalendarDays,
  Search,
  Filter,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import StatusBadge, { StatusType } from '@/components/StatusBadge';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { mockScheduleEvents } from '@/data/mockData';
import Avatar from '@/components/Avatar';

interface DataOverviewPanelProps {
  projectType?: 'active' | 'completed';
  onClose?: () => void;
  onStatusFilterChange?: (status: string) => void;
  onCustomerFilterChange?: (customer: string) => void;
  onOperatorFilterChange?: (operator: string) => void;
}

const fetchActiveProjects = async () => {
  return [
    { name: 'Service Call', value: 3, color: '#818cf8', statusKey: 'service-call' },
    { name: 'Scheduled', value: 9, color: '#4ade80', statusKey: 'scheduled' },
    { name: 'In Progress', value: 12, color: '#fbbf24', statusKey: 'in-progress' },
    { name: 'Waiting for Signature', value: 4, color: '#f87171', statusKey: 'waiting-signature' },
  ];
};

const fetchCompletedProjects = async () => {
  return [
    { name: 'Completed', value: 24, color: '#4ade80', statusKey: 'completed' },
    { name: 'With Signature', value: 18, color: '#3366FF', statusKey: 'physical-signature' },
    { name: 'Without Signature', value: 4, color: '#fbbf24', statusKey: 'without-signature' },
    { name: 'Canceled', value: 2, color: '#FF3B30', statusKey: 'cancelled' },
  ];
};

const fetchOperatorPerformance = async () => {
  return [
    { name: 'John Smith', completed: 24, rate: 96 },
    { name: 'Emily Johnson', completed: 18, rate: 89 },
    { name: 'Michael Brown', completed: 15, rate: 93 },
    { name: 'Sarah Davis', completed: 21, rate: 91 },
    { name: 'Robert Wilson', completed: 13, rate: 87 },
  ];
};

const fetchCustomerData = async () => {
  return [
    { name: 'Acme Corp', jobs: 12, revenue: 18500 },
    { name: 'Tech Solutions', jobs: 8, revenue: 12300 },
    { name: 'Global Enterprises', jobs: 6, revenue: 9800 },
    { name: 'Innovate Inc', jobs: 10, revenue: 15400 },
    { name: 'Pinnacle Group', jobs: 7, revenue: 11200 },
  ];
};

const fetchUpcomingDeadlines = async () => {
  return [
    { id: 'SC-20230512-0001', customer: 'Acme Corp', date: 'Tomorrow, 09:00', status: 'waiting-signature' },
    { id: 'SC-20230513-0002', customer: 'Tech Solutions', date: 'May 13, 14:00', status: 'scheduled' },
    { id: 'SC-20230514-0003', customer: 'Global Enterprises', date: 'May 14, 10:30', status: 'in-progress' },
    { id: 'SC-20230515-0004', customer: 'Innovate Inc', date: 'May 15, 11:15', status: 'scheduled' },
    { id: 'SC-20230516-0005', customer: 'Pinnacle Group', date: 'May 16, 15:30', status: 'service-call' },
  ];
};

const fetchWeeklyTrendData = async () => {
  return [
    { day: 'Mon', count: 5, completed: 3 },
    { day: 'Tue', count: 8, completed: 6 },
    { day: 'Wed', count: 6, completed: 4 },
    { day: 'Thu', count: 9, completed: 7 },
    { day: 'Fri', count: 12, completed: 9 },
    { day: 'Sat', count: 4, completed: 3 },
    { day: 'Sun', count: 2, completed: 1 },
  ];
};

const fetchDailyScheduleData = async () => {
  return [
    { hour: '08:00', scheduled: 2 },
    { hour: '09:00', scheduled: 3 },
    { hour: '10:00', scheduled: 4 },
    { hour: '11:00', scheduled: 2 },
    { hour: '12:00', scheduled: 1 },
    { hour: '13:00', scheduled: 2 },
    { hour: '14:00', scheduled: 3 },
    { hour: '15:00', scheduled: 4 },
    { hour: '16:00', scheduled: 3 },
    { hour: '17:00', scheduled: 1 },
  ];
};

const DataOverviewPanel = ({ 
  projectType = 'active', 
  onClose, 
  onStatusFilterChange,
  onCustomerFilterChange,
  onOperatorFilterChange
}: DataOverviewPanelProps) => {
  const [selectedTab, setSelectedTab] = useState<'active' | 'completed'>(projectType);
  const [expanded, setExpanded] = useState(false);
  
  const { data: activeProjectsData = [], isLoading: isLoadingActive } = useQuery({
    queryKey: ['activeProjects'],
    queryFn: fetchActiveProjects,
  });
  
  const { data: completedProjectsData = [], isLoading: isLoadingCompleted } = useQuery({
    queryKey: ['completedProjects'],
    queryFn: fetchCompletedProjects,
  });
  
  const { data: operatorData = [], isLoading: isLoadingOperators } = useQuery({
    queryKey: ['operatorPerformance'],
    queryFn: fetchOperatorPerformance,
  });
  
  const { data: customerData = [], isLoading: isLoadingCustomers } = useQuery({
    queryKey: ['customerData'],
    queryFn: fetchCustomerData,
  });
  
  const { data: upcomingDeadlines = [], isLoading: isLoadingDeadlines } = useQuery({
    queryKey: ['upcomingDeadlines'],
    queryFn: fetchUpcomingDeadlines,
  });
  
  const { data: weeklyTrendData = [], isLoading: isLoadingTrends } = useQuery({
    queryKey: ['weeklyTrends'],
    queryFn: fetchWeeklyTrendData,
  });
  
  const { data: dailyScheduleData = [], isLoading: isLoadingDailySchedule } = useQuery({
    queryKey: ['dailySchedule'],
    queryFn: fetchDailyScheduleData,
  });
  
  const projectsData = selectedTab === 'active' ? activeProjectsData : completedProjectsData;
  const totalProjects = projectsData.reduce((sum, item) => sum + item.value, 0);
  const isLoading = selectedTab === 'active' ? isLoadingActive : isLoadingCompleted;
  
  const handleStatusClick = (status: string) => {
    if (onStatusFilterChange) {
      onStatusFilterChange(status);
    }
  };
  
  const handleCustomerClick = (customer: string) => {
    if (onCustomerFilterChange) {
      onCustomerFilterChange(customer);
    }
  };
  
  const handleOperatorClick = (operator: string) => {
    if (onOperatorFilterChange) {
      onOperatorFilterChange(operator);
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting-signature':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'in-progress':
        return <RefreshCw className="h-5 w-5 text-purple-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'service-call':
        return <FileText className="h-5 w-5 text-blue-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const mapStatusToStatusType = (status: string): StatusType => {
    switch (status) {
      case 'waiting-signature':
      case 'without-signature':
        return 'warning';
      case 'scheduled':
      case 'service-call':
        return 'info';
      case 'in-progress':
        return 'warning';
      case 'completed':
      case 'physical-signature':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'neutral';
    }
  };
  
  return (
    <div className={cn(
      "flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out",
      expanded ? "w-[480px] max-w-[90vw]" : "w-[420px] max-w-[90vw]"
    )}>
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center">
          <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Schedule Analytics</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)} 
            className="h-8 w-8 p-0"
          >
            <Menu className="h-4 w-4" />
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <Tabs 
        value={selectedTab} 
        onValueChange={(value) => setSelectedTab(value as 'active' | 'completed')}
        className="flex-1 flex flex-col"
      >
        <div className="px-5 pt-4">
          <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-50">
            <TabsTrigger 
              value="active" 
              className={`rounded-md py-3 text-sm font-medium transition-all relative ${
                selectedTab === 'active' ? 
                'bg-white text-blue-600 shadow-sm' : 
                'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              Active Projects
              <Badge
                variant="countBlue"
                className="absolute -top-2 -right-2 min-w-[1.5rem] h-6 flex items-center justify-center"
              >
                9
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className={`rounded-md py-3 text-sm font-medium transition-all relative ${
                selectedTab === 'completed' ? 
                'bg-white text-blue-600 shadow-sm' : 
                'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed Projects
              <Badge
                variant="countAmber"
                className="absolute -top-2 -right-2 min-w-[1.5rem] h-6 flex items-center justify-center"
              >
                2
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1 px-5 pb-5 mt-4">
          <div className="space-y-8">
            <div>
              <div className="mb-6 text-center">
                <div className="flex flex-col items-center justify-center">
                  {isLoading ? (
                    <div className="w-36 h-36 rounded-full border-4 border-gray-200 animate-pulse"></div>
                  ) : (
                    <>
                      <div className="relative mb-2">
                        <div className="text-5xl font-bold text-blue-600">{totalProjects}</div>
                        <div className="text-sm text-gray-500 mt-1">total projects</div>
                      </div>
                      
                      <div className="mt-4 w-64 h-32 relative mx-auto">
                        <PieChart width={256} height={128}>
                          <Pie
                            data={projectsData}
                            cx="50%"
                            cy="50%"
                            innerRadius={48}
                            outerRadius={64}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="none"
                            startAngle={180}
                            endAngle={0}
                          >
                            {projectsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-white p-3 border border-gray-100 shadow-md rounded-md">
                                    <p className="text-sm font-medium">{data.name}</p>
                                    <p className="text-sm text-gray-500">{data.value} projects</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </PieChart>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="grid gap-3">
                {projectsData.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all border border-gray-100 hover:border-gray-200 hover:shadow-sm cursor-pointer"
                    onClick={() => handleStatusClick(item.statusKey)}
                  >
                    <div className="flex items-center">
                      <div className="w-3.5 h-3.5 rounded-full mr-4" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-700 font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
                      <span className="text-lg font-semibold mr-1.5">{item.value}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Weekly Activity Trend
                </h3>
              </div>
              
              {isLoadingTrends ? (
                <div className="h-48 bg-gray-50 rounded-xl animate-pulse"></div>
              ) : (
                <Card className="p-4 h-48 border border-gray-100 rounded-xl">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12 }} 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12 }} 
                        width={30}
                      />
                      <Tooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 border border-gray-100 shadow-md rounded-md">
                                <p className="text-sm font-medium">{label}</p>
                                <div className="flex items-center mt-1">
                                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                  <p className="text-sm">Scheduled: {payload[0].value}</p>
                                </div>
                                <div className="flex items-center mt-1">
                                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                  <p className="text-sm">Completed: {payload[1].value}</p>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend iconType="circle" iconSize={8} />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        name="Scheduled"
                        stroke="#3366FF" 
                        strokeWidth={2} 
                        dot={{ r: 4, strokeWidth: 2 }} 
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="completed" 
                        name="Completed"
                        stroke="#4ade80" 
                        strokeWidth={2} 
                        dot={{ r: 4, strokeWidth: 2 }} 
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              )}
            </div>
            
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Today's Schedule Distribution
                </h3>
              </div>
              
              {isLoadingDailySchedule ? (
                <div className="h-48 bg-gray-50 rounded-xl animate-pulse"></div>
              ) : (
                <Card className="p-4 h-48 border border-gray-100 rounded-xl">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyScheduleData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="hour" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12 }} 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12 }} 
                        width={30}
                      />
                      <Tooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 border border-gray-100 shadow-md rounded-md">
                                <p className="text-sm font-medium">{label}</p>
                                <p className="text-sm">
                                  {payload[0].value} service calls
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        dataKey="scheduled" 
                        name="Scheduled Jobs"
                        fill="#3366FF" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              )}
            </div>
            
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Operator Performance
                </h3>
              </div>
              
              {isLoadingOperators ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {operatorData.map((operator, index) => (
                    <div 
                      key={index} 
                      className="space-y-2.5 cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-all"
                      onClick={() => handleOperatorClick(operator.name)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex items-center">
                          <Avatar 
                            alt={operator.name} 
                            className="mr-3"
                            size="sm"
                          />
                          <div>
                            <div className="font-medium">{operator.name}</div>
                            <div className="text-sm text-gray-500">On-time completion rate</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold flex items-center">
                            {operator.completed} jobs
                            <Badge
                              variant={operator.rate >= 95 ? "countGreen" : operator.rate >= 90 ? "countBlue" : "countAmber"}
                              className="ml-2 min-w-5 h-5"
                            >
                              {operator.rate}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Progress 
                        value={operator.rate} 
                        className="h-2" 
                        indicatorClassName={cn(
                          operator.rate >= 95 ? "bg-green-500" : 
                          operator.rate >= 90 ? "bg-blue-500" : 
                          operator.rate >= 80 ? "bg-amber-500" : "bg-red-500"
                        )}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                  Top Customers
                </h3>
              </div>
              
              {isLoadingCustomers ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-50 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {customerData.map((customer, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => handleCustomerClick(customer.name)}
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.jobs} jobs</div>
                        </div>
                      </div>
                      <div className="flex items-center text-right">
                        <div>
                          <div className="font-semibold text-gray-800">{formatCurrency(customer.revenue)}</div>
                          <div className="text-xs text-green-600 flex items-center justify-end">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +4.2%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Upcoming Deadlines
                </h3>
              </div>
              
              {isLoadingDeadlines ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 border border-gray-200 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div 
                      key={index} 
                      className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleStatusClick(deadline.status)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex">
                          <div className="mr-3.5 mt-0.5">
                            {getStatusIcon(deadline.status)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{deadline.customer}</div>
                            <div className="text-xs text-gray-500 mt-1">ID: {deadline.id}</div>
                            <div className="flex items-center text-sm text-gray-500 mt-1.5">
                              <Clock className="inline-block h-3.5 w-3.5 mr-1.5" />
                              {deadline.date}
                            </div>
                          </div>
                        </div>
                        <StatusBadge 
                          status={mapStatusToStatusType(deadline.status)} 
                          label={deadline.status.replace('waiting-', '').replace('-', ' ')} 
                          className="ml-2" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center py-3"
              >
                View All Projects
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default DataOverviewPanel;
