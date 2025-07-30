import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Star, Files, Home, Download, Cloud, Gamepad2, Shield, ShoppingCart, Mail, Play, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModuleData } from "@/hooks/useBookmarks";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const statusColors = {
    online: "bg-success text-success-foreground",
    offline: "bg-destructive text-destructive-foreground", 
    connecting: "bg-warning text-warning-foreground"
  };

  const iconMap = {
    "folder": Files,
    "home": Home, 
    "download": Download,
    "cloud": Cloud,
    "gamepad": Gamepad2,
    "shield": Shield,
    "mail": Mail,
    "play": Play,
    "safety": ShieldAlert
  };

  const IconComponent = iconMap[module.icon as keyof typeof iconMap] || Files;

  return (
    <Card 
      className={cn(
        "p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group relative",
        isDragging && "opacity-50 rotate-2 scale-105"
      )}
      onClick={module.purchased ? onClick : undefined}
    >
      {/* Purchase Overlay for unpurchased modules */}
      {!module.purchased && (
        <div className="absolute inset-0 bg-muted/80 rounded-lg flex items-center justify-center z-20">
          <Button 
            variant="default" 
            size="sm" 
            className="gap-2 opacity-100 relative z-30"
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to configure page for optional extras
              navigate(`/website/configure?extras=${module.id}`);
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            Purchase
          </Button>
        </div>
      )}

      {/* Bookmark Button - only for purchased modules */}
      {module.purchased && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 opacity-60 hover:opacity-100 z-10"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Bookmark button clicked for:', module.id);
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
      )}

      {/* Module Icon */}
      <div className={cn(
        "p-3 rounded-lg bg-accent/10 mb-4 w-fit group-hover:bg-accent/20 transition-colors duration-300",
        !module.purchased && "opacity-60"
      )}>
        <IconComponent className="w-8 h-8 text-accent" />
      </div>
      
      {/* Module Info */}
      <div className={cn("space-y-2", !module.purchased && "opacity-60")}>
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