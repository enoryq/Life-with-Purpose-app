
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

export const useChat = () => {
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
      // Type cast the role property to match our Message interface
      const typedMessages = (data || []).map(msg => ({
        ...msg,
        role: msg.role as 'user' | 'assistant'
      }));
      setMessages(typedMessages);
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

      // Update local state immediately with properly typed message
      const typedUserMessage: Message = {
        ...userMessageData,
        role: 'user'
      };
      setMessages(prev => [...prev, typedUserMessage]);

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

      // Update local state with properly typed message
      const typedAssistantMessage: Message = {
        ...assistantMessageData,
        role: 'assistant'
      };
      setMessages(prev => [...prev, typedAssistantMessage]);

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

  return {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    messages,
    newMessage,
    setNewMessage,
    loading,
    messagesEndRef,
    createNewConversation,
    sendMessage,
  };
};
