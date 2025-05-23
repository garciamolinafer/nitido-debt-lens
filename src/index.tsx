
import { useState } from "react";
import {
  Calendar,
  LayoutGrid,
  MessageSquare,
  Bot,
  Network,
  Settings,
  Bell
} from "lucide-react";
import { Link } from "react-router-dom"; // Added for internal routing

import AppHeader from "@/components/layout/AppHeader";
import ChatPanel from "@/components/chat/ChatPanel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "@/index.css";
import { useAuth } from "@/App";

/* Helper: returns Nitidina's smart greeting */
const getSmartGreeting = (name: string) => (
  <>
    Welcome back {name}. We have a busy day ahead.<br /><br />
    I have reconciled your agenda from Outlook with the tasks extracted from your portfolio. Check the agenda{" "}
    <Link to="/agenda" className="underline text-primary hover:text-primary/80">
      here
    </Link>
    {" "}and let me know how can I assist.<br />
    There are various ongoing discussions that need your attention, particularly on the Abengoa and the Outer Banks transactions. I have prepared a summary with recommended actions and responses at the Nítido Chat{" "}
    <Link to="/chats" className="underline text-primary hover:text-primary/80">
      here
    </Link>.
  </>
);

// ---------- Types ----------
type NavItem = {
  id: string;
  label: string;
  subtitle: string;
  Icon: React.ElementType;
  hasBadge?: boolean;
};

// ---------- Component ----------
function IndexPage() {
  const auth = useAuth();
  
  // Get user name from auth context
  const user = { firstName: "Marina" };  // Hardcoded for now
  const userName = auth.isAuthenticated ? (user.firstName || "User") : "User";
  const greeting = getSmartGreeting(userName);

  const navItems: NavItem[] = [
    {
      id: "agenda",
      label: "Agenda",
      subtitle: "Scheduler integrated with Outlook / team calendars – agentic delegation enabled.",
      Icon: Calendar,
      hasBadge: true
    },
    {
      id: "dashboard",
      label: "Dashboard",
      subtitle: "Review your portfolio, monitor covenants & upload docs.",
      Icon: LayoutGrid
    },
    {
      id: "chats",
      label: "Nítido Chats",
      subtitle: "Open & historic conversations, AI‑assisted summaries & suggested replies.",
      Icon: MessageSquare
    },
    {
      id: "assistant",
      label: "Nítido AI Assistant",
      subtitle: "Full ChatGPT‑style page. Searchable by topic, deal or date; configure autonomy.",
      Icon: Bot
    },
    {
      id: "agents",
      label: "Nítido AI Agents",
      subtitle: "Generate agentic tasks, review pending approvals & link agents with teammates.",
      Icon: Network
    },
    {
      id: "setup",
      label: "Setup",
      subtitle: "Platform settings, AI optimisation, team & language preferences, guard‑rails.",
      Icon: Settings
    }
  ];

  // Set initial state of chatOpen to true
  const [chatOpen, setChatOpen] = useState(true);

  // ---------- JSX ----------
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden mb-16"> {/* Added margin bottom to prevent footer overlap */}
        <div className="flex flex-col flex-1 p-6 overflow-auto">
          <Card className="mb-6 p-4 border border-gray-200 shadow-sm bg-gray-50 whitespace-pre-line">
            <div className="flex">
              <Bot className="w-6 h-6 mr-2 shrink-0" />
              <div className="text-sm leading-relaxed">{greeting}</div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {navItems.map(({ id, label, subtitle, Icon, hasBadge }) => (
              <Card
                key={id}
                className="p-6 cursor-pointer hover:shadow-md transition"
                onClick={() => console.log("navigate ->", id)}
              >
                <div className="flex items-start">
                  <Icon className="w-6 h-6 mr-3" />
                  <div className="flex-1">
                    <h2 className="text-lg font-bold mb-1 flex items-center">
                      {label}
                      {hasBadge && (
                        <Bell className="w-4 h-4 text-red-600 ml-2" />
                      )}
                    </h2>
                    <p className="text-sm text-gray-600">{subtitle}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Nitidina panel */}
        <ChatPanel
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          initialGreeting={typeof greeting === "string" ? greeting : ""}
        />
      </div>
    </div>
  );
}

export default IndexPage;
