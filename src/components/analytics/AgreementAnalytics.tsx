
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Info, ChevronUp, ChevronDown, TrendingUp, Users, FileCheck, Clock } from 'lucide-react';
import { mockAgreements } from '@/data/mockData';

interface AgreementAnalyticsProps {
  timeRange: string;
}

const AgreementAnalytics: React.FC<AgreementAnalyticsProps> = ({ timeRange }) => {
  // Status Distribution Data
  const statusData = [
    { name: 'Draft', value: mockAgreements.filter(a => a.status === 'draft').length, color: '#94a3b8' },
    { name: 'Pending', value: mockAgreements.filter(a => a.status === 'pending').length, color: '#f59e0b' },
    { name: 'Active', value: mockAgreements.filter(a => a.status === 'active').length, color: '#10b981' },
    { name: 'Expired', value: mockAgreements.filter(a => a.status === 'expired').length, color: '#ef4444' },
    { name: 'Rejected', value: mockAgreements.filter(a => a.status === 'rejected').length, color: '#f43f5e' },
  ];
  
  // Monthly Agreement Creation Data
  const monthlyData = [
    { name: 'Jan', value: 5 },
    { name: 'Feb', value: 7 },
    { name: 'Mar', value: 4 },
    { name: 'Apr', value: 6 },
    { name: 'May', value: 12 },
    { name: 'Jun', value: 9 },
    { name: 'Jul', value: 11 },
    { name: 'Aug', value: 8 },
    { name: 'Sep', value: 14 },
    { name: 'Oct', value: 13 },
    { name: 'Nov', value: 10 },
    { name: 'Dec', value: 11 },
  ];

  // Top Customers Data
  const topCustomers = [
    { name: 'Acme Construction', value: 15 },
    { name: 'BuildCo Inc.', value: 12 },
    { name: 'SkyHigh Builders', value: 9 },
    { name: 'Metro Developers', value: 8 },
    { name: 'Urban Projects', value: 7 },
  ];

  // Revenue Trend Data
  const revenueTrend = [
    { name: 'Week 1', value: 42000 },
    { name: 'Week 2', value: 38000 },
    { name: 'Week 3', value: 52000 },
    { name: 'Week 4', value: 48000 },
    { name: 'Week 5', value: 61000 },
    { name: 'Week 6', value: 55000 },
    { name: 'Week 7', value: 67000 },
    { name: 'Week 8', value: 72000 },
  ];

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Key Metrics
  const metrics = {
    totalAgreements: mockAgreements.length,
    activeAgreements: mockAgreements.filter(a => a.status === 'active').length,
    expiringSoon: 4,
    avgValue: 8500,
    conversionRate: 78,
    prevConversionRate: 72,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Agreements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{metrics.totalAgreements}</div>
                <p className="text-xs text-green-600 font-medium flex items-center mt-1">
                  <ChevronUp className="h-3 w-3 mr-1" />
                  12% increase
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileCheck className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Agreements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{metrics.activeAgreements}</div>
                <p className="text-xs text-green-600 font-medium flex items-center mt-1">
                  <ChevronUp className="h-3 w-3 mr-1" />
                  8% increase
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{metrics.expiringSoon}</div>
                <p className="text-xs text-amber-600 font-medium flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  Next 30 days
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Agreement Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">₪{formatNumber(metrics.avgValue)}</div>
                <p className="text-xs text-green-600 font-medium flex items-center mt-1">
                  <ChevronUp className="h-3 w-3 mr-1" />
                  5% higher than average
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Monthly Agreement Creation</CardTitle>
            <CardDescription>Number of agreements created per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                    }}
                  />
                  <Bar dataKey="value" fillOpacity={0.8} fill="url(#colorValue)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Agreement Status Distribution</CardTitle>
            <CardDescription>Distribution of agreements by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                    }}
                    formatter={(value: any) => [`${value} agreements`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Customers with most agreements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={topCustomers} 
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    width={100}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                    }}
                    formatter={(value: any) => [`${value} agreements`, '']}
                  />
                  <Bar dataKey="value" fill="#fbbf24" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Estimated revenue from agreements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrend} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(value) => `₪${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                    }}
                    formatter={(value: any) => [`₪${formatNumber(Number(value))}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Analytics Insights</h4>
              <p className="text-sm text-blue-800 mt-1">
                These analytics are based on the {timeRange === "30days" ? "last 30 days" : 
                timeRange === "90days" ? "last 90 days" : 
                timeRange === "year" ? "last year" : "all time"} data.
                You can use these insights to improve your agreement strategy and focus on customers with expiring agreements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgreementAnalytics;
