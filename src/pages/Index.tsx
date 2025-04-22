
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, LayoutGrid, MessageSquare, Bot, Network, Settings } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import NavTile from "@/components/NavTile";
import NitidinaPanel from "@/components/NitidinaPanel";

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
  // Added state for Nitidina panel
  const [nitidinaOpen, setNitidinaOpen] = useState(true);

  const pendingAgenda = 2; // Dummy state for pending agenda items

  const handleTileClick = (id: string) => {
    navigate(`/${id}`);
  };

  // Callback for closing Nitidina panel
  const handleNitidinaClose = () => {
    setNitidinaOpen(false);
  };

  // Optionally, allow user to reopen Nitidina if it's closed (not required, but adds UX)
  // Uncomment below to provide a button:
  // const handleNitidinaOpen = () => setNitidinaOpen(true);

  return (
    <div className="container max-w-7xl mx-auto p-6 min-h-screen relative">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Nítido Command Center</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          AI-powered loan management platform for syndicated lending portfolios
        </p>
      </header>

      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ease-in-out",
          nitidinaOpen ? "sm:mr-96" : "" // Add right margin if Nitidina is open for overlap on desktop
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

      {nitidinaOpen && (
        <NitidinaPanel 
          isOpen={nitidinaOpen}
          onToggle={handleNitidinaClose}
          showCloseButton={true}
        />
      )}

      {/* Optional reopen button: */}
      {/* {!nitidinaOpen && (
        <button onClick={handleNitidinaOpen} className="fixed bottom-6 right-6 bg-yellow-500 text-white rounded px-4 py-2 shadow-lg z-50">Open Nitidina</button>
      )} */}
    </div>
  );
};

export default Index;
