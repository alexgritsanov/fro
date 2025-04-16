
import React, { useState, useEffect } from 'react';
import { User, UserCheck, Clock, CheckSquare, Users, Briefcase, Calendar } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import AnalyticsChart from './AnalyticsChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserAnalyticsProps {
  timeRange: string;
}

const UserAnalytics: React.FC<UserAnalyticsProps> = ({ timeRange }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for user analytics
  const userActivity = [
    { name: 'Mon', active: 32, completed: 18 },
    { name: 'Tue', active: 38, completed: 22 },
    { name: 'Wed', active: 40, completed: 24 },
    { name: 'Thu', active: 35, completed: 20 },
    { name: 'Fri', active: 30, completed: 15 },
    { name: 'Sat', active: 15, completed: 8 },
    { name: 'Sun', active: 10, completed: 5 },
  ];
  
  const userRoles = [
    { name: 'Admin', value: 5, color: '#3366FF' },
    { name: 'Office Staff', value: 12, color: '#10B981' },
    { name: 'Foreman', value: 8, color: '#F59E0B' },
    { name: 'Operator', value: 35, color: '#EF4444' },
    { name: 'Subcontractor', value: 15, color: '#8B5CF6' },
  ];
  
  const userPerformance = [
    { name: 'John D.', value: 95 },
    { name: 'Sarah M.', value: 92 },
    { name: 'Mike T.', value: 88 },
    { name: 'Emily R.', value: 86 },
    { name: 'David S.', value: 85 },
  ];
  
  const userJobCompletion = [
    { name: 'Week 1', value: 85 },
    { name: 'Week 2', value: 88 },
    { name: 'Week 3', value: 90 },
    { name: 'Week 4', value: 92 },
    { name: 'Week 5', value: 94 },
    { name: 'Week 6', value: 93 },
  ];

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setIsLoading(true);
      // Wait for data to load
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsLoading(false);
    };
    
    loadData();
  }, [timeRange]);

  const activitySeries = [
    { key: 'active', label: 'Active', color: '#3366FF' },
    { key: 'completed', label: 'Completed', color: '#10B981' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <AnalyticsCard
          title="Total Users"
          value="75"
          trend={8}
          trendLabel="vs. previous period"
          icon={<Users className="h-4 w-4" />}
          isLoading={isLoading}
        />
        
        <AnalyticsCard
          title="Active Users"
          value="58"
          trend={5}
          trendLabel="vs. previous period"
          icon={<UserCheck className="h-4 w-4" />}
          isLoading={isLoading}
        />
        
        <AnalyticsCard
          title="Avg. Working Hours"
          value="6.8 hrs/day"
          trend={2}
          trendLabel="vs. previous period"
          icon={<Clock className="h-4 w-4" />}
          isLoading={isLoading}
        />
        
        <AnalyticsCard
          title="Job Completion Rate"
          value="93%"
          trend={4}
          trendLabel="vs. previous period"
          icon={<CheckSquare className="h-4 w-4" />}
          isLoading={isLoading}
        />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <AnalyticsChart
            title="User Role Distribution"
            chartType="pie"
            data={userRoles}
            nameKey="name"
            dataKey="value"
            isLoading={isLoading}
          />
          
          <AnalyticsChart
            title="Daily Activity by User Type"
            chartType="line"
            data={userActivity}
            nameKey="name"
            series={activitySeries}
            isLoading={isLoading}
            showGrid={true}
          />
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <AnalyticsChart
            title="Top Performing Users"
            chartType="bar"
            data={userPerformance}
            nameKey="name"
            dataKey="value"
            isLoading={isLoading}
            layout="vertical"
          />
          
          <AnalyticsChart
            title="Job Completion Rate Trend"
            chartType="line"
            data={userJobCompletion}
            nameKey="name"
            dataKey="value"
            isLoading={isLoading}
            showGrid={true}
          />
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <AnalyticsChart
            title="User Activity by Day"
            chartType="bar"
            data={userActivity}
            nameKey="name"
            series={activitySeries}
            isLoading={isLoading}
          />
          
          <AnalyticsChart
            title="Most Active Hours"
            chartType="bar"
            data={[
              { name: '6-8 AM', value: 15 },
              { name: '8-10 AM', value: 35 },
              { name: '10-12 PM', value: 45 },
              { name: '12-2 PM', value: 25 },
              { name: '2-4 PM', value: 40 },
              { name: '4-6 PM', value: 30 },
              { name: '6-8 PM', value: 10 },
            ]}
            nameKey="name"
            dataKey="value"
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserAnalytics;
