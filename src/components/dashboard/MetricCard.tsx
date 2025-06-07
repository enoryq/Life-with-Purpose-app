
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: string;
  change?: {
    value: string;
    trend: 'up' | 'down';
    period: string;
  };
  color: 'purple' | 'green' | 'blue' | 'orange';
  viewAllLink?: string;
}

const MetricCard = ({ title, value, icon: Icon, trend, change, color, viewAllLink }: MetricCardProps) => {
  const colorClasses = {
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      icon: 'text-purple-600',
      iconBg: 'bg-purple-100',
      text: 'text-purple-600'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      icon: 'text-green-600',
      iconBg: 'bg-green-100',
      text: 'text-green-600'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      icon: 'text-blue-600',
      iconBg: 'bg-blue-100',
      text: 'text-blue-600'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      icon: 'text-orange-600',
      iconBg: 'bg-orange-100',
      text: 'text-orange-600'
    }
  };

  const classes = colorClasses[color];

  return (
    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          {Icon && (
            <div className={`w-12 h-12 ${classes.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
              <Icon className={`w-6 h-6 ${classes.icon}`} />
            </div>
          )}
          <div className="text-right">
            <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{value}</div>
            <div className="text-sm font-medium text-gray-500">{title}</div>
          </div>
        </div>

        {trend && (
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-600">{trend}</span>
          </div>
        )}

        {change && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              {change.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${change.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
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
