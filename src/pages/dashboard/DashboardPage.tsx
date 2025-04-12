
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
  // Sample data for prototype
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

  // Filter deals based on search term
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
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Navigation Bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/97e9da13-fe84-4a49-9699-535c9539831f.png" 
              alt="Nítido Logo" 
              className="h-6 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => navigate("/")}
            >
              <Home size={16} />
              <span>Home</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <MessageSquare size={20} />
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                  <span className="text-sm font-medium">JD</span>
                </div>
                <span className="text-sm mr-1">John Doe</span>
                <ChevronDown size={16} />
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-1 ml-2"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Main Deal Dashboard */}
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
            
            {/* Deals Table */}
            <DealsTable deals={filteredDeals} />
          </div>
          
          {/* Alerts Panel */}
          <AlertsPanel alerts={alerts} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
