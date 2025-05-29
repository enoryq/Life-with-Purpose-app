
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { useDailyReflections } from '@/hooks/useDailyReflections';
import ReflectionForm from './reflection/ReflectionForm';
import QuickChatWidget from './reflection/QuickChatWidget';
import CalendarView from './reflection/CalendarView';
import TodayReflections from './reflection/TodayReflections';

const DailyReflection = () => {
  const { reflections, saveReflection } = useDailyReflections();
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('today');

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
  };

  const handleQuickChat = (prompt: string) => {
    // Here we would integrate with the chat system - for now just log
    console.log('Quick chat prompt:', prompt);
  };

  if (showForm) {
    return (
      <ReflectionForm 
        onSave={handleSaveReflection}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daily Reflection Journal</h2>
        <Button 
          onClick={() => setShowForm(true)}
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
            onStartReflection={() => setShowForm(true)} 
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
