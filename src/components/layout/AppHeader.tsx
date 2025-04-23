
import { Link } from "react-router-dom";
import { Home, Globe, User, ChevronDown, Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LanguageSelector from "@/components/layout/LanguageSelector";
import NitidinaButton from "@/components/chat/NitidinaButton";

const AppHeader = () => {
  // Hard-coded user for now – in real app come from context
  const userName = "Marina Whitman";

  return (
    <header className="w-full h-14 border-b border-gray-200 bg-white flex items-center px-4">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold tracking-wide mr-6">NÍTIDO</h1>

      {/* NEW :  home-icon back to index */}
      <Link to="/" className="mr-6 hover:opacity-80 flex items-center">
        <Home size={20} className="mr-1" />
        <span className="text-sm font-medium hidden md:inline">Home</span>
      </Link>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Language selector  (existing tiny component) */}
      <LanguageSelector />

      {/* Nitidina chat toggle (icon only) */}
      <NitidinaButton />

      {/* User menu placeholder */}
      <div className="ml-4 flex items-center space-x-1 cursor-pointer">
        <Avatar className="h-7 w-7">
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hidden md:inline">{userName}</span>
        <ChevronDown size={16} />
      </div>
    </header>
  );
};

export default AppHeader;
