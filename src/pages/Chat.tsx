
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Layout from '@/components/Layout';
import { Send, MessageCircle, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

const Chat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    if (currentConversationId) {
      loadMessages(currentConversationId);
    }
  }, [currentConversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error loading conversations:', error);
      toast.error('Failed to load conversations');
    } else {
      setConversations(data || []);
      if (data && data.length > 0 && !currentConversationId) {
        setCurrentConversationId(data[0].id);
      }
    }
  };

  const loadMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } else {
      setMessages(data || []);
    }
  };

  const createNewConversation = async () => {
    const { data, error } = await supabase
      .from('conversations')
      .insert([
        {
          user_id: user!.id,
          title: 'New Conversation',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      toast.error('Failed to create new conversation');
    } else {
      setConversations([data, ...conversations]);
      setCurrentConversationId(data.id);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentConversationId || loading) return;

    const userMessage = newMessage.trim();
    setNewMessage('');
    setLoading(true);

    try {
      // Add user message to database
      const { data: userMessageData, error: userMessageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: currentConversationId,
            role: 'user',
            content: userMessage,
          },
        ])
        .select()
        .single();

      if (userMessageError) {
        throw userMessageError;
      }

      // Update local state immediately
      setMessages(prev => [...prev, userMessageData]);

      // Call AI service
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('gemini-chat', {
        body: { message: userMessage, conversationId: currentConversationId }
      });

      if (aiError) {
        throw aiError;
      }

      // Add assistant message to database
      const { data: assistantMessageData, error: assistantMessageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: currentConversationId,
            role: 'assistant',
            content: aiResponse.response,
          },
        ])
        .select()
        .single();

      if (assistantMessageError) {
        throw assistantMessageError;
      }

      // Update local state
      setMessages(prev => [...prev, assistantMessageData]);

      // Update conversation title if this is the first message
      if (messages.length === 0) {
        const title = userMessage.length > 50 ? userMessage.substring(0, 50) + '...' : userMessage;
        await supabase
          .from('conversations')
          .update({ title })
          .eq('id', currentConversationId);
        
        setConversations(prev => 
          prev.map(conv => 
            conv.id === currentConversationId ? { ...conv, title } : conv
          )
        );
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="h-screen flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <Button
              onClick={createNewConversation}
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
                  onClick={() => setCurrentConversationId(conversation.id)}
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

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Purpose Companion</h1>
                <p className="text-sm text-gray-600">Your AI guide for living with purpose</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Start a conversation with your Purpose Companion</p>
                  <p className="text-sm mt-2">Ask about finding your purpose, setting goals, or life guidance</p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-purple-100' : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="max-w-4xl mx-auto flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about finding your purpose, setting goals, or any life guidance..."
                className="flex-1"
                disabled={loading || !currentConversationId}
              />
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || loading || !currentConversationId}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
