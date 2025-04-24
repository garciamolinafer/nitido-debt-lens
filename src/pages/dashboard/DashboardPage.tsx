import { useState } from "react";
import { Home, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/dashboard/Sidebar";
import DealsTable from "@/components/dashboard/DealsTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import DealStats from "@/components/dashboard/DealStats";
import DealSearch from "@/components/dashboard/DealSearch";
import AgentsChatPanel from "@/components/dashboard/AgentsChatPanel";
import NitidinaPanel from "@/components/NitidinaPanel";

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

const navigationButtons = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    tooltip: "Return to the Nítido Home page",
    hasBadge: false,
  },
];

const DashboardPage = () => {
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
  const [chatOpen, setChatOpen] = useState(false);
  const [agentsChatOpen, setAgentsChatOpen] = useState(false);

  const filteredDeals = deals.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto p-6">
            <DealStats deals={deals} />
            <DealSearch 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <DealsTable deals={filteredDeals} />
          </div>
          <AlertsPanel alerts={alerts} />
        </div>
      </div>

      <div className="fixed bottom-6 right-6 flex gap-4 z-50">
        {!agentsChatOpen && !chatOpen && (
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 absolute right-0"
            onClick={() => {
              setAgentsChatOpen(true);
            }}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage 
                src="/lovable-uploads/061655cf-888e-41f2-857a-940a2b0f66c5.png" 
                alt="Nítido Agents" 
                className="object-contain"
              />
            </Avatar>
          </Button>
        )}
        
        {!chatOpen && !agentsChatOpen && (
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-yellow-200 hover:bg-yellow-300 absolute right-16"
            onClick={() => {
              setChatOpen(true);
            }}
          >
            <Avatar className="h-8 w-8 bg-yellow-200 flex items-center justify-center">
              <AvatarImage
                className="object-cover"
                src="/lovable-uploads/8e1f1c48-bd1c-47d6-b0dd-7682f9789473.png"
                alt="Nitidina Assistant Avatar"
              />
            </Avatar>
          </Button>
        )}
      </div>

      <AgentsChatPanel
        open={agentsChatOpen}
        onClose={() => setAgentsChatOpen(false)}
      />
      
      <NitidinaPanel
        isOpen={chatOpen}
        onToggle={() => setChatOpen(false)}
        showCloseButton={true}
      />
    </div>
  );
};

export default DashboardPage;
