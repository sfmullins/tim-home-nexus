import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const WebsiteStore = () => {
  const { t } = useTranslation();

  const products = [
    {
      id: 'tiny-tim',
      name: t('products.tinyTim'),
      price: 299,
      processor: 'N97',
      ram: '8GB',
      storage: '256GB M.2',
      features: ['File Server', 'Smart Home', 'VPN Access'],
      upgrades: {
        ram: [{ size: '16GB', price: 50 }, { size: '32GB', price: 150 }],
        storage: [{ size: '500GB', price: 50 }, { size: '1TB', price: 150 }]
      },
      popular: false
    },
    {
      id: 'just-tim',
      name: t('products.justTim'),
      price: 449,
      processor: 'N100',
      ram: '16GB',
      storage: '500GB M.2',
      features: ['File Server', 'Smart Home', 'VPN Access', 'Game Streaming*', 'Downloads*'],
      upgrades: {
        ram: [{ size: '32GB', price: 100 }],
        storage: [{ size: '1TB', price: 100 }, { size: '2TB', price: 250 }]
      },
      popular: true,
      savings: '€50 vs upgrading Tiny TIM'
    },
    {
      id: 'tim-pro',
      name: t('products.timPro'),
      price: 699,
      processor: 'N200',
      ram: '24GB (2x12)',
      storage: '1TB M.2',
      features: ['File Server', 'Smart Home', 'VPN Access', 'Game Streaming*', 'Downloads*', 'Jailbreak (€350)**'],
      upgrades: {
        storage: [{ size: '2TB', price: 150 }]
      },
      popular: false
    },
    {
      id: 'tim-max',
      name: t('products.timMax'),
      price: 1299,
      processor: 'Ryzen 5',
      ram: '64GB',
      storage: '2TB M.2',
      features: ['All Features Included', 'Jailbreak Included', 'External Storage up to 10TB', 'eGPU Support (RTX 3xxx-5xxx)'],
      upgrades: {
        external: [
          { size: '4TB External', price: 200 },
          { size: '8TB External', price: 400 },
          { size: '10TB External', price: 600 }
        ],
        gpu: [
          { model: 'RTX 3060', price: 300 },
          { model: 'RTX 4060', price: 500 },
          { model: 'RTX 4070', price: 700 }
        ]
      },
      popular: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-foreground">TIM Store</h1>
        <p className="text-xl text-muted-foreground">
          Configure your perfect personal server
        </p>
        <div className="flex justify-center space-x-2 text-sm text-muted-foreground">
          <span>* 50% discount when purchased with hardware</span>
          <span>** One-time jailbreak fee for TIM Pro</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <Card key={product.id} className={`relative border ${product.popular ? 'border-primary shadow-primary/20' : 'border-border'} bg-card hover:shadow-lg transition-shadow`}>
            {product.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl">{product.name}</CardTitle>
              <div className="text-3xl font-bold text-primary">€{product.price}</div>
              {product.savings && (
                <div className="text-sm text-success">{product.savings}</div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processor:</span>
                    <span className="font-medium">{product.processor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RAM:</span>
                    <span className="font-medium">{product.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span className="font-medium">{product.storage}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Included Features:</h4>
                <ul className="text-sm space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-muted-foreground flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Available Upgrades:</h4>
                <div className="space-y-2 text-xs">
                  {product.upgrades.ram && (
                    <div>
                      <span className="text-muted-foreground">RAM: </span>
                      {product.upgrades.ram.map((upgrade, index) => (
                        <span key={index} className="text-foreground">
                          {upgrade.size} (+€{upgrade.price})
                          {index < product.upgrades.ram!.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  )}
                  {product.upgrades.storage && (
                    <div>
                      <span className="text-muted-foreground">Storage: </span>
                      {product.upgrades.storage.map((upgrade, index) => (
                        <span key={index} className="text-foreground">
                          {upgrade.size} (+€{upgrade.price})
                          {index < product.upgrades.storage!.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  )}
                  {product.upgrades.external && (
                    <div>
                      <span className="text-muted-foreground">External: </span>
                      {product.upgrades.external.map((upgrade, index) => (
                        <span key={index} className="text-foreground">
                          {upgrade.size} (+€{upgrade.price})
                          {index < product.upgrades.external!.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  )}
                  {product.upgrades.gpu && (
                    <div>
                      <span className="text-muted-foreground">eGPU: </span>
                      {product.upgrades.gpu.map((upgrade, index) => (
                        <span key={index} className="text-foreground">
                          {upgrade.model} (+€{upgrade.price})
                          {index < product.upgrades.gpu!.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Button className="w-full" variant={product.popular ? "default" : "outline"}>
                Configure {product.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-surface rounded-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Pre-Orders Start January 1st, 2026</h2>
        <p className="text-muted-foreground">
          Secure your TIM with a 50% deposit. Full payment required before shipping in Q2 2026.
        </p>
        <div className="space-x-4">
          <Button variant="outline">Join Waitlist</Button>
          <Button>Get Notified</Button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteStore;