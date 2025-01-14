import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { Message } from '../types';
import classNames from 'classnames';
import { marked } from 'marked';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';
  
  return (
    <div
      className={classNames(
        'flex gap-3 p-4 rounded-lg',
        isBot ? 'bg-blue-50' : 'bg-gray-50'
      )}
    >
      <div className="flex-shrink-0">
        {isBot ? (
          <Bot className="w-6 h-6 text-blue-600" />
        ) : (
          <MessageCircle className="w-6 h-6 text-gray-600" />
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium mb-1">
          {isBot ? 'CDP Support Bot' : 'You'}
        </div>
        <div 
          className="text-gray-700 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: isBot ? marked(message.content) : message.content 
          }}
        />
      </div>
    </div>
  );
};