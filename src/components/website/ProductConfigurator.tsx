import React, { useState } from 'react';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { useLocale } from '@/contexts/LocaleContext';
import { products, softwareAddons } from '@/data/products';
import { ProductConfig, ConfigurationState } from '@/types/product';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Check, Star, Zap } from 'lucide-react';
import UpgradeSuggestion from './UpgradeSuggestion';

const ProductConfigurator = () => {
  const { configuration, setConfiguration, updateConfiguration } = useConfiguration();
  const { currencySymbol } = useLocale();
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, name: 'Choose Model', icon: Star },
    { id: 2, name: 'Configure Hardware', icon: Zap },
    { id: 3, name: 'Add Software', icon: Check },
    { id: 4, name: 'Review & Order', icon: ChevronRight }
  ];

  const selectProduct = (product: ProductConfig) => {
    const newConfig: ConfigurationState = {
      selectedProduct: product,
      includeJailbreak: product.includesJailbreak || false,
      selectedSoftware: configuration?.selectedSoftware || [],
      totalPrice: product.basePrice
    };
    setConfiguration(newConfig);
    setStep(2);
  };

  const switchToJustTim = () => {
    const justTim = products.find(p => p.id === 'just-tim');
    if (justTim) {
      selectProduct(justTim);
    }
  };

  const formatPrice = (price: number) => `${currencySymbol}${price}`;

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Choose Your TIM Model</h2>
        <p className="text-muted-foreground">Select the perfect TIM for your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className={`relative cursor-pointer transition-all hover:shadow-lg ${
              product.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
            }`}
            onClick={() => selectProduct(product)}
          >
            {product.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-xl">{product.name}</CardTitle>
              <div className="text-2xl font-bold text-primary">{formatPrice(product.basePrice)}</div>
              {product.savings && (
                <div className="text-sm text-success">{product.savings}</div>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processor:</span>
                  <span className="font-medium">{product.processor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RAM:</span>
                  <span className="font-medium">{product.baseRam}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Storage:</span>
                  <span className="font-medium">{product.baseStorage}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Included:</h4>
                <ul className="text-xs space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-muted-foreground flex items-center">
                      <Check className="w-3 h-3 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full" variant={product.popular ? "default" : "outline"}>
                Select {product.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => {
    if (!configuration) return null;

    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Configure {configuration.selectedProduct.name}</h2>
          <p className="text-muted-foreground">Customize your hardware specifications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Upgrade Suggestion for Tiny TIM */}
            {configuration.selectedProduct.id === 'tiny-tim' && (
              <UpgradeSuggestion 
                currentProduct={configuration.selectedProduct.id}
                onUpgrade={switchToJustTim}
              />
            )}

            {/* RAM Configuration */}
            {configuration.selectedProduct.ramUpgrades && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Memory (RAM)</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Base: {configuration.selectedProduct.baseRam}
                  </p>
                </CardHeader>
                <CardContent>
                  <Select 
                    value={configuration.selectedRam?.id || 'base'} 
                    onValueChange={(value) => {
                      const upgrade = value === 'base' ? undefined : 
                        configuration.selectedProduct.ramUpgrades?.find(u => u.id === value);
                      updateConfiguration({ selectedRam: upgrade });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select RAM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base">
                        {configuration.selectedProduct.baseRam} (Base)
                      </SelectItem>
                      {configuration.selectedProduct.ramUpgrades.map((upgrade) => (
                        <SelectItem key={upgrade.id} value={upgrade.id}>
                          {upgrade.name} (+{formatPrice(upgrade.price)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* Storage Configuration */}
            {configuration.selectedProduct.storageUpgrades && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Internal Storage</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Base: {configuration.selectedProduct.baseStorage}
                  </p>
                </CardHeader>
                <CardContent>
                  <Select 
                    value={configuration.selectedStorage?.id || 'base'} 
                    onValueChange={(value) => {
                      const upgrade = value === 'base' ? undefined : 
                        configuration.selectedProduct.storageUpgrades?.find(u => u.id === value);
                      updateConfiguration({ selectedStorage: upgrade });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Storage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base">
                        {configuration.selectedProduct.baseStorage} (Base)
                      </SelectItem>
                      {configuration.selectedProduct.storageUpgrades.map((upgrade) => (
                        <SelectItem key={upgrade.id} value={upgrade.id}>
                          {upgrade.name} (+{formatPrice(upgrade.price)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* External Storage (TIM Max only) */}
            {configuration.selectedProduct.externalUpgrades && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">External Storage</CardTitle>
                  <p className="text-sm text-muted-foreground">Optional additional storage</p>
                </CardHeader>
                <CardContent>
                  <Select 
                    value={configuration.selectedExternal?.id || 'none'} 
                    onValueChange={(value) => {
                      const upgrade = value === 'none' ? undefined : 
                        configuration.selectedProduct.externalUpgrades?.find(u => u.id === value);
                      updateConfiguration({ selectedExternal: upgrade });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select External Storage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {configuration.selectedProduct.externalUpgrades.map((upgrade) => (
                        <SelectItem key={upgrade.id} value={upgrade.id}>
                          {upgrade.name} (+{formatPrice(upgrade.price)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* GPU (TIM Max only) */}
            {configuration.selectedProduct.gpuUpgrades && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">External GPU</CardTitle>
                  <p className="text-sm text-muted-foreground">Optional eGPU for enhanced performance</p>
                </CardHeader>
                <CardContent>
                  <Select 
                    value={configuration.selectedGpu?.id || 'none'} 
                    onValueChange={(value) => {
                      const upgrade = value === 'none' ? undefined : 
                        configuration.selectedProduct.gpuUpgrades?.find(u => u.id === value);
                      updateConfiguration({ selectedGpu: upgrade });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select GPU" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {configuration.selectedProduct.gpuUpgrades.map((upgrade) => (
                        <SelectItem key={upgrade.id} value={upgrade.id}>
                          {upgrade.name} (+{formatPrice(upgrade.price)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* Jailbreak Option */}
            {configuration.selectedProduct.allowsJailbreak && !configuration.selectedProduct.includesJailbreak && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Jailbreak Access</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Enable custom applet installation and advanced features
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="jailbreak"
                      checked={configuration.includeJailbreak}
                      onCheckedChange={(checked) => updateConfiguration({ includeJailbreak: !!checked })}
                    />
                    <label htmlFor="jailbreak" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Enable Jailbreak (+{formatPrice(configuration.selectedProduct.jailbreakPrice!)})
                    </label>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Configuration Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Configuration Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base {configuration.selectedProduct.name}</span>
                    <span>{formatPrice(configuration.selectedProduct.basePrice)}</span>
                  </div>
                  
                  {configuration.selectedRam && (
                    <div className="flex justify-between text-sm">
                      <span>RAM: {configuration.selectedRam.name}</span>
                      <span>+{formatPrice(configuration.selectedRam.price)}</span>
                    </div>
                  )}
                  
                  {configuration.selectedStorage && (
                    <div className="flex justify-between text-sm">
                      <span>Storage: {configuration.selectedStorage.name}</span>
                      <span>+{formatPrice(configuration.selectedStorage.price)}</span>
                    </div>
                  )}
                  
                  {configuration.selectedExternal && (
                    <div className="flex justify-between text-sm">
                      <span>External: {configuration.selectedExternal.name}</span>
                      <span>+{formatPrice(configuration.selectedExternal.price)}</span>
                    </div>
                  )}
                  
                  {configuration.selectedGpu && (
                    <div className="flex justify-between text-sm">
                      <span>GPU: {configuration.selectedGpu.name}</span>
                      <span>+{formatPrice(configuration.selectedGpu.price)}</span>
                    </div>
                  )}
                  
                  {configuration.includeJailbreak && configuration.selectedProduct.jailbreakPrice && (
                    <div className="flex justify-between text-sm">
                      <span>Jailbreak Access</span>
                      <span>+{formatPrice(configuration.selectedProduct.jailbreakPrice)}</span>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(configuration.totalPrice)}</span>
                </div>
                
                <Button className="w-full" onClick={() => setStep(3)}>
                  Continue to Software
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-center space-x-8">
          {steps.map((stepItem, index) => (
            <div key={stepItem.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= stepItem.id 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-muted bg-background text-muted-foreground'
              }`}>
                <stepItem.icon className="w-5 h-5" />
              </div>
              <span className={`ml-3 text-sm font-medium ${
                step >= stepItem.id ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {stepItem.name}
              </span>
              {index < steps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-muted-foreground ml-8" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Software Add-ons</h2>
          <p className="text-muted-foreground mb-8">Coming soon in next phase...</p>
          <Button onClick={() => setStep(4)}>Continue to Review</Button>
        </div>
      )}
      {step === 4 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Review & Order</h2>
          <p className="text-muted-foreground mb-8">Coming soon in next phase...</p>
          <Button disabled>Pre-order Opens Jan 1st, 2026</Button>
        </div>
      )}
    </div>
  );
};

export default ProductConfigurator;