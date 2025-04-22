
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage 
            src="/lovable-uploads/97e9da13-fe84-4a49-9699-535c9539831f.png" 
            alt="AI Assistant" 
            className="object-cover object-top"
          />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <h3 className="font-medium">AI Assistant</h3>
      </div>
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="rounded p-1 text-gray-500 hover:bg-gray-200"
        aria-label="Close Chat"
      >
        <X size={18} />
      </Button>
    </div>
  );
};

export default ChatHeader;
