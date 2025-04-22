
import { useState } from "react";
import { Calendar, LayoutGrid, MessageSquare, Bot, Network, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/dashboard/Sidebar";
import DealsTable from "@/components/dashboard/DealsTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";
import AppHeader from "@/components/layout/AppHeader";
import NitidinaPanel from "@/components/assistant/NitidinaPanel";

const greetings = [
  "Welcome back, Marina. I already reconciled your Outlook agenda with today's portfolio tasks.",
  "Hi Marina! I've synced your calendar and reviewed today's portfolio updates.",
  "Good to see you, Marina. I've prepared an overview of your day's priorities.",
  "Hello Marina! Your schedule is synced and I've analyzed today's portfolio tasks."
];

const navigationButtons = [
  {
    id: "agenda",
    label: "Agenda",
    icon: Calendar,
    tooltip: "Scheduler of tasks integrated with your work and your team agenda – supports agentic and delegation workflows.",
    hasBadge: true
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    tooltip: "Review your portfolio, monitor covenants, upload documentation, interact with participants and access transactional apps.",
    hasBadge: false,
    isActive: true
  },
  {
    id: "chats",
    label: "Nítido Chats",
    icon: MessageSquare,
    tooltip: "Browse open & historic conversations, collaborate with your team and let Nitidina summarise, propose actions or even auto‑reply.",
    hasBadge: false
  },
  {
    id: "assistant",
    label: "Nítido AI Assistant",
    icon: Bot,
    tooltip: "Full ChatGPT‑style view of every Nitidina conversation – filter by topic, deal or date and tune her autonomy / constraints.",
    hasBadge: false
  },
  {
    id: "agents",
    label: "Nítido AI Agents",
    icon: Network,
    tooltip: "Spin‑up agentic tasks, supervise pending actions and link autonomous agents with team mates.",
    hasBadge: false
  },
  {
    id: "setup",
    label: "Setup",
    icon: Settings,
    tooltip: "Platform configuration: AI optimisation, team mapping, operational guidelines, language preferences, restrictions…",
    hasBadge: false
  }
];

export type Deal = {
  id: string;
  name: string;
  borrower: string;
  outstanding: string;
  status: "normal" | "warning" | "alert" | null;
};

export type Alert = {
  id: string;
  type: "document" | "covenant" | "payment";
  message: string;
  dealId?: string;
  severity: "high" | "medium" | "low";
};

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [assistantOpen, setAssistantOpen] = useState(true);
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: "1",
      name: "Apollo Energy Loan",
      borrower: "Apollo Energy Corp",
      outstanding: "€45,000,000",
      status: "alert",
    },
    {
      id: "2",
      name: "Beta Real Estate Facility",
      borrower: "Beta Group",
      outstanding: "€80,000,000",
      status: "normal",
    },
    {
      id: "3",
      name: "Gamma Technology Credit",
      borrower: "Gamma Tech Inc",
      outstanding: "€30,000,000",
      status: "warning",
    },
    {
      id: "4",
      name: "Delta Manufacturing Loan",
      borrower: "Delta Industries",
      outstanding: "€65,000,000",
      status: "normal",
    },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "a1",
      type: "document",
      message: "3 documents need review",
      severity: "medium",
    },
    {
      id: "a2",
      type: "covenant",
      message: "Covenant breach in Apollo Energy Loan - requires action",
      dealId: "1",
      severity: "high",
    },
    {
      id: "a3",
      type: "payment",
      message: "Interest payment due tomorrow for Beta Real Estate Facility",
      dealId: "2",
      severity: "low",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredDeals = deals.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate("/access");
  };
  
  const getRandomGreeting = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
  };

  const initialMessage = `${getRandomGreeting()}

Two open discussions need your attention:
• Abengoa restructuring
• Outer Banks waiver

I placed my recommended actions in "Nítido Chats".`;

  return (
    <div className="flex flex-col h-screen bg-white">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          collapsed={assistantOpen}
        />
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Deals</h1>
            
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search deals..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <DealsTable deals={filteredDeals} />
        </div>
        <NitidinaPanel
          initialMessage={initialMessage}
          onCollapse={setAssistantOpen}
          isOpen={assistantOpen}
        />
      </div>
    </div>
  );
};

export default HomePage;
