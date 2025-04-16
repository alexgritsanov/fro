
import React from 'react';
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
  CreditCard,
  TrendingUp,
  TrendingDown,
  Tag,
  Plus,
  ExternalLink,
  CheckCircle,
  BarChart2,
  Calendar as CalendarIcon,
  User,
  ChevronRight,
  MessageSquare,
  Info,
  CircleDollarSign,
  Package,
  PieChart,
  AlertCircle,
  FileCheck,
  Heart,
  Star,
  Shield,
  Users,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import Avatar from '@/components/Avatar';

interface CustomerOverviewProps {
  customer: any;
}

// Mini Sparkline Chart component
const Sparkline = ({ data, color = '#3366FF', height = 30, width = 100, fill = false }: { data: number[], color?: string, height?: number, width?: number, fill?: boolean }) => {
  if (!data || data.length < 2) return null;
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1; // Avoid division by zero
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  // Create a polygon for fill if requested
  const polygon = fill 
    ? `${points} ${width},${height} 0,${height}`
    : null;
  
  return (
    <svg width={width} height={height} className="ml-2 overflow-visible">
      {fill && (
        <polygon
          points={polygon!}
          fill={`${color}15`} // Very light version of the color for fill
        />
      )}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Add a dot for the last point */}
      {data.length > 0 && (
        <circle
          cx={(data.length - 1) / (data.length - 1) * width}
          cy={height - ((data[data.length - 1] - min) / range) * height}
          r="2"
          fill={color}
        />
      )}
    </svg>
  );
};

const CustomerOverview: React.FC<CustomerOverviewProps> = ({ customer }) => {
  // Sample data for sparklines
  const revenueData = [4, 7, 5, 8, 9, 6, 10, 8, 12];
  const serviceData = [7, 5, 8, 6, 9, 7, 8, 10, 8];
  const activityData = [3, 5, 7, 4, 6, 8, 7, 9, 12];
  const satisfactionData = [8, 7, 9, 8, 10, 9, 8, 8, 9];
  
  // Get the last two values for calculating growth
  const lastRevenueValue = revenueData[revenueData.length - 1];
  const previousRevenueValue = revenueData[revenueData.length - 2];
  const revenueGrowth = ((lastRevenueValue - previousRevenueValue) / previousRevenueValue) * 100;
  
  // Sample customer metrics for enhanced UI
  const customerMetrics = {
    status: 'active',
    type: 'Enterprise',
    serviceLevel: 'Premium',
    activeContracts: 2,
    customerSince: '2022-03-15',
    totalRevenue: 84750,
    lastServiceDate: '2023-11-15',
    nextServiceDate: '2023-12-20',
    paymentStatus: 'current',
    paymentTerms: 'Net 30',
    satisfactionScore: 4.8,
    responseTime: '3h',
    totalServices: 32
  };
  
  return (
    <div className="space-y-8">
      {/* Enhanced Contact Information Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="overflow-hidden border border-gray-100 bg-white transition-shadow hover:shadow-md relative">
            <div className="absolute inset-y-0 left-0 w-1 bg-blue-500"></div>
            <CardContent className="p-5">
              <div className="flex items-start">
                <div className="bg-blue-50 p-3 rounded-xl mr-4">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Company</h3>
                  <p className="text-gray-600 font-medium text-lg">{customer.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mr-2",
                      customerMetrics.status === 'active' 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    )}>
                      {customerMetrics.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 mr-2">
                      {customerMetrics.type}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                      {customerMetrics.serviceLevel}
                    </span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">
                      <Shield className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">
                      <Users className="h-3 w-3 mr-1" />
                      Enterprise
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-5 p-0 text-blue-600">
                      <Plus className="h-3 w-3 mr-1" />
                      <span className="text-xs">Add Tag</span>
                    </Button>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500">
                    Customer since: {new Date(customerMetrics.customerSince).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border border-gray-100 bg-white transition-shadow hover:shadow-md relative">
            <div className="absolute inset-y-0 left-0 w-1 bg-green-500"></div>
            <CardContent className="p-5">
              <div className="flex items-start">
                <div className="bg-green-50 p-3 rounded-xl mr-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">{customer.address}</p>
                  <div className="mt-3">
                    <div className="bg-gray-100 h-32 w-full rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-80 transition-opacity flex items-center justify-center">
                        <Button variant="secondary" size="sm" className="z-10">
                          <MapPin className="h-4 w-4 mr-2" />
                          View Map
                        </Button>
                      </div>
                      <MapPin className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border border-gray-100 bg-white transition-shadow hover:shadow-md relative">
            <div className="absolute inset-y-0 left-0 w-1 bg-amber-500"></div>
            <CardContent className="p-5">
              <div className="flex items-start">
                <div className="bg-amber-50 p-3 rounded-xl mr-4">
                  <Phone className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600 font-medium text-lg">{customer.phone}</p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border border-gray-100 bg-white transition-shadow hover:shadow-md relative">
            <div className="absolute inset-y-0 left-0 w-1 bg-purple-500"></div>
            <CardContent className="p-5">
              <div className="flex items-start">
                <div className="bg-purple-50 p-3 rounded-xl mr-4">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600 font-medium text-lg">{customer.email}</p>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" className="rounded-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Enhanced Financial Summary Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Financial Summary</h2>
          <Button variant="outline" size="sm">
            <BarChart2 className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="overflow-hidden border border-gray-100 bg-white transition-shadow hover:shadow-md relative">
            <div className="absolute inset-y-0 left-0 w-1 bg-blue-500"></div>
            <CardContent className="p-5">
              <div className="flex items-start">
                <div className="bg-blue-50 p-3 rounded-xl mr-4">
                  <CircleDollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Total Revenue</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-semibold">${customerMetrics.totalRevenue.toLocaleString()}</span>
                    <span className={cn(
                      "ml-2 text-sm flex items-center",
                      revenueGrowth > 0 ? "text-green-600" : "text-red-600"
                    )}>
                      {revenueGrowth > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(revenueGrowth).toFixed(1)}%
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Sparkline data={revenueData} color="#3366FF" fill />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Revenue trend over last 9 months</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    Last 12 months total
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border border-gray-100 bg-white transition-shadow hover:shadow-md relative">
            <div className="absolute inset-y-0 left-0 w-1 bg-green-500"></div>
            <CardContent className="p-5">
              <div className="flex items-start">
                <div className="bg-green-50 p-3 rounded-xl mr-4">
                  <FileCheck className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Active Agreements</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-semibold">{customerMetrics.activeContracts}</span>
                    <Sparkline data={serviceData} color="#00C853" fill />
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="text-gray-600">Contract utilization</span>
                      <span className="font-medium">80%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border border-gray-100 bg-white transition-shadow hover:shadow-md relative">
            <div className="absolute inset-y-0 left-0 w-1 bg-amber-500"></div>
            <CardContent className="p-5">
              <div className="flex items-start">
                <div className="bg-amber-50 p-3 rounded-xl mr-4">
                  <CreditCard className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Payment Status</h3>
                  <div className="flex items-center mt-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Current
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-col">
                    <span className="text-sm text-gray-600">{customerMetrics.paymentTerms} Payment Terms</span>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-gray-500 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                        Last payment: {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Customer Stats Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Performance Metrics</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Last 12 Months
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
              <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
              <DropdownMenuItem>Last 12 Months</DropdownMenuItem>
              <DropdownMenuItem>All Time</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Custom Range</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-100 bg-white transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm text-gray-500">Total Services</h3>
                  <Package className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold">{customerMetrics.totalServices}</span>
                    <span className="text-sm text-green-600 ml-2 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />+15%
                    </span>
                  </div>
                  <Sparkline data={serviceData} color="#3366FF" height={20} width={60} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-100 bg-white transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm text-gray-500">Response Time</h3>
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold">{customerMetrics.responseTime}</span>
                    <span className="text-sm text-green-600 ml-2 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />+5%
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Excellent
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-100 bg-white transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm text-gray-500">Satisfaction</h3>
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold">{customerMetrics.satisfactionScore}</span>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={cn(
                            "h-3 w-3",
                            star <= Math.floor(customerMetrics.satisfactionScore) 
                              ? "text-amber-400 fill-amber-400" 
                              : star <= customerMetrics.satisfactionScore
                                ? "text-amber-400 fill-amber-400 opacity-50"
                                : "text-gray-300"
                          )} 
                        />
                      ))}
                    </div>
                  </div>
                  <Sparkline data={satisfactionData} color="#FF4081" height={20} width={60} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-100 bg-white transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm text-gray-500">Activity</h3>
                  <BarChart2 className="h-5 w-5 text-purple-500" />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold">High</span>
                    <span className="text-sm text-green-600 ml-2 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />+12%
                    </span>
                  </div>
                  <Sparkline data={activityData} color="#9B51E0" height={20} width={60} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Activity & Upcoming Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Button variant="outline" size="sm">
              <BarChart2 className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          
          <Card className="border border-gray-100 overflow-hidden bg-white">
            <CardHeader className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="text-sm font-medium">Activity Timeline</div>
              <Button variant="ghost" size="sm">
                Filter
              </Button>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex">
                    <div className="mr-4 mt-1 relative">
                      <div className="bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center">
                        <FileCheck className="h-4 w-4 text-blue-700" />
                      </div>
                      <div className="absolute top-[32px] bottom-0 left-1/2 w-0.5 bg-gray-200 -translate-x-1/2"></div>
                    </div>
                    <div>
                      <div className="font-medium">Quarterly Inspection Completed</div>
                      <div className="text-sm text-gray-600">Technician: John Smith</div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(new Date('2023-11-15T10:30:00'), 'MMM dd, yyyy h:mm a')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex">
                    <div className="mr-4 mt-1 relative">
                      <div className="bg-green-100 h-8 w-8 rounded-full flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-green-700" />
                      </div>
                      <div className="absolute top-[32px] bottom-0 left-1/2 w-0.5 bg-gray-200 -translate-x-1/2"></div>
                    </div>
                    <div>
                      <div className="font-medium">Invoice #INV-2023-042 Paid</div>
                      <div className="text-sm text-gray-600">Amount: $2,450.00</div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(new Date('2023-11-10T14:22:00'), 'MMM dd, yyyy h:mm a')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex">
                    <div className="mr-4 mt-1 relative">
                      <div className="bg-amber-100 h-8 w-8 rounded-full flex items-center justify-center">
                        <CalendarIcon className="h-4 w-4 text-amber-700" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Maintenance Visit Scheduled</div>
                      <div className="text-sm text-gray-600">December 20, 2023</div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(new Date('2023-11-05T09:15:00'), 'MMM dd, yyyy h:mm a')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 bg-gray-50 border-t border-gray-100">
              <Button variant="link" className="w-full text-blue-600 font-medium h-auto">
                View Complete Activity History
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </section>
        
        {/* Upcoming Services Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Upcoming Services</h2>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </div>
          
          <Card className="border border-gray-100 overflow-hidden bg-white">
            <CardHeader className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="text-sm font-medium">Upcoming Appointments</div>
              <Tabs defaultValue="all" className="w-auto">
                <TabsList className="grid grid-cols-2 h-8">
                  <TabsTrigger value="all" className="px-3">All</TabsTrigger>
                  <TabsTrigger value="pending" className="px-3">Pending</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-0 divide-y">
              <div className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="mr-3 mt-1">
                      <div className="bg-blue-100 h-10 w-10 rounded-md flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-700" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Regular Maintenance</div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        December 20, 2023 (10:00 AM)
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <User className="h-3 w-3 mr-1" />
                        John Smith
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 items-end">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      Scheduled
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="mr-3 mt-1">
                      <div className="bg-amber-100 h-10 w-10 rounded-md flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-amber-700" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Annual Inspection</div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        January 15, 2024 (9:00 AM)
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <User className="h-3 w-3 mr-1" />
                        Emily Johnson
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 items-end">
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      Pending
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="mr-3 mt-1">
                      <div className="bg-purple-100 h-10 w-10 rounded-md flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-purple-700" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Equipment Upgrade Consultation</div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        February 5, 2024 (2:00 PM)
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <User className="h-3 w-3 mr-1" />
                        Michael Brown
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 items-end">
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      Consultation
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 bg-gray-50 border-t border-gray-100">
              <Button variant="link" className="w-full text-blue-600 font-medium h-auto">
                View All Scheduled Services
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
};

// Adding the Edit icon which was missing from the imports
const Edit = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

export default CustomerOverview;
