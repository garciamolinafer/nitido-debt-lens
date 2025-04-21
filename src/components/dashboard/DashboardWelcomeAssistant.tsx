
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DashboardWelcomeAssistantProps {
  message: string;
  onDismiss: () => void;
}

const DashboardWelcomeAssistant: React.FC<DashboardWelcomeAssistantProps> = ({ message, onDismiss }) => {
  const assistantImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=96&h=96&facepad=2";
  return (
    <div className="flex items-start gap-4 rounded-lg bg-blue-50 border border-blue-100 p-5 mb-8 shadow-sm relative">
      <img
        src={assistantImg}
        alt="Nítido Assistant"
        className="w-16 h-16 rounded-full border-2 border-blue-200 object-cover bg-white"
      />
      <div>
        <div className="font-semibold text-base text-gray-900 mb-1">
          Welcome back, Marina. We have a busy day ahead.
        </div>
        <div className="text-gray-700 text-sm leading-relaxed">
          {message}
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onDismiss}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        aria-label="Dismiss message"
      >
        <X size={16} />
      </Button>
    </div>
  );
};

export default DashboardWelcomeAssistant;
