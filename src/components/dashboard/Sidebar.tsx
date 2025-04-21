
import { useState } from "react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the type for navigation buttons
export type NavigationButton = {
  id: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  tooltip: string;
  hasBadge: boolean;
  isActive?: boolean;
};

interface SidebarProps {
  buttons?: NavigationButton[];
  collapsed?: boolean;
  onNavClick?: (id: string) => void;
}

const Sidebar = ({ buttons = [], collapsed = false, onNavClick }: SidebarProps) => {
  // Use the buttons passed from props or fall back to the default navItems
  const navItems = buttons.length > 0 ? buttons : [
    { id: "deals", label: 'Deals', icon: () => <div></div>, tooltip: "", hasBadge: false, active: true },
    { id: "documents", label: 'Documents', icon: () => <div></div>, tooltip: "", hasBadge: false, active: false },
    { id: "assistant", label: 'AI Assistant', icon: () => <div></div>, tooltip: "", hasBadge: false, active: false },
    { id: "agents", label: 'Tasks/Agents', icon: () => <div></div>, tooltip: "", hasBadge: false, active: false },
    { id: "admin", label: 'Admin', icon: () => <div></div>, tooltip: "", hasBadge: false, active: false },
    { id: "settings", label: 'Settings', icon: () => <div></div>, tooltip: "", hasBadge: false, active: false },
  ];

  const handleItemClick = (id: string) => {
    if (onNavClick) {
      onNavClick(id);
    }
  };
  
  return (
    <aside className={cn("border-r border-gray-200 bg-white", collapsed ? "w-16" : "w-64")}>
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={cn(
                    "flex items-center w-full px-4 py-3 text-sm font-medium rounded-md",
                    (item.isActive) 
                      ? "bg-gray-100 text-black" 
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                  onClick={() => handleItemClick(item.id)}
                  title={item.tooltip}
                >
                  {collapsed ? (
                    <div className="mx-auto">
                      <item.icon className="h-5 w-5" />
                      {item.hasBadge && (
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                  ) : (
                    <>
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.label}</span>
                      {item.hasBadge && (
                        <span className="ml-auto h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">
                          !
                        </span>
                      )}
                    </>
                  )}
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
