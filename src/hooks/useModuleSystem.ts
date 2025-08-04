import { useInternetControl } from "@/hooks/useInternetControl";
import { moduleConfigurations } from "@/data/moduleConfigurations";
import type { ModuleType, EnhancedModuleData, ModuleCapability } from "@/types/modules";

// Re-export types for backward compatibility
export type { ModuleType, EnhancedModuleData, ModuleCapability };

export const useModuleSystem = () => {
  const { isConnected } = useInternetControl();

  const getModuleStatus = (moduleId: string): EnhancedModuleData => {
    const config = moduleConfigurations[moduleId];
    if (!config) {
      throw new Error(`Module configuration not found for ${moduleId}`);
    }

    // Determine status based on type and connection
    let status: "online" | "offline" | "limited" = "online";
    
    if (config.type === "internet-required" && !isConnected) {
      status = "offline";
    } else if (config.type === "hybrid" && !isConnected) {
      status = "limited";
    }

    // Update capability availability based on internet status
    const capabilities = config.capabilities.map(cap => ({
      ...cap,
      available: cap.requiresInternet ? isConnected : true
    }));

    return {
      ...config,
      status,
      capabilities,
      isBookmarked: false, // This would be managed by the bookmark system
      purchased: ["file-server", "smart-home", "vpn-access", "game-streaming", "media-library"].includes(moduleId)
    };
  };

  const getAllModules = (): EnhancedModuleData[] => {
    return Object.keys(moduleConfigurations).map(getModuleStatus);
  };

  const getModulesByType = (type: ModuleType): EnhancedModuleData[] => {
    return getAllModules().filter(module => module.type === type);
  };

  const getAvailableCapabilities = (moduleId: string): ModuleCapability[] => {
    const module = getModuleStatus(moduleId);
    return module.capabilities.filter(cap => cap.available);
  };

  const getUnavailableCapabilities = (moduleId: string): ModuleCapability[] => {
    const module = getModuleStatus(moduleId);
    return module.capabilities.filter(cap => !cap.available);
  };

  return {
    getModuleStatus,
    getAllModules,
    getModulesByType,
    getAvailableCapabilities,
    getUnavailableCapabilities,
    isConnected
  };
};