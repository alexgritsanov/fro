import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatusBadge from '@/components/StatusBadge';
import { BarChart, Activity, Users, Calendar, ChevronRight, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, ChevronDown, BarChart2 } from 'lucide-react';
import { fetchDashboardStats } from '@/services/analytics';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Chart from '@/components/Chart';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import ScheduleAnalytics from '@/components/analytics/ScheduleAnalytics';
import CustomerAnalytics from '@/components/analytics/CustomerAnalytics';
import { Link } from 'react-router-dom';

const performanceData = [
  { name: 'Jan', revenue: 4000, jobs: 24 },
  { name: 'Feb', revenue: 3000, jobs: 13 },
  { name: 'Mar', revenue: 2000, jobs: 18 },
  { name: 'Apr', revenue: 2780, jobs: 21 },
  { name: 'May', revenue: 1890, jobs: 15 },
  { name: 'Jun', revenue: 2390, jobs: 20 },
  { name: 'Jul', revenue: 3490, jobs: 28 },
];

const usersData = [
  { id: '1', name: 'John Doe', role: 'Operator', performance: 95, avatar: null },
  { id: '2', name: 'Jane Smith', role: 'Foreman', performance: 88, avatar: null },
  { id: '3', name: 'Robert Johnson', role: 'Operator', performance: 76, avatar: null },
  { id: '4', name: 'Emily Brown', role: 'Office Manager', performance: 92, avatar: null },
  { id: '5', name: 'Michael Wilson', role: 'Operator', performance: 83, avatar: null },
];

const customerBreakdown = [
  { name: 'Commercial', value: 40 },
  { name: 'Residential', value: 30 },
  { name: 'Industrial', value: 20 },
  { name: 'Government', value: 10 },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [activeTab, setActiveTab] = useState('overview');

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats', timeRange],
    queryFn: () => fetchDashboardStats(timeRange),
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <Header title="Dashboard" subtitle="Overview of your business performance" className="mb-0" />
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
          <TabsTrigger value="overview">
            <Activity className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="h-4 w-4 mr-2" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="agreements" className="hidden md:flex">
            <DollarSign className="h-4 w-4 mr-2" />
            Agreements
          </TabsTrigger>
          <TabsTrigger value="users" className="hidden md:flex">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 font-medium">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats?.totalRevenue?.toLocaleString() || '245,673'}</div>
                <div className="flex items-center mt-1 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">12% increase</span>
                  <span className="text-gray-500 ml-1">vs previous period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 font-medium">Jobs Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.completedJobs?.toLocaleString() || '1,284'}</div>
                <div className="flex items-center mt-1 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">8% increase</span>
                  <span className="text-gray-500 ml-1">vs previous period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 font-medium">Active Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.activeCustomers?.toLocaleString() || '243'}</div>
                <div className="flex items-center mt-1 text-xs">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">5% increase</span>
                  <span className="text-gray-500 ml-1">vs previous period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 font-medium">Avg. Job Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats?.avgJobValue?.toLocaleString() || '1,890'}</div>
                <div className="flex items-center mt-1 text-xs">
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-red-600 font-medium">3% decrease</span>
                  <span className="text-gray-500 ml-1">vs previous period</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Revenue and job completion trends</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <Chart 
                  type="line"
                  data={performanceData}
                  showGrid={true}
                  series={[
                    { name: 'Revenue', color: '#3366FF', dataKey: 'revenue' },
                    { name: 'Jobs', color: '#FF9500', dataKey: 'jobs' }
                  ]}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Breakdown</CardTitle>
                <CardDescription>By business type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <Chart
                  type="pie"
                  data={customerBreakdown}
                  nameKey="name"
                  dataKey="value"
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Top Performing Users</CardTitle>
                  <CardDescription>Based on job completion rate</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[290px]">
                  <div className="space-y-4">
                    {usersData.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9 mr-3">
                            <AvatarImage src={user.avatar || undefined} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 min-w-[140px]">
                          <Progress value={user.performance} className="h-2 flex-1" />
                          <div className="text-sm font-medium">{user.performance}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system events</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[290px]">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-600" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New agreement created</p>
                        <p className="text-xs text-gray-500">Acme Corp - Annual Concrete Supply</p>
                        <p className="text-xs text-gray-400">2 hours ago by Jane Smith</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-green-600" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Job completed</p>
                        <p className="text-xs text-gray-500">XYZ Industries - Concrete pumping</p>
                        <p className="text-xs text-gray-400">3 hours ago by John Doe</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-600" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New customer added</p>
                        <p className="text-xs text-gray-500">Prestige Properties</p>
                        <p className="text-xs text-gray-400">5 hours ago by Emily Brown</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-600" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Service call scheduled</p>
                        <p className="text-xs text-gray-500">BuildWell Inc - Concrete delivery</p>
                        <p className="text-xs text-gray-400">Yesterday by Robert Johnson</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-red-600" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Service call cancelled</p>
                        <p className="text-xs text-gray-500">Smithson Builders - Concrete pumping</p>
                        <p className="text-xs text-gray-400">Yesterday by Customer</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          <Alert className="bg-amber-50 border-amber-200">
            <AlertTitle className="text-amber-800 flex items-center">
              <BarChart2 className="mr-2 h-4 w-4 text-amber-600" />
              Analytics insights available
            </AlertTitle>
            <AlertDescription className="text-amber-700">
              Deeper analytics for all business areas are available. Click on the Analytics button in each section for detailed insights.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Schedule Analytics</h3>
            <Button asChild>
              <Link to="/schedule">
                Go to Schedule
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ScheduleAnalytics timeRange={timeRange} />
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Customer Analytics</h3>
            <Button asChild>
              <Link to="/customers">
                Go to Customers
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <CustomerAnalytics timeRange={timeRange} />
        </TabsContent>
        
        <TabsContent value="agreements" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Agreement Analytics</h3>
            <Button asChild>
              <Link to="/agreements">
                Go to Agreements
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Agreement Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Agreements</p>
                    <p className="text-xl font-semibold">143</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="text-xl font-semibold">$1.24M</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Renewal Rate</p>
                    <p className="text-xl font-semibold">87%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Agreements by Status</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <Chart
                  type="pie"
                  data={[
                    { name: 'Active', value: 143, color: '#10B981' },
                    { name: 'Expiring', value: 28, color: '#F59E0B' },
                    { name: 'Expired', value: 32, color: '#EF4444' },
                    { name: 'Draft', value: 17, color: '#6B7280' }
                  ]}
                  nameKey="name"
                  dataKey="value"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Agreement Value Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <Chart
                  type="line"
                  data={[
                    { name: 'Jan', value: 210000 },
                    { name: 'Feb', value: 320000 },
                    { name: 'Mar', value: 280000 },
                    { name: 'Apr', value: 360000 },
                    { name: 'May', value: 410000 },
                    { name: 'Jun', value: 490000 },
                    { name: 'Jul', value: 520000 }
                  ]}
                  nameKey="name"
                  dataKey="value"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">User Analytics</h3>
            <Button asChild>
              <Link to="/users">
                Go to Users
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">User Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-xl font-semibold">68</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Users</p>
                    <p className="text-xl font-semibold">54</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <BarChart className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg. Performance</p>
                    <p className="text-xl font-semibold">87%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Users</CardTitle>
                <CardDescription>Based on job completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[290px]">
                  <div className="space-y-4">
                    {usersData.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9 mr-3">
                            <AvatarImage src={user.avatar || undefined} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 min-w-[140px]">
                          <Progress value={user.performance} className="h-2 flex-1" />
                          <div className="text-sm font-medium">{user.performance}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Distribution by Role</CardTitle>
              </CardHeader>
              <CardContent className="h-[290px]">
                <Chart
                  type="pie"
                  data={[
                    { name: 'Operators', value: 32, color: '#3366FF' },
                    { name: 'Foremen', value: 12, color: '#F59E0B' },
                    { name: 'Office Staff', value: 15, color: '#10B981' },
                    { name: 'Admin', value: 9, color: '#8B5CF6' }
                  ]}
                  nameKey="name"
                  dataKey="value"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
