
import { Bell, MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type DealPageHeaderProps = {
  dealName: string;
};

const DealPageHeader = ({ dealName }: DealPageHeaderProps) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
      <div>
        <img 
          src="/lovable-uploads/97e9da13-fe84-4a49-9699-535c9539831f.png" 
          alt="Nítido Logo" 
          className="h-6"
        />
      </div>
      
      <div className="flex-1 text-center">
        <h1 className="text-lg font-bold">{dealName}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="icon">
          <MessageSquare size={20} />
        </Button>
        
        <div className="flex items-center ml-4 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
            <span className="text-sm font-medium">JD</span>
          </div>
          <span className="text-sm mr-1">John Doe</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
};

export default DealPageHeader;
