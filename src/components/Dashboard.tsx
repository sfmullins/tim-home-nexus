import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Files, 
  Home, 
  Download, 
  Cloud, 
  Gamepad2, 
  Shield, 
  Wifi,
  WifiOff,
  Activity
} from "lucide-react";
import timLogo from "@/assets/tim-logo.png";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "online" | "offline" | "connecting";
  onClick: () => void;
}

const ModuleCard = ({ title, description, icon, status, onClick }: ModuleCardProps) => {
  const statusColors = {
    online: "bg-accent text-accent-foreground",
    offline: "bg-destructive text-destructive-foreground",
    connecting: "bg-primary text-primary-foreground animate-pulse"
  };

  return (
    <Card className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-primary/20 shadow-lg group" onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-surface group-hover:bg-primary/10 transition-colors duration-300">
          {icon}
        </div>
        <Badge className={statusColors[status]} variant="secondary">
          {status}
        </Badge>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Card>
  );
};

const Dashboard = () => {
  const modules = [
    {
      title: "File Server",
      description: "Browse, upload and download files from Tim's shared folders",
      icon: <Files className="w-6 h-6 text-primary" />,
      status: "online" as const,
      onClick: () => console.log("File Server clicked")
    },
    {
      title: "Smart Home",
      description: "Control and monitor your smart home devices",
      icon: <Home className="w-6 h-6 text-primary" />,
      status: "online" as const,
      onClick: () => console.log("Smart Home clicked")
    },
    {
      title: "Downloads",
      description: "Manage torrents and downloads remotely",
      icon: <Download className="w-6 h-6 text-primary" />,
      status: "connecting" as const,
      onClick: () => console.log("Downloads clicked")
    },
    {
      title: "Cloud Storage",
      description: "Personal cloud storage and file sync",
      icon: <Cloud className="w-6 h-6 text-primary" />,
      status: "online" as const,
      onClick: () => console.log("Cloud Storage clicked")
    },
    {
      title: "Game Streaming",
      description: "Stream games from Tim to your device",
      icon: <Gamepad2 className="w-6 h-6 text-primary" />,
      status: "offline" as const,
      onClick: () => console.log("Game Streaming clicked")
    },
    {
      title: "VPN Access",
      description: "Secure remote access to your home network",
      icon: <Shield className="w-6 h-6 text-primary" />,
      status: "offline" as const,
      onClick: () => console.log("VPN Access clicked")
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src={timLogo} alt="Tim Logo" className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tim</h1>
              <p className="text-muted-foreground">Personal Server Hub</p>
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

        {/* Server Status */}
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

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <Button variant="hero" size="lg" className="flex-1">
            <Files className="w-5 h-5" />
            Quick Files
          </Button>
          <Button variant="module" size="lg" className="flex-1">
            <Home className="w-5 h-5" />
            Home Control
          </Button>
          <Button variant="module" size="lg" className="flex-1">
            <Shield className="w-5 h-5" />
            Connect VPN
          </Button>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <ModuleCard
              key={index}
              title={module.title}
              description={module.description}
              icon={module.icon}
              status={module.status}
              onClick={module.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;