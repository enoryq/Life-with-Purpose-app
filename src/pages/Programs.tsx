import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Programs = () => {
  const programs = [
    {
      id: 'purpose-discovery',
      title: "30-Day Purpose Discovery",
      description: "Uncover your life's purpose through guided exercises, reflection prompts, and expert insights.",
      duration: "30 days",
      rating: 4.9,
      participants: "2.5K",
      level: "Beginner",
      category: "Self-Discovery",
      price: "Free",
      link: "/programs/purpose-discovery"
    },
    {
      title: "Mindful Leadership",
      description: "Develop conscious leadership skills that inspire others while staying true to your values.",
      duration: "8 weeks",
      rating: 4.8,
      participants: "1.8K",
      level: "Intermediate",
      category: "Leadership",
      price: "Free"
    },
    {
      title: "Stress-Free Living",
      description: "Learn proven techniques to manage stress, anxiety, and overwhelm in your daily life.",
      duration: "6 weeks",
      rating: 4.9,
      participants: "3.2K",
      level: "Beginner",
      category: "Wellness",
      price: "Free"
    },
    {
      title: "Career Transition Blueprint",
      description: "Navigate career changes with confidence and find work that aligns with your values.",
      duration: "10 weeks",
      rating: 4.7,
      participants: "1.2K",
      level: "Intermediate",
      category: "Career",
      price: "Free"
    },
    {
      title: "Relationship Mastery",
      description: "Build deeper, more meaningful connections in all areas of your life.",
      duration: "6 weeks",
      rating: 4.8,
      participants: "2.1K",
      level: "Beginner",
      category: "Relationships",
      price: "Free"
    },
    {
      title: "Financial Freedom Mindset",
      description: "Transform your relationship with money and create lasting financial well-being.",
      duration: "12 weeks",
      rating: 4.6,
      participants: "1.5K",
      level: "Advanced",
      category: "Finance",
      price: "Free"
    }
  ];

  const categories = ["All", "Self-Discovery", "Leadership", "Wellness", "Career", "Relationships", "Finance"];

  return (
    <Layout>
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Training Programs
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Comprehensive programs designed by experts to guide you through transformative experiences. 
              All completely free while we're in beta.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button 
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={category === "All" 
                  ? "bg-gradient-to-r from-purple-600 to-blue-600" 
                  : "border-purple-300 text-purple-600 hover:bg-purple-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {programs.map((program, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                      {program.category}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {program.price}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800 leading-tight">
                    {program.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs w-fit">
                    {program.level}
                  </Badge>
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
                  
                  {program.link ? (
                    <Link to={program.link}>
                      <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg">
                        View Program Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg">
                      Start Program Free
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="text-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">More Programs Coming Soon</h2>
            <p className="text-xl text-gray-600 mb-8">
              We're constantly developing new programs based on community feedback and emerging research.
            </p>
            <Button variant="outline" size="lg" className="border-purple-300 text-purple-600 hover:bg-purple-50">
              Request a Program Topic
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Programs;
