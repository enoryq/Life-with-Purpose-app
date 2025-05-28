
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Target, Star, BookOpen, Palette } from 'lucide-react';
import ValuesAssessment from './ValuesAssessment';
import GoalSettingTemplate from './GoalSettingTemplate';
import DailyReflection from './DailyReflection';
import VisionBoardCreator from './VisionBoardCreator';

interface ToolContainerProps {
  activeTab: string;
  onBackToOverview: () => void;
}

const ToolContainer = ({ activeTab, onBackToOverview }: ToolContainerProps) => {
  const tools = [
    {
      id: 'values',
      title: 'Values Assessment Tool',
      description: 'Discover your core values through an interactive questionnaire that helps you understand what truly matters in your life.',
      icon: Star,
      category: 'Self-Discovery',
      estimatedTime: '5-10 minutes',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      difficulty: 'Beginner'
    },
    {
      id: 'goals',
      title: 'Goal Setting Template',
      description: 'Create SMART goals with actionable steps using our structured template that breaks down big dreams into achievable milestones.',
      icon: Target,
      category: 'Planning',
      estimatedTime: '10-15 minutes',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      difficulty: 'Intermediate'
    },
    {
      id: 'reflection',
      title: 'Daily Reflection Journal',
      description: 'Build self-awareness through guided daily reflection prompts that help you process experiences and grow.',
      icon: BookOpen,
      category: 'Mindfulness',
      estimatedTime: '5-10 minutes',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      difficulty: 'Beginner'
    },
    {
      id: 'vision',
      title: 'Vision Board Creator',
      description: 'Visualize your dreams and aspirations with our digital vision board that keeps your goals front and center.',
      icon: Palette,
      category: 'Creativity',
      estimatedTime: '15-20 minutes',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      difficulty: 'Beginner'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderToolContent = () => {
    switch (activeTab) {
      case 'values':
        return <ValuesAssessment />;
      case 'goals':
        return <GoalSettingTemplate />;
      case 'reflection':
        return <DailyReflection />;
      case 'vision':
        return <VisionBoardCreator />;
      default:
        return null;
    }
  };

  const currentTool = tools.find(t => t.id === activeTab);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button 
          onClick={onBackToOverview} 
          variant="outline"
          className="mb-4 bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools Overview
        </Button>
        
        {currentTool && (
          <div className={`p-6 rounded-xl ${currentTool.bgColor} ${currentTool.borderColor} border-2 mb-6`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <currentTool.icon className={`w-6 h-6 ${currentTool.color}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{currentTool.title}</h1>
                <p className="text-gray-600">{currentTool.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="secondary">{currentTool.category}</Badge>
              <Badge className={getDifficultyColor(currentTool.difficulty)}>
                {currentTool.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-gray-600">
                <Clock className="w-4 h-4" />
                {currentTool.estimatedTime}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
        {renderToolContent()}
      </div>
    </div>
  );
};

export default ToolContainer;
