
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DealSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const DealSearch = ({ searchTerm, onSearchChange }: DealSearchProps) => {
  return (
    <div className="relative w-64 mb-6">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        placeholder="Search deals..."
        className="pl-8"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default DealSearch;
