
import { useState } from "react";
import { Bell, FileText, AlertTriangle, CalendarDays, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ActionChat from "./ActionChat";
import { useNavigate } from "react-router-dom";

export type Alert = {
  id: string;
  type: "document" | "covenant" | "payment";
  message: string;
  dealId?: string;
  severity: "high" | "medium" | "low";
};

interface Props {
  alerts: Alert[];
}

const iconFor = (t: Alert["type"]) =>
  t === "document" ? FileText
  : t === "covenant" ? AlertTriangle
  : CalendarDays;

const AlertsPanel = ({ alerts }: Props) => {
  const [activeAlert, setActiveAlert] = useState<Alert | null>(null);
  const navigate = useNavigate();

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
    <>
      <div className="w-64 border-l border-gray-200 bg-[#f4f8f8] flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center space-x-2">
          <Bell size={18} />
          <span className="font-semibold">Alerts&nbsp;&amp;&nbsp;Tasks</span>
        </div>

        <div className="flex-1 overflow-auto">
          {alerts.map((a) => {
            const Icon = iconFor(a.type);
            return (
              <Card
                key={a.id}
                className="m-3 flex items-start cursor-pointer hover:bg-gray-50 transition"
                onClick={() => handleAlertClick(a)}
              >
                <CardContent className="p-3 flex w-full">
                  <Icon
                    size={16}
                    className={`mt-0.5 mr-2 flex-shrink-0 ${
                      a.severity === "high"
                        ? "text-red-600"
                        : a.severity === "medium"
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  />

                  <span className="text-sm flex-1">{a.message}</span>

                  <Zap
                    size={16}
                    className="text-primary cursor-pointer ml-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveAlert(a);
                    }}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {activeAlert && (
        <ActionChat
          alert={activeAlert}
          onClose={() => setActiveAlert(null)}
        />
      )}
    </>
  );
};

export default AlertsPanel;
