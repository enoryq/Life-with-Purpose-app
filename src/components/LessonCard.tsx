
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Play } from 'lucide-react';

interface LessonCardProps {
  day: number;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  onStart: () => void;
  onComplete: () => void;
}

const LessonCard = ({ day, title, description, status, onStart, onComplete }: LessonCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">
            {day}
          </div>
          <Badge className={`text-xs ${getStatusColor()}`}>
            <span className="flex items-center gap-1">
              {getStatusIcon()}
              {getStatusText()}
            </span>
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
        
        <div className="flex gap-2">
          {status === 'not_started' && (
            <Button onClick={onStart} size="sm" className="flex-1">
              <Play className="mr-2 w-4 h-4" />
              Start Lesson
            </Button>
          )}
          
          {status === 'in_progress' && (
            <Button onClick={onComplete} size="sm" className="flex-1">
              <CheckCircle className="mr-2 w-4 h-4" />
              Mark Complete
            </Button>
          )}
          
          {status === 'completed' && (
            <Button variant="outline" size="sm" className="flex-1" disabled>
              <CheckCircle className="mr-2 w-4 h-4" />
              Completed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
