import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import FileServer from "./components/modules/FileServer";
import SmartHome from "./components/modules/SmartHome";
import Downloads from "./components/modules/Downloads";
import GameStreaming from "./components/modules/GameStreaming";
import VpnAccess from "./components/modules/VpnAccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/files" element={<FileServer />} />
          <Route path="/smart-home" element={<SmartHome />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/game-streaming" element={<GameStreaming />} />
          <Route path="/vpn-access" element={<VpnAccess />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
