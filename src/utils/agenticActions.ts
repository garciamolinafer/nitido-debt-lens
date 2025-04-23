
import { Alert } from "@/pages/dashboard/DashboardPage";

/** Returns the context-specific actions Nitidina can offer on an Alert row */
export function getAgenticActions(alert: Alert) {
  switch (alert.type) {
    case "document":
      return [
        "Summarise the documents & propose actions",
        "Share documents with all lenders", 
        "Review & extract key data to the deal site",
        "Open a chat thread for outstanding requests"
      ];
    case "covenant":
      return [
        "Draft waiver / amendment letter",
        "Generate breach summary & recommendations",
        "Jump to covenant detail (current behaviour)",
        "Ask Nitidina for legal precedent"
      ];
    case "payment":
    default:
      return [
        "Draft payment notice to borrower/lenders",
        "Schedule reminder in Agenda",
        "Generate short-term cash forecast",
        "Notify borrower of upcoming payment"
      ];
  }
}
