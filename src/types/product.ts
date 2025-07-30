export interface ProductUpgrade {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface ProductConfig {
  id: string;
  name: string;
  basePrice: number;
  processor: string;
  baseRam: string;
  baseStorage: string;
  features: string[];
  ramUpgrades?: ProductUpgrade[];
  storageUpgrades?: ProductUpgrade[];
  externalUpgrades?: ProductUpgrade[];
  gpuUpgrades?: ProductUpgrade[];
  maxRam?: string;
  allowsJailbreak?: boolean;
  jailbreakPrice?: number;
  includesJailbreak?: boolean;
  popular?: boolean;
  savings?: string;
}

export interface ConfigurationState {
  selectedProduct: ProductConfig;
  selectedRam?: ProductUpgrade;
  selectedStorage?: ProductUpgrade;
  selectedExternal?: ProductUpgrade;
  selectedGpu?: ProductUpgrade;
  includeJailbreak: boolean;
  selectedSoftware: string[];
  totalPrice: number;
}