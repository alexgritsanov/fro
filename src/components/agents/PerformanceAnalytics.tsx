
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  PieChart, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Download,
  LineChart,
  Award,
  Filter,
  ChevronDown
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterState {
  period: string;
  agent: string;
  region: string;
  serviceType: string;
}

const PerformanceAnalytics = () => {
  const [activeTab, setActiveTab] = useState('revenue');
  const [filters, setFilters] = useState<FilterState>({
    period: '90d',
    agent: 'all',
    region: 'all',
    serviceType: 'all'
  });
  
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-blue-600" />
                Performance Analytics
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Comprehensive analysis of agent performance metrics
              </p>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <Select value={filters.period} onValueChange={(value) => handleFilterChange('period', value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30d">30 Days</SelectItem>
                    <SelectItem value="90d">90 Days</SelectItem>
                    <SelectItem value="1y">1 Year</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Filter Analytics</h4>
                      
                      <div className="space-y-2">
                        <Label>Agent</Label>
                        <Select value={filters.agent} onValueChange={(value) => handleFilterChange('agent', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Agent" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Agents</SelectItem>
                            <SelectItem value="1">David Cohen</SelectItem>
                            <SelectItem value="2">Sarah Goldman</SelectItem>
                            <SelectItem value="3">Michael Levy</SelectItem>
                            <SelectItem value="4">Rachel Stern</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Region</Label>
                        <Select value={filters.region} onValueChange={(value) => handleFilterChange('region', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Regions</SelectItem>
                            <SelectItem value="tel-aviv">Tel Aviv</SelectItem>
                            <SelectItem value="jerusalem">Jerusalem</SelectItem>
                            <SelectItem value="haifa">Haifa</SelectItem>
                            <SelectItem value="beersheba">Beersheba</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Service Type</Label>
                        <Select value={filters.serviceType} onValueChange={(value) => handleFilterChange('serviceType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Service Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Services</SelectItem>
                            <SelectItem value="concrete">Concrete Delivery</SelectItem>
                            <SelectItem value="pumping">Concrete Pumping</SelectItem>
                            <SelectItem value="finishing">Surface Finishing</SelectItem>
                            <SelectItem value="formwork">Formwork Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="pt-2 flex justify-end">
                        <Button
                          size="sm"
                          onClick={() => {
                            setFilters({
                              period: '90d',
                              agent: 'all',
                              region: 'all',
                              serviceType: 'all'
                            });
                          }}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="conversions">Conversions</TabsTrigger>
              <TabsTrigger value="retention">Retention</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="revenue" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md font-medium flex items-center">
                      Total Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">₪1.2M</div>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center">
                      <span className="text-emerald-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        8.5%
                      </span>
                      vs previous period
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md font-medium flex items-center">
                      Average Per Agent
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">₪28.5K</div>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center">
                      <span className="text-emerald-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        5.2%
                      </span>
                      vs previous period
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md font-medium flex items-center">
                      Top Agent Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">₪156K</div>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center">
                      <span className="text-red-500 flex items-center mr-1">
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                        2.1%
                      </span>
                      vs previous period
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                      Revenue Trends
                    </CardTitle>
                    <CardDescription>
                      Monthly revenue over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                      <p className="text-muted-foreground">Line Chart Visualization</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Award className="h-5 w-5 mr-2 text-amber-600" />
                      Top Performers
                    </CardTitle>
                    <CardDescription>
                      By revenue in current period
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-blue-100 text-blue-800 font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3">
                              {index}
                            </div>
                            <div>
                              <div className="font-medium">Agent {index}</div>
                              <div className="text-xs text-gray-500">Tel Aviv Region</div>
                            </div>
                          </div>
                          <div className="font-semibold">₪{(160 - index * 20)}K</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="growth" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium flex items-center">
                        Growth Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">+12.4%</div>
                      <p className="text-sm text-muted-foreground mt-1">Year-over-year growth</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium flex items-center">
                        New Offices
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">+18</div>
                      <p className="text-sm text-muted-foreground mt-1">In current period</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium flex items-center">
                        Fastest Growing Region
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">Haifa</div>
                      <p className="text-sm text-emerald-600 font-medium mt-1">+24.7% growth rate</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Metrics Over Time</CardTitle>
                    <CardDescription>Revenue growth by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                      <p className="text-muted-foreground">Growth metrics chart visualization</p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Growth Drivers</CardTitle>
                      <CardDescription>Factors contributing to growth</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[220px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                        <p className="text-muted-foreground">Growth drivers chart</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Growth Forecast</CardTitle>
                      <CardDescription>Projected growth next quarter</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[220px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                        <p className="text-muted-foreground">Growth forecast chart</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="conversions" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium flex items-center">
                        Conversion Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">32.7%</div>
                      <p className="text-sm text-muted-foreground mt-1">Leads to customers</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium flex items-center">
                        New Customers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">48</div>
                      <p className="text-sm text-muted-foreground mt-1">In current period</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium flex items-center">
                        Average Deal Size
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">₪15.8K</div>
                      <p className="text-sm text-emerald-600 font-medium mt-1">+5.2% vs prev period</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Funnel</CardTitle>
                    <CardDescription>Lead to customer journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                      <p className="text-muted-foreground">Conversion funnel visualization</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="retention" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium flex items-center">
                        Customer Retention
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">87.3%</div>
                      <p className="text-sm text-muted-foreground mt-1">Annual retention rate</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium flex items-center">
                        Repeat Customers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">72.8%</div>
                      <p className="text-sm text-muted-foreground mt-1">Of total customer base</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium flex items-center">
                        Churn Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">5.2%</div>
                      <p className="text-sm text-emerald-600 font-medium mt-1">-1.8% vs prev period</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Retention Over Time</CardTitle>
                    <CardDescription>By customer cohort</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                      <p className="text-muted-foreground">Retention chart visualization</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="comparison" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Regional Comparison</CardTitle>
                      <CardDescription>Performance by region</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                        <p className="text-muted-foreground">Regional comparison chart</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Agent Performance Comparison</CardTitle>
                      <CardDescription>Top vs. average agents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                        <p className="text-muted-foreground">Agent comparison chart</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Service Type Comparison</CardTitle>
                    <CardDescription>Revenue and growth by service type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                      <p className="text-muted-foreground">Service type comparison chart</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
