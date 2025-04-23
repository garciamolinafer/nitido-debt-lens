
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const NitidinaButton = () => {
  return (
    <Button 
      variant="ghost" 
      size="icon"
      className="ml-2"
      aria-label="Open Nitidina Chat"
    >
      <Bot size={20} />
    </Button>
  );
};

export default NitidinaButton;
