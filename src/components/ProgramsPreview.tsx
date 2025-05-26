
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Users } from 'lucide-react';

const programs = [
  {
    title: "30-Day Purpose Discovery",
    description: "Uncover your life's purpose through guided exercises, reflection prompts, and expert insights.",
    duration: "30 days",
    rating: 4.9,
    participants: "2.5K",
    level: "Beginner",
    category: "Self-Discovery"
  },
  {
    title: "Mindful Leadership",
    description: "Develop conscious leadership skills that inspire others while staying true to your values.",
    duration: "8 weeks",
    rating: 4.8,
    participants: "1.8K",
    level: "Intermediate",
    category: "Leadership"
  },
  {
    title: "Stress-Free Living",
    description: "Learn proven techniques to manage stress, anxiety, and overwhelm in your daily life.",
    duration: "6 weeks",
    rating: 4.9,
    participants: "3.2K",
    level: "Beginner",
    category: "Wellness"
  }
];

const ProgramsPreview = () => {
  return (
    <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Featured Training Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with our most popular programs designed by experts to guide you 
            through transformative experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    {program.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {program.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800 leading-tight">
                  {program.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {program.description}
                </CardDescription>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {program.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    {program.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {program.participants}
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg">
                  Start Program
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50"
          >
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsPreview;
