
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, Sparkles } from 'lucide-react';
import { useDailyReflections } from '@/hooks/useDailyReflections';

const DailyReflection = () => {
  const { reflections, saveReflection } = useDailyReflections();
  const [currentReflection, setCurrentReflection] = useState({
    gratitude: '',
    accomplishment: '',
    challenge: '',
    tomorrow: '',
    mood: ''
  });
  const [showForm, setShowForm] = useState(false);

  const moods = ['😊 Great', '😌 Good', '😐 Okay', '😔 Challenging', '😤 Difficult'];

  const prompts = [
    { key: 'gratitude', label: 'What am I grateful for today?', placeholder: 'Three things that made you smile or feel thankful...' },
    { key: 'accomplishment', label: 'What did I accomplish today?', placeholder: 'Big or small wins, progress made, goals achieved...' },
    { key: 'challenge', label: 'What challenged me today?', placeholder: 'Difficulties faced and how you handled them...' },
    { key: 'tomorrow', label: 'What will I focus on tomorrow?', placeholder: 'Your intentions and priorities for tomorrow...' }
  ];

  const handleSaveReflection = async () => {
    if (currentReflection.gratitude || currentReflection.accomplishment) {
      await saveReflection(currentReflection);
      setCurrentReflection({
        gratitude: '',
        accomplishment: '',
        challenge: '',
        tomorrow: '',
        mood: ''
      });
      setShowForm(false);
    }
  };

  const todaysReflection = reflections.find(r => r.reflection_date === new Date().toISOString().split('T')[0]);

  if (!showForm && !todaysReflection && reflections.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <CardTitle className="text-2xl">Daily Reflection Journal</CardTitle>
          <CardDescription>
            Take a few minutes each day to reflect on your experiences and growth
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            Start Today's Reflection
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showForm) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Daily Reflection - {new Date().toLocaleDateString()}
          </CardTitle>
          <CardDescription>
            Take your time with each question. There are no right or wrong answers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Daily Reflections</h2>
        {!todaysReflection && (
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            Today's Reflection
          </Button>
        )}
      </div>

      {todaysReflection && (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Reflection
              </CardTitle>
              {todaysReflection.mood && <Badge className="bg-purple-600">{todaysReflection.mood}</Badge>}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaysReflection.gratitude && (
              <div>
                <h4 className="font-medium text-purple-800">Gratitude</h4>
                <p className="text-gray-700">{todaysReflection.gratitude}</p>
              </div>
            )}
            {todaysReflection.accomplishment && (
              <div>
                <h4 className="font-medium text-purple-800">Accomplishments</h4>
                <p className="text-gray-700">{todaysReflection.accomplishment}</p>
              </div>
            )}
            {todaysReflection.challenge && (
              <div>
                <h4 className="font-medium text-purple-800">Challenges</h4>
                <p className="text-gray-700">{todaysReflection.challenge}</p>
              </div>
            )}
            {todaysReflection.tomorrow && (
              <div>
                <h4 className="font-medium text-purple-800">Tomorrow's Focus</h4>
                <p className="text-gray-700">{todaysReflection.tomorrow}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {reflections.filter(r => r.reflection_date !== new Date().toISOString().split('T')[0]).map((reflection) => (
          <Card key={reflection.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {new Date(reflection.reflection_date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
                {reflection.mood && <Badge variant="secondary">{reflection.mood}</Badge>}
              </div>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DailyReflection;
