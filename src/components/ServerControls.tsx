import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Power, RotateCcw, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ServerControls = () => {
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleServerAction = (action: string) => {
    if (!password) {
      toast({
        title: "Authentication Required",
        description: "Please enter your password to continue.",
        variant: "destructive"
      });
      return;
    }

    // Simulate server action
    toast({
      title: `Server ${action}`,
      description: `T.I.M server is being ${action.toLowerCase()}...`,
    });
    
    setPassword("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="bg-accent text-accent-foreground mb-2 px-3 py-1 rounded-full text-sm font-medium hover:bg-accent/80 transition-colors">
          Online
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Server Management
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Administrator Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2" disabled={!password}>
                  <Power className="w-4 h-4" />
                  Shutdown
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Shutdown T.I.M Server?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will completely shut down the T.I.M server. You will need physical access to restart it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => handleServerAction("Shutdown")}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
                  >
                    Shutdown
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary" className="gap-2" disabled={!password}>
                  <RotateCcw className="w-4 h-4" />
                  Restart
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Restart T.I.M Server?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will restart the T.I.M server. All services will be temporarily unavailable during the restart.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleServerAction("Restart")}>
                    Restart
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServerControls;