
import React, { useState, useEffect, useRef } from "react";
import { X, Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatPanelProps {
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      content: "Hello! How can I help you with your portfolio today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: "2",
      sender: "user",
      content: "Can you tell me about the Apollo Energy Loan covenant breach?",
      timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    },
    {
      id: "3",
      sender: "assistant",
      content: "The Apollo Energy Loan has a covenant breach related to their debt service coverage ratio which dropped below the required 1.2x to 0.95x due to unexpected operational expenses. A waiver request has been submitted by the borrower and is pending your review.",
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newUserMessage]);
    setInput("");
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        content: "I'm analyzing that information now. Let me check the details and get back to you with a recommendation.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-gray-200 flex flex-col z-40 shadow-xl">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-medium text-sm">AI</span>
          </div>
          <div>
            <h3 className="font-medium">Nítido Assistant</h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs sm:max-w-md rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs block mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200">
        <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
          <Button type="button" variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input 
            className="flex-1" 
            placeholder="Type your message..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
