import { Button } from "@/components/ui/button";
import { Activity, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import timLogo from "@/assets/tim-logo.png";
import SpeedTest from "./SpeedTest";

const DashboardHeader = () => {
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <img src={timLogo} alt="Tim Logo" className="w-12 h-12" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">T.I.M</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <SpeedTest />
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