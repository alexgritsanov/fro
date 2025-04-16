
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, CircleUser, Users } from 'lucide-react';

interface DataOverviewSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const DataOverviewSheet = ({ isOpen, onClose }: DataOverviewSheetProps) => {
  const [activeTab, setActiveTab] = useState('users');

  // Mock data for user analytics
  const usersByRole = [
    { name: 'Employee', value: 24 },
    { name: 'Client', value: 18 },
    { name: 'Subcontractor', value: 12 },
    { name: 'Foreman', value: 8 },
    { name: 'Admin', value: 5 },
    { name: 'Office', value: 3 },
  ];

  const userActivity = [
    { name: 'Mon', active: 45 },
    { name: 'Tue', active: 52 },
    { name: 'Wed', active: 49 },
    { name: 'Thu', active: 63 },
    { name: 'Fri', active: 58 },
    { name: 'Sat', active: 27 },
    { name: 'Sun', active: 18 },
  ];

  const documentStatus = [
    { name: 'Complete', value: 42 },
    { name: 'Missing', value: 14 },
    { name: 'Expired', value: 8 },
    { name: 'Expiring Soon', value: 6 },
  ];

  const userTrends = [
    { month: 'Jan', users: 58 },
    { month: 'Feb', users: 62 },
    { month: 'Mar', users: 65 },
    { month: 'Apr', users: 68 },
    { month: 'May', users: 70 },
    { month: 'Jun', users: 76 },
  ];

  // Colors for pie charts
  const COLORS = ['#3366FF', '#FF9500', '#00C853', '#FF3B30', '#2196F3', '#6E7891'];
  const DOC_COLORS = ['#00C853', '#FF9500', '#FF3B30', '#2196F3'];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-4xl p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            <Users className="h-5 w-5" /> 
            User Analytics Dashboard
          </SheetTitle>
        </SheetHeader>

        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <div className="border-b px-6 py-3 bg-white">
            <TabsList className="h-10">
              <TabsTrigger value="users" className="h-10 px-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                Users Overview
              </TabsTrigger>
              <TabsTrigger value="activity" className="h-10 px-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                Activity
              </TabsTrigger>
              <TabsTrigger value="documents" className="h-10 px-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                Documents
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <TabsContent value="users" className="p-6 mt-0 min-h-[80vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">User Distribution by Role</CardTitle>
                    <CardDescription>Breakdown of users by their roles in the system</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={usersByRole}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {usersByRole.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {usersByRole.map((role, index) => (
                        <Badge 
                          key={role.name}
                          className="bg-white text-gray-800 border"
                          style={{ borderColor: COLORS[index % COLORS.length], color: COLORS[index % COLORS.length] }}
                        >
                          {role.name}: {role.value}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">User Growth Trend</CardTitle>
                    <CardDescription>Monthly user count over time</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={userTrends}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value} users`, 'Total Users']} />
                          <Bar dataKey="users" fill="#3366FF" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Current Total Users</span>
                        <Badge className="bg-blue-100 text-blue-800">76</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Growth Rate (6 months)</span>
                        <Badge className="bg-green-100 text-green-800">+31%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">User Statistics</CardTitle>
                    <CardDescription>Key metrics about system users</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Total Users</div>
                            <div className="text-2xl font-bold">76</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                            <CircleUser className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Active Today</div>
                            <div className="text-2xl font-bold">42</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                            <CalendarDays className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">New This Month</div>
                            <div className="text-2xl font-bold">12</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Inactive Users</div>
                            <div className="text-2xl font-bold">8</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="p-6 mt-0 min-h-[80vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Daily Active Users</CardTitle>
                    <CardDescription>User activity over the past week</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={userActivity}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value} users`, 'Active Users']} />
                          <Bar dataKey="active" fill="#3366FF" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Most Active Users</CardTitle>
                    <CardDescription>Top 5 most active users this month</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {[
                        { name: 'John Smith', role: 'Employee', logins: 28, actions: 143 },
                        { name: 'Emily Johnson', role: 'Employee', logins: 26, actions: 117 },
                        { name: 'David Miller', role: 'Admin', logins: 30, actions: 98 },
                        { name: 'Sarah Wilson', role: 'Office', logins: 22, actions: 76 },
                        { name: 'Michael Brown', role: 'Employee', logins: 18, actions: 62 }
                      ].map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.role}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{user.actions} actions</div>
                            <div className="text-sm text-gray-500">{user.logins} logins</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Activity Insights</CardTitle>
                    <CardDescription>Key activity metrics for the system</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm font-medium text-gray-500">Average Daily Active Users</div>
                        <div className="text-2xl font-bold">44.5</div>
                        <div className="text-sm text-green-600 flex items-center mt-1">
                          +12% from last week
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm font-medium text-gray-500">Average Session Duration</div>
                        <div className="text-2xl font-bold">18m 32s</div>
                        <div className="text-sm text-green-600 flex items-center mt-1">
                          +2m 12s from last week
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm font-medium text-gray-500">Most Active Time</div>
                        <div className="text-2xl font-bold">10:00 - 11:00 AM</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Monday - Friday
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="p-6 mt-0 min-h-[80vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Document Status</CardTitle>
                    <CardDescription>Status of required user documents</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={documentStatus}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {documentStatus.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={DOC_COLORS[index % DOC_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} documents`, 'Count']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {documentStatus.map((status, index) => (
                        <Badge 
                          key={status.name}
                          className="bg-white text-gray-800 border"
                          style={{ borderColor: DOC_COLORS[index % DOC_COLORS.length], color: DOC_COLORS[index % DOC_COLORS.length] }}
                        >
                          {status.name}: {status.value}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Documents by Type</CardTitle>
                    <CardDescription>Breakdown of documents by category</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          layout="vertical" 
                          data={[
                            { name: 'ID Documents', count: 38 },
                            { name: 'Contracts', count: 32 },
                            { name: 'Certificates', count: 28 },
                            { name: 'Tax Forms', count: 24 },
                            { name: 'Insurance', count: 22 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={100} />
                          <Tooltip formatter={(value) => [`${value} documents`, 'Count']} />
                          <Bar dataKey="count" fill="#3366FF" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Users with Missing Documents</CardTitle>
                    <CardDescription>Users that require document updates</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3 mt-2">
                      {[
                        { name: 'John Smith', role: 'Employee', missing: 2, types: ['Insurance', 'Tax Form'] },
                        { name: 'Mark Johnson', role: 'Subcontractor', missing: 4, types: ['ID Document', 'Certificate', 'Contract', 'Insurance'] },
                        { name: 'Michael Brown', role: 'Employee', missing: 1, types: ['Contract'] },
                        { name: 'Laura Clarke', role: 'Foreman', missing: 1, types: ['Certificate'] },
                        { name: 'Acme Corporation', role: 'Client', missing: 3, types: ['Registration', 'Insurance', 'Tax ID'] },
                        { name: 'Tech Solutions Inc.', role: 'Client', missing: 2, types: ['Contract', 'Insurance'] }
                      ].map((user, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-medium">
                                {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.role}</div>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                              {user.missing} missing
                            </Badge>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {user.types.map((type, i) => (
                              <Badge key={i} variant="outline" className="bg-gray-100 text-gray-800">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default DataOverviewSheet;
