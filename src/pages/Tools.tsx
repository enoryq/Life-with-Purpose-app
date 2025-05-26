
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Target, Star, BookOpen, Palette, Clock, Users, CheckCircle } from 'lucide-react';
import ValuesAssessment from '../components/tools/ValuesAssessment';
import GoalSettingTemplate from '../components/tools/GoalSettingTemplate';
import DailyReflection from '../components/tools/DailyReflection';
import VisionBoardCreator from '../components/tools/VisionBoardCreator';

const Tools = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
      benefits: ['Gain clarity on personal values', 'Make aligned decisions', 'Understand motivations']
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
      benefits: ['Set clear objectives', 'Track progress', 'Stay motivated']
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
      benefits: ['Increase self-awareness', 'Process daily experiences', 'Build mindful habits']
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
      benefits: ['Visualize goals', 'Stay inspired', 'Manifest dreams']
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

  if (activeTab !== 'overview') {
    const currentTool = tools.find(t => t.id === activeTab);
    
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Button 
                onClick={() => setActiveTab('overview')} 
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
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Interactive Tools & Templates
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Powerful, interactive tools designed to support your personal growth journey. 
              Choose any tool to get started on your path to purposeful living.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {tools.map((tool) => (
              <Card 
                key={tool.id} 
                className={`group hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border-0 bg-white/80 backdrop-blur-sm ${tool.bgColor} ${tool.borderColor} border-2`}
                onClick={() => setActiveTab(tool.id)}
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
            ))}
          </div>

          {/* Getting Started Section */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 border-2">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-purple-800 flex items-center justify-center gap-2">
                <Users className="w-6 h-6" />
                Getting Started Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-purple-800 text-lg">First Time Here?</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                      <span>Start with the <strong>Values Assessment</strong> to build your foundation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                      <span>Use <strong>Goal Setting</strong> to turn insights into actionable plans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                      <span>Build the habit with <strong>Daily Reflection</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
                      <span>Visualize your future with the <strong>Vision Board</strong></span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-purple-800 text-lg">Tips for Success</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Set aside dedicated, distraction-free time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Be honest and authentic in your responses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Remember: there are no right or wrong answers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Save your progress and revisit tools regularly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Tools;
