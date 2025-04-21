
import React from "react";
import {
  Bell,
  LayoutGrid,
  MessageSquare,
  Bot,
  Network,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  collapsed: boolean;
  onNavClick: (id: string) => void;
}

const navButtons = [
  {
    id: "agenda",
    label: "Agenda",
    icon: Bell,
    tooltip:
      "Scheduler of tasks integrated with your work and team agenda, with agentic and delegation functionalities",
    hasBadge: true,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    tooltip: "Review your portfolio of transactions, monitor covenants, upload documentation, interact with participants, and access transactional apps",
    hasBadge: false,
    isActive: true,
  },
  {
    id: "chats",
    label: "Nítido Chats",
    icon: MessageSquare,
    tooltip: "Review open and historical conversations, interact with your team, and get continuous AI assistance with summaries, actions, and autonomous participation",
    hasBadge: false,
  },
  {
    id: "assistant",
    label: "Nítido AI Assistant",
    icon: Bot,
    tooltip: "Access all AI assistant chats, searchable by topic/deal/date, and configure the assistant's capabilities, limitations, and autonomy",
    hasBadge: false,
  },
  {
    id: "agents",
    label: "Nítido AI Agents",
    icon: Network,
    tooltip: "Generate agentic tasks, review pending supervision actions, and link AI agents with your team",
    hasBadge: false,
  },
  {
    id: "setup",
    label: "Setup",
    icon: Settings,
    tooltip: "Configure platform settings, optimize AI capabilities, manage users and guidelines, language preferences, and operational restrictions",
    hasBadge: false,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onNavClick }) => (
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

export default Sidebar;
