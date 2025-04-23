import { AlertTriangle, FileText, Calendar, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Alert } from "@/pages/dashboard/DashboardPage";
import { getAgenticActions } from "@/utils/agenticActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  alerts: Alert[];
}

const AlertsPanel = ({ alerts }: Props) => {
  const navigate = useNavigate();

  const bgForSeverity = {
    high: "border-red-300 bg-red-50",
    medium: "border-yellow-300 bg-yellow-50",
    low: "border-sky-300 bg-sky-50",
  } as const;
  
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'covenant':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'payment':
        return <Calendar className="h-5 w-5 text-amber-500" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getBgColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return "bg-red-50 border-red-300";
      case 'medium':
        return "bg-amber-50 border-amber-300";
      case 'low':
        return "bg-blue-50 border-blue-300";
      default:
        return "bg-gray-50 border-gray-300";
    }
  };
  
  const handleAlertClick = (alert: Alert) => {
    if (alert.dealId) {
      if (alert.type === 'covenant') {
        navigate(`/deals/${alert.dealId}/monitoring?tab=covenants`);
      } else if (alert.type === 'document') {
        navigate(`/deals/${alert.dealId}/monitoring?tab=documents`);
      } else if (alert.type === 'payment') {
        navigate(`/deals/${alert.dealId}/loan-admin`);
      } else {
        navigate(`/deals/${alert.dealId}`);
      }
    }
  };

  return (
    <aside className="w-64 bg-gray-50 border-l border-gray-200 px-4 py-6 space-y-3">
      <h2 className="font-semibold text-gray-700 mb-2">Alerts & Tasks</h2>

      {alerts.map((a) => (
        <div
          key={a.id}
          className={`group flex items-start justify-between p-3 rounded-md border ${bgForSeverity[a.severity]}`}
        >
          <div className="flex items-start flex-1" onClick={() => handleAlertClick(a)}>
            <div className="mr-3 mt-0.5">
              {getAlertIcon(a.type)}
            </div>
            <div>
              <p className="text-sm">{a.message}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Sparkles 
                size={18} 
                className="text-indigo-500 cursor-pointer opacity-0 group-hover:opacity-100 transition ml-2 shrink-0"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {getAgenticActions(a).map((label) => (
                <DropdownMenuItem
                  key={label}
                  onClick={() => alert(`🔧 (prototype) Nitidina will: "${label}" for alert ${a.id}`)}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
      
      {alerts.length === 0 && (
        <p className="text-center text-gray-500 text-sm mt-4">
          No alerts at this time
        </p>
      )}
    </aside>
  );
};

export default AlertsPanel;
