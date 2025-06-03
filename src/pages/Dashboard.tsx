
import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '@/hooks/useAuth';
import MetricCard from '../components/dashboard/MetricCard';
import UserStatsWidget from '../components/dashboard/UserStatsWidget';
import RecentGoalsWidget from '../components/dashboard/RecentGoalsWidget';
import ActivityTimelineWidget from '../components/dashboard/ActivityTimelineWidget';
import VisionBoardWidget from '../components/dashboard/VisionBoardWidget';
import EngagementInsightsWidget from '../components/dashboard/EngagementInsightsWidget';
import ProgressInsightsWidget from '../components/dashboard/ProgressInsightsWidget';
import RecommendationsWidget from '../components/dashboard/RecommendationsWidget';
import { Target, BookOpen, Users, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Life with Purpose</h1>
            <p className="text-xl text-gray-600 mb-8">Please sign in to access your dashboard</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600">
              Here's your personal development journey overview
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Active Goals"
              value="3"
              icon={Target}
              trend="+1 this week"
              color="purple"
            />
            <MetricCard
              title="Reflections"
              value="12"
              icon={BookOpen}
              trend="+2 this week"
              color="blue"
            />
            <MetricCard
              title="Time Spent"
              value="45m"
              icon={Clock}
              trend="Today"
              color="green"
            />
            <MetricCard
              title="Streak Days"
              value="7"
              icon={Users}
              trend="Personal best!"
              color="orange"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <UserStatsWidget />
              <RecentGoalsWidget />
              <ActivityTimelineWidget />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <EngagementInsightsWidget />
              <ProgressInsightsWidget />
              <VisionBoardWidget />
              <RecommendationsWidget />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
