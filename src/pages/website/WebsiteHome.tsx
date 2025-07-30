import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Leaf, TrendingDown, Cpu } from 'lucide-react';

const WebsiteHome = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: TrendingDown,
      title: 'Cost Saving',
      description: 'No monthly subscriptions. Pay once, own forever. Save hundreds compared to cloud services.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays local. No cloud, no tracking, no third-party access. Complete digital sovereignty.'
    },
    {
      icon: Leaf,
      title: 'Environmental',
      description: 'Low power consumption (~6W average) vs. energy-hungry data centers. Better for the planet.'
    },
    {
      icon: Cpu,
      title: 'Tech Excellence',
      description: 'From N97 to Ryzen 5. Expandable RAM, storage, and features. Built for enthusiasts.'
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
                <Link to="/website/store">{t('hero.cta')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/website/about">Learn More</Link>
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
            Why Choose TIM?
          </h2>
          <p className="text-xl text-muted-foreground">
            Four pillars of digital independence
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
              Choose Your TIM
            </h2>
            <p className="text-xl text-muted-foreground">
              From starter to enthusiast, there's a TIM for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Tiny TIM', price: '€299', processor: 'N97', ram: '8GB', storage: '256GB' },
              { name: 'Just TIM', price: '€449', processor: 'N100', ram: '16GB', storage: '500GB' },
              { name: 'TIM Pro', price: '€699', processor: 'N200', ram: '24GB', storage: '1TB' },
              { name: 'TIM Max', price: '€1299', processor: 'Ryzen 5', ram: '64GB', storage: '2TB' }
            ].map((product, index) => (
              <Card key={index} className="border border-border bg-card hover:shadow-accent transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
                    <p className="text-3xl font-bold text-primary">{product.price}</p>
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
                    <Link to="/website/store">Configure</Link>
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
            Ready to Own Your Data?
          </h2>
          <p className="text-xl text-accent-foreground/90 max-w-2xl mx-auto">
            Pre-orders open January 1st, 2026. 50% deposit secures your TIM.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/website/store">Configure Your TIM</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WebsiteHome;