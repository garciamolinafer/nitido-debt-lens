
import React, { useState } from "react";
import { Settings, Globe, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppHeaderProps {
  onMenuToggle?: () => void; // Optional for flexibility
  onLogout: () => void;
}

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
];
const managerName = "Marina Whitman";
// AI-generated casual business young woman portrait. Replace with a real asset as needed:
const managerImg =
  "https://randomuser.me/api/portraits/women/44.jpg";

const AppHeader: React.FC<AppHeaderProps> = ({
  onMenuToggle,
  onLogout,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-40 relative">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="mr-4"
          aria-label="Menu"
        >
          {/* Hamburger or logo only in sidebar context */}
          <span className="text-xl font-bold text-blue-600">Nítido</span>
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        {/* Settings Wheel */}
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Language">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setCurrentLanguage(lang)}
                className={
                  lang.code === currentLanguage.code ? "bg-gray-100" : ""
                }
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Manager Name + Avatar + Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 h-10">
              <span className="font-medium whitespace-nowrap">{managerName}</span>
              <Avatar className="h-8 w-8">
                <AvatarImage src={managerImg} alt={managerName} />
                <AvatarFallback>MW</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Notifications Bell */}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
