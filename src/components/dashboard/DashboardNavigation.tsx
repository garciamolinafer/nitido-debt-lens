
import { 
  Calendar, 
  LayoutGrid, 
  MessageSquare, 
  Bot,
  Network, 
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type NavigationButton = {
  id: string;
  label: string;
  icon: any;
  tooltip: string;
  hasBadge: boolean;
  isActive?: boolean;
};

type Props = {
  agendaPending: number;
  onNavigate: (id: string) => void;
};

export function DashboardNavigation({ agendaPending, onNavigate }: Props) {
  const navigationButtons: NavigationButton[] = [
    {
      id: "agenda",
      label: "Agenda",
      icon: Calendar,
      tooltip: "Scheduler of tasks integrated with your work and team agenda, with agentic and delegation functionalities",
      hasBadge: !!agendaPending,
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

  return (
    <div className="py-4 px-3 flex-1">
      <div className="flex flex-col space-y-4">
        <TooltipProvider>
          {navigationButtons.map((button) => (
            <Tooltip key={button.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={button.isActive ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => onNavigate(button.id)}
                >
                  <button.icon className="mr-2" size={20} />
                  <span>{button.label}</span>
                  {button.hasBadge && (
                    <Badge variant="destructive" className="ml-auto rounded-full h-5 w-5 p-0 flex items-center justify-center">
                      {agendaPending}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" align="center" className="max-w-xs">
                {button.tooltip}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}
