import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DealsTable from "@/components/dashboard/DealsTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import DashboardWelcomeAssistant from "@/components/dashboard/DashboardWelcomeAssistant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";
import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation";
import { useNitidina } from "@/hooks/useNitidina";
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
  type: "document" | "covenant" | "payment" | "task";
  message: string;
  dealId?: string;
  severity: "high" | "medium" | "low";
};

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
  const [agendaPendingCount, setAgendaPendingCount] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { text: nitidinaText, isHidden: nitidinaHidden, setIsHidden: setNitidinaHidden } = 
    useNitidina(deals, alerts, agendaPendingCount);

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
          <DashboardNavigation 
            agendaPending={agendaPendingCount}
            onNavigate={handleNavButtonClick}
          />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {showWelcomeMessage && !nitidinaHidden && (
                <DashboardWelcomeAssistant 
                  message={nitidinaText}
                  onDismiss={() => setNitidinaHidden(true)} 
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
