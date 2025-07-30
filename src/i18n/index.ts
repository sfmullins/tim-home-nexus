import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
const resources = {
  'en-IE': {
    translation: {
      nav: {
        home: 'Home',
        store: 'Store',
        about: 'About',
        support: 'Support',
        app: 'TIM App'
      },
      hero: {
        title: 'Own Your Digital Life',
        subtitle: 'TIM puts you in control of your data with local, subscription-free personal servers.',
        cta: 'Configure Your TIM'
      },
      products: {
        tinyTim: 'Tiny TIM',
        justTim: 'Just TIM', 
        timPro: 'TIM Pro',
        timMax: 'TIM Max'
      },
      currency: 'EUR',
      currencySymbol: '€'
    }
  },
  'en-UK': {
    translation: {
      nav: {
        home: 'Home',
        store: 'Store', 
        about: 'About',
        support: 'Support',
        app: 'TIM App'
      },
      hero: {
        title: 'Own Your Digital Life',
        subtitle: 'TIM puts you in control of your data with local, subscription-free personal servers.',
        cta: 'Configure Your TIM'
      },
      products: {
        tinyTim: 'Tiny TIM',
        justTim: 'Just TIM',
        timPro: 'TIM Pro', 
        timMax: 'TIM Max'
      },
      currency: 'GBP',
      currencySymbol: '£'
    }
  },
  'en-US': {
    translation: {
      nav: {
        home: 'Home',
        store: 'Store',
        about: 'About', 
        support: 'Support',
        app: 'TIM App'
      },
      hero: {
        title: 'Own Your Digital Life',
        subtitle: 'TIM puts you in control of your data with local, subscription-free personal servers.',
        cta: 'Configure Your TIM'
      },
      products: {
        tinyTim: 'Tiny TIM',
        justTim: 'Just TIM',
        timPro: 'TIM Pro',
        timMax: 'TIM Max'
      },
      currency: 'USD', 
      currencySymbol: '$'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en-IE', // Default to Ireland
    fallbackLng: 'en-IE',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;