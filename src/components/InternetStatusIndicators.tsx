import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, WifiOff, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { useInternetControl } from "@/hooks/useInternetControl";

const InternetStatusBanner = () => {
  const { status, isConnected } = useInternetControl();

  if (isConnected) {
    return (
      <Alert className="mb-4 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <Wifi className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          <div className="flex items-center justify-between">
            <span>Internet access is enabled. TIM can sync with cloud services and download updates.</span>
            <Badge variant="outline" className="text-blue-600 border-blue-300">
              <CheckCircle className="h-3 w-3 mr-1" />
              Online
            </Badge>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mb-4 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
      <WifiOff className="h-4 w-4 text-amber-500" />
      <AlertDescription className="text-amber-700 dark:text-amber-300">
        <div className="flex items-center justify-between">
          <span>Local-only mode active. Your data is completely isolated from the internet.</span>
          <Badge variant="outline" className="text-amber-600 border-amber-300">
            <Shield className="h-3 w-3 mr-1" />
            Local Only
          </Badge>
        </div>
      </AlertDescription>
    </Alert>
  );
};

const ModuleStatusIndicator = ({ moduleId, isInternetRequired }: { moduleId: string; isInternetRequired: boolean }) => {
  const { isConnected } = useInternetControl();
  
  if (!isInternetRequired) {
    return (
      <Badge variant="default" className="bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-300">
        Always Available
      </Badge>
    );
  }

  if (isConnected) {
    return (
      <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950 dark:text-blue-300">
        Online
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/20 dark:text-amber-300">
      <AlertTriangle className="h-3 w-3 mr-1" />
      Needs Internet
    </Badge>
  );
};

export { InternetStatusBanner, ModuleStatusIndicator };