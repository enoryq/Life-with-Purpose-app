
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Target, TrendingUp, Calendar, Star } from 'lucide-react';
import { useEngagementMetrics } from '@/hooks/useEngagementMetrics';

const EngagementInsightsWidget = () => {
  const { 
    loading, 
    getTodaysMetrics, 
    getTotalTimeThisWeek, 
    getMostUsedTools, 
    getStreakDays 
  } = useEngagementMetrics();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Engagement Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const todaysMetrics = getTodaysMetrics();
  const weeklyTime = getTotalTimeThisWeek();
  const topTools = getMostUsedTools(3);
  const streakDays = getStreakDays();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Engagement Insights
        </CardTitle>
        <CardDescription>
          Your personal development activity summary
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Today's Activity */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Today's Activity
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {todaysMetrics?.total_session_time || 0}
              </div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {todaysMetrics?.reflections_count || 0}
              </div>
              <div className="text-sm text-gray-600">Reflections</div>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
            <Target className="w-4 h-4" />
            This Week
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Time Spent</span>
              <span className="font-medium">{weeklyTime} / 150 min</span>
            </div>
            <Progress value={(weeklyTime / 150) * 100} className="h-2" />
            <p className="text-xs text-gray-500">
              {weeklyTime >= 150 ? '🎉 Weekly goal achieved!' : `${150 - weeklyTime} minutes to reach weekly goal`}
            </p>
          </div>
        </div>

        {/* Streak */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Current Streak
          </h4>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-orange-600">
              {streakDays}
            </div>
            <div className="text-sm text-gray-600">
              day{streakDays !== 1 ? 's' : ''} of consistent activity
            </div>
          </div>
        </div>

        {/* Most Used Tools */}
        {topTools.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Favorite Tools
            </h4>
            <div className="space-y-2">
              {topTools.map(({ tool, minutes }, index) => (
                <div key={tool} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={index === 0 ? 'default' : 'secondary'} className="text-xs">
                      {index + 1}
                    </Badge>
                    <span className="text-sm">{tool}</span>
                  </div>
                  <span className="text-sm text-gray-500">{minutes}m</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Message */}
        <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg text-center">
          <p className="text-sm text-gray-700">
            {streakDays >= 7 
              ? "🔥 You're on fire! Keep up the amazing consistency!" 
              : streakDays >= 3 
              ? "✨ Great momentum! You're building a powerful habit!" 
              : "🌱 Every step counts. You're growing stronger each day!"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementInsightsWidget;
