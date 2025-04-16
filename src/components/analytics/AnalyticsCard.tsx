
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  className?: string;
  onClick?: () => void;
  footer?: React.ReactNode;
  isLoading?: boolean;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendLabel,
  className,
  onClick,
  footer,
  isLoading = false,
}) => {
  const getTrendIcon = () => {
    if (trend === undefined) return null;
    if (trend > 0) return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    if (trend < 0) return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (trend === undefined) return "text-gray-500";
    if (trend > 0) return "text-green-600";
    if (trend < 0) return "text-red-600";
    return "text-gray-500";
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all",
        onClick && "hover:shadow-md cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        {icon && <div className="text-blue-600">{icon}</div>}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {isLoading ? (
          <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        
        {description && <CardDescription className="mt-1">{description}</CardDescription>}
        
        {trend !== undefined && (
          <div className="flex items-center mt-2 text-xs">
            {getTrendIcon()}
            <span className={cn("ml-1", getTrendColor())}>
              {Math.abs(trend)}% {trend > 0 ? "increase" : trend < 0 ? "decrease" : "no change"}
              {trendLabel && ` ${trendLabel}`}
            </span>
          </div>
        )}
      </CardContent>
      
      {footer && <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">{footer}</CardFooter>}
    </Card>
  );
};

export default AnalyticsCard;
