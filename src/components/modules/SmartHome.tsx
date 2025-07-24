import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  ArrowLeft,
  Home,
  Lightbulb,
  Thermometer,
  Shield,
  Wifi,
  Battery,
  Power,
  Settings,
  Activity,
  Eye,
  EyeOff,
  Sun,
  Moon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Device {
  id: string;
  name: string;
  type: "light" | "switch" | "sensor" | "climate" | "security";
  state: "on" | "off" | "unavailable";
  brightness?: number;
  temperature?: number;
  humidity?: number;
  battery?: number;
  room: string;
}

interface Room {
  id: string;
  name: string;
  devices: Device[];
}

const SmartHome = () => {
  const { toast } = useToast();
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "living-room",
      name: "Living Room",
      devices: [
        { id: "living-light-1", name: "Main Light", type: "light", state: "on", brightness: 75, room: "living-room" },
        { id: "living-light-2", name: "Accent Light", type: "light", state: "off", brightness: 50, room: "living-room" },
        { id: "living-temp", name: "Temperature", type: "sensor", state: "on", temperature: 22, humidity: 45, room: "living-room" },
        { id: "living-tv", name: "TV Power", type: "switch", state: "off", room: "living-room" }
      ]
    },
    {
      id: "bedroom",
      name: "Bedroom", 
      devices: [
        { id: "bedroom-light", name: "Bedside Lamp", type: "light", state: "on", brightness: 30, room: "bedroom" },
        { id: "bedroom-temp", name: "Climate Control", type: "climate", state: "on", temperature: 20, room: "bedroom" },
        { id: "bedroom-motion", name: "Motion Sensor", type: "sensor", state: "off", battery: 85, room: "bedroom" }
      ]
    },
    {
      id: "kitchen",
      name: "Kitchen",
      devices: [
        { id: "kitchen-lights", name: "Under Cabinet", type: "light", state: "off", brightness: 100, room: "kitchen" },
        { id: "kitchen-fan", name: "Exhaust Fan", type: "switch", state: "off", room: "kitchen" },
        { id: "kitchen-door", name: "Door Sensor", type: "security", state: "off", battery: 92, room: "kitchen" }
      ]
    }
  ]);

  const connectToHomeAssistant = async () => {
    setConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnected(true);
      setConnecting(false);
      toast({
        title: "Connected to Home Assistant",
        description: "Successfully connected to your smart home hub.",
      });
    }, 2000);
  };

  const toggleDevice = (roomId: string, deviceId: string) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? {
            ...room,
            devices: room.devices.map(device =>
              device.id === deviceId
                ? { ...device, state: device.state === "on" ? "off" : "on" }
                : device
            )
          }
        : room
    ));
  };

  const updateBrightness = (roomId: string, deviceId: string, brightness: number) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? {
            ...room,
            devices: room.devices.map(device =>
              device.id === deviceId
                ? { ...device, brightness: brightness }
                : device
            )
          }
        : room
    ));
  };

  const getDeviceIcon = (device: Device) => {
    switch (device.type) {
      case "light":
        return <Lightbulb className={`w-5 h-5 ${device.state === "on" ? "text-warning" : "text-muted-foreground"}`} />;
      case "switch":
        return <Power className={`w-5 h-5 ${device.state === "on" ? "text-accent" : "text-muted-foreground"}`} />;
      case "sensor":
        return <Activity className="w-5 h-5 text-primary" />;
      case "climate":
        return <Thermometer className="w-5 h-5 text-primary" />;
      case "security":
        return device.state === "on" ? <Eye className="w-5 h-5 text-destructive" /> : <EyeOff className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Home className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (device: Device) => {
    if (device.state === "unavailable") {
      return <Badge variant="destructive" className="text-xs">Offline</Badge>;
    }
    if (device.type === "sensor" || device.type === "climate") {
      return <Badge variant="outline" className="text-xs">Active</Badge>;
    }
    return (
      <Badge 
        variant={device.state === "on" ? "default" : "secondary"} 
        className="text-xs"
      >
        {device.state === "on" ? "On" : "Off"}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Smart Home</h1>
            <p className="text-muted-foreground">Control your Home Assistant devices</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge 
              variant={connected ? "default" : "secondary"} 
              className={connected ? "bg-success text-success-foreground" : ""}
            >
              <Wifi className="w-3 h-3 mr-1" />
              {connected ? "Connected" : "Disconnected"}
            </Badge>
            <Button variant="module" size="sm">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        {!connected && (
          <Card className="p-6 bg-gradient-surface border-border mb-6">
            <div className="text-center">
              <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Connect to Home Assistant</h3>
              <p className="text-muted-foreground mb-6">
                Connect to your Home Assistant instance to control your smart home devices.
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                onClick={connectToHomeAssistant}
                disabled={connecting}
              >
                {connecting ? "Connecting..." : "Connect Now"}
              </Button>
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        {connected && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Button variant="module" size="lg" className="h-16">
              <Sun className="w-5 h-5" />
              All Lights On
            </Button>
            <Button variant="module" size="lg" className="h-16">
              <Moon className="w-5 h-5" />
              All Lights Off
            </Button>
            <Button variant="module" size="lg" className="h-16">
              <Shield className="w-5 h-5" />
              Arm Security
            </Button>
            <Button variant="module" size="lg" className="h-16">
              <Home className="w-5 h-5" />
              Good Night
            </Button>
          </div>
        )}

        {/* Rooms */}
        {connected && (
          <div className="space-y-6">
            {rooms.map(room => (
              <Card key={room.id} className="p-6 bg-gradient-surface border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">{room.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {room.devices.map(device => (
                    <Card key={device.id} className="p-4 bg-surface border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(device)}
                          <h3 className="font-medium text-foreground">{device.name}</h3>
                        </div>
                        {getStatusBadge(device)}
                      </div>

                      {/* Device Controls */}
                      <div className="space-y-3">
                        {(device.type === "light" || device.type === "switch") && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Power</span>
                            <Switch
                              checked={device.state === "on"}
                              onCheckedChange={() => toggleDevice(room.id, device.id)}
                            />
                          </div>
                        )}

                        {device.type === "light" && device.state === "on" && device.brightness !== undefined && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Brightness</span>
                              <span className="text-sm text-foreground">{device.brightness}%</span>
                            </div>
                            <Slider
                              value={[device.brightness]}
                              onValueChange={(value) => updateBrightness(room.id, device.id, value[0])}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>
                        )}

                        {device.temperature !== undefined && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Temperature</span>
                            <span className="text-sm text-foreground">{device.temperature}°C</span>
                          </div>
                        )}

                        {device.humidity !== undefined && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Humidity</span>
                            <span className="text-sm text-foreground">{device.humidity}%</span>
                          </div>
                        )}

                        {device.battery !== undefined && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Battery</span>
                            <div className="flex items-center gap-1">
                              <Battery className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm text-foreground">{device.battery}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartHome;