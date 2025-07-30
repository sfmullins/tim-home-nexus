import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CurrencyDisplay from '@/components/website/CurrencyDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Leaf, TrendingDown, Cpu } from 'lucide-react';

const WebsiteHome = () => {
  const { t } = useTranslation();
  
  // This will be passed to WebsiteLayout for SEO
  const seoConfig = {
    title: 'TIM - This is Mine | Personal Server Solutions Made in Ireland',
    description: 'Own your digital infrastructure with TIM personal servers. No cloud dependencies, no subscriptions, no compromise. Pre-orders start January 2026.',
    keywords: 'personal server, self hosting, privacy, data ownership, home server, ireland, TIM, digital independence',
    type: 'website' as const
  };

  const features = [
    {
      icon: TrendingDown,
      title: t('features.costSaving'),
      description: t('features.costSavingDesc')
    },
    {
      icon: Shield,
      title: t('features.privacyFirst'),
      description: t('features.privacyFirstDesc')
    },
    {
      icon: Leaf,
      title: t('features.environmental'),
      description: t('features.environmentalDesc')
    },
    {
      icon: Cpu,
      title: t('features.techExcellence'),
      description: t('features.techExcellenceDesc')
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/website/configure">{t('hero.cta')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/website/about">{t('buttons.learnMore')}</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-accent opacity-20"></div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('sections.whyChooseTim')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('sections.fourPillars')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border bg-card/50 hover:bg-card transition-colors">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('sections.chooseYourTim')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('sections.everyoneHasTim')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Tiny TIM', price: 299, processor: 'N97', ram: '8GB', storage: '256GB' },
              { name: 'Just TIM', price: 449, processor: 'N100', ram: '16GB', storage: '500GB' },
              { name: 'TIM Pro', price: 699, processor: 'N200', ram: '24GB', storage: '1TB' },
              { name: 'TIM Max', price: 1299, processor: 'Ryzen 5', ram: '64GB', storage: '2TB' }
            ].map((product, index) => (
              <Card key={index} className="border border-border bg-card hover:shadow-accent transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
                    <p className="text-3xl font-bold text-primary">
                      <CurrencyDisplay amount={product.price} />
                    </p>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Processor:</span>
                      <span className="text-foreground">{product.processor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RAM:</span>
                      <span className="text-foreground">{product.ram}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage:</span>
                      <span className="text-foreground">{product.storage}</span>
                    </div>
                  </div>
                  <Button asChild className="w-full" variant="outline">
                    <Link to="/website/configure">{t('buttons.configure')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-accent rounded-lg p-12 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground">
            {t('sections.readyToOwn')}
          </h2>
          <p className="text-xl text-accent-foreground/90 max-w-2xl mx-auto">
            {t('sections.preOrderInfo')}
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/website/configure">{t('buttons.configureYourTim')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WebsiteHome;