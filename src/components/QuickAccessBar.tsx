import { Button } from "@/components/ui/button";
import { Files, Home, Download, Cloud, Gamepad2, Shield } from "lucide-react";
import { ModuleData } from "@/hooks/useBookmarks";

interface QuickAccessBarProps {
  bookmarkedModules: ModuleData[];
  onModuleClick: (moduleId: string) => void;
}

const QuickAccessBar = ({ bookmarkedModules, onModuleClick }: QuickAccessBarProps) => {
  const iconMap = {
    "folder": Files,
    "home": Home,
    "download": Download,
    "cloud": Cloud,
    "gamepad": Gamepad2,
    "shield": Shield
  };

  // Hide quick access bar if no bookmarks
  if (bookmarkedModules.length === 0) {
    return null;
  }

  const getResponsiveTitle = (moduleId: string, fullTitle: string) => {
    const shortTitles = {
      "file-server": "Files",
      "smart-home": "Home", 
      "vpn-access": "VPN"
    };
    return shortTitles[moduleId as keyof typeof shortTitles] || fullTitle;
  };

  return (
    <div className="flex gap-2 sm:gap-4 mb-8 w-full">
      {bookmarkedModules.map(module => {
        const IconComponent = iconMap[module.icon as keyof typeof iconMap] || Files;
        return (
          <Button 
            key={module.id} 
            variant="hero" 
            size="lg" 
            className="flex-1 min-w-0" 
            onClick={() => onModuleClick(module.id)}
          >
            <IconComponent className="w-5 h-5 flex-shrink-0" />
            <span className="truncate sm:hidden">
              {getResponsiveTitle(module.id, module.title)}
            </span>
            <span className="truncate hidden sm:inline">
              {module.title}
            </span>
          </Button>
        );
      })}
    </div>
  );
};

export default QuickAccessBar;