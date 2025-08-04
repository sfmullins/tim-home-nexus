import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, FileText, Eye, Lock, Server, Wifi, HardDrive, Crown, GitBranch } from "lucide-react";
import ConflictResolution from "./ConflictResolution";

const LocalFirstDocumentation = () => {
  const [showConflictDemo, setShowConflictDemo] = useState(false);

  if (showConflictDemo) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Cloud Sync Conflict Resolution</h2>
          <Button variant="outline" onClick={() => setShowConflictDemo(false)}>
            Back to Documentation
          </Button>
        </div>
        <ConflictResolution />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Local-First Philosophy
          </CardTitle>
          <CardDescription>
            Understanding TIM's commitment to data ownership and privacy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-primary">What "Local-First" Means</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <HardDrive className="h-4 w-4 mt-0.5 text-green-500" />
                  <span>Your data lives on your hardware, not in the cloud</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wifi className="h-4 w-4 mt-0.5 text-blue-500" />
                  <span>Core functionality works without internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="h-4 w-4 mt-0.5 text-purple-500" />
                  <span>You control access - no third-party data policies</span>
                </li>
                <li className="flex items-start gap-2">
                  <Crown className="h-4 w-4 mt-0.5 text-yellow-500" />
                  <span>True ownership - pass it down like physical property</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-primary">Traditional Cloud Issues</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Monthly subscription fees that add up over time</li>
                <li>• Data stored on servers you don't control</li>
                <li>• Internet required for basic file access</li>
                <li>• Terms of service can change at any time</li>
                <li>• Account suspension can lock you out of your data</li>
                <li>• Service shutdown means data loss risk</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="gdpr">GDPR</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="sync">Cloud Sync</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Privacy by Design
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">What TIM Collects</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <span>Device Serial Number</span>
                      <Badge variant="outline" className="text-green-600">Required</Badge>
                    </div>
                    <div className="flex justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <span>Email Address</span>
                      <Badge variant="outline" className="text-green-600">Optional</Badge>
                    </div>
                    <div className="flex justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <span>Local Username</span>
                      <Badge variant="outline" className="text-green-600">Local Only</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">What TIM Never Collects</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-red-50 dark:bg-red-950/20 rounded">
                      ❌ Your file contents or names
                    </div>
                    <div className="p-2 bg-red-50 dark:bg-red-950/20 rounded">
                      ❌ Browsing history or activity logs
                    </div>
                    <div className="p-2 bg-red-50 dark:bg-red-950/20 rounded">
                      ❌ Personal data or documents
                    </div>
                    <div className="p-2 bg-red-50 dark:bg-red-950/20 rounded">
                      ❌ Device usage patterns
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Zero-Knowledge Architecture</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  TIM is designed so that even if our servers were compromised, your personal data would remain safe. 
                  We cannot access your files, read your documents, or see your activity because everything stays local.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gdpr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                GDPR Compliance
              </CardTitle>
              <CardDescription>
                How TIM's local-first approach naturally aligns with GDPR principles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-3 border border-green-200 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Right to Portability</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      ✅ Your data is already on your device in standard formats. Export anytime, no requests needed.
                    </p>
                  </div>
                  
                  <div className="p-3 border border-green-200 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Right to Erasure</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      ✅ Delete your data instantly. No waiting for cloud providers to process requests.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3 border border-green-200 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Data Minimization</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      ✅ TIM collects minimal data by design. Most processing happens locally.
                    </p>
                  </div>
                  
                  <div className="p-3 border border-green-200 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Consent Control</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      ✅ Clear control over what data is shared. Internet access is your choice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Important Note</h4>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  TIM processes most data locally, but when internet features are enabled, standard GDPR rights apply. 
                  See our full privacy policy for details on data processing when cloud sync is used.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Technical Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Local Data Storage</h4>
                  <div className="bg-muted/50 p-3 rounded text-sm font-mono">
                    /tim-data/<br/>
                    ├── user-profiles/     # Local user accounts<br/>
                    ├── modules/          # Module data and configs<br/>
                    ├── files/           # Your documents and media<br/>
                    └── system/          # TIM system data
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Network Architecture</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="p-3 border rounded">
                      <h5 className="font-medium text-green-600">Local Network</h5>
                      <ul className="mt-2 space-y-1">
                        <li>• Direct device-to-device communication</li>
                        <li>• No external servers required</li>
                        <li>• Encrypted local connections</li>
                      </ul>
                    </div>
                    <div className="p-3 border rounded">
                      <h5 className="font-medium text-blue-600">Internet (Optional)</h5>
                      <ul className="mt-2 space-y-1">
                        <li>• Software updates only</li>
                        <li>• Optional cloud sync</li>
                        <li>• Physical switch control</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Security Measures</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <h5 className="font-medium text-purple-600">Encryption</h5>
                      <p className="mt-1">AES-256 for data at rest, TLS for network transfer</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <h5 className="font-medium text-blue-600">Authentication</h5>
                      <p className="mt-1">Local password hashing, session tokens</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                      <h5 className="font-medium text-green-600">Access Control</h5>
                      <p className="mt-1">User-level permissions, module isolation</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Legal Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Ownership Rights</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                    When you purchase TIM, you own the hardware and software. This means:
                  </p>
                  <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                    <li>• You can modify the software (open source components)</li>
                    <li>• You can sell or transfer ownership</li>
                    <li>• You can pass it down in your will</li>
                    <li>• No recurring licensing fees</li>
                  </ul>
                </div>

                <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Service Limitations</h4>
                  <p className="text-sm text-amber-600 dark:text-amber-400 mb-3">
                    TIM's local-first design means:
                  </p>
                  <ul className="text-sm text-amber-600 dark:text-amber-400 space-y-1">
                    <li>• Core functionality never depends on our servers</li>
                    <li>• If TIM (the company) disappears, your device keeps working</li>
                    <li>• Software updates are optional and you control timing</li>
                    <li>• No remote kill switches or forced obsolescence</li>
                  </ul>
                </div>

                <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Warranty & Support</h4>
                  <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                    <li>• 2-year hardware warranty included</li>
                    <li>• Software support for minimum 5 years</li>
                    <li>• Community support continues indefinitely</li>
                    <li>• Open source components ensure long-term viability</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Cloud Sync (Optional)
              </CardTitle>
              <CardDescription>
                Understand TIM's optional cloud sync while maintaining local-first principles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Local-First + Optional Cloud</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  TIM's cloud sync is fundamentally different from traditional cloud storage. Your data stays local by default,
                  and cloud sync is an optional backup and synchronization tool you control.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600">How Cloud Sync Works</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <HardDrive className="h-4 w-4 mt-0.5 text-green-500" />
                      <span>Primary data always stays on your TIM device</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 mt-0.5 text-blue-500" />
                      <span>End-to-end encrypted backups when enabled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-4 w-4 mt-0.5 text-purple-500" />
                      <span>Sync between your own TIM devices only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Eye className="h-4 w-4 mt-0.5 text-amber-500" />
                      <span>You control what syncs and when</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-amber-600">User Control</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Cloud sync is completely optional</li>
                    <li>• Disable internet connectivity anytime via physical switch</li>
                    <li>• Select which folders/files to sync</li>
                    <li>• Choose your own cloud provider or self-host</li>
                    <li>• Full device functionality without cloud connection</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Conflict Resolution</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  When the same file is modified on multiple devices, TIM uses intelligent conflict resolution 
                  to preserve all versions and let you choose how to merge changes.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setShowConflictDemo(true)}
                  className="gap-2"
                >
                  <GitBranch className="h-4 w-4" />
                  Try Interactive Demo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200">
                  <h5 className="font-medium text-green-600 mb-1">Privacy</h5>
                  <p className="text-xs text-green-600">Your files are encrypted before leaving your device</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200">
                  <h5 className="font-medium text-blue-600 mb-1">Reliability</h5>
                  <p className="text-xs text-blue-600">Multiple backup destinations supported</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded border border-purple-200">
                  <h5 className="font-medium text-purple-600 mb-1">Performance</h5>
                  <p className="text-xs text-purple-600">Incremental sync saves bandwidth</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Important: You Stay in Control</h4>
                <ul className="text-sm text-amber-600 dark:text-amber-400 space-y-1">
                  <li>• Cloud sync never compromises local-first principles</li>
                  <li>• Your device works fully offline even with sync enabled</li>
                  <li>• You can change cloud providers or disable sync anytime</li>
                  <li>• No vendor lock-in - your data stays accessible locally</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocalFirstDocumentation;