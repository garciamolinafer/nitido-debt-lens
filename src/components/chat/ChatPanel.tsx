
import React, { useState, useEffect, useRef } from 'react';
import { X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

type Message = {
  sender: 'user' | 'nitidina';
  text: string;
};

const NITIDINA_AVATAR_IMG = "/lovable-uploads/8e1f1c48-bd1c-47d6-b0dd-7682f9789473.png";
const NITIDINA_AVATAR_ALT = "Nitidina Assistant Avatar";

// Initial greeting based on time of day
const getNitidinaGreeting = (): string => {
  const h = new Date().getHours();
  const part = h < 12 ? "morning" : h < 18 ? "afternoon" : "evening";

  return `Good ${part}, Marina! 

I have reconciled your Outlook agenda with the tasks extracted from your portfolio.
Check the agenda and let me know how I can assist.

⚡ There are ongoing discussions that need your attention, particularly on the Abengoa and Outer Banks transactions. I've prepared a summary with recommended actions and responses.`;
};

const ChatPanel: React.FC<ChatPanelProps> = ({ open, onClose, onOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      // If there are no messages yet, add the initial greeting
      if (messages.length === 0) {
        setMessages([{ sender: 'nitidina', text: getNitidinaGreeting() }]);
      }
      
      // Focus input when panel opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [open, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      sender: 'user',
      text: inputValue.trim(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate Nitidina's response
    setTimeout(() => {
      const nitidinaResponse: Message = {
        sender: 'nitidina',
        text: "I'm analyzing your request regarding the portfolio transactions. Would you like me to prepare a summary for the Abengoa deal, the Outer Banks transaction, or both?",
      };
      setMessages((prev) => [...prev, nitidinaResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat panel floating button when closed */}
      {!open && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all"
          aria-label="Open Nitidina Chat"
        >
          <Avatar className="h-9 w-9 bg-yellow-200 flex items-center justify-center">
            <AvatarImage
              src={NITIDINA_AVATAR_IMG}
              alt={NITIDINA_AVATAR_ALT}
            />
            <AvatarFallback className="bg-yellow-200 text-primary font-bold">
              N
            </AvatarFallback>
          </Avatar>
        </button>
      )}
      
      {/* Full chat panel when open */}
      <div 
        className={`transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} 
        fixed right-0 top-16 bottom-0 w-full sm:w-80 md:w-96 bg-white shadow-lg z-50 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-yellow-200 flex items-center justify-center">
              <AvatarImage
                src={NITIDINA_AVATAR_IMG}
                alt={NITIDINA_AVATAR_ALT}
              />
              <AvatarFallback className="bg-yellow-200 text-primary font-bold">
                N
              </AvatarFallback>
            </Avatar>
            <h3 className="font-medium">Nitidina</h3>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose} 
            className="rounded p-1 text-gray-500"
            aria-label="Close Nitidina Panel"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.sender === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              {message.sender === "nitidina" && (
                <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                  <AvatarImage src={NITIDINA_AVATAR_IMG} alt={NITIDINA_AVATAR_ALT} />
                  <AvatarFallback className="bg-yellow-200 text-primary">N</AvatarFallback>
                </Avatar>
              )}
              <div
                className={
                  message.sender === "user"
                    ? "max-w-[75%] rounded-lg px-4 py-2 bg-primary text-white"
                    : "max-w-[75%] rounded-lg px-4 py-2 bg-yellow-50 text-gray-900"
                }
              >
                {message.text.split('\n\n').map((paragraph, i) => (
                  <p key={i} className={i > 0 ? "mt-2" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPanel;
