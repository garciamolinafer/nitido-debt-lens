
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import AppHeader from "@/components/layout/AppHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardWelcomeAssistant from "@/components/dashboard/DashboardWelcomeAssistant";
import DealsTable, { Deal } from "@/components/dashboard/DealsTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import ChatPanel from "@/components/dashboard/ChatPanel";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/App";

// Alert type moved here for clarity
import type { Alert } from "@/components/dashboard/AlertsPanel";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample deals data
  const [deals] = useState<Deal[]>([
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
    {
      id: "5",
      name: "Abengoa Syndicated Loan",
      borrower: "Abengoa SA",
      outstanding: "€120,000,000",
      status: "alert",
    },
  ]);

  // Sample alerts data
  const [alerts] = useState<Alert[]>([
    {
      id: "a1",
      type: "document",
      message: "3 documents need review for Beta Real Estate",
      severity: "medium",
      dealId: "2",
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
      message: "Interest payment due tomorrow for Beta Real Estate",
      dealId: "2",
      severity: "low",
    },
    {
      id: "a4",
      type: "document",
      message: "Updated financial statements available for Outer Banks transaction",
      dealId: "4",
      severity: "medium",
    },
  ]);

  // Filter deals based on search term
  const filteredDeals = deals.filter((deal) =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/access");
  };

  // Toggle menu/sidebar
  const handleMenuToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Handle navigation button clicks
  const handleNavButtonClick = (id: string) => {
    if (id === "assistant") {
      setShowChatPanel(true);
      setSidebarCollapsed(true);
    } else if (id === "dashboard") {
      // Stay on dashboard
    } else {
      navigate(`/${id}`);
    }
  };

  const welcomeMessage =
    "I have reconciled your agenda from Outlook with the tasks extracted from your portfolio. Check the agenda and let me know how I can assist. There are various ongoing discussions that need your attention, particularly on the Abengoa and the Outer Banks transactions. I have prepared a summary with recommended actions and responses at the Nítido Chat.";

  return (
    <div className="flex flex-col h-screen bg-white">
      <AppHeader onMenuToggle={handleMenuToggle} onLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed || showChatPanel}
          onNavClick={handleNavButtonClick}
        />
        <main className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {showWelcomeMessage && (
                <DashboardWelcomeAssistant
                  message={welcomeMessage}
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
        </main>
        <AlertsPanel alerts={alerts} />
        {showChatPanel && <ChatPanel onClose={() => setShowChatPanel(false)} />}
      </div>
    </div>
  );
};

export default DashboardPage;
