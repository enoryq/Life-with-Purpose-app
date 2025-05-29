
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';

interface ReflectionFormProps {
  onSave: (reflection: {
    gratitude: string;
    accomplishment: string;
    challenge: string;
    tomorrow: string;
    mood: string;
    title: string;
  }) => Promise<void>;
  onCancel: () => void;
}

const ReflectionForm: React.FC<ReflectionFormProps> = ({ onSave, onCancel }) => {
  const [currentReflection, setCurrentReflection] = useState({
    gratitude: '',
    accomplishment: '',
    challenge: '',
    tomorrow: '',
    mood: '',
    title: ''
  });

  const moods = ['😊 Great', '😌 Good', '😐 Okay', '😔 Challenging', '😤 Difficult'];

  const prompts = [
    { key: 'gratitude', label: 'What am I grateful for today?', placeholder: 'Three things that made you smile or feel thankful...' },
    { key: 'accomplishment', label: 'What did I accomplish today?', placeholder: 'Big or small wins, progress made, goals achieved...' },
    { key: 'challenge', label: 'What challenged me today?', placeholder: 'Difficulties faced and how you handled them...' },
    { key: 'tomorrow', label: 'What will I focus on tomorrow?', placeholder: 'Your intentions and priorities for tomorrow...' }
  ];

  const handleSaveReflection = async () => {
    if (currentReflection.gratitude || currentReflection.accomplishment || currentReflection.title) {
      await onSave(currentReflection);
      setCurrentReflection({
        gratitude: '',
        accomplishment: '',
        challenge: '',
        tomorrow: '',
        mood: '',
        title: ''
      });
    }
  };

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
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReflectionForm;
