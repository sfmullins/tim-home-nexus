import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModuleData } from "@/hooks/useBookmarks";

interface ModuleCardProps {
  module: ModuleData;
  onClick: () => void;
  onBookmarkToggle: (moduleId: string) => void;
  canBookmark: (moduleId: string) => boolean;
  getBookmarkTooltip: (moduleId: string) => string;
  isDragging?: boolean;
}

const ModuleCard = ({ 
  module, 
  onClick, 
  onBookmarkToggle, 
  canBookmark, 
  getBookmarkTooltip,
  isDragging 
}: ModuleCardProps) => {
  const statusColors = {
    online: "bg-success text-success-foreground",
    offline: "bg-destructive text-destructive-foreground", 
    connecting: "bg-warning text-warning-foreground"
  };

  const iconMap: { [key: string]: string } = {
    "folder": "📁",
    "home": "🏠", 
    "download": "⬇️",
    "cloud": "☁️",
    "gamepad": "🎮",
    "shield": "🛡️"
  };

  return (
    <Card 
      className={cn(
        "p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group relative",
        isDragging && "opacity-50 rotate-2 scale-105"
      )}
      onClick={onClick}
    >
      {/* Bookmark Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-60 hover:opacity-100 z-10"
            onClick={(e) => {
              e.stopPropagation();
              onBookmarkToggle(module.id);
            }}
            disabled={!canBookmark(module.id)}
          >
            <Star 
              className={cn(
                "w-4 h-4 transition-colors",
                module.isBookmarked 
                  ? "fill-accent text-accent" 
                  : "text-muted-foreground hover:text-accent"
              )} 
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getBookmarkTooltip(module.id)}</p>
        </TooltipContent>
      </Tooltip>

      {/* Module Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {iconMap[module.icon] || "📦"}
      </div>
      
      {/* Module Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
          <Badge className={cn("text-xs", statusColors[module.status])}>
            {module.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{module.description}</p>
      </div>
    </Card>
  );
};

export default ModuleCard;