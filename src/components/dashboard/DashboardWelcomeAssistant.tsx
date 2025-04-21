
import React from "react";
import { X } from "lucide-react";

// Use a professional-looking male assistant image
const assistantImg =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=96&h=96&facepad=2";

interface DashboardWelcomeAssistantProps {
  message?: string;
  onDismiss?: () => void;
}

const DashboardWelcomeAssistant = ({ 
  message = "Welcome back! How can I assist you today?",
  onDismiss 
}: DashboardWelcomeAssistantProps) => (
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
        {message || (
          <>
            I have reconciled your agenda from Outlook with the tasks extracted from your portfolio.
            <br />
            <span className="font-medium text-blue-900">Check the agenda and let me know how I can assist.</span>
            <br /><br />
            There are various ongoing discussions that need your attention, particularly on the <span className="font-semibold">Abengoa</span> and the <span className="font-semibold">Outer Banks</span> transactions. I have prepared a summary with recommended actions and responses at the <span className="font-semibold">Nítido Chat</span>.
          </>
        )}
      </div>
    </div>
    {onDismiss && (
      <button 
        onClick={onDismiss}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        aria-label="Dismiss message"
      >
        <X size={16} />
      </button>
    )}
  </div>
);

export default DashboardWelcomeAssistant;
