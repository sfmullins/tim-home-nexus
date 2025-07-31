import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CurrencyDisplay from '@/components/website/CurrencyDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Leaf, Award, Crown, Heart, Lock } from 'lucide-react';
import { useTheme } from 'next-themes';
import tinyTimImage from '@/assets/Tiny Tim.png';
import timMaxImage from '@/assets/TIM Max - Brushed Aluminium.png';

const WebsiteHome = () => {
  const { t } = useTranslation();
  
  const { theme } = useTheme();
  const isConsumerMode = theme === 'light';
  
  // This will be passed to WebsiteLayout for SEO
  const seoConfig = {
    title: 'TIM - Premium Personal Servers | Crafted in Ireland',
    description: 'Experience premium digital independence with TIM personal servers. Irish craftsmanship meets cutting-edge technology. Lifetime ownership, no subscriptions.',
    keywords: 'premium personal server, irish made, luxury technology, self hosting, privacy, data ownership, home server, ireland, TIM, digital independence',
    type: 'website' as const
  };

  const features = isConsumerMode ? [
    {
      icon: Crown,
      title: 'Premium Quality',
      description: 'Meticulously crafted in Ireland with premium materials and uncompromising attention to detail.'
    },
    {
      icon: Heart,
      title: 'Family Trust',
      description: 'Protect your family\'s digital life with enterprise-grade security in a home-friendly package.'
    },
    {
      icon: Award,
      title: 'Lifetime Ownership',
      description: 'No monthly fees, no cloud dependencies. Buy once, own forever with free software updates.'
    },
    {
      icon: Shield,
      title: 'Irish Craftsmanship',
      description: 'Designed and assembled in Ireland with pride, quality, and unwavering commitment to excellence.'
    }
  ] : [
    {
      icon: Lock,
      title: 'Complete Privacy',
      description: 'Zero telemetry, no cloud dependencies. Your data never leaves your network.'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Military-grade encryption, isolated network segments, and hardened OS configurations.'
    },
    {
      icon: Leaf,
      title: 'Efficient Performance',
      description: 'Optimized power consumption with professional-grade performance for 24/7 operation.'
    },
    {
      icon: Award,
      title: 'Open Architecture',
      description: 'Full root access, custom firmware support, and unlimited expansion possibilities.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                🇮🇪 Proudly Made in Ireland
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                {isConsumerMode ? 'Your Digital Life,' : 'Own Your Data,'}
                <br />
                <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  {isConsumerMode ? 'Your Rules' : 'Own Your Future'}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                {isConsumerMode 
                  ? 'Experience the luxury of complete digital independence. Premium personal servers that put you back in control.'
                  : 'Self-hosted infrastructure with enterprise-grade security. No cloud dependencies, no subscriptions, no compromises.'
                }
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="xl" variant="secondary" className="text-lg font-semibold min-w-[200px]">
                <Link to="/website/configure">Configure Your TIM</Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10 min-w-[200px]">
                <Link to="/website/about">Discover Quality</Link>
              </Button>
            </div>
            <div className="text-sm text-white/70 space-y-1">
              <p>✓ Lifetime ownership  ✓ No subscriptions  ✓ Premium support</p>
              <p className="font-medium">Pre-orders starting January 2026</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {isConsumerMode ? 'Why Families Choose TIM' : 'Why Developers Trust TIM'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {isConsumerMode 
              ? 'Premium technology designed for modern families who value privacy, quality, and peace of mind.'
              : 'Professional-grade infrastructure for developers who demand complete control and uncompromising performance.'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border bg-gradient-surface hover:shadow-premium transition-all duration-300 group">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-xl flex items-center justify-center shadow-primary group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-gradient-surface py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Choose Your Perfect TIM
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From compact power to professional performance. Each TIM is meticulously crafted with premium materials and Irish attention to detail.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: 'Tiny TIM', 
                price: 299, 
                processor: 'Intel N97', 
                ram: '8GB', 
                storage: '256GB',
                image: tinyTimImage,
                description: 'Perfect for home users',
                popular: false
              },
              { 
                name: 'Just TIM', 
                price: 449, 
                processor: 'Intel N100', 
                ram: '16GB', 
                storage: '500GB',
                image: tinyTimImage,
                description: 'Ideal for small families',
                popular: true
              },
              { 
                name: 'TIM Pro', 
                price: 699, 
                processor: 'Intel N200', 
                ram: '24GB', 
                storage: '1TB',
                image: tinyTimImage,
                description: 'For power users',
                popular: false
              },
              { 
                name: 'TIM Max', 
                price: 1299, 
                processor: 'AMD Ryzen 5', 
                ram: '64GB', 
                storage: '2TB',
                image: timMaxImage,
                description: 'Professional performance',
                popular: false
              }
            ].map((product, index) => (
              <Card key={index} className={`relative border border-border bg-card hover:shadow-premium transition-all duration-300 group ${product.popular ? 'ring-2 ring-primary shadow-primary' : ''}`}>
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-8 space-y-6">
                  <div className="aspect-square relative overflow-hidden rounded-lg bg-gradient-surface group-hover:bg-gradient-premium transition-all duration-300">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-primary">
                        <CurrencyDisplay amount={product.price} />
                      </span>
                      <span className="text-sm text-muted-foreground">starting</span>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Processor</span>
                      <span className="font-medium text-foreground">{product.processor}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Memory</span>
                      <span className="font-medium text-foreground">{product.ram}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Storage</span>
                      <span className="font-medium text-foreground">{product.storage}</span>
                    </div>
                  </div>
                  <Button asChild className="w-full" variant={product.popular ? "default" : "outline"} size="lg">
                    <Link to="/website/configure">Configure & Order</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">All models include laser etching personalization available</p>
            <Button asChild variant="ghost" className="text-primary">
              <Link to="/website/store">View detailed specifications →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-hero rounded-2xl p-16 text-center space-y-8 shadow-premium">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {isConsumerMode ? 'Ready to Take Control?' : 'Ready to Own Your Infrastructure?'}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {isConsumerMode 
                ? 'Join thousands of families who\'ve chosen premium digital independence. Configure your TIM with laser engraving personalization.'
                : 'Start building your self-hosted infrastructure today. Professional-grade hardware with unlimited possibilities.'
              }
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" variant="secondary" className="text-lg font-semibold">
              <Link to="/website/configure">Configure Your TIM</Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link to="/website/about">Learn About Quality</Link>
            </Button>
          </div>
          <div className="text-sm text-white/80 space-y-2">
            <p>🏆 Premium Irish craftsmanship  •  🛡️ Lifetime ownership  •  🚫 No subscriptions ever</p>
            <p className="font-medium">Pre-orders open January 2026 • Limited edition laser engraving available</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebsiteHome;