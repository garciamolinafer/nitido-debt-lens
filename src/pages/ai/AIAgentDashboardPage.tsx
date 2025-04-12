
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Settings, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Calendar,
  Mail,
  FileCheck,
  UserPlus,
  Clock,
  RefreshCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

// Types for the agent bots
interface AgentBot {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
  category: "communication" | "automation" | "monitoring";
  nextRun?: string;
  config?: {
    schedule: string;
    template?: string;
    scope?: string[];
    conditions?: {
      [key: string]: boolean;
    };
    requiresApproval: boolean;
  };
}

// Types for agent activities
interface AgentActivity {
  id: string;
  botId: string;
  botName: string;
  timestamp: Date;
  action: string;
  status: "success" | "error" | "warning" | "pending";
  details?: string;
  dealId?: string;
}

const AIAgentDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [configBot, setConfigBot] = useState<AgentBot | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  
  // Sample agent bots data
  const [bots, setBots] = useState<AgentBot[]>([
    {
      id: "bot1",
      name: "Audit Certificate Generator",
      description: "Automatically generate and send quarterly audit certificates to lenders",
      enabled: true,
      icon: <FileCheck />,
      category: "automation",
      nextRun: "Mar 31, 2025",
      config: {
        schedule: "quarterly",
        template: "Dear {{lender}},\n\nPlease find attached the audit certificate for {{quarter}} {{year}}.\n\nRegards,\nLoan Admin Team",
        scope: ["all"],
        conditions: {
          sendOnlyIfDataAvailable: true,
          notifyOnError: true
        },
        requiresApproval: true
      }
    },
    {
      id: "bot2",
      name: "User Provisioning Bot",
      description: "Auto-create user accounts from requests",
      enabled: false,
      icon: <UserPlus />,
      category: "automation",
      config: {
        schedule: "daily",
        scope: ["admin"],
        conditions: {
          notifyOnError: true
        },
        requiresApproval: true
      }
    },
    {
      id: "bot3",
      name: "Meeting Scheduler",
      description: "Schedule syndicate meetings based on members' calendars",
      enabled: true,
      icon: <Calendar />,
      category: "communication",
      nextRun: "Apr 10, 2025",
      config: {
        schedule: "monthly",
        scope: ["all"],
        requiresApproval: false
      }
    },
    {
      id: "bot4",
      name: "Notice Distributor",
      description: "Send out routine notices (rate sets, rollovers) to all participants",
      enabled: true,
      icon: <Mail />,
      category: "communication",
      nextRun: "Tomorrow",
      config: {
        schedule: "daily",
        template: "Dear {{participant}},\n\nPlease note the rate has been set at {{rate}}% for the period {{startDate}} to {{endDate}}.\n\nRegards,\nLoan Admin Team",
        scope: ["all"],
        requiresApproval: true
      }
    },
    {
      id: "bot5",
      name: "Covenant Check Bot",
      description: "Continuously monitor covenants across all deals",
      enabled: true,
      icon: <AlertTriangle />,
      category: "monitoring",
      nextRun: "Continuous",
      config: {
        schedule: "daily",
        scope: ["all"],
        conditions: {
          notifyOnBreach: true
        },
        requiresApproval: false
      }
    }
  ]);
  
  // Sample activity data
  const [activities] = useState<AgentActivity[]>([
    {
      id: "act1",
      botId: "bot1",
      botName: "Audit Certificate Generator",
      timestamp: new Date(2024, 11, 31, 18, 5),
      action: "Emailed Q4 2024 certificates to all lenders",
      status: "success"
    },
    {
      id: "act2",
      botId: "bot5",
      botName: "Covenant Check Bot",
      timestamp: new Date(2024, 11, 31, 18, 0),
      action: "Checked 5 deals, flagged 1 breach (Deal Apollo)",
      status: "warning",
      dealId: "1"
    },
    {
      id: "act3",
      botId: "bot3",
      botName: "Meeting Scheduler",
      timestamp: new Date(2024, 11, 15, 12, 0),
      action: "Proposed meeting dates to participants",
      status: "pending",
      details: "Waiting for responses from 3 participants"
    },
    {
      id: "act4",
      botId: "bot4",
      botName: "Notice Distributor",
      timestamp: new Date(2025, 0, 1, 9, 0),
      action: "Sent rate reset notices to 12 lenders (Deals A, B)",
      status: "success"
    },
    {
      id: "act5",
      botId: "bot2",
      botName: "User Provisioning Bot",
      timestamp: new Date(2025, 1, 1, 12, 0),
      action: "Error: unable to create account for user jdoe",
      status: "error",
      details: "Email already exists in the system"
    }
  ]);
  
  const toggleBot = (botId: string) => {
    setBots(prevBots => 
      prevBots.map(bot => 
        bot.id === botId ? { ...bot, enabled: !bot.enabled } : bot
      )
    );
    
    const bot = bots.find(b => b.id === botId);
    if (bot) {
      toast({
        title: `${bot.name} ${!bot.enabled ? 'enabled' : 'disabled'}`,
        description: !bot.enabled 
          ? `The bot will now run according to its schedule.` 
          : `The bot will no longer run automatically.`,
        duration: 3000,
      });
    }
  };
  
  const openBotConfig = (bot: AgentBot) => {
    setConfigBot({...bot});
    setShowConfig(true);
  };
  
  const saveBotConfig = () => {
    if (!configBot) return;
    
    setBots(prevBots =>
      prevBots.map(bot =>
        bot.id === configBot.id ? configBot : bot
      )
    );
    
    setShowConfig(false);
    toast({
      title: "Configuration saved",
      description: `${configBot.name} settings have been updated.`,
      duration: 3000,
    });
  };
  
  const manuallyRunBot = (botId: string) => {
    const bot = bots.find(b => b.id === botId);
    if (bot) {
      toast({
        title: `Running ${bot.name}`,
        description: "The bot task is being executed manually.",
        duration: 3000,
      });
    }
  };
  
  const goToActivityDetail = (activity: AgentActivity) => {
    if (activity.dealId) {
      // Navigate to deal page if activity is related to a specific deal
      navigate(`/deals/${activity.dealId}`);
    } else {
      // Show toast with activity details
      toast({
        title: `${activity.botName} - ${new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        }).format(activity.timestamp)}`,
        description: `${activity.action}${activity.details ? `\n${activity.details}` : ''}`,
        duration: 5000,
      });
    }
  };

  const filteredBots = bots.filter(bot => 
    activeTab === "all" || bot.category === activeTab
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-2" onClick={() => navigate("/dashboard")}>
            <ChevronLeft className="h-5 w-5" />
            <span className="ml-1">Back to Dashboard</span>
          </Button>
          <h1 className="text-2xl font-semibold">AI Agent Dashboard</h1>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Agents</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Available Agent Bots 
                    <span className="ml-2 text-sm text-gray-500 font-normal">
                      ({filteredBots.filter(bot => bot.enabled).length}/{filteredBots.length} Active)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredBots.map(bot => (
                      <div 
                        key={bot.id} 
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          bot.enabled ? "border-gray-200" : "border-gray-100 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`p-2 rounded-lg ${
                            bot.enabled ? "bg-gray-100" : "bg-gray-200"
                          } mr-4`}>
                            {bot.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{bot.name}</h3>
                            <p className="text-sm text-gray-500">{bot.description}</p>
                            {bot.nextRun && bot.enabled && (
                              <p className="text-xs text-gray-500 mt-1 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Next run: {bot.nextRun}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => manuallyRunBot(bot.id)}
                            disabled={!bot.enabled}
                            className="mr-2"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openBotConfig(bot)}
                            className="mr-2"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Switch 
                            checked={bot.enabled} 
                            onCheckedChange={() => toggleBot(bot.id)} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity Log & Task Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-8">
                    <h3 className="text-sm font-medium mb-2">Upcoming Scheduled Tasks</h3>
                    <div className="space-y-2">
                      {bots
                        .filter(bot => bot.enabled && bot.nextRun)
                        .map(bot => (
                          <div 
                            key={`upcoming-${bot.id}`}
                            className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50"
                          >
                            <div className="flex items-center">
                              <div className="p-1 rounded-lg bg-gray-200 mr-3">
                                {bot.icon}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{bot.name}</p>
                                <p className="text-xs text-gray-500">
                                  {bot.nextRun === "Continuous" 
                                    ? "Running continuously" 
                                    : `Next run: ${bot.nextRun}`}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <RefreshCcw className="h-3 w-3 mr-1" />
                              Refresh
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
                    <div className="space-y-3">
                      {activities
                        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                        .map(activity => (
                          <div 
                            key={activity.id}
                            className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => goToActivityDetail(activity)}
                          >
                            <div className="mt-0.5 mr-3">
                              {activity.status === "success" && (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                              {activity.status === "warning" && (
                                <AlertTriangle className="h-5 w-5 text-amber-500" />
                              )}
                              {activity.status === "error" && (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                              {activity.status === "pending" && (
                                <Clock className="h-5 w-5 text-blue-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium">{activity.botName}</p>
                                <p className="text-xs text-gray-500">
                                  {new Intl.DateTimeFormat('en-US', {
                                    dateStyle: 'short',
                                    timeStyle: 'short'
                                  }).format(activity.timestamp)}
                                </p>
                              </div>
                              <p className="text-sm">{activity.action}</p>
                              {activity.details && (
                                <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                              )}
                              {activity.dealId && (
                                <Badge variant="outline" className="mt-1">
                                  Deal {activity.dealId}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Bot Configuration Dialog */}
      <Dialog open={showConfig} onOpenChange={setShowConfig}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configure {configBot?.name}</DialogTitle>
            <DialogDescription>
              Adjust settings for how this agent bot behaves
            </DialogDescription>
          </DialogHeader>
          
          {configBot && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Schedule</Label>
                <Select 
                  value={configBot.config?.schedule || "daily"}
                  onValueChange={(val) => setConfigBot({
                    ...configBot,
                    config: { ...configBot.config!, schedule: val }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Active Scope</Label>
                <Select 
                  value={configBot.config?.scope?.[0] || "all"}
                  onValueChange={(val) => setConfigBot({
                    ...configBot,
                    config: { ...configBot.config!, scope: [val] }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Deals</SelectItem>
                    <SelectItem value="active">Active Deals Only</SelectItem>
                    <SelectItem value="specific">Specific Deals</SelectItem>
                    <SelectItem value="admin">Admin Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {configBot.config?.template && (
                <div className="space-y-2">
                  <Label>Template</Label>
                  <Textarea 
                    value={configBot.config.template}
                    onChange={(e) => setConfigBot({
                      ...configBot,
                      config: { ...configBot.config!, template: e.target.value }
                    })}
                    rows={5}
                    placeholder="Template content with variables like {{variable}}"
                  />
                  <p className="text-xs text-gray-500">
                    Use variables like {{lender}}, {{date}}, etc. that will be replaced with actual values.
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Switch 
                    checked={configBot.config?.requiresApproval || false}
                    onCheckedChange={(checked) => setConfigBot({
                      ...configBot,
                      config: { ...configBot.config!, requiresApproval: checked }
                    })}
                  />
                  <span>Require approval before actions</span>
                </Label>
                <p className="text-xs text-gray-500 pl-11">
                  When enabled, the bot will prepare tasks but wait for user approval before executing them.
                </p>
              </div>
              
              {configBot.config?.conditions && Object.keys(configBot.config.conditions).length > 0 && (
                <div className="space-y-2">
                  <Label>Conditions</Label>
                  <div className="pl-1 space-y-2">
                    {Object.entries(configBot.config.conditions).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Switch 
                          checked={value}
                          onCheckedChange={(checked) => {
                            const updatedConditions = { 
                              ...configBot.config!.conditions, 
                              [key]: checked 
                            };
                            setConfigBot({
                              ...configBot,
                              config: { ...configBot.config!, conditions: updatedConditions }
                            });
                          }}
                        />
                        <span className="text-sm">
                          {key === "notifyOnError" && "Notify on error"}
                          {key === "sendOnlyIfDataAvailable" && "Send only if data is available"}
                          {key === "notifyOnBreach" && "Notify on covenant breach"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowConfig(false)}>Cancel</Button>
                <Button onClick={saveBotConfig}>Save Configuration</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIAgentDashboardPage;
