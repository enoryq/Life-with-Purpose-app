
import React from 'react';
import { Target, Star, BookOpen, Palette } from 'lucide-react';
import ToolCard from './ToolCard';

interface ToolsGridProps {
  onToolSelect: (toolId: string) => void;
}

const ToolsGrid = ({ onToolSelect }: ToolsGridProps) => {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          onToolSelect={onToolSelect}
        />
      ))}
    </div>
  );
};

export default ToolsGrid;
