import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Router, Shield, Zap } from "lucide-react";
import { useInternetControl } from "@/hooks/useInternetControl";
import { useToast } from "@/hooks/use-toast";

const InternetControl = () => {
  const { status, stats, toggleInternet, forceInternetOn, forceInternetOff } = useInternetControl();
  const { toast } = useToast();

  const handleToggle = async () => {
    try {
      await toggleInternet();
      toast({
        title: status.allowInternet ? "Internet Disabled" : "Internet Enabled",
        description: status.allowInternet 
          ? "TIM is now in local-only mode" 
          : "TIM now has internet access"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle internet access",
        variant: "destructive"
      });
    }
  };

  const handleForceOn = async () => {
    try {
      await forceInternetOn();
      toast({
        title: "Internet Force Enabled",
        description: "Internet access enabled via software override"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enable internet access",
        variant: "destructive"
      });
    }
  };

  const handleForceOff = async () => {
    try {
      await forceInternetOff();
      toast({
        title: "Internet Force Disabled",
        description: "Internet access disabled via software override"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disable internet access",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Internet Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Router className="h-5 w-5" />
            Internet Access Control
          </CardTitle>
          <CardDescription>
            Manage TIM's connection to the internet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {status.isConnected ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">
                {status.isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <Badge variant={status.isConnected ? "default" : "secondary"}>
              {status.isConnected ? "Online" : "Local Only"}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Physical Switch:</span>
              <Badge variant={status.switchState ? "default" : "outline"}>
                {status.switchState ? "ON" : "OFF"}
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Software Override:</span>
              <Badge variant={status.allowInternet ? "default" : "outline"}>
                {status.allowInternet ? "ALLOW" : "BLOCK"}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleToggle}
              variant={status.allowInternet ? "destructive" : "default"}
              size="sm"
              className="flex-1"
            >
              {status.allowInternet ? "Disable" : "Enable"}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Last changed: {new Date(status.lastStateChange).toLocaleString()}
          </div>
        </CardContent>
      </Card>

      {/* Network Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Network Statistics
          </CardTitle>
          <CardDescription>
            Real-time network performance data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {stats.downloadSpeed.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Mbps Down</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {stats.uploadSpeed.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Mbps Up</div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-lg font-semibold">
              {stats.latency}ms
            </div>
            <div className="text-sm text-muted-foreground">Latency</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Today:</span>
              <span>{(stats.dataUsage.today / 1024 / 1024 / 1024).toFixed(2)} GB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>This Month:</span>
              <span>{(stats.dataUsage.thisMonth / 1024 / 1024 / 1024).toFixed(2)} GB</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Status */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Privacy Status
          </CardTitle>
          <CardDescription>
            Your data privacy and security overview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <div className="font-medium text-green-700 dark:text-green-300">Local Storage</div>
                <div className="text-sm text-green-600 dark:text-green-400">Data stays on your device</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <div className="font-medium text-blue-700 dark:text-blue-300">No Subscriptions</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">One-time purchase only</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div>
                <div className="font-medium text-purple-700 dark:text-purple-300">Your Rules</div>
                <div className="text-sm text-purple-600 dark:text-purple-400">Complete control over access</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Internet Access Policy</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {status.allowInternet 
                ? "TIM can access the internet for updates and cloud sync. Your data remains secure and local-first."
                : "TIM is in local-only mode. No external connections are allowed. Your data is completely isolated."
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InternetControl;