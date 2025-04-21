import { useState } from "react";
import { 
  Bell, 
  Search, 
  Calendar, 
  LayoutGrid, 
  MessageSquare, 
  Bot,
  Network, 
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/dashboard/Sidebar";
import DealsTable from "@/components/dashboard/DealsTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import DashboardWelcomeAssistant from "@/components/dashboard/DashboardWelcomeAssistant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import AppHeader from "@/components/layout/AppHeader";

export type Deal = {
  id: string;
  name: string;
  borrower: string;
  outstanding: string;
  status: "normal" | "warning" | "alert" | null;
};

export type Alert = {
  id: string;
  type: "document" | "covenant" | "payment" | "task";  // Added "task" as valid type
  message: string;
  dealId?: string;
  severity: "high" | "medium" | "low";
};

const navigationButtons = [
  {
    id: "agenda",
    label: "Agenda",
    icon: Calendar,
    tooltip: "Scheduler of tasks integrated with your work and team agenda, with agentic and delegation functionalities",
    hasBadge: true,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    tooltip: "Review your portfolio of transactions, monitor covenants, upload documentation, interact with participants, and access transactional apps",
    hasBadge: false,
    isActive: true,
  },
  {
    id: "chats",
    label: "Nítido Chats",
    icon: MessageSquare,
    tooltip: "Review open and historical conversations, interact with your team, and get continuous AI assistance with summaries, actions, and autonomous participation",
    hasBadge: false,
  },
  {
    id: "assistant",
    label: "Nítido AI Assistant",
    icon: Bot,
    tooltip: "Access all AI assistant chats, searchable by topic/deal/date, and configure the assistant's capabilities, limitations, and autonomy",
    hasBadge: false,
  },
  {
    id: "agents",
    label: "Nítido AI Agents",
    icon: Network,
    tooltip: "Generate agentic tasks, review pending supervision actions, and link AI agents with your team",
    hasBadge: false,
  },
  {
    id: "setup",
    label: "Setup",
    icon: Settings,
    tooltip: "Configure platform settings, optimize AI capabilities, manage users and guidelines, language preferences, and operational restrictions",
    hasBadge: false,
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
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
    {
      id: "a4",
      type: "task",
      message: "Meeting preparation needed for quarterly review",
      severity: "medium",
    }
  ]);

  const agendaPending = alerts.some(a => a.type === "task");

  const [searchTerm, setSearchTerm] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const filteredDeals = deals.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate("/access");
  };

  const handleNavButtonClick = (id: string) => {
    if (id === "assistant") {
      setIsChatOpen(!isChatOpen);
      setSidebarCollapsed(true);
    } else if (id === "dashboard") {
      // Do nothing, already on dashboard
    } else {
      // Navigate to other pages
      navigate(`/${id}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ${sidebarCollapsed ? 'w-16' : 'w-56'}`}>
          <div className="py-4 px-3 flex-1">
            <div className="flex flex-col space-y-4">
              <TooltipProvider>
                {navigationButtons.map((button) => (
                  <Tooltip key={button.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={button.isActive ? "default" : "ghost"}
                        className={`justify-start ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                        onClick={() => handleNavButtonClick(button.id)}
                      >
                        <button.icon className={`${sidebarCollapsed ? 'mr-0' : 'mr-2'}`} size={20} />
                        {!sidebarCollapsed && <span>{button.label}</span>}
                        {button.hasBadge && (
                          <Badge variant="destructive" className="ml-auto rounded-full h-5 w-5 p-0 flex items-center justify-center">
                            2
                          </Badge>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center" className="max-w-xs">
                      {button.tooltip}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {showWelcomeMessage && (
                <DashboardWelcomeAssistant onDismiss={() => setShowWelcomeMessage(false)} />
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
