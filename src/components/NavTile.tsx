
import React from "react";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavTileProps {
  id: string;
  icon: LucideIcon;
  title: string;
  helper: string;
  hasBadge?: boolean;
  badgeCount?: number;
  onClick: () => void;
  className?: string;
}

const NavTile = ({
  id,
  icon: Icon,
  title,
  helper,
  hasBadge = false,
  badgeCount,
  onClick,
  className,
}: NavTileProps) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        "relative rounded-lg border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col items-center text-center",
        className
      )}
    >
      {hasBadge && (
        <div className="absolute top-4 right-4">
          {badgeCount ? (
            <Badge variant="destructive" className="h-6 w-6 rounded-full flex items-center justify-center">
              {badgeCount > 9 ? "9+" : badgeCount}
            </Badge>
          ) : (
            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
          )}
        </div>
      )}
      <div className="mb-4 rounded-full bg-gray-50 p-3">
        <Icon size={32} className="text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="text-sm text-gray-500">{helper}</p>
    </div>
  );
};

export default NavTile;
