import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, Wifi, Users, Key, Globe, Download, Upload, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VpnConnection {
  id: string;
  name: string;
  location: string;
  status: "connected" | "disconnected" | "connecting";
  protocol: string;
  encryption: string;
  connectedSince?: string;
  ipAddress?: string;
}

interface VpnUser {
  id: string;
  username: string;
  device: string;
  ipAddress: string;
  connectedSince: string;
  dataTransfer: {
    uploaded: string;
    downloaded: string;
  };
  status: "active" | "idle";
}

const VpnAccess = () => {
  const navigate = useNavigate();
  const [autoConnect, setAutoConnect] = useState(true);
  const [killSwitch, setKillSwitch] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<string | null>("home-network");

  const [mockConnections] = useState<VpnConnection[]>([
    {
      id: "home-network",
      name: "Home Network",
      location: "Local Network",
      status: "connected",
      protocol: "WireGuard",
      encryption: "ChaCha20",
      connectedSince: "2 hours ago",
      ipAddress: "192.168.1.100"
    },
    {
      id: "remote-office",
      name: "Remote Office",
      location: "London, UK",
      status: "disconnected",
      protocol: "OpenVPN",
      encryption: "AES-256"
    },
    {
      id: "backup-server",
      name: "Backup Server",
      location: "Frankfurt, DE",
      status: "disconnected",
      protocol: "IKEv2",
      encryption: "AES-256"
    }
  ]);

  const [mockUsers] = useState<VpnUser[]>([
    {
      id: "user1",
      username: "tim_mobile",
      device: "iPhone 14",
      ipAddress: "10.0.0.10",
      connectedSince: "1 hour ago",
      dataTransfer: {
        uploaded: "125 MB",
        downloaded: "2.1 GB"
      },
      status: "active"
    },
    {
      id: "user2", 
      username: "tim_laptop",
      device: "MacBook Pro",
      ipAddress: "10.0.0.11",
      connectedSince: "3 hours ago",
      dataTransfer: {
        uploaded: "89 MB",
        downloaded: "567 MB"
      },
      status: "idle"
    },
    {
      id: "user3",
      username: "gaming_pc",
      device: "Windows Desktop",
      ipAddress: "10.0.0.12",
      connectedSince: "45 minutes ago",
      dataTransfer: {
        uploaded: "45 MB",
        downloaded: "1.3 GB"
      },
      status: "active"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": 
      case "active": return "bg-success text-success-foreground";
      case "disconnected": return "bg-muted text-muted-foreground";
      case "connecting": return "bg-warning text-warning-foreground";
      case "idle": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleConnect = (connectionId: string) => {
    console.log(`Connecting to ${connectionId}`);
    // Would handle actual VPN connection logic
  };

  const handleDisconnect = (connectionId: string) => {
    console.log(`Disconnecting from ${connectionId}`);
    // Would handle actual VPN disconnection logic
  };

  const activeConnection = mockConnections.find(conn => conn.status === "connected");

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">VPN Access</h1>
              <p className="text-muted-foreground">Secure remote access to your home network</p>
            </div>
          </div>
        </div>

        {/* Connection Status Card */}
        <Card className="mb-6 bg-gradient-surface border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Connection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeConnection ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">Connected</div>
                  <div className="text-sm text-muted-foreground">{activeConnection.name}</div>
                  <div className="w-3 h-3 bg-success rounded-full mx-auto mt-2"></div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{activeConnection.ipAddress}</div>
                  <div className="text-sm text-muted-foreground">IP Address</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{activeConnection.protocol}</div>
                  <div className="text-sm text-muted-foreground">Protocol</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{activeConnection.connectedSince}</div>
                  <div className="text-sm text-muted-foreground">Connected Since</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Not Connected</h3>
                <p className="text-muted-foreground">Choose a VPN connection to secure your network access</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="connections" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="users">Connected Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Connections Tab */}
          <TabsContent value="connections" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockConnections.map((connection) => (
                <Card 
                  key={connection.id} 
                  className={`cursor-pointer transition-all duration-200 hover:border-primary/50 bg-gradient-surface border-border ${
                    selectedConnection === connection.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedConnection(connection.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-lg font-semibold text-foreground">{connection.name}</div>
                      <Badge className={getStatusColor(connection.status)}>
                        {connection.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {connection.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4" />
                        {connection.protocol} • {connection.encryption}
                      </div>
                      {connection.connectedSince && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Connected: {connection.connectedSince}
                        </div>
                      )}
                      {connection.ipAddress && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          IP: {connection.ipAddress}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      {connection.status === "connected" ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDisconnect(connection.id);
                          }}
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConnect(connection.id);
                          }}
                        >
                          Connect
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Key className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline">
                <Key className="w-4 h-4 mr-2" />
                Add New Connection
              </Button>
            </div>
          </TabsContent>

          {/* Connected Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Active Connections ({mockUsers.length})</h3>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="space-y-4">
              {mockUsers.map((user) => (
                <Card key={user.id} className="bg-gradient-surface border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{user.username}</h3>
                          <p className="text-sm text-muted-foreground">{user.device}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">IP Address</div>
                        <div className="font-medium text-foreground">{user.ipAddress}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Connected Since</div>
                        <div className="font-medium text-foreground">{user.connectedSince}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Upload className="w-3 h-3" />
                          Uploaded
                        </div>
                        <div className="font-medium text-foreground">{user.dataTransfer.uploaded}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          Downloaded
                        </div>
                        <div className="font-medium text-foreground">{user.dataTransfer.downloaded}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        Disconnect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gradient-surface border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  VPN Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Auto-connect on startup</h4>
                    <p className="text-sm text-muted-foreground">Automatically connect to VPN when Tim starts</p>
                  </div>
                  <Switch checked={autoConnect} onCheckedChange={setAutoConnect} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Kill switch</h4>
                    <p className="text-sm text-muted-foreground">Block internet if VPN disconnects unexpectedly</p>
                  </div>
                  <Switch checked={killSwitch} onCheckedChange={setKillSwitch} />
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Default DNS Servers</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input placeholder="Primary DNS (8.8.8.8)" />
                    <Input placeholder="Secondary DNS (8.8.4.4)" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Port Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-muted-foreground">OpenVPN Port</label>
                      <Input placeholder="1194" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">WireGuard Port</label>
                      <Input placeholder="51820" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-surface border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Certificate Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Manage VPN certificates and keys for secure connections.</p>
                
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Client Config
                  </Button>
                  <Button variant="outline">
                    <Key className="w-4 h-4 mr-2" />
                    Generate New Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VpnAccess;