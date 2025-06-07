
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useDailyReflections } from '@/hooks/useDailyReflections';
import CalendarView from '../components/tools/reflection/CalendarView';

const Calendar = () => {
  const { user, loading } = useAuth();
  const { reflections } = useDailyReflections();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

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
                Calendar View
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Please sign in to view your reflection calendar
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
                Reflection Calendar
              </h1>
              <p className="text-gray-600 text-lg">
                View your daily reflections in calendar format
              </p>
            </div>
          </div>

          {/* Calendar Content */}
          <div className="widget-card p-6">
            <CalendarView
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              reflections={reflections}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
