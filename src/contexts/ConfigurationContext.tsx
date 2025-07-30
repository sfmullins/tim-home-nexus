import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigurationState, ProductConfig } from '@/types/product';
import { useLocale } from '@/contexts/LocaleContext';

interface ConfigurationContextType {
  configuration: ConfigurationState | null;
  setConfiguration: (config: ConfigurationState) => void;
  updateConfiguration: (updates: Partial<ConfigurationState>) => void;
  calculateTotal: () => number;
  clearConfiguration: () => void;
}

const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined);

export const useConfiguration = () => {
  const context = useContext(ConfigurationContext);
  if (!context) {
    throw new Error('useConfiguration must be used within a ConfigurationProvider');
  }
  return context;
};

export const ConfigurationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [configuration, setConfigurationState] = useState<ConfigurationState | null>(null);
  const { currencySymbol } = useLocale();

  const setConfiguration = (config: ConfigurationState) => {
    setConfigurationState(config);
    localStorage.setItem('tim-configuration', JSON.stringify(config));
  };

  const updateConfiguration = (updates: Partial<ConfigurationState>) => {
    if (!configuration) return;
    
    const updated = { ...configuration, ...updates };
    updated.totalPrice = calculateTotalForConfig(updated);
    setConfiguration(updated);
  };

  const calculateTotalForConfig = (config: ConfigurationState): number => {
    let total = config.selectedProduct.basePrice;
    
    if (config.selectedRam) total += config.selectedRam.price;
    if (config.selectedStorage) total += config.selectedStorage.price;
    if (config.selectedExternal) total += config.selectedExternal.price;
    if (config.selectedGpu) total += config.selectedGpu.price;
    
    if (config.includeJailbreak && config.selectedProduct.jailbreakPrice) {
      total += config.selectedProduct.jailbreakPrice;
    }
    
    // Software add-ons (50% discount when purchased with hardware)
    config.selectedSoftware.forEach(software => {
      switch (software) {
        case 'game-streaming':
          total += 99; // 50% off €199
          break;
        case 'downloads':
          total += 49; // 50% off €99
          break;
      }
    });
    
    return total;
  };

  const calculateTotal = () => {
    return configuration ? calculateTotalForConfig(configuration) : 0;
  };

  const clearConfiguration = () => {
    setConfigurationState(null);
    localStorage.removeItem('tim-configuration');
  };

  // Load saved configuration on mount
  useEffect(() => {
    const saved = localStorage.getItem('tim-configuration');
    if (saved) {
      try {
        const config = JSON.parse(saved);
        config.totalPrice = calculateTotalForConfig(config);
        setConfigurationState(config);
      } catch (error) {
        console.error('Failed to load saved configuration:', error);
      }
    }
  }, []);

  return (
    <ConfigurationContext.Provider
      value={{
        configuration,
        setConfiguration,
        updateConfiguration,
        calculateTotal,
        clearConfiguration,
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};