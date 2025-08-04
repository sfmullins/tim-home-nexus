import { useInternetControl } from "@/hooks/useInternetControl";

export type ModuleType = 'local-only' | 'internet-required' | 'hybrid';

export interface ModuleCapability {
  id: string;
  name: string;
  description: string;
  requiresInternet: boolean;
  available: boolean;
}

export interface EnhancedModuleData {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: ModuleType;
  status: "online" | "offline" | "limited";
  isBookmarked: boolean;
  purchased: boolean;
  capabilities: ModuleCapability[];
  offlineDescription?: string;
  internetDescription?: string;
}

// Define module configurations
export const moduleConfigurations: Record<string, Omit<EnhancedModuleData, 'isBookmarked' | 'purchased'>> = {
  "file-server": {
    id: "file-server",
    title: "File Server",
    description: "Browse, upload and download files from TIM's shared folders",
    icon: "folder",
    type: "local-only",
    status: "online",
    capabilities: [
      {
        id: "local-browse",
        name: "Local File Browser",
        description: "Browse files on your local network",
        requiresInternet: false,
        available: true
      },
      {
        id: "local-upload",
        name: "File Upload/Download",
        description: "Transfer files between devices",
        requiresInternet: false,
        available: true
      },
      {
        id: "file-sharing",
        name: "Local Network Sharing",
        description: "Share files with other devices on your network",
        requiresInternet: false,
        available: true
      }
    ]
  },
  
  "smart-home": {
    id: "smart-home",
    title: "Smart Home",
    description: "Control and monitor your smart home devices",
    icon: "home",
    type: "local-only",
    status: "online",
    capabilities: [
      {
        id: "device-control",
        name: "Device Control",
        description: "Control smart lights, switches, and sensors",
        requiresInternet: false,
        available: true
      },
      {
        id: "automation",
        name: "Local Automation",
        description: "Create automated routines and schedules",
        requiresInternet: false,
        available: true
      },
      {
        id: "monitoring",
        name: "Device Monitoring",
        description: "Monitor device status and energy usage",
        requiresInternet: false,
        available: true
      }
    ]
  },
  
  "vpn-access": {
    id: "vpn-access",
    title: "VPN Access",
    description: "Secure remote access to your home network",
    icon: "shield",
    type: "local-only",
    status: "online",
    capabilities: [
      {
        id: "vpn-server",
        name: "VPN Server",
        description: "Host VPN connections for remote access",
        requiresInternet: false,
        available: true
      },
      {
        id: "network-bridge",
        name: "Network Bridge",
        description: "Access local network resources remotely",
        requiresInternet: false,
        available: true
      },
      {
        id: "secure-tunnel",
        name: "Encrypted Tunneling",
        description: "Secure communication channels",
        requiresInternet: false,
        available: true
      }
    ]
  },

  "downloads": {
    id: "downloads",
    title: "Downloads",
    description: "Manage torrents and downloads remotely",
    icon: "download",
    type: "internet-required",
    status: "offline",
    capabilities: [
      {
        id: "torrent-client",
        name: "Torrent Downloads",
        description: "Download torrents and manage seeding",
        requiresInternet: true,
        available: false
      },
      {
        id: "web-downloads",
        name: "Web Downloads",
        description: "Download files from the internet",
        requiresInternet: true,
        available: false
      },
      {
        id: "download-scheduler",
        name: "Download Scheduling",
        description: "Schedule downloads for optimal times",
        requiresInternet: true,
        available: false
      }
    ],
    offlineDescription: "Requires internet connection to download content from external sources"
  },

  "safety-net": {
    id: "safety-net",
    title: "Safety Net",
    description: "Filter content and manage internet access by device and time",
    icon: "safety",
    type: "internet-required",
    status: "offline",
    capabilities: [
      {
        id: "content-filtering",
        name: "Content Filtering",
        description: "Block inappropriate websites and content",
        requiresInternet: true,
        available: false
      },
      {
        id: "parental-controls",
        name: "Parental Controls",
        description: "Manage children's internet access and screen time",
        requiresInternet: true,
        available: false
      },
      {
        id: "threat-protection",
        name: "Threat Protection",
        description: "Block malware and phishing attempts",
        requiresInternet: true,
        available: false
      }
    ],
    offlineDescription: "Internet required for real-time threat databases and content filtering"
  },

  "email-storage": {
    id: "email-storage",
    title: "Email Storage",
    description: "Host your email inbox content locally",
    icon: "mail",
    type: "internet-required",
    status: "offline",
    capabilities: [
      {
        id: "email-sync",
        name: "Email Synchronization",
        description: "Sync emails from external providers",
        requiresInternet: true,
        available: false
      },
      {
        id: "local-storage",
        name: "Local Email Storage",
        description: "Store emails locally for offline access",
        requiresInternet: false,
        available: true
      },
      {
        id: "email-server",
        name: "Local Email Server",
        description: "Host your own email server",
        requiresInternet: true,
        available: false
      }
    ],
    offlineDescription: "Can view previously synced emails, but requires internet for new mail"
  },

  "game-streaming": {
    id: "game-streaming",
    title: "Game Streaming",
    description: "Stream games from TIM to your device",
    icon: "gamepad",
    type: "hybrid",
    status: "online",
    capabilities: [
      {
        id: "local-streaming",
        name: "Local Game Streaming",
        description: "Stream games over local network",
        requiresInternet: false,
        available: true
      },
      {
        id: "game-library",
        name: "Local Game Library",
        description: "Manage locally installed games",
        requiresInternet: false,
        available: true
      },
      {
        id: "remote-streaming",
        name: "Remote Game Streaming",
        description: "Stream games over the internet",
        requiresInternet: true,
        available: false
      },
      {
        id: "game-downloads",
        name: "Game Downloads",
        description: "Download games from online stores",
        requiresInternet: true,
        available: false
      }
    ],
    offlineDescription: "Local streaming and library management available",
    internetDescription: "Full remote streaming and game downloads when online"
  },

  "media-library": {
    id: "media-library",
    title: "Media Library",
    description: "Local media server for family-friendly content control",
    icon: "play",
    type: "hybrid",
    status: "online",
    capabilities: [
      {
        id: "media-server",
        name: "Local Media Server",
        description: "Stream your media collection locally",
        requiresInternet: false,
        available: true
      },
      {
        id: "media-management",
        name: "Media Management",
        description: "Organize and catalog your media",
        requiresInternet: false,
        available: true
      },
      {
        id: "metadata-fetch",
        name: "Metadata & Artwork",
        description: "Download movie posters and information",
        requiresInternet: true,
        available: false
      },
      {
        id: "subtitle-downloads",
        name: "Subtitle Downloads",
        description: "Download subtitles for your media",
        requiresInternet: true,
        available: false
      }
    ],
    offlineDescription: "Play local media with basic information",
    internetDescription: "Enhanced with metadata, artwork, and subtitles when online"
  }
};

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