
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Chart from '@/components/Chart';
import { Skeleton } from '@/components/ui/skeleton';

interface AnalyticsChartProps {
  title: string;
  description?: string;
  chartType: 'bar' | 'line' | 'pie';
  data: any[];
  nameKey?: string;
  dataKey?: string;
  series?: any[];
  isLoading?: boolean;
  className?: string;
  showGrid?: boolean;
  layout?: 'vertical' | 'horizontal';
  onSegmentClick?: (index: number) => void;
}

const AnalyticsChart = ({
  title,
  description,
  chartType,
  data,
  nameKey = 'name',
  dataKey = 'value',
  series = [],
  isLoading = false,
  className = '',
  showGrid = false,
  layout = 'horizontal',
  onSegmentClick
}: AnalyticsChartProps) => {
  const handleChartClick = (data: any, index: number) => {
    if (onSegmentClick) {
      onSegmentClick(index);
    }
  };

  return (
    <Card className={`border-gray-200 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-[300px] w-full" />
          </div>
        ) : data.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          <div className="h-[300px]">
            <Chart
              type={chartType}
              data={data}
              nameKey={nameKey}
              dataKey={dataKey}
              series={series}
              showGrid={showGrid}
              layout={layout}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
