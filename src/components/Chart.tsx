
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

export interface SeriesItem {
  name: string;
  color: string;
  dataKey: string;
}

interface ChartProps {
  type: 'bar' | 'line' | 'pie';
  data: any[];
  height?: number;
  showGrid?: boolean;
  nameKey?: string;
  dataKey?: string;
  series?: SeriesItem[];
  layout?: 'vertical' | 'horizontal';
}

const Chart: React.FC<ChartProps> = ({ 
  type = 'bar', 
  data = [], 
  height = 300,
  showGrid = true,
  nameKey = 'name',
  dataKey = 'value',
  series = [],
  layout = 'horizontal'
}) => {
  const defaultColors = [
    '#3366FF', '#FF9500', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#0EA5E9', '#EC4899', '#14B8A6', '#F97316'
  ];

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart 
          data={data}
          layout={layout}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
          <XAxis 
            dataKey={nameKey} 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
            type={layout === 'vertical' ? 'number' : 'category'}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6B7280' }} 
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
            type={layout === 'vertical' ? 'category' : 'number'}
            dataKey={layout === 'vertical' ? nameKey : undefined}
          />
          <Tooltip />
          {series && series.length > 0 ? (
            <>
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              {series.map((s, idx) => (
                <Bar 
                  key={idx}
                  dataKey={s.dataKey} 
                  name={s.name} 
                  fill={s.color || defaultColors[idx % defaultColors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </>
          ) : (
            <Bar 
              dataKey={dataKey} 
              fill="#3366FF" 
              radius={[4, 4, 0, 0]}
            />
          )}
        </RechartsBarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
          <XAxis 
            dataKey={nameKey} 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6B7280' }} 
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <Tooltip />
          {series && series.length > 0 ? (
            <>
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              {series.map((s, idx) => (
                <Line 
                  key={idx}
                  type="monotone" 
                  dataKey={s.dataKey} 
                  name={s.name} 
                  stroke={s.color || defaultColors[idx % defaultColors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </>
          ) : (
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke="#3366FF"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Tooltip />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={height * 0.35}
            dataKey={dataKey}
            nameKey={nameKey}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || defaultColors[index % defaultColors.length]} 
              />
            ))}
          </Pie>
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </RechartsPieChart>
      </ResponsiveContainer>
    );
  }

  return null;
};

export default Chart;
