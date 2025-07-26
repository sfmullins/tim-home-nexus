import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Play, Pause, Square, Monitor, Gamepad2, Settings, Wifi, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GameSession {
  id: string;
  game: string;
  status: "playing" | "paused" | "stopped";
  duration: string;
  resolution: string;
  fps: number;
  bitrate: string;
  players: number;
}

interface StreamConfig {
  resolution: string;
  fps: number;
  bitrate: string;
  codec: string;
}

const GameStreaming = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const [mockGames] = useState([
    { id: "cyberpunk", name: "Cyberpunk 2077", status: "installed", lastPlayed: "2 hours ago" },
    { id: "witcher", name: "The Witcher 3", status: "installed", lastPlayed: "1 day ago" },
    { id: "rdr2", name: "Red Dead Redemption 2", status: "installing", lastPlayed: "Never" },
    { id: "gta5", name: "GTA V", status: "installed", lastPlayed: "3 days ago" },
    { id: "valorant", name: "Valorant", status: "installed", lastPlayed: "1 hour ago" }
  ]);

  const [mockSessions] = useState<GameSession[]>([
    {
      id: "session1",
      game: "Cyberpunk 2077",
      status: "playing",
      duration: "1:23:45",
      resolution: "1080p",
      fps: 60,
      bitrate: "15 Mbps",
      players: 1
    },
    {
      id: "session2", 
      game: "Valorant",
      status: "paused",
      duration: "0:45:12",
      resolution: "1080p",
      fps: 144,
      bitrate: "20 Mbps",
      players: 5
    }
  ]);

  const [streamConfig, setStreamConfig] = useState<StreamConfig>({
    resolution: "1080p",
    fps: 60,
    bitrate: "15 Mbps",
    codec: "H.264"
  });

  const filteredGames = mockGames.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "installed": return "bg-success text-success-foreground";
      case "installing": return "bg-warning text-warning-foreground";
      case "playing": return "bg-success text-success-foreground";
      case "paused": return "bg-warning text-warning-foreground";
      case "stopped": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "playing": return Play;
      case "paused": return Pause;
      case "stopped": return Square;
      default: return Gamepad2;
    }
  };

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
              <Gamepad2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Game Streaming</h1>
              <p className="text-muted-foreground">Stream games from Tim to your device</p>
            </div>
          </div>
        </div>

        {/* Stream Status Card */}
        <Card className="mb-6 bg-gradient-surface border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Stream Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">Active</div>
                <div className="text-sm text-muted-foreground">Connection</div>
                <div className="w-3 h-3 bg-success rounded-full mx-auto mt-2"></div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">15ms</div>
                <div className="text-sm text-muted-foreground">Latency</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">1080p60</div>
                <div className="text-sm text-muted-foreground">Quality</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Signal</div>
                <Progress value={98} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="games" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Games Tab */}
          <TabsContent value="games" className="space-y-4">
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Refresh Library
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGames.map((game) => (
                <Card 
                  key={game.id} 
                  className={`cursor-pointer transition-all duration-200 hover:border-primary/50 bg-gradient-surface border-border ${
                    selectedGame === game.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedGame(game.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-lg font-semibold text-foreground">{game.name}</div>
                      <Badge className={getStatusColor(game.status)}>
                        {game.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Last played: {game.lastPlayed}
                      </div>
                    </div>

                    {game.status === "installing" && (
                      <div className="mt-3">
                        <Progress value={67} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">Installing... 67%</div>
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        disabled={game.status !== "installed"}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Stream
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            {mockSessions.length === 0 ? (
              <Card className="bg-gradient-surface border-border">
                <CardContent className="p-8 text-center">
                  <Gamepad2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Active Sessions</h3>
                  <p className="text-muted-foreground">Start streaming a game to see active sessions here.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {mockSessions.map((session) => {
                  const StatusIcon = getStatusIcon(session.status);
                  return (
                    <Card key={session.id} className="bg-gradient-surface border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <StatusIcon className="w-5 h-5 text-primary" />
                            <div>
                              <h3 className="font-semibold text-foreground">{session.game}</h3>
                              <p className="text-sm text-muted-foreground">Session ID: {session.id}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Duration</div>
                            <div className="font-medium text-foreground">{session.duration}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Resolution</div>
                            <div className="font-medium text-foreground">{session.resolution}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">FPS</div>
                            <div className="font-medium text-foreground">{session.fps}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Bitrate</div>
                            <div className="font-medium text-foreground">{session.bitrate}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Players</div>
                            <div className="font-medium text-foreground flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {session.players}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {session.status === "playing" ? (
                            <Button variant="outline" size="sm">
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Play className="w-4 h-4 mr-2" />
                              Resume
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Square className="w-4 h-4 mr-2" />
                            Stop
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gradient-surface border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Stream Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Resolution</label>
                      <select className="w-full p-2 rounded-md border border-border bg-background text-foreground">
                        <option value="1080p">1920x1080 (1080p)</option>
                        <option value="1440p">2560x1440 (1440p)</option>
                        <option value="4k">3840x2160 (4K)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Frame Rate</label>
                      <select className="w-full p-2 rounded-md border border-border bg-background text-foreground">
                        <option value="30">30 FPS</option>
                        <option value="60">60 FPS</option>
                        <option value="120">120 FPS</option>
                        <option value="144">144 FPS</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Bitrate</label>
                      <select className="w-full p-2 rounded-md border border-border bg-background text-foreground">
                        <option value="5">5 Mbps (Low)</option>
                        <option value="15">15 Mbps (Medium)</option>
                        <option value="25">25 Mbps (High)</option>
                        <option value="50">50 Mbps (Ultra)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Codec</label>
                      <select className="w-full p-2 rounded-md border border-border bg-background text-foreground">
                        <option value="h264">H.264 (Compatible)</option>
                        <option value="h265">H.265 (Efficient)</option>
                        <option value="av1">AV1 (Modern)</option>
                      </select>
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
                  <Wifi className="w-5 h-5" />
                  Network Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">Good</div>
                    <div className="text-sm text-muted-foreground">Connection Quality</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">250 Mbps</div>
                    <div className="text-sm text-muted-foreground">Available Bandwidth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">15ms</div>
                    <div className="text-sm text-muted-foreground">Average Latency</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GameStreaming;