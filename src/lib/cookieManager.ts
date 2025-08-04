export type CookieCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

export interface CookieDefinition {
  name: string;
  category: CookieCategory;
  purpose: string;
  duration: string;
  provider: string;
  required: boolean;
}

export interface CookieConsent {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: Date;
  version: string;
}

class CookieManager {
  private readonly CONSENT_KEY = 'tim-cookie-consent';
  private readonly CONSENT_VERSION = '1.0';
  private consent: CookieConsent | null = null;
  private listeners: Array<(consent: CookieConsent) => void> = [];

  private readonly cookieDefinitions: CookieDefinition[] = [
    {
      name: 'tim-auth-token',
      category: 'necessary',
      purpose: 'Authentication and security',
      duration: '24 hours',
      provider: 'TIM Local',
      required: true
    },
    {
      name: 'tim-preferences',
      category: 'functional',
      purpose: 'Remember user interface preferences',
      duration: '1 year',
      provider: 'TIM Local',
      required: false
    },
    {
      name: 'tim-sidebar-state',
      category: 'functional',
      purpose: 'Remember sidebar open/closed state',
      duration: 'Session',
      provider: 'TIM Local',
      required: false
    },
    {
      name: 'tim-theme',
      category: 'functional',
      purpose: 'Remember dark/light theme preference',
      duration: '1 year',
      provider: 'TIM Local',
      required: false
    }
  ];

  constructor() {
    this.loadConsent();
  }

  private loadConsent(): void {
    try {
      const stored = localStorage.getItem(this.CONSENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.consent = {
          ...parsed,
          timestamp: new Date(parsed.timestamp)
        };
      }
    } catch (error) {
      console.warn('Failed to load cookie consent:', error);
    }
  }

  private saveConsent(): void {
    if (this.consent) {
      try {
        localStorage.setItem(this.CONSENT_KEY, JSON.stringify(this.consent));
        this.notifyListeners();
      } catch (error) {
        console.warn('Failed to save cookie consent:', error);
      }
    }
  }

  private notifyListeners(): void {
    if (this.consent) {
      this.listeners.forEach(listener => listener(this.consent!));
    }
  }

  public getConsent(): CookieConsent | null {
    return this.consent;
  }

  public hasValidConsent(): boolean {
    if (!this.consent) return false;
    
    // Check if consent is expired (1 year)
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    return this.consent.timestamp > oneYearAgo && this.consent.version === this.CONSENT_VERSION;
  }

  public needsConsent(): boolean {
    return !this.hasValidConsent();
  }

  public setConsent(consent: Partial<CookieConsent>): void {
    this.consent = {
      necessary: true, // Always required
      functional: consent.functional ?? false,
      analytics: consent.analytics ?? false,
      marketing: consent.marketing ?? false,
      timestamp: new Date(),
      version: this.CONSENT_VERSION,
      ...consent
    };
    this.saveConsent();
    this.enforceCookiePolicy();
  }

  public acceptAll(): void {
    this.setConsent({
      functional: true,
      analytics: true,
      marketing: true
    });
  }

  public rejectAll(): void {
    this.setConsent({
      functional: false,
      analytics: false,
      marketing: false
    });
  }

  public canUseCategory(category: CookieCategory): boolean {
    if (!this.consent) return category === 'necessary';
    return this.consent[category];
  }

  public getCookieDefinitions(): CookieDefinition[] {
    return this.cookieDefinitions;
  }

  public getCookiesByCategory(category: CookieCategory): CookieDefinition[] {
    return this.cookieDefinitions.filter(cookie => cookie.category === category);
  }

  private enforceCookiePolicy(): void {
    if (!this.consent) return;

    // Remove non-consented cookies
    this.cookieDefinitions.forEach(cookieDef => {
      if (!cookieDef.required && !this.canUseCategory(cookieDef.category)) {
        this.deleteCookie(cookieDef.name);
      }
    });
  }

  private deleteCookie(name: string): void {
    try {
      localStorage.removeItem(name);
      sessionStorage.removeItem(name);
      // For actual HTTP cookies, you'd set expires to past date
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } catch (error) {
      console.warn(`Failed to delete cookie ${name}:`, error);
    }
  }

  public withdrawConsent(): void {
    this.consent = null;
    localStorage.removeItem(this.CONSENT_KEY);
    this.enforceCookiePolicy();
    this.notifyListeners();
  }

  public onConsentChange(listener: (consent: CookieConsent) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Wrapper functions for safe cookie usage
  public setFunctionalCookie(name: string, value: string): boolean {
    if (this.canUseCategory('functional')) {
      try {
        localStorage.setItem(name, value);
        return true;
      } catch (error) {
        console.warn(`Failed to set functional cookie ${name}:`, error);
      }
    }
    return false;
  }

  public getFunctionalCookie(name: string): string | null {
    if (this.canUseCategory('functional')) {
      try {
        return localStorage.getItem(name);
      } catch (error) {
        console.warn(`Failed to get functional cookie ${name}:`, error);
      }
    }
    return null;
  }

  public logCookieAccess(name: string, action: 'read' | 'write' | 'delete'): void {
    if (this.canUseCategory('analytics')) {
      console.log(`Cookie ${action}: ${name} at ${new Date().toISOString()}`);
    }
  }
}

export const cookieManager = new CookieManager();