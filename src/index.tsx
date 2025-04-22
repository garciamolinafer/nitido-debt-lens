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

// ---------- Types ----------
type NavItem = {
  id: string;
  label: string;
  subtitle: string;
  Icon: React.ElementType;
  hasBadge?: boolean;
};

// ---------- Smart Greeting ----------
const getSmartGreeting = (firstName: string) => {
  const h = new Date().getHours();
  const part =
    h < 12 ? "morning" : h < 18 ? "afternoon" : "evening";

  return (
    `Good ${part}, ${firstName}. ` +
    "I have reconciled your Outlook agenda with the tasks extracted from your portfolio. " +
    "Check the agenda and let me know how I can assist.\n\n" +
    "⚡ There are ongoing discussions that need your attention, particularly on the Abengoa and Outer Banks transactions. " +
    "I've prepared a summary with recommended actions and responses – open **Nítido Chat** when you're ready."
  );
};

import { getSmartGreeting } from "@/utils/smartGreeting";   // helper that returns Marina’s personalised text

const greeting = getSmartGreeting(user.firstName);   // will be "Welcome back Marina …"

// ---------- Component ----------
export default function IndexPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [greetingText, setGreetingText] = useState("");
  const user = { firstName: "Marina" };                   // 👉 replace with real user hook later

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
            /* collapsed icon strip */
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
            /* full tile grid */
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
