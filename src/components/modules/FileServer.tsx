import { useState, useMemo } from "react";
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
  SortAsc,
  Home,
  HardDrive,
  ChevronRight,
  Plus,
  Trash2,
  Edit,
  Copy
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface FileItem {
  name: string;
  type: "folder" | "file";
  size?: string;
  modified: string;
  extension?: string;
  path: string;
}

const FileServer = () => {
  const [currentPath, setCurrentPath] = useState("\\\\TIM-PC\\SharedFolders");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "modified" | "size">("name");

  // Mock file system data
  const allFiles: Record<string, FileItem[]> = {
    "\\\\TIM-PC\\SharedFolders": [
      { name: "Documents", type: "folder", modified: "2024-01-15", path: "\\\\TIM-PC\\SharedFolders\\Documents" },
      { name: "Movies", type: "folder", modified: "2024-01-10", path: "\\\\TIM-PC\\SharedFolders\\Movies" },
      { name: "Music", type: "folder", modified: "2024-01-12", path: "\\\\TIM-PC\\SharedFolders\\Music" },
      { name: "Photos", type: "folder", modified: "2024-01-16", path: "\\\\TIM-PC\\SharedFolders\\Photos" },
      { name: "Software", type: "folder", modified: "2024-01-08", path: "\\\\TIM-PC\\SharedFolders\\Software" },
      { name: "vacation-2024.mp4", type: "file", size: "1.2 GB", modified: "2024-01-16", extension: "mp4", path: "\\\\TIM-PC\\SharedFolders\\vacation-2024.mp4" },
      { name: "presentation.pdf", type: "file", size: "24 MB", modified: "2024-01-11", extension: "pdf", path: "\\\\TIM-PC\\SharedFolders\\presentation.pdf" },
      { name: "backup.zip", type: "file", size: "856 MB", modified: "2024-01-09", extension: "zip", path: "\\\\TIM-PC\\SharedFolders\\backup.zip" },
    ],
    "\\\\TIM-PC\\SharedFolders\\Documents": [
      { name: "Work", type: "folder", modified: "2024-01-15", path: "\\\\TIM-PC\\SharedFolders\\Documents\\Work" },
      { name: "Personal", type: "folder", modified: "2024-01-14", path: "\\\\TIM-PC\\SharedFolders\\Documents\\Personal" },
      { name: "report.docx", type: "file", size: "2.5 MB", modified: "2024-01-15", extension: "docx", path: "\\\\TIM-PC\\SharedFolders\\Documents\\report.docx" },
      { name: "budget.xlsx", type: "file", size: "1.8 MB", modified: "2024-01-13", extension: "xlsx", path: "\\\\TIM-PC\\SharedFolders\\Documents\\budget.xlsx" },
    ]
  };

  const currentFiles = allFiles[currentPath] || [];

  // Filtered and sorted files
  const filteredFiles = useMemo(() => {
    let filtered = currentFiles.filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "modified":
          return new Date(b.modified).getTime() - new Date(a.modified).getTime();
        case "size":
          if (!a.size || !b.size) return 0;
          return parseFloat(b.size) - parseFloat(a.size);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [currentFiles, searchQuery, sortBy]);

  const handleFolderClick = (folder: FileItem) => {
    if (folder.type === "folder") {
      setCurrentPath(folder.path);
    }
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === "folder") {
      setCurrentPath(file.path);
    } else {
      // Handle file opening - could download or preview
      console.log(`Opening file: ${file.name}`);
    }
  };

  const handleBackClick = () => {
    const pathParts = currentPath.split("\\");
    if (pathParts.length > 3) { // Keep at least \\TIM-PC\SharedFolders
      pathParts.pop();
      setCurrentPath(pathParts.join("\\"));
    }
  };

  const getBreadcrumbs = () => {
    const parts = currentPath.split("\\").filter(Boolean);
    const breadcrumbs = [];
    let currentBreadcrumbPath = "";
    
    parts.forEach((part, index) => {
      currentBreadcrumbPath += (index === 0 ? "\\\\" : "\\") + part;
      breadcrumbs.push({
        name: part,
        path: currentBreadcrumbPath,
        isLast: index === parts.length - 1
      });
    });
    
    return breadcrumbs;
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") {
      return <Folder className="w-6 h-6 text-accent" />;
    }
    
    switch (file.extension) {
      case "mp4":
      case "avi":
      case "mkv":
        return <File className="w-6 h-6 text-red-500" />;
      case "pdf":
        return <File className="w-6 h-6 text-red-600" />;
      case "docx":
      case "doc":
        return <File className="w-6 h-6 text-blue-600" />;
      case "xlsx":
      case "xls":
        return <File className="w-6 h-6 text-green-600" />;
      case "zip":
      case "rar":
        return <File className="w-6 h-6 text-orange-600" />;
      default:
        return <File className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleBackClick}
            disabled={currentPath === "\\\\TIM-PC\\SharedFolders"}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">File Server</h1>
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <HardDrive className="w-4 h-4" />
              {getBreadcrumbs().map((crumb, index) => (
                <div key={index} className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPath(crumb.path)}
                    className={`hover:text-foreground transition-colors ${
                      crumb.isLast ? "text-foreground font-medium" : ""
                    }`}
                  >
                    {crumb.name}
                  </button>
                  {!crumb.isLast && <ChevronRight className="w-3 h-3" />}
                </div>
              ))}
            </div>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="module" size="sm">
                    <SortAsc className="w-4 h-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>
                    Sort by Name
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("modified")}>
                    Sort by Date Modified
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("size")}>
                    Sort by Size
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === "grid" ? "default" : "ghost"} 
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"} 
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button variant="hero" size="sm">
                <Upload className="w-4 h-4" />
                Upload
              </Button>
              <Button variant="module" size="sm">
                <Plus className="w-4 h-4" />
                New Folder
              </Button>
            </div>
          </div>
        </Card>

        {/* File Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file, index) => (
              <Card 
                key={index} 
                className="p-4 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                onClick={() => handleFileClick(file)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-surface group-hover:bg-primary/10 transition-colors duration-300">
                    {getFileIcon(file)}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {file.type === "file" && (
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <h3 className="font-medium text-foreground truncate mb-1">{file.name}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{new Date(file.modified).toLocaleDateString()}</span>
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
        ) : (
          <Card className="bg-gradient-surface border-border">
            <div className="p-4 border-b border-border">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-3">Modified</div>
                <div className="col-span-1"></div>
              </div>
            </div>
            {filteredFiles.map((file, index) => (
              <div 
                key={index}
                className="p-4 border-b border-border last:border-b-0 hover:bg-surface/50 transition-colors cursor-pointer group"
                onClick={() => handleFileClick(file)}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-3">
                    {getFileIcon(file)}
                    <span className="font-medium text-foreground truncate">{file.name}</span>
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {file.size || "-"}
                  </div>
                  <div className="col-span-3 text-sm text-muted-foreground">
                    {new Date(file.modified).toLocaleDateString()}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {file.type === "file" && (
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* Status Bar */}
        <Card className="p-4 bg-gradient-surface border-border mt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {filteredFiles.length} items
              {searchQuery && ` (filtered from ${currentFiles.length})`}
            </span>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-accent">
                <HardDrive className="w-3 h-3 mr-1" />
                TIM-PC Connected
              </Badge>
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