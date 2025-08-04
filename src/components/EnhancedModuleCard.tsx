import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Bookmark, BookmarkCheck, ShoppingCart, ChevronDown, ChevronUp,
  Folder, Home, Download, Gamepad2, Mail, Play, Shield, Activity, 
  Wifi, WifiOff, AlertTriangle, CheckCircle, Zap, Globe, HardDrive
} from "lucide-react";
import { useState } from "react";
import type { EnhancedModuleData, ModuleCapability } from "@/hooks/useModuleSystem";

interface EnhancedModuleCardProps {
  module: EnhancedModuleData;
  onClick: (moduleId: string) => void;
  onBookmarkToggle: (moduleId: string) => void;
  canBookmark: (moduleId: string) => boolean;
  getBookmarkTooltip: (moduleId: string) => string;
}

const EnhancedModuleCard = ({ 
  module, 
  onClick, 
  onBookmarkToggle, 
  canBookmark, 
  getBookmarkTooltip 
}: EnhancedModuleCardProps) => {
  const [showCapabilities, setShowCapabilities] = useState(false);

  const getIcon = (iconName: string) => {
    const icons = {
      folder: Folder,
      home: Home,
      download: Download,
      gamepad: Gamepad2,
      mail: Mail,
      play: Play,
      shield: Shield,
      safety: Shield,
      activity: Activity
    };
    return icons[iconName as keyof typeof icons] || Activity;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'local-only':
        return <HardDrive className="h-3 w-3" />;
      case 'internet-required':
        return <Globe className="h-3 w-3" />;
      case 'hybrid':
        return <Zap className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'local-only':
        return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-300';
      case 'internet-required':
        return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950 dark:text-blue-300';
      case 'hybrid':
        return 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-950 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusBadge = () => {
    switch (module.status) {
      case 'online':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Online
          </Badge>
        );
      case 'limited':
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-300">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Limited
          </Badge>
        );
      case 'offline':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300 dark:bg-red-950/20 dark:text-red-300">
            <WifiOff className="h-3 w-3 mr-1" />
            Offline
          </Badge>
        );
      default:
        return null;
    }
  };

  const IconComponent = getIcon(module.icon);
  const availableCapabilities = module.capabilities.filter(cap => cap.available);
  const unavailableCapabilities = module.capabilities.filter(cap => !cap.available);

  return (
    <Card className={`relative transition-all duration-200 hover:shadow-md ${
      module.status === 'offline' ? 'opacity-75' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {IconComponent && <IconComponent className="h-5 w-5 text-primary" />}
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {module.title}
                <Badge variant="outline" className={`text-xs ${getTypeColor(module.type)}`}>
                  {getTypeIcon(module.type)}
                  <span className="ml-1 capitalize">{module.type.replace('-', ' ')}</span>
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                {getStatusBadge()}
                {module.purchased && (
                  <Badge variant="outline" className="text-xs">
                    Owned
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBookmarkToggle(module.id)}
                disabled={!canBookmark(module.id) && !module.isBookmarked}
                className="px-2"
              >
                {module.isBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {getBookmarkTooltip(module.id)}
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <CardDescription className="text-sm leading-relaxed">
          {module.description}
        </CardDescription>

        {/* Status-specific descriptions */}
        {module.status === 'limited' && module.offlineDescription && (
          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-amber-700 dark:text-amber-300 text-sm">
              Limited mode: {module.offlineDescription}
            </AlertDescription>
          </Alert>
        )}

        {module.status === 'offline' && module.offlineDescription && (
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
            <WifiOff className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-700 dark:text-red-300 text-sm">
              {module.offlineDescription}
            </AlertDescription>
          </Alert>
        )}

        {/* Capabilities */}
        <Collapsible open={showCapabilities} onOpenChange={setShowCapabilities}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between p-2">
              <span className="text-sm">
                Capabilities ({availableCapabilities.length}/{module.capabilities.length} available)
              </span>
              {showCapabilities ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {availableCapabilities.map((capability) => (
              <div key={capability.id} className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-green-700 dark:text-green-300">
                    {capability.name}
                  </div>
                  <div className="text-green-600 dark:text-green-400 text-xs">
                    {capability.description}
                  </div>
                </div>
              </div>
            ))}
            
            {unavailableCapabilities.map((capability) => (
              <div key={capability.id} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-900/20 rounded text-sm">
                <WifiOff className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-500 dark:text-gray-400">
                    {capability.name}
                  </div>
                  <div className="text-gray-400 dark:text-gray-500 text-xs">
                    {capability.description} (requires internet)
                  </div>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        <div className="flex items-center justify-between pt-2">
          {module.purchased ? (
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => onClick(module.id)}
              disabled={module.status === 'offline'}
              className="flex-1 mr-2"
            >
              {module.status === 'offline' ? "Needs Internet" : 
               module.status === 'limited' ? "Open (Limited)" : "Open"}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onClick(module.id)}
              className="flex-1 mr-2"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Purchase
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedModuleCard;