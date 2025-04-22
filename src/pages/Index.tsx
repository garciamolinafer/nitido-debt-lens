
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, LayoutGrid, MessageSquare, Bot, Network, Settings } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import NavTile from "@/components/NavTile";

interface NavTileData {
  id: string;
  icon: LucideIcon;
  title: string;
  helper: string;
  hasBadge?: boolean;
}

const navTiles: NavTileData[] = [
  {
    id: "agenda",
    title: "Agenda",
    helper: "Scheduler of tasks integrated with your work and your team agenda with agentic and delegation functionalities.",
    icon: Calendar,
    hasBadge: true
  },
  {
    id: "dashboard",
    title: "Dashboard",
    helper: "Review your portfolio, monitor covenants, upload docs, interact with participants & access transactional apps.",
    icon: LayoutGrid
  },
  {
    id: "chats",
    title: "Nítido Chats",
    helper: "Browse open & past conversations, collaborate with your team – Nitidina summarises & can auto-reply.",
    icon: MessageSquare
  },
  {
    id: "assistant",
    title: "Nítido AI Assistant",
    helper: "Full ChatGPT-style hub with searchable history by topic, deal or date – tune capabilities & autonomy.",
    icon: Bot
  },
  {
    id: "agents",
    title: "Nítido AI Agents",
    helper: "Create agentic tasks, supervise pending actions and link AI agents across your team.",
    icon: Network
  },
  {
    id: "setup",
    title: "Setup",
    helper: "Configure platform, optimise AI, manage teammates, operational rules, languages, restrictions, etc.",
    icon: Settings
  }
];

const Index = () => {
  const navigate = useNavigate();
  const pendingAgenda = 2; // Dummy state for pending agenda items

  const handleTileClick = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div className="container max-w-7xl mx-auto p-6 min-h-screen">
      <header className="mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <img
            src="/lovable-uploads/photo-1581091226825-a6a2a5aee158"
            alt="Nitidina Assistant"
            className="w-12 h-12 rounded-full object-cover object-top border-2 border-primary/20"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">Nítido Command Center</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          AI-powered loan management platform for syndicated lending portfolios
        </p>
      </header>

      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ease-in-out"
        )}
      >
        {navTiles.map((tile) => (
          <NavTile
            key={tile.id}
            id={tile.id}
            icon={tile.icon}
            title={tile.title}
            helper={tile.helper}
            hasBadge={tile.id === "agenda" && pendingAgenda > 0}
            badgeCount={tile.id === "agenda" ? pendingAgenda : undefined}
            onClick={() => handleTileClick(tile.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
