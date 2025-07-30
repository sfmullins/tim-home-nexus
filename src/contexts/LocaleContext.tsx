import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LocaleContextType {
  locale: string;
  currency: string;
  currencySymbol: string;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n, t } = useTranslation();
  const [locale, setLocaleState] = useState(i18n.language);

  const setLocale = (newLocale: string) => {
    i18n.changeLanguage(newLocale);
    setLocaleState(newLocale);
    localStorage.setItem('tim-locale', newLocale);
  };

  useEffect(() => {
    const savedLocale = localStorage.getItem('tim-locale');
    if (savedLocale && savedLocale !== locale) {
      setLocale(savedLocale);
    }
  }, []);

  const currency = t('currency');
  const currencySymbol = t('currencySymbol');

  return (
    <LocaleContext.Provider value={{ locale, currency, currencySymbol, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};