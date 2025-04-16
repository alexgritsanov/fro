
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsService, fetchTopCustomers } from '@/services/analytics';
import Chart from '@/components/Chart';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CustomerAnalyticsProps {
  timeRange: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const CustomerAnalytics: React.FC<CustomerAnalyticsProps> = ({ timeRange, isOpen, onClose }) => {
  const { data: customerActivity = [], isLoading: isLoadingActivity } = useQuery({
    queryKey: ['customerActivity', timeRange],
    queryFn: () => analyticsService.getCustomerActivityByCount(undefined, undefined, 10),
    staleTime: 300000 // 5 minutes
  });
  
  const { data: topCustomers = [], isLoading: isLoadingTopCustomers } = useQuery({
    queryKey: ['topCustomers', timeRange],
    queryFn: () => fetchTopCustomers(timeRange),
    staleTime: 300000 // 5 minutes
  });
  
  const customerDistribution = [
    { name: 'New', value: 24 },
    { name: 'Returning', value: 76 }
  ];
  
  const retentionRate = [
    { name: 'Q1', value: 85 },
    { name: 'Q2', value: 88 },
    { name: 'Q3', value: 82 },
    { name: 'Q4', value: 91 }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Customer Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <Chart
                type="bar"
                data={customerActivity}
                nameKey="name"
                dataKey="value"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Customer Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <Chart
                type="pie"
                data={customerDistribution}
                nameKey="name"
                dataKey="value"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Top 5 Customers by Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ScrollArea className="h-[250px] pr-4">
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{customer.name}</span>
                      <span className="text-sm">${customer.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={customer.revenue / (topCustomers[0]?.revenue || 1) * 100} 
                        className="h-2" 
                      />
                      <div className="flex items-center">
                        {customer.growth > 0 ? (
                          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {customer.growth}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                            <TrendingDown className="h-3 w-3" />
                            {Math.abs(customer.growth)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    {index < topCustomers.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
                
                {topCustomers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No customer data available for the selected time period
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Customer Retention Rate</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[250px]">
              <Chart
                type="line"
                data={retentionRate}
                nameKey="name"
                dataKey="value"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Customer Acquisition</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">New Customers</p>
                <p className="text-2xl font-semibold">42</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-600 flex items-center justify-between mb-1">
                <span>Monthly Target (80)</span>
                <span>52.5%</span>
              </div>
              <Progress value={52.5} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Average Rating</p>
                <p className="text-2xl font-semibold">4.8/5</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-md flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-600 flex items-center justify-between mb-1">
                <span>Target (4.5)</span>
                <span>96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Customer Spending</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Average Order Value</p>
                <p className="text-2xl font-semibold">$2,540</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-md flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-600 flex items-center justify-between mb-1">
                <span>Previous Period</span>
                <span>-5.2%</span>
              </div>
              <Progress value={94.8} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerAnalytics;
