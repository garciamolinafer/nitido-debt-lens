import { useState } from "react";
import { Home } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import DealsTable from "@/components/dashboard/DealsTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import DealStats from "@/components/dashboard/DealStats";
import DealSearch from "@/components/dashboard/DealSearch";
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
  const [nitidinaOpen, setNitidinaOpen] = useState(true);

  const filteredDeals = deals.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.borrower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleNitidina = () => {
    setNitidinaOpen(!nitidinaOpen);
  };

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

      <NitidinaPanel 
        isOpen={nitidinaOpen}
        onToggle={toggleNitidina}
        showCloseButton={true}
      />
    </div>
  );
};

export default DashboardPage;
