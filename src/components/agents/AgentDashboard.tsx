
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientCard } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Users, DollarSign, TrendingUp, BarChart, PieChart, MapPin, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AgentDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Executive Summary Section */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Executive Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <GradientCard variant="blue" className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Total Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42</div>
              <p className="text-sm text-muted-foreground mt-1 flex items-center">
                <span className="text-emerald-500 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  12%
                </span>
                since last month
              </p>
              <div className="flex justify-between mt-4">
                <div className="text-xs">
                  <p className="text-muted-foreground">Active</p>
                  <p className="font-semibold">36</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Pending</p>
                  <p className="font-semibold">4</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Inactive</p>
                  <p className="font-semibold">2</p>
                </div>
              </div>
            </CardContent>
          </GradientCard>
          
          <GradientCard variant="success" className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₪1.2M</div>
              <p className="text-sm text-muted-foreground mt-1 flex items-center">
                <span className="text-emerald-500 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  8.5%
                </span>
                since last month
              </p>
              <div className="flex justify-between mt-4">
                <div className="text-xs">
                  <p className="text-muted-foreground">Average</p>
                  <p className="font-semibold">₪28.5K</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Top Agent</p>
                  <p className="font-semibold">₪156K</p>
                </div>
              </div>
            </CardContent>
          </GradientCard>
          
          <GradientCard variant="info" className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium flex items-center">
                <TrendingUp className="mr-2 h-4 w-4" />
                Growth Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">15.8%</div>
              <p className="text-sm text-muted-foreground mt-1 flex items-center">
                <span className="text-emerald-500 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  2.3%
                </span>
                above target
              </p>
              <div className="flex justify-between mt-4">
                <div className="text-xs">
                  <p className="text-muted-foreground">YoY Change</p>
                  <p className="font-semibold">+18.2%</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Projection</p>
                  <p className="font-semibold">+22%</p>
                </div>
              </div>
            </CardContent>
          </GradientCard>
          
          <GradientCard variant="warning" className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                Active Regions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-sm text-muted-foreground mt-1 flex items-center">
                <span className="text-emerald-500 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  1
                </span>
                new this quarter
              </p>
              <div className="flex justify-between mt-4">
                <div className="text-xs">
                  <p className="text-muted-foreground">Top Region</p>
                  <p className="font-semibold">Tel Aviv</p>
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Growth Area</p>
                  <p className="font-semibold">Haifa</p>
                </div>
              </div>
            </CardContent>
          </GradientCard>
        </div>
      </section>
      
      {/* Performance Metrics Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Performance Metrics</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Monthly
            </Button>
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-blue-50">
              Quarterly
            </Button>
            <Button variant="outline" size="sm">
              Yearly
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-blue-600" />
                Revenue by Agent
              </CardTitle>
              <CardDescription>
                Top 10 agents by revenue contribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <p className="text-muted-foreground">Bar Chart Visualization</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-blue-600" />
                Regional Distribution
              </CardTitle>
              <CardDescription>
                Revenue distribution by region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                <p className="text-muted-foreground">Pie Chart Visualization</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Top Performers Section */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Top Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="overflow-hidden border-t-4 border-t-blue-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-md">Agent {index}</CardTitle>
                    <CardDescription>Tel Aviv Region</CardDescription>
                  </div>
                </div>
                <Award className="h-5 w-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-lg font-semibold">₪{150 - (index * 20)}K</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Growth</p>
                    <p className="text-lg font-semibold text-emerald-600">+{20 - (index * 2)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Offices</p>
                    <p className="text-lg font-semibold">{12 - (index * 2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion</p>
                    <p className="text-lg font-semibold">{87 - (index * 5)}%</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 text-blue-600 border-blue-200 hover:bg-blue-50">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Quick Actions Panel */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 border-blue-200">
            <Users className="h-6 w-6 mb-2 text-blue-600" />
            <span>Create New Agent</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <Award className="h-6 w-6 mb-2 text-amber-600" />
            <span>Review Agreements</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
            <BarChart className="h-6 w-6 mb-2 text-emerald-600" />
            <span>Performance Reports</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
            <MapPin className="h-6 w-6 mb-2 text-purple-600" />
            <span>Regional Analysis</span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AgentDashboard;
