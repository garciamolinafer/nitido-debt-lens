
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

// You can adjust these as needed based on your languages supported
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
];

const managerName = "Marina Whitman";
// Photo: young female in casual dress (close visual match)
const managerImg =
  "https://randomuser.me/api/portraits/women/44.jpg"; // good casual placeholder

interface AppHeaderProps {
  onMenuToggle?: () => void;
  onLogout: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  onMenuToggle,
  onLogout,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-40 relative shadow-sm">
      {/* Left: Nítido Logo */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="mr-2"
          aria-label="Menu"
        >
          <img
            src="/lovable-uploads/b4b2e44a-4e6f-498a-8358-ec4bdfa82440.png"
            alt="Nítido Logo"
            className="h-8 w-auto"
            style={{ minWidth: 90 }}
          />
        </Button>
      </div>
      {/* Right: Controls */}
      <div className="flex items-center gap-2">
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
                className={lang.code === currentLanguage.code ? "bg-gray-100" : ""}
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Manager name & photo dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 h-10 group"
              aria-label="User menu"
            >
              <span className="font-medium whitespace-nowrap hidden md:block">
                {managerName}
              </span>
              <Avatar className="h-8 w-8 border border-gray-300">
                <AvatarImage src={managerImg} alt={managerName} />
                <AvatarFallback>MW</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 ml-1 opacity-70 group-hover:opacity-100 hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Notifications bell */}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
