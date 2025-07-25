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

  if (bookmarkedModules.length > 0) {
    return (
      <div className="flex gap-4 mb-8">
        {bookmarkedModules.map(module => {
          const IconComponent = iconMap[module.icon as keyof typeof iconMap] || Files;
          return (
            <Button 
              key={module.id} 
              variant="hero" 
              size="lg" 
              className="flex-1" 
              onClick={() => onModuleClick(module.id)}
            >
              <IconComponent className="w-5 h-5" />
              {module.title}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex gap-4 mb-8">
      <Button variant="hero" size="lg" className="flex-1" onClick={() => onModuleClick("file-server")}>
        <Files className="w-5 h-5" />
        Quick Files
      </Button>
      <Button variant="module" size="lg" className="flex-1" onClick={() => onModuleClick("smart-home")}>
        <Home className="w-5 h-5" />
        Home Control
      </Button>
      <Button variant="module" size="lg" className="flex-1" onClick={() => onModuleClick("vpn-access")}>
        <Shield className="w-5 h-5" />
        Connect VPN
      </Button>
    </div>
  );
};

export default QuickAccessBar;