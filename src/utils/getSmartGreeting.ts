
interface SmartGreetingParams {
  userName: string;
  alerts: Array<{ severity: string }>;
  agendaInfo: string;
}

const getSmartGreeting = ({ userName, alerts, agendaInfo }: SmartGreetingParams): string => {
  const highPriorityAlerts = alerts.filter(a => a.severity === "high").length;
  
  if (highPriorityAlerts > 0) {
    return `Hi ${userName}, you have ${highPriorityAlerts} high-priority alerts that need your attention. Let me know if you need any help with those.`;
  }
  
  return `Welcome back ${userName}! ${agendaInfo}. How can I assist you today?`;
};

export default getSmartGreeting;
