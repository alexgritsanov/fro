
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { format, subDays, subMonths } from 'date-fns';
import { 
  BarChart as BarChartIcon, 
  PieChart, 
  LineChart, 
  Calendar, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Map,
  Filter
} from 'lucide-react';
import { mockCustomers } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Pie, PieChart as RePieChart, LineChart as ReLineChart, Line, CartesianGrid, Legend } from 'recharts';

interface CustomerAnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
}

// Generate dummy data for analytics
const generateAnalyticsData = () => {
  // Revenue per customer
  const revenueData = mockCustomers.map(customer => ({
    name: customer.name,
    revenue: Math.floor(Math.random() * 100000) + 5000,
    orders: Math.floor(Math.random() * 50) + 1
  }))
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 10);
  
  // Customer type distribution
  const customerTypes = mockCustomers.reduce((acc, customer) => {
    acc[customer.type] = (acc[customer.type] || 0) + 1;
    return acc;
  }, {});
  
  const typeData = Object.keys(customerTypes).map(type => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: customerTypes[type]
  }));
  
  // Monthly revenue trend
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), 11 - i);
    return {
      name: format(date, 'MMM'),
      revenue: Math.floor(Math.random() * 200000) + 50000,
      customers: Math.floor(Math.random() * 20) + 5
    };
  });
  
  // Customer status distribution
  const statusData = mockCustomers.reduce((acc, customer) => {
    acc[customer.status] = (acc[customer.status] || 0) + 1;
    return acc;
  }, {});
  
  const customerStatusData = Object.keys(statusData).map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: statusData[status]
  }));
  
  // Customer growth
  const growthData = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), 11 - i);
    return {
      name: format(date, 'MMM'),
      value: (i + 1) * 5 + Math.floor(Math.random() * 10)
    };
  });
  
  // Geographic distribution
  const geoData = [
    { name: 'New York', value: 24 },
    { name: 'Los Angeles', value: 18 },
    { name: 'Chicago', value: 15 },
    { name: 'Dallas', value: 12 },
    { name: 'Other', value: 31 }
  ];
  
  return {
    revenueData,
    typeData,
    monthlyData,
    customerStatusData,
    growthData,
    geoData,
    totalRevenue: revenueData.reduce((sum, item) => sum + item.revenue, 0),
    totalCustomers: mockCustomers.length,
    averageOrderValue: Math.floor(revenueData.reduce((sum, item) => sum + item.revenue, 0) / revenueData.reduce((sum, item) => sum + item.orders, 0))
  };
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const CustomerAnalytics = ({ isOpen, onClose }: CustomerAnalyticsProps) => {
  const [timeRange, setTimeRange] = useState('last6Months');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const analyticsData = generateAnalyticsData();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-0 bg-gray-50">
        <div className="h-full flex flex-col overflow-hidden">
          <SheetHeader className="p-6 border-b bg-white">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-xl font-bold flex items-center">
                <BarChartIcon className="mr-2 h-5 w-5 text-unidoc-primary-blue" />
                Customer Analytics Dashboard
              </SheetTitle>
              
              <div className="flex items-center gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last30Days">Last 30 Days</SelectItem>
                    <SelectItem value="last3Months">Last 3 Months</SelectItem>
                    <SelectItem value="last6Months">Last 6 Months</SelectItem>
                    <SelectItem value="lastYear">Last Year</SelectItem>
                    <SelectItem value="allTime">All Time</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="sticky top-0 z-10 bg-gray-50 pb-4">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
                  <TabsTrigger value="segmentation">Customer Segmentation</TabsTrigger>
                  <TabsTrigger value="growth">Growth Trends</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium text-gray-500">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end space-x-1">
                        <div className="text-2xl font-bold">
                          {formatCurrency(analyticsData.totalRevenue)}
                        </div>
                        <div className="text-sm font-medium text-green-500 flex items-center pb-1">
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          12%
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        vs. previous period
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium text-gray-500">Active Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end space-x-1">
                        <div className="text-2xl font-bold">{analyticsData.totalCustomers}</div>
                        <div className="text-sm font-medium text-green-500 flex items-center pb-1">
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          8%
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        vs. previous period
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium text-gray-500">Average Order Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end space-x-1">
                        <div className="text-2xl font-bold">
                          {formatCurrency(analyticsData.averageOrderValue)}
                        </div>
                        <div className="text-sm font-medium text-red-500 flex items-center pb-1">
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                          3%
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        vs. previous period
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Top Customers by Revenue</CardTitle>
                      <CardDescription>
                        Showing the 10 highest revenue-generating customers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={analyticsData.revenueData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                          >
                            <XAxis
                              dataKey="name"
                              angle={-45}
                              textAnchor="end"
                              tick={{ fontSize: 12 }}
                              height={70}
                            />
                            <YAxis
                              tickFormatter={(value) => `$${value / 1000}k`}
                            />
                            <Tooltip
                              formatter={(value) => [`$${value}`, 'Revenue']}
                            />
                            <Bar dataKey="revenue" fill="#3366FF">
                              {analyticsData.revenueData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Customer Type Distribution</CardTitle>
                      <CardDescription>
                        Breakdown by customer categories
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <RePieChart>
                            <Pie
                              data={analyticsData.typeData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {analyticsData.typeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}`, 'Customers']} />
                          </RePieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Revenue Trend</CardTitle>
                    <CardDescription>
                      Revenue performance over the last 12 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ReLineChart
                          data={analyticsData.monthlyData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" tickFormatter={(value) => `$${value / 1000}k`} />
                          <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}`} />
                          <Tooltip formatter={(value, name) => [
                            name === 'revenue' ? `$${value}` : value,
                            name === 'revenue' ? 'Revenue' : 'New Customers'
                          ]} />
                          <Legend />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3366FF"
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="customers"
                            stroke="#FF9500"
                            strokeWidth={2}
                          />
                        </ReLineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Customer Insights</CardTitle>
                      <CardDescription>
                        Key metrics and observations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-sm">Customer Retention Rate</div>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            94%
                          </Badge>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-sm">Customer Satisfaction Score</div>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            4.7/5
                          </Badge>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-sm">Quote Conversion Rate</div>
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                            68%
                          </Badge>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-sm">Average Response Time</div>
                          <div className="text-sm font-medium">6.2 hours</div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="font-medium mb-2">Top Growth Opportunity</h4>
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-800">
                          Increasing engagement with the 24 customers who haven't placed orders in the last 90 days could generate an estimated additional revenue of $128,000.
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Customer Status Distribution</CardTitle>
                      <CardDescription>
                        Breakdown by customer status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RePieChart>
                            <Pie
                              data={analyticsData.customerStatusData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {analyticsData.customerStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}`, 'Customers']} />
                          </RePieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {analyticsData.customerStatusData.map((status, index) => (
                          <div key={index} className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <div className="text-xs">
                              {status.name}: {status.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="revenue" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analysis</CardTitle>
                    <CardDescription>
                      Detailed revenue breakdown and trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-12 text-center text-gray-500">
                      Revenue analysis content would appear here with more detailed charts and metrics.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="segmentation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Segmentation</CardTitle>
                    <CardDescription>
                      Analyze customer groups and behaviors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-12 text-center text-gray-500">
                      Customer segmentation content would appear here with segment analysis and targeting recommendations.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="growth" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Trends</CardTitle>
                    <CardDescription>
                      Customer acquisition and retention metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-12 text-center text-gray-500">
                      Growth trends content would appear here with acquisition channels, retention rates and lifetime value analysis.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomerAnalytics;
