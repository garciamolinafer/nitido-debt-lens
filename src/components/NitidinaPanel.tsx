
import { useState, useEffect, useRef } from "react";
import { X, Glasses } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type MessageType = {
  sender: "user" | "nitidina";
  text: string;
};

// Simulate an async greeting function
const getInitialNitidinaGreeting = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hour = new Date().getHours();
      let greeting = "Hello";
      
      if (hour < 12) greeting = "Good morning";
      else if (hour < 18) greeting = "Good afternoon";
      else greeting = "Good evening";
      
      resolve(`${greeting} Marina! How can I assist you with your portfolio management today?`);
    }, 800);
  });
};

interface NitidinaPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const NitidinaPanel = ({ isOpen, onToggle }: NitidinaPanelProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      // If there are no messages yet, fetch the initial greeting
      if (messages.length === 0) {
        getInitialNitidinaGreeting().then((greeting) => {
          setMessages([{ sender: "nitidina", text: greeting }]);
        });
      }
      
      // Focus the input when panel opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const newMessage: MessageType = {
      sender: "user",
      text: inputValue.trim(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate Nitidina's response
    setTimeout(() => {
      const nitidinaResponse: MessageType = {
        sender: "nitidina",
        text: "👍 Got it! Let me work on that...",
      };
      setMessages((prev) => [...prev, nitidinaResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Collapsed state - floating avatar button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-20 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all"
          aria-label="Open Nitidina"
        >
          <Avatar className="h-9 w-9 bg-yellow-200 flex items-center justify-center">
            <AvatarFallback className="relative bg-yellow-200 text-primary font-bold">
              {/* Simulate a young girl with glasses and ponytail: MW initials, glasses icon */}
              <span className="text-xs">MW</span>
              <Glasses className="absolute left-1/2 -translate-x-1/2 bottom-0 text-pink-600 w-4 h-4" />
              {/* (No ponytail icon in lucide, using color and initials for a hint) */}
            </AvatarFallback>
          </Avatar>
        </button>
      )}

      {/* Expanded state - panel */}
      <aside
        className={`fixed bottom-0 right-0 top-16 z-40 flex flex-col bg-white shadow-lg transition-all duration-300 w-full sm:w-80 md:w-96 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-yellow-200 flex items-center justify-center">
              <AvatarFallback className="relative bg-yellow-200 text-primary font-bold">
                <span className="text-xs">MW</span>
                <Glasses className="absolute left-1/2 -translate-x-1/2 bottom-0 text-pink-600 w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <h3 className="font-medium">Nitidina</h3>
          </div>
          <button 
            onClick={onToggle} 
            className="rounded p-1 text-gray-500 hover:bg-gray-200"
            aria-label="Close Nitidina Panel"
          >
            <X size={18} />
          </button>
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
              <div
                className={
                  message.sender === "user"
                    ? "max-w-[80%] rounded-lg px-4 py-2 bg-primary text-white"
                    : "max-w-[80%] rounded-lg px-4 py-2 bg-yellow-100 text-gray-900"
                }
              >
                {message.text}
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
              className="rounded-md px-3"
              disabled={!inputValue.trim()}
            >
              Send
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default NitidinaPanel;
