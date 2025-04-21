
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Menu, 
  Globe, 
  Bell, 
  LayoutGrid, 
  MessageSquare, 
  Bot, 
  Network, 
  Settings,
  Search,
  X,
  ChevronDown,
  Send,
  Paperclip
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/App";

// Define types needed by components
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

// App Header Component
interface AppHeaderProps {
  onMenuToggle: () => void;
  onLogout: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onMenuToggle, onLogout }) => {
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
  ];
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onMenuToggle} className="mr-4">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="text-xl font-bold text-blue-600">Nítido</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem 
                key={lang.code}
                onClick={() => setCurrentLanguage(lang)}
                className={lang.code === currentLanguage.code ? "bg-gray-100" : ""}
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="Marina" />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

// Sidebar Component
interface SidebarProps {
  collapsed: boolean;
  onNavClick: (id: string) => void;
}

interface NavButton {
  id: string;
  label: string;
  icon: React.ElementType;
  tooltip: string;
  hasBadge: boolean;
  isActive?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onNavClick }) => {
  // Navigation buttons configuration
  const navButtons: NavButton[] = [
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

  return (
    <TooltipProvider>
      <aside className={`border-r border-gray-200 bg-white transition-all duration-200 ${collapsed ? 'w-16' : 'w-64'}`}>
        <nav className="flex flex-col h-full py-6">
          <ul className="space-y-1 px-3">
            {navButtons.map((button) => (
              <li key={button.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={button.isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start relative ${collapsed ? 'px-2' : 'px-3'}`}
                      onClick={() => onNavClick(button.id)}
                    >
                      <button.icon className="h-5 w-5 min-w-5" />
                      {!collapsed && <span className="ml-3">{button.label}</span>}
                      {button.hasBadge && (
                        <Badge variant="destructive" className={`h-2 w-2 p-0 absolute top-1 ${collapsed ? 'right-1' : 'left-6'}`} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{button.label}</p>
                      <p className="text-xs text-gray-500">{button.tooltip}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
          
          {!collapsed && (
            <div className="mt-auto p-4 border-t border-gray-200">
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Marina" />
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">Marina Alvarez</p>
                  <p className="text-xs text-gray-500">Portfolio Manager</p>
                </div>
              </div>
            </div>
          )}
        </nav>
      </aside>
    </TooltipProvider>
  );
};

// Welcome Assistant Component
interface DashboardWelcomeAssistantProps {
  message: string;
  onDismiss: () => void;
}

const DashboardWelcomeAssistant: React.FC<DashboardWelcomeAssistantProps> = ({ message, onDismiss }) => {
  // Use a professional-looking male assistant image
  const assistantImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=96&h=96&facepad=2";

  return (
    <div className="flex items-start gap-4 rounded-lg bg-blue-50 border border-blue-100 p-5 mb-8 shadow-sm relative">
      <img
        src={assistantImg}
        alt="Nítido Assistant"
        className="w-16 h-16 rounded-full border-2 border-blue-200 object-cover bg-white"
      />
      <div>
        <div className="font-semibold text-base text-gray-900 mb-1">
          Welcome back, Marina. We have a busy day ahead.
        </div>
        <div className="text-gray-700 text-sm leading-relaxed">
          {message}
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onDismiss}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        aria-label="Dismiss message"
      >
        <X size={16} />
      </Button>
    </div>
  );
};

// Deals Table Component
interface DealsTableProps {
  deals: Deal[];
}

const DealsTable: React.FC<DealsTableProps> = ({ deals }) => {
  const navigate = useNavigate();

  const getStatusIcon = (status: Deal['status']) => {
    if (status === 'alert') {
      return <div className="h-3 w-3 bg-red-500 rounded-full"></div>;
    } else if (status === 'warning') {
      return <div className="h-3 w-3 bg-amber-500 rounded-full"></div>;
    } else {
      return <div className="h-3 w-3 bg-emerald-500 rounded-full"></div>;
    }
  };

  const handleRowClick = (dealId: string) => {
    navigate(`/deals/${dealId}/monitoring`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deal Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Borrower
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Outstanding
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {deals.map((deal) => (
            <tr 
              key={deal.id}
              onClick={() => handleRowClick(deal.id)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {deal.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {deal.borrower}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {deal.outstanding}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  {getStatusIcon(deal.status)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Alerts Panel Component
interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const navigate = useNavigate();
  
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'document':
        return <div className="h-3 w-3 bg-blue-500 rounded-full"></div>;
      case 'covenant':
        return <div className="h-3 w-3 bg-red-500 rounded-full"></div>;
      case 'payment':
        return <div className="h-3 w-3 bg-amber-500 rounded-full"></div>;
      default:
        return <div className="h-3 w-3 bg-gray-500 rounded-full"></div>;
    }
  };

  const getBgColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return "bg-red-50";
      case 'medium':
        return "bg-amber-50";
      case 'low':
        return "bg-blue-50";
      default:
        return "bg-gray-50";
    }
  };
  
  const handleAlertClick = (alert: Alert) => {
    if (alert.dealId) {
      navigate(`/deals/${alert.dealId}`);
    }
  };

  return (
    <div className="w-72 border-l border-gray-200 overflow-y-auto bg-gray-50 p-4">
      <h2 className="text-lg font-bold mb-4">Alerts</h2>
      
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start p-3 rounded-md cursor-pointer transition-colors hover:bg-opacity-80 ${getBgColor(alert.severity)}`}
            onClick={() => handleAlertClick(alert)}
          >
            <div className="mr-3 mt-1">
              {getAlertIcon(alert.type)}
            </div>
            <div>
              <p className="text-sm">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
      
      {alerts.length === 0 && (
        <p className="text-center text-gray-500 text-sm mt-4">
          No alerts at this time
        </p>
      )}
    </div>
  );
};

// Chat Panel Component
interface ChatPanelProps {
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      content: "Hello! How can I help you with your portfolio today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: "2",
      sender: "user",
      content: "Can you tell me about the Apollo Energy Loan covenant breach?",
      timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    },
    {
      id: "3",
      sender: "assistant",
      content: "The Apollo Energy Loan has a covenant breach related to their debt service coverage ratio which dropped below the required 1.2x to 0.95x due to unexpected operational expenses. A waiver request has been submitted by the borrower and is pending your review.",
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newUserMessage]);
    setInput("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        content: "I'm analyzing that information now. Let me check the details and get back to you with a recommendation.",
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-gray-200 flex flex-col z-40 shadow-xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-medium text-sm">AI</span>
          </div>
          <div>
            <h3 className="font-medium">Nítido Assistant</h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs sm:max-w-md rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs block mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200">
        <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
          <Button type="button" variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input 
            className="flex-1" 
            placeholder="Type your message..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

// Main Dashboard Page Component
const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // State hooks
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
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
    },
    {
      id: "5",
      name: "Abengoa Syndicated Loan",
      borrower: "Abengoa SA",
      outstanding: "€120,000,000",
      status: "alert"
    }
  ]);

  // Sample alerts data
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "a1",
      type: "document",
      message: "3 documents need review for Beta Real Estate",
      severity: "medium",
      dealId: "2"
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
      message: "Interest payment due tomorrow for Beta Real Estate",
      dealId: "2",
      severity: "low"
    },
    {
      id: "a4",
      type: "document",
      message: "Updated financial statements available for Outer Banks transaction",
      dealId: "4",
      severity: "medium"
    }
  ]);

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

  // Welcome message text
  const welcomeMessage = "I have reconciled your agenda from Outlook with the tasks extracted from your portfolio. Check the agenda and let me know how I can assist. There are various ongoing discussions that need your attention, particularly on the Abengoa and the Outer Banks transactions. I have prepared a summary with recommended actions and responses at the Nítido Chat.";

  return (
    <div className="flex flex-col h-screen bg-white">
      <AppHeader 
        onMenuToggle={handleMenuToggle} 
        onLogout={handleLogout} 
      />
      
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
