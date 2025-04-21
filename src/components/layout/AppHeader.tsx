
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Bell,
  Settings,
  LogOut
} from "lucide-react";

interface AppHeaderProps {
  onLogout?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <div className="text-xl font-bold text-blue-600">Nítido</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        {onLogout && (
          <Button variant="ghost" size="icon" onClick={onLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
