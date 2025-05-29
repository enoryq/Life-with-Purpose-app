
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

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

interface ReflectionCardProps {
  reflection: ReflectionData;
  showTime?: boolean;
}

const ReflectionCard: React.FC<ReflectionCardProps> = ({ reflection, showTime = true }) => {
  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {reflection.title || 'Untitled Reflection'}
          </CardTitle>
          {reflection.mood && <Badge className="bg-purple-600">{reflection.mood}</Badge>}
        </div>
        {showTime && (
          <CardDescription>
            {new Date(reflection.created_at).toLocaleTimeString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {reflection.gratitude && (
          <div>
            <h4 className="font-medium text-purple-800">Gratitude</h4>
            <p className="text-gray-700">{reflection.gratitude}</p>
          </div>
        )}
        {reflection.accomplishment && (
          <div>
            <h4 className="font-medium text-purple-800">Accomplishments</h4>
            <p className="text-gray-700">{reflection.accomplishment}</p>
          </div>
        )}
        {reflection.challenge && (
          <div>
            <h4 className="font-medium text-purple-800">Challenges</h4>
            <p className="text-gray-700">{reflection.challenge}</p>
          </div>
        )}
        {reflection.tomorrow && (
          <div>
            <h4 className="font-medium text-purple-800">Tomorrow's Focus</h4>
            <p className="text-gray-700">{reflection.tomorrow}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReflectionCard;
