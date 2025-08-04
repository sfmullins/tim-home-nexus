import { Button } from "@/components/ui/button";
import { Activity, LogOut, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import timLogo from "@/assets/TIM_Logo.png";
import SpeedTest from "./SpeedTest";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { useInternetControl } from "@/hooks/useInternetControl";

const DashboardHeader = () => {
  const { toast } = useToast();
  const { logout, user } = useLocalAuth();
  const { isConnected, toggleInternet } = useInternetControl();

  const handleSignOut = async () => {
    logout();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully."
    });
  };

  const handleInternetToggle = async () => {
    try {
      await toggleInternet();
      toast({
        title: isConnected ? "Internet Disabled" : "Internet Enabled",
        description: isConnected ? "TIM is now in local-only mode" : "TIM now has internet access"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle internet access",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <img src={timLogo} alt="Tim Logo" className="w-12 h-12" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">TIM</h1>
          <p className="text-sm text-muted-foreground">{user?.deviceName}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <SpeedTest />
        <Button 
          variant={isConnected ? "default" : "outline"} 
          size="sm"
          onClick={handleInternetToggle}
        >
          {isConnected ? (
            <>
              <Wifi className="w-4 h-4" />
              Connected
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4" />
              Local Only
            </>
          )}
        </Button>
        <Button variant="accent" size="sm">
          <Activity className="w-4 h-4" />
          Status
        </Button>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;