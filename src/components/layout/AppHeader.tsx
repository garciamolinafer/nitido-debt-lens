
import React, { useState } from "react";
import { Bell, Settings, LogOut, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/App";
import { useNavigate } from "react-router-dom";

// Language options
const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

const AppHeader: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // Young female, casual dress from Unsplash
  const managerImg =
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=64&h=64&facepad=3";

  const handleLogout = () => {
    logout();
    navigate("/access");
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    // Additional language change logic would go here
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white z-30 sticky top-0">
      <div className="flex items-center gap-3">
        <img
          src="/lovable-uploads/97e9da13-fe84-4a49-9699-535c9539831f.png"
          alt="Nítido Logo"
          className="h-7"
        />
      </div>
      <div className="flex items-center gap-6">
        {/* Settings */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                aria-label="Setup"
                className="hover:text-gray-900 text-gray-600"
                title="Setup"
              >
                <Settings size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              Platform settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="border-none bg-transparent text-sm font-semibold cursor-pointer outline-none text-gray-700 py-1 pr-6 appearance-none"
            aria-label="Language selector"
            title="Language selector"
            style={{ backgroundPosition: "right 0.25rem center", backgroundSize: "1em" }}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="text-black">
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Manager Name & Avatar with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-sm font-medium text-gray-800">
                Marina Whitman
              </span>
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarImage src={managerImg} alt="Manager" />
                <AvatarFallback>MW</AvatarFallback>
              </Avatar>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" /> Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            aria-label="Notifications"
            className="relative hover:text-gray-900 text-gray-600"
            title="Notifications"
          >
            <Bell size={20} />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
              3
            </Badge>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
