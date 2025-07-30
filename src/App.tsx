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
import GDPRConsentBanner from "./components/GDPRConsentBanner";
import WebsiteLayout from "./components/website/WebsiteLayout";
import WebsiteHome from "./pages/website/WebsiteHome";
import WebsiteStore from "./pages/website/WebsiteStore";
import { LocaleProvider } from "./contexts/LocaleContext";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocaleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <GDPRConsentBanner />
        <BrowserRouter>
          <Routes>
            {/* App Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/files" element={<FileServer />} />
            <Route path="/smart-home" element={<SmartHome />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/game-streaming" element={<GameStreaming />} />
            <Route path="/vpn-access" element={<VpnAccess />} />
            
            {/* Website Routes */}
            <Route path="/website" element={
              <WebsiteLayout>
                <WebsiteHome />
              </WebsiteLayout>
            } />
            <Route path="/website/store" element={
              <WebsiteLayout>
                <WebsiteStore />
              </WebsiteLayout>
            } />
            <Route path="/website/about" element={
              <WebsiteLayout>
                <div className="max-w-4xl mx-auto px-4 py-16">
                  <h1 className="text-4xl font-bold mb-8">About TIM</h1>
                  <p className="text-lg text-muted-foreground">Coming soon...</p>
                </div>
              </WebsiteLayout>
            } />
            <Route path="/website/support" element={
              <WebsiteLayout>
                <div className="max-w-4xl mx-auto px-4 py-16">
                  <h1 className="text-4xl font-bold mb-8">Support</h1>
                  <p className="text-lg text-muted-foreground">Coming soon...</p>
                </div>
              </WebsiteLayout>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LocaleProvider>
  </QueryClientProvider>
);

export default App;
