
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { useDailyReflections } from '@/hooks/useDailyReflections';
import { useToolSession } from '@/hooks/useToolSession';
import ReflectionForm from './reflection/ReflectionForm';
import QuickChatWidget from './reflection/QuickChatWidget';
import CalendarView from './reflection/CalendarView';
import TodayReflections from './reflection/TodayReflections';

const DailyReflection = () => {
  const { reflections, saveReflection } = useDailyReflections();
  const { startSession, endSession, isTracking } = useToolSession('Daily Reflection');
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('today');

  // Start session when component mounts
  useEffect(() => {
    startSession({ tab: 'today', action: 'view_reflections' });
    
    return () => {
      if (isTracking) {
        endSession({ tab: activeTab, total_reflections: reflections.length });
      }
    };
  }, []);

  // Track tab changes
  useEffect(() => {
    if (isTracking) {
      endSession({ tab: activeTab, action: 'tab_change' });
      startSession({ tab: activeTab, action: 'view_tab' });
    }
  }, [activeTab]);

  const handleSaveReflection = async (reflectionData: {
    gratitude: string;
    accomplishment: string;
    challenge: string;
    tomorrow: string;
    mood: string;
    title: string;
  }) => {
    await saveReflection(reflectionData);
    setShowForm(false);
    
    // Track reflection completion
    if (isTracking) {
      endSession({ 
        action: 'reflection_completed', 
        reflection_data: { mood: reflectionData.mood, title: reflectionData.title }
      });
      startSession({ action: 'post_reflection_view' });
    }
  };

  const handleQuickChat = (prompt: string) => {
    console.log('Quick chat prompt:', prompt);
  };

  const handleStartReflection = () => {
    setShowForm(true);
    if (isTracking) {
      endSession({ action: 'start_new_reflection' });
      startSession({ action: 'create_reflection' });
    }
  };

  if (showForm) {
    return (
      <ReflectionForm 
        onSave={handleSaveReflection}
        onCancel={() => {
          setShowForm(false);
          if (isTracking) {
            endSession({ action: 'cancelled_reflection' });
            startSession({ action: 'return_to_overview' });
          }
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daily Reflection Journal</h2>
        <Button 
          onClick={handleStartReflection}
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Reflection
        </Button>
      </div>

      <QuickChatWidget onChat={handleQuickChat} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="today">Today's Reflections</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <TodayReflections 
            reflections={reflections} 
            onStartReflection={handleStartReflection} 
          />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <CalendarView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            reflections={reflections}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DailyReflection;
