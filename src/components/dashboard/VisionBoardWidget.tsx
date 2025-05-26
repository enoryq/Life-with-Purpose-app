
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVisionBoard } from '@/hooks/useVisionBoard';
import { Sparkles, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const VisionBoardWidget = () => {
  const { visionItems } = useVisionBoard();

  const activeVisions = visionItems.filter(v => v.status === 'active').slice(0, 3);

  if (visionItems.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Your Vision Board
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">Create your first vision to get started</p>
          <Link to="/resources">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Create Vision Board
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
            <Sparkles className="w-5 h-5" />
            Your Vision Board
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
        {activeVisions.map((vision) => (
          <div key={vision.id} className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">{vision.title}</h4>
                {vision.description && (
                  <p className="text-sm text-gray-600 mt-1">{vision.description}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                {vision.category && (
                  <Badge variant="secondary" className="text-xs">{vision.category}</Badge>
                )}
                {vision.timeframe && (
                  <Badge variant="outline" className="text-xs">{vision.timeframe}</Badge>
                )}
              </div>
            </div>
          </div>
        ))}
        {visionItems.length > 3 && (
          <p className="text-sm text-gray-500 text-center">
            +{visionItems.length - 3} more visions
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default VisionBoardWidget;
