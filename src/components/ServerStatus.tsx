import { Card } from "@/components/ui/card";
import { Server } from "lucide-react";
import ServerControls from "./ServerControls";

const ServerStatus = () => {
  return (
    <Card className="p-6 bg-gradient-surface border-border mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent/10">
            <Server className="w-6 h-6 text-accent" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-foreground">T.I.M Server</h2>
              <select className="bg-transparent text-sm text-muted-foreground border-none outline-none">
                <option>Primary Unit</option>
                <option>Secondary Unit</option>
              </select>
            </div>
            <p className="text-muted-foreground">Intel N100 • 192.168.1.100</p>
          </div>
        </div>
        <div className="text-right">
          <ServerControls />
          <p className="text-sm text-muted-foreground">Uptime: 7d 12h</p>
        </div>
      </div>
    </Card>
  );
};

export default ServerStatus;