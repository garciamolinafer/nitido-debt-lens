
import { useState, useEffect, useRef } from "react";
import type { Deal, Alert } from "@/pages/dashboard/DashboardPage";

function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>();
  useEffect(() => { ref.current = value; });
  return ref.current;
}

function buildNitidinaMessage(deals: Deal[], alerts: Alert[], tasks: number) {
  const user = "Marina"; // TODO: pull from profile
  const hotAlerts = alerts.filter(a => a.severity !== "low");
  const hotDeals = [...new Set(hotAlerts.map(a => deals.find(d => d.id === a.dealId)?.name?.split(" ")[0]))]
    .filter(Boolean).slice(0, 2).join(" and ");
  
  return (
    `Welcome back ${user}. ${tasks ? `I've reconciled your Outlook agenda and found ${tasks} pending item${tasks > 1 ? "s" : ""}. ` : ""}`
    + (hotAlerts.length
      ? `There ${hotAlerts.length > 1 ? "are" : "is"} ${hotAlerts.length} ongoing discussion${hotAlerts.length > 1 ? "s" : ""}${hotDeals ? ` on ${hotDeals}` : ""} requiring attention. `
      : "Everything looks calm right now. ")
    + "You can find recommended next steps in Nítido Chat."
  );
}

export function useNitidina(deals: Deal[], alerts: Alert[], agendaPendingCount: number) {
  const [text, setText] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  
  const prevMsg = usePrevious(text);
  
  useEffect(() => {
    const msg = buildNitidinaMessage(deals, alerts, agendaPendingCount);
    setText(msg);
    if (prevMsg && prevMsg !== msg) setIsHidden(false);
  }, [deals, alerts, agendaPendingCount, prevMsg]);

  return {
    text,
    isHidden,
    setIsHidden
  };
}
