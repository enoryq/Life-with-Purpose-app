
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserActivities } from '@/hooks/useUserActivities';
import { 
  Activity, 
  Target, 
  BookOpen, 
  Sparkles, 
  Heart,
  Clock
} from 'lucide-react';

const ActivityTimelineWidget = () => {
  const { activities, loading } = useUserActivities();

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'goal_created':
      case 'goal_completed':
        return Target;
      case 'daily_reflection_completed':
        return BookOpen;
      case 'vision_item_created':
      case 'vision_item_achieved':
        return Sparkles;
      case 'values_assessment_completed':
        return Heart;
      default:
        return Activity;
    }
  };

  const getActivityColor = (activityType: string) => {
    switch (activityType) {
      case 'goal_created':
        return 'text-blue-600 bg-blue-100';
      case 'goal_completed':
        return 'text-green-600 bg-green-100';
      case 'daily_reflection_completed':
        return 'text-purple-600 bg-purple-100';
      case 'vision_item_created':
        return 'text-yellow-600 bg-yellow-100';
      case 'vision_item_achieved':
        return 'text-orange-600 bg-orange-100';
      case 'values_assessment_completed':
        return 'text-pink-600 bg-pink-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityMessage = (activity: any) => {
    switch (activity.activity_type) {
      case 'goal_created':
        return `Created new goal: "${activity.activity_data?.goal_title || 'Untitled'}"`;
      case 'goal_completed':
        return 'Completed a goal! 🎉';
      case 'daily_reflection_completed':
        return `Completed daily reflection (Mood: ${activity.activity_data?.mood || 'Not specified'})`;
      case 'vision_item_created':
        return `Added new vision: "${activity.activity_data?.item_title || 'Untitled'}"`;
      case 'vision_item_achieved':
        return 'Achieved a vision! ✨';
      case 'values_assessment_completed':
        return `Completed values assessment (${activity.activity_data?.values_count || 0} values)`;
      default:
        return 'Activity completed';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">No activities yet</p>
          <p className="text-sm text-gray-500">Start by setting a goal or completing a reflection</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const IconComponent = getActivityIcon(activity.activity_type);
            const colorClasses = getActivityColor(activity.activity_type);
            
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClasses}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">
                    {getActivityMessage(activity)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {formatTimeAgo(activity.created_at)}
                    </Badge>
                    {activity.activity_data?.category && (
                      <Badge variant="secondary" className="text-xs">
                        {activity.activity_data.category}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimelineWidget;
