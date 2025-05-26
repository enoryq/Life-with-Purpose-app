
import React from 'react';
import Layout from '@/components/Layout';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';

const Chat = () => {
  const {
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
  } = useChat();

  return (
    <Layout showFooter={false}>
      <div className="h-screen flex">
        <ChatSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onConversationSelect={setCurrentConversationId}
          onCreateNewConversation={createNewConversation}
        />

        <div className="flex-1 flex flex-col">
          <ChatHeader />
          
          <ChatMessages
            messages={messages}
            loading={loading}
            messagesEndRef={messagesEndRef}
          />

          <ChatInput
            newMessage={newMessage}
            onMessageChange={setNewMessage}
            onSendMessage={sendMessage}
            loading={loading}
            currentConversationId={currentConversationId}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
