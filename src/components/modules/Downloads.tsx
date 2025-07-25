import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Play, 
  Pause, 
  Trash2, 
  Plus,
  Search,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TorrentItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "downloading" | "seeding" | "paused" | "completed" | "error";
  downloadSpeed: string;
  uploadSpeed: string;
  eta: string;
  peers: number;
  seeds: number;
}

interface DownloadItem {
  id: string;
  name: string;
  url: string;
  size: string;
  progress: number;
  status: "downloading" | "completed" | "paused" | "error";
  downloadSpeed: string;
}

const Downloads = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data
  const [torrents] = useState<TorrentItem[]>([
    {
      id: "1",
      name: "Ubuntu 24.04 LTS Desktop",
      size: "4.7 GB",
      progress: 85,
      status: "downloading",
      downloadSpeed: "2.3 MB/s",
      uploadSpeed: "450 KB/s",
      eta: "12 min",
      peers: 45,
      seeds: 123
    },
    {
      id: "2", 
      name: "Linux Mint 21.3 Cinnamon",
      size: "2.8 GB",
      progress: 100,
      status: "seeding",
      downloadSpeed: "0 B/s",
      uploadSpeed: "1.2 MB/s", 
      eta: "∞",
      peers: 12,
      seeds: 67
    }
  ]);

  const [downloads] = useState<DownloadItem[]>([
    {
      id: "1",
      name: "VLC Media Player 3.0.20",
      url: "https://mirror.example.com/vlc-3.0.20-win64.exe",
      size: "41.2 MB",
      progress: 67,
      status: "downloading",
      downloadSpeed: "1.8 MB/s"
    },
    {
      id: "2",
      name: "OBS Studio 30.0.2",
      url: "https://cdn.example.com/obs-studio-30.0.2-windows.zip", 
      size: "152.8 MB",
      progress: 100,
      status: "completed",
      downloadSpeed: "0 B/s"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "downloading": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "completed": return "bg-success/20 text-success border-success/30";
      case "seeding": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "paused": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "error": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "downloading": return <Download className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "seeding": return <Play className="w-4 h-4" />;
      case "paused": return <Pause className="w-4 h-4" />;
      case "error": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Downloads Manager
            </h1>
            <p className="text-muted-foreground">Manage torrents and direct downloads</p>
          </div>
        </div>

        {/* Search and Add */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search downloads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            Add Download
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="torrents" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="torrents">Torrents</TabsTrigger>
            <TabsTrigger value="direct">Direct Downloads</TabsTrigger>
          </TabsList>

          {/* Torrents Tab */}
          <TabsContent value="torrents" className="space-y-4">
            {torrents.map((torrent) => (
              <Card key={torrent.id} className="p-6 bg-gradient-surface border-border">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 mr-4">
                      <h3 className="font-semibold text-foreground truncate">{torrent.name}</h3>
                      <p className="text-sm text-muted-foreground">{torrent.size}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(torrent.status)}>
                        {getStatusIcon(torrent.status)}
                        {torrent.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{torrent.progress}% complete</span>
                      <span className="text-muted-foreground">ETA: {torrent.eta}</span>
                    </div>
                    <Progress value={torrent.progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Download</p>
                      <p className="text-foreground font-medium">{torrent.downloadSpeed}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Upload</p>
                      <p className="text-foreground font-medium">{torrent.uploadSpeed}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Peers</p>
                      <p className="text-foreground font-medium">{torrent.peers}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Seeds</p>
                      <p className="text-foreground font-medium">{torrent.seeds}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Direct Downloads Tab */}
          <TabsContent value="direct" className="space-y-4">
            {downloads.map((download) => (
              <Card key={download.id} className="p-6 bg-gradient-surface border-border">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 mr-4">
                      <h3 className="font-semibold text-foreground truncate">{download.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{download.url}</p>
                      <p className="text-sm text-muted-foreground">{download.size}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(download.status)}>
                        {getStatusIcon(download.status)}
                        {download.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{download.progress}% complete</span>
                      <span className="text-muted-foreground">{download.downloadSpeed}</span>
                    </div>
                    <Progress value={download.progress} className="h-2" />
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Downloads;