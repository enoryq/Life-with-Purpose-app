
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import ReflectionCard from './ReflectionCard';

interface ReflectionData {
  id: string;
  reflection_date: string;
  mood?: string;
  gratitude?: string;
  accomplishment?: string;
  challenge?: string;
  tomorrow?: string;
  title?: string;
  created_at: string;
}

interface TodayReflectionsProps {
  reflections: ReflectionData[];
  onStartReflection: () => void;
}

const TodayReflections: React.FC<TodayReflectionsProps> = ({ reflections, onStartReflection }) => {
  const todaysReflections = reflections.filter(r => r.reflection_date === new Date().toISOString().split('T')[0]);

  if (todaysReflections.length > 0) {
    return (
      <div className="space-y-4">
        {todaysReflections.map((reflection) => (
          <ReflectionCard key={reflection.id} reflection={reflection} />
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="text-center py-8">
        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 mb-4">No reflections yet for today</p>
        <Button onClick={onStartReflection} variant="outline">
          Start your first reflection
        </Button>
      </CardContent>
    </Card>
  );
};

export default TodayReflections;
