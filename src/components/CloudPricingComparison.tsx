import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, DollarSign, Calendar, Calculator, Shield, Crown } from "lucide-react";
import { cloudProviders, cloudPricing, TIMModel } from "@/lib/cloudPricing";

const CloudPricingComparison = () => {
  const [selectedStorage, setSelectedStorage] = useState(500); // GB
  const [selectedYears, setSelectedYears] = useState(5);
  const [selectedTIMModel, setSelectedTIMModel] = useState<TIMModel>("tim-pro");
  const [calculations, setCalculations] = useState<any[]>([]);

  useEffect(() => {
    const recommendation = cloudPricing.getRecommendedTIMModel(selectedStorage);
    setSelectedTIMModel(recommendation.model);
    
    const savings = cloudPricing.calculateSavings(recommendation.model, selectedStorage);
    const lifetimeSavings = cloudPricing.getTotalLifetimeSavings(recommendation.model, selectedStorage, selectedYears);
    
    setCalculations(lifetimeSavings.slice(0, 6)); // Show top 6 comparisons
  }, [selectedStorage, selectedYears]);

  const timModels = {
    'tim-tiny': { name: 'TIM Tiny', storage: 256, cost: 149, color: 'bg-blue-500' },
    'tim-just': { name: 'TIM Just', storage: 512, cost: 299, color: 'bg-green-500' },
    'tim-pro': { name: 'TIM Pro', storage: 1000, cost: 499, color: 'bg-purple-500' },
    'tim-max': { name: 'TIM Max', storage: 2000, cost: 799, color: 'bg-orange-500' }
  };

  const selectedModel = timModels[selectedTIMModel];
  
  const getProviderLogo = (provider: string) => {
    const logos: Record<string, string> = {
      'Microsoft OneDrive': '☁️',
      'Apple iCloud+': '🍎',
      'Google Drive': '📊',
      'Dropbox': '📦'
    };
    return logos[provider] || '💾';
  };

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Savings Calculator
          </CardTitle>
          <CardDescription>
            Compare TIM's one-time cost against cloud storage subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Storage Slider */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Storage Needed: {selectedStorage} GB</label>
            <Slider
              value={[selectedStorage]}
              onValueChange={(value) => setSelectedStorage(value[0])}
              max={3000}
              min={50}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>50 GB</span>
              <span>1.5 TB</span>
              <span>3 TB</span>
            </div>
          </div>

          {/* Time Period */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Comparison Period</label>
            <Select value={selectedYears.toString()} onValueChange={(value) => setSelectedYears(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Year</SelectItem>
                <SelectItem value="3">3 Years</SelectItem>
                <SelectItem value="5">5 Years</SelectItem>
                <SelectItem value="10">10 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recommended TIM Model */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Recommended TIM Model</h3>
              <Badge className={`${selectedModel.color} text-white`}>
                Best Fit
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{selectedModel.name}</p>
                <p className="text-sm text-muted-foreground">{selectedModel.storage} GB capacity</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">€{selectedModel.cost}</p>
                <p className="text-sm text-muted-foreground">One-time purchase</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculations.map((calc, index) => {
          const isProfit = calc.totalSavings > 0;
          const monthlyEquivalent = calc.totalSavings / 12 / selectedYears;
          
          return (
            <Card key={index} className={`relative overflow-hidden ${isProfit ? 'border-green-200' : 'border-red-200'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getProviderLogo(calc.provider)}</span>
                    <div>
                      <CardTitle className="text-lg">{calc.provider}</CardTitle>
                      <CardDescription className="text-sm">{calc.tier}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={isProfit ? "default" : "destructive"}>
                    {isProfit ? "Save" : "Loss"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {isProfit ? '+' : ''}€{Math.round(Math.abs(calc.totalSavings))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedYears}-year {isProfit ? 'savings' : 'extra cost'}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly equivalent:</span>
                    <span className={isProfit ? 'text-green-600' : 'text-red-600'}>
                      {isProfit ? '+' : ''}€{Math.round(Math.abs(monthlyEquivalent))}/mo
                    </span>
                  </div>
                  
                  {isProfit && (
                    <div className="mt-3 p-2 bg-green-50 dark:bg-green-950/20 rounded text-center">
                      <div className="text-xs text-green-700 dark:text-green-300">
                        TIM pays for itself in{' '}
                        <strong>{Math.ceil(selectedModel.cost / (calc.totalSavings / selectedYears))} months</strong>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Total Savings Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                €{Math.round(calculations.reduce((sum, calc) => sum + Math.max(0, calc.totalSavings), 0))}
              </div>
              <div className="text-sm text-muted-foreground">Best case {selectedYears}-year savings</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {calculations.filter(calc => calc.totalSavings > 0).length}
              </div>
              <div className="text-sm text-muted-foreground">Services you'll save money vs</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                ∞
              </div>
              <div className="text-sm text-muted-foreground">Years of ownership (no subscriptions)</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/50 dark:bg-black/20 rounded-lg border">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              Why TIM Wins
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• No monthly subscription fees - pay once, own forever</li>
              <li>• Complete data privacy - your files never leave your device</li>
              <li>• Works offline - no internet dependency for local access</li>
              <li>• Can be passed down - true ownership like physical property</li>
              <li>• No account locks - access your data even if TIM goes offline</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CloudPricingComparison;