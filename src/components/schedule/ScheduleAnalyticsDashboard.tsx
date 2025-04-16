
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  {
    name: "Jan",
    value: 4000,
  },
  {
    name: "Feb",
    value: 3000,
  },
  {
    name: "Mar",
    value: 2000,
  },
  {
    name: "Apr",
    value: 2780,
  },
  {
    name: "May",
    value: 1890,
  },
  {
    name: "Jun",
    value: 2390,
  },
  {
    name: "Jul",
    value: 3490,
  },
  {
    name: "Aug",
    value: 3490,
  },
  {
    name: "Sep",
    value: 3490,
  },
  {
    name: "Oct",
    value: 3490,
  },
  {
    name: "Nov",
    value: 3490,
  },
  {
    name: "Dec",
    value: 3490,
  },
];

const customerData = [
  {
    name: "Customer A",
    value: 4000,
  },
  {
    name: "Customer B",
    value: 3000,
  },
  {
    name: "Customer C",
    value: 2000,
  },
  {
    name: "Customer D",
    value: 2780,
  },
  {
    name: "Customer E",
    value: 1890,
  },
  {
    name: "Customer F",
    value: 2390,
  },
  {
    name: "Customer G",
    value: 3490,
  },
];

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="h-64">{children}</div>
    </div>
  );
};

interface ScheduleAnalyticsDashboardProps {
  chartConfig?: {
    title?: string;
  };
  onClose?: () => void;
  onStatusFilterChange?: (status: string) => void; 
  onCustomerFilterChange?: (customer: string) => void;
  onOperatorFilterChange?: (operator: string) => void;
}

const ScheduleAnalyticsDashboard: React.FC<ScheduleAnalyticsDashboardProps> = ({ 
  chartConfig, 
  onClose,
  onStatusFilterChange,
  onCustomerFilterChange,
  onOperatorFilterChange 
}) => {
  // Cast chartConfig?.title to React.ReactNode to fix the type error
  const chartTitle = chartConfig?.title as React.ReactNode;

  return (
    <div className="flex flex-col lg:w-1/4 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {onClose && (
        <div className="p-3 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-medium text-gray-700">Data Overview</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose} 
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="p-4 overflow-y-auto">
        <div className="grid grid-cols-1 gap-6">
          <ChartCard title="Monthly Revenue">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top Customers">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={customerData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div>
            <ChartContainer
              className="h-[250px]"
              config={{
                revenue: {
                  label: "Revenue",
                  color: "#8884d8",
                },
                services: {
                  label: "Services",
                  color: "#82ca9d",
                },
              }}
            >
              <AreaChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="revenue"
                  stroke="var(--color-revenue)"
                  fill="var(--color-revenue)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAnalyticsDashboard;
