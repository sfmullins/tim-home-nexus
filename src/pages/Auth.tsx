import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Server, Wifi, WifiOff } from "lucide-react";
import { PasswordStrength } from "@/components/PasswordStrength";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { useInternetControl } from "@/hooks/useInternetControl";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInitialSetup, setIsInitialSetup] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, login, register, hasAnyUsers, isAuthenticated } = useLocalAuth();
  const { status, isConnected } = useInternetControl();

  useEffect(() => {
    // Check if this is initial setup
    setIsInitialSetup(!hasAnyUsers());

    // Set default device name
    if (!deviceName) {
      setDeviceName(`TIM-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);
    }

    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, hasAnyUsers, deviceName]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await register(email, password, username, deviceName);
      
      if (result.error) {
        toast({
          title: "Registration failed",
          description: result.error,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome to TIM!",
          description: "Your local account has been created successfully."
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.error) {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to TIM."
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const isPasswordStrong = () => {
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ];
    return checks.filter(Boolean).length >= 4;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Server className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">TIM</CardTitle>
          <CardDescription>
            {isInitialSetup ? "Set up your local TIM server" : "Access your TIM server"}
          </CardDescription>
          
          {/* Internet Status Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4 p-2 rounded-lg bg-muted/50">
            {isConnected ? (
              <>
                <Wifi className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Internet Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-muted-foreground">Local Network Only</span>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isInitialSetup ? (
            <div className="space-y-4">
              <Alert className="mb-4">
                <Server className="h-4 w-4" />
                <AlertDescription>
                  Welcome! Set up your first TIM account. This will be stored locally on your device.
                </AlertDescription>
              </Alert>
              
              <form onSubmit={handleRegister} className="space-y-4">
            
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="device-name">Device Name</Label>
                  <Input
                    id="device-name"
                    type="text"
                    placeholder="Name for this TIM device"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <PasswordStrength password={password} />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !isPasswordStrong()}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Set Up TIM
                </Button>
              </form>
            </div>
          ) : (
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Add User</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-username">Username</Label>
                    <Input
                      id="new-username"
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-email">Email</Label>
                    <Input
                      id="new-email"
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                    <PasswordStrength password={password} />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading || !isPasswordStrong()}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add User
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;