
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserGoals } from '@/hooks/useUserGoals';
import { Target, ExternalLink, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentGoalsWidget = () => {
  const { goals, updateGoalStatus } = useUserGoals();

  const recentGoals = goals.filter(g => g.status === 'active').slice(0, 3);

  if (goals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Your Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">Set your first goal to get started</p>
          <Link to="/resources">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Active Goals
          </CardTitle>
          <Link to="/resources">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentGoals.map((goal) => (
          <div key={goal.id} className="p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{goal.title}</h4>
                {goal.category && (
                  <Badge variant="secondary" className="text-xs mt-1">{goal.category}</Badge>
                )}
                {goal.deadline && (
                  <p className="text-xs text-gray-500 mt-1">
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
              <Button
                onClick={() => updateGoalStatus(goal.id, 'completed')}
                variant="outline"
                size="sm"
                className="ml-2"
              >
                <CheckCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        {goals.filter(g => g.status === 'active').length > 3 && (
          <p className="text-sm text-gray-500 text-center">
            +{goals.filter(g => g.status === 'active').length - 3} more active goals
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentGoalsWidget;
