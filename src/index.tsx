import { useEffect, useState } from "react";
import {
  Calendar,
  LayoutGrid,
  MessageSquare,
  Bot,
  Network,
  Settings,
  Bell
} from "lucide-react";

import AppHeader from "@/components/layout/AppHeader";
import ChatPanel from "@/components/chat/ChatPanel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "@/index.css";                                     // tailwind base
import { useAuth } from "@/App";      // already in project – used for username

/* Helper: returns Nitidina’s smart greeting */
const getSmartGreeting = (name: string) =>
  `Welcome back ${name}. We have a busy day ahead. I have reconciled your agenda from Outlook with the tasks extracted from your portfolio. Check the agenda and let me know how I can assist.

There are various ongoing discussions that need your attention, particularly on the Abengoa and the Outer Banks transactions. I have prepared a summary with recommended actions and responses in the Nítido Chat.`;

// ---------- Types ----------
type NavItem = {
  id: string;
  label: string;
  subtitle: string;
  Icon: React.ElementType;
  hasBadge?: boolean;
};

// ---------- Smart Greeting ----------
const greeting = "Welcome back Marina …";

// ---------- Component ----------
export default function IndexPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [greetingText, setGreetingText] = useState("");
  const user = { firstName: "Marina" };                   // 👉 replace with real user hook later
  const { currentUser } = useAuth();          // may be null on first render
  const userName = currentUser?.displayName?.split(" ")[0] || "User";
  const greeting = getSmartGreeting(userName);

  useEffect(() => {
    setGreetingText(getSmartGreeting(user.firstName));
  }, []);

  const navItems: NavItem[] = [
    {
      id: "agenda",
      label: "Agenda",
      subtitle: "Scheduler integrated with Outlook / team calendars – agentic delegation enabled.",
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
      label: "Nítido Chats",
      subtitle: "Open & historic conversations, AI‑assisted summaries & suggested replies.",
      Icon: MessageSquare
    },
    {
      id: "assistant",
      label: "Nítido AI Assistant",
      subtitle: "Full ChatGPT‑style page. Searchable by topic, deal or date; configure autonomy.",
      Icon: Bot
    },
    {
      id: "agents",
      label: "Nítido AI Agents",
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

  // ---------- JSX ----------
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* global header */}
      <AppHeader />

      {/* body */}
      <div className="flex flex-1 overflow-hidden">
        {/* main column */}
        <div className="flex flex-col flex-1 p-6 overflow-auto">
          {/* Nitidina helper banner */}
          {!chatOpen && (
            <Card className="mb-6 p-4 border border-gray-200 shadow-sm bg-gray-50 whitespace-pre-line">
              <div className="flex">
                <Bot className="w-6 h-6 mr-2 shrink-0" />
                <p className="text-sm leading-relaxed">{greeting}</p>
              </div>
            </Card>
          )}

          {/* navigation grid OR mini‑bar */}
          {chatOpen ? (
            <div className="flex space-x-2 mb-4">
              {navItems.map(({ id, Icon, hasBadge }) => (
                <Button
                  key={id}
                  variant="ghost"
                  size="icon"
                  onClick={() => console.log("navigate ->", id)}
                >
                  <Icon className="w-5 h-5" />
                  {hasBadge && (
                    <Bell className="w-3 h-3 text-red-600 absolute top-1 right-1" />
                  )}
                </Button>
              ))}
            </div>
          ) : (
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
          )}
        </div>

        {/* persistent chat panel (slides in/out) */}
        <ChatPanel
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          initialGreeting={greeting}
        />
      </div>
    </div>
  );
}
