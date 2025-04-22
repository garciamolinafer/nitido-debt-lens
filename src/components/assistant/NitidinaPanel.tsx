
import { useState, useRef, useEffect } from "react";
import { ChevronRight, Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  sender: "assistant" | "user";
}

interface NitidinaPanelProps {
  initialMessage: string;
  onCollapse: (isOpen: boolean) => void;
  isOpen: boolean;
}

const NitidinaPanel = ({ initialMessage, onCollapse, isOpen }: NitidinaPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      content: initialMessage,
      sender: "assistant"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    console.log("User message:", input);
    setInput("");
  };

  if (!isOpen) {
    return (
      <div className="w-12 border-l border-gray-200 flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapse(true)}
          className="hover:bg-gray-100"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-gray-200 flex flex-col">
      <div className="h-14 border-b border-gray-200 flex items-center px-4 gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapse(false)}
          className="hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
        <span className="font-semibold">Nitidina – AI Assistant</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.sender === "assistant" 
                ? "bg-gray-50 border border-gray-200" 
                : "bg-blue-50 border border-blue-200"
            } rounded-lg p-3 text-sm`}
          >
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NitidinaPanel;
