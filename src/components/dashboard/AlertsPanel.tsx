
import React from "react";
import { useNavigate } from "react-router-dom";

export type Alert = {
  id: string;
  type: "document" | "covenant" | "payment";
  message: string;
  severity: "high" | "medium" | "low";
  dealId?: string;
};

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const navigate = useNavigate();
  
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'document':
        return <div className="h-3 w-3 bg-blue-500 rounded-full"></div>;
      case 'covenant':
        return <div className="h-3 w-3 bg-red-500 rounded-full"></div>;
      case 'payment':
        return <div className="h-3 w-3 bg-amber-500 rounded-full"></div>;
      default:
        return <div className="h-3 w-3 bg-gray-500 rounded-full"></div>;
    }
  };

  const getBgColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return "bg-red-50";
      case 'medium':
        return "bg-amber-50";
      case 'low':
        return "bg-blue-50";
      default:
        return "bg-gray-50";
    }
  };
  
  const handleAlertClick = (alert: Alert) => {
    if (alert.dealId) {
      navigate(`/deals/${alert.dealId}`);
    }
  };

  return (
    <div className="w-72 border-l border-gray-200 overflow-y-auto bg-gray-50 p-4">
      <h2 className="text-lg font-bold mb-4">Alerts</h2>
      
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start p-3 rounded-md cursor-pointer transition-colors hover:bg-opacity-80 ${getBgColor(alert.severity)}`}
            onClick={() => handleAlertClick(alert)}
          >
            <div className="mr-3 mt-1">
              {getAlertIcon(alert.type)}
            </div>
            <div>
              <p className="text-sm">{alert.message}</p>
            </div>
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
