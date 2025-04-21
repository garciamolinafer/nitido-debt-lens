
import React from "react";

type Props = { 
  message: string; 
  onDismiss: () => void 
};

const DashboardWelcomeAssistant: React.FC<Props> = ({ message, onDismiss }) => (
  <div className="relative mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
    <button 
      className="absolute right-3 top-2 text-gray-500 hover:text-gray-700" 
      onClick={onDismiss}
      aria-label="Dismiss message"
    >
      ×
    </button>
    <h2 className="font-semibold mb-2">Nitidina • AI Coach</h2>
    <p className="whitespace-pre-line">{message}</p>
  </div>
);

export default DashboardWelcomeAssistant;
