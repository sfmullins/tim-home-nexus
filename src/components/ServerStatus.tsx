import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server } from "lucide-react";

const ServerStatus = () => {
  return (
    <Card className="p-6 bg-gradient-surface border-border mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent/10">
            <Server className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Tim Server</h2>
            <p className="text-muted-foreground">Intel N100 • 192.168.1.100</p>
          </div>
        </div>
        <div className="text-right">
          <Badge className="bg-accent text-accent-foreground mb-2">Online</Badge>
          <p className="text-sm text-muted-foreground">Uptime: 7d 12h</p>
        </div>
      </div>
    </Card>
  );
};

export default ServerStatus;