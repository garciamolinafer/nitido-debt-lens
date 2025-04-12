import { useState, useEffect } from "react";
import { Bell, X, Check, FileText, AlertTriangle, MessageSquare, Bot, Filter } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { NotificationSettingsDialog } from "./NotificationSettingsDialog";

export type NotificationType = 
  | "document" 
  | "compliance" 
  | "payment" 
  | "message" 
  | "task" 
  | "system";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  dealId?: string;
  canDelegateToAI: boolean;
  actionPath?: string;
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "document",
      title: "Document uploaded",
      message: "Q4 Financials.pdf uploaded by Borrower – Needs review",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
      dealId: "apollo-energy",
      canDelegateToAI: true,
      actionPath: "/deals/apollo-energy/documents",
    },
    {
      id: "2",
      type: "compliance",
      title: "Missing report",
      message: "Monthly Operating Report for Beta Real Estate is missing (due 5 days ago)",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: false,
      dealId: "beta-realestate",
      canDelegateToAI: true,
      actionPath: "/deals/beta-realestate/monitoring",
    },
    {
      id: "3",
      type: "compliance",
      title: "Covenant breach",
      message: "Covenant breach in Apollo Energy Loan – Leverage 3.8× > 3.5×",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: true,
      dealId: "apollo-energy",
      canDelegateToAI: false,
      actionPath: "/deals/apollo-energy/monitoring?tab=covenants",
    },
    {
      id: "4",
      type: "payment",
      title: "Payment processed",
      message: "Interest payment processed for Beta Real Estate",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      dealId: "beta-realestate",
      canDelegateToAI: false,
      actionPath: "/deals/beta-realestate/loan-admin",
    },
    {
      id: "5",
      type: "message",
      title: "New question",
      message: "New question from Lender Z in deal Q&A",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      read: true,
      dealId: "apollo-energy",
      canDelegateToAI: true,
      actionPath: "/deals/apollo-energy/monitoring?tab=qa",
    },
  ]);

  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification = {
      ...notification,
      id: String(notifications.length + 1),
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const delegateToAI = (id: string) => {
    // Find the notification to delegate
    const notification = notifications.find(n => n.id === id);
    if (!notification) return;
    
    // Apply AI action based on notification type
    toast({
      title: "AI Assistant activated",
      description: `AI is handling: ${notification.title.toLowerCase()}`,
    });
    
    // Mark as read after delegating
    markAsRead(id);
    
    // Add a follow-up notification based on type
    setTimeout(() => {
      if (notification.type === "document") {
        addNotification({
          type: "task",
          title: "AI completed document review",
          message: `Q4 Financials.pdf has been analyzed. 3 key metrics extracted.`,
          dealId: notification.dealId,
          canDelegateToAI: false,
          actionPath: notification.actionPath,
        });
      } else if (notification.type === "compliance") {
        addNotification({
          type: "task",
          title: "AI sent reminder",
          message: `Reminder email sent to Beta Real Estate about missing report.`,
          dealId: notification.dealId,
          canDelegateToAI: false,
          actionPath: notification.actionPath,
        });
      } else if (notification.type === "message") {
        addNotification({
          type: "task",
          title: "AI drafted response",
          message: `Response drafted to Lender Z's question. Ready for your review.`,
          dealId: notification.dealId,
          canDelegateToAI: false,
          actionPath: notification.actionPath,
        });
      }
    }, 2000);
  };

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    delegateToAI,
  };
};

const NotificationItem = ({ 
  notification, 
  onRead, 
  onDelegateToAI 
}: { 
  notification: Notification; 
  onRead: (id: string) => void;
  onDelegateToAI: (id: string) => void;
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    onRead(notification.id);
    
    if (notification.actionPath) {
      navigate(notification.actionPath);
    }
  };
  
  const getIcon = () => {
    switch (notification.type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-500 shrink-0" />;
      case "compliance":
        return <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-indigo-500 shrink-0" />;
      case "task":
        return <Check className="h-5 w-5 text-green-500 shrink-0" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500 shrink-0" />;
    }
  };
  
  const formattedTime = () => {
    const now = new Date();
    const diff = now.getTime() - notification.timestamp.getTime();
    
    // Less than a minute
    if (diff < 60 * 1000) {
      return 'Just now';
    }
    
    // Less than an hour
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes}m ago`;
    }
    
    // Less than a day
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours}h ago`;
    }
    
    // Less than a week
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days}d ago`;
    }
    
    // Default to date format
    return notification.timestamp.toLocaleDateString();
  };
  
  return (
    <div 
      className={`p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-gray-50' : ''}`}
    >
      <div className="flex items-start gap-3" onClick={handleClick}>
        <div className="pt-0.5">
          {getIcon()}
        </div>
        <div className="flex-grow min-w-0">
          <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
            {notification.message}
          </p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">
              {formattedTime()}
            </span>
            {notification.dealId && (
              <span className="text-xs bg-gray-100 rounded px-2 py-0.5">
                {notification.dealId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            )}
          </div>
        </div>
        {notification.canDelegateToAI && (
          <Button
            variant="ghost" 
            size="icon" 
            className="shrink-0 h-8 w-8 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onDelegateToAI(notification.id);
            }}
            title="Delegate to AI"
          >
            <Bot className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

const NotificationCenter = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    delegateToAI 
  } = useNotifications();

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter(n => !n.read);
      case "documents":
        return notifications.filter(n => n.type === "document");
      case "compliance":
        return notifications.filter(n => ["compliance", "payment"].includes(n.type));
      case "messages":
        return notifications.filter(n => n.type === "message");
      default:
        return notifications;
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Open notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 px-1 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0 mr-2">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost" 
                size="sm" 
                className="h-8 text-xs"
                onClick={() => setShowSettingsDialog(true)}
              >
                Settings
              </Button>
              <Button
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => markAllAsRead()}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="w-full justify-start h-10 rounded-none bg-transparent border-b p-0">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none flex-1 h-10"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="unread" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none flex-1 h-10"
                >
                  Unread
                </TabsTrigger>
                <TabsTrigger 
                  value="documents" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none flex-1 h-10"
                >
                  Documents
                </TabsTrigger>
                <TabsTrigger 
                  value="compliance" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none flex-1 h-10"
                >
                  Compliance
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto">
              <TabsContent value={activeTab} className="mt-0 p-0">
                {getFilteredNotifications().length > 0 ? (
                  getFilteredNotifications().map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onRead={markAsRead}
                      onDelegateToAI={delegateToAI}
                    />
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p>No notifications</p>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
          
          <div className="p-3 text-center border-t">
            <Button variant="ghost" size="sm" className="text-xs">
              View all notifications
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <NotificationSettingsDialog
        open={showSettingsDialog}
        onClose={() => setShowSettingsDialog(false)}
      />
    </>
  );
};

export default NotificationCenter;
