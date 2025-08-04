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