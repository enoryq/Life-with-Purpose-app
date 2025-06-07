
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
import CalendarWidget from '../components/dashboard/CalendarWidget';
import { Target, BookOpen, Users, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-6 pb-16 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animate-reverse opacity-30"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Welcome to Life with Purpose
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Please sign in to access your personalized dashboard and begin your journey
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-6 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Here's your personal development journey overview
              </p>
            </div>
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
              <CalendarWidget />
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
