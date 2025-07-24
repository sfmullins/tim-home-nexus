import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Files, Home, Download, Cloud, Gamepad2, Shield, Wifi, Activity } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import timLogo from "@/assets/tim-logo.png";
import ModuleCard from "./ModuleCard";
import { useBookmarks, ModuleData } from "@/hooks/useBookmarks";
interface SortableModuleCardProps {
  module: ModuleData;
  onClick: () => void;
  onBookmarkToggle: (moduleId: string) => void;
  canBookmark: (moduleId: string) => boolean;
  getBookmarkTooltip: (moduleId: string) => string;
}
const SortableModuleCard = (props: SortableModuleCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: props.module.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ModuleCard {...props} isDragging={isDragging} />
    </div>;
};
const Dashboard = () => {
  const {
    bookmarkedIds,
    toggleBookmark,
    canBookmark,
    getBookmarkTooltip
  } = useBookmarks();
  const [modules, setModules] = useState<ModuleData[]>([{
    id: "file-server",
    title: "File Server",
    description: "Browse, upload and download files from Tim's shared folders",
    icon: "folder",
    status: "online",
    isBookmarked: false
  }, {
    id: "smart-home",
    title: "Smart Home",
    description: "Control and monitor your smart home devices",
    icon: "home",
    status: "online",
    isBookmarked: false
  }, {
    id: "downloads",
    title: "Downloads",
    description: "Manage torrents and downloads remotely",
    icon: "download",
    status: "connecting",
    isBookmarked: false
  }, {
    id: "cloud-storage",
    title: "Cloud Storage",
    description: "Personal cloud storage and file sync",
    icon: "cloud",
    status: "online",
    isBookmarked: false
  }, {
    id: "game-streaming",
    title: "Game Streaming",
    description: "Stream games from Tim to your device",
    icon: "gamepad",
    status: "offline",
    isBookmarked: false
  }, {
    id: "vpn-access",
    title: "VPN Access",
    description: "Secure remote access to your home network",
    icon: "shield",
    status: "offline",
    isBookmarked: false
  }]);

  // Update bookmark status when bookmarkedIds changes
  useEffect(() => {
    setModules(prev => prev.map(module => ({
      ...module,
      isBookmarked: bookmarkedIds.includes(module.id)
    })));
  }, [bookmarkedIds]);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  }));
  const handleDragEnd = (event: DragEndEvent) => {
    const {
      active,
      over
    } = event;
    if (over && active.id !== over.id) {
      setModules(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  const handleModuleClick = (moduleId: string) => {
    switch (moduleId) {
      case "file-server":
        window.location.href = "/files";
        break;
      case "smart-home":
        window.location.href = "/smart-home";
        break;
      case "downloads":
        console.log("Downloads clicked - will open μTorrent");
        break;
      case "cloud-storage":
        console.log("Cloud Storage clicked");
        break;
      case "game-streaming":
        console.log("Game Streaming clicked");
        break;
      case "vpn-access":
        console.log("VPN Access clicked");
        break;
    }
  };

  // Get bookmarked modules for quick access
  const bookmarkedModules = modules.filter(module => bookmarkedIds.includes(module.id));
  return <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src={timLogo} alt="Tim Logo" className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tim</h1>
              <p className="text-muted-foreground">Personal Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Local Network</span>
            </div>
            <Button variant="accent" size="sm">
              <Activity className="w-4 h-4" />
              Status
            </Button>
          </div>
        </div>

        {/* Server Status */}
        <Card className="p-6 bg-gradient-surface border-border mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Server className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Tim Server</h2>
                <p className="text-muted-foreground">Intel N100 • 192.168.1.100</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-accent text-accent-foreground mb-2">Online</Badge>
              <p className="text-sm text-muted-foreground">Uptime: 7d 12h</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          {bookmarkedModules.length > 0 ? bookmarkedModules.map(module => <Button key={module.id} variant="hero" size="lg" className="flex-1" onClick={() => handleModuleClick(module.id)}>
                {module.icon === "folder" && <Files className="w-5 h-5" />}
                {module.icon === "home" && <Home className="w-5 h-5" />}
                {module.icon === "download" && <Download className="w-5 h-5" />}
                {module.icon === "cloud" && <Cloud className="w-5 h-5" />}
                {module.icon === "gamepad" && <Gamepad2 className="w-5 h-5" />}
                {module.icon === "shield" && <Shield className="w-5 h-5" />}
                {module.title}
              </Button>) : <>
              <Button variant="hero" size="lg" className="flex-1">
                <Files className="w-5 h-5" />
                Quick Files
              </Button>
              <Button variant="module" size="lg" className="flex-1">
                <Home className="w-5 h-5" />
                Home Control
              </Button>
              <Button variant="module" size="lg" className="flex-1">
                <Shield className="w-5 h-5" />
                Connect VPN
              </Button>
            </>}
        </div>

        {/* Modules Grid */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={modules.map(m => m.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map(module => <SortableModuleCard key={module.id} module={module} onClick={() => handleModuleClick(module.id)} onBookmarkToggle={toggleBookmark} canBookmark={canBookmark} getBookmarkTooltip={getBookmarkTooltip} />)}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>;
};
export default Dashboard;