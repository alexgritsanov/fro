
import React, { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  ClockIcon, 
  UserIcon, 
  ShieldIcon, 
  DollarSignIcon 
} from "lucide-react"
import Chart from "@/components/Chart"

interface DashboardStats {
  totalJobs: number;
  completedJobs: number;
  inProgressJobs: number;
  scheduledJobs: number;
  cancelledJobs: number;
  jobsCompletionRate: number;
  customerSatisfaction: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 120,
    completedJobs: 80,
    inProgressJobs: 20,
    scheduledJobs: 15,
    cancelledJobs: 5,
    jobsCompletionRate: 67,
    customerSatisfaction: 85,
  });

  useEffect(() => {
    // Simulate fetching dashboard stats from an API
    const fetchDashboardStats = async () => {
      try {
        // Replace this with your actual API endpoint
        // const response = await fetch('/api/dashboard-stats');
        // const data = await response.json();
        // setStats(data);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock data for demonstration
        setStats({
          totalJobs: 120,
          completedJobs: 80,
          inProgressJobs: 20,
          scheduledJobs: 15,
          cancelledJobs: 5,
          jobsCompletionRate: 67,
          customerSatisfaction: 85,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        // Set default values in case of error
        setStats({
          totalJobs: 0,
          completedJobs: 0,
          inProgressJobs: 0,
          scheduledJobs: 0,
          cancelledJobs: 0,
          jobsCompletionRate: 0,
          customerSatisfaction: 0,
        });
      }
    };

    fetchDashboardStats();
  }, []);

  // Ensure we have valid data for the charts
  const serviceJobsData = [
    { name: "Completed", value: stats?.completedJobs || 0 },
    { name: "In Progress", value: stats?.inProgressJobs || 0 },
    { name: "Scheduled", value: stats?.scheduledJobs || 0 },
    { name: "Cancelled", value: stats?.cancelledJobs || 0 },
  ];

  const satisfactionData = [
    { name: "Jan", value: 70 },
    { name: "Feb", value: 75 },
    { name: "Mar", value: 80 },
    { name: "Apr", value: 85 },
    { name: "May", value: 90 },
  ];

  return (
    <div className="flex-1 pb-8 pt-6 md:px-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Service Jobs
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
            <p className="text-xs text-muted-foreground">
              {stats.jobsCompletionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Operators
            </CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Agreements
            </CardTitle>
            <ShieldIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+721</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Service Jobs Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Chart
              type="bar"
              data={serviceJobsData}
              height={350}
            />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">{stats.customerSatisfaction}%</div>
              <p className="text-xs text-muted-foreground ml-2">
                +5% from last month
              </p>
            </div>
            <Chart
              type="line"
              data={satisfactionData}
              height={200}
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Service job completed for Acme Corp</li>
              <li>New agreement signed with Tech Solutions</li>
              <li>Operator John Smith completed 3 jobs today</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Service Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Service job scheduled for Global Enterprises on May 24</li>
              <li>Service job scheduled for Innovate Inc on May 25</li>
              <li>Service job scheduled for Pinnacle Group on May 26</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>New message from customer Acme Corp</li>
              <li>Agreement expiring soon with Tech Solutions</li>
              <li>Operator John Smith is available for scheduling</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
