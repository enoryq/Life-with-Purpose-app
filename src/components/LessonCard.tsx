
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Play, Lock, Eye } from 'lucide-react';

interface LessonCardProps {
  week: number;
  day: number;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  isLocked: boolean;
  onStart: () => void;
  onComplete: () => void;
}

const LessonCard = ({ 
  week, 
  day, 
  title, 
  description, 
  status, 
  isLocked, 
  onStart, 
  onComplete 
}: LessonCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = () => {
    if (isLocked) return 'bg-gray-100 text-gray-500 border-gray-200';
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
    if (isLocked) return <Lock className="w-4 h-4" />;
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
    if (isLocked) return 'Locked';
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  const handleViewLesson = () => {
    if (!isLocked) {
      navigate(`/lesson/${week}/${day}`);
    }
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${isLocked ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            isLocked 
              ? 'bg-gray-100 text-gray-400' 
              : 'bg-purple-100 text-purple-600'
          }`}>
            {day}
          </div>
          <Badge className={`text-xs ${getStatusColor()}`}>
            <span className="flex items-center gap-1">
              {getStatusIcon()}
              {getStatusText()}
            </span>
          </Badge>
        </div>
        <CardTitle className={`text-lg leading-tight ${isLocked ? 'text-gray-500' : ''}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className={`text-sm leading-relaxed ${isLocked ? 'text-gray-400' : ''}`}>
          {description}
        </CardDescription>
        
        <div className="flex gap-2">
          {!isLocked && (
            <>
              <Button 
                onClick={handleViewLesson} 
                variant="outline" 
                size="sm" 
                className="flex-1"
              >
                <Eye className="mr-2 w-4 h-4" />
                View Lesson
              </Button>

              {status === 'not_started' && (
                <Button onClick={onStart} size="sm" className="flex-1">
                  <Play className="mr-2 w-4 h-4" />
                  Start
                </Button>
              )}
              
              {status === 'in_progress' && (
                <Button onClick={onComplete} size="sm" className="flex-1">
                  <CheckCircle className="mr-2 w-4 h-4" />
                  Complete
                </Button>
              )}
              
              {status === 'completed' && (
                <Button variant="outline" size="sm" className="flex-1" disabled>
                  <CheckCircle className="mr-2 w-4 h-4" />
                  Completed
                </Button>
              )}
            </>
          )}

          {isLocked && (
            <Button variant="outline" size="sm" className="flex-1" disabled>
              <Lock className="mr-2 w-4 h-4" />
              Complete Previous Lesson
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
