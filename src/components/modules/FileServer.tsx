import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Folder,
  File,
  Search,
  Upload,
  Download,
  MoreVertical,
  Grid,
  List,
  SortAsc
} from "lucide-react";

interface FileItem {
  name: string;
  type: "folder" | "file";
  size?: string;
  modified: string;
}

const FileServer = () => {
  const files: FileItem[] = [
    { name: "Documents", type: "folder", modified: "2 days ago" },
    { name: "Movies", type: "folder", modified: "1 week ago" },
    { name: "Music", type: "folder", modified: "3 days ago" },
    { name: "Photos", type: "folder", modified: "Yesterday" },
    { name: "vacation-2024.mp4", type: "file", size: "1.2 GB", modified: "2 hours ago" },
    { name: "presentation.pdf", type: "file", size: "24 MB", modified: "5 days ago" },
    { name: "backup.zip", type: "file", size: "856 MB", modified: "1 week ago" },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">File Server</h1>
            <p className="text-muted-foreground">/home/tim/shared</p>
          </div>
        </div>

        {/* Toolbar */}
        <Card className="p-4 bg-gradient-surface border-border mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search files and folders..." 
                  className="pl-10 bg-surface border-border"
                />
              </div>
              <Button variant="module" size="sm">
                <SortAsc className="w-4 h-4" />
                Sort
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <List className="w-4 h-4" />
              </Button>
              <Button variant="hero" size="sm">
                <Upload className="w-4 h-4" />
                Upload
              </Button>
            </div>
          </div>
        </Card>

        {/* File Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <Card 
              key={index} 
              className="p-4 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-surface group-hover:bg-primary/10 transition-colors duration-300">
                  {file.type === "folder" ? (
                    <Folder className="w-6 h-6 text-accent" />
                  ) : (
                    <File className="w-6 h-6 text-primary" />
                  )}
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              
              <h3 className="font-medium text-foreground truncate mb-1">{file.name}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{file.modified}</span>
                {file.size && <Badge variant="secondary">{file.size}</Badge>}
              </div>
              
              {file.type === "file" && (
                <Button variant="outline" size="sm" className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              )}
            </Card>
          ))}
        </div>

        {/* Status Bar */}
        <Card className="p-4 bg-gradient-surface border-border mt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{files.length} items</span>
            <div className="flex items-center gap-4">
              <span>Available: 2.1 TB</span>
              <span>Used: 892 GB</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FileServer;