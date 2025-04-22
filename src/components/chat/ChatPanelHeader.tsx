
import { X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatPanelHeaderProps {
  onClose: () => void;
}

export default function ChatPanelHeader({ onClose }: ChatPanelHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center space-x-2">
        <Bot className="w-5 h-5" />
        <h2 className="font-semibold">Nitidina Assistant</h2>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
}
