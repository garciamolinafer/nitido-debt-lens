
import { Wand2, FileText, AlertTriangle, CalendarDays } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Alert } from "@/types";

type Props = { alerts: Alert[] };

const optionSets: Record<Alert["type"], { label: string; action: string }[]> = {
  document: [
    { label: "Summarise & propose next steps", action: "summarise-docs" },
    { label: "Share docs with lenders", action: "share-docs" },
    { label: "Extract & file key data", action: "extract-docs" },
  ],
  covenant: [
    { label: "Draft breach / waiver notice", action: "draft-waiver" },
    { label: "Email lenders explanation", action: "email-lenders" },
    { label: "Run impact simulation", action: "simulate-impact" },
  ],
  payment: [
    { label: "Prepare interest notice", action: "draft-notice" },
    { label: "Confirm payment instructions", action: "confirm-pay" },
    { label: "Schedule auto-reminder", action: "schedule-reminder" },
  ],
};

const iconFor = (type: Alert["type"]) =>
  type === "document"
    ? FileText
    : type === "covenant"
    ? AlertTriangle
    : CalendarDays;

const AlertsPanel = ({ alerts }: Props) => (
  <aside className="w-72 border-l border-gray-200 bg-gray-50 p-4 flex flex-col">
    <h2 className="font-semibold text-lg mb-3">Alerts &amp; Tasks</h2>

    <ul className="space-y-2">
      {alerts.map((al) => {
        const Icon = iconFor(al.type);
        return (
          <li
            key={al.id}
            className="bg-white border border-gray-200 rounded p-3 flex items-start text-sm"
          >
            <Icon size={16} className="mt-0.5 mr-2 text-gray-600 shrink-0" />
            <span className="flex-1">{al.message}</span>

            {/* Agentic AI helper */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-2 text-gray-600 hover:text-black">
                  <Wand2 size={18} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="left">
                {optionSets[al.type].map((opt) => (
                  <DropdownMenuItem
                    key={opt.action}
                    onClick={() =>
                      console.log("Agentic option chosen:", opt.action, al.id)
                    }
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        );
      })}
    </ul>
  </aside>
);

export default AlertsPanel;
