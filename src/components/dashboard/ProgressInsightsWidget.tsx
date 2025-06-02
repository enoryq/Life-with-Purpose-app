
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUserGoals } from '@/hooks/useUserGoals';
import { useDailyReflections } from '@/hooks/useDailyReflections';
import { useVisionBoard } from '@/hooks/useVisionBoard';
import { TrendingUp, Calendar, Zap, Award, Target, ArrowRight, Flame, Brain, Heart, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  // Calculate weekly reflection rate
  const lastWeekReflections = reflections.filter(r => {
    const reflectionDate = new Date(r.reflection_date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return reflectionDate >= weekAgo;
  }).length;

  const insights = [
    {
      title: 'Goal Completion Rate',
      value: `${completionRate}%`,
      description: `${completedGoals} of ${goals.length} goals completed`,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      progress: completionRate,
      trend: completionRate > 50 ? 'up' : completionRate > 25 ? 'stable' : 'down'
    },
    {
      title: 'Reflection Streak',
      value: `${reflectionStreak} days`,
      description: reflectionStreak > 0 ? 'Keep the momentum!' : 'Start your journey',
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      progress: Math.min(reflectionStreak * 10, 100),
      trend: reflectionStreak >= 7 ? 'up' : reflectionStreak >= 3 ? 'stable' : 'down'
    },
    {
      title: 'Weekly Activity',
      value: `${lastWeekReflections}/7`,
      description: 'Reflections this week',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      progress: (lastWeekReflections / 7) * 100,
      trend: lastWeekReflections >= 5 ? 'up' : lastWeekReflections >= 3 ? 'stable' : 'down'
    },
    {
      title: 'Vision Progress',
      value: achievedVisions.toString(),
      description: 'Dreams turned reality',
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      progress: Math.min(achievedVisions * 25, 100),
      trend: achievedVisions > 0 ? 'up' : 'stable'
    }
  ];

  const getStreakBadge = () => {
    if (reflectionStreak >= 30) return { text: 'Legendary', color: 'bg-purple-100 text-purple-800', icon: '🏆' };
    if (reflectionStreak >= 14) return { text: 'Consistent', color: 'bg-green-100 text-green-800', icon: '🔥' };
    if (reflectionStreak >= 7) return { text: 'Building Habit', color: 'bg-blue-100 text-blue-800', icon: '💪' };
    if (reflectionStreak >= 3) return { text: 'Getting Started', color: 'bg-yellow-100 text-yellow-800', icon: '🌱' };
    return null;
  };

  const getPersonalizedSuggestions = () => {
    const suggestions = [];
    
    if (reflectionStreak === 0) {
      suggestions.push({
        text: "Start your reflection journey today",
        action: "Begin Reflecting",
        link: "/tools",
        icon: BookOpen,
        priority: 'high'
      });
    } else if (reflectionStreak < 7) {
      suggestions.push({
        text: "Build consistency - aim for daily reflections",
        action: "Continue Streak",
        link: "/tools",
        icon: Flame,
        priority: 'medium'
      });
    }

    if (activeGoals === 0) {
      suggestions.push({
        text: "Set meaningful goals to guide your journey",
        action: "Create Goals",
        link: "/tools",
        icon: Target,
        priority: 'high'
      });
    } else if (completionRate < 30) {
      suggestions.push({
        text: "Break down goals into smaller steps",
        action: "Review Goals",
        link: "/tools",
        icon: Zap,
        priority: 'medium'
      });
    }

    if (lastWeekReflections < 3) {
      suggestions.push({
        text: "Increase reflection frequency for better insights",
        action: "Reflect Now",
        link: "/tools",
        icon: Brain,
        priority: 'medium'
      });
    }

    return suggestions.slice(0, 2);
  };

  const streakBadge = getStreakBadge();
  const suggestions = getPersonalizedSuggestions();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '➡️';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Progress Insights
          </CardTitle>
          {streakBadge && (
            <Badge className={streakBadge.color}>
              {streakBadge.icon} {streakBadge.text}
            </Badge>
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
                <span className="text-xs">{getTrendIcon(insight.trend)}</span>
              </div>
              <div className="text-xl font-bold text-gray-800">{insight.value}</div>
              <div className="text-xs text-gray-600">{insight.description}</div>
              <Progress value={insight.progress} className="h-1" />
            </div>
          ))}
        </div>
        
        {/* Personalized Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              Personalized Suggestions
            </h4>
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <suggestion.icon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-800">{suggestion.text}</span>
                  </div>
                  <Link to={suggestion.link}>
                    <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-100">
                      {suggestion.action}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Streak Motivation */}
        {reflectionStreak > 0 && (
          <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Reflection Journey</span>
            </div>
            <p className="text-xs text-green-700">
              {reflectionStreak >= 21 ? 
                `Incredible! ${reflectionStreak} days of consistent reflection. You've built a powerful habit!` :
                reflectionStreak >= 7 ?
                `Great progress! ${reflectionStreak} days strong. Habits form around 21 days - keep going!` :
                `You're on day ${reflectionStreak}! Self-awareness is the foundation of purposeful living.`
              }
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Link to="/tools" className="flex-1">
            <Button size="sm" variant="outline" className="w-full text-xs">
              <Target className="w-3 h-3 mr-1" />
              Set Goals
            </Button>
          </Link>
          <Link to="/tools" className="flex-1">
            <Button size="sm" variant="outline" className="w-full text-xs">
              <BookOpen className="w-3 h-3 mr-1" />
              Reflect
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressInsightsWidget;
