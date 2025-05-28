
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, LucideIcon } from 'lucide-react';

interface ToolCardProps {
  tool: {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    category: string;
    estimatedTime: string;
    color: string;
    bgColor: string;
    borderColor: string;
    difficulty: string;
    benefits: string[];
  };
  onToolSelect: (toolId: string) => void;
}

const ToolCard = ({ tool, onToolSelect }: ToolCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className={`group hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border-0 bg-white/80 backdrop-blur-sm ${tool.bgColor} ${tool.borderColor} border-2`}
      onClick={() => onToolSelect(tool.id)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
            <tool.icon className={`w-8 h-8 ${tool.color}`} />
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className="w-fit">{tool.category}</Badge>
            <Badge className={`w-fit ${getDifficultyColor(tool.difficulty)}`}>
              {tool.difficulty}
            </Badge>
          </div>
        </div>
        
        <CardTitle className={`text-2xl group-hover:${tool.color} transition-colors mb-2`}>
          {tool.title}
        </CardTitle>
        
        <CardDescription className="text-gray-600 leading-relaxed text-base">
          {tool.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="w-4 h-4" />
            {tool.estimatedTime}
          </div>
          <Button 
            size="sm" 
            className={`opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-purple-600 to-blue-600`}
          >
            Start Tool
          </Button>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800 flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            What you'll gain:
          </h4>
          <ul className="space-y-1">
            {tool.benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
