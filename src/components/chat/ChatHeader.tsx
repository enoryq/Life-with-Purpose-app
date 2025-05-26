
import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatHeader = () => {
  return (
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
  );
};

export default ChatHeader;
