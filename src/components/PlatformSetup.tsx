import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Monitor, Smartphone, HardDrive, Folder, CheckCircle, AlertCircle } from "lucide-react";
import { cloudPricing, CloudProvider } from "@/lib/cloudPricing";

interface PlatformSetupProps {
  onComplete: (config: OnboardingConfig) => void;
}

export interface OnboardingConfig {
  platform: 'windows' | 'macos' | 'linux';
  folders: Array<{
    path: string;
    size: number; // GB
    type: 'documents' | 'photos' | 'videos' | 'music' | 'other';
  }>;
  totalStorage: number; // GB
  recommendedTIM: string;
  estimatedSavings: number; // EUR per year
}

const PlatformSetup = ({ onComplete }: PlatformSetupProps) => {
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<'windows' | 'macos' | 'linux' | null>(null);
  const [folders, setFolders] = useState<OnboardingConfig['folders']>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const platforms = [
    {
      id: 'windows' as const,
      name: 'Windows',
      icon: Monitor,
      description: 'Windows 10/11 with automatic folder detection',
      defaultFolders: [
        { name: 'Documents', path: 'C:\\Users\\%USERNAME%\\Documents', avgSize: 5 },
        { name: 'Pictures', path: 'C:\\Users\\%USERNAME%\\Pictures', avgSize: 25 },
        { name: 'Videos', path: 'C:\\Users\\%USERNAME%\\Videos', avgSize: 50 },
        { name: 'Music', path: 'C:\\Users\\%USERNAME%\\Music', avgSize: 10 },
        { name: 'Desktop', path: 'C:\\Users\\%USERNAME%\\Desktop', avgSize: 2 }
      ]
    },
    {
      id: 'macos' as const,
      name: 'macOS',
      icon: Smartphone,
      description: 'macOS with iCloud integration analysis',
      defaultFolders: [
        { name: 'Documents', path: '~/Documents', avgSize: 5 },
        { name: 'Pictures', path: '~/Pictures', avgSize: 30 },
        { name: 'Movies', path: '~/Movies', avgSize: 45 },
        { name: 'Music', path: '~/Music', avgSize: 15 },
        { name: 'Desktop', path: '~/Desktop', avgSize: 3 }
      ]
    },
    {
      id: 'linux' as const,
      name: 'Linux',
      icon: HardDrive,
      description: 'Linux distributions with home folder mapping',
      defaultFolders: [
        { name: 'Documents', path: '~/Documents', avgSize: 4 },
        { name: 'Pictures', path: '~/Pictures', avgSize: 20 },
        { name: 'Videos', path: '~/Videos', avgSize: 40 },
        { name: 'Music', path: '~/Music', avgSize: 12 },
        { name: 'Downloads', path: '~/Downloads', avgSize: 8 }
      ]
    }
  ];

  const simulateFolderScan = async (platform: typeof selectedPlatform) => {
    setIsScanning(true);
    setScanProgress(0);
    
    const platformData = platforms.find(p => p.id === platform);
    if (!platformData) return;

    // Simulate scanning progress
    for (let i = 0; i <= 100; i += 10) {
      setScanProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Generate mock folder data with some variation
    const mockFolders = platformData.defaultFolders.map(folder => ({
      path: folder.path,
      size: Math.round(folder.avgSize * (0.5 + Math.random())), // Vary the size
      type: getFileType(folder.name)
    }));

    setFolders(mockFolders);
    setIsScanning(false);
    setStep(3);
  };

  const getFileType = (folderName: string): OnboardingConfig['folders'][0]['type'] => {
    const name = folderName.toLowerCase();
    if (name.includes('document')) return 'documents';
    if (name.includes('picture') || name.includes('photo')) return 'photos';
    if (name.includes('video') || name.includes('movie')) return 'videos';
    if (name.includes('music')) return 'music';
    return 'other';
  };

  const getTotalStorage = () => folders.reduce((sum, folder) => sum + folder.size, 0);

  const getSavingsCalculation = () => {
    const totalGB = getTotalStorage();
    const calculator = cloudPricing;
    const recommendation = calculator.getRecommendedTIMModel(totalGB);
    const savings = calculator.getTotalLifetimeSavings(recommendation.model, totalGB, 3);
    
    return {
      recommendedTIM: recommendation.name,
      timCost: recommendation.cost,
      bestCloudSavings: savings.length > 0 ? savings[0].totalSavings : 0,
      totalStorage: totalGB
    };
  };

  const handleComplete = () => {
    if (!selectedPlatform) return;
    
    const { recommendedTIM, bestCloudSavings, totalStorage } = getSavingsCalculation();
    
    const config: OnboardingConfig = {
      platform: selectedPlatform,
      folders,
      totalStorage,
      recommendedTIM,
      estimatedSavings: bestCloudSavings
    };

    onComplete(config);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Choose Your Platform</h2>
              <p className="text-muted-foreground">
                Select your operating system to configure TIM's folder mapping
              </p>
            </div>
            
            <div className="grid gap-4">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <Card 
                    key={platform.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedPlatform === platform.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedPlatform(platform.id)}
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <Icon className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{platform.name}</h3>
                        <p className="text-sm text-muted-foreground">{platform.description}</p>
                      </div>
                      {selectedPlatform === platform.id && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Button 
              onClick={() => setStep(2)} 
              disabled={!selectedPlatform}
              className="w-full"
            >
              Continue to Folder Scan
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Scan Your Folders</h2>
              <p className="text-muted-foreground">
                Let's analyze your current storage usage to calculate potential savings
              </p>
            </div>

            {!isScanning && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Folder className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Ready to Scan</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This will analyze your {platforms.find(p => p.id === selectedPlatform)?.name} folders 
                    to estimate storage needs and calculate cloud service savings.
                  </p>
                  <Button onClick={() => simulateFolderScan(selectedPlatform)}>
                    Start Folder Analysis
                  </Button>
                </CardContent>
              </Card>
            )}

            {isScanning && (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Scanning Folders...</h3>
                  </div>
                  <Progress value={scanProgress} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Analyzing {scanProgress}% complete
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 3:
        const { recommendedTIM, timCost, bestCloudSavings, totalStorage } = getSavingsCalculation();
        
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Analysis Complete</h2>
              <p className="text-muted-foreground">
                Here's what we found and how TIM can save you money
              </p>
            </div>

            {/* Storage Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  Your Storage Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {folders.map((folder, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{folder.path}</span>
                      <Badge variant="outline">{folder.size} GB</Badge>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total Storage:</span>
                    <span>{totalStorage} GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Recommended TIM Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary mb-2">{recommendedTIM}</h3>
                  <p className="text-lg mb-4">One-time cost: <strong>€{timCost}</strong></p>
                  
                  {bestCloudSavings > 0 && (
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                      <p className="text-green-700 dark:text-green-300">
                        <strong>3-Year Savings: €{bestCloudSavings}</strong>
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Compared to cloud storage subscriptions
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleComplete} className="w-full">
              Complete Setup
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>TIM Setup</CardTitle>
              <CardDescription>Configure your personal server</CardDescription>
            </div>
            <Badge variant="outline">Step {step} of 3</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformSetup;