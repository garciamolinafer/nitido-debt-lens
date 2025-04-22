
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import clsx from "clsx";
import ChatPanelHeader from "./ChatPanelHeader";
import ChatMessageList, { Message } from "./ChatMessageList";
import ChatInput from "./ChatInput";

interface ChatPanelProps {
  /** whether the panel is visible */
  open: boolean;
  /** called when user clicks X (closes panel) */
  onClose: () => void;
  /** personalised greeting from parent (can be empty) */
  initialGreeting?: string;
}

export default function ChatPanel({
  open,
  onClose,
  initialGreeting = ""
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");

  // push the smart greeting once, on first open
  useEffect(() => {
    if (open && initialGreeting && messages.length === 0) {
      setMessages([
        { id: 1, from: "bot", text: initialGreeting },
      ]);
    }
  }, [open, initialGreeting, messages.length]);

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      { id: m.length + 1, from: "user", text: draft.trim() }
    ]);
    setDraft("");
    // 👉 hook real AI backend here to push bot response
  };

  return (
    <aside
      className={clsx(
        "fixed top-0 right-0 h-screen w-full sm:max-w-md transition-transform z-50 shadow-lg",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      <Card className="flex flex-col h-full rounded-none">
        <ChatPanelHeader onClose={onClose} />
        <ChatMessageList messages={messages} />
        <ChatInput
          draft={draft}
          setDraft={setDraft}
          onSend={send}
        />
      </Card>
    </aside>
  );
}
