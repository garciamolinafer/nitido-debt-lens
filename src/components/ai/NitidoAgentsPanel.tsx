
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Message = {
  sender: "user" | "agent";
  text: string;
};

interface NitidoAgentsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NitidoAgentsPanel = ({ isOpen, onClose }: NitidoAgentsPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: "agent",
          text: "Marina, let me know what kind of action do you want me to process for you."
        }
      ]);
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      sender: "user" as const,
      text: inputValue.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        sender: "agent" as const,
        text: "Understood. I will now show you the proposed process that I will follow:"
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-96 top-16 w-96 bg-white border-l border-gray-200 shadow-lg z-40 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/lovable-uploads/7344e249-19ec-4ad4-b902-c4c943d3ab00.png"
              alt="Nítido Agents"
            />
          </Avatar>
          <h3 className="font-semibold">Nítido&nbsp;Agents</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                message.sender === "user"
                  ? "max-w-[80%] rounded-lg px-3 py-2 bg-black text-white"
                  : "max-w-[80%] rounded-lg px-3 py-2 bg-gray-100"
              }
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
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
  );
};

export default NitidoAgentsPanel;
