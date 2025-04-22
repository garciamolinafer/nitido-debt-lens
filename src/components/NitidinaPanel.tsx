
import { useEffect, useRef, useState } from "react";
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/App";

/**
 * Very small mock helpers – in a real back‑end you would pull data from
 * Outlook / Firestore / etc.  We hard‑code a few examples so the prototype
 * *looks* smart.
 */
function fakeFetchAgendaSummary(name: string) {
  return {
    pending: 4,
    topDeals: ["Abengoa", "Outer Banks"],
    summary:
      "I have reconciled your agenda from Outlook with the tasks extracted from your portfolio.",
  };
}

function buildMorningGreeting(name: string) {
  const { pending, topDeals, summary } = fakeFetchAgendaSummary(name);

  return [
    `Welcome back ${name}. We have a busy day ahead.`,
    summary,
    `Check the agenda and let me know how I can assist – you have ` +
      `${pending} time‑sensitive items.`,
    `There are various ongoing discussions that need your attention, ` +
      `particularly on the ${topDeals.join(" and ")} transactions.`,
    `I have prepared a summary with recommended actions and responses ` +
      `inside the Nítido Chats panel.`,
  ].join("\n\n");
}

export type ChatMsg = { sender: "user" | "nitidina"; text: string };

export default function NitidinaPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { currentUser } = useAuth(); // assumes name at currentUser.displayName
  const username = currentUser?.displayName || "User";

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  /* === once on mount / open → push contextual greeting === */
  useEffect(() => {
    if (isOpen) {
      const hour = new Date().getHours();
      const alreadyGreeted = messages.some((m) => m.sender === "nitidina");
      if (alreadyGreeted) return;

      const greeting =
        hour < 12
          ? buildMorningGreeting(username)
          : `Hello ${username}. Let me know what you need.`;
      setMessages((prev) => [...prev, { sender: "nitidina", text: greeting }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* scroll to latest */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input.trim() }]);

    // ↳ fake AI echo
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "nitidina",
          text: "👍 Got it! I'll queue that and circle back shortly.",
        },
      ]);
    }, 700);

    setInput("");
  };

  return (
    <>
      {/* floating icon when closed */}
      {!isOpen && (
        <button
          aria-label="Open Nitidina"
          className="fixed bottom-6 right-6 z-40 rounded-full p-3 shadow-lg bg-black text-white"
          onClick={() => {
            /* hand off to parent – parent toggles isOpen */
            onClose(); // but we expect parent to invert the state
          }}
        >
          <Bot size={20} />
        </button>
      )}

      {/* panel */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white border-l border-gray-200 shadow-xl flex flex-col z-40">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2 font-medium">
              <Bot size={18} />
              Nitidina
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close"
              onClick={onClose}
            >
              <X size={18} />
            </Button>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4 text-sm whitespace-pre-line leading-relaxed">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.sender === "user"
                    ? "text-right"
                    : "text-left italic text-gray-800"
                }
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* input */}
          <div className="p-3 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a request..."
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button onClick={send}>Send</Button>
          </div>
        </div>
      )}
    </>
  );
}
