
import React from "react";

const assistantImg =
  "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=facearea&w=96&h=96&facepad=4";

const DashboardWelcomeAssistant = () => (
  <div className="flex items-start gap-4 rounded-lg bg-blue-50 border border-blue-100 p-5 mb-8 shadow-sm">
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
        I have reconciled your agenda from Outlook with the tasks extracted from your portfolio.
        <br />
        <span className="font-medium text-blue-900">Check the agenda and let me know how can I assist.</span>
        <br /><br />
        There are various ongoing discussions that need your attention, particularly on the <span className="font-semibold">Abengoa</span> and the <span className="font-semibold">Outer Banks</span> transactions. I have prepared a summary with recommended actions and responses at the <span className="font-semibold">Nítido Chat</span>.
      </div>
    </div>
  </div>
);

export default DashboardWelcomeAssistant;
