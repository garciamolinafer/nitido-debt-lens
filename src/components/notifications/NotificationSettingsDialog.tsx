
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export interface NotificationSetting {
  id: string;
  name: string;
  description: string;
  enableNotification: boolean;
  enableAIHandling: boolean;
}

export const NotificationSettingsDialog = ({ 
  open, 
  onClose 
}: { 
  open: boolean;
  onClose: () => void;
}) => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "document_upload",
      name: "Document uploads",
      description: "Get notified when new documents are uploaded",
      enableNotification: true,
      enableAIHandling: true,
    },
    {
      id: "covenant_breach",
      name: "Covenant breaches",
      description: "Get notified when a covenant is breached",
      enableNotification: true,
      enableAIHandling: false,
    },
    {
      id: "payment_notices",
      name: "Payment notices",
      description: "Get notified about payment events",
      enableNotification: true,
      enableAIHandling: true,
    },
    {
      id: "missing_reports",
      name: "Missing reports",
      description: "Get notified when required reports are missing",
      enableNotification: true,
      enableAIHandling: true,
    },
    {
      id: "questions",
      name: "Questions and messages",
      description: "Get notified when someone sends a message or asks a question",
      enableNotification: true,
      enableAIHandling: true,
    },
  ]);

  const toggleNotification = (id: string) => {
    setSettings(
      settings.map((setting) => {
        if (setting.id === id) {
          const updated = { 
            ...setting, 
            enableNotification: !setting.enableNotification 
          };
          
          // If notifications are disabled, also disable AI handling
          if (!updated.enableNotification) {
            updated.enableAIHandling = false;
          }
          
          return updated;
        }
        return setting;
      })
    );
  };

  const toggleAIHandling = (id: string) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id
          ? { ...setting, enableAIHandling: !setting.enableAIHandling }
          : setting
      )
    );
  };

  const handleSave = () => {
    // In a real app, we would persist these settings to the server
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
          <DialogDescription>
            Configure which notifications you receive and which ones the AI can handle automatically.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {settings.map((setting) => (
            <div key={setting.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor={`notify-${setting.id}`} className="text-base font-medium">
                    {setting.name}
                  </Label>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
                <Switch 
                  id={`notify-${setting.id}`} 
                  checked={setting.enableNotification}
                  onCheckedChange={() => toggleNotification(setting.id)}
                />
              </div>
              
              {setting.enableNotification && (
                <div className="flex items-center justify-between pl-6 border-l-2 border-gray-100">
                  <div>
                    <Label htmlFor={`ai-${setting.id}`} className="text-sm">
                      Allow AI to handle automatically
                    </Label>
                    <p className="text-xs text-gray-500">
                      AI will process these notifications without requiring your input
                    </p>
                  </div>
                  <Switch 
                    id={`ai-${setting.id}`} 
                    checked={setting.enableAIHandling}
                    onCheckedChange={() => toggleAIHandling(setting.id)}
                    disabled={!setting.enableNotification}
                  />
                </div>
              )}
            </div>
          ))}
          
          <div className="space-y-2">
            <Label className="text-base font-medium">Global AI settings</Label>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="delegationLevel" className="text-sm">
                  AI delegation level
                </Label>
                <p className="text-xs text-gray-500">
                  Controls how much autonomy AI has across all notifications
                </p>
              </div>
              <select 
                id="delegationLevel" 
                className="h-9 rounded-md border border-input px-3 py-1 text-sm"
              >
                <option value="low">Conservative (always ask first)</option>
                <option value="medium" selected>Balanced (delegate routine tasks)</option>
                <option value="high">Aggressive (maximize automation)</option>
              </select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
