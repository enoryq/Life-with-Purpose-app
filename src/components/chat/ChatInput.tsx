
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  newMessage: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  loading: boolean;
  currentConversationId: string | null;
}

const ChatInput = ({
  newMessage,
  onMessageChange,
  onSendMessage,
  loading,
  currentConversationId,
}: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about finding your purpose, setting goals, or any life guidance..."
          className="flex-1"
          disabled={loading || !currentConversationId}
        />
        <Button
          onClick={onSendMessage}
          disabled={!newMessage.trim() || loading || !currentConversationId}
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
