
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useUserGoals } from '@/hooks/useUserGoals';
import { useDailyReflections } from '@/hooks/useDailyReflections';
import { useVisionBoard } from '@/hooks/useVisionBoard';
import { Target, BookOpen, Sparkles, Calendar } from 'lucide-react';

const UserStatsWidget = () => {
  const { goals } = useUserGoals();
  const { reflections } = useDailyReflections();
  const { visionItems } = useVisionBoard();

  const activeGoals = goals.filter(g => g.status === 'active').length;
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const totalReflections = reflections.length;
  const achievedVisions = visionItems.filter(v => v.status === 'achieved').length;

  const stats = [
    {
      title: 'Active Goals',
      value: activeGoals,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200'
    },
    {
      title: 'Goals Completed',
      value: completedGoals,
      icon: Target,
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-100 to-emerald-200'
    },
    {
      title: 'Daily Reflections',
      value: totalReflections,
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200'
    },
    {
      title: 'Visions Achieved',
      value: achievedVisions,
      icon: Sparkles,
      color: 'text-amber-600',
      bgColor: 'bg-gradient-to-br from-amber-100 to-amber-200'
    }
  ];

  return (
    <div className="widget-card p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Progress Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/70">
            <CardContent className="p-4 text-center">
              <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-sm font-medium text-gray-600">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserStatsWidget;
