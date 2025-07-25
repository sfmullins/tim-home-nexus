import { Button } from "@/components/ui/button";
import { Wifi, Activity } from "lucide-react";
import timLogo from "@/assets/tim-logo.png";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <img src={timLogo} alt="Tim Logo" className="w-12 h-12" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tim</h1>
          <p className="text-muted-foreground">Personal Hub</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">Local Network</span>
        </div>
        <Button variant="accent" size="sm">
          <Activity className="w-4 h-4" />
          Status
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;