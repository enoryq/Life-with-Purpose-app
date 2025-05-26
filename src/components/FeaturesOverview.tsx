
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Heart, Target, Users, Book, Calendar } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Mindfulness Tools",
    description: "Meditation guides, breathing exercises, and mindfulness practices to center your thoughts and reduce stress.",
    color: "text-purple-600"
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Structured frameworks to set, track, and achieve your personal and professional goals with purpose.",
    color: "text-blue-600"
  },
  {
    icon: Heart,
    title: "Wellness Programs",
    description: "Holistic health approaches covering mental, physical, and emotional well-being for a balanced life.",
    color: "text-pink-600"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with like-minded individuals on similar journeys and build meaningful relationships.",
    color: "text-green-600"
  },
  {
    icon: Book,
    title: "Learning Resources",
    description: "Curated content, courses, and materials from leading experts in personal development.",
    color: "text-orange-600"
  },
  {
    icon: Calendar,
    title: "Daily Practices",
    description: "Structured routines and habits that help you maintain consistency in your personal growth journey.",
    color: "text-indigo-600"
  }
];

const FeaturesOverview = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Everything You Need to Thrive
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides you with all the tools, resources, and support 
            you need to create lasting positive change in your life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-white/90"
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-white to-gray-100 flex items-center justify-center mb-4 shadow-sm`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
