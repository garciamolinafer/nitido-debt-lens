
import { useState } from "react";
import { X, Send } from "lucide-react";
import { Alert } from "./AlertsPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  alert: Alert;
  onClose: () => void;
}

const suggestedActions = (a: Alert): string[] => {
  switch (a.type) {
    case "document":
      return [
        "Generate a summary of the documents and propose actions",
        "Share the documents with lenders",
        "Review and auto-extract key data into the deal site",
        "Open a chat to resolve outstanding document requests",
      ];
    case "covenant":
      return [
        "Draft waiver request email to lenders",
        "Generate impact analysis of the breach",
        "Prepare covenant cure plan with timeline",
      ];
    case "payment":
      return [
        "Draft reminder notice to borrower",
        "Auto-generate interest invoice for lenders",
        "Simulate payment scenarios for next quarter",
      ];
    default:
      return ["Suggest next best action"];
  }
};

const ActionChat = ({ alert, onClose }: Props) => {
  const [messages, setMessages] = useState<
    { from: "ai" | "user"; text: string }[]
  >([
    {
      from: "ai",
      text: `Hi! I detected: "${alert.message}". Here are some ways I can help:`,
    },
    ...suggestedActions(alert).map((t) => ({ from: "ai", text: `• ${t}` })),
  ]);
  const [draft, setDraft] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setDraft("");
    // Prototype response
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "ai", text: "Got it! (AI agent would execute that here)" },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white shadow-xl border rounded-lg flex flex-col z-50">
      <div className="px-3 py-2 border-b flex justify-between items-center">
        <span className="font-semibold text-sm">Nitidina – Agentic Help</span>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>

      <div className="flex-1 overflow-auto px-3 py-2 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "text-sm px-3 py-2 rounded-md max-w-[90%]",
              m.from === "ai"
                ? "bg-gray-100 text-gray-800 self-start"
                : "bg-primary text-white self-end"
            )}
          >
            {m.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="p-2 border-t flex items-center space-x-2"
      >
        <Input
          placeholder="Ask Nitidina..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="text-sm"
        />
        <Button type="submit" size="icon">
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
};

export default ActionChat;
