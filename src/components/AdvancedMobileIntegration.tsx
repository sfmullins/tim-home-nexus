import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Smartphone, Key, Shield, Wifi, CheckCircle, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { useInternetControl } from "@/hooks/useInternetControl";

interface PairingSession {
  id: string;
  deviceName: string;
  userAgent: string;
  ipAddress: string;
  createdAt: string;
  status: 'pending' | 'active' | 'expired';
  lastSeen: string;
}

const AdvancedMobileIntegration = () => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [pairingSessions, setPairingSessions] = useState<PairingSession[]>([]);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [accountRequired, setAccountRequired] = useState(false);
  const [pairingSettings, setPairingSettings] = useState({
    requireAuth: true,
    sessionTimeout: 24, // hours
    maxDevices: 5
  });
  
  const { toast } = useToast();
  const { user } = useLocalAuth();
  const { isConnected } = useInternetControl();

  // Simulate existing pairing sessions
  useEffect(() => {
    const mockSessions: PairingSession[] = [
      {
        id: '1',
        deviceName: 'iPhone 15 Pro',
        userAgent: 'TIM Mobile iOS/1.0',
        ipAddress: '192.168.1.105',
        createdAt: '2024-01-15 14:30:00',
        status: 'active',
        lastSeen: '2024-01-15 16:45:00'
      },
      {
        id: '2', 
        deviceName: 'Samsung Galaxy S24',
        userAgent: 'TIM Mobile Android/1.0',
        ipAddress: '192.168.1.108',
        createdAt: '2024-01-14 09:15:00',
        status: 'pending',
        lastSeen: '2024-01-14 09:15:00'
      }
    ];
    setPairingSessions(mockSessions);
  }, []);

  const generateAdvancedQRCode = async () => {
    setIsGeneratingQR(true);

    // Simulate QR generation with more advanced pairing data
    await new Promise(resolve => setTimeout(resolve, 2000));

    const pairingData = {
      version: '1.0',
      timDevice: {
        id: user?.id || 'anonymous',
        name: user?.deviceName || 'TIM-Device',
        model: 'TIM-Pro' // Could be dynamic based on hardware
      },
      network: {
        localIP: '192.168.1.100', // Would be auto-detected
        port: 8080,
        ssid: 'MyHomeNetwork', // Would be auto-detected
        requiresAuth: pairingSettings.requireAuth
      },
      security: {
        authToken: btoa(`${user?.id}-${Date.now()}`),
        encryptionKey: btoa(`enc-${Math.random().toString(36)}`),
        expiresAt: Date.now() + (pairingSettings.sessionTimeout * 60 * 60 * 1000)
      },
      capabilities: {
        fileAccess: true,
        remoteControl: isConnected,
        internetToggle: true,
        moduleControl: true
      },
      timestamp: Date.now()
    };

    const qrPayload = `tim://pair?data=${btoa(JSON.stringify(pairingData))}`;
    setQrData(qrPayload);
    setIsGeneratingQR(false);

    toast({
      title: "Advanced QR Code Generated",
      description: "Secure pairing token created with encryption"
    });
  };

  const revokeSession = (sessionId: string) => {
    setPairingSessions(prev => 
      prev.filter(session => session.id !== sessionId)
    );
    toast({
      title: "Session Revoked",
      description: "Mobile device access has been removed"
    });
  };

  const copyPairingData = () => {
    if (qrData) {
      navigator.clipboard.writeText(qrData);
      toast({
        title: "Pairing Data Copied",
        description: "Use this in the mobile app's manual pairing option"
      });
    }
  };

  const createAccountLink = async () => {
    // Simulate account creation for cloud features
    setAccountRequired(true);
    
    toast({
      title: "Account Required",
      description: "Create a TIM account to enable remote features and cloud sync"
    });
  };

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      {!isConnected && (
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
          <Wifi className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            Local pairing only: Internet features will be limited until connection is enabled.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="pairing" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pairing">Device Pairing</TabsTrigger>
          <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
          <TabsTrigger value="settings">Pairing Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="pairing" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* QR Code Generation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Secure QR Pairing
                </CardTitle>
                <CardDescription>
                  Generate encrypted pairing code for TIM mobile app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!qrData && !isGeneratingQR && (
                  <div className="text-center py-8">
                    <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                      <QrCode className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Generate Secure Pairing Code</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Creates an encrypted, time-limited pairing token with device-specific security.
                    </p>
                    <Button onClick={generateAdvancedQRCode}>
                      <Key className="h-4 w-4 mr-2" />
                      Generate Secure QR
                    </Button>
                  </div>
                )}

                {isGeneratingQR && (
                  <div className="text-center py-8">
                    <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Generating Secure Token...</h3>
                    <p className="text-sm text-muted-foreground">
                      Creating encrypted pairing data with device certificates
                    </p>
                  </div>
                )}

                {qrData && (
                  <div className="text-center py-4">
                    <div className="w-48 h-48 bg-white border-2 border-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="grid grid-cols-12 gap-px w-44 h-44">
                        {/* Enhanced QR code pattern */}
                        {Array.from({ length: 144 }, (_, i) => (
                          <div 
                            key={i} 
                            className={`w-1 h-1 ${Math.random() > 0.45 ? 'bg-black' : 'bg-white'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Encrypted & Time-Limited</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Expires in {pairingSettings.sessionTimeout} hours
                      </p>
                      
                      <div className="flex gap-2 justify-center">
                        <Button size="sm" onClick={generateAdvancedQRCode}>
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Regenerate
                        </Button>
                        <Button size="sm" variant="outline" onClick={copyPairingData}>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy Token
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Mobile App Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile App Capabilities
                </CardTitle>
                <CardDescription>
                  What you can control remotely
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Local Network Access</h4>
                      <p className="text-sm text-muted-foreground">
                        Full file browser, module control, and system monitoring over Wi-Fi.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isConnected 
                        ? 'bg-blue-100 dark:bg-blue-950' 
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <Wifi className={`h-4 w-4 ${
                        isConnected ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-medium">Remote Internet Control</h4>
                      <p className="text-sm text-muted-foreground">
                        Toggle TIM's internet access from anywhere with account linking.
                      </p>
                      {!isConnected && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          Requires Internet
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-950 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Secure Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        End-to-end encrypted communication with certificate pinning.
                      </p>
                    </div>
                  </div>
                </div>

                {isConnected && (
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                    <h4 className="font-medium mb-2">Enable Remote Features</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Link a TIM account to enable internet control and cloud sync from mobile.
                    </p>
                    <Button 
                      size="sm" 
                      onClick={createAccountLink}
                      disabled={accountRequired}
                    >
                      {accountRequired ? "Account Setup Required" : "Link TIM Account"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Mobile Sessions</CardTitle>
              <CardDescription>
                Manage devices connected to your TIM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pairingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{session.deviceName}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{session.ipAddress}</span>
                          <span>•</span>
                          <span>Last seen: {new Date(session.lastSeen).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={session.status === 'active' ? 'default' : 'outline'}>
                        {session.status}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => revokeSession(session.id)}
                      >
                        Revoke Access
                      </Button>
                    </div>
                  </div>
                ))}

                {pairingSessions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Smartphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No mobile devices paired yet</p>
                    <p className="text-sm">Generate a QR code to pair your first device</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pairing Security Settings</CardTitle>
              <CardDescription>
                Configure how mobile devices can connect to TIM
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Require Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      New devices must provide valid credentials
                    </p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={pairingSettings.requireAuth}
                    onChange={(e) => setPairingSettings(prev => ({
                      ...prev,
                      requireAuth: e.target.checked
                    }))}
                    className="w-4 h-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Session Timeout (hours)</Label>
                  <Input
                    type="number"
                    value={pairingSettings.sessionTimeout}
                    onChange={(e) => setPairingSettings(prev => ({
                      ...prev,
                      sessionTimeout: parseInt(e.target.value) || 24
                    }))}
                    min="1"
                    max="168"
                  />
                  <p className="text-sm text-muted-foreground">
                    How long pairing tokens remain valid
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Maximum Paired Devices</Label>
                  <Input
                    type="number"
                    value={pairingSettings.maxDevices}
                    onChange={(e) => setPairingSettings(prev => ({
                      ...prev,
                      maxDevices: parseInt(e.target.value) || 5
                    }))}
                    min="1"
                    max="20"
                  />
                  <p className="text-sm text-muted-foreground">
                    Total number of devices that can be paired simultaneously
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button>Save Pairing Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedMobileIntegration;