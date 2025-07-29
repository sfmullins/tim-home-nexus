import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Wifi, Gauge } from "lucide-react";

interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
}

const SpeedTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SpeedTestResult | null>(null);

  const runSpeedTest = async () => {
    setIsRunning(true);
    setProgress(0);
    setResult(null);

    // Simulate speed test with progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Simulate realistic results based on local network
    const mockResult: SpeedTestResult = {
      download: Math.floor(Math.random() * 100) + 50, // 50-150 Mbps
      upload: Math.floor(Math.random() * 50) + 20,    // 20-70 Mbps
      ping: Math.floor(Math.random() * 20) + 5        // 5-25 ms
    };

    setResult(mockResult);
    setIsRunning(false);
  };

  const getSignalStrength = () => {
    if (!result) return "Testing...";
    if (result.download > 100) return "Excellent";
    if (result.download > 50) return "Good";
    if (result.download > 20) return "Fair";
    return "Poor";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 hover:bg-muted/50 p-2 rounded-lg transition-colors">
          <Wifi className="w-4 h-4 text-accent" />
          <div className="text-left">
            <div className="text-sm font-medium text-foreground">{getSignalStrength()}</div>
            <div className="text-xs text-muted-foreground">Click to test speed</div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            Network Speed Test
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!isRunning && !result && (
            <div className="text-center py-8">
              <Button onClick={runSpeedTest} className="gap-2">
                <Gauge className="w-4 h-4" />
                Start Speed Test
              </Button>
            </div>
          )}

          {isRunning && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Testing network speed...</p>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
              </div>
            </div>
          )}

          {result && !isRunning && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{result.download}</div>
                  <div className="text-sm text-muted-foreground">Mbps Download</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-accent">{result.upload}</div>
                  <div className="text-sm text-muted-foreground">Mbps Upload</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-success">{result.ping}</div>
                  <div className="text-sm text-muted-foreground">ms Ping</div>
                </div>
              </div>
              
              <div className="text-center">
                <Button variant="outline" onClick={runSpeedTest} className="gap-2">
                  <Gauge className="w-4 h-4" />
                  Test Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpeedTest;