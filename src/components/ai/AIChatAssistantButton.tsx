
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIChatAssistantPanel from "./AIChatAssistantPanel";

interface AIChatAssistantButtonProps {
  context?: {
    dealId?: string;
    documentId?: string;
  };
}

const AIChatAssistantButton = ({ context }: AIChatAssistantButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full h-12 w-12 fixed bottom-6 right-6 shadow-lg hover:shadow-xl transition-all z-30"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
      
      <AIChatAssistantPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        context={context}
      />
    </>
  );
};

export default AIChatAssistantButton;
