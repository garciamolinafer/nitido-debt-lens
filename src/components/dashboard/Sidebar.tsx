
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home,
  Briefcase, 
  FileText, 
  MessageSquare, 
  Bot, 
  Settings,
  UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Briefcase, label: 'Deals', active: true },
  { icon: FileText, label: 'Documents', active: false },
  { icon: MessageSquare, label: 'AI Assistant', active: false },
  { icon: Bot, label: 'Tasks/Agents', active: false },
  { icon: UserCog, label: 'Admin', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Deals');
  const navigate = useNavigate();

  const topItems = navItems;
  const homeItem = {
    icon: Home,
    label: 'Home',
    active: false
  };
  
  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {topItems.map((item) => (
              <li key={item.label}>
                <button
                  className={cn(
                    "flex items-center w-full px-4 py-3 text-sm font-medium rounded-md",
                    activeItem === item.label 
                      ? "bg-gray-100 text-black" 
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                  onClick={() => setActiveItem(item.label)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto px-4 py-4 border-t border-gray-200">
          <button
            className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
            onClick={() => navigate('/')}
          >
            <Home className="h-5 w-5 mr-3" />
            Home
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
