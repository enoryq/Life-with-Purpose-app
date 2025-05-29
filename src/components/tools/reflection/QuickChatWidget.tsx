
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, ChevronRight } from 'lucide-react';

interface QuickChatWidgetProps {
  onChat: (message: string) => void;
}

const QuickChatWidget: React.FC<QuickChatWidgetProps> = ({ onChat }) => {
  const [quickChatMessage, setQuickChatMessage] = useState('');

  const quickChatPrompts = [
    "Summarize my reflections from this week",
    "What patterns do you see in my mood?",
    "What should I be focusing on based on my recent reflections?",
    "Help me identify areas for personal growth",
    "What accomplishments should I celebrate?"
  ];

  const handleQuickChat = (prompt: string) => {
    setQuickChatMessage(prompt);
    onChat(prompt);
  };

  return (
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
  );
};

export default QuickChatWidget;
