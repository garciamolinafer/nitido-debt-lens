
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Bot, 
  Settings,
  UserCog,
  Home
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

  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
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
            <li className="mt-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-2 text-sm hover:bg-gray-50",
                    isActive && "font-semibold"
                  )
                }
              >
                <Home size={18} className="mr-2" />
                Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
