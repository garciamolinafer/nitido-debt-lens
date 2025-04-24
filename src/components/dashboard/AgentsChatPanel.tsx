
import React, { useEffect, useState } from "react";
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import clsx from "clsx";

type Message = {
  id: number;
  from: "user" | "ai";
  text: string;
};

interface AgentsChatPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function AgentsChatPanel({ open, onClose }: AgentsChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: 1,
          from: "ai",
          text: "Marina, let me know what kind of action you'd like me to process for you."
        }
      ]);
    }
  }, [open, messages.length]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      from: "user",
      text: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    if (!hasUserSentMessage) {
      setHasUserSentMessage(true);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            from: "ai",
            text: "Understood. I will now show you the proposed process that I will follow:"
          }
        ]);
      }, 1000);
    }
  };

  return (
    <aside
      className={clsx(
        "fixed top-0 right-0 h-[70vh] w-full sm:max-w-md transition-transform z-50 shadow-lg",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      <Card className="flex flex-col h-full rounded-none">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-medium">Nítido Agents</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={clsx(
                "max-w-[80%]",
                message.from === "user" ? "ml-auto" : ""
              )}
            >
              <div
                className={clsx(
                  "rounded-lg px-3 py-2 text-sm",
                  message.from === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Nítido Agents …"
              className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="sm" onClick={handleSend} disabled={!input.trim()}>
              Send
            </Button>
          </div>
        </div>
      </Card>
    </aside>
  );
}
