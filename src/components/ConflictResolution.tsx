import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitBranch, User, Calendar, FileText, ArrowRight, CheckCircle, AlertCircle, Merge } from "lucide-react";

const ConflictResolution = () => {
  const [conflicts] = useState([
    {
      id: '1',
      file: 'Documents/Important/project-notes.md',
      localModified: '2024-01-15 14:30:22',
      cloudModified: '2024-01-15 16:45:10',
      status: 'pending'
    },
    {
      id: '2',
      file: 'Photos/2024/vacation-photos/',
      localModified: '2024-01-14 09:15:33',
      cloudModified: '2024-01-14 11:22:45',
      status: 'resolved'
    }
  ]);

  const [selectedConflict, setSelectedConflict] = useState<string | null>(null);

  const handleResolveConflict = (conflictId: string, resolution: 'local' | 'cloud' | 'merge') => {
    console.log(`Resolving conflict ${conflictId} with ${resolution}`);
    // In production: implement actual conflict resolution
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Alert>
        <GitBranch className="h-4 w-4" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span>Cloud sync conflicts detected. Review and resolve to continue syncing.</span>
            <Badge variant="outline">
              {conflicts.filter(c => c.status === 'pending').length} pending
            </Badge>
          </div>
        </AlertDescription>
      </Alert>

      {/* Conflict List */}
      <div className="space-y-4">
        {conflicts.map((conflict) => (
          <Card key={conflict.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {conflict.file}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    File modified on both local device and cloud storage
                  </CardDescription>
                </div>
                <Badge variant={conflict.status === 'pending' ? 'destructive' : 'default'}>
                  {conflict.status === 'pending' ? (
                    <>
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Pending
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Resolved
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>

            {conflict.status === 'pending' && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Local Version */}
                  <div className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                      📱 Local Version (Your TIM)
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Modified:</span>
                        <span className="font-mono">{conflict.localModified}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Device:</span>
                        <span>TIM-A1B2C3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span>2.4 KB</span>
                      </div>
                    </div>
                  </div>

                  {/* Cloud Version */}
                  <div className="p-4 border border-purple-200 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                      ☁️ Cloud Version (Synced)
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Modified:</span>
                        <span className="font-mono">{conflict.cloudModified}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Device:</span>
                        <span>Mobile App</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span>2.6 KB</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resolution Options */}
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolveConflict(conflict.id, 'local')}
                    className="flex items-center gap-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Use Local Version
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolveConflict(conflict.id, 'cloud')}
                    className="flex items-center gap-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Use Cloud Version
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolveConflict(conflict.id, 'merge')}
                    className="flex items-center gap-2"
                  >
                    <Merge className="h-4 w-4" />
                    Manual Merge
                  </Button>
                  
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedConflict(conflict.id)}
                  >
                    Compare Files
                  </Button>
                </div>
              </CardContent>
            )}

            {conflict.status === 'resolved' && (
              <CardContent>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Resolved using local version</span>
                  <span className="text-xs text-muted-foreground ml-2">2 hours ago</span>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Conflict Resolution Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Conflict Resolution Guide
          </CardTitle>
          <CardDescription>
            Understanding how to handle sync conflicts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="strategies" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">Use Local Version</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Keep the version from your TIM device and overwrite cloud storage.
                  </p>
                  <p className="text-xs text-blue-600">
                    Best when: You're sure local changes are most recent
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-purple-600 mb-2">Use Cloud Version</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Accept the cloud version and overwrite your local copy.
                  </p>
                  <p className="text-xs text-purple-600">
                    Best when: You made changes on mobile/web recently
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-green-600 mb-2">Manual Merge</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Combine changes from both versions manually.
                  </p>
                  <p className="text-xs text-green-600">
                    Best when: Both versions have important changes
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prevention" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                    Preventing Sync Conflicts
                  </h4>
                  <ul className="space-y-1 text-sm text-green-600 dark:text-green-400">
                    <li>• Work on files from one device at a time when possible</li>
                    <li>• Use TIM's built-in file locking for important documents</li>
                    <li>• Sync frequently to catch conflicts early</li>
                    <li>• Set up real-time sync notifications on your mobile app</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    File Types & Conflicts
                  </h4>
                  <div className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                    <p><strong>Text files:</strong> Can be automatically merged in many cases</p>
                    <p><strong>Images/Media:</strong> Usually require choosing one version</p>
                    <p><strong>Databases:</strong> Use TIM's built-in database sync features</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Automatic Resolution Rules</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set up rules to automatically resolve certain types of conflicts:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-muted/50 rounded">
                      <span>Photos folder</span>
                      <span className="text-blue-600">Always use latest timestamp</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/50 rounded">
                      <span>Documents</span>
                      <span className="text-amber-600">Always ask for manual review</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Version History</h4>
                  <p className="text-sm text-muted-foreground">
                    TIM keeps the last 5 versions of files that had conflicts. Access them through 
                    the file history panel to recover specific changes if needed.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConflictResolution;