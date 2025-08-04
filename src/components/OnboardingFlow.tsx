import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Server, Wifi, WifiOff, Folder, Users } from "lucide-react";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { useInternetControl } from "@/hooks/useInternetControl";
import PlatformSetup, { OnboardingConfig } from "@/components/PlatformSetup";

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'platform' | 'complete'>('welcome');
  const [onboardingConfig, setOnboardingConfig] = useState<OnboardingConfig | null>(null);
  const { user, hasAnyUsers } = useLocalAuth();
  const { isConnected } = useInternetControl();
  const navigate = useNavigate();

  const handlePlatformComplete = (config: OnboardingConfig) => {
    setOnboardingConfig(config);
    setCurrentStep('complete');
  };

  const handleFinishSetup = () => {
    // Save onboarding config to localStorage
    if (onboardingConfig) {
      localStorage.setItem('tim-onboarding-config', JSON.stringify(onboardingConfig));
    }
    
    // Mark onboarding as complete
    localStorage.setItem('tim-onboarding-complete', 'true');
    
    // Navigate to dashboard
    navigate('/');
  };

  if (currentStep === 'platform') {
    return <PlatformSetup onComplete={handlePlatformComplete} />;
  }

  if (currentStep === 'complete') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-950">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Setup Complete!</CardTitle>
            <CardDescription>
              Your TIM server is configured and ready to use
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {onboardingConfig && (
              <>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Configuration Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Platform:</span>
                      <Badge variant="outline" className="capitalize">
                        {onboardingConfig.platform}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Storage:</span>
                      <span>{onboardingConfig.totalStorage} GB mapped</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recommended Model:</span>
                      <span className="font-medium">{onboardingConfig.recommendedTIM}</span>
                    </div>
                    {onboardingConfig.estimatedSavings > 0 && (
                      <div className="flex justify-between">
                        <span>Estimated 3-Year Savings:</span>
                        <span className="font-medium text-green-600">
                          €{onboardingConfig.estimatedSavings}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <Folder className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-700 dark:text-blue-300">
                        {onboardingConfig.folders.length} Folders Mapped
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        Ready for local access
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                    <Server className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-700 dark:text-green-300">
                        Local Server Active
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        No cloud dependencies
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <Button onClick={handleFinishSetup} className="w-full" size="lg">
              Access TIM Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Welcome step
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Server className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to TIM</CardTitle>
          <CardDescription>
            Your personal server is ready for configuration
          </CardDescription>
          
          {/* Status indicators */}
          <div className="flex items-center justify-center gap-4 mt-4 p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-amber-600">Local Only</span>
                </>
              )}
            </div>
            
            <div className="w-px h-4 bg-border"></div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-blue-600">
                {hasAnyUsers() ? 'Multi-user' : 'Single-user'}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                Local-First Setup
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                TIM works completely offline. No internet connection required for core functionality.
                Your data stays on your device, under your control.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">Local authentication configured</span>
              </div>
              
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">Internet access controls active</span>
              </div>
              
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">Privacy settings optimized</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Next Steps</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Let's configure your folder mapping and calculate potential cloud storage savings.
              This process works entirely offline and helps optimize your TIM setup.
            </p>
            
            <Button onClick={() => setCurrentStep('platform')} className="w-full" size="lg">
              Configure Platform & Folders
            </Button>
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="text-sm"
            >
              Skip setup and go to dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;