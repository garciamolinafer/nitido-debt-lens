
import React from "react";
import { Bell, Settings, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/App";
import { useNavigate } from "react-router-dom";

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

const AppHeader: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Young female, casual dress from Unsplash
  const managerImg =
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=64&h=64&facepad=3";

  const handleLogout = () => {
    logout();
    navigate("/access");
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white z-30">
      <div className="flex items-center gap-3">
        <img
          src="/lovable-uploads/97e9da13-fe84-4a49-9699-535c9539831f.png"
          alt="Nítido Logo"
          className="h-6"
        />
      </div>
      <div className="flex items-center gap-6">
        {/* Settings Icon */}
        <button
          aria-label="Settings"
          className="hover:text-gray-900 text-gray-600"
          title="Settings"
        >
          <Settings size={20} />
        </button>
        {/* Language Selector */}
        <select
          defaultValue="en"
          className="border-none bg-transparent text-sm font-semibold cursor-pointer outline-none text-gray-700"
          aria-label="Language selector"
          title="Language selector"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="text-black">
              {lang.label}
            </option>
          ))}
        </select>
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
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" /> Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Notifications Icon */}
        <button
          aria-label="Notifications"
          className="relative hover:text-gray-900 text-gray-600 ml-2"
          title="Notifications"
        >
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
