
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  progress: number;
  change?: {
    value: string;
    trend: 'up' | 'down';
    period: string;
  };
  color: 'purple' | 'green' | 'blue' | 'orange';
  viewAllLink?: string;
}

const MetricCard = ({ title, value, progress, change, color, viewAllLink }: MetricCardProps) => {
  const colorClasses = {
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      progress: 'stroke-purple-500',
      progressBg: 'stroke-purple-200',
      text: 'text-purple-600'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      progress: 'stroke-green-500',
      progressBg: 'stroke-green-200',
      text: 'text-green-600'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      progress: 'stroke-blue-500',
      progressBg: 'stroke-blue-200',
      text: 'text-blue-600'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      progress: 'stroke-orange-500',
      progressBg: 'stroke-orange-200',
      text: 'text-orange-600'
    }
  };

  const classes = colorClasses[color];
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className={classes.progressBg}
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className={classes.progress}
                style={{
                  transition: 'stroke-dashoffset 0.5s ease-in-out',
                }}
              />
            </svg>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-500">{title}</div>
          </div>
        </div>

        {change && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              {change.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${change.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {change.value}
              </span>
            </div>
            <span className="text-sm text-gray-500">{change.period}</span>
          </div>
        )}

        {viewAllLink && (
          <Button variant="ghost" size="sm" className="w-full justify-between p-0 h-auto text-gray-600 hover:text-gray-900">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
