import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QrCode, Smartphone, Wifi, Shield, CheckCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocalAuth } from "@/hooks/useLocalAuth";

const MobileAppPairing = () => {
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [pairingProgress, setPairingProgress] = useState(0);
  const { toast } = useToast();
  const { user } = useLocalAuth();

  const generateQRCode = async () => {
    setIsGeneratingQR(true);
    setPairingProgress(0);

    // Simulate QR code generation process
    for (let i = 0; i <= 100; i += 10) {
      setPairingProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Generate mock QR code data (in production: include TIM's local IP, auth token, etc.)
    const pairingData = {
      timDevice: user?.deviceName || 'TIM-Device',
      localIP: '192.168.1.100', // Would be dynamically detected
      port: 8080,
      authToken: btoa(`${user?.id}-${Date.now()}`),
      timestamp: Date.now()
    };

    const qrData = `tim://pair?data=${btoa(JSON.stringify(pairingData))}`;
    setQrCode(qrData);
    setIsGeneratingQR(false);

    toast({
      title: "QR Code Generated",
      description: "Scan with the TIM mobile app to pair your device"
    });
  };

  const copyPairingLink = () => {
    if (qrCode) {
      navigator.clipboard.writeText(qrCode);
      toast({
        title: "Pairing Link Copied",
        description: "Share this link with the mobile app"
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* QR Code Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Mobile App Pairing
          </CardTitle>
          <CardDescription>
            Connect your mobile device to TIM for remote access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!qrCode && !isGeneratingQR && (
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Generate Pairing QR Code</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create a secure QR code for mobile app pairing. No internet required.
              </p>
              <Button onClick={generateQRCode}>
                Generate QR Code
              </Button>
            </div>
          )}

          {isGeneratingQR && (
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
              <h3 className="font-semibold mb-2">Generating QR Code...</h3>
              <Progress value={pairingProgress} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Creating secure pairing data {pairingProgress}%
              </p>
            </div>
          )}

          {qrCode && (
            <div className="text-center py-4">
              <div className="w-48 h-48 bg-white border-2 border-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="grid grid-cols-8 gap-1 w-40 h-40">
                  {/* Mock QR code pattern */}
                  {Array.from({ length: 64 }, (_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} 
                    />
                  ))}
                </div>
              </div>
              <h3 className="font-semibold mb-2">Scan with TIM Mobile App</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This QR code contains your TIM's local network pairing information
              </p>
              
              <div className="flex gap-2 justify-center">
                <Button size="sm" onClick={generateQRCode}>
                  Regenerate
                </Button>
                <Button size="sm" variant="outline" onClick={copyPairingLink}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Link
                </Button>
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
            Mobile App Features
          </CardTitle>
          <CardDescription>
            What you can do with the TIM mobile app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
                <Wifi className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Local Network Access</h4>
                <p className="text-sm text-muted-foreground">
                  Connect directly to TIM via your home Wi-Fi. No cloud required.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Remote Internet Control</h4>
                <p className="text-sm text-muted-foreground">
                  Toggle TIM's internet access remotely when linked to an account.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-950 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium">Module Management</h4>
                <p className="text-sm text-muted-foreground">
                  Start, stop, and configure TIM modules from anywhere.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Privacy First</h4>
            <p className="text-sm text-muted-foreground">
              The mobile app connects directly to your TIM device. No data passes through external servers.
            </p>
          </div>

          <div className="pt-4 border-t">
            <Badge variant="outline" className="mb-2">Coming Soon</Badge>
            <p className="text-sm text-muted-foreground">
              Download the TIM mobile app from your device's app store to start pairing.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileAppPairing;