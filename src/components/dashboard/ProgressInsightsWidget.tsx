
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useUserGoals } from '@/hooks/useUserGoals';
import { useDailyReflections } from '@/hooks/useDailyReflections';
import { useVisionBoard } from '@/hooks/useVisionBoard';
import { TrendingUp, Calendar, Zap, Award } from 'lucide-react';

const ProgressInsightsWidget = () => {
  const { goals } = useUserGoals();
  const { reflections } = useDailyReflections();
  const { visionItems } = useVisionBoard();

  // Calculate streak for daily reflections
  const calculateReflectionStreak = () => {
    if (reflections.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < reflections.length; i++) {
      const reflectionDate = new Date(reflections[i].reflection_date);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (reflectionDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const activeGoals = goals.filter(g => g.status === 'active').length;
  const achievedVisions = visionItems.filter(v => v.status === 'achieved').length;
  const reflectionStreak = calculateReflectionStreak();
  
  const completionRate = goals.length > 0 ? Math.round((completedGoals / goals.length) * 100) : 0;

  const insights = [
    {
      title: 'Goal Completion Rate',
      value: `${completionRate}%`,
      description: `${completedGoals} of ${goals.length} goals completed`,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      progress: completionRate
    },
    {
      title: 'Reflection Streak',
      value: `${reflectionStreak} days`,
      description: reflectionStreak > 0 ? 'Keep it up!' : 'Start your first reflection',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      progress: Math.min(reflectionStreak * 10, 100)
    },
    {
      title: 'Active Goals',
      value: activeGoals.toString(),
      description: 'Goals you\'re working on',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      progress: Math.min(activeGoals * 20, 100)
    },
    {
      title: 'Visions Achieved',
      value: achievedVisions.toString(),
      description: 'Dreams turned into reality',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      progress: Math.min(achievedVisions * 25, 100)
    }
  ];

  const getStreakBadge = () => {
    if (reflectionStreak >= 30) return { text: 'Legendary', color: 'bg-purple-100 text-purple-800' };
    if (reflectionStreak >= 14) return { text: 'Consistent', color: 'bg-green-100 text-green-800' };
    if (reflectionStreak >= 7) return { text: 'Building Habit', color: 'bg-blue-100 text-blue-800' };
    if (reflectionStreak >= 3) return { text: 'Getting Started', color: 'bg-yellow-100 text-yellow-800' };
    return null;
  };

  const streakBadge = getStreakBadge();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Progress Insights
          </CardTitle>
          {streakBadge && (
            <Badge className={streakBadge.color}>{streakBadge.text}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 ${insight.bgColor} rounded-full flex items-center justify-center`}>
                  <insight.icon className={`w-3 h-3 ${insight.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-800">{insight.title}</span>
              </div>
              <div className="text-xl font-bold text-gray-800">{insight.value}</div>
              <div className="text-xs text-gray-600">{insight.description}</div>
              <Progress value={insight.progress} className="h-1" />
            </div>
          ))}
        </div>
        
        {reflectionStreak > 0 && (
          <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Reflection Journey</span>
            </div>
            <p className="text-xs text-blue-700">
              You've been consistently reflecting for {reflectionStreak} days. Self-awareness is the foundation of purposeful living!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressInsightsWidget;
