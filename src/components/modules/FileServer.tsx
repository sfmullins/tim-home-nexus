import { useState, useEffect, useMemo } from "react";
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
  Copy,
  FolderPlus,
  RefreshCw,
  FileText,
  Image,
  Video,
  Music,
  Archive
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileItem {
  name: string;
  type: "folder" | "file";
  size?: number;
  sizeFormatted?: string;
  modified: string;
  extension?: string;
  path: string;
  mimeType?: string;
  isSymlink?: boolean;
  permissions?: string;
}

interface DirectoryResponse {
  files: FileItem[];
  currentPath: string;
  error?: string;
}

const FileServer = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "modified" | "size">("name");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load directory contents
  const loadDirectory = async (path: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('file-server', {
        body: { 
          action: 'list',
          path: path 
        }
      });

      if (error) throw error;

      const response = data as DirectoryResponse;
      if (response.error) {
        throw new Error(response.error);
      }

      setFiles(response.files || []);
      setCurrentPath(response.currentPath || path);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load directory';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      // Fallback to mock data for development
      const mockFiles: FileItem[] = [
        { 
          name: "Documents", 
          type: "folder", 
          modified: new Date().toISOString(), 
          path: path === "/" ? "/Documents" : `${path}/Documents` 
        },
        { 
          name: "Pictures", 
          type: "folder", 
          modified: new Date().toISOString(), 
          path: path === "/" ? "/Pictures" : `${path}/Pictures` 
        },
        { 
          name: "Downloads", 
          type: "folder", 
          modified: new Date().toISOString(), 
          path: path === "/" ? "/Downloads" : `${path}/Downloads` 
        },
        { 
          name: "example.txt", 
          type: "file", 
          size: 1024,
          sizeFormatted: "1 KB",
          modified: new Date().toISOString(), 
          extension: "txt",
          path: path === "/" ? "/example.txt" : `${path}/example.txt`,
          mimeType: "text/plain"
        }
      ];
      setFiles(mockFiles);
    } finally {
      setLoading(false);
    }
  };

  // Load initial directory
  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath]);

  // Filtered and sorted files
  const filteredFiles = useMemo(() => {
    let filtered = files.filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Sort folders first, then by selected criteria
    filtered.sort((a, b) => {
      // Folders always come first
      if (a.type === "folder" && b.type === "file") return -1;
      if (a.type === "file" && b.type === "folder") return 1;
      
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "modified":
          return new Date(b.modified).getTime() - new Date(a.modified).getTime();
        case "size":
          if (!a.size || !b.size) return 0;
          return b.size - a.size;
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [files, searchQuery, sortBy]);

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder") {
      setCurrentPath(item.path);
    } else {
      handleDownload(item);
    }
  };

  const handleBackClick = () => {
    if (currentPath !== "/") {
      const parentPath = currentPath.split("/").slice(0, -1).join("/") || "/";
      setCurrentPath(parentPath);
    }
  };

  const handleRefresh = () => {
    loadDirectory(currentPath);
  };

  const handleDownload = async (file: FileItem) => {
    try {
      const { data, error } = await supabase.functions.invoke('file-server', {
        body: { 
          action: 'download',
          path: file.path 
        }
      });

      if (error) throw error;

      // Create download link
      const blob = new Blob([data], { type: file.mimeType || 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description: `Downloading ${file.name}`,
      });
    } catch (err) {
      toast({
        title: "Download Failed", 
        description: "Could not download file. Using mock download.",
        variant: "destructive"
      });
      
      // Mock download for development
      const link = document.createElement('a');
      link.href = `data:text/plain;charset=utf-8,Mock content for ${file.name}`;
      link.download = file.name;
      link.click();
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', currentPath);

    try {
      const { error } = await supabase.functions.invoke('file-server', {
        body: { 
          action: 'upload',
          path: currentPath,
          file: file
        }
      });

      if (error) throw error;

      toast({
        title: "Upload Successful",
        description: `${file.name} uploaded successfully`,
      });
      
      // Refresh directory
      loadDirectory(currentPath);
    } catch (err) {
      toast({
        title: "Upload Failed",
        description: "Could not upload file",
        variant: "destructive"
      });
    }
  };

  const getBreadcrumbs = () => {
    const parts = currentPath.split("/").filter(Boolean);
    const breadcrumbs = [{ name: "Home", path: "/", isLast: parts.length === 0 }];
    
    let currentBreadcrumbPath = "";
    parts.forEach((part, index) => {
      currentBreadcrumbPath += "/" + part;
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
    
    const ext = file.extension?.toLowerCase();
    switch (ext) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "svg":
        return <Image className="w-6 h-6 text-green-500" />;
      case "mp4":
      case "avi":
      case "mkv":
      case "mov":
      case "wmv":
        return <Video className="w-6 h-6 text-red-500" />;
      case "mp3":
      case "wav":
      case "flac":
      case "aac":
        return <Music className="w-6 h-6 text-purple-500" />;
      case "pdf":
        return <FileText className="w-6 h-6 text-red-600" />;
      case "doc":
      case "docx":
        return <FileText className="w-6 h-6 text-blue-600" />;
      case "xls":
      case "xlsx":
        return <FileText className="w-6 h-6 text-green-600" />;
      case "zip":
      case "rar":
      case "7z":
      case "tar":
      case "gz":
        return <Archive className="w-6 h-6 text-orange-600" />;
      case "txt":
      case "md":
      case "log":
        return <FileText className="w-6 h-6 text-muted-foreground" />;
      default:
        return <File className="w-6 h-6 text-primary" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            disabled={currentPath === "/" || loading}
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
                    onClick={() => !loading && setCurrentPath(crumb.path)}
                    disabled={loading}
                    className={`hover:text-foreground transition-colors ${
                      crumb.isLast ? "text-foreground font-medium" : ""
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {crumb.name}
                  </button>
                  {!crumb.isLast && <ChevronRight className="w-3 h-3" />}
                </div>
              ))}
            </div>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        {/* Toolbar */}
        <Card className="p-4 bg-gradient-surface border-border mb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search files and folders..." 
                  className="pl-10 bg-surface border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Upload Button */}
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={loading}
                />
                <Button variant="outline" size="sm" disabled={loading} asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </span>
                </Button>
              </label>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" disabled={loading}>
                    <SortAsc className="w-4 h-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>
                    Sort by Name
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("modified")}>
                    Sort by Date
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("size")}>
                    Sort by Size
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode Toggle */}
              <div className="flex border border-border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                  disabled={loading}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                  disabled={loading}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="p-4 mb-6 border-destructive bg-destructive/10">
            <div className="text-destructive">
              <strong>Error:</strong> {error}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Falling back to mock data for development
            </div>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading directory...</p>
            </div>
          </div>
        )}

        {/* File Grid/List */}
        {!loading && (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredFiles.map((file, index) => (
                  <Card 
                    key={index}
                    className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                    onClick={() => handleItemClick(file)}
                  >
                    <div className="flex flex-col items-center text-center">
                      {getFileIcon(file)}
                      <span className="text-sm font-medium mt-2 truncate w-full">
                        {file.name}
                      </span>
                      {file.type === "file" && file.size && (
                        <span className="text-xs text-muted-foreground">
                          {file.sizeFormatted || formatFileSize(file.size)}
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="overflow-hidden">
                <div className="divide-y divide-border">
                  {filteredFiles.map((file, index) => (
                    <div 
                      key={index}
                      className="p-4 hover:bg-muted/50 transition-colors cursor-pointer flex items-center gap-4"
                      onClick={() => handleItemClick(file)}
                    >
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(file.modified)}
                        </p>
                      </div>
                      {file.type === "file" && file.size && (
                        <div className="text-sm text-muted-foreground">
                          {file.sizeFormatted || formatFileSize(file.size)}
                        </div>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {file.type === "file" && (
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(file);
                            }}>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Path
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Empty State */}
            {filteredFiles.length === 0 && !loading && (
              <div className="text-center py-12">
                <Folder className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {searchQuery ? "No files found" : "Empty folder"}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `No files match "${searchQuery}"`
                    : "This folder doesn't contain any files"
                  }
                </p>
              </div>
            )}
          </>
        )}

        {/* Status Bar */}
        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            {filteredFiles.length} item{filteredFiles.length !== 1 ? 's' : ''}
            {searchQuery && ` (filtered from ${files.length})`}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {loading ? "Loading..." : "Connected"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileServer;