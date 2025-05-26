
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserGoals } from '@/hooks/useUserGoals';
import { useDailyReflections } from '@/hooks/useDailyReflections';
import { Lightbulb, Target, BookOpen, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecommendationsWidget = () => {
  const { goals } = useUserGoals();
  const { reflections } = useDailyReflections();

  const hasActiveGoals = goals.filter(g => g.status === 'active').length > 0;
  const hasRecentReflection = reflections.length > 0 && 
    new Date(reflections[0].reflection_date).toDateString() === new Date().toDateString();

  const recommendations = [
    {
      id: 1,
      title: "Complete Today's Reflection",
      description: "Take 5 minutes to reflect on your day and set intentions for tomorrow",
      action: "Start Reflection",
      link: "/resources",
      icon: BookOpen,
      priority: "high",
      condition: !hasRecentReflection
    },
    {
      id: 2,
      title: "Set Your First Goal",
      description: "Define a meaningful goal to start your purposeful journey",
      action: "Create Goal",
      link: "/resources",
      icon: Target,
      priority: "medium",
      condition: !hasActiveGoals
    },
    {
      id: 3,
      title: "Explore Your Values",
      description: "Discover what truly matters to you with our values assessment",
      action: "Take Assessment",
      link: "/resources",
      icon: Heart,
      priority: "medium",
      condition: true
    },
    {
      id: 4,
      title: "Chat with Your AI Companion",
      description: "Get personalized guidance and support for your journey",
      action: "Start Chat",
      link: "/chat",
      icon: Lightbulb,
      priority: "low",
      condition: true
    }
  ].filter(rec => rec.condition).slice(0, 3);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-gray-600 mb-4">Great job! You're on track with your journey.</p>
          <p className="text-sm text-gray-500">Check back later for new recommendations.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Personalized Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <rec.icon className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-800">{rec.title}</h4>
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(rec.priority)}`}>
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{rec.description}</p>
                <Link to={rec.link}>
                  <Button size="sm" variant="outline" className="text-purple-600 border-purple-300 hover:bg-purple-50">
                    {rec.action}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecommendationsWidget;
