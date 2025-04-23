
import React from "react";
import { Settings, Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  // Dummy manager image - replace this path if you upload a real picture
  const managerImg = "/placeholder.svg";

  const handleLogout = () => {
    logout();
    navigate("/access");
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <img 
          src="/lovable-uploads/97e9da13-fe84-4a49-9699-535c9539831f.png" 
          alt="Nítido Logo" 
          className="h-6"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Settings Icon */}
        <button aria-label="Settings" className="hover:text-gray-900 text-gray-600">
          <Settings size={20} />
        </button>

        {/* Language Selector */}
        <select
          defaultValue="en"
          className="border-none bg-transparent text-sm font-semibold cursor-pointer outline-none text-gray-700"
          aria-label="Language selector"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code} className="text-black">
              {lang.label}
            </option>
          ))}
        </select>

        {/* Manager Name & Photo with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium text-gray-800">Marina Whitman</span>
              <img
                src={managerImg}
                alt="Manager"
                className="h-8 w-8 rounded-full object-cover border border-gray-200"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white" align="end">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications Icon */}
        <button aria-label="Notifications" className="relative hover:text-gray-900 text-gray-600 ml-2">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
