
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Check, X, AlertCircle, ExternalLink } from "lucide-react";

interface IntegrationProps {
  id: string;
  name: string;
  description: string;
  status: "connected" | "disconnected";
  logo?: string;
  lastSyncTime?: string;
  requiresCredentials: boolean;
}

const IntegrationSettingsPage = () => {
  const [integrations, setIntegrations] = useState<IntegrationProps[]>([
    {
      id: "loaniq",
      name: "LoanIQ",
      description: "Connect to LoanIQ to sync loan data and push updates automatically.",
      status: "disconnected",
      requiresCredentials: true,
    },
    {
      id: "solvas",
      name: "Solvas",
      description: "Integrate with Solvas to manage covenant compliance and financial data.",
      status: "connected",
      lastSyncTime: "2 hours ago",
      requiresCredentials: true,
    },
    {
      id: "versana",
      name: "Versana",
      description: "Publish deal data to the Versana platform for market transparency.",
      status: "disconnected",
      requiresCredentials: true,
    },
    {
      id: "office365",
      name: "Office 365",
      description: "Connect to Microsoft Office 365 for email and calendar integration.",
      status: "connected", 
      lastSyncTime: "1 hour ago",
      requiresCredentials: false,
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      description: "Enable notifications and updates in Microsoft Teams channels.",
      status: "disconnected",
      requiresCredentials: false,
    },
    {
      id: "slack",
      name: "Slack",
      description: "Receive notifications and alerts in your Slack workspace.",
      status: "disconnected",
      requiresCredentials: true,
    },
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationProps | null>(null);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [showOAuthSheet, setShowOAuthSheet] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");

  const handleConnect = (integration: IntegrationProps) => {
    setSelectedIntegration(integration);
    
    if (integration.requiresCredentials) {
      setApiEndpoint("");
      setApiKey("");
      setApiSecret("");
      setShowConfigDialog(true);
    } else {
      // OAuth flow
      setShowOAuthSheet(true);
    }
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === integrationId
          ? { ...integration, status: "disconnected", lastSyncTime: undefined }
          : integration
      )
    );
    
    toast({
      title: "Integration disconnected",
      description: "The connection has been successfully removed.",
    });
  };

  const submitCredentials = () => {
    if (!selectedIntegration) return;
    
    setIsConnecting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsConnecting(false);
      setShowConfigDialog(false);
      
      setIntegrations(
        integrations.map((integration) =>
          integration.id === selectedIntegration.id
            ? { 
                ...integration, 
                status: "connected", 
                lastSyncTime: "Just now" 
              }
            : integration
        )
      );
      
      toast({
        title: "Integration connected",
        description: `${selectedIntegration.name} has been successfully connected.`,
      });
    }, 1500);
  };

  const completeOAuth = () => {
    if (!selectedIntegration) return;
    
    setShowOAuthSheet(false);
    
    setIntegrations(
      integrations.map((integration) =>
        integration.id === selectedIntegration.id
          ? { 
              ...integration, 
              status: "connected", 
              lastSyncTime: "Just now" 
            }
          : integration
      )
    );
    
    toast({
      title: "Integration connected",
      description: `${selectedIntegration.name} has been successfully connected.`,
    });
  };

  const testConnection = (integrationId: string) => {
    toast({
      title: "Connection test successful",
      description: "The integration is configured correctly and working.",
    });
  };

  return (
    <div className="container max-w-5xl py-8">
      <h1 className="text-3xl font-bold mb-2">Integration Settings</h1>
      <p className="text-gray-500 mb-8">
        Configure external system integrations. Enter API keys or enable services to allow Nítido to communicate with those platforms.
      </p>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="data">Data Sources</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {integrations.map((integration) => (
            <IntegrationCard 
              key={integration.id}
              integration={integration}
              onConnect={() => handleConnect(integration)}
              onDisconnect={() => handleDisconnect(integration.id)}
              onTest={() => testConnection(integration.id)}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="data" className="space-y-6">
          {integrations
            .filter(i => ["loaniq", "solvas", "versana"].includes(i.id))
            .map((integration) => (
              <IntegrationCard 
                key={integration.id}
                integration={integration}
                onConnect={() => handleConnect(integration)}
                onDisconnect={() => handleDisconnect(integration.id)}
                onTest={() => testConnection(integration.id)}
              />
          ))}
        </TabsContent>
        
        <TabsContent value="communication" className="space-y-6">
          {integrations
            .filter(i => ["office365", "teams", "slack"].includes(i.id))
            .map((integration) => (
              <IntegrationCard 
                key={integration.id}
                integration={integration}
                onConnect={() => handleConnect(integration)}
                onDisconnect={() => handleDisconnect(integration.id)}
                onTest={() => testConnection(integration.id)}
              />
          ))}
        </TabsContent>
      </Tabs>

      {/* Credentials Dialog for API-based integrations */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Enter the required credentials to establish connection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <FormLabel htmlFor="endpoint">API Endpoint</FormLabel>
              <Input
                id="endpoint"
                placeholder="https://api.example.com"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <FormLabel htmlFor="key">API Key</FormLabel>
              <Input
                id="key"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <FormLabel htmlFor="secret">API Secret</FormLabel>
              <Input
                id="secret"
                type="password"
                placeholder="••••••••••••••••"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setShowConfigDialog(false)}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => testConnection(selectedIntegration?.id || "")}>
                Test Connection
              </Button>
              <Button type="submit" onClick={submitCredentials} disabled={isConnecting}>
                {isConnecting ? "Connecting..." : "Connect"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* OAuth Sheet for OAuth-based integrations */}
      <Sheet open={showOAuthSheet} onOpenChange={setShowOAuthSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Connect to {selectedIntegration?.name}</SheetTitle>
            <SheetDescription>
              You'll be redirected to {selectedIntegration?.name} to authorize Nítido.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-6 py-8">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-5 w-5" />
              <p>Nítido will request access to:</p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-sm pl-5">
              <li>Read your profile information</li>
              <li>Send emails on your behalf (if applicable)</li>
              <li>Access your calendar (if applicable)</li>
              <li>Access your files (if applicable)</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              You can revoke access at any time from your {selectedIntegration?.name} account settings.
            </p>
            <div className="flex flex-col gap-3 mt-4">
              <Button onClick={completeOAuth} className="w-full">
                Continue to {selectedIntegration?.name} <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => setShowOAuthSheet(false)} className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const IntegrationCard = ({ 
  integration, 
  onConnect, 
  onDisconnect, 
  onTest 
}: { 
  integration: IntegrationProps;
  onConnect: () => void;
  onDisconnect: () => void;
  onTest: () => void;
}) => {
  const { name, description, status, lastSyncTime } = integration;
  
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {status === "connected" ? (
              <span className="flex items-center text-sm text-green-600 font-medium">
                <Check className="h-4 w-4 mr-1" />
                Connected
              </span>
            ) : (
              <span className="flex items-center text-sm text-gray-500 font-medium">
                <X className="h-4 w-4 mr-1" />
                Not Connected
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            {status === "connected" && (
              <p className="text-sm text-gray-500">Last sync: {lastSyncTime}</p>
            )}
          </div>
          <div className="flex gap-3">
            {status === "connected" ? (
              <>
                <Button variant="outline" size="sm" onClick={onTest}>
                  Test Connection
                </Button>
                <Button variant="outline" size="sm" onClick={onDisconnect}>
                  Disconnect
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={onConnect}>
                Connect
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationSettingsPage;
