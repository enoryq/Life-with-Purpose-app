
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus } from 'lucide-react';
import { Conversation } from '@/hooks/useChat';

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onConversationSelect: (id: string) => void;
  onCreateNewConversation: () => void;
}

const ChatSidebar = ({
  conversations,
  currentConversationId,
  onConversationSelect,
  onCreateNewConversation,
}: ChatSidebarProps) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Button
          onClick={onCreateNewConversation}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.map((conversation) => (
            <Card
              key={conversation.id}
              className={`mb-2 cursor-pointer transition-colors ${
                currentConversationId === conversation.id
                  ? 'bg-purple-50 border-purple-200'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onConversationSelect(conversation.id)}
            >
              <CardContent className="p-3">
                <div className="font-medium text-sm truncate">{conversation.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(conversation.created_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
