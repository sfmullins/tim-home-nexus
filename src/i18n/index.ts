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
      features: {
        costSaving: 'Cost Saving',
        costSavingDesc: 'No monthly subscriptions. Pay once, own forever. Save hundreds compared to cloud services.',
        privacyFirst: 'Privacy First',
        privacyFirstDesc: 'Your data stays local. No cloud, no tracking, no third-party access. Complete digital sovereignty.',
        environmental: 'Environmental',
        environmentalDesc: 'Low power consumption (~6W average) vs. energy-hungry data centers. Better for the planet.',
        techExcellence: 'Tech Excellence',
        techExcellenceDesc: 'From N97 to Ryzen 5. Expandable RAM, storage, and features. Built for enthusiasts.'
      },
      sections: {
        whyChooseTim: 'Why Choose TIM?',
        fourPillars: 'Four pillars of digital independence',
        chooseYourTim: 'Choose Your TIM',
        everyoneHasTim: 'From starter to enthusiast, there is a TIM for everyone',
        readyToOwn: 'Ready to Own Your Data?',
        preOrderInfo: 'Pre-orders open January 1st, 2026. 50% deposit secures your TIM.'
      },
      buttons: {
        learnMore: 'Learn More',
        configure: 'Configure',
        configureYourTim: 'Configure Your TIM'
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
      features: {
        costSaving: 'Cost Saving',
        costSavingDesc: 'No monthly subscriptions. Pay once, own forever. Save hundreds compared to cloud services.',
        privacyFirst: 'Privacy First',
        privacyFirstDesc: 'Your data stays local. No cloud, no tracking, no third-party access. Complete digital sovereignty.',
        environmental: 'Environmental',
        environmentalDesc: 'Low power consumption (~6W average) vs. energy-hungry data centres. Better for the planet.',
        techExcellence: 'Tech Excellence',
        techExcellenceDesc: 'From N97 to Ryzen 5. Expandable RAM, storage, and features. Built for enthusiasts.'
      },
      sections: {
        whyChooseTim: 'Why Choose TIM?',
        fourPillars: 'Four pillars of digital independence',
        chooseYourTim: 'Choose Your TIM',
        everyoneHasTim: 'From starter to enthusiast, there is a TIM for everyone',
        readyToOwn: 'Ready to Own Your Data?',
        preOrderInfo: 'Pre-orders open 1st January 2026. 50% deposit secures your TIM.'
      },
      buttons: {
        learnMore: 'Learn More',
        configure: 'Configure',
        configureYourTim: 'Configure Your TIM'
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
      features: {
        costSaving: 'Cost Saving',
        costSavingDesc: 'No monthly subscriptions. Pay once, own forever. Save hundreds compared to cloud services.',
        privacyFirst: 'Privacy First',
        privacyFirstDesc: 'Your data stays local. No cloud, no tracking, no third-party access. Complete digital sovereignty.',
        environmental: 'Environmental',
        environmentalDesc: 'Low power consumption (~6W average) vs. energy-hungry data centers. Better for the planet.',
        techExcellence: 'Tech Excellence',
        techExcellenceDesc: 'From N97 to Ryzen 5. Expandable RAM, storage, and features. Built for enthusiasts.'
      },
      sections: {
        whyChooseTim: 'Why Choose TIM?',
        fourPillars: 'Four pillars of digital independence',
        chooseYourTim: 'Choose Your TIM',
        everyoneHasTim: 'From starter to enthusiast, there is a TIM for everyone',
        readyToOwn: 'Ready to Own Your Data?',
        preOrderInfo: 'Pre-orders open January 1st, 2026. 50% deposit secures your TIM.'
      },
      buttons: {
        learnMore: 'Learn More',
        configure: 'Configure',
        configureYourTim: 'Configure Your TIM'
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