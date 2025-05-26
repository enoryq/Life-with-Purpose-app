
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Target, Star, BookOpen, Palette } from 'lucide-react';
import ValuesAssessment from './ValuesAssessment';
import GoalSettingTemplate from './GoalSettingTemplate';
import DailyReflection from './DailyReflection';
import VisionBoardCreator from './VisionBoardCreator';

const ToolsAndTemplates = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tools = [
    {
      id: 'values',
      title: 'Values Assessment Tool',
      description: 'Discover your core values through an interactive questionnaire',
      icon: Star,
      category: 'Self-Discovery',
      estimatedTime: '5-10 minutes',
      color: 'text-yellow-600'
    },
    {
      id: 'goals',
      title: 'Goal Setting Template',
      description: 'Create SMART goals with actionable steps and track your progress',
      icon: Target,
      category: 'Planning',
      estimatedTime: '10-15 minutes',
      color: 'text-blue-600'
    },
    {
      id: 'reflection',
      title: 'Daily Reflection Journal',
      description: 'Develop self-awareness through guided daily reflection prompts',
      icon: BookOpen,
      category: 'Mindfulness',
      estimatedTime: '5-10 minutes',
      color: 'text-green-600'
    },
    {
      id: 'vision',
      title: 'Vision Board Creator',
      description: 'Visualize your dreams and aspirations with a digital vision board',
      icon: Palette,
      category: 'Creativity',
      estimatedTime: '15-20 minutes',
      color: 'text-purple-600'
    }
  ];

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

  if (activeTab !== 'overview') {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => setActiveTab('overview')} 
          variant="outline"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools Overview
        </Button>
        {renderToolContent()}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent">
          Interactive Tools & Templates
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Practical, interactive tools designed to support your personal growth journey. 
          Start with any tool that resonates with your current needs.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tools.map((tool) => (
          <Card 
            key={tool.id} 
            className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-0 bg-white/70 backdrop-blur-sm"
            onClick={() => setActiveTab(tool.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center">
                  <tool.icon className={`w-6 h-6 ${tool.color}`} />
                </div>
                <Badge variant="secondary">{tool.category}</Badge>
              </div>
              <CardTitle className="text-xl group-hover:text-purple-700 transition-colors">
                {tool.title}
              </CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                {tool.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">⏱️ {tool.estimatedTime}</span>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Start Tool
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tips Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl text-center">💡 Quick Tips for Success</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-800">Getting Started</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Set aside dedicated time without distractions</li>
                <li>• Be honest and authentic in your responses</li>
                <li>• There are no right or wrong answers</li>
                <li>• Save your progress and revisit regularly</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-800">Making the Most of These Tools</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Start with the Values Assessment for foundation</li>
                <li>• Use Goal Setting to turn insights into action</li>
                <li>• Daily Reflection builds lasting habits</li>
                <li>• Vision Board keeps you motivated</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolsAndTemplates;
