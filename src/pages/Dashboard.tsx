
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import MetricCard from '../components/dashboard/MetricCard';
import { 
  MessageCircle,
  Calendar,
  TrendingUp,
  Wrench,
  Play,
  Download,
  Bell,
  MapPin,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  
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

  const recentTransactions = [
    {
      id: 1,
      title: "Values Assessment Completed",
      subtitle: "Self-Discovery Tool",
      amount: "Progress: 100%",
      icon: "🎯"
    },
    {
      id: 2,
      title: "Daily Reflection",
      subtitle: "Mindfulness Practice",
      amount: "3 entries",
      icon: "📝"
    },
    {
      id: 3,
      title: "Goal Setting Session",
      subtitle: "Planning Tool",
      amount: "5 goals set",
      icon: "🎯"
    }
  ];

  return (
    <Layout showFooter={false}>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {displayName}! Here's your personal growth overview.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-purple-100 text-purple-600 font-bold">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Tools Used"
            value="5"
            progress={85}
            change={{ value: "+20%", trend: "up", period: "this month" }}
            color="purple"
            viewAllLink="/tools"
          />
          <MetricCard
            title="Reflections"
            value="12"
            progress={60}
            change={{ value: "+30%", trend: "up", period: "this month" }}
            color="green"
            viewAllLink="/tools"
          />
          <MetricCard
            title="Goals Set"
            value="8"
            progress={75}
            change={{ value: "+60%", trend: "up", period: "this month" }}
            color="blue"
            viewAllLink="/tools"
          />
          <MetricCard
            title="Streak Days"
            value="14"
            progress={90}
            change={{ value: "+90%", trend: "up", period: "this month" }}
            color="orange"
            viewAllLink="/dashboard"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Personal Growth Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Your growth journey is progressing beautifully!</p>
                    <div className="flex gap-4 justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">85%</div>
                        <div className="text-sm text-gray-500">Overall Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">12</div>
                        <div className="text-sm text-gray-500">Days Active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Continue your personal growth journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/tools">
                    <Button className="w-full h-16 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                      <div className="flex items-center gap-3">
                        <Wrench className="w-6 h-6" />
                        <div className="text-left">
                          <div className="font-semibold">Interactive Tools</div>
                          <div className="text-sm opacity-90">Values, goals, reflection</div>
                        </div>
                      </div>
                    </Button>
                  </Link>
                  <Link to="/chat">
                    <Button variant="outline" className="w-full h-16 border-purple-200 hover:bg-purple-50">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-6 h-6 text-purple-600" />
                        <div className="text-left">
                          <div className="font-semibold text-purple-600">AI Companion</div>
                          <div className="text-sm text-gray-600">Get personalized guidance</div>
                        </div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-lg">
                      {transaction.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm">{transaction.title}</div>
                      <div className="text-xs text-gray-500">{transaction.subtitle}</div>
                    </div>
                    <div className="text-sm font-medium text-purple-600">{transaction.amount}</div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4 border-gray-200 text-gray-600 hover:bg-gray-50">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Orders Card */}
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-white">Personal Growth Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Current Streak</span>
                      <Badge className="bg-white/20 text-white border-white/30">14 days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Tools Unlocked</span>
                      <Badge className="bg-white/20 text-white border-white/30">5/5</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Goals Achieved</span>
                      <Badge className="bg-white/20 text-white border-white/30">3/8</Badge>
                    </div>
                  </div>
                  <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Download className="w-4 h-4 mr-2" />
                    Download Progress Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Visitors Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Community Insights</CardTitle>
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-800">1,247</span>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-sm text-gray-600">Active members this month</p>
                  <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Community Growth</div>
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-2 h-8 bg-blue-400 rounded"></div>
                        <div className="w-2 h-12 bg-blue-500 rounded"></div>
                        <div className="w-2 h-16 bg-purple-500 rounded"></div>
                        <div className="w-2 h-20 bg-purple-600 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
