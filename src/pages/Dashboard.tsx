
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
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

  const recentActivities = [
    {
      type: "lesson",
      title: "Completed: Finding Your Why Exercise",
      time: "2 hours ago",
      program: "Purpose Discovery"
    },
    {
      type: "community",
      title: "Posted in Leadership Discussion",
      time: "1 day ago",
      program: "Community"
    },
    {
      type: "resource",
      title: "Downloaded: Values Assessment Tool",
      time: "2 days ago",
      program: "Resources"
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

  return (
    <Layout showFooter={false}>
      <div className="pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, John!</h1>
                <p className="text-gray-600">Continue your journey toward a more purposeful life</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-0">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-800">2</div>
                  <div className="text-sm text-purple-700">Active Programs</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-0">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-800">12</div>
                  <div className="text-sm text-blue-700">Lessons Completed</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-100 to-green-200 border-0">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">3</div>
                  <div className="text-sm text-green-700">Achievements</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-0">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-800">7</div>
                  <div className="text-sm text-orange-700">Day Streak</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
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

              {/* Recent Activity */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="p-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            {activity.type === 'lesson' && <BookOpen className="w-5 h-5 text-purple-600" />}
                            {activity.type === 'community' && <MessageCircle className="w-5 h-5 text-purple-600" />}
                            {activity.type === 'resource' && <Download className="w-5 h-5 text-purple-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{activity.title}</div>
                            <div className="text-sm text-gray-600">{activity.program} • {activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
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
                  <Button variant="outline" className="w-full justify-start border-purple-300 text-purple-600 hover:bg-purple-50">
                    <BookOpen className="mr-2 w-4 h-4" />
                    Browse Programs
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-purple-300 text-purple-600 hover:bg-purple-50">
                    <Download className="mr-2 w-4 h-4" />
                    Download Resources
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-purple-300 text-purple-600 hover:bg-purple-50">
                    <MessageCircle className="mr-2 w-4 h-4" />
                    Join Community
                  </Button>
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
