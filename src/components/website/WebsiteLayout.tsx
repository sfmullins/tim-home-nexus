import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import timLogo from '@/assets/tim-logo.png';

const WebsiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();
  const location = useLocation();

  const navigation = [
    { name: t('nav.home'), href: '/website' },
    { name: t('nav.store'), href: '/website/store' },
    { name: t('nav.about'), href: '/website/about' },
    { name: t('nav.support'), href: '/website/support' },
  ];

  const isActive = (href: string) => {
    if (href === '/website') {
      return location.pathname === '/website';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/website" className="flex items-center space-x-2">
                <img src={timLogo} alt="TIM" className="h-8 w-8" />
                <span className="text-xl font-bold text-foreground">TIM</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Locale Selector */}
              <Select value={locale} onValueChange={setLocale}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-IE">🇮🇪 IE</SelectItem>
                  <SelectItem value="en-UK">🇬🇧 UK</SelectItem>
                  <SelectItem value="en-US">🇺🇸 US</SelectItem>
                </SelectContent>
              </Select>

              <Button asChild variant="outline">
                <Link to="/">{t('nav.app')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src={timLogo} alt="TIM" className="h-6 w-6" />
                <span className="font-bold text-foreground">TIM</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Own your digital infrastructure. Keep your data local.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Products</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/website/store" className="hover:text-foreground">Tiny TIM</Link></li>
                <li><Link to="/website/store" className="hover:text-foreground">Just TIM</Link></li>
                <li><Link to="/website/store" className="hover:text-foreground">TIM Pro</Link></li>
                <li><Link to="/website/store" className="hover:text-foreground">TIM Max</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/website/support" className="hover:text-foreground">Documentation</Link></li>
                <li><Link to="/website/support" className="hover:text-foreground">Contact</Link></li>
                <li><Link to="/website/support" className="hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/website/about" className="hover:text-foreground">About</Link></li>
                <li><Link to="/website/about" className="hover:text-foreground">Privacy</Link></li>
                <li><Link to="/website/about" className="hover:text-foreground">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 TIM. Made in Ireland. No cloud. No subscriptions. No compromise.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebsiteLayout;