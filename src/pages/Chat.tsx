
import React from 'react';
import Layout from '@/components/Layout';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

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

  const isMobile = useIsMobile();

  const sidebarContent = (
    <ChatSidebar
      conversations={conversations}
      currentConversationId={currentConversationId}
      onConversationSelect={setCurrentConversationId}
      onCreateNewConversation={createNewConversation}
    />
  );

  if (isMobile) {
    return (
      <Layout showFooter={false}>
        <div className="h-screen flex flex-col">
          {/* Mobile Header with Drawer Trigger */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[80vh]">
                {sidebarContent}
              </DrawerContent>
            </Drawer>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">Purpose Companion</h1>
              </div>
            </div>
            <div className="w-10"></div> {/* Spacer for balance */}
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col min-h-0">
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
  }

  // Desktop layout
  return (
    <Layout showFooter={false}>
      <div className="h-screen flex">
        {sidebarContent}

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
