
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
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Goals Completed',
      value: completedGoals,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Daily Reflections',
      value: totalReflections,
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Visions Achieved',
      value: achievedVisions,
      icon: Sparkles,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow">
          <CardContent className="p-4 text-center">
            <div className={`w-8 h-8 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStatsWidget;
