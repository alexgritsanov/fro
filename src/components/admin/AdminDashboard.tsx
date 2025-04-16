import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Chart from "@/components/Chart";
import { SeriesItem } from "@/components/Chart";
import {
  DownloadIcon,
  ArrowUpCircle,
  ArrowDownCircle,
  Users,
  Building2,
  FileText,
  DollarSign,
  Calendar,
  CreditCard,
  Activity,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Settings,
  Plus,
  Layers,
  Eye,
  TrendingUp,
  BookOpen,
  MessageCircle,
  Inbox,
  Bell,
  Zap,
  Award
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

const generateMonthlyData = (months, baseValue, variance) => {
  return months.map(month => ({
    name: month,
    value: Math.floor(baseValue + Math.random() * variance - variance / 2)
  }));
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentMonthIndex = new Date().getMonth();
const last6Months = months.slice(Math.max(0, currentMonthIndex - 5), currentMonthIndex + 1);

const serviceJobsData = generateMonthlyData(last6Months, 120, 40);
const revenueData = generateMonthlyData(last6Months, 50000, 15000);
const customerSatisfactionData = generateMonthlyData(last6Months, 85, 10);

const topOffices = [
  { name: "New York Office", revenue: 250450, growth: 12.5, jobs: 425 },
  { name: "Los Angeles Office", revenue: 198320, growth: 8.7, jobs: 376 },
  { name: "Chicago Office", revenue: 175620, growth: 15.2, jobs: 312 },
  { name: "Miami Office", revenue: 142800, growth: 5.3, jobs: 289 },
  { name: "Seattle Office", revenue: 128950, growth: 11.8, jobs: 253 }
];

const recentActivities = [
  { id: 1, type: "service_completed", office: "New York", user: "John Smith", time: "2 hours ago", description: "Completed service job #4851" },
  { id: 2, type: "new_agreement", office: "Chicago", user: "Emily Davis", time: "4 hours ago", description: "Created new agreement with Acme Corp" },
  { id: 3, type: "user_added", office: "Los Angeles", user: "Admin", time: "Yesterday", description: "Added 3 new subcontractors" },
  { id: 4, type: "payment_received", office: "Miami", user: "System", time: "Yesterday", description: "Received payment of $15,250 from TechCorp" },
  { id: 5, type: "document_signed", office: "Seattle", user: "Jane Wilson", time: "2 days ago", description: "Customer signed delivery certificate #2845" }
];

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("6months");
  const [chartType, setChartType] = useState("bar");
  const [showDetails, setShowDetails] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});

  const handleExport = () => {
    toast({
      title: "Dashboard export",
      description: "Your dashboard report is being generated and will download shortly",
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dashboard refreshed",
        description: "All statistics have been updated with the latest data",
        variant: "success",
      });
    }, 1500);
  };

  const toggleCardExpansion = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const isCardExpanded = (cardId) => {
    return expandedCards[cardId] || false;
  };

  const revenueSeries: SeriesItem[] = [
    {
      name: "Revenue",
      dataKey: "value",
      color: "#6366f1"
    }
  ];

  const completedSeries: SeriesItem[] = [
    {
      name: "Completed",
      dataKey: "completed",
      color: "#6366f1"
    },
    {
      name: "Target",
      dataKey: "target",
      color: "#e11d48"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Admin Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400">Overview of your platform performance and statistics</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 ml-auto sm:ml-0"
            onClick={handleExport}
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden rounded-xl border-0 shadow-md transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-800/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Service Jobs
              </CardTitle>
              <div className="bg-blue-500/10 dark:bg-blue-500/30 p-2 rounded-full">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">1,284</div>
            <div className="flex items-center mt-1">
              <span className="text-green-600 dark:text-green-500 text-sm font-medium flex items-center">
                <ArrowUpCircle className="h-3 w-3 mr-1" /> +12.5%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-xl border-0 shadow-md transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-800/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Active Operators
              </CardTitle>
              <div className="bg-green-500/10 dark:bg-green-500/30 p-2 rounded-full">
                <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">245</div>
            <div className="flex items-center mt-1">
              <span className="text-green-600 dark:text-green-500 text-sm font-medium flex items-center">
                <ArrowUpCircle className="h-3 w-3 mr-1" /> +8.2%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-xl border-0 shadow-md transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 dark:border-indigo-800/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Active Offices
              </CardTitle>
              <div className="bg-indigo-500/10 dark:bg-indigo-500/30 p-2 rounded-full">
                <Building2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">24</div>
            <div className="flex items-center mt-1">
              <span className="text-green-600 dark:text-green-500 text-sm font-medium flex items-center">
                <ArrowUpCircle className="h-3 w-3 mr-1" /> +2
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">new this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-xl border-0 shadow-md transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 dark:border-amber-800/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Revenue
              </CardTitle>
              <div className="bg-amber-500/10 dark:bg-amber-500/30 p-2 rounded-full">
                <DollarSign className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">$1,458,289</div>
            <div className="flex items-center mt-1">
              <span className="text-green-600 dark:text-green-500 text-sm font-medium flex items-center">
                <ArrowUpCircle className="h-3 w-3 mr-1" /> +15.3%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className={`col-span-2 rounded-xl border-0 shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden ${isCardExpanded('revenue') ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
            <div>
              <CardTitle className="text-gray-800 dark:text-gray-100">Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue across all offices</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200 dark:border-gray-700">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setChartType("bar")}>
                    <BarChart3 className="h-4 w-4 mr-2" /> Bar Chart
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setChartType("line")}>
                    <LineChartIcon className="h-4 w-4 mr-2" /> Line Chart
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setChartType("bar")}>
                    <Layers className="h-4 w-4 mr-2" /> Area Chart
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => toggleCardExpansion('revenue')}
              >
                {isCardExpanded('revenue') ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 px-6 pb-6">
            <div className="h-[300px]">
              {chartType === 'bar' && (
                <Chart 
                  data={revenueData.map(item => ({
                    ...item,
                    value: (item.value / 1000).toFixed(1)
                  }))}
                  type="bar"
                  height={300}
                  showGrid={true}
                  nameKey="name"
                  dataKey="value"
                  series={revenueSeries}
                />
              )}
              {chartType === 'line' && (
                <Chart 
                  data={revenueData.map(item => ({
                    ...item,
                    value: (item.value / 1000).toFixed(1)
                  }))}
                  type="line"
                  height={300}
                  showGrid={true}
                  nameKey="name"
                  dataKey="value"
                  series={revenueSeries}
                />
              )}
              {chartType === 'area' && (
                <Chart 
                  data={revenueData.map(item => ({
                    ...item,
                    value: (item.value / 1000).toFixed(1)
                  }))}
                  type="line"
                  height={300}
                  showGrid={true}
                  nameKey="name"
                  dataKey="value"
                  series={revenueSeries}
                />
              )}
            </div>
            <div className="flex justify-center items-center mt-2 text-gray-500 text-sm">
              Values displayed in thousands ($K)
            </div>
          </CardContent>
        </Card>

        <Card className={`${isCardExpanded('revenue') ? 'hidden' : ''} rounded-xl border-0 shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden`}>
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <CardTitle className="text-gray-800 dark:text-gray-100">Customer Satisfaction</CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => toggleCardExpansion('satisfaction')}
              >
                {isCardExpanded('satisfaction') ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </div>
            <CardDescription>Average satisfaction score</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 px-6 pb-6">
            <div className="flex justify-center mb-8">
              <div className="relative h-44 w-44 flex items-center justify-center">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 dark:text-gray-700 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-green-500 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 0.87)}
                    transform="rotate(-90 50 50)"
                  ></circle>
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold text-gray-800 dark:text-white">87%</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Satisfaction</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">Service Quality</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">92%</span>
                </div>
                <Progress value={92} className="h-2 bg-gray-200 dark:bg-gray-700" indicatorClassName="bg-gradient-to-r from-green-400 to-green-600" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">Timeliness</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">85%</span>
                </div>
                <Progress value={85} className="h-2 bg-gray-200 dark:bg-gray-700" indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">Communication</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">78%</span>
                </div>
                <Progress value={78} className="h-2 bg-gray-200 dark:bg-gray-700" indicatorClassName="bg-gradient-to-r from-amber-400 to-amber-600" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">Issue Resolution</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">81%</span>
                </div>
                <Progress value={81} className="h-2 bg-gray-200 dark:bg-gray-700" indicatorClassName="bg-gradient-to-r from-indigo-400 to-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-xl border-0 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <CardTitle className="text-gray-800 dark:text-gray-100">Top Performing Offices</CardTitle>
              <Button size="sm" variant="outline" className="h-8 border-gray-200 hover:bg-gray-50">
                <Eye className="h-4 w-4 mr-1" /> View All
              </Button>
            </div>
            <CardDescription>Based on revenue and growth</CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <div className="space-y-5">
              {topOffices.map((office, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{office.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{office.jobs} jobs completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">${office.revenue.toLocaleString()}</p>
                    <div className="flex items-center justify-end">
                      <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400 mr-1" />
                      <span className="text-xs text-green-600 dark:text-green-400">{office.growth}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-0 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <CardTitle className="text-gray-800 dark:text-gray-100">Recent Activity</CardTitle>
              <Button size="sm" variant="outline" className="h-8 border-gray-200 hover:bg-gray-50">
                <Activity className="h-4 w-4 mr-1" /> View All
              </Button>
            </div>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <div className="space-y-0">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="relative pl-6 pb-5 border-l border-gray-200 dark:border-gray-700 last:border-0 last:pb-0 ml-4">
                  <div className="absolute left-[-8px] top-1">
                    <div className={`h-4 w-4 rounded-full flex items-center justify-center
                      ${activity.type === 'service_completed' ? 'bg-green-100 dark:bg-green-900/30' :
                        activity.type === 'new_agreement' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        activity.type === 'user_added' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        activity.type === 'payment_received' ? 'bg-amber-100 dark:bg-amber-900/30' :
                        'bg-indigo-100 dark:bg-indigo-900/30'
                      }`}>
                      <div className={`h-2 w-2 rounded-full
                        ${activity.type === 'service_completed' ? 'bg-green-600 dark:bg-green-400' :
                          activity.type === 'new_agreement' ? 'bg-blue-600 dark:bg-blue-400' :
                          activity.type === 'user_added' ? 'bg-purple-600 dark:bg-purple-400' :
                          activity.type === 'payment_received' ? 'bg-amber-600 dark:bg-amber-400' :
                          'bg-indigo-600 dark:bg-indigo-400'
                        }`}>
                      </div>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="font-medium text-gray-800 dark:text-gray-200">{activity.description}</p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">{activity.office} Office</span>
                      <span className="mx-1.5">•</span>
                      <span>{activity.user}</span>
                      <span className="mx-1.5">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl border-0 shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-gray-800 dark:text-gray-100">Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button className="flex flex-col items-center justify-center h-24 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg border-0">
              <Users className="h-6 w-6 mb-2" />
              <span>Add User</span>
            </Button>
            <Button className="flex flex-col items-center justify-center h-24 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg border-0">
              <Building2 className="h-6 w-6 mb-2" />
              <span>New Office</span>
            </Button>
            <Button className="flex flex-col items-center justify-center h-24 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg border-0">
              <FileText className="h-6 w-6 mb-2" />
              <span>Run Reports</span>
            </Button>
            <Button className="flex flex-col items-center justify-center h-24 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg border-0">
              <Settings className="h-6 w-6 mb-2" />
              <span>Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="rounded-xl border-0 shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <CardTitle className="text-gray-800 dark:text-gray-100">Latest Notifications</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                <div className="flex items-start">
                  <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">System Update Complete</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">The system has been updated to version 2.4.0</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">1 hour ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                <div className="flex items-start">
                  <div className="h-9 w-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-3">
                    <MessageCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">New Message from Support</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Support team: "We've received your ticket #4851..."</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">3 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                <div className="flex items-start">
                  <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                    <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Target Achieved</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Chicago office has achieved their monthly service goal</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl border-0 shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden lg:col-span-2">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <CardTitle className="text-gray-800 dark:text-gray-100">Service Completion Rate</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 pb-6">
            <div className="h-[200px]">
              <Chart 
                data={months.map((month, index) => ({
                  name: month,
                  completed: Math.floor(80 + Math.random() * 15),
                  target: 90
                }))}
                type="line"
                height={200}
                showGrid={true}
                nameKey="name"
                dataKey="completed"
                series={completedSeries}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                <div className="text-xs font-medium text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-1">Current Rate</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">86.4%</div>
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 flex items-center">
                  <ArrowUpCircle className="h-3 w-3 mr-1" /> 
                  <span>3.2% from last month</span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30">
                <div className="text-xs font-medium text-red-800 dark:text-red-300 uppercase tracking-wider mb-1">Target</div>
                <div className="text-2xl font-bold text-red-900 dark:text-red-100">90.0%</div>
                <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                  <span>3.6% remaining to reach target</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
