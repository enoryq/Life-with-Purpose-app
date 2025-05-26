
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, Star, Users, CheckCircle, Target, BookOpen, MessageCircle, Calendar, ArrowRight, Play } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const PurposeDiscovery = () => {
  const { user } = useAuth();
  const [enrolledWeeks, setEnrolledWeeks] = useState<number[]>([]);

  const programOverview = {
    title: "30-Day Purpose Discovery",
    description: "A transformative journey to uncover your life's purpose through guided exercises, deep reflection, and expert insights.",
    duration: "30 days",
    rating: 4.9,
    participants: "2.5K",
    level: "Beginner",
    category: "Self-Discovery",
    price: "Free"
  };

  const weeklyModules = [
    {
      week: 1,
      title: "Foundation & Self-Awareness",
      description: "Begin your journey by understanding who you are at your core.",
      days: [
        { day: 1, title: "Welcome & Intention Setting", description: "Set your intentions and create a sacred space for discovery" },
        { day: 2, title: "Values Exploration", description: "Identify your core values and what truly matters to you" },
        { day: 3, title: "Strengths Assessment", description: "Discover your natural talents and abilities" },
        { day: 4, title: "Life Story Review", description: "Reflect on key moments that shaped who you are" },
        { day: 5, title: "Energy Audit", description: "Identify what energizes and drains you" },
        { day: 6, title: "Childhood Dreams", description: "Reconnect with your earliest aspirations and interests" },
        { day: 7, title: "Weekly Integration", description: "Synthesize insights from your first week of discovery" }
      ]
    },
    {
      week: 2,
      title: "Passions & Interests",
      description: "Explore what ignites your enthusiasm and brings you joy.",
      days: [
        { day: 8, title: "Passion Inventory", description: "Map out activities and subjects that excite you" },
        { day: 9, title: "Flow State Analysis", description: "Identify when you experience deep engagement" },
        { day: 10, title: "Curiosity Exploration", description: "Follow your natural sense of wonder" },
        { day: 11, title: "Creative Expression", description: "Experiment with different forms of creativity" },
        { day: 12, title: "Learning Style Discovery", description: "Understand how you best absorb and process information" },
        { day: 13, title: "Interest Intersection", description: "Find where multiple interests converge" },
        { day: 14, title: "Passion Prioritization", description: "Rank and evaluate your strongest passions" }
      ]
    },
    {
      week: 3,
      title: "Impact & Contribution",
      description: "Discover how you want to make a difference in the world.",
      days: [
        { day: 15, title: "Impact Vision", description: "Envision the change you want to create" },
        { day: 16, title: "Service Exploration", description: "Explore different ways to serve others" },
        { day: 17, title: "Problem Identification", description: "Identify problems you feel called to solve" },
        { day: 18, title: "Legacy Reflection", description: "Consider what you want to be remembered for" },
        { day: 19, title: "Community Connection", description: "Explore how you connect with your community" },
        { day: 20, title: "Skills for Service", description: "Match your skills with potential areas of impact" },
        { day: 21, title: "Contribution Clarity", description: "Clarify your unique way of contributing" }
      ]
    },
    {
      week: 4,
      title: "Integration & Next Steps",
      description: "Synthesize your discoveries and create an action plan.",
      days: [
        { day: 22, title: "Purpose Statement Draft", description: "Craft your initial purpose statement" },
        { day: 23, title: "Alignment Assessment", description: "Evaluate how your current life aligns with your purpose" },
        { day: 24, title: "Obstacle Identification", description: "Recognize potential barriers to living your purpose" },
        { day: 25, title: "Support System Mapping", description: "Identify people and resources to support your journey" },
        { day: 26, title: "Action Plan Creation", description: "Develop concrete steps toward purpose-driven living" },
        { day: 27, title: "Purpose Refinement", description: "Refine and polish your purpose statement" },
        { day: 28, title: "Implementation Strategy", description: "Create a strategy for integrating purpose into daily life" },
        { day: 29, title: "Commitment Ceremony", description: "Make a commitment to living your purpose" },
        { day: 30, title: "Celebration & Continuation", description: "Celebrate your journey and plan for ongoing growth" }
      ]
    }
  ];

  const dailyPractices = [
    "Morning intention setting (5 minutes)",
    "Reflective journaling (10-15 minutes)",
    "Mindfulness meditation (10 minutes)",
    "Evening gratitude practice (5 minutes)"
  ];

  const programBenefits = [
    "Gain crystal-clear clarity on your life's purpose",
    "Develop unshakeable confidence in your direction",
    "Create meaningful goals aligned with your values",
    "Build sustainable habits for purposeful living",
    "Connect with a supportive community of seekers",
    "Access expert guidance and proven methodologies"
  ];

  const expertInsights = [
    {
      expert: "Dr. Sarah Mitchell",
      title: "Purpose Psychology Researcher",
      insight: "Purpose isn't something you find—it's something you create through deep self-awareness and intentional action."
    },
    {
      expert: "Marcus Chen",
      title: "Life Design Coach",
      insight: "The most fulfilled people aren't those who found their purpose, but those who actively live it every day."
    },
    {
      expert: "Elena Rodriguez",
      title: "Mindfulness Teacher",
      insight: "Purpose emerges naturally when we quiet the noise and listen deeply to our authentic self."
    }
  ];

  const handleEnrollWeek = (week: number) => {
    if (!enrolledWeeks.includes(week)) {
      setEnrolledWeeks([...enrolledWeeks, week]);
    }
  };

  return (
    <Layout>
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Program Header */}
          <div className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-800 mb-4 text-sm px-4 py-2">
              {programOverview.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
              {programOverview.title}
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              {programOverview.description}
            </p>
            
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{programOverview.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-gray-700">{programOverview.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{programOverview.participants} completed</span>
              </div>
            </div>

            {user ? (
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4">
                <Play className="mr-2 w-5 h-5" />
                Start Your Journey
              </Button>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4">
                  <Play className="mr-2 w-5 h-5" />
                  Sign Up to Start
                </Button>
              </Link>
            )}
          </div>

          {/* Program Content Tabs */}
          <Tabs defaultValue="overview" className="mb-16">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 bg-gray-100">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="practices">Daily Practices</TabsTrigger>
              <TabsTrigger value="experts">Expert Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      What You'll Achieve
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {programBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                      Program Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">30</div>
                        <div className="text-sm text-gray-600">Days of Discovery</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">4</div>
                        <div className="text-sm text-gray-600">Weekly Modules</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">30</div>
                        <div className="text-sm text-gray-600">Daily Exercises</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">∞</div>
                        <div className="text-sm text-gray-600">Lifetime Access</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="mt-8">
              <div className="space-y-6">
                {weeklyModules.map((module) => (
                  <Card key={module.week} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">Week {module.week}: {module.title}</CardTitle>
                          <CardDescription className="mt-2">{module.description}</CardDescription>
                        </div>
                        {user && (
                          <Button 
                            onClick={() => handleEnrollWeek(module.week)}
                            disabled={enrolledWeeks.includes(module.week)}
                            variant={enrolledWeeks.includes(module.week) ? "secondary" : "default"}
                            className="ml-4"
                          >
                            {enrolledWeeks.includes(module.week) ? "Enrolled" : "Start Week"}
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible>
                        <AccordionItem value={`week-${module.week}`} className="border-none">
                          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                            View Daily Breakdown
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-6">
                            <div className="grid gap-3">
                              {module.days.map((day) => (
                                <div key={day.day} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">
                                    {day.day}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-800">{day.title}</h4>
                                    <p className="text-gray-600 text-sm mt-1">{day.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practices" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    Daily Practices (30-40 minutes total)
                  </CardTitle>
                  <CardDescription>
                    Establish a powerful daily routine that supports your purpose discovery journey.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {dailyPractices.map((practice, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 font-semibold">
                          {index + 1}
                        </div>
                        <span className="text-gray-800 font-medium">{practice}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tip</h4>
                    <p className="text-yellow-700">
                      Consistency beats perfection. It's better to do these practices for 5 minutes daily than 
                      to skip days and try to make up for lost time. Start small and build momentum.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experts" className="mt-8">
              <div className="grid gap-6">
                {expertInsights.map((expert, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <blockquote className="text-lg text-gray-700 italic mb-4">
                        "{expert.insight}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {expert.expert.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{expert.expert}</div>
                          <div className="text-gray-600 text-sm">{expert.title}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Community & Support */}
          <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-0">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Community</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Connect with thousands of purpose-seekers on the same journey. Share insights, 
                get support, and celebrate breakthroughs together.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/community">
                  <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                    Join Community
                  </Button>
                </Link>
                {user && (
                  <Link to="/chat">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <MessageCircle className="mr-2 w-4 h-4" />
                      AI Companion
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PurposeDiscovery;
