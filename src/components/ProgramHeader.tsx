
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star, Users, CheckCircle, Play } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ProgramHeaderProps {
  programOverview: {
    title: string;
    description: string;
    duration: string;
    rating: number;
    participants: string;
    category: string;
  };
  isEnrolled: boolean;
  enrollmentLoading: boolean;
  onEnroll: () => void;
}

const ProgramHeader = ({ 
  programOverview, 
  isEnrolled, 
  enrollmentLoading, 
  onEnroll 
}: ProgramHeaderProps) => {
  const { user } = useAuth();

  return (
    <div className="text-center mb-12">
      <Badge className="bg-purple-100 text-purple-800 mb-4 text-sm px-4 py-2">
        {programOverview.category}
      </Badge>
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
        {programOverview.title}
      </h1>
      <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
        {programOverview.description}
      </p>
      
      <div className="flex items-center justify-center gap-8 mb-8">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">{programOverview.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <span className="text-gray-700">{programOverview.rating}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">{programOverview.participants} completed</span>
        </div>
      </div>

      {user ? (
        <>
          {!isEnrolled && !enrollmentLoading && (
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4"
              onClick={onEnroll}
            >
              <Play className="mr-2 w-5 h-5" />
              Start Your Journey
            </Button>
          )}
          {isEnrolled && (
            <Badge className="bg-green-100 text-green-800 text-lg px-6 py-3">
              <CheckCircle className="mr-2 w-5 h-5" />
              Enrolled
            </Badge>
          )}
        </>
      ) : (
        <Link to="/auth">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4">
            <Play className="mr-2 w-5 h-5" />
            Sign Up to Start
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProgramHeader;
