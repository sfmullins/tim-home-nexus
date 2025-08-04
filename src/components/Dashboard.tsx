import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModuleCard from "./ModuleCard";
import DashboardHeader from "./DashboardHeader";
import ServerStatus from "./ServerStatus";
import QuickAccessBar from "./QuickAccessBar";
import { InternetStatusBanner } from "./InternetStatusIndicators";
import { useBookmarks, ModuleData } from "@/hooks/useBookmarks";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { useInternetControl } from "@/hooks/useInternetControl";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useLocalAuth();
  const { isConnected } = useInternetControl();
  const {
    bookmarkedIds,
    toggleBookmark,
    canBookmark,
    getBookmarkTooltip
  } = useBookmarks();

  // Check if onboarding is complete
  const isOnboardingComplete = localStorage.getItem('tim-onboarding-complete') === 'true';

  const getModuleStatus = (moduleId: string): "online" | "offline" => {
    // Local-only modules are always online
    const localModules = ["file-server", "smart-home", "vpn-access"];
    if (localModules.includes(moduleId)) return "online";
    
    // Internet-required modules depend on connection
    const internetModules = ["downloads", "safety-net", "email-storage"];
    if (internetModules.includes(moduleId)) return isConnected ? "online" : "offline";
    
    // Hybrid modules are always available but with limited features when offline
    return "online";
  };

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
    description: "Manage torrents and downloads remotely (requires internet)",
    icon: "download",
    status: "offline",
    isBookmarked: false,
    purchased: false
  }, {
    id: "game-streaming",
    title: "Game Streaming",
    description: "Stream games from TIM to your device",
    icon: "gamepad",
    status: "online",
    isBookmarked: false,
    purchased: false
  }, {
    id: "email-storage",
    title: "Email Storage",
    description: "Host your email inbox content locally (requires internet for sync)",
    icon: "mail",
    status: "offline",
    isBookmarked: false,
    purchased: false
  }, {
    id: "media-library",
    title: "Media Library",
    description: "Local media server for family-friendly content control",
    icon: "play",
    status: "online",
    isBookmarked: false,
    purchased: false
  }, {
    id: "safety-net",
    title: "Safety Net",
    description: "Filter content and manage internet access (requires internet)",
    icon: "safety",
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

  // Check authentication and onboarding
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/auth");
    } else if (!loading && isAuthenticated && !isOnboardingComplete) {
      navigate("/onboarding");
    }
  }, [isAuthenticated, loading, navigate, isOnboardingComplete]);

  // Update module statuses based on internet connection
  useEffect(() => {
    setModules(prev => prev.map(module => ({
      ...module,
      status: getModuleStatus(module.id)
    })));
  }, [isConnected]);

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
      case "email-storage":
        navigate("/email-storage");
        break;
      case "media-library":
        navigate("/media-library");
        break;
      case "safety-net":
        navigate("/safety-net");
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
        <InternetStatusBanner />
        <ServerStatus />
        <QuickAccessBar 
          bookmarkedModules={bookmarkedModules} 
          onModuleClick={handleModuleClick} 
        />

        {/* Quick setup card for first-time users */}
        {!isOnboardingComplete && (
          <div className="mb-6">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Complete Your Setup</h3>
              <p className="text-muted-foreground mb-4">
                Configure your platform and see potential cloud storage savings.
              </p>
              <Button onClick={() => navigate("/onboarding")}>
                Continue Setup
              </Button>
            </div>
          </div>
        )}

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Modules</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/internet-control")}
              className="flex items-center gap-2"
            >
              {isConnected ? "🌐" : "🔒"} Internet Control
            </Button>
          </div>
          
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