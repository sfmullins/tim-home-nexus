import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from '@supabase/supabase-js';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ModuleCard from "./ModuleCard";
import DashboardHeader from "./DashboardHeader";
import ServerStatus from "./ServerStatus";
import QuickAccessBar from "./QuickAccessBar";
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
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div {...listeners} className="cursor-grab active:cursor-grabbing">
        <ModuleCard {...props} isDragging={isDragging} />
      </div>
    </div>
  );
};
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
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

  // Check authentication
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Redirect to auth if not authenticated
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
        navigate("/files");
        break;
      case "smart-home":
        navigate("/smart-home");
        break;
      case "downloads":
        navigate("/downloads");
        break;
      case "game-streaming":
        navigate("/game-streaming");
        break;
      case "vpn-access":
        navigate("/vpn-access");
        break;
    }
  };

  // Get bookmarked modules for quick access
  const bookmarkedModules = modules.filter(module => bookmarkedIds.includes(module.id));

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto mb-8">
        <DashboardHeader />
        <ServerStatus />
        <QuickAccessBar 
          bookmarkedModules={bookmarkedModules} 
          onModuleClick={handleModuleClick} 
        />

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={modules.map(m => m.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map(module => (
                <SortableModuleCard 
                  key={module.id} 
                  module={module} 
                  onClick={() => handleModuleClick(module.id)} 
                  onBookmarkToggle={toggleBookmark} 
                  canBookmark={canBookmark} 
                  getBookmarkTooltip={getBookmarkTooltip} 
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
export default Dashboard;