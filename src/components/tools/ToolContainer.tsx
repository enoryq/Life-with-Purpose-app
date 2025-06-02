
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Star, BookOpen, Palette, Wind, Crown, Target } from 'lucide-react';
import ValuesAssessment from './ValuesAssessment';
import GoalSettingTemplate from './GoalSettingTemplate';
import DailyReflection from './DailyReflection';
import VisionBoardCreator from './VisionBoardCreator';
import BreathingVisualizer from './BreathingVisualizer';

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
      difficulty: 'Beginner',
      isPremium: false
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
      difficulty: 'Intermediate',
      isPremium: false
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
      difficulty: 'Beginner',
      isPremium: false
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
      difficulty: 'Beginner',
      isPremium: false
    },
    {
      id: 'breathing',
      title: 'Breathing Visualizer',
      description: 'Practice guided breathing exercises with visual cues to reduce stress, improve focus, and enhance well-being.',
      icon: Wind,
      category: 'Wellness',
      estimatedTime: '5-15 minutes',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      difficulty: 'Beginner',
      isPremium: true
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
      case 'breathing':
        return <BreathingVisualizer />;
      default:
        return null;
    }
  };

  const currentTool = tools.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button 
            onClick={onBackToOverview} 
            variant="outline"
            className="mb-6 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools Overview
          </Button>
          
          {currentTool && (
            <div className="bg-white rounded-xl shadow-lg border-0 p-8 mb-8">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <currentTool.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-800">{currentTool.title}</h1>
                    {currentTool.isPremium && (
                      <Crown className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-gray-600 text-lg">{currentTool.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">{currentTool.category}</Badge>
                <Badge className={getDifficultyColor(currentTool.difficulty)}>
                  {currentTool.difficulty}
                </Badge>
                {currentTool.isPremium && (
                  <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  {currentTool.estimatedTime}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border-0 p-8">
          {renderToolContent()}
        </div>
      </div>
    </div>
  );
};

export default ToolContainer;
