
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { CalendarIcon, DownloadIcon, FilterIcon, LineChart as LineChartIcon, PieChart as PieChartIcon, BarChart as BarChartIcon, XIcon } from 'lucide-react';
import { mockCustomers } from '@/data/mockData';

// Define the time period options
const timePeriods = [
  { value: "7days", label: "Last 7 Days" },
  { value: "30days", label: "Last 30 Days" },
  { value: "90days", label: "Last 90 Days" },
  { value: "year", label: "This Year" },
  { value: "alltime", label: "All Time" }
];

// Generate some sample data for the charts
const generateRevenueData = () => {
  return mockCustomers.map(customer => ({
    name: customer.name.split(' ')[0],
    value: Math.floor(Math.random() * 50000) + 10000,
    fullName: customer.name
  })).sort((a, b) => b.value - a.value).slice(0, 10);
};

const generateOrdersData = () => {
  return mockCustomers.map(customer => ({
    name: customer.name.split(' ')[0],
    value: Math.floor(Math.random() * 100) + 5,
    fullName: customer.name
  })).sort((a, b) => b.value - a.value).slice(0, 10);
};

const generateMonthlyRevenueData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    name: month,
    value: Math.floor(Math.random() * 100000) + 20000,
  }));
};

const generateIndustryData = () => {
  const industries = ['Construction', 'Manufacturing', 'Retail', 'Healthcare', 'Technology', 'Other'];
  return industries.map(industry => ({
    name: industry,
    value: Math.floor(Math.random() * 30) + 5,
  }));
};

const COLORS = ['#3366FF', '#FF9500', '#00C853', '#FF3B30', '#2196F3', '#6E7891'];

const customerStatusData = [
  { name: 'Active', value: Math.floor(Math.random() * 70) + 30 },
  { name: 'Inactive', value: Math.floor(Math.random() * 20) + 5 }
];

interface CustomerDataOverviewProps {
  onClose: () => void;
}

const CustomerDataOverview: React.FC<CustomerDataOverviewProps> = ({ onClose }) => {
  const [timePeriod, setTimePeriod] = useState("30days");
  const [chartType, setChartType] = useState("revenue");
  
  const revenueData = generateRevenueData();
  const ordersData = generateOrdersData();
  const monthlyRevenueData = generateMonthlyRevenueData();
  const industryData = generateIndustryData();
  
  // Calculate total revenue
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.value, 0);
  
  // Calculate average order value
  const totalOrders = ordersData.reduce((acc, curr) => acc + curr.value, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-auto">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-7xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-unidoc-dark">Customer Analytics Dashboard</h2>
            <p className="text-unidoc-medium">Comprehensive view of customer performance metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                {timePeriods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" className="gap-2">
              <FilterIcon className="h-4 w-4" />
              More Filters
            </Button>
            
            <Button variant="outline" size="sm" className="gap-2">
              <DownloadIcon className="h-4 w-4" />
              Export
            </Button>
            
            <Button variant="ghost" size="icon" onClick={onClose}>
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Revenue</CardDescription>
                <CardTitle className="text-2xl">${totalRevenue.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-unidoc-medium">
                  <span className="text-unidoc-success font-medium">↑ 12.5%</span> vs previous period
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Customers</CardDescription>
                <CardTitle className="text-2xl">{mockCustomers.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-unidoc-medium">
                  <span className="text-unidoc-success font-medium">↑ 5.2%</span> vs previous period
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Order Value</CardDescription>
                <CardTitle className="text-2xl">${averageOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-unidoc-medium">
                  <span className="text-unidoc-success font-medium">↑ 3.7%</span> vs previous period
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="topCustomers" className="w-full mb-6">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="topCustomers" className="gap-2">
                  <BarChartIcon className="h-4 w-4" />
                  Top Customers
                </TabsTrigger>
                <TabsTrigger value="trends" className="gap-2">
                  <LineChartIcon className="h-4 w-4" />
                  Trends
                </TabsTrigger>
                <TabsTrigger value="segments" className="gap-2">
                  <PieChartIcon className="h-4 w-4" />
                  Segmentation
                </TabsTrigger>
              </TabsList>
              
              {/* Chart type selector - only for Top Customers tab */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-unidoc-medium">View by:</span>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="orders">Orders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="topCustomers" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Top 10 Customers by {chartType === 'revenue' ? 'Revenue' : 'Orders'}</CardTitle>
                  <CardDescription>
                    {chartType === 'revenue' 
                      ? 'Customers who generated the most revenue in the selected period' 
                      : 'Customers with the highest number of orders in the selected period'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartType === 'revenue' ? revenueData : ordersData}
                        margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          width={80}
                          tickFormatter={(value) => chartType === 'revenue' ? `$${(value / 1000).toFixed(0)}k` : value.toString()}
                        />
                        <Tooltip
                          formatter={(value: any) => [
                            chartType === 'revenue' 
                              ? `$${parseInt(value).toLocaleString()}` 
                              : value,
                            chartType === 'revenue' ? 'Revenue' : 'Orders'
                          ]}
                          labelFormatter={(label, items) => {
                            if (items && items.length > 0 && items[0].payload) {
                              return items[0].payload.fullName || label;
                            }
                            return label;
                          }}
                        />
                        <Bar dataKey="value" fill="#3366FF" radius={[4, 4, 0, 0]} barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Trend</CardTitle>
                  <CardDescription>
                    Revenue performance over time showing monthly patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyRevenueData}
                        margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          width={80}
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip 
                          formatter={(value: any) => [`$${parseInt(value).toLocaleString()}`, 'Revenue']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3366FF" 
                          strokeWidth={3}
                          dot={{ r: 4, fill: "#3366FF" }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="segments" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Status Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of active vs inactive customers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={customerStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {customerStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? '#3366FF' : '#FF3B30'} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => [`${value} customers`, '']} />
                          <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Industry Segmentation</CardTitle>
                    <CardDescription>
                      Distribution of customers across different industries
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={industryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {industryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => [`${value} customers`, '']} />
                          <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Recent Activities or Additional Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Insights</CardTitle>
              <CardDescription>Key observations based on customer data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 mt-0.5">
                      <LineChartIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-unidoc-dark">Top 20% of customers generate 72% of revenue</h4>
                      <p className="text-sm text-unidoc-medium mt-1">Consider implementing a loyalty program to reward and retain these high-value customers.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3 mt-0.5">
                      <CalendarIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-unidoc-dark">Customer acquisition has increased by 15% in Q3</h4>
                      <p className="text-sm text-unidoc-medium mt-1">Recent marketing campaigns appear to be effective. Consider expanding these strategies.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                      <PieChartIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-unidoc-dark">Construction industry customers show highest average order value</h4>
                      <p className="text-sm text-unidoc-medium mt-1">Consider developing industry-specific packages to better serve this high-value segment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDataOverview;
