
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type MessageType = {
  sender: "user" | "agent";
  text: string;
};

const NITIDO_AGENTS_AVATAR = "/lovable-uploads/7344e249-19ec-4ad4-b902-c4c943d3ab00.png";

interface NitidoAgentsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  showCloseButton?: boolean;
}

const NitidoAgentsPanel = ({ isOpen, onToggle, showCloseButton = false }: NitidoAgentsPanelProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      if (messages.length === 0) {
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
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: MessageType = {
      sender: "user",
      text: inputValue.trim(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    setTimeout(() => {
      const agentResponse: MessageType = {
        sender: "agent",
        text: "Understood. I will now show you the proposed process that I will follow:",
      };
      setMessages((prev) => [...prev, agentResponse]);
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
      {isOpen && (
        <aside className="fixed bottom-0 right-0 top-16 z-40 flex flex-col bg-white shadow-lg transition-all duration-300 w-full sm:w-80 md:w-96 translate-x-0">
          <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={NITIDO_AGENTS_AVATAR}
                  alt="Nítido Agents"
                  className="object-cover"
                />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-base">Nítido Agents</h3>
            </div>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="h-8 w-8"
                aria-label="Close Nítido Agents Chat"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-white">
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
                      ? "max-w-[80%] rounded-lg px-3 py-2 bg-primary text-white text-xs"
                      : "max-w-[80%] rounded-lg px-3 py-2 bg-yellow-100 text-gray-900 text-xs"
                  }
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-3 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-xs focus:border-primary focus:outline-none"
                style={{ fontSize: "12px" }}
              />
              <Button
                size="sm"
                onClick={handleSendMessage}
                className="rounded-md px-3 text-xs"
                disabled={!inputValue.trim()}
              >
                Send
              </Button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default NitidoAgentsPanel;
