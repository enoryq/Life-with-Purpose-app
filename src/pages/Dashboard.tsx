
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import UserStatsWidget from '../components/dashboard/UserStatsWidget';
import VisionBoardWidget from '../components/dashboard/VisionBoardWidget';
import RecentGoalsWidget from '../components/dashboard/RecentGoalsWidget';
import RecommendationsWidget from '../components/dashboard/RecommendationsWidget';
import ProgressInsightsWidget from '../components/dashboard/ProgressInsightsWidget';
import ActivityTimelineWidget from '../components/dashboard/ActivityTimelineWidget';
import { 
  User, 
  BookOpen, 
  Target, 
  Calendar, 
  Trophy, 
  Clock, 
  Play, 
  Download,
  MessageCircle,
  TrendingUp,
  Wrench,
  Sunrise
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  
  const currentPrograms = [
    {
      title: "30-Day Purpose Discovery",
      progress: 65,
      nextLesson: "Week 3: Identifying Your Core Values",
      timeRemaining: "5 days left"
    },
    {
      title: "Mindful Leadership",
      progress: 30,
      nextLesson: "Module 2: Self-Awareness Practices",
      timeRemaining: "6 weeks left"
    }
  ];

  const achievements = [
    { title: "First Steps", description: "Completed your first lesson", earned: true },
    { title: "Dedicated Learner", description: "7-day learning streak", earned: true },
    { title: "Community Member", description: "Made your first post", earned: true },
    { title: "Goal Setter", description: "Set 5 personal goals", earned: false }
  ];

  const upcomingEvents = [
    {
      title: "Monthly Purpose Circle",
      date: "Dec 15",
      time: "7:00 PM EST"
    },
    {
      title: "Mindfulness Workshop",
      date: "Dec 18",
      time: "2:00 PM EST"
    }
  ];

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Get display name from user data
  const getDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Friend';
  };

  const displayName = getDisplayName();

  return (
    <Layout showFooter={false}>
      <div className="pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-purple-100 text-purple-600 text-xl font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sunrise className="w-5 h-5 text-yellow-500" />
                  <h1 className="text-3xl font-bold text-gray-800">{getGreeting()}, {displayName}!</h1>
                </div>
                <p className="text-gray-600">Ready to continue your purposeful journey today?</p>
              </div>
            </div>
            
            {/* User Stats Widget */}
            <UserStatsWidget />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Interactive Tools Quick Access */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Interactive Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/tools">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-r from-purple-50 to-blue-50">
                      <CardContent className="p-4 text-center">
                        <Wrench className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-800">Tools & Templates</h3>
                        <p className="text-sm text-gray-600">Access values assessment, goal setting, and more</p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link to="/chat">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-r from-green-50 to-blue-50">
                      <CardContent className="p-4 text-center">
                        <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-800">AI Companion</h3>
                        <p className="text-sm text-gray-600">Get personalized guidance and support</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>

              {/* Current Programs */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Continue Learning</h2>
                <div className="space-y-4">
                  {currentPrograms.map((program, index) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{program.title}</CardTitle>
                            <CardDescription>{program.nextLesson}</CardDescription>
                          </div>
                          <Badge variant="outline" className="text-purple-600 border-purple-300">
                            {program.timeRemaining}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span>{program.progress}%</span>
                          </div>
                          <Progress value={program.progress} className="h-2" />
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                          <Play className="mr-2 w-4 h-4" />
                          Continue Lesson
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Personalized Recommendations - Moved Down */}
              <RecommendationsWidget />

              {/* Activity Timeline */}
              <ActivityTimelineWidget />
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-8">
              {/* Enhanced Progress Insights */}
              <ProgressInsightsWidget />

              {/* Vision Board Widget */}
              <VisionBoardWidget />

              {/* Recent Goals Widget */}
              <RecentGoalsWidget />

              {/* Achievements */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Achievements</h2>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <Card key={index} className={`border-0 ${achievement.earned ? 'bg-gradient-to-r from-purple-50 to-blue-50' : 'bg-gray-50'}`}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.earned ? 'bg-purple-200' : 'bg-gray-200'}`}>
                          <Trophy className={`w-5 h-5 ${achievement.earned ? 'text-purple-600' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <div className={`font-medium ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                            {achievement.title}
                          </div>
                          <div className={`text-xs ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                            {achievement.description}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <Card key={index} className="border-0 shadow">
                      <CardContent className="p-4">
                        <div className="font-medium text-gray-800 mb-1">{event.title}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {event.date} at {event.time}
                        </div>
                        <Button size="sm" variant="outline" className="w-full mt-3 border-purple-300 text-purple-600 hover:bg-purple-50">
                          Join Event
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Link to="/programs">
                    <Button variant="outline" className="w-full justify-start border-purple-300 text-purple-600 hover:bg-purple-50">
                      <BookOpen className="mr-2 w-4 h-4" />
                      Browse Programs
                    </Button>
                  </Link>
                  <Link to="/tools">
                    <Button variant="outline" className="w-full justify-start border-purple-300 text-purple-600 hover:bg-purple-50">
                      <Download className="mr-2 w-4 h-4" />
                      Interactive Tools
                    </Button>
                  </Link>
                  <Link to="/community">
                    <Button variant="outline" className="w-full justify-start border-purple-300 text-purple-600 hover:bg-purple-50">
                      <MessageCircle className="mr-2 w-4 h-4" />
                      Join Community
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
