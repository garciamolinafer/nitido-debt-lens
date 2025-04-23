
import { useEffect, useState } from "react";
import { X, Send } from "lucide-react";

export interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  initialGreeting?: string;
}

const ChatPanel = ({ open, onClose, initialGreeting }: ChatPanelProps) => {
  const [messages, setMessages] = useState<{ from: "ai" | "me"; text: string }[]>(
    []
  );
  useEffect(() => {
    if (open && initialGreeting) {
      setMessages([{ from: "ai", text: initialGreeting }]);
    }
  }, [open, initialGreeting]);

  const [draft, setDraft] = useState("");
  const send = () => {
    if (!draft.trim()) return;
    setMessages([...messages, { from: "me", text: draft }]);
    setDraft("");
    // (stub) push to backend AI
  };

  return (
    <div
      className={`fixed right-4 bottom-4 md:bottom-auto md:top-16 md:right-6 w-80 bg-white border
       border-gray-300 rounded-lg flex flex-col shadow-lg transition-all ${
         open ? "opacity-100 visible" : "opacity-0 invisible"
       }`}
      style={{ height: open ? "480px" : 0 }}
    >
      {/* header */}
      <div className="h-10 flex items-center justify-between px-3 border-b">
        <span className="font-medium">Nitidina</span>
        <button onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      {/* body */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-sm">
        {messages.map((m, i) => (
          <p
            key={i}
            className={`rounded px-2 py-1 ${
              m.from === "ai"
                ? "bg-gray-100 text-gray-800"
                : "bg-black text-white ml-auto"
            }`}
          >
            {m.text}
          </p>
        ))}
      </div>

      {/* input */}
      <div className="border-t flex items-center p-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="flex-1 text-sm px-2 py-1 border rounded mr-1"
          placeholder="Type here ..."
        />
        <button onClick={send} className="text-gray-600 hover:text-black">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
