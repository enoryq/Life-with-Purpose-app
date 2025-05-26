
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Target } from 'lucide-react';

interface ProgressSummaryProps {
  totalLessons: number;
  completedLessons: number;
  inProgressLessons: number;
  currentWeek: number;
  currentDay: number;
}

const ProgressSummary = ({ 
  totalLessons, 
  completedLessons, 
  inProgressLessons, 
  currentWeek, 
  currentDay 
}: ProgressSummaryProps) => {
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
  const notStartedLessons = totalLessons - completedLessons - inProgressLessons;

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Your Progress
        </CardTitle>
        <CardDescription>
          Week {currentWeek}, Day {currentDay} • {progressPercentage}% Complete
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Overall Progress</span>
            <span>{completedLessons} of {totalLessons} lessons</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-2xl font-bold text-green-600">{completedLessons}</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              Completed
            </Badge>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-2xl font-bold text-blue-600">{inProgressLessons}</span>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
              In Progress
            </Badge>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="w-4 h-4 bg-gray-400 rounded-full" />
              <span className="text-2xl font-bold text-gray-600">{notStartedLessons}</span>
            </div>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
              Not Started
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSummary;
