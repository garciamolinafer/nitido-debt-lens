
import { useState } from "react";
import { 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Bot, 
  Settings,
  UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarButton = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  tooltip: string;
  isActive?: boolean;
};

type SidebarProps = {
  collapsed?: boolean;
  buttons?: SidebarButton[];
};

const navItems = [
  { icon: Briefcase, label: 'Deals', active: true },
  { icon: FileText, label: 'Documents', active: false },
  { icon: MessageSquare, label: 'AI Assistant', active: false },
  { icon: Bot, label: 'Tasks/Agents', active: false },
  { icon: UserCog, label: 'Admin', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const Sidebar = ({ collapsed = false, buttons = [] }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState('Deals');
  
  // Use provided buttons if available, otherwise use default navItems
  const navButtons = buttons.length > 0 ? buttons : navItems;
  
  return (
    <aside className={`border-r border-gray-200 bg-white transition-all duration-200 ${
      collapsed ? "w-14" : "w-64"
    }`}>
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {navButtons.map((item) => (
              <li key={item.id || item.label}>
                <button
                  className={cn(
                    "flex items-center w-full px-4 py-3 text-sm font-medium rounded-md",
                    (item.isActive || activeItem === item.label) 
                      ? "bg-gray-100 text-black" 
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                  onClick={() => setActiveItem(item.label)}
                >
                  {item.icon && <item.icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />}
                  {!collapsed && item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {!collapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">Agent</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
