import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderContextType = {
  theme: string | undefined;
  setTheme: (theme: Theme) => void;
  isConsumerMode: boolean;
  isDeveloperMode: boolean;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [theme, setTheme] = useState<string | undefined>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isConsumerMode = theme === 'light';
  const isDeveloperMode = theme === 'dark';

  const value = {
    theme,
    setTheme: (newTheme: Theme) => setTheme(newTheme),
    isConsumerMode,
    isDeveloperMode,
  };

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeProviderContext.Provider value={value}>
        {children}
      </ThemeProviderContext.Provider>
    </NextThemesProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};