
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Calendar, Heart, Trophy, Globe } from 'lucide-react';

const Community = () => {
  const communityFeatures = [
    {
      icon: MessageCircle,
      title: "Discussion Forums",
      description: "Connect with like-minded individuals and share your journey",
      members: "8.5K",
      comingSoon: true
    },
    {
      icon: Calendar,
      title: "Virtual Events",
      description: "Join live workshops, Q&As, and community gatherings",
      events: "Weekly",
      comingSoon: true
    },
    {
      icon: Users,
      title: "Support Groups",
      description: "Small group sessions for focused support and accountability",
      groups: "25+",
      comingSoon: true
    },
    {
      icon: Trophy,
      title: "Achievement Sharing",
      description: "Celebrate milestones and inspire others with your progress",
      badges: "50+",
      comingSoon: true
    }
  ];

  const upcomingEvents = [
    {
      title: "Bootcamp Fitness",
      date: "Every Saturday",
      time: "06:00 AM EST",
      type: "Fitness Event",
      attendees: 25,
      recurring: true
    },
    {
      title: "Monthly Purpose Circle",
      date: "Dec 15, 2024",
      time: "7:00 PM EST",
      type: "Virtual Meetup",
      attendees: 45,
      comingSoon: true
    },
    {
      title: "Mindfulness Workshop",
      date: "Dec 18, 2024",
      time: "2:00 PM EST",
      type: "Workshop",
      attendees: 32,
      comingSoon: true
    },
    {
      title: "New Year Vision Board Session",
      date: "Dec 28, 2024",
      time: "6:00 PM EST",
      type: "Creative Workshop",
      attendees: 67,
      comingSoon: true
    }
  ];

  return (
    <Layout>
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Community
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Connect with thousands of people on similar journeys. Share experiences, find support, 
              and grow together in our vibrant community.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="w-5 h-5 text-purple-600" />
                <span>Global Community</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5 text-blue-600" />
                <span>10,000+ Members</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Heart className="w-5 h-5 text-pink-600" />
                <span>100% Free</span>
              </div>
            </div>
          </div>

          {/* Community Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  <div className="flex gap-2 justify-center">
                    <Badge variant="secondary" className="w-fit">
                      {feature.members || feature.events || feature.groups || feature.badges}
                    </Badge>
                    {feature.comingSoon && (
                      <Badge variant="outline" className="text-orange-600 border-orange-300">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-purple-600 border-purple-300">
                        {event.type}
                      </Badge>
                      <div className="flex gap-1">
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Free
                        </Badge>
                        {event.comingSoon && (
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            Coming Soon
                          </Badge>
                        )}
                        {event.recurring && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            Weekly
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="text-gray-600 ml-6">{event.time}</div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} {event.recurring ? 'regular attendees' : 'attending'}</span>
                      </div>
                    </div>
                    <Button 
                      className={`w-full ${event.comingSoon 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                      }`}
                      disabled={event.comingSoon}
                    >
                      {event.comingSoon ? 'Coming Soon' : 'Join Event'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-3xl p-12 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">Community Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-700 mb-2">10,000+</div>
                <div className="text-gray-600">Active Members</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-700 mb-2">500+</div>
                <div className="text-gray-600">Events Hosted</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-700 mb-2">25,000+</div>
                <div className="text-gray-600">Connections Made</div>
              </div>
            </div>
          </div>

          {/* Join CTA */}
          <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community Today</h2>
            <p className="text-xl mb-8 opacity-90">
              Connect with like-minded individuals and accelerate your personal growth journey.
            </p>
            <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full">
              Join Free Community
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
