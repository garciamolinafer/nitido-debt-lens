
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/pages/dashboard/DashboardPage";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = {
  alert: Alert;
  onClose: () => void;
};

/** Draft helper – adapt to your real suggestion logic */
const suggestedActions = (a: Alert): string[] => {
  switch (a.type) {
    case "document":
      return [
        "Generate a summary with recommended actions",
        "Share the documents with the lenders",
        "Review & extract relevant info to the deal site",
        "Open a chat to discuss other requests",
      ];
    case "covenant":
      return [
        "Draft a waiver letter",
        "Notify lenders & request instructions",
        "Analyse breach impact on all tranches",
        "Open follow-up chat",
      ];
    case "payment":
      return [
        "Send payment reminder to borrower",
        "Draft interest-notice e-mail to lenders",
        "Recalculate accrued interest projection",
        "Open follow-up chat",
      ];
    default:
      return ["Open follow-up chat"];
  }
};

export default function ActionChat({ alert, onClose }: Props) {
  /* message objects MUST keep `"ai" | "user"` literal types */
  const [messages, setMessages] = useState<
    { from: "ai" | "user"; text: string }[]
  >([
    {
      from: "ai",
      text: `I detected: "${alert.message}". How can I help? Select an option below or ask me directly.`,
    } as const,
  ]);

  /** Options that are still selectable */
  const [options, setOptions] = useState<string[]>(suggestedActions(alert));

  /* Called when user clicks a quick-action or submits free text */
  const handleSubmit = (text: string) => {
    if (!text.trim()) return;

    /* 1) echo user */
    setMessages((m) => [...m, { from: "user", text } as const]);

    /* 2) fake AI processing & reply */
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "ai",
          text: `Got it! (Here the Nítido agent would execute "${text}").`,
        } as const,
      ]);
    }, 600);
  };

  return (
    <div
      className="fixed bottom-20 right-4 w-80 md:w-96 rounded-xl shadow-lg bg-white border"
      style={{ maxHeight: 'calc(100vh - 6.5rem)' }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/lovable-uploads/7344e249-19ec-4ad4-b902-c4c943d3ab00.png" alt="Nítido Agent" />
          </Avatar>
          <h3 className="font-semibold">Nítido&nbsp;Agents</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </Button>
      </div>

      {/* CHAT BODY */}
      <div className="p-4 space-y-2 overflow-y-auto text-sm flex flex-col grow">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`rounded-lg px-3 py-2 ${
              m.from === "ai"
                ? "bg-gray-100 text-gray-900"
                : "bg-black text-white self-end"
            }`}
          >
            {m.text}
          </div>
        ))}

        {/* QUICK-ACTION BUTTONS (only while options remain) */}
        {options.length > 0 && (
          <div className="space-y-2">
            {options.map((opt) => (
              <Button
                key={opt}
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  handleSubmit(opt);
                  setOptions((o) => o.filter((x) => x !== opt));
                }}
              >
                {opt}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* INPUT */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const txt = (e.currentTarget.elements.namedItem(
            "msg"
          ) as HTMLInputElement).value;
          (e.currentTarget.elements.namedItem("msg") as HTMLInputElement).value =
            "";
          handleSubmit(txt);
        }}
        className="flex items-center gap-2 border-t px-3 py-2"
      >
        <Input
          name="msg"
          placeholder="Ask Nítido Agents…"
          className="flex-1"
          autoComplete="off"
        />
        <Button type="submit" size="sm">
          Send
        </Button>
      </form>
    </div>
  );
}
