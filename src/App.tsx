import React, { useState } from 'react';
import { Message } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { generateResponse } from './utils/chatbot';
import { Bot } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your CDP Support Assistant. I can help you with questions about Segment, mParticle, Lytics, and Zeotap. What would you like to know?',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };
    
    // Generate bot response
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: generateResponse(content),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage, botResponse]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center gap-3">
            <Bot className="w-8 h-8 text-white" />
            <h1 className="text-xl font-semibold text-white">CDP Support Assistant</h1>
          </div>
          
          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
          
          {/* Input */}
          <div className="p-4 border-t">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;