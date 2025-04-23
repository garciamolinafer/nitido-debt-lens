
import { useState } from "react";
import { Calendar, LayoutGrid, MessageSquare, Bot, Network, Settings } from "lucide-react";

import AppHeader from "@/components/layout/AppHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import DealsTable from "@/components/dashboard/DealsTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import ChatPanel from "@/components/chat/ChatPanel";
import { Deal, Alert } from "@/types";
import getSmartGreeting from "@/utils/getSmartGreeting";

const DashboardPage = () => {
  /* ---------------- state ---------------- */
  const [chatOpen, setChatOpen] = useState(false);

  const deals: Deal[] = [
    { id: "1", name: "Apollo Energy Loan", borrower: "Apollo Energy Corp", outstanding: "€45,000,000", status: "alert" },
    { id: "2", name: "Beta Real Estate Facility", borrower: "Beta Group", outstanding: "€80,000,000", status: "normal" },
    { id: "3", name: "Gamma Technology Credit", borrower: "Gamma Tech Inc", outstanding: "€30,000,000", status: "warning" },
    { id: "4", name: "Delta Manufacturing Loan", borrower: "Delta Industries", outstanding: "€65,000,000", status: "normal" },
  ];

  const alerts: Alert[] = [
    { id: "a1", type: "document", message: "3 documents need review", severity: "medium" },
    { id: "a2", type: "covenant", message: "Covenant breach in Apollo Energy Loan – requires action", dealId: "1", severity: "high" },
    { id: "a3", type: "payment", message: "Interest payment due tomorrow for Beta Real Estate Facility", dealId: "2", severity: "low" },
  ];

  /* ------------ smart greeting for Nitidina ------------- */
  const greeting = getSmartGreeting({
    userName: "Marina",
    alerts,
    agendaInfo: "your Outlook agenda has been reconciled with portfolio tasks",
  });

  /* ---------------- render ---------------- */
  return (
    <div className="flex flex-col h-screen">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR – reuse existing component */}
        <Sidebar
          collapsed={chatOpen} /* auto-minimise when chat open */
          buttons={[
            { id: "agenda", label: "Agenda", icon: Calendar, tooltip: "Scheduler of tasks integrated with your work calendar" },
            { id: "dashboard", label: "Dashboard", icon: LayoutGrid, tooltip: "Portfolio overview", isActive: true },
            { id: "chats", label: "Nítido Chats", icon: MessageSquare, tooltip: "All team chats assisted by Nitidina" },
            { id: "assistant", label: "AI Assistant", icon: Bot, tooltip: "Full chatGPT-like page" },
            { id: "agents", label: "AI Agents", icon: Network, tooltip: "Configure agentic tasks" },
            { id: "setup", label: "Setup", icon: Settings, tooltip: "Platform preferences" },
          ]}
        />

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">My Deals</h1>
          <DealsTable deals={deals} />
        </main>

        {/* ALERTS */}
        <AlertsPanel alerts={alerts} />
      </div>

      {/* Nitidina chat (icon sits in header component) */}
      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} initialGreeting={greeting} />
    </div>
  );
};

export default DashboardPage;
