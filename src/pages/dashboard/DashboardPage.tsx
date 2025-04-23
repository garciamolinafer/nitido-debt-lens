import { useState } from "react";
import { Bell, MessageSquare, ChevronDown, Search, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/dashboard/Sidebar";
import DealsTable from "@/components/dashboard/DealsTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";

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

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
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

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      
      <div className="flex flex-col flex-1">
        <div className="flex flex-1 overflow-hidden">
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
          
          <AlertsPanel alerts={alerts} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
