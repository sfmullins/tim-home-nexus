import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModuleCard from "./ModuleCard";
import EnhancedModuleCard from "./EnhancedModuleCard";
import DashboardHeader from "./DashboardHeader";
import ServerStatus from "./ServerStatus";
import QuickAccessBar from "./QuickAccessBar";
import { InternetStatusBanner } from "./InternetStatusIndicators";
import { useBookmarks, ModuleData } from "@/hooks/useBookmarks";
import { useModuleSystem } from "@/hooks/useModuleSystem";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { useInternetControl } from "@/hooks/useInternetControl";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useLocalAuth();
  const { isConnected } = useInternetControl();
  const { getAllModules, getModulesByType } = useModuleSystem();
  const {
    bookmarkedIds,
    toggleBookmark,
    canBookmark,
    getBookmarkTooltip
  } = useBookmarks();

  // Check if onboarding is complete
  const isOnboardingComplete = localStorage.getItem('tim-onboarding-complete') === 'true';

  // Get enhanced modules
  const allModules = getAllModules();

  
  // Update bookmark status
  const modulesWithBookmarks = allModules.map(module => ({
    ...module,
    isBookmarked: bookmarkedIds.includes(module.id)
  }));

  const localOnlyModules = getModulesByType('local-only').map(module => ({
    ...module,
    isBookmarked: bookmarkedIds.includes(module.id)
  }));

  const internetRequiredModules = getModulesByType('internet-required').map(module => ({
    ...module,
    isBookmarked: bookmarkedIds.includes(module.id)
  }));

  const hybridModules = getModulesByType('hybrid').map(module => ({
    ...module,
    isBookmarked: bookmarkedIds.includes(module.id)
  }));

  // Check authentication and onboarding
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/auth");
    } else if (!loading && isAuthenticated && !isOnboardingComplete) {
      navigate("/onboarding");
    }
  }, [isAuthenticated, loading, navigate, isOnboardingComplete]);

  // Update module statuses based on internet connection - no longer needed with enhanced system
  // useEffect(() => {
  //   setModules(prev => prev.map(module => ({
  //     ...module,
  //     status: getModuleStatus(module.id)
  //   })));
  // }, [isConnected]);

  // Update bookmark status when bookmarkedIds changes - handled above now
  // useEffect(() => {
  //   setModules(prev => prev.map(module => ({
  //     ...module,
  //     isBookmarked: bookmarkedIds.includes(module.id)
  //   })));
  // }, [bookmarkedIds]);

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
  const bookmarkedModules = modulesWithBookmarks.filter(module => bookmarkedIds.includes(module.id));

  // Sort modules by purchase status
  const purchasedModules = modulesWithBookmarks.filter(module => module.purchased);
  const unpurchasedModules = modulesWithBookmarks.filter(module => !module.purchased);

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
          bookmarkedModules={bookmarkedModules as any} 
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
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/savings")}
                className="flex items-center gap-2"
              >
                💰 Savings Calculator
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/internet-control")}
                className="flex items-center gap-2"
              >
                {isConnected ? "🌐" : "🔒"} Internet Control
              </Button>
            </div>
          </div>

          <Tabs defaultValue="by-type" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="by-type">By Type</TabsTrigger>
              <TabsTrigger value="by-status">By Status</TabsTrigger>
            </TabsList>

            <TabsContent value="by-type" className="space-y-6">
              {/* Local-Only Modules */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  🏠 Local-Only Modules
                  <span className="text-sm text-green-600 bg-green-100 dark:bg-green-950 px-2 py-1 rounded">
                    Always Available
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {localOnlyModules.map(module => (
                    <EnhancedModuleCard 
                      key={module.id} 
                      module={module} 
                      onClick={handleModuleClick} 
                      onBookmarkToggle={toggleBookmark} 
                      canBookmark={canBookmark} 
                      getBookmarkTooltip={getBookmarkTooltip} 
                    />
                  ))}
                </div>
              </div>

              {/* Hybrid Modules */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  ⚡ Hybrid Modules
                  <span className="text-sm text-purple-600 bg-purple-100 dark:bg-purple-950 px-2 py-1 rounded">
                    Enhanced Online
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hybridModules.map(module => (
                    <EnhancedModuleCard 
                      key={module.id} 
                      module={module} 
                      onClick={handleModuleClick} 
                      onBookmarkToggle={toggleBookmark} 
                      canBookmark={canBookmark} 
                      getBookmarkTooltip={getBookmarkTooltip} 
                    />
                  ))}
                </div>
              </div>

              {/* Internet-Required Modules */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  🌐 Internet-Required Modules
                  <span className={`text-sm px-2 py-1 rounded ${
                    isConnected 
                      ? 'text-blue-600 bg-blue-100 dark:bg-blue-950' 
                      : 'text-red-600 bg-red-100 dark:bg-red-950'
                  }`}>
                    {isConnected ? 'Available' : 'Offline'}
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {internetRequiredModules.map(module => (
                    <EnhancedModuleCard 
                      key={module.id} 
                      module={module} 
                      onClick={handleModuleClick} 
                      onBookmarkToggle={toggleBookmark} 
                      canBookmark={canBookmark} 
                      getBookmarkTooltip={getBookmarkTooltip} 
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="by-status" className="space-y-6">
              {/* Purchased Modules */}
              {purchasedModules.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Purchased Modules</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchasedModules.map(module => (
                      <EnhancedModuleCard 
                        key={module.id} 
                        module={module} 
                        onClick={handleModuleClick} 
                        onBookmarkToggle={toggleBookmark} 
                        canBookmark={canBookmark} 
                        getBookmarkTooltip={getBookmarkTooltip} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Available for Purchase */}
              {unpurchasedModules.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Available for Purchase</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {unpurchasedModules.map(module => (
                      <EnhancedModuleCard 
                        key={module.id} 
                        module={module} 
                        onClick={handleModuleClick} 
                        onBookmarkToggle={toggleBookmark} 
                        canBookmark={canBookmark} 
                        getBookmarkTooltip={getBookmarkTooltip} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;