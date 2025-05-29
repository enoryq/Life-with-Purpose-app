
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, BookOpen, Sparkles, MessageCircle, Plus, ChevronRight } from 'lucide-react';
import { useDailyReflections } from '@/hooks/useDailyReflections';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const DailyReflection = () => {
  const { reflections, saveReflection } = useDailyReflections();
  const [currentReflection, setCurrentReflection] = useState({
    gratitude: '',
    accomplishment: '',
    challenge: '',
    tomorrow: '',
    mood: '',
    title: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('today');
  const [quickChatMessage, setQuickChatMessage] = useState('');

  const moods = ['😊 Great', '😌 Good', '😐 Okay', '😔 Challenging', '😤 Difficult'];

  const prompts = [
    { key: 'gratitude', label: 'What am I grateful for today?', placeholder: 'Three things that made you smile or feel thankful...' },
    { key: 'accomplishment', label: 'What did I accomplish today?', placeholder: 'Big or small wins, progress made, goals achieved...' },
    { key: 'challenge', label: 'What challenged me today?', placeholder: 'Difficulties faced and how you handled them...' },
    { key: 'tomorrow', label: 'What will I focus on tomorrow?', placeholder: 'Your intentions and priorities for tomorrow...' }
  ];

  const quickChatPrompts = [
    "Summarize my reflections from this week",
    "What patterns do you see in my mood?",
    "What should I be focusing on based on my recent reflections?",
    "Help me identify areas for personal growth",
    "What accomplishments should I celebrate?"
  ];

  const handleSaveReflection = async () => {
    if (currentReflection.gratitude || currentReflection.accomplishment || currentReflection.title) {
      await saveReflection(currentReflection);
      setCurrentReflection({
        gratitude: '',
        accomplishment: '',
        challenge: '',
        tomorrow: '',
        mood: '',
        title: ''
      });
      setShowForm(false);
    }
  };

  const todaysReflections = reflections.filter(r => r.reflection_date === new Date().toISOString().split('T')[0]);
  const selectedDateReflections = selectedDate 
    ? reflections.filter(r => r.reflection_date === format(selectedDate, 'yyyy-MM-dd'))
    : [];

  // Get dates that have reflections for calendar highlighting
  const reflectionDates = reflections.map(r => new Date(r.reflection_date));

  const handleQuickChat = (prompt: string) => {
    setQuickChatMessage(prompt);
    // Here we would integrate with the chat system - for now just set the message
    // In a full implementation, this would open the chat or send to AI
    console.log('Quick chat prompt:', prompt);
  };

  if (showForm) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            New Reflection - {new Date().toLocaleDateString()}
          </CardTitle>
          <CardDescription>
            Give your reflection a title to help you remember this moment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Reflection Title (Optional)</label>
            <Input
              value={currentReflection.title}
              onChange={(e) => setCurrentReflection({ ...currentReflection, title: e.target.value })}
              placeholder="e.g., Morning reflection, End of week thoughts..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">How was your day overall?</label>
            <div className="flex gap-2 flex-wrap">
              {moods.map((mood) => (
                <Button
                  key={mood}
                  onClick={() => setCurrentReflection({ ...currentReflection, mood })}
                  variant={currentReflection.mood === mood ? "default" : "outline"}
                  size="sm"
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>

          {prompts.map((prompt) => (
            <div key={prompt.key} className="space-y-2">
              <label className="text-sm font-medium">{prompt.label}</label>
              <Textarea
                value={currentReflection[prompt.key as keyof typeof currentReflection]}
                onChange={(e) => setCurrentReflection({ 
                  ...currentReflection, 
                  [prompt.key]: e.target.value 
                })}
                placeholder={prompt.placeholder}
                rows={3}
              />
            </div>
          ))}

          <div className="flex gap-2">
            <Button onClick={handleSaveReflection} className="bg-gradient-to-r from-purple-600 to-blue-600">
              Save Reflection
            </Button>
            <Button onClick={() => setShowForm(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
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

      {/* Quick Chat with AI Widget */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            Quick Chat with AI about your reflections
          </CardTitle>
          <CardDescription>
            Get insights and guidance based on your journal entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            {quickChatPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickChat(prompt)}
                className="justify-start text-left h-auto py-2 px-3"
              >
                <span className="text-xs">{prompt}</span>
                <ChevronRight className="w-3 h-3 ml-auto" />
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={quickChatMessage}
              onChange={(e) => setQuickChatMessage(e.target.value)}
              placeholder="Ask something about your reflections..."
              className="flex-1"
            />
            <Button onClick={() => handleQuickChat(quickChatMessage)} disabled={!quickChatMessage.trim()}>
              Ask AI
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="today">Today's Reflections</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {todaysReflections.length > 0 ? (
            <div className="space-y-4">
              {todaysReflections.map((reflection) => (
                <Card key={reflection.id} className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        {reflection.title || 'Untitled Reflection'}
                      </CardTitle>
                      {reflection.mood && <Badge className="bg-purple-600">{reflection.mood}</Badge>}
                    </div>
                    <CardDescription>
                      {new Date(reflection.created_at).toLocaleTimeString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {reflection.gratitude && (
                      <div>
                        <h4 className="font-medium text-purple-800">Gratitude</h4>
                        <p className="text-gray-700">{reflection.gratitude}</p>
                      </div>
                    )}
                    {reflection.accomplishment && (
                      <div>
                        <h4 className="font-medium text-purple-800">Accomplishments</h4>
                        <p className="text-gray-700">{reflection.accomplishment}</p>
                      </div>
                    )}
                    {reflection.challenge && (
                      <div>
                        <h4 className="font-medium text-purple-800">Challenges</h4>
                        <p className="text-gray-700">{reflection.challenge}</p>
                      </div>
                    )}
                    {reflection.tomorrow && (
                      <div>
                        <h4 className="font-medium text-purple-800">Tomorrow's Focus</h4>
                        <p className="text-gray-700">{reflection.tomorrow}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No reflections yet for today</p>
                <Button onClick={() => setShowForm(true)} variant="outline">
                  Start your first reflection
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Select a Date</CardTitle>
                <CardDescription>
                  Dates with reflections are highlighted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={{
                    reflection: reflectionDates
                  }}
                  modifiersStyles={{
                    reflection: { 
                      backgroundColor: 'rgb(147 51 234)', 
                      color: 'white',
                      fontWeight: 'bold'
                    }
                  }}
                  className={cn("w-full pointer-events-auto")}
                />
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              {selectedDate && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Reflections for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </h3>
                  
                  {selectedDateReflections.length > 0 ? (
                    selectedDateReflections.map((reflection) => (
                      <Card key={reflection.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              {reflection.title || 'Untitled Reflection'}
                            </CardTitle>
                            {reflection.mood && <Badge variant="secondary">{reflection.mood}</Badge>}
                          </div>
                          <CardDescription>
                            {new Date(reflection.created_at).toLocaleTimeString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {reflection.gratitude && (
                            <div>
                              <h4 className="font-medium text-sm text-gray-600">Gratitude</h4>
                              <p className="text-sm">{reflection.gratitude}</p>
                            </div>
                          )}
                          {reflection.accomplishment && (
                            <div>
                              <h4 className="font-medium text-sm text-gray-600">Accomplishments</h4>
                              <p className="text-sm">{reflection.accomplishment}</p>
                            </div>
                          )}
                          {reflection.challenge && (
                            <div>
                              <h4 className="font-medium text-sm text-gray-600">Challenges</h4>
                              <p className="text-sm">{reflection.challenge}</p>
                            </div>
                          )}
                          {reflection.tomorrow && (
                            <div>
                              <h4 className="font-medium text-sm text-gray-600">Tomorrow's Focus</h4>
                              <p className="text-sm">{reflection.tomorrow}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="text-center py-8">
                        <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No reflections for this date</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DailyReflection;
