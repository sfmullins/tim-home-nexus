import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from '@supabase/supabase-js';
import ModuleCard from "./ModuleCard";
import DashboardHeader from "./DashboardHeader";
import ServerStatus from "./ServerStatus";
import QuickAccessBar from "./QuickAccessBar";
import { useBookmarks, ModuleData } from "@/hooks/useBookmarks";

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
    description: "Browse, upload and download files from TIM's shared folders",
    icon: "folder",
    status: "online",
    isBookmarked: false,
    purchased: true
  }, {
    id: "smart-home",
    title: "Smart Home",
    description: "Control and monitor your smart home devices",
    icon: "home",
    status: "online",
    isBookmarked: false,
    purchased: true
  }, {
    id: "downloads",
    title: "Downloads",
    description: "Manage torrents and downloads remotely",
    icon: "download",
    status: "connecting",
    isBookmarked: false,
    purchased: false
  }, {
    id: "game-streaming",
    title: "Game Streaming",
    description: "Stream games from TIM to your device",
    icon: "gamepad",
    status: "offline",
    isBookmarked: false,
    purchased: false
  }, {
    id: "vpn-access",
    title: "VPN Access",
    description: "Secure remote access to your home network",
    icon: "shield",
    status: "online",
    isBookmarked: false,
    purchased: true
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

  // Sort modules alphabetically and split by purchase status
  const purchasedModules = modules
    .filter(module => module.purchased)
    .sort((a, b) => a.title.localeCompare(b.title));
  
  const unpurchasedModules = modules
    .filter(module => !module.purchased)
    .sort((a, b) => a.title.localeCompare(b.title));

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

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Store</h2>
          
          {/* Purchased Modules Section */}
          {purchasedModules.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Purchased</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedModules.map(module => (
                  <ModuleCard 
                    key={module.id} 
                    module={module} 
                    onClick={() => handleModuleClick(module.id)} 
                    onBookmarkToggle={toggleBookmark} 
                    canBookmark={canBookmark} 
                    getBookmarkTooltip={getBookmarkTooltip} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Unpurchased Modules Section */}
          {unpurchasedModules.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Available for Purchase</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {unpurchasedModules.map(module => (
                  <ModuleCard 
                    key={module.id} 
                    module={module} 
                    onClick={() => handleModuleClick(module.id)} 
                    onBookmarkToggle={toggleBookmark} 
                    canBookmark={canBookmark} 
                    getBookmarkTooltip={getBookmarkTooltip} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;