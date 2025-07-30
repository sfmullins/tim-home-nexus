import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/contexts/LocaleContext';
import { ArrowRight, Zap, HardDrive, Cpu } from 'lucide-react';

interface UpgradeSuggestionProps {
  currentProduct: string;
  onUpgrade: () => void;
}

const UpgradeSuggestion: React.FC<UpgradeSuggestionProps> = ({ currentProduct, onUpgrade }) => {
  const { currencySymbol } = useLocale();

  if (currentProduct !== 'tiny-tim') return null;

  return (
    <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader className="text-center">
        <Badge className="w-fit mx-auto mb-2 bg-primary/20 text-primary border-primary/30">
          Recommended Upgrade
        </Badge>
        <CardTitle className="text-xl">Need More Power?</CardTitle>
        <p className="text-sm text-muted-foreground">
          Tiny TIM is perfect for basic needs, but Just TIM offers much better value for upgrades
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
            <Cpu className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Better CPU</div>
              <div className="text-xs text-muted-foreground">N97 → N100</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
            <Zap className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Double RAM</div>
              <div className="text-xs text-muted-foreground">8GB → 16GB</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
            <HardDrive className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm font-medium">More Storage</div>
              <div className="text-xs text-muted-foreground">256GB → 500GB</div>
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-3">
          <div className="text-lg font-semibold text-success">
            Save {currencySymbol}50 vs upgrading Tiny TIM
          </div>
          <Button onClick={onUpgrade} className="w-full" size="lg">
            Switch to Just TIM
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-xs text-muted-foreground">
            Your software selections will be preserved
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpgradeSuggestion;