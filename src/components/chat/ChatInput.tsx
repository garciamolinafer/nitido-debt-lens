
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  draft: string;
  setDraft: (val: string) => void;
  onSend: () => void;
}

export default function ChatInput({ draft, setDraft, onSend }: ChatInputProps) {
  return (
    <div className="border-t px-4 py-3 flex items-center space-x-2">
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder="Ask Nitidina…"
        className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none"
      />
      <Button size="sm" onClick={onSend}>
        Send
      </Button>
    </div>
  );
}
