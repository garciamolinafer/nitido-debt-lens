
import { useState } from "react";
import { Bell, Search, LayoutGrid, MessageSquare, Bot, Network, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/dashboard/Sidebar";
import DealsTable from "@/components/dashboard/DealsTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import DashboardWelcomeAssistant from "@/components/dashboard/DashboardWelcomeAssistant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";
import AppHeader from "@/components/layout/AppHeader";

// Define the types that are imported by other components
export type Deal = {
  id: string;
  name: string;
  borrower: string;
  outstanding: string;
  status: "normal" | "warning" | "alert";
};

export type Alert = {
  id: string;
  type: "document" | "covenant" | "payment";
  message: string;
  severity: "low" | "medium" | "high";
  dealId?: string;
};

// Navigation buttons configuration
const navigationButtons = [
  {
    id: "agenda",
    label: "Agenda",
    icon: Bell,
    tooltip: "Scheduler of tasks integrated with your work and team agenda, with agentic and delegation functionalities",
    hasBadge: true
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    tooltip: "Review your portfolio of transactions, monitor covenants, upload documentation, interact with participants, and access transactional apps",
    hasBadge: false,
    isActive: true
  },
  {
    id: "chats",
    label: "Nítido Chats",
    icon: MessageSquare,
    tooltip: "Review open and historical conversations, interact with your team, and get continuous AI assistance with summaries, actions, and autonomous participation",
    hasBadge: false
  },
  {
    id: "assistant",
    label: "Nítido AI Assistant",
    icon: Bot,
    tooltip: "Access all AI assistant chats, searchable by topic/deal/date, and configure the assistant's capabilities, limitations, and autonomy",
    hasBadge: false
  },
  {
    id: "agents",
    label: "Nítido AI Agents",
    icon: Network,
    tooltip: "Generate agentic tasks, review pending supervision actions, and link AI agents with your team",
    hasBadge: false
  },
  {
    id: "setup",
    label: "Setup",
    icon: Settings,
    tooltip: "Configure platform settings, optimize AI capabilities, manage users and guidelines, language preferences, and operational restrictions",
    hasBadge: false
  }
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  
  // Sample deals data
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: "1",
      name: "Apollo Energy Loan",
      borrower: "Apollo Energy Corp",
      outstanding: "€45,000,000",
      status: "alert"
    },
    {
      id: "2",
      name: "Beta Real Estate Facility",
      borrower: "Beta Group",
      outstanding: "€80,000,000",
      status: "normal"
    },
    {
      id: "3",
      name: "Gamma Technology Credit",
      borrower: "Gamma Tech Inc",
      outstanding: "€30,000,000",
      status: "warning"
    },
    {
      id: "4",
      name: "Delta Manufacturing Loan",
      borrower: "Delta Industries",
      outstanding: "€65,000,000",
      status: "normal"
    }
  ]);

  // Sample alerts data
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "a1",
      type: "document",
      message: "3 documents need review",
      severity: "medium"
    },
    {
      id: "a2",
      type: "covenant",
      message: "Covenant breach in Apollo Energy Loan - requires action",
      dealId: "1",
      severity: "high"
    },
    {
      id: "a3",
      type: "payment",
      message: "Interest payment due tomorrow for Beta Real Estate Facility",
      dealId: "2",
      severity: "low"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Filter deals based on search term
  const filteredDeals = deals.filter(deal => 
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    deal.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/access");
  };

  // Handle navigation button clicks
  const handleNavButtonClick = (id: string) => {
    if (id === "assistant") {
      // Open AI assistant
      const chatButton = document.querySelector('[aria-label="Open AI Chat Assistant"]');
      if (chatButton instanceof HTMLElement) {
        chatButton.click();
      }
      setSidebarCollapsed(true);
    } else if (id === "dashboard") {
      // Stay on dashboard
    } else {
      navigate(`/${id}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <AppHeader onLogout={handleLogout} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          buttons={navigationButtons} 
          collapsed={sidebarCollapsed} 
          onNavClick={handleNavButtonClick} 
        />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {showWelcomeMessage && (
                <DashboardWelcomeAssistant 
                  message="Welcome back Marina. We have a busy day ahead. I have reconciled your agenda from Outlook with the tasks extracted from your portfolio. Check the agenda and let me know how I can assist. There are various ongoing discussions that need your attention, particularly on the Abengoa and the Outer Banks transactions. I have prepared a summary with recommended actions and responses at the Nítido Chat."
                  onDismiss={() => setShowWelcomeMessage(false)} 
                />
              )}
              
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
          </div>
        </div>
        
        <AlertsPanel alerts={alerts} />
      </div>
    </div>
  );
};

export default DashboardPage;
