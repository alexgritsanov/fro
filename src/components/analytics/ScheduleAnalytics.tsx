
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Activity, AlarmClock, CalendarClock, BarChart2 } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import AnalyticsChart from './AnalyticsChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchScheduleSummary, fetchStatusDistribution, fetchMonthlyTrend, fetchTopOperators, fetchDailyDistribution, fetchServiceTypeDistribution } from '@/services/analytics';

interface ScheduleAnalyticsProps {
  timeRange: string;
}

const ScheduleAnalytics: React.FC<ScheduleAnalyticsProps> = ({ timeRange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalServices: 0,
    activeServices: 0,
    completedServices: 0,
    averageServiceTime: 0
  });
  const [statusData, setStatusData] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [topOperators, setTopOperators] = useState([]);
  const [dailyDistribution, setDailyDistribution] = useState([]);
  const [serviceTypeData, setServiceTypeData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [summaryData, statusDistribution, monthlyData, operatorsData, dailyData, typeData] = await Promise.all([
          fetchScheduleSummary(timeRange),
          fetchStatusDistribution(timeRange),
          fetchMonthlyTrend(timeRange),
          fetchTopOperators(timeRange),
          fetchDailyDistribution(timeRange),
          fetchServiceTypeDistribution(timeRange)
        ]);

        setSummary(summaryData);
        setStatusData(statusDistribution);
        setMonthlyTrend(monthlyData);
        setTopOperators(operatorsData);
        setDailyDistribution(dailyData);
        setServiceTypeData(typeData);
      } catch (error) {
        console.error('Error loading schedule analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [timeRange]);

  const monthlyTrendSeries = [
    { key: 'scheduled', label: 'Scheduled', color: '#3366FF' },
    { key: 'completed', label: 'Completed', color: '#10B981' },
    { key: 'cancelled', label: 'Cancelled', color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <AnalyticsCard
          title="Total Service Calls"
          value={summary.totalServices}
          trend={12}
          trendLabel="vs. previous period"
          icon={<Calendar className="h-4 w-4" />}
          isLoading={isLoading}
        />
        
        <AnalyticsCard
          title="Active Services"
          value={summary.activeServices}
          trend={5}
          trendLabel="vs. previous period"
          icon={<Activity className="h-4 w-4" />}
          isLoading={isLoading}
        />
        
        <AnalyticsCard
          title="Completed Services"
          value={summary.completedServices}
          trend={8}
          trendLabel="vs. previous period"
          icon={<Clock className="h-4 w-4" />}
          isLoading={isLoading}
        />
        
        <AnalyticsCard
          title="Avg. Service Time"
          value={`${summary.averageServiceTime} hrs`}
          trend={-3}
          trendLabel="vs. previous period"
          icon={<AlarmClock className="h-4 w-4" />}
          isLoading={isLoading}
        />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <AnalyticsChart
            title="Monthly Service Call Trend"
            chartType="line"
            data={monthlyTrend}
            nameKey="month"
            series={monthlyTrendSeries}
            isLoading={isLoading}
            showGrid={true}
          />
          
          <AnalyticsChart
            title="Service Call Status Distribution"
            chartType="pie"
            data={statusData}
            nameKey="name"
            dataKey="value"
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <AnalyticsChart
            title="Top Performing Operators"
            description="Based on completed service calls"
            chartType="bar"
            data={topOperators}
            nameKey="name"
            dataKey="completed"
            isLoading={isLoading}
            layout="vertical"
          />
          
          <AnalyticsChart
            title="Operator On-Time Rate"
            chartType="bar"
            data={topOperators}
            nameKey="name"
            dataKey="onTimeRate"
            isLoading={isLoading}
            layout="vertical"
          />
        </TabsContent>
        
        <TabsContent value="distribution" className="space-y-4">
          <AnalyticsChart
            title="Service Call Distribution by Day"
            chartType="bar"
            data={dailyDistribution}
            nameKey="name"
            dataKey="value"
            isLoading={isLoading}
          />
          
          <AnalyticsChart
            title="Service Type Distribution"
            chartType="pie"
            data={serviceTypeData}
            nameKey="name"
            dataKey="value"
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScheduleAnalytics;
