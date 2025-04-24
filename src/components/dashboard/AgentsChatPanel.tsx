
import React, { useEffect, useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface AgentsChatPanelProps {
  open: boolean;
  onClose: () => void;
}

type Message = {
  id: number;
  from: "ai" | "user";
  text: string;
};

const AgentsChatPanel: React.FC<AgentsChatPanelProps> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [hasReplied, setHasReplied] = useState(false);

  useEffect(() => {
    if (open) {
      setMessages([{
        id: Date.now(),
        from: "ai",
        text: "Marina, let me know what kind of action you'd like me to process for you."
      }]);
      setInput("");
      setHasReplied(false);
    } else {
      setMessages([]);
    }
  }, [open]);

  const sendUserMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now(),
      from: "user",
      text: trimmed
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    if (!hasReplied) {
      setHasReplied(true);
      const aiMsg: Message = {
        id: Date.now() + 1,
        from: "ai",
        text: "Understood. I will now show you the proposed process that I will follow:"
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, aiMsg]);
      }, 400);
    }
  };

  if (!open) return null;

  return (
    <aside className="fixed top-0 right-0 h-[70vh] w-full sm:max-w-md transition-transform z-50 shadow-lg translate-x-0">
      <div className="flex flex-col h-full bg-white border rounded-none shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b">
          <span className="font-semibold">Nítido Agents</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "ai" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  m.from === "ai"
                    ? "bg-gray-100 text-gray-900"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="p-3 border-t flex items-center gap-2">
          <Input
            placeholder="Ask Nítido Agents…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendUserMessage();
            }}
          />
          <Button size="icon" onClick={sendUserMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AgentsChatPanel;
