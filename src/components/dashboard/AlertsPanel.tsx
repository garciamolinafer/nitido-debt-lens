
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

type AlertsPanelProps = {
  alerts: Alert[];
};

const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  const navigate = useNavigate();
  
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
    <div className="w-80 border-l border-gray-200 overflow-y-auto bg-gray-50 p-4">
      <h2 className="text-lg font-bold mb-4">Alerts & Tasks</h2>
      
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`group flex items-start justify-between p-3 rounded-md border ${getBgColor(alert.severity)}`}
          >
            <div className="flex items-start flex-1" onClick={() => handleAlertClick(alert)}>
              <div className="mr-3 mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div>
                <p className="text-sm">{alert.message}</p>
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
                {getAgenticActions(alert).map((action) => (
                  <DropdownMenuItem 
                    key={action}
                    onClick={() => alert(`🔧 (prototype) Nitidina will: "${action}" for alert ${alert.id}`)}
                  >
                    {action}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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

export default AlertsPanel;
