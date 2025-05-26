
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const CommunitySection = () => {
  const { user } = useAuth();

  return (
    <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-0">
      <CardContent className="p-8 text-center">
        <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Community</h3>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Connect with thousands of purpose-seekers on the same journey. Share insights, 
          get support, and celebrate breakthroughs together.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/community">
            <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
              Join Community
            </Button>
          </Link>
          {user && (
            <Link to="/chat">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <MessageCircle className="mr-2 w-4 h-4" />
                AI Companion
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunitySection;
