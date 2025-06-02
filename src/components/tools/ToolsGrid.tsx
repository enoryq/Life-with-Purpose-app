
import React from 'react';
import ToolCard from './ToolCard';
import { Star, Target, BookOpen, Palette, Wind } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ToolsGridProps {
  onToolSelect: (toolId: string) => void;
}

const ToolsGrid = ({ onToolSelect }: ToolsGridProps) => {
  const { user } = useAuth();
  
  // For demo purposes, treating all authenticated users as paid members
  // In a real app, you'd check user subscription status
  const isPaidMember = !!user;

  const tools = [
    {
      id: 'values',
      title: 'Values Assessment',
      description: 'Discover your core values through an interactive questionnaire that reveals what truly matters in your life.',
      icon: Star,
      category: 'Self-Discovery',
      estimatedTime: '5-10 min',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      difficulty: 'Beginner',
      benefits: [
        'Clarify your personal values',
        'Make better life decisions',
        'Increase self-awareness'
      ],
      isPremium: false
    },
    {
      id: 'goals',
      title: 'Goal Setting Template',
      description: 'Create SMART goals with actionable steps using our structured template for achieving your dreams.',
      icon: Target,
      category: 'Planning',
      estimatedTime: '10-15 min',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      difficulty: 'Intermediate',
      benefits: [
        'Set clear, achievable goals',
        'Track your progress',
        'Stay motivated and focused'
      ],
      isPremium: false
    },
    {
      id: 'reflection',
      title: 'Daily Reflection Journal',
      description: 'Build self-awareness through guided prompts that help you process experiences and track growth.',
      icon: BookOpen,
      category: 'Mindfulness',
      estimatedTime: '5-10 min',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      difficulty: 'Beginner',
      benefits: [
        'Process daily experiences',
        'Identify patterns and growth',
        'Build mindfulness habits'
      ],
      isPremium: false
    },
    {
      id: 'vision',
      title: 'Vision Board Creator',
      description: 'Visualize your dreams and aspirations with our digital vision board that keeps goals front and center.',
      icon: Palette,
      category: 'Creativity',
      estimatedTime: '15-20 min',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      difficulty: 'Beginner',
      benefits: [
        'Visualize your dreams',
        'Stay motivated',
        'Clarify your aspirations'
      ],
      isPremium: false
    },
    {
      id: 'breathing',
      title: 'Breathing Visualizer',
      description: 'Practice guided breathing exercises with visual cues to reduce stress, improve focus, and enhance well-being.',
      icon: Wind,
      category: 'Wellness',
      estimatedTime: '5-15 min',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      difficulty: 'Beginner',
      benefits: [
        'Reduce stress and anxiety',
        'Improve focus and clarity',
        'Enhance overall well-being'
      ],
      isPremium: true
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Interactive Tools & Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard 
            key={tool.id}
            tool={tool}
            onToolSelect={onToolSelect}
          />
        ))}
      </div>
      
      {!isPaidMember && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <span className="text-sm text-yellow-800">
              🔒 Premium tools require a paid membership to access
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsGrid;
